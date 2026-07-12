"use server";

export type ContactState = { ok: boolean; message: string } | null;

export async function sendContactMessage(
  _prev: ContactState,
  formData: FormData
): Promise<ContactState> {
  const name = String(formData.get("name") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const subject = String(formData.get("subject") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!name || !phone || !message) {
    return { ok: false, message: "Merci de renseigner votre nom, téléphone et message." };
  }

  // No paid email service in this low-cost setup — log server-side so hPanel
  // logs capture the request. Wire up an SMTP/transactional provider later
  // if needed without changing the form.
  console.log("[contact]", { name, phone, email, subject, message });

  return { ok: true, message: "Merci ! Votre message a bien été envoyé, nous revenons vers vous sous 24h." };
}

export async function subscribeNewsletter(
  _prev: ContactState,
  formData: FormData
): Promise<ContactState> {
  const email = String(formData.get("email") ?? "").trim();
  if (!email || !email.includes("@")) {
    return { ok: false, message: "Merci de renseigner une adresse e-mail valide." };
  }
  console.log("[newsletter]", { email });
  return { ok: true, message: "Merci pour votre inscription !" };
}
