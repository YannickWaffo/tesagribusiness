"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { signup, type SignupState } from "@/lib/actions/auth";

const initialState: SignupState = null;

export default function SignupPage() {
  const router = useRouter();
  const [state, formAction, pending] = useActionState(signup, initialState);

  useEffect(() => {
    if (state?.ok) {
      const form = document.getElementById("signup-form") as HTMLFormElement | null;
      const email = (form?.elements.namedItem("email") as HTMLInputElement | null)?.value;
      const password = (form?.elements.namedItem("password") as HTMLInputElement | null)?.value;
      if (email && password) {
        signIn("credentials", { email, password, redirect: false }).then(() => {
          router.push("/compte");
          router.refresh();
        });
      }
    }
  }, [state, router]);

  return (
    <div className="bg-tes-bg px-6 py-[60px] md:px-11">
      <div className="mx-auto max-w-[420px]">
        <h1 className="mb-1.5 text-center text-2xl font-extrabold text-tes-ink">Créer un compte</h1>
        <p className="mb-[26px] text-center text-sm text-tes-muted">
          Pour suivre vos commandes et retrouver votre historique d&apos;achat.
        </p>
        <form
          id="signup-form"
          action={formAction}
          className="rounded-[22px] border border-tes-border bg-white p-7"
        >
          <div className="mb-3.5">
            <label className="text-xs font-bold text-tes-muted-3">Nom complet</label>
            <input
              name="name"
              required
              className="mt-1.5 w-full rounded-xl border border-tes-border-soft bg-tes-bg px-3.5 py-3 text-sm text-tes-ink outline-none"
            />
          </div>
          <div className="mb-3.5">
            <label className="text-xs font-bold text-tes-muted-3">E-mail</label>
            <input
              name="email"
              type="email"
              required
              className="mt-1.5 w-full rounded-xl border border-tes-border-soft bg-tes-bg px-3.5 py-3 text-sm text-tes-ink outline-none"
            />
          </div>
          <div className="mb-[18px]">
            <label className="text-xs font-bold text-tes-muted-3">Mot de passe</label>
            <input
              name="password"
              type="password"
              required
              minLength={8}
              className="mt-1.5 w-full rounded-xl border border-tes-border-soft bg-tes-bg px-3.5 py-3 text-sm text-tes-ink outline-none"
            />
          </div>
          <button
            type="submit"
            disabled={pending}
            className="w-full rounded-full bg-tes-green py-3.5 text-sm font-bold text-white disabled:opacity-70"
          >
            {pending ? "Création…" : "Créer mon compte"}
          </button>
          {state && !state.ok && (
            <p className="mt-3 text-sm font-semibold text-red-600">{state.error}</p>
          )}
        </form>
        <p className="mt-4 text-center text-sm text-tes-muted">
          Déjà un compte ?{" "}
          <Link href="/connexion" className="font-bold text-tes-green">
            Se connecter
          </Link>
        </p>
      </div>
    </div>
  );
}
