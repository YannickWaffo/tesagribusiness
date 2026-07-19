"use server";

import sharp from "sharp";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin";

export type AdminActionState = { ok: boolean; message: string } | null;

const MAX_UPLOAD_BYTES = 8 * 1024 * 1024;

function slugify(input: string): string {
  return input
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

async function storeUploadedImage(file: File): Promise<string> {
  if (file.size > MAX_UPLOAD_BYTES) {
    throw new Error("Image trop lourde (8 Mo maximum).");
  }
  const input = Buffer.from(await file.arrayBuffer());
  const optimized = await sharp(input)
    .resize({ width: 800, height: 800, fit: "inside", withoutEnlargement: true })
    .webp({ quality: 82 })
    .toBuffer();
  const image = await prisma.storedImage.create({
    data: { mime: "image/webp", data: optimized },
  });
  return `/api/images/${image.id}`;
}

function productDataFromForm(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const categoryId = String(formData.get("categoryId") ?? "");
  const priceFcfa = Number(formData.get("priceFcfa"));
  const description = String(formData.get("description") ?? "").trim();
  const tag = String(formData.get("tag") ?? "").trim();

  if (!name || !categoryId || !description) {
    throw new Error("Nom, catégorie et description sont requis.");
  }
  if (!Number.isInteger(priceFcfa) || priceFcfa <= 0) {
    throw new Error("Le prix doit être un nombre entier positif (en FCFA).");
  }
  return { name, categoryId, priceFcfa, description, tag: tag || null };
}

export async function createProduct(
  _prev: AdminActionState,
  formData: FormData
): Promise<AdminActionState> {
  try {
    await requireAdmin();
    const data = productDataFromForm(formData);

    const file = formData.get("image");
    if (!(file instanceof File) || file.size === 0) {
      throw new Error("Une photo du produit est requise.");
    }
    const imageUrl = await storeUploadedImage(file);

    const slug = `${slugify(data.name)}-${Date.now().toString(36)}`;
    await prisma.product.create({ data: { ...data, slug, imageUrl } });

    revalidatePath("/admin/produits");
    return { ok: true, message: `Produit « ${data.name} » créé.` };
  } catch (e) {
    return { ok: false, message: e instanceof Error ? e.message : "Erreur inattendue." };
  }
}

export async function updateProduct(
  _prev: AdminActionState,
  formData: FormData
): Promise<AdminActionState> {
  try {
    await requireAdmin();
    const id = String(formData.get("id") ?? "");
    if (!id) throw new Error("Produit introuvable.");
    const data = productDataFromForm(formData);

    const file = formData.get("image");
    const imageUrl =
      file instanceof File && file.size > 0 ? await storeUploadedImage(file) : undefined;

    await prisma.product.update({
      where: { id },
      data: { ...data, ...(imageUrl ? { imageUrl } : {}) },
    });

    revalidatePath("/admin/produits");
    return { ok: true, message: "Produit mis à jour." };
  } catch (e) {
    return { ok: false, message: e instanceof Error ? e.message : "Erreur inattendue." };
  }
}

export async function deleteProduct(formData: FormData): Promise<void> {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) return;
  const usedInOrders = await prisma.orderItem.count({ where: { productId: id } });
  if (usedInOrders > 0) {
    // Referenced by orders — removing the row would break history, so this
    // stays a hard no until an "archived" flag exists.
    throw new Error("Ce produit figure dans des commandes et ne peut pas être supprimé.");
  }
  await prisma.product.delete({ where: { id } });
  revalidatePath("/admin/produits");
}

export async function updateOrderStatus(formData: FormData): Promise<void> {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "");
  const allowed = ["pending", "confirmed", "delivered", "cancelled"];
  if (!id || !allowed.includes(status)) return;
  await prisma.order.update({ where: { id }, data: { status } });
  revalidatePath("/admin/commandes");
}
