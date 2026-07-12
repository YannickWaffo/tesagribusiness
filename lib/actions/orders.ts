"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { DELIVERY_FEE } from "@/lib/constants";

export type CreateOrderInput = {
  items: { id: string; qty: number }[];
  customerName: string;
  phone: string;
  email?: string;
  deliveryMode: "pickup" | "delivery";
  storeCity?: string;
  address?: string;
};

export type CreateOrderResult = { ok: true; orderId: string } | { ok: false; error: string };

export async function createOrder(input: CreateOrderInput): Promise<CreateOrderResult> {
  const { items, customerName, phone, deliveryMode, storeCity, address } = input;

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

  return { ok: true, orderId: order.id };
}
