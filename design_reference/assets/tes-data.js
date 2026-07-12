// Shared content for TES Agribusiness pages (data only — no React here).
export const categories = [
  { icon: 'seeder', name: 'Semis', count: 2 },
  { icon: 'seeder', name: 'Fertilisation', count: 1 },
  { icon: 'sprayer', name: 'Pulvérisation', count: 3 },
  { icon: 'brush', name: 'Débroussailleuses', count: 3 },
  { icon: 'chainsaw', name: 'Tronçonneuses', count: 3 },
  { icon: 'auger', name: 'Tarières', count: 3 },
  { icon: 'tools', name: 'Outils horticoles', count: 2 },
  { icon: 'pump', name: 'Motopompes', count: 3 },
];

export const products = [
  { id: 'p1', name: 'Semoir rotatif', cat: 'Semis', icon: 'seeder', price: 145000, tag: '', img: 'uploads/Semoir-Manuel-a-Pression-Debout-4.webp', desc: 'Semoir rotatif pour un semis précis et régulier, adapté aux petites et moyennes parcelles.' },
  { id: 'p2', name: 'Semoir manuel', cat: 'Semis', icon: 'seeder', price: 95000, tag: '', img: 'uploads/512O4FmaNnL._AC_SL1001_.jpg', desc: 'Semoir manuel monorang, simple et fiable, pour accélérer le semis sur le terrain.' },
  { id: 'p3', name: 'Épandeur d\'engrais granulés', cat: 'Fertilisation', icon: 'seeder', price: 165000, tag: '', img: 'uploads/High-Quality-Fertilizer-Seed-Pusher-Double-Barrel-Corn-Rice-Planter.avif', desc: 'Épandage régulier d\'engrais granulés pour une fertilisation homogène de vos parcelles.' },
  { id: 'p4', name: 'Atomiseur SOLO', cat: 'Pulvérisation', icon: 'sprayer', price: 275000, tag: '', img: 'uploads/atomiseur-solo-45203.webp', desc: 'Atomiseur à dos économique et fiable pour la pulvérisation de traitements phytosanitaires.' },
  { id: 'p5', name: 'Atomiseur STIHL SR420', cat: 'Pulvérisation', icon: 'sprayer', price: 520000, tag: 'Best‑seller', img: 'uploads/ATOMIZADORA-STIHL-SR-420.png', desc: "Atomiseur à dos haute performance pour le traitement de vos cultures sur de grandes surfaces." },
  { id: 'p6', name: 'Pulvérisateur à moteur', cat: 'Pulvérisation', icon: 'sprayer', price: 340000, tag: '', img: 'uploads/atomiseur-solo-45203.webp', desc: 'Pulvérisateur motorisé pour un traitement rapide et efficace des cultures.' },
  { id: 'p7', name: 'Débroussailleuse STIHL', cat: 'Débroussailleuses', icon: 'brush', price: 395000, tag: 'Best‑seller', img: 'uploads/0505-1352-stihl-fs-220-brush-cutter-0.jpg', desc: 'Débroussailleuse thermique puissante pour le nettoyage de grandes parcelles et broussailles denses.' },
  { id: 'p8', name: 'Débroussailleuse à dos 4 temps', cat: 'Débroussailleuses', icon: 'brush', price: 360000, tag: '', img: 'uploads/Debroussailleuse-pro-srm-420-es.webp', desc: 'Moteur 4 temps, excellent rapport puissance/poids, harnais confort pour les longues journées.' },
  { id: 'p9', name: 'Débroussailleuse à dos 2 temps', cat: 'Débroussailleuses', icon: 'brush', price: 320000, tag: 'Promo', img: 'uploads/Debroussailleuse-pro-srm-420-es.webp', desc: 'Modèle 2 temps léger, idéal pour l\'entretien courant des parcelles.' },
  { id: 'p10', name: 'Tronçonneuse STIHL 070', cat: 'Tronçonneuses', icon: 'chainsaw', price: 485000, tag: '', img: 'uploads/9e2224a170e29b45ee1ee9857be40001a1946b2c.png', desc: "Tronçonneuse professionnelle grande puissance, idéale pour l'abattage et la coupe de gros bois." },
  { id: 'p11', name: 'Tronçonneuse STIHL 520', cat: 'Tronçonneuses', icon: 'chainsaw', price: 365000, tag: '', img: 'uploads/Tronconneuse-STIHL-MS-194TC-E-35-LIGHT-11372000328.png', desc: 'Modèle compact et léger, parfait pour l\'élagage et les travaux d\'entretien courants.' },
  { id: 'p12', name: 'Tronçonneuse HIKA 5800', cat: 'Tronçonneuses', icon: 'chainsaw', price: 245000, tag: 'Promo', img: 'uploads/9e2224a170e29b45ee1ee9857be40001a1946b2c.png', desc: 'Solution économique pour la coupe de bois et l\'entretien de parcelles.' },
  { id: 'p13', name: 'Tarière VACKSON (3 mèches)', cat: 'Tarières', icon: 'auger', price: 340000, tag: 'Nouveau', img: 'uploads/bt131-stihl-one-man-earth-auger-500x500.webp', desc: "Tarière thermique livrée avec 3 mèches, pour le forage de trous de plantation et poteaux." },
  { id: 'p14', name: 'Tarière STIHL', cat: 'Tarières', icon: 'auger', price: 355000, tag: '', img: 'uploads/bt131-stihl-one-man-earth-auger-500x500.webp', desc: "Tarière une personne pour un forage rapide et régulier." },
  { id: 'p15', name: 'Tarière GREENX', cat: 'Tarières', icon: 'auger', price: 290000, tag: '', img: 'uploads/bt131-stihl-one-man-earth-auger-500x500.webp', desc: "Tarière thermique fiable à prix accessible pour les petites exploitations." },
  { id: 'p16', name: 'Sécateur professionnel', cat: 'Outils horticoles', icon: 'tools', price: 18000, tag: '', img: 'uploads/512O4FmaNnL._AC_SL1001_.jpg', desc: 'Sécateur robuste pour la taille et l\'entretien des cultures.' },
  { id: 'p17', name: 'Ciseau de greffage', cat: 'Outils horticoles', icon: 'tools', price: 22000, tag: '', img: 'uploads/512O4FmaNnL._AC_SL1001_.jpg', desc: 'Outil de précision pour le greffage des plants.' },
  { id: 'p18', name: 'Masque de protection', cat: 'Équipements de protection', icon: 'tools', price: 12000, tag: '', img: 'uploads/512O4FmaNnL._AC_SL1001_.jpg', desc: 'Protection respiratoire pour les travaux de traitement et de coupe.' },
  { id: 'p19', name: 'Huile 2 temps', cat: 'Consommables', icon: 'parts', price: 6000, tag: '', img: 'uploads/512O4FmaNnL._AC_SL1001_.jpg', desc: 'Huile pour moteurs 2 temps, compatible avec tronçonneuses et débroussailleuses.' },
  { id: 'p20', name: 'Chaîne STIHL 070', cat: 'Consommables', icon: 'parts', price: 28000, tag: '', img: 'uploads/9e2224a170e29b45ee1ee9857be40001a1946b2c.png', desc: 'Chaîne de rechange d\'origine pour tronçonneuse STIHL 070.' },
  { id: 'p21', name: 'Motopompe EUROVOLTA sortie 80', cat: 'Motopompes', icon: 'pump', price: 410000, tag: 'Nouveau', img: 'uploads/gd750x_00b.png', desc: "Motopompe sortie 80mm pour l'irrigation de vos parcelles, robuste et facile d'entretien." },
  { id: 'p22', name: 'Motopompe KINGMAX sortie 80', cat: 'Motopompes', icon: 'pump', price: 385000, tag: '', img: 'uploads/motopompe_thermique_eau_chargees.png', desc: "Motopompe sortie 80mm, bon rapport performance/prix pour l'irrigation." },
  { id: 'p23', name: 'Motopompe ROYALTY sortie 100', cat: 'Motopompes', icon: 'pump', price: 450000, tag: '', img: 'uploads/gd750x_00b.png', desc: "Motopompe grand débit sortie 100mm pour l'irrigation de grandes surfaces." },
];

export const services = [
  { n: '1', title: 'Livraison en boutique', desc: 'Retrait ou livraison dans nos boutiques de Yaoundé et Douala sous 48h.' },
  { n: '2', title: 'Installation & mise en route', desc: 'Montage, réglages et première prise en main sur site.' },
  { n: '3', title: 'Maintenance & SAV', desc: 'Atelier mobile et pièces d’origine garanties.' },
  { n: '4', title: "Formation à l'utilisation", desc: 'Vos opérateurs formés à une conduite sûre et efficace.' },
  { n: '5', title: 'Financement & facilités', desc: 'Solutions de paiement échelonné et crédit agricole.' },
  { n: '6', title: 'Conseil agronomique', desc: 'Le bon matériel selon votre culture et vos parcelles.' },
];

export const stats = [
  { num: 15, suffix: '+', display: '15+', label: "Ans d'expérience" },
  { num: 3000, suffix: '+', display: '3 000+', label: 'Agriculteurs équipés' },
  { num: 50, suffix: '+', display: '50+', label: 'Marques partenaires' },
  { num: 2, suffix: '', display: '2', label: 'Boutiques au Cameroun' },
];

export const testimonials = [
  { quote: "Depuis que j'ai équipé ma ferme chez TES, mes rendements ont bondi. Le SAV est réactif et toujours à l'écoute.", name: 'Awa N.', role: 'Maraîchère · Bafoussam', initial: 'A' },
  { quote: "Commande en ligne, livraison en boutique en deux jours, et une formation sur place. Un vrai partenaire.", name: 'Jean‑Pierre M.', role: 'Céréalier · Garoua', initial: 'J' },
  { quote: "Notre coopérative s'approvisionne uniquement chez TES : du matériel fiable et des conseils précieux.", name: 'Fatou D.', role: 'Coopérative agricole · Maroua', initial: 'F' },
];

export const team = [
  { name: 'Samuel Etoa', role: 'Directeur général' },
  { name: 'Aïcha Bello', role: 'Responsable commerciale' },
  { name: 'Eric Nkeng', role: "Chef d'atelier" },
  { name: 'Clarisse Mbarga', role: 'Conseillère agronome' },
];

export const brands = ['TerraMax', 'FieldKing', 'AgroForce', 'GreenTech', 'HarvestPro', 'AgriPro', 'SoilMaster', 'AquaFlow'];

export const footLinks = ['Accueil', 'À propos', 'Nos services', 'Catalogue', 'Contact'];
export const footServices = ['Vente de matériel', 'Livraison en boutique', 'Installation & SAV', 'Formation', 'Conseil agronomique'];

export const socials = [
  { label: 'f', url: 'https://web.facebook.com/kenanjakaoficielle' },
  { label: 'W', url: 'https://wa.me/237678431967' },
  { label: '@', url: 'mailto:contact@tes-agribusiness.cm' },
  { label: '✆', url: 'tel:+237678431967' },
];

export const wa = 'https://wa.me/237678431967';

export const posts = [
  {
    id: 'b1', title: "5 conseils pour entretenir votre tronçonneuse en saison sèche", excerpt: "Un entretien régulier prolonge la durée de vie de votre matériel et évite les pannes coûteuses en pleine récolte.",
    date: '12 juin 2026', cat: 'Entretien', readTime: '4 min',
  },
  {
    id: 'b2', title: "Irrigation goutte-à-goutte : bien choisir sa motopompe", excerpt: "Débit, pression, distance de refoulement : les critères essentiels pour dimensionner votre système d'irrigation.",
    date: '2 juin 2026', cat: 'Irrigation', readTime: '6 min',
  },
  {
    id: 'b3', title: "Semis de maïs : quel espacement pour optimiser le rendement ?", excerpt: "Nos agronomes partagent leurs recommandations d'espacement selon le type de sol et la variété choisie.",
    date: '24 mai 2026', cat: 'Agronomie', readTime: '5 min',
  },
  {
    id: 'b4', title: "Pourquoi financer son matériel agricole plutôt que l'acheter comptant", excerpt: "Les avantages du crédit agricole et des facilités de paiement pour préserver votre trésorerie.",
    date: '15 mai 2026', cat: 'Financement', readTime: '3 min',
  },
  {
    id: 'b5', title: "Débroussailleuse ou tronçonneuse : quel outil pour quel usage ?", excerpt: "Un guide pratique pour choisir le bon outil selon la nature de vos parcelles et la végétation à traiter.",
    date: '3 mai 2026', cat: 'Guide d\'achat', readTime: '5 min',
  },
  {
    id: 'b6', title: "Comment préparer votre matériel avant la saison des pluies", excerpt: "Check-list complète pour éviter les mauvaises surprises quand la saison des pluies démarre.",
    date: '20 avril 2026', cat: 'Entretien', readTime: '4 min',
  },
];

export function fmtPrice(n) {
  return n.toLocaleString('fr-FR').replace(/\u202f|,|\u00a0/g, ' ') + ' FCFA';
}
