import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const NOTCHPAY_API = "https://api.notchpay.co";

// Diagnostic only: GET /api/notchpay/test?key=<AUTH_SECRET>
// Runs a real payment initialization and returns NotchPay's raw response
// so we can see the exact error without digging through server logs.
export async function GET(request: Request) {
  const key = new URL(request.url).searchParams.get("key");
  if (!process.env.AUTH_SECRET || key !== process.env.AUTH_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const publicKey = process.env.NOTCHPAY_PUBLIC_KEY ?? "(fallback hardcoded)";
  const secretKey = process.env.NOTCHPAY_SECRET_KEY;

  const attempts: Record<string, unknown> = {};

  async function attempt(label: string, headers: Record<string, string>) {
    try {
      const res = await fetch(`${NOTCHPAY_API}/payments`, {
        method: "POST",
        headers: { ...headers, "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          amount: 100,
          currency: "XAF",
          customer: { name: "Test Diagnostic", phone: "+237600000000" },
          reference: `diag-${Date.now()}`,
          description: "Test de configuration NotchPay",
          callback: "https://example.com/callback",
        }),
        cache: "no-store",
      });
      const body = await res.text();
      let parsed: unknown = body;
      try {
        parsed = JSON.parse(body);
      } catch {}
      attempts[label] = { status: res.status, body: parsed };
    } catch (e) {
      attempts[label] = { error: e instanceof Error ? e.message : String(e) };
    }
  }

  // Try the header combinations NotchPay accepts across versions.
  await attempt("public_only", { Authorization: publicKey });
  if (secretKey) {
    await attempt("secret_only", { Authorization: secretKey });
    await attempt("secret_with_grant", { Authorization: secretKey, "X-Grant": publicKey });
  }

  return NextResponse.json({
    env: {
      hasPublicKey: !!process.env.NOTCHPAY_PUBLIC_KEY,
      hasSecretKey: !!secretKey,
      publicKeyPrefix: publicKey.slice(0, 6),
      secretKeyPrefix: secretKey ? secretKey.slice(0, 6) : null,
    },
    attempts,
  });
}
