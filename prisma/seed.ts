import { PrismaClient } from "../lib/generated/prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

const adapter = new PrismaMariaDb(process.env.DATABASE_URL!);
const prisma = new PrismaClient({ adapter });

function slugify(input: string): string {
  return input
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const MONTHS: Record<string, number> = {
  janvier: 0,
  février: 1,
  mars: 2,
  avril: 3,
  mai: 4,
  juin: 5,
  juillet: 6,
  août: 7,
  septembre: 8,
  octobre: 9,
  novembre: 10,
  décembre: 11,
};

function parseFrenchDate(input: string): Date {
  const [day, month, year] = input.split(" ");
  return new Date(Number(year), MONTHS[month] ?? 0, Number(day));
}

const categories = [
  { name: "Semis", icon: "seeder" },
  { name: "Fertilisation", icon: "seeder" },
  { name: "Pulvérisation", icon: "sprayer" },
  { name: "Débroussailleuses", icon: "brush" },
  { name: "Tronçonneuses", icon: "chainsaw" },
  { name: "Tarières", icon: "auger" },
  { name: "Outils horticoles", icon: "tools" },
  { name: "Motopompes", icon: "pump" },
  { name: "Consommables", icon: "parts" },
];

// Products from design_reference/assets/tes-data.js.
// "Équipements de protection" (p18) is folded into "Outils horticoles" to
// match the official category list from the project brief.
const products = [
  { id: "p1", name: "Semoir rotatif", cat: "Semis", price: 145000, tag: "", img: "Semoir-Manuel-a-Pression-Debout-4.webp", desc: "Semoir rotatif pour un semis précis et régulier, adapté aux petites et moyennes parcelles." },
  { id: "p2", name: "Semoir manuel", cat: "Semis", price: 95000, tag: "", img: "512O4FmaNnL._AC_SL1001_.jpg", desc: "Semoir manuel monorang, simple et fiable, pour accélérer le semis sur le terrain." },
  { id: "p3", name: "Épandeur d'engrais granulés", cat: "Fertilisation", price: 165000, tag: "", img: "High-Quality-Fertilizer-Seed-Pusher-Double-Barrel-Corn-Rice-Planter.avif", desc: "Épandage régulier d'engrais granulés pour une fertilisation homogène de vos parcelles." },
  { id: "p4", name: "Atomiseur SOLO", cat: "Pulvérisation", price: 275000, tag: "", img: "atomiseur-solo-45203.webp", desc: "Atomiseur à dos économique et fiable pour la pulvérisation de traitements phytosanitaires." },
  { id: "p5", name: "Atomiseur STIHL SR420", cat: "Pulvérisation", price: 520000, tag: "Best-seller", img: "ATOMIZADORA-STIHL-SR-420.png", desc: "Atomiseur à dos haute performance pour le traitement de vos cultures sur de grandes surfaces." },
  { id: "p6", name: "Pulvérisateur à moteur", cat: "Pulvérisation", price: 340000, tag: "", img: "atomiseur-solo-45203.webp", desc: "Pulvérisateur motorisé pour un traitement rapide et efficace des cultures." },
  { id: "p7", name: "Débroussailleuse STIHL", cat: "Débroussailleuses", price: 395000, tag: "Best-seller", img: "0505-1352-stihl-fs-220-brush-cutter-0.jpg", desc: "Débroussailleuse thermique puissante pour le nettoyage de grandes parcelles et broussailles denses." },
  { id: "p8", name: "Débroussailleuse à dos 4 temps", cat: "Débroussailleuses", price: 360000, tag: "", img: "Debroussailleuse-pro-srm-420-es.webp", desc: "Moteur 4 temps, excellent rapport puissance/poids, harnais confort pour les longues journées." },
  { id: "p9", name: "Débroussailleuse à dos 2 temps", cat: "Débroussailleuses", price: 320000, tag: "Promo", img: "Debroussailleuse-pro-srm-420-es.webp", desc: "Modèle 2 temps léger, idéal pour l'entretien courant des parcelles." },
  { id: "p10", name: "Tronçonneuse STIHL 070", cat: "Tronçonneuses", price: 485000, tag: "", img: "9e2224a170e29b45ee1ee9857be40001a1946b2c.png", desc: "Tronçonneuse professionnelle grande puissance, idéale pour l'abattage et la coupe de gros bois." },
  { id: "p11", name: "Tronçonneuse STIHL 520", cat: "Tronçonneuses", price: 365000, tag: "", img: "Tronconneuse-STIHL-MS-194TC-E-35-LIGHT-11372000328.png", desc: "Modèle compact et léger, parfait pour l'élagage et les travaux d'entretien courants." },
  { id: "p12", name: "Tronçonneuse HIKA 5800", cat: "Tronçonneuses", price: 245000, tag: "Promo", img: "9e2224a170e29b45ee1ee9857be40001a1946b2c.png", desc: "Solution économique pour la coupe de bois et l'entretien de parcelles." },
  { id: "p13", name: "Tarière VACKSON (3 mèches)", cat: "Tarières", price: 340000, tag: "Nouveau", img: "bt131-stihl-one-man-earth-auger-500x500.webp", desc: "Tarière thermique livrée avec 3 mèches, pour le forage de trous de plantation et poteaux." },
  { id: "p14", name: "Tarière STIHL", cat: "Tarières", price: 355000, tag: "", img: "bt131-stihl-one-man-earth-auger-500x500.webp", desc: "Tarière une personne pour un forage rapide et régulier." },
  { id: "p15", name: "Tarière GREENX", cat: "Tarières", price: 290000, tag: "", img: "bt131-stihl-one-man-earth-auger-500x500.webp", desc: "Tarière thermique fiable à prix accessible pour les petites exploitations." },
  { id: "p16", name: "Sécateur professionnel", cat: "Outils horticoles", price: 18000, tag: "", img: "512O4FmaNnL._AC_SL1001_.jpg", desc: "Sécateur robuste pour la taille et l'entretien des cultures." },
  { id: "p17", name: "Ciseau de greffage", cat: "Outils horticoles", price: 22000, tag: "", img: "512O4FmaNnL._AC_SL1001_.jpg", desc: "Outil de précision pour le greffage des plants." },
  { id: "p18", name: "Masque de protection", cat: "Outils horticoles", price: 12000, tag: "", img: "512O4FmaNnL._AC_SL1001_.jpg", desc: "Protection respiratoire pour les travaux de traitement et de coupe." },
  { id: "p19", name: "Huile 2 temps", cat: "Consommables", price: 6000, tag: "", img: "512O4FmaNnL._AC_SL1001_.jpg", desc: "Huile pour moteurs 2 temps, compatible avec tronçonneuses et débroussailleuses." },
  { id: "p20", name: "Chaîne STIHL 070", cat: "Consommables", price: 28000, tag: "", img: "9e2224a170e29b45ee1ee9857be40001a1946b2c.png", desc: "Chaîne de rechange d'origine pour tronçonneuse STIHL 070." },
  { id: "p21", name: "Motopompe EUROVOLTA sortie 80", cat: "Motopompes", price: 410000, tag: "Nouveau", img: "gd750x_00b.png", desc: "Motopompe sortie 80mm pour l'irrigation de vos parcelles, robuste et facile d'entretien." },
  { id: "p22", name: "Motopompe KINGMAX sortie 80", cat: "Motopompes", price: 385000, tag: "", img: "motopompe_thermique_eau_chargees.png", desc: "Motopompe sortie 80mm, bon rapport performance/prix pour l'irrigation." },
  { id: "p23", name: "Motopompe ROYALTY sortie 100", cat: "Motopompes", price: 450000, tag: "", img: "gd750x_00b.png", desc: "Motopompe grand débit sortie 100mm pour l'irrigation de grandes surfaces." },
];

const posts = [
  { id: "b1", title: "5 conseils pour entretenir votre tronçonneuse en saison sèche", excerpt: "Un entretien régulier prolonge la durée de vie de votre matériel et évite les pannes coûteuses en pleine récolte.", date: "12 juin 2026", cat: "Entretien", readTime: "4 min" },
  { id: "b2", title: "Irrigation goutte-à-goutte : bien choisir sa motopompe", excerpt: "Débit, pression, distance de refoulement : les critères essentiels pour dimensionner votre système d'irrigation.", date: "2 juin 2026", cat: "Irrigation", readTime: "6 min" },
  { id: "b3", title: "Semis de maïs : quel espacement pour optimiser le rendement ?", excerpt: "Nos agronomes partagent leurs recommandations d'espacement selon le type de sol et la variété choisie.", date: "24 mai 2026", cat: "Agronomie", readTime: "5 min" },
  { id: "b4", title: "Pourquoi financer son matériel agricole plutôt que l'acheter comptant", excerpt: "Les avantages du crédit agricole et des facilités de paiement pour préserver votre trésorerie.", date: "15 mai 2026", cat: "Financement", readTime: "3 min" },
  { id: "b5", title: "Débroussailleuse ou tronçonneuse : quel outil pour quel usage ?", excerpt: "Un guide pratique pour choisir le bon outil selon la nature de vos parcelles et la végétation à traiter.", date: "3 mai 2026", cat: "Guide d'achat", readTime: "5 min" },
  { id: "b6", title: "Comment préparer votre matériel avant la saison des pluies", excerpt: "Check-list complète pour éviter les mauvaises surprises quand la saison des pluies démarre.", date: "20 avril 2026", cat: "Entretien", readTime: "4 min" },
];

const ARTICLE_BODY = [
  "Chez TES Agribusiness, nous croyons qu'un bon entretien et les bons choix techniques font toute la différence sur le rendement d'une exploitation. Nos conseillers et notre atelier accompagnent chaque client, de la sélection du matériel jusqu'à sa maintenance au quotidien.",
  "Pour aller plus loin, nos équipes restent disponibles en boutique ou par téléphone pour un diagnostic personnalisé selon votre type de culture et la taille de votre exploitation.",
].join("\n\n");

async function main() {
  console.log("Seeding categories…");
  const categoryByName = new Map<string, string>();
  for (const c of categories) {
    const row = await prisma.category.upsert({
      where: { name: c.name },
      update: { icon: c.icon },
      create: c,
    });
    categoryByName.set(c.name, row.id);
  }

  console.log("Seeding products…");
  for (const p of products) {
    const categoryId = categoryByName.get(p.cat);
    if (!categoryId) throw new Error(`Unknown category: ${p.cat}`);
    const slug = `${slugify(p.name)}-${p.id}`;
    await prisma.product.upsert({
      where: { slug },
      update: {
        name: p.name,
        categoryId,
        priceFcfa: p.price,
        description: p.desc,
        imageUrl: `/uploads/${p.img}`,
        tag: p.tag || null,
      },
      create: {
        name: p.name,
        slug,
        categoryId,
        priceFcfa: p.price,
        description: p.desc,
        imageUrl: `/uploads/${p.img}`,
        tag: p.tag || null,
      },
    });
  }

  console.log("Seeding blog posts…");
  for (const post of posts) {
    const slug = slugify(post.title);
    await prisma.blogPost.upsert({
      where: { slug },
      update: {
        title: post.title,
        excerpt: post.excerpt,
        content: `${post.excerpt}\n\n${ARTICLE_BODY}`,
        category: post.cat,
        readTime: post.readTime,
        publishedAt: parseFrenchDate(post.date),
      },
      create: {
        title: post.title,
        slug,
        excerpt: post.excerpt,
        content: `${post.excerpt}\n\n${ARTICLE_BODY}`,
        category: post.cat,
        readTime: post.readTime,
        publishedAt: parseFrenchDate(post.date),
      },
    });
  }

  console.log("Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
