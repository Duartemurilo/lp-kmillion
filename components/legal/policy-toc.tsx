"use client";

import type { PolicySection } from "@/data/privacy-policy";
import { ChevronDown } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";

/**
 * Sumário da política.
 *
 * No celular é um `<details>` fechado: quem abriu a página quer ler, e uma
 * lista de 16 itens antes do texto empurraria o conteúdo para fora da tela.
 * A partir de `xl` vira trilho fixo ao lado, com a seção atual marcada.
 *
 * O destaque usa IntersectionObserver com uma faixa estreita no topo, para
 * a seção ativa trocar quando o título cruza o cabeçalho, não quando a
 * seção inteira entra na tela.
 */

function useActiveSection(ids: readonly string[]): string | null {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const headings = ids
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null);
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      // Faixa logo abaixo do cabeçalho fixo (80px + folga).
      { rootMargin: "-112px 0px -70% 0px", threshold: 0 }
    );

    for (const heading of headings) observer.observe(heading);
    return () => observer.disconnect();
  }, [ids]);

  return active;
}

function TocLinks({
  sections,
  active,
  onNavigate,
}: {
  sections: readonly PolicySection[];
  active: string | null;
  onNavigate?: () => void;
}): ReactNode {
  return (
    <ol className="space-y-0.5">
      {sections.map((section, index) => {
        const isActive = active === section.id;
        return (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              onClick={onNavigate}
              aria-current={isActive ? "location" : undefined}
              className={[
                "focus-visible:ring-ring flex gap-2.5 rounded-lg px-3 py-2 text-[0.9375rem] leading-snug transition-colors focus-visible:ring-2 focus-visible:outline-none",
                isActive
                  ? "bg-primary/10 text-foreground font-medium"
                  : "text-muted-foreground hover:bg-foreground/5 hover:text-foreground",
              ].join(" ")}
            >
              <span
                className={
                  isActive
                    ? "text-primary tabular-nums"
                    : "text-muted-foreground/60 tabular-nums"
                }
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <span>{section.title}</span>
            </a>
          </li>
        );
      })}
    </ol>
  );
}

/**
 * Duas variantes, montadas em pontos diferentes do DOM: no celular o sumário
 * vem antes do texto, no desktop fica no trilho lateral. Cada uma aparece
 * só no seu breakpoint, então nunca há dois sumários visíveis ao mesmo tempo.
 */
export function PolicyToc({
  sections,
  variant,
}: {
  sections: readonly PolicySection[];
  variant: "collapsible" | "sidebar";
}): ReactNode {
  const [open, setOpen] = useState(false);
  const active = useActiveSection(sections.map((section) => section.id));

  if (variant === "sidebar") {
    return (
      <nav
        aria-label="Sumário da política"
        className="sticky top-28 -ml-3 max-h-[calc(100vh-9rem)] overflow-y-auto"
      >
        <p className="text-muted-foreground mb-3 px-3 text-xs font-semibold tracking-[0.12em] uppercase">
          Nesta página
        </p>
        <TocLinks sections={sections} active={active} />
      </nav>
    );
  }

  return (
    <details
      open={open}
      onToggle={(event) => setOpen(event.currentTarget.open)}
      className="border-border bg-muted/40 rounded-2xl border"
    >
      <summary className="text-foreground flex cursor-pointer items-center justify-between gap-3 px-5 py-4 text-sm font-medium marker:content-none [&::-webkit-details-marker]:hidden">
        Nesta página
        <ChevronDown
          className={`text-muted-foreground size-4 shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </summary>
      <nav aria-label="Sumário da política" className="px-2 pt-1 pb-3">
        <TocLinks
          sections={sections}
          active={active}
          onNavigate={() => setOpen(false)}
        />
      </nav>
    </details>
  );
}
