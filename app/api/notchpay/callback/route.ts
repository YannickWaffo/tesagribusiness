import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyPayment } from "@/lib/notchpay";

export const dynamic = "force-dynamic";

// NotchPay redirects the customer here after the hosted checkout, with the
// transaction reference in the query string. The status in the URL is not
// trusted: the transaction is re-verified against the NotchPay API.
export async function GET(request: Request) {
  const url = new URL(request.url);
  const reference =
    url.searchParams.get("reference") ?? url.searchParams.get("trxref") ?? "";

  if (!reference) {
    return NextResponse.redirect(new URL("/commande", url.origin));
  }

  try {
    const transaction = await verifyPayment(reference);
    // transaction.reference carries our order id (set at initialization)
    const orderId = transaction.reference;

    if (transaction.status === "complete") {
      await prisma.order.update({
        where: { id: orderId },
        data: { status: "confirmed" },
      });
      return NextResponse.redirect(
        new URL(`/commande/confirmation?ref=${orderId}&paiement=ok`, url.origin)
      );
    }

    if (["failed", "canceled", "expired"].includes(transaction.status)) {
      await prisma.order
        .update({ where: { id: orderId }, data: { status: "cancelled" } })
        .catch(() => {});
      return NextResponse.redirect(
        new URL(`/commande?paiement=echec`, url.origin)
      );
    }

    // pending / processing — show the confirmation page in "recorded" state
    return NextResponse.redirect(
      new URL(`/commande/confirmation?ref=${orderId}`, url.origin)
    );
  } catch (e) {
    console.error("[notchpay] callback verification failed", e);
    return NextResponse.redirect(new URL("/commande?paiement=echec", url.origin));
  }
}
