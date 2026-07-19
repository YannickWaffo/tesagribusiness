export const ORDER_STATUSES = [
  { value: "pending", label: "En attente" },
  { value: "confirmed", label: "Confirmée" },
  { value: "delivered", label: "Livrée" },
  { value: "cancelled", label: "Annulée" },
];

export function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    pending: "bg-tes-gold/15 text-[#8a6a12]",
    confirmed: "bg-tes-chip text-tes-green",
    delivered: "bg-tes-green text-white",
    cancelled: "bg-red-100 text-red-700",
  };
  const label = ORDER_STATUSES.find((s) => s.value === status)?.label ?? status;
  return (
    <span className={`rounded-full px-3 py-1 text-xs font-bold ${styles[status] ?? styles.pending}`}>
      {label}
    </span>
  );
}
