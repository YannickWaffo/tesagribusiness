import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { isAdminEmail } from "@/lib/admin";
import { SignOutButton } from "@/components/SignOutButton";

export const dynamic = "force-dynamic";

const NAV = [
  { href: "/admin", label: "Tableau de bord" },
  { href: "/admin/produits", label: "Produits" },
  { href: "/admin/commandes", label: "Commandes" },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session?.user) {
    redirect("/connexion?callbackUrl=/admin");
  }
  if (!isAdminEmail(session.user.email)) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-tes-bg px-6">
        <div className="max-w-[420px] rounded-3xl border border-tes-border bg-white p-10 text-center">
          <div className="mb-3 text-xl font-extrabold text-tes-ink">Accès réservé</div>
          <p className="mb-6 text-sm text-tes-muted">
            Ce compte ({session.user.email}) n&apos;a pas accès à l&apos;administration.
          </p>
          <Link href="/" className="font-bold text-tes-green">
            ← Retour au site
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-tes-bg">
      <div className="sticky top-0 z-40 border-b border-tes-border bg-white">
        <div className="mx-auto flex max-w-[1240px] flex-wrap items-center justify-between gap-4 px-6 py-4">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-tes-ink text-xs font-extrabold text-white">
              TES
            </span>
            <span className="font-extrabold text-tes-ink">Administration</span>
          </div>
          <nav className="flex flex-wrap gap-2">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full px-4 py-2 text-sm font-semibold text-tes-muted-2 hover:bg-tes-chip hover:text-tes-green"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-3 text-sm">
            <Link href="/" className="font-semibold text-tes-green">
              Voir le site
            </Link>
            <SignOutButton />
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-[1240px] px-6 py-8">{children}</div>
    </div>
  );
}
