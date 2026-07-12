import { prisma } from "@/lib/prisma";

export function getCategories() {
  return prisma.category.findMany({
    orderBy: { name: "asc" },
    include: { _count: { select: { products: true } } },
  });
}

export function getProducts(options?: { category?: string; search?: string }) {
  const { category, search } = options ?? {};
  return prisma.product.findMany({
    where: {
      ...(category && category !== "Tous" ? { category: { name: category } } : {}),
      ...(search
        ? { name: { contains: search } }
        : {}),
    },
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });
}

export function getFeaturedProducts(take = 6) {
  return prisma.product.findMany({
    take,
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });
}

export function getProductBySlug(slug: string) {
  return prisma.product.findUnique({
    where: { slug },
    include: { category: true },
  });
}

export function getRelatedProducts(categoryId: string, excludeId: string, take = 3) {
  return prisma.product.findMany({
    where: { categoryId, id: { not: excludeId } },
    include: { category: true },
    take,
  });
}

export function getBlogPosts() {
  return prisma.blogPost.findMany({ orderBy: { publishedAt: "desc" } });
}

export function getBlogPostBySlug(slug: string) {
  return prisma.blogPost.findUnique({ where: { slug } });
}

export function getRelatedBlogPosts(excludeSlug: string, take = 3) {
  return prisma.blogPost.findMany({
    where: { slug: { not: excludeSlug } },
    orderBy: { publishedAt: "desc" },
    take,
  });
}
