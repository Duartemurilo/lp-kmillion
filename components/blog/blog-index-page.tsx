import { Footer } from "@/components/footer";
import { formatPostDate, type BlogPost } from "@/lib/blog";
import { MotionDiv } from "@/lib/motion";
import { WHATSAPP_CONTACT_URL } from "@/lib/whatsapp";
import {
  ArrowDownRight,
  ArrowUpRight,
  CalendarDays,
  Clock,
} from "lucide-react";
import Image from "next/image";
import type { ReactNode } from "react";

/**
 * Página /blog. Server component: a lista precisa estar no HTML para o
 * Google e para os motores de resposta.
 *
 * O post mais recente ganha o destaque grande; os outros entram na grade.
 * Os links são <a> comuns, não <Link>: o post é uma página HTML à parte
 * (ver app/blog/[slug]/route.ts), não uma rota React.
 */
export function BlogIndexPage({ posts }: { posts: BlogPost[] }): ReactNode {
  const [featured, ...rest] = posts;

  return (
    <>
      <main id="main-content" className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-[720px] bg-[radial-gradient(900px_420px_at_12%_10%,rgba(254,102,52,0.14),transparent_60%),radial-gradient(700px_380px_at_92%_30%,rgba(48,2,80,0.22),transparent_55%)]"
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-6xl px-6 pt-36 max-[850px]:px-5 max-[850px]:pt-28">
          <MotionDiv className="max-w-3xl">
            <p className="text-accent text-sm font-semibold tracking-[0.2em] uppercase">
              Blog Kmillion
            </p>
            <h1 className="text-foreground mt-4 text-[clamp(2.25rem,5vw,4rem)] leading-[1.04] font-semibold tracking-[-0.05em] text-balance">
              Ideias e contas para{" "}
              <span className="text-accent">promoções</span> que funcionam no
              varejo físico.
            </h1>
            <p className="text-muted-foreground mt-6 max-w-2xl text-lg leading-relaxed">
              Artigos práticos sobre estoque, desconto, cashback e campanhas,
              com exemplos e números para aplicar na sua rede.
            </p>
          </MotionDiv>

          {featured ? (
            <MotionDiv className="mt-14 max-[850px]:mt-10">
              <FeaturedPost post={featured} />
            </MotionDiv>
          ) : (
            <EmptyState />
          )}

          {rest.length > 0 && (
            <section aria-labelledby="mais-artigos" className="mt-20">
              <h2
                id="mais-artigos"
                className="text-foreground text-2xl font-semibold tracking-[-0.03em]"
              >
                Mais artigos
              </h2>
              <ul className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {rest.map((post) => (
                  <li key={post.slug} className="min-w-0">
                    <PostCard post={post} />
                  </li>
                ))}
              </ul>
            </section>
          )}

          <ContactCta />
        </div>
      </main>

      <Footer />
    </>
  );
}

function FeaturedPost({ post }: { post: BlogPost }): ReactNode {
  return (
    <article className="group border-border bg-muted hover:border-accent/50 relative grid overflow-hidden rounded-[2rem] border shadow-[0_30px_80px_-50px_rgba(0,0,0,0.6)] transition-colors duration-300 lg:grid-cols-[1.05fr_1fr]">
      <div className="relative aspect-[4/3] overflow-hidden lg:aspect-auto lg:min-h-[540px]">
        {post.cover ? (
          <Image
            src={post.cover}
            alt={post.coverAlt}
            fill
            priority
            sizes="(min-width: 1024px) 560px, 100vw"
            className="object-cover object-[50%_30%] transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
        ) : (
          <CoverFallback />
        )}
      </div>

      <div className="flex flex-col p-10 max-[850px]:p-6 max-[850px]:pt-7">
        <PostTags post={post} label="Mais recente" />

        <h2 className="text-foreground mt-6 text-[clamp(1.75rem,3.2vw,2.6rem)] leading-[1.08] font-semibold tracking-[-0.04em] text-balance">
          {/* O link cobre o cartão inteiro (::after), sem aninhar elementos dentro do <a>. */}
          <a
            href={post.path}
            className="focus-visible:after:ring-accent after:absolute after:inset-0 after:rounded-[2rem] focus-visible:outline-none focus-visible:after:ring-2"
          >
            {post.title}
          </a>
        </h2>

        <p className="text-muted-foreground mt-5 line-clamp-4 text-lg leading-relaxed">
          {post.description}
        </p>

        <div className="mt-auto flex flex-wrap items-center justify-between gap-6 pt-10">
          <PostMeta post={post} />
          <span className="inline-flex items-center" aria-hidden="true">
            <span className="bg-accent rounded-xl px-5 py-3 text-sm font-medium text-white">
              Ler artigo
            </span>
            <span className="text-accent relative -left-px flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-sm">
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45" />
            </span>
          </span>
        </div>
      </div>
    </article>
  );
}

function PostCard({ post }: { post: BlogPost }): ReactNode {
  return (
    <article className="group border-border bg-muted hover:border-accent/50 relative flex h-full flex-col overflow-hidden rounded-[1.6rem] border transition-colors duration-300">
      <div className="relative aspect-[4/3] overflow-hidden">
        {post.cover ? (
          <Image
            src={post.cover}
            alt={post.coverAlt}
            fill
            sizes="(min-width: 1024px) 360px, (min-width: 768px) 50vw, 100vw"
            className="object-cover object-[50%_30%] transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
        ) : (
          <CoverFallback />
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <PostTags post={post} />
        <h3 className="text-foreground mt-4 text-xl leading-snug font-semibold tracking-[-0.02em] text-balance">
          <a
            href={post.path}
            className="focus-visible:after:ring-accent after:absolute after:inset-0 after:rounded-[1.6rem] focus-visible:outline-none focus-visible:after:ring-2"
          >
            {post.title}
          </a>
        </h3>
        <p className="text-muted-foreground mt-3 line-clamp-3 text-[0.9375rem] leading-relaxed">
          {post.description}
        </p>
        <div className="mt-auto flex items-center justify-between gap-4 pt-6">
          <PostMeta post={post} />
          <ArrowUpRight
            className="text-accent h-5 w-5 shrink-0 transition-transform duration-300 group-hover:rotate-45"
            aria-hidden="true"
          />
        </div>
      </div>
    </article>
  );
}

function PostTags({
  post,
  label,
}: {
  post: BlogPost;
  label?: string;
}): ReactNode {
  if (!post.category && !label) return null;

  return (
    <div className="flex flex-wrap items-center gap-2">
      {label && (
        <span className="bg-accent rounded-full px-3 py-1 text-xs font-semibold text-white">
          {label}
        </span>
      )}
      {post.category && (
        <span className="border-border text-foreground/80 rounded-full border px-3 py-1 text-xs font-semibold">
          {post.category}
        </span>
      )}
    </div>
  );
}

function PostMeta({ post }: { post: BlogPost }): ReactNode {
  return (
    <p className="text-muted-foreground flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm">
      <span className="inline-flex items-center gap-1.5">
        <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
        <time dateTime={post.publishedAt}>
          {formatPostDate(post.publishedAt)}
        </time>
      </span>
      <span className="inline-flex items-center gap-1.5">
        <Clock className="h-3.5 w-3.5" aria-hidden="true" />
        {post.readingMinutes} min de leitura
      </span>
    </p>
  );
}

function CoverFallback(): ReactNode {
  return (
    <div
      className="absolute inset-0 bg-[radial-gradient(600px_300px_at_20%_20%,rgba(254,102,52,0.35),transparent_60%),linear-gradient(135deg,#300250,#0A0A0A)]"
      aria-hidden="true"
    />
  );
}

function EmptyState(): ReactNode {
  return (
    <div className="border-border bg-muted mt-14 rounded-[2rem] border border-dashed px-8 py-16 text-center">
      <p className="text-foreground text-xl font-semibold">
        Os primeiros artigos estão chegando.
      </p>
      <p className="text-muted-foreground mx-auto mt-3 max-w-md">
        Enquanto isso, conheça como a Kmillion ajuda redes de varejo a criar
        promoções sem depender do TI.
      </p>
      <a
        href="/motor-promocional"
        className="text-accent mt-6 inline-flex items-center gap-1.5 font-semibold underline-offset-4 hover:underline"
      >
        Conhecer o Motor Promocional
        <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
      </a>
    </div>
  );
}

function ContactCta(): ReactNode {
  return (
    <section
      aria-labelledby="blog-contato"
      className="relative mt-24 overflow-hidden rounded-[2rem] bg-[#0A0A0A] px-12 py-16 text-white max-[850px]:mt-16 max-[850px]:px-6 max-[850px]:py-12"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(700px_360px_at_10%_0%,rgba(254,102,52,0.22),transparent_60%),radial-gradient(600px_320px_at_100%_100%,rgba(48,2,80,0.45),transparent_55%)]"
        aria-hidden="true"
      />
      <div className="relative flex items-end justify-between gap-10 max-[850px]:flex-col max-[850px]:items-start">
        <div className="max-w-2xl">
          <h2
            id="blog-contato"
            className="text-[clamp(1.9rem,3.6vw,3rem)] leading-[1.06] font-semibold tracking-[-0.05em] text-balance"
          >
            Quer ver isso funcionando{" "}
            <span className="text-accent">na sua rede?</span>
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-white/70">
            Mostramos como criar uma promoção só para as lojas e o público
            certos, e como acompanhar o resultado, sem depender do TI.
          </p>
        </div>
        <a
          href={WHATSAPP_CONTACT_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group focus-visible:ring-accent relative inline-flex shrink-0 items-center rounded-xl focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:ring-offset-[#0A0A0A] focus-visible:outline-none"
        >
          <span className="bg-accent relative z-10 rounded-xl px-6 py-3.5 text-sm font-medium text-white">
            Falar com a Kmillion
          </span>
          <span className="text-accent relative -left-px z-10 flex h-11 w-11 items-center justify-center rounded-xl bg-white shadow-sm">
            <ArrowDownRight className="h-4 w-4 transition-transform duration-300 group-hover:-rotate-45" />
          </span>
        </a>
      </div>
    </section>
  );
}
