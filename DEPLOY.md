# Déploiement sur Hostinger (hébergement mutualisé Node.js)

Ce document décrit les étapes exactes pour déployer TES Agribusiness sur un plan
Hostinger **Business** ou **Cloud Startup** avec support Node.js, en réutilisant
la base MySQL incluse dans le forfait.

## 1. Prérequis côté Hostinger

1. Dans **hPanel**, ouvrir **Sites web > [ton domaine] > Node.js** et créer une
   application Node.js :
   - Version Node.js : la dernière LTS proposée par hPanel.
   - Racine de l'application : le dossier où le code sera déployé (ex. `tes-agribusiness`).
   - Point d'entrée : `node_modules/next/dist/bin/next` n'est pas nécessaire — voir
     section 4, on utilisera le script `npm run start`.
2. Dans **hPanel > Bases de données > Bases de données MySQL**, créer une base
   dédiée (ex. `u123_tesagri`), un utilisateur MySQL et un mot de passe fort.
   Noter : hôte, nom de la base, utilisateur, mot de passe.
3. Si le déploiement se fait par Git, connecter le dépôt dans **hPanel > Git**.
   Sinon, prévoir un export du projet pour upload via le gestionnaire de fichiers
   ou SFTP.

## 2. Variables d'environnement

Dans **hPanel > Node.js > [ton app] > Variables d'environnement**, définir :

```
DATABASE_URL=mysql://UTILISATEUR:MOT_DE_PASSE@HOTE:3306/NOM_BASE
AUTH_SECRET=<générer avec `openssl rand -base64 32`>
NODE_ENV=production
```

`DATABASE_URL` doit correspondre exactement aux identifiants MySQL créés à
l'étape 1. `AUTH_SECRET` sert à signer les sessions NextAuth.js — à générer une
seule fois et à ne jamais commit dans le dépôt (voir `.env.example`).

## 3. Déployer le code

1. Pousser le code sur la branche connectée (ou uploader les fichiers), en
   excluant `node_modules/`, `.next/` et `.env` (déjà couverts par `.gitignore`).
2. Depuis le terminal SSH de hPanel (ou le terminal intégré), se placer dans le
   dossier de l'application et lancer :

   ```bash
   npm install
   npx prisma migrate deploy
   npx prisma db seed   # première mise en ligne uniquement : peuple catégories/produits/blog
   npm run build
   ```

   `prisma migrate deploy` applique les migrations déjà générées en local
   (voir section 5) sans en créer de nouvelles — c'est la commande à utiliser en
   production, jamais `prisma migrate dev`.

## 4. Configurer le point d'entrée Node.js

Dans **hPanel > Node.js > [ton app] > Fichier de démarrage**, indiquer que la
commande de démarrage est :

```
npm run start
```

(qui exécute `next start`, en écoutant sur le port fourni par Hostinger via la
variable d'environnement `PORT` — Next.js la respecte automatiquement).

Redémarrer l'application depuis hPanel après chaque déploiement pour que le
nouveau build soit pris en compte.

## 5. Flux de migration Prisma (local → production)

En local, avec `DATABASE_URL` pointant vers une base MySQL de développement :

```bash
npx prisma migrate dev --name init
```

Cela crée les fichiers dans `prisma/migrations/`. Les committer avec le code.
En production, seule la commande `prisma migrate deploy` (section 3) doit être
utilisée — elle ne modifie jamais le schéma de façon interactive.

## 6. SSL

Le SSL Let's Encrypt gratuit est activé automatiquement par Hostinger sur le
domaine associé à l'application (**hPanel > SSL**). Vérifier qu'il est bien
actif après le premier déploiement.

## 7. Sauvegardes

- Activer les sauvegardes automatiques de la base MySQL depuis
  **hPanel > Bases de données > Sauvegardes** (fréquence selon le plan).
- Le dossier `public/uploads/` (photos produits) n'est pas versionné dans Git —
  prévoir une sauvegarde régulière via le gestionnaire de fichiers hPanel ou un
  export FTP périodique, en plus des sauvegardes automatiques de l'hébergement.

## 8. Photos produits

Le schéma Prisma et le seed référencent des images sous `/uploads/<fichier>`,
mais **aucune photo réelle n'est fournie dans les maquettes de référence** —
seuls les noms de fichiers y figurent. Tant qu'un fichier n'existe pas, le
site affiche automatiquement un espace réservé stylé (voir
`components/ProductImage.tsx`) plutôt qu'une image cassée.

Avant la mise en ligne définitive : déposer les vraies photos produits dans
`public/uploads/`, compressées en WebP et redimensionnées (ex. via `sharp`,
déjà installé), avec des noms de fichiers correspondant à `imageUrl` dans la
base (`prisma/seed.ts` liste la correspondance produit → fichier attendu).

## Limites connues de l'hébergement mutualisé (à communiquer au client)

- Quotas CPU/RAM/process partagés — suffisant pour un site vitrine + boutique à
  trafic modéré, à surveiller si le volume de commandes grossit.
- Pas d'accès root : pas de Redis, pas de PM2 custom, pas de cron système
  avancé — utiliser les tâches planifiées de hPanel si besoin (ex. nettoyage
  périodique de commandes `pending` très anciennes).
- Stockage disque plafonné selon le plan — compresser systématiquement les
  images uploadées.
- Évolution naturelle si le trafic grossit fortement : migration vers un VPS
  Hostinger, le schéma Prisma/MySQL et le code applicatif restant compatibles
  sans réécriture.
