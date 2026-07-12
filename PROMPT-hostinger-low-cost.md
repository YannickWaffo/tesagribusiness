# Prompt pour Claude Code — TES Agribusiness (Hostinger, version bas coût)

Copie-colle ce prompt dans Claude Code à la racine du projet.

---

## Contexte

Construis l'application web de **TES Agribusiness**, distributeur d'équipements agricoles au Cameroun (Yaoundé & Douala). Les maquettes HTML de référence sont dans `design_reference/` — des références de design/contenu à recréer fidèlement, pas du code à copier tel quel.

**Contrainte : budget d'hébergement minimal sur Hostinger.** Pas de VPS (le moins cher tourne déjà bien plus cher qu'un hébergement mutualisé) : on utilise l'hébergement **mutualisé Hostinger avec support Node.js** (plan Business ou Cloud Startup), qui inclut MySQL et l'exécution d'applications Node directement depuis hPanel, sans serveur à administrer.

## Pourquoi cette stack (vs. la version VPS complète)

| Besoin | Solution bas coût | Pourquoi |
|---|---|---|
| Hébergement | Hostinger **Business/Cloud Startup** (mutualisé avec Node.js) | Le plan le moins cher chez Hostinger qui exécute une vraie app Node.js ; pas de VPS à sécuriser/patcher toi-même, mise à jour et redémarrage gérés par hPanel |
| Base de données | **MySQL** (incluse gratuitement dans le plan, illimitée en Go selon le forfait) | Zéro coût supplémentaire, provisionnée en 1 clic dans hPanel |
| ORM | **Prisma** (provider `mysql`) | Aucune dépendance payante |
| Authentification | **NextAuth.js** (email + mot de passe, bcrypt) via Prisma | Gratuit, pas de service tiers facturé à l'utilisateur (contrairement à Clerk qui facture au-delà d'un quota) |
| Stockage images | **Dossier du même hébergement** (`public/uploads`), images compressées avec `sharp` avant écriture | Le stockage disque est déjà inclus dans le forfait ; pas de facturation à l'usage comme R2/S3 |
| Cache | **Aucun service Redis dédié** — cache mémoire simple côté Next.js (`unstable_cache` / Map en mémoire avec TTL) | L'hébergement mutualisé ne permet pas d'installer un service Redis tiers ; un site vitrine + petit catalogue n'en a pas besoin pour bien performer. Si le trafic grossit, migrer vers un VPS avec Redis reste possible plus tard sans réécrire l'app (juste swap du provider de cache) |

Coût total récurrent : **un seul abonnement d'hébergement Hostinger**, aucun service cloud tiers facturé séparément (pas de R2, pas de Redis managé, pas de Clerk payant).

## Limites à connaître de ce choix (à documenter pour le client)

- L'hébergement mutualisé Node.js de Hostinger a des quotas CPU/RAM/process partagés — suffisant pour un site vitrine + boutique à trafic modéré, mais à surveiller si le volume de commandes grossit.
- Pas d'accès root : impossible d'installer Redis, PM2 custom ou des cron jobs système avancés — utilise les tâches planifiées fournies par hPanel si besoin (ex. nettoyage périodique de paniers expirés).
- Le stockage d'images sur le disque du forfait a un plafond (selon le plan) — prévoir une compression systématique (`sharp`, format WebP) pour limiter l'usage.
- Si le site grossit fortement (fort trafic, besoin de Redis/queue de jobs), la migration vers un VPS Hostinger reste la voie d'évolution naturelle — le schéma Prisma/MySQL et le code restent compatibles.

## Déploiement sur Hostinger (mutualisé Node.js) — étapes attendues

1. Dans hPanel, créer une application **Node.js** (choisir la version LTS) et pointer le domaine dessus.
2. Créer une base **MySQL** depuis hPanel, récupérer les identifiants, renseigner `DATABASE_URL` dans les variables d'environnement de l'app.
3. Déployer le code (Git ou upload), lancer `npm install`, `npx prisma migrate deploy`, `npm run build`.
4. Configurer le point d'entrée de démarrage (`npm run start`) dans les paramètres de l'app Node.js hPanel.
5. Activer le SSL gratuit (Let's Encrypt) fourni automatiquement par Hostinger sur le domaine.
6. Mettre en place une sauvegarde régulière (Hostinger propose des backups automatiques selon le plan) de la base MySQL et du dossier `uploads/`.

## Pages à implémenter (voir `design_reference/`)

1. **Accueil** (`TES Agribusiness.dc.html`) — hero, catégories, produits vedettes, stats, témoignages, marques partenaires.
2. **Catalogue** (`Catalogue.dc.html`) — liste filtrable par catégorie, recherche, tri par prix.
3. **Fiche produit** (`Fiche-Produit.dc.html`) — détail produit, galerie, ajout au panier, produits similaires.
4. **Panier** (`Cart.dc.html`) — liste des articles, quantités, sous-total.
5. **Commande** (`Checkout.dc.html`) — formulaire livraison/retrait boutique, récapitulatif, paiement.
6. **Confirmation de commande** (`Order-Confirmation.dc.html`).
7. **Services** (`Services.dc.html`) — livraison, installation, SAV, formation, financement, conseil agronomique.
8. **Blog** (`Blog.dc.html`) + **Article de blog** (`Blog-Article.dc.html`).
9. **À propos** (`A-Propos.dc.html`) — mission, positionnement, clientèle, implantations (Yaoundé, Douala).
10. **Contact** (`Contact.dc.html`) — téléphones, adresses des 2 boutiques, formulaire.

## Modèle de données (Prisma / MySQL — point de départ)

```prisma
datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

model Product {
  id          String   @id @default(cuid())
  name        String
  slug        String   @unique
  category    Category @relation(fields: [categoryId], references: [id])
  categoryId  String
  priceFcfa   Int
  description String   @db.Text
  imageUrl    String   // chemin relatif sous /uploads
  tag         String?  // "Nouveau" | "Promo" | "Best-seller" | null
  createdAt   DateTime @default(now())
}

model Category {
  id       String    @id @default(cuid())
  name     String    @unique
  icon     String
  products Product[]
}

model BlogPost {
  id          String   @id @default(cuid())
  title       String
  slug        String   @unique
  excerpt     String
  content     String   @db.Text
  category    String
  readTime    String
  publishedAt DateTime
}

model User {
  id           String   @id @default(cuid())
  name         String?
  email        String   @unique
  passwordHash String?
  orders       Order[]
  createdAt    DateTime @default(now())
}

model Order {
  id           String      @id @default(cuid())
  user         User?       @relation(fields: [userId], references: [id])
  userId       String?
  customerName String
  phone        String
  deliveryMode String      // "livraison" | "retrait_boutique"
  storeCity    String?     // "Yaoundé" | "Douala"
  status       String      @default("pending")
  totalFcfa    Int
  items        OrderItem[]
  createdAt    DateTime    @default(now())
}

model OrderItem {
  id        String  @id @default(cuid())
  order     Order   @relation(fields: [orderId], references: [id])
  orderId   String
  product   Product @relation(fields: [productId], references: [id])
  productId String
  quantity  Int
  priceFcfa Int
}
```

## Informations de l'entreprise à respecter partout

- Nom : **TES Agribusiness**
- Slogan / positionnement : *Innovation · Performance · Productivité au service des agriculteurs*
- Mission : moderniser l'agriculture camerounaise via des équipements mécanisés modernes.
- Clientèle : agriculteurs, coopératives agricoles, ingénieurs agronomes, jeunes entrepreneurs agricoles.
- Boutiques :
  - Yaoundé – Anguissa, Carrefour Belilibi
  - Douala – Makepe Rhône Moulin
- Téléphones : +237 678 431 967 · +237 676 491 077 · +237 653 887 520 · +237 653 887 518
- Email : contact@tes-agribusiness.cm
- Catégories produits : Semis, Fertilisation, Pulvérisation, Débroussailleuses, Tronçonneuses, Tarières, Outils horticoles, Motopompes, Consommables.

## Consignes générales

- Recrée fidèlement la structure, le contenu et le ton des maquettes HTML — ne shippe pas les fichiers `.dc.html` tels quels, ils servent uniquement de référence visuelle et de contenu.
- Respecte les prix, descriptions et données produits telles que listées dans `design_reference/assets/tes-data.js`.
- Prévoit des seeds Prisma pour peupler produits, catégories et articles de blog à partir des données de référence.
- Le site doit rester entièrement en français.
- Catalogue et fiches produits consultables sans compte ; réserve l'authentification (NextAuth.js) au suivi de commande et à l'espace client.
- Compresse systématiquement les images uploadées (WebP, redimensionnement) pour rester dans les quotas de stockage du forfait mutualisé.
- Documente dans un `DEPLOY.md` les étapes exactes suivies dans hPanel pour permettre de reproduire le déploiement.
