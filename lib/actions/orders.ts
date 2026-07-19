"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { DELIVERY_FEE } from "@/lib/constants";
import { getBaseUrl, initializePayment } from "@/lib/notchpay";

export type CreateOrderInput = {
  items: { id: string; qty: number }[];
  customerName: string;
  phone: string;
  email?: string;
  deliveryMode: "pickup" | "delivery";
  storeCity?: string;
  address?: string;
  payment?: "notchpay" | "on_delivery";
};

export type CreateOrderResult =
  | { ok: true; orderId: string; paymentUrl?: string }
  | { ok: false; error: string };

export async function createOrder(input: CreateOrderInput): Promise<CreateOrderResult> {
  const { items, customerName, phone, deliveryMode, storeCity, address, payment } = input;

  if (!items.length) return { ok: false, error: "Votre panier est vide." };
  if (!customerName.trim() || !phone.trim()) {
    return { ok: false, error: "Merci de renseigner votre nom et votre téléphone." };
  }
  if (deliveryMode === "delivery" && !address?.trim()) {
    return { ok: false, error: "Merci de renseigner votre adresse de livraison." };
  }

  const products = await prisma.product.findMany({
    where: { id: { in: items.map((it) => it.id) } },
  });
  if (products.length !== items.length) {
    return { ok: false, error: "Certains articles de votre panier ne sont plus disponibles." };
  }

  const priceById = new Map(products.map((p) => [p.id, p.priceFcfa]));
  const subtotal = items.reduce((sum, it) => sum + (priceById.get(it.id) ?? 0) * it.qty, 0);
  const deliveryFee = deliveryMode === "delivery" ? DELIVERY_FEE : 0;
  const totalFcfa = subtotal + deliveryFee;

  const session = await auth();

  const order = await prisma.order.create({
    data: {
      userId: session?.user?.id,
      customerName: customerName.trim(),
      phone: phone.trim(),
      deliveryMode,
      storeCity: deliveryMode === "pickup" ? (storeCity ?? null) : null,
      address: deliveryMode === "delivery" ? address?.trim() : null,
      totalFcfa,
      items: {
        create: items.map((it) => ({
          productId: it.id,
          quantity: it.qty,
          priceFcfa: priceById.get(it.id) ?? 0,
        })),
      },
    },
  });

  if (payment === "notchpay") {
    try {
      const baseUrl = await getBaseUrl();
      const { authorizationUrl } = await initializePayment({
        amount: totalFcfa,
        reference: order.id,
        name: customerName.trim(),
        phone: phone.trim(),
        email: input.email?.trim() || undefined,
        description: `Commande TES Agribusiness — ${items.length} article(s)`,
        callback: `${baseUrl}/api/notchpay/callback`,
      });
      return { ok: true, orderId: order.id, paymentUrl: authorizationUrl };
    } catch (e) {
      // The order exists but payment could not start; cancel it so the
      // customer can retry cleanly (their cart is still intact client-side).
      await prisma.order
        .update({ where: { id: order.id }, data: { status: "cancelled" } })
        .catch(() => {});
      console.error("[notchpay] initialization failed", e);
      return {
        ok: false,
        error:
          "Le paiement en ligne est momentanément indisponible. Réessayez ou choisissez le paiement à la livraison.",
      };
    }
  }

  return { ok: true, orderId: order.id };
}
