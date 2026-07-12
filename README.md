# TES Agribusiness — site web

Application e-commerce pour TES Agribusiness (équipements agricoles,
Yaoundé & Douala), construite pour être hébergée sur un plan Hostinger
mutualisé avec support Node.js. Le contexte complet du projet et les choix de
stack sont documentés dans
`PROMPT-hostinger-low-cost.md`.

## Stack

- Next.js 16 (App Router), React 19, TypeScript
- Tailwind CSS v4
- Prisma 7 + MySQL (via `@prisma/adapter-mariadb`)
- NextAuth.js v5 (Credentials + bcrypt), pour le suivi de commande / espace client uniquement
- Panier côté client (localStorage), commande créée via Server Action

## Démarrage local

1. Copier `.env.example` en `.env` et renseigner `DATABASE_URL` (une base MySQL
   locale ou distante) et `AUTH_SECRET`.
2. Installer les dépendances puis générer le client Prisma :

   ```bash
   npm install
   npx prisma migrate dev --name init
   npx prisma db seed
   ```

3. Lancer le serveur de développement :

   ```bash
   npm run dev
   ```

   Ouvrir [http://localhost:3000](http://localhost:3000).

## Structure

- `app/(site)/…` — pages avec navigation/footer partagés (accueil, catalogue,
  fiche produit, services, blog, à propos, contact, connexion/inscription/compte)
- `app/panier`, `app/commande`, `app/commande/confirmation` — tunnel d'achat
  avec en-tête minimal dédié
- `lib/data.ts` — accès Prisma en lecture (catalogue, blog)
- `lib/actions/` — Server Actions (commande, inscription, contact)
- `lib/cart-context.tsx` — panier client (localStorage)
- `prisma/schema.prisma`, `prisma/seed.ts` — modèle de données et jeu de données
  initial repris de `design_reference/assets/tes-data.js`

## Déploiement

Voir [`DEPLOY.md`](./DEPLOY.md) pour la procédure complète sur Hostinger
(hPanel, MySQL, variables d'environnement, migrations).
