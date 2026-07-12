# Prompt pour Claude Code — TES Agribusiness (hébergement Hostinger)

Copie-colle ce prompt dans Claude Code à la racine du projet pour lancer l'implémentation.

---

## Contexte

Construis l'application web de **TES Agribusiness**, distributeur d'équipements agricoles au Cameroun (Yaoundé & Douala). Les maquettes HTML de référence sont dans `design_reference/` — ce sont des références de design/contenu à recréer fidèlement dans une vraie application, pas du code à copier tel quel.

**Contrainte d'hébergement : Hostinger.** Le choix de stack ci-dessous est adapté à Hostinger (VPS KVM recommandé plutôt que l'hébergement mutualisé, qui ne permet pas de faire tourner un serveur Node.js custom avec base de données dédiée).

## Pourquoi cette stack plutôt que Postgres/Prisma+Supabase/Clerk/R2/Redis

- **PostgreSQL + Cloudflare R2 + Redis managé** supposent des services cloud externes facturés séparément et non proposés nativement par Hostinger. Sur un VPS Hostinger, il est plus simple, moins cher et plus robuste d'utiliser des briques **auto-hébergées sur la même machine** :
  - **MySQL** (via MariaDB) est la base de données native de l'écosystème Hostinger (fournie clé en main sur tous les plans, y compris mutualisé) — plus simple à administrer via hPanel que Postgres si jamais tu migres un jour vers du mutualisé/cloud. Prisma supporte MySQL nativement, aucun compromis technique.
  - **NextAuth.js (Auth.js)** remplace Supabase Auth/Clerk : authentification par email/mot de passe (+ OAuth si besoin) branchée directement sur ta base MySQL via l'adaptateur Prisma. Zéro dépendance externe, zéro coût récurrent, zéro latence réseau vers un tiers.
  - **Stockage local des images sur le VPS** (dossier `public/uploads` ou disque séparé monté) remplace Cloudflare R2. Un VPS Hostinger inclut du stockage SSD NVMe suffisant pour un catalogue produit ; on optimise les images avec `sharp` à l'upload. Si le volume grossit fortement plus tard, migrer vers un stockage S3-compatible économique (Backblaze B2) est trivial — mais inutile au démarrage.
  - **Redis auto-hébergé sur le VPS** (installé via apt, à côté de l'app Node) remplace un Redis managé : même fonctionnalité, sans facturation supplémentaire, latence quasi nulle car sur la même machine.

Cette approche a un seul service (le VPS) à payer et administrer, ce qui est plus simple à opérer et moins cher à l'échelle d'un site vitrine + petite boutique en ligne.

## Stack technique retenue

- **Hébergement** : Hostinger **VPS KVM** (Ubuntu 22.04), avec Nginx en reverse proxy + certificat SSL (Let's Encrypt via Hostinger ou Certbot)
- **Framework app** : Next.js (App Router) + TypeScript, servi en production via PM2 (process manager, redémarrage auto, logs)
- **Base de données** : MySQL 8 (MariaDB), installée sur le VPS ou provisionnée depuis hPanel
- **ORM** : Prisma (provider `mysql`)
- **Authentification** : NextAuth.js (Auth.js) avec adaptateur Prisma — connexion email/mot de passe (bcrypt) ; ajout Google OAuth en option
- **Stockage des images** : disque local du VPS (`/var/www/tes-agribusiness/uploads`, servi via Nginx ou une route API Next.js), traitement/redimensionnement avec `sharp` à l'upload
- **Cache** : Redis (auto-hébergé sur le VPS, via `ioredis`) pour le cache catalogue/catégories et les sessions panier invité
- **Style** : Tailwind CSS, en respectant la palette et la typographie des maquettes (vert forêt `#14241A` / `#1F7A45`, fond crème `#F3F7F2`, accent doré `#D8A52A`, coins arrondis généreux)

## Déploiement sur Hostinger — étapes attendues

1. Provisionner un VPS KVM Hostinger (2 vCPU / 4 Go RAM minimum recommandé).
2. Installer Node.js LTS, MySQL, Redis, Nginx, PM2, Certbot.
3. Créer la base MySQL + utilisateur dédié via hPanel ou CLI ; renseigner `DATABASE_URL` dans `.env`.
4. `npx prisma migrate deploy` pour appliquer le schéma en production.
5. Builder l'app (`next build`) et la lancer avec PM2 (`pm2 start npm --name tes-agribusiness -- start`), configurer le redémarrage au boot (`pm2 startup` + `pm2 save`).
6. Configurer Nginx comme reverse proxy vers le port Node (ex. 3000), avec SSL Let's Encrypt sur le nom de domaine.
7. Mettre en place un cron/PM2 job de sauvegarde régulière de la base MySQL et du dossier `uploads/`.

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
  id            String   @id @default(cuid())
  name          String?
  email         String   @unique
  passwordHash  String?
  orders        Order[]
  createdAt     DateTime @default(now())
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

Utilise Redis pour : cache de `GET /api/products` et `/api/categories` (TTL courts), panier des visiteurs non connectés (clé de session), et rate-limiting du formulaire de contact.

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
- Documente dans un `DEPLOY.md` les commandes exactes utilisées pour le provisioning VPS, l'installation des services et le déploiement, afin de pouvoir reproduire l'environnement.
