import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const image = await prisma.storedImage.findUnique({ where: { id } });
  if (!image) {
    return new Response("Not found", { status: 404 });
  }
  return new Response(new Uint8Array(image.data), {
    headers: {
      "Content-Type": image.mime,
      // Image ids are immutable (a new upload gets a new id), so cache hard.
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
