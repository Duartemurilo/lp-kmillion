/**
 * Domínio do site.
 *
 * O mesmo código é publicado em dois projetos da Vercel:
 * - kmillion.com.br (padrão, sem variável nenhuma);
 * - kmillion.cloud (projeto com NEXT_PUBLIC_SITE_DOMAIN=kmillion.cloud).
 *
 * Na versão kmillion.cloud nada pode apontar para kmillion.com.br (os
 * programas de créditos do Google e da AWS cruzam o domínio do site com o do
 * e-mail da empresa). Por isso todo endereço do site sai daqui.
 */
export const DEFAULT_SITE_DOMAIN = "kmillion.com.br";

export const SITE_DOMAIN =
  process.env.NEXT_PUBLIC_SITE_DOMAIN?.trim() || DEFAULT_SITE_DOMAIN;

/** true quando o build é de um domínio diferente do kmillion.com.br. */
export const IS_ALTERNATE_DOMAIN = SITE_DOMAIN !== DEFAULT_SITE_DOMAIN;

/** Troca kmillion.com.br pelo domínio deste build (só no domínio alternativo). */
export function withSiteDomain(text: string): string {
  return IS_ALTERNATE_DOMAIN
    ? text.replaceAll(DEFAULT_SITE_DOMAIN, SITE_DOMAIN)
    : text;
}
