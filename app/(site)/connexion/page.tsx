"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setPending(true);
    const formData = new FormData(e.currentTarget);
    const result = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });
    setPending(false);
    if (result?.error) {
      setError("E-mail ou mot de passe incorrect.");
      return;
    }
    router.push("/compte");
    router.refresh();
  }

  return (
    <div className="bg-tes-bg px-6 py-[60px] md:px-11">
      <div className="mx-auto max-w-[420px]">
        <h1 className="mb-1.5 text-center text-2xl font-extrabold text-tes-ink">Connexion</h1>
        <p className="mb-[26px] text-center text-sm text-tes-muted">
          Accédez à votre espace client pour suivre vos commandes.
        </p>
        <form
          onSubmit={handleSubmit}
          className="rounded-[22px] border border-tes-border bg-white p-7"
        >
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
              className="mt-1.5 w-full rounded-xl border border-tes-border-soft bg-tes-bg px-3.5 py-3 text-sm text-tes-ink outline-none"
            />
          </div>
          <button
            type="submit"
            disabled={pending}
            className="w-full rounded-full bg-tes-green py-3.5 text-sm font-bold text-white disabled:opacity-70"
          >
            {pending ? "Connexion…" : "Se connecter"}
          </button>
          {error && <p className="mt-3 text-sm font-semibold text-red-600">{error}</p>}
        </form>
        <p className="mt-4 text-center text-sm text-tes-muted">
          Pas encore de compte ?{" "}
          <Link href="/inscription" className="font-bold text-tes-green">
            Créer un compte
          </Link>
        </p>
      </div>
    </div>
  );
}
