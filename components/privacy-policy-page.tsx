import { Footer } from "@/components/footer";
import { PolicyBlocks } from "@/components/legal/policy-blocks";
import { PolicyToc } from "@/components/legal/policy-toc";
import {
  POLICY_INTRO,
  POLICY_META,
  POLICY_SECTIONS,
} from "@/data/privacy-policy";
import { ArrowUp, Mail, ShieldCheck } from "lucide-react";
import type { ReactNode } from "react";

const UPDATED_LABEL = new Intl.DateTimeFormat("pt-BR", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
}).format(new Date(`${POLICY_META.updatedAt}T00:00:00Z`));

/**
 * Página da Política de Privacidade.
 *
 * Server component: é texto jurídico, precisa existir no HTML mesmo sem
 * JavaScript. Só o sumário é client, porque marca a seção atual.
 *
 * O `scroll-mt` de cada título compensa o cabeçalho fixo (80px mais folga),
 * senão quem abre um link direto para uma seção cai com o título escondido
 * atrás dele.
 */
export function PrivacyPolicyPage(): ReactNode {
  return (
    <>
      <main id="main" className="pt-32 max-[850px]:pt-26">
        <div className="mx-auto max-w-5xl px-6 max-[850px]:px-5">
          <header className="max-w-2xl">
            <p className="text-primary inline-flex items-center gap-2 text-xs font-semibold tracking-[0.12em] uppercase">
              <ShieldCheck className="size-4" aria-hidden="true" />
              Privacidade e dados
            </p>
            <h1 className="text-foreground mt-4 text-4xl font-medium tracking-tight text-balance max-[850px]:text-3xl">
              {POLICY_META.title}
            </h1>
            <p className="text-muted-foreground mt-5 text-[1.0625rem] leading-relaxed">
              Como a Kmillion coleta, usa, guarda, compartilha e protege dados
              pessoais, em conformidade com a Lei nº 13.709/2018 (LGPD).
            </p>

            <dl className="border-border mt-7 flex flex-wrap gap-x-10 gap-y-3 border-t pt-5 text-sm">
              <div>
                <dt className="text-muted-foreground">Última atualização</dt>
                <dd className="text-foreground mt-0.5 font-medium">
                  <time dateTime={POLICY_META.updatedAt}>{UPDATED_LABEL}</time>
                </dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Versão</dt>
                <dd className="text-foreground mt-0.5 font-medium">
                  {POLICY_META.version}
                </dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Encarregado (DPO)</dt>
                <dd className="mt-0.5 font-medium">
                  <a
                    href={`mailto:${POLICY_META.contactEmail}`}
                    className="text-primary focus-visible:ring-ring underline decoration-from-font underline-offset-4 focus-visible:rounded-sm focus-visible:ring-2 focus-visible:outline-none"
                  >
                    {POLICY_META.contactEmail}
                  </a>
                </dd>
              </div>
            </dl>
          </header>

          {/* Uma coluna até 1280px; acima disso o sumário ganha o trilho lateral. */}
          <div className="mt-12 grid gap-10 xl:grid-cols-[minmax(0,1fr)_17rem] xl:gap-14">
            <div className="min-w-0">
              <div className="xl:hidden">
                <PolicyToc sections={POLICY_SECTIONS} variant="collapsible" />
              </div>

              <div className="mt-10 max-w-[68ch] xl:mt-0">
                <PolicyBlocks blocks={POLICY_INTRO} />

                {POLICY_SECTIONS.map((section, index) => (
                  <section
                    key={section.id}
                    aria-labelledby={`${section.id}-title`}
                    className="border-border/60 mt-12 border-t pt-10 first-of-type:mt-14"
                  >
                    <h2
                      id={section.id}
                      className="text-foreground scroll-mt-28 text-2xl font-medium tracking-tight max-[850px]:text-xl"
                    >
                      <span
                        className="text-primary mr-3 tabular-nums"
                        aria-hidden="true"
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span id={`${section.id}-title`}>{section.title}</span>
                    </h2>
                    <div className="mt-5">
                      <PolicyBlocks blocks={section.blocks} />
                    </div>
                  </section>
                ))}

                <aside className="border-border bg-muted/50 mt-14 rounded-2xl border p-6 sm:p-8">
                  <h2 className="text-foreground text-lg font-medium tracking-tight">
                    Dúvidas ou solicitações sobre seus dados
                  </h2>
                  <p className="text-muted-foreground mt-2 text-[1.0625rem] leading-relaxed">
                    Fale com o Encarregado de Proteção de Dados da Kmillion. As
                    demandas são respondidas em até 15 dias úteis.
                  </p>
                  <a
                    href={`mailto:${POLICY_META.contactEmail}`}
                    className="bg-foreground text-background hover:bg-foreground/90 focus-visible:ring-ring mt-5 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
                  >
                    <Mail className="size-4" aria-hidden="true" />
                    {POLICY_META.contactEmail}
                  </a>
                </aside>

                <p className="mt-10">
                  <a
                    href="#main"
                    className="text-muted-foreground hover:text-foreground focus-visible:ring-ring inline-flex items-center gap-2 text-sm transition-colors focus-visible:rounded-sm focus-visible:ring-2 focus-visible:outline-none"
                  >
                    <ArrowUp className="size-4" aria-hidden="true" />
                    Voltar ao topo
                  </a>
                </p>
              </div>
            </div>

            <div className="hidden xl:block">
              <PolicyToc sections={POLICY_SECTIONS} variant="sidebar" />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
