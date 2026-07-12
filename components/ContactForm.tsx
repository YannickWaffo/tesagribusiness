"use client";

import { useActionState } from "react";
import { sendContactMessage, type ContactState } from "@/lib/actions/contact";

const initialState: ContactState = null;

export function ContactForm({ compact = false }: { compact?: boolean }) {
  const [state, formAction, pending] = useActionState(sendContactMessage, initialState);

  return (
    <form
      action={formAction}
      className="rounded-[22px] border border-tes-border bg-white p-7 shadow-[0_24px_50px_-34px_rgba(20,40,26,.4)]"
    >
      {!compact && (
        <div className="mb-5 text-xl font-extrabold text-tes-ink">Envoyez-nous un message</div>
      )}
      <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
        <Field label="Nom complet" name="name" placeholder="Votre nom" />
        <Field label="Téléphone" name="phone" placeholder="+237…" />
        <Field
          label="E-mail"
          name="email"
          type="email"
          placeholder="vous@exemple.com"
          className="sm:col-span-2"
        />
        <Field
          label="Matériel recherché / sujet"
          name="subject"
          placeholder="Ex : devis tronçonneuse, SAV…"
          className="sm:col-span-2"
        />
        <div className="sm:col-span-2">
          <label className="text-xs font-bold text-tes-muted-3">Message</label>
          <textarea
            name="message"
            rows={compact ? 3 : 4}
            placeholder="Votre besoin…"
            className="mt-1.5 w-full resize-none rounded-xl border border-tes-border-soft bg-tes-bg px-3.5 py-3 text-sm text-tes-ink outline-none"
          />
        </div>
      </div>
      <button
        type="submit"
        disabled={pending}
        className="mt-4 w-full rounded-full bg-tes-green py-4 text-[15px] font-bold text-white transition-colors hover:bg-tes-ink disabled:opacity-70"
      >
        {pending ? "Envoi…" : compact ? "Envoyer ma demande" : "Envoyer le message"}
      </button>
      {state && (
        <p
          className={`mt-3 text-sm font-semibold ${state.ok ? "text-tes-green" : "text-red-600"}`}
        >
          {state.message}
        </p>
      )}
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  className,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <label className="text-xs font-bold text-tes-muted-3">{label}</label>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        className="mt-1.5 w-full rounded-xl border border-tes-border-soft bg-tes-bg px-3.5 py-3 text-sm text-tes-ink outline-none"
      />
    </div>
  );
}
