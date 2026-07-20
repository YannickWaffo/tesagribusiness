import { headers } from "next/headers";

const NOTCHPAY_API = "https://api.notchpay.co";

// The public key identifies the merchant on checkout pages; it is not a
// secret. Overridable via env for sandbox/production switches.
const PUBLIC_KEY =
  process.env.NOTCHPAY_PUBLIC_KEY ??
  "pk.9GrZQhjhjvhBqhFLGmhQUAd9Jcwgne7hGIPqTblvyPhLLM29UTQafFzHJlsixDHgphvabtgpLP0ZZpEOx98KpS1kalxXRG93eaMO5EYiv5PdeNO0yJ7RjQbs0Ao9L";

// These calls run only on the server (a Server Action and the callback
// route), so authenticate with the secret key when it's configured;
// fall back to the public key otherwise. NotchPay accepts the private
// key in Authorization and, for some operations, an X-Grant header.
const SECRET_KEY = process.env.NOTCHPAY_SECRET_KEY;

function authHeaders(): Record<string, string> {
  if (SECRET_KEY) {
    return { Authorization: SECRET_KEY, "X-Grant": PUBLIC_KEY };
  }
  return { Authorization: PUBLIC_KEY };
}

export async function getBaseUrl(): Promise<string> {
  if (process.env.SITE_URL) return process.env.SITE_URL.replace(/\/$/, "");
  const h = await headers();
  const proto = h.get("x-forwarded-proto") ?? "https";
  const host = h.get("x-forwarded-host") ?? h.get("host");
  return `${proto}://${host}`;
}

export type NotchPayTransaction = {
  id: string;
  reference: string;
  amount: number;
  currency: string;
  status: string;
};

export async function initializePayment(input: {
  amount: number;
  reference: string;
  name: string;
  phone: string;
  email?: string;
  description: string;
  callback: string;
}): Promise<{ authorizationUrl: string }> {
  const res = await fetch(`${NOTCHPAY_API}/payments`, {
    method: "POST",
    headers: {
      ...authHeaders(),
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      amount: input.amount,
      currency: "XAF",
      customer: {
        name: input.name,
        phone: input.phone,
        ...(input.email ? { email: input.email } : {}),
      },
      reference: input.reference,
      description: input.description,
      callback: input.callback,
    }),
    cache: "no-store",
  });

  const data = (await res.json().catch(() => null)) as {
    authorization_url?: string;
    message?: string;
  } | null;

  if (!res.ok || !data?.authorization_url) {
    throw new Error(
      `NotchPay initialization failed (${res.status}): ${data?.message ?? "réponse invalide"}`
    );
  }
  return { authorizationUrl: data.authorization_url };
}

export async function verifyPayment(reference: string): Promise<NotchPayTransaction> {
  const res = await fetch(`${NOTCHPAY_API}/payments/${encodeURIComponent(reference)}`, {
    headers: { ...authHeaders(), Accept: "application/json" },
    cache: "no-store",
  });
  const data = (await res.json().catch(() => null)) as {
    transaction?: NotchPayTransaction;
    message?: string;
  } | null;

  if (!res.ok || !data?.transaction) {
    throw new Error(
      `NotchPay verification failed (${res.status}): ${data?.message ?? "réponse invalide"}`
    );
  }
  return data.transaction;
}
