"use client";

import { ArrowRight, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, type FormEvent } from "react";
import type { ReactNode } from "react";

const footerLogoSrc = encodeURI(
  "/LOGO OFICIAL/PNG_VERSÕES LOGO HORIZONTAL/ALTERNATIVO KMILLION_LARANJA.png"
);

export function Footer(): ReactNode {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;

    const trimmed = email.trim();
    if (!trimmed) return;

    const subject = "Newsletter Kmillion";
    const body =
      `Olá, time Kmillion!\n\n` +
      `Tenho interesse em receber novidades e materiais sobre o Kashback/IMS/Motor Promocional.\n\n` +
      `Meu e-mail: ${trimmed}\n`;
    const mailto = `mailto:marketing@kmillion.cloud?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    setIsSubmitting(true);
    window.setTimeout(() => {
      window.location.href = mailto;
      window.setTimeout(() => setIsSubmitting(false), 600);
    }, 250);
  };

  return (
    <footer className="relative mx-2.5 mt-24 pt-38 max-[850px]:mx-0">
      <div className="absolute top-0 left-1/2 w-full max-w-5xl -translate-x-1/2">
        <div className="relative w-full overflow-hidden rounded-3xl shadow-2xl/15">
          <div
            className="absolute inset-0 scale-125 bg-center bg-no-repeat blur brightness-150"
            style={{ backgroundImage: "url(/BG.webp)", backgroundSize: "150%" }}
            aria-hidden="true"
          />

          <div className="relative z-10 flex flex-col items-center px-12 py-24 text-center max-[850px]:px-6 max-[850px]:py-6 max-[850px]:pt-12">
            <Link
              href="/"
              className="mb-8 flex items-center gap-2"
              aria-label="Kmillion home"
            >
              <Image
                src={footerLogoSrc}
                alt="Kmillion"
                width={170}
                height={40}
                className="h-8 w-auto"
                priority
              />
            </Link>

            <h2 className="mb-14 max-w-3xl text-6xl font-medium tracking-tight text-black max-[850px]:mb-8 max-[850px]:text-3xl">
              Assine nossa newsletter
            </h2>

            <form
              onSubmit={handleSubmit}
              className="bg-background flex w-full max-w-md items-center rounded-xl p-1.5 shadow-lg max-[850px]:max-w-none max-[850px]:flex-col max-[850px]:gap-3 max-[850px]:p-3"
            >
              <div className="flex w-full flex-1 items-center">
                <Mail
                  className="text-muted-foreground ml-3 h-5 w-5 flex-none max-[850px]:ml-1"
                  aria-hidden="true"
                />
                <input
                  type="email"
                  placeholder="Seu e-mail"
                  aria-label="E-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="text-foreground placeholder:text-muted-foreground flex-1 bg-transparent px-3 py-2.5 text-sm focus:outline-none"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                aria-busy={isSubmitting}
                className="bg-foreground text-background hover:bg-foreground/90 flex items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium whitespace-nowrap transition-colors disabled:opacity-80 disabled:cursor-progress max-[850px]:w-full max-[850px]:py-3"
              >
                {isSubmitting ? (
                  <>
                    Abrindo…
                    <span
                      className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white"
                      aria-hidden="true"
                    />
                  </>
                ) : (
                  <>
                    Inscreva-se
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="bg-accent rounded-tl-[3rem] rounded-tr-[3rem] pt-96 pb-16 max-[850px]:pt-72">
        <div className="mx-auto max-w-5xl px-6">
          <div className="flex items-center justify-between gap-8 max-[850px]:flex-col max-[850px]:items-start">
            <p className="max-w-2xl text-sm leading-relaxed text-neutral-900/80">
              A Kmillion ajuda redes de varejo a criar promoções inteligentes,
              controlar benefícios e acelerar decisões sem depender do time de
              TI.
            </p>
            <p className="text-sm text-neutral-900/50">
              © {new Date().getFullYear()} Kmillion. Todos os direitos
              reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
