// DDL generated from prisma/schema.prisma via:
//   npx prisma migrate diff --from-empty --to-schema prisma/schema.prisma --script
// CREATE TABLE statements use IF NOT EXISTS and constraint additions are
// error-tolerant at execution time so the setup route stays idempotent.

export const SCHEMA_STATEMENTS: string[] = [
  `CREATE TABLE IF NOT EXISTS \`Product\` (
    \`id\` VARCHAR(191) NOT NULL,
    \`name\` VARCHAR(191) NOT NULL,
    \`slug\` VARCHAR(191) NOT NULL,
    \`categoryId\` VARCHAR(191) NOT NULL,
    \`priceFcfa\` INTEGER NOT NULL,
    \`description\` TEXT NOT NULL,
    \`imageUrl\` VARCHAR(191) NOT NULL,
    \`tag\` VARCHAR(191) NULL,
    \`createdAt\` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    UNIQUE INDEX \`Product_slug_key\`(\`slug\`),
    INDEX \`Product_categoryId_idx\`(\`categoryId\`),
    PRIMARY KEY (\`id\`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`,

  `CREATE TABLE IF NOT EXISTS \`Category\` (
    \`id\` VARCHAR(191) NOT NULL,
    \`name\` VARCHAR(191) NOT NULL,
    \`icon\` VARCHAR(191) NOT NULL,
    UNIQUE INDEX \`Category_name_key\`(\`name\`),
    PRIMARY KEY (\`id\`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`,

  `CREATE TABLE IF NOT EXISTS \`BlogPost\` (
    \`id\` VARCHAR(191) NOT NULL,
    \`title\` VARCHAR(191) NOT NULL,
    \`slug\` VARCHAR(191) NOT NULL,
    \`excerpt\` TEXT NOT NULL,
    \`content\` TEXT NOT NULL,
    \`category\` VARCHAR(191) NOT NULL,
    \`readTime\` VARCHAR(191) NOT NULL,
    \`publishedAt\` DATETIME(3) NOT NULL,
    UNIQUE INDEX \`BlogPost_slug_key\`(\`slug\`),
    PRIMARY KEY (\`id\`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`,

  `CREATE TABLE IF NOT EXISTS \`User\` (
    \`id\` VARCHAR(191) NOT NULL,
    \`name\` VARCHAR(191) NULL,
    \`email\` VARCHAR(191) NOT NULL,
    \`passwordHash\` VARCHAR(191) NULL,
    \`createdAt\` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    UNIQUE INDEX \`User_email_key\`(\`email\`),
    PRIMARY KEY (\`id\`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`,

  `CREATE TABLE IF NOT EXISTS \`Order\` (
    \`id\` VARCHAR(191) NOT NULL,
    \`userId\` VARCHAR(191) NULL,
    \`customerName\` VARCHAR(191) NOT NULL,
    \`phone\` VARCHAR(191) NOT NULL,
    \`deliveryMode\` VARCHAR(191) NOT NULL,
    \`storeCity\` VARCHAR(191) NULL,
    \`address\` TEXT NULL,
    \`status\` VARCHAR(191) NOT NULL DEFAULT 'pending',
    \`totalFcfa\` INTEGER NOT NULL,
    \`createdAt\` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    INDEX \`Order_userId_idx\`(\`userId\`),
    PRIMARY KEY (\`id\`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`,

  `CREATE TABLE IF NOT EXISTS \`OrderItem\` (
    \`id\` VARCHAR(191) NOT NULL,
    \`orderId\` VARCHAR(191) NOT NULL,
    \`productId\` VARCHAR(191) NOT NULL,
    \`quantity\` INTEGER NOT NULL,
    \`priceFcfa\` INTEGER NOT NULL,
    INDEX \`OrderItem_orderId_idx\`(\`orderId\`),
    INDEX \`OrderItem_productId_idx\`(\`productId\`),
    PRIMARY KEY (\`id\`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`,

  `ALTER TABLE \`Product\` ADD CONSTRAINT \`Product_categoryId_fkey\` FOREIGN KEY (\`categoryId\`) REFERENCES \`Category\`(\`id\`) ON DELETE RESTRICT ON UPDATE CASCADE`,

  `ALTER TABLE \`Order\` ADD CONSTRAINT \`Order_userId_fkey\` FOREIGN KEY (\`userId\`) REFERENCES \`User\`(\`id\`) ON DELETE SET NULL ON UPDATE CASCADE`,

  `ALTER TABLE \`OrderItem\` ADD CONSTRAINT \`OrderItem_orderId_fkey\` FOREIGN KEY (\`orderId\`) REFERENCES \`Order\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,

  `ALTER TABLE \`OrderItem\` ADD CONSTRAINT \`OrderItem_productId_fkey\` FOREIGN KEY (\`productId\`) REFERENCES \`Product\`(\`id\`) ON DELETE RESTRICT ON UPDATE CASCADE`,
];
