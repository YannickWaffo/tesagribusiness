export function fmtPrice(n: number): string {
  return n.toLocaleString("fr-FR").replace(/[  ,]/g, " ") + " FCFA";
}
