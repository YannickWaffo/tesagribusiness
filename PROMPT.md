# Prompt pour Claude Code — TES Agribusiness (site + boutique en ligne)

Copie-colle ce prompt dans Claude Code à la racine d'un nouveau projet (ou d'un projet existant) pour lancer l'implémentation.

---

## Contexte

Tu dois construire l'application web de **TES Agribusiness**, distributeur d'équipements agricoles au Cameroun (Yaoundé & Douala). Un ensemble de maquettes HTML statiques existe déjà dans le dossier `design_reference/` de ce paquet — ce sont des **références de design**, pas du code à copier tel quel. Recrée fidèlement leur mise en page, contenu, copywriting et style dans une vraie application avec la stack ci-dessous.

## Stack technique imposée

- **Base de données** : PostgreSQL
- **ORM** : Prisma
- **Authentification** : Supabase Auth ou Clerk (au choix — si le projet a déjà un compte Supabase, préfère Supabase Auth ; sinon Clerk pour la rapidité de mise en place)
- **Stockage des images** : Cloudflare R2 (produits, images de blog, avatar utilisateur)
- **Cache** : Redis (cache de catalogue, sessions de panier, rate-limiting)
- **Framework app** : Next.js (App Router) + TypeScript — à confirmer si le projet a déjà un choix différent
- **Style** : Tailwind CSS, en respectant la palette et la typographie des maquettes (vert forêt `#14241A` / `#1F7A45`, fond crème `#F3F7F2`, accent doré `#D8A52A`, coins arrondis généreux, gros titres serif/sans bold)

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

## Modèle de données (Prisma — point de départ)

Adapte librement mais couvre au minimum :

```prisma
model Product {
  id          String   @id @default(cuid())
  name        String
  slug        String   @unique
  category    Category @relation(fields: [categoryId], references: [id])
  categoryId  String
  priceFcfa   Int
  description String
  imageUrl    String   // clé objet Cloudflare R2
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
  id        String   @id @default(cuid())
  title     String
  slug      String   @unique
  excerpt   String
  content   String
  category  String
  readTime  String
  publishedAt DateTime
}

model Order {
  id          String      @id @default(cuid())
  userId      String?
  customerName String
  phone       String
  deliveryMode String     // "livraison" | "retrait_boutique"
  storeCity   String?     // "Yaoundé" | "Douala"
  status      String      @default("pending")
  totalFcfa   Int
  items       OrderItem[]
  createdAt   DateTime    @default(now())
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

Utilise Redis pour : cache de `GET /api/products` et `/api/categories` (TTL courts), stockage de panier pour visiteurs non connectés (clé de session), et rate-limiting du formulaire de contact.

Utilise Cloudflare R2 pour héberger toutes les images produits/blog (upload via API route + URL publique ou signée).

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
- Prévoit un espace admin minimal (ou au moins des seeds Prisma) pour peupler produits, catégories et articles de blog à partir des données de référence.
- Le site doit rester entièrement en français.
- Rends le catalogue et les fiches produits consultables sans compte ; réserve l'authentification (Supabase Auth/Clerk) au suivi de commande et à l'espace client.
