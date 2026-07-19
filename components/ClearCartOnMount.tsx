"use client";

import { useEffect } from "react";
import { useCart } from "@/lib/cart-context";

// Dropped on the order confirmation page: the cart is kept during the
// NotchPay redirect and only emptied once the customer lands back here.
export function ClearCartOnMount() {
  const { clearCart } = useCart();
  useEffect(() => {
    clearCart();
  }, [clearCart]);
  return null;
}
