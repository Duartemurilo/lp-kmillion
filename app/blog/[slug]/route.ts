import { getAllPostSlugs, renderPostHtml } from "@/lib/blog";

/**
 * /blog/<slug>: entrega a página pronta que a agência gerou, como ela é.
 *
 * Route handler, não page.tsx: o post já é um documento HTML completo, com
 * cabeçalho, estilos e scripts próprios. Dentro do layout do site ele
 * ganharia um segundo <html>, o cabeçalho flutuante e a moldura por cima.
 *
 * Gerado no build, um arquivo por pasta em public/blog. Endereço que não
 * existe cai no 404 do site.
 */
export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams(): { slug: string }[] {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
): Promise<Response> {
  const { slug } = await params;

  return new Response(renderPostHtml(slug), {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}
