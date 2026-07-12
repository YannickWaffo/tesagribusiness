"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
} from "react";

export type CartItem = {
  id: string;
  name: string;
  cat: string;
  price: number;
  img: string;
  qty: number;
};

const STORAGE_KEY = "tes-cart";
const EMPTY_CART: CartItem[] = [];

let cachedItems: CartItem[] = EMPTY_CART;
let cachedRaw: string | null = null;
const listeners = new Set<() => void>();

function readRaw(): string | null {
  try {
    return window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

function getSnapshot(): CartItem[] {
  const raw = readRaw();
  if (raw === cachedRaw) return cachedItems;
  cachedRaw = raw;
  try {
    cachedItems = raw ? (JSON.parse(raw) as CartItem[]) : EMPTY_CART;
  } catch {
    cachedItems = EMPTY_CART;
  }
  return cachedItems;
}

function getServerSnapshot(): CartItem[] {
  return EMPTY_CART;
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function writeCart(items: CartItem[]) {
  cachedItems = items;
  cachedRaw = JSON.stringify(items);
  window.localStorage.setItem(STORAGE_KEY, cachedRaw);
  listeners.forEach((listener) => listener());
}

type CartContextValue = {
  items: CartItem[];
  count: number;
  subtotal: number;
  addItem: (product: Omit<CartItem, "qty">, qty?: number) => void;
  updateQty: (id: string, qty: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const items = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const addItem = useCallback((product: Omit<CartItem, "qty">, qty = 1) => {
    const prev = getSnapshot();
    const existing = prev.find((it) => it.id === product.id);
    const next = existing
      ? prev.map((it) => (it.id === product.id ? { ...it, qty: it.qty + qty } : it))
      : [...prev, { ...product, qty }];
    writeCart(next);
  }, []);

  const updateQty = useCallback((id: string, qty: number) => {
    const prev = getSnapshot();
    const next =
      qty < 1
        ? prev.filter((it) => it.id !== id)
        : prev.map((it) => (it.id === id ? { ...it, qty } : it));
    writeCart(next);
  }, []);

  const removeItem = useCallback((id: string) => {
    writeCart(getSnapshot().filter((it) => it.id !== id));
  }, []);

  const clearCart = useCallback(() => writeCart(EMPTY_CART), []);

  const { count, subtotal } = useMemo(
    () => ({
      count: items.reduce((sum, it) => sum + it.qty, 0),
      subtotal: items.reduce((sum, it) => sum + it.qty * it.price, 0),
    }),
    [items]
  );

  const value = useMemo(
    () => ({ items, count, subtotal, addItem, updateQty, removeItem, clearCart }),
    [items, count, subtotal, addItem, updateQty, removeItem, clearCart]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
