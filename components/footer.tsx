"use client";

import { ArrowRight, Mail } from "lucide-react";
import Image from "next/image";
import type { ReactNode } from "react";

const footerLogoSrc = encodeURI(
  "/LOGO OFICIAL/PNG_VERSÕES LOGO HORIZONTAL/ALTERNATIVO KMILLION_LARANJA.png"
);

export function Footer(): ReactNode {
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
            <a
              href="#"
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
            </a>

            <h2 className="mb-14 max-w-3xl text-6xl font-medium tracking-tight text-black max-[850px]:mb-8 max-[850px]:text-3xl">
              Assine nossa newsletter
            </h2>

            <form className="bg-background flex w-full max-w-md items-center rounded-xl p-1.5 shadow-lg max-[850px]:max-w-none max-[850px]:flex-col max-[850px]:gap-3 max-[850px]:p-3">
              <div className="flex w-full flex-1 items-center">
                <Mail
                  className="text-muted-foreground ml-3 h-5 w-5 flex-none max-[850px]:ml-1"
                  aria-hidden="true"
                />
                <input
                  type="email"
                  placeholder="Seu e-mail"
                  aria-label="E-mail"
                  className="text-foreground placeholder:text-muted-foreground flex-1 bg-transparent px-3 py-2.5 text-sm focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="bg-foreground text-background hover:bg-foreground/90 flex items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium whitespace-nowrap transition-colors max-[850px]:w-full max-[850px]:py-3"
              >
                Inscreva-se
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
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
