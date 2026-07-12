import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { CartProvider } from "@/lib/cart-context";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "TES Agribusiness — Équipements agricoles au Cameroun",
  description:
    "Distributeur d'équipements agricoles au Cameroun (Yaoundé & Douala). Innovation, performance et productivité au service des agriculteurs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${jakarta.variable}`}>
      <body className="font-sans antialiased bg-white text-tes-ink">
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
