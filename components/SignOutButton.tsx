"use client";

import { signOut } from "next-auth/react";

export function SignOutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/" })}
      className="rounded-full border border-tes-border-soft bg-white px-5 py-2.5 text-sm font-bold text-tes-ink"
    >
      Se déconnecter
    </button>
  );
}
