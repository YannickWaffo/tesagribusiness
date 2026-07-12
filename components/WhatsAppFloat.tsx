import { COMPANY } from "@/lib/constants";

export function WhatsAppFloat() {
  return (
    <a
      href={COMPANY.wa}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Discuter sur WhatsApp"
      className="fixed bottom-7 right-7 z-[60] flex h-[62px] w-[62px] items-center justify-center rounded-full bg-tes-whatsapp shadow-[0_16px_34px_-10px_rgba(37,211,102,.7)]"
    >
      <span className="animate-pulse-ring absolute inset-0 -z-10 rounded-full bg-tes-whatsapp" />
      <span className="block h-6 w-7 rounded-[9px_9px_9px_3px] bg-white" />
    </a>
  );
}
