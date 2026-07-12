"use client";

import { useActionState } from "react";
import { subscribeNewsletter, type ContactState } from "@/lib/actions/contact";

const initialState: ContactState = null;

export function NewsletterForm() {
  const [state, formAction, pending] = useActionState(subscribeNewsletter, initialState);

  return (
    <form
      action={formAction}
      className="mt-[42px] flex flex-wrap items-center justify-between gap-6 rounded-[22px] bg-tes-ink px-[34px] py-[30px]"
    >
      <div>
        <div className="text-xl font-extrabold text-white">
          Une longueur d&apos;avance chaque saison
        </div>
        <div className="mt-1 text-sm text-[#9fb6a6]">
          Conseils, nouveautés et promos matériel — 1×/mois.
        </div>
        {state && (
          <div className={`mt-2 text-sm font-semibold ${state.ok ? "text-tes-gold" : "text-red-400"}`}>
            {state.message}
          </div>
        )}
      </div>
      <div className="flex gap-2 rounded-full bg-white p-1.5">
        <input
          name="email"
          type="email"
          placeholder="Votre e-mail"
          className="w-[230px] border-none bg-transparent px-4 text-sm text-tes-ink outline-none"
        />
        <button
          type="submit"
          disabled={pending}
          className="rounded-full bg-tes-gold px-6 py-2.5 text-sm font-extrabold text-tes-ink disabled:opacity-70"
        >
          {pending ? "…" : "S'abonner"}
        </button>
      </div>
    </form>
  );
}
