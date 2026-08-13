import { HOME_FAQS } from "@/data/faqs";
import { siteConfig } from "@/lib/metadata";

/**
 * /llms.txt: resumo do site em markdown para motores de resposta (ChatGPT,
 * Perplexity e afins), no formato proposto em llmstxt.org.
 *
 * Gerado a partir das mesmas constantes que alimentam o site e o schema.org,
 * para não virar uma terceira versão da verdade.
 */

export const dynamic = "force-static";

const url = siteConfig.url;

const body = `# Kmillion

> ${siteConfig.description}

A Kmillion foi criada exclusivamente para o varejo físico. Ela une autonomia
para o time de marketing, personalização das ações e integração entre canais
físicos e digitais, sem depender do time de TI. É indicada principalmente para
redes com mais de 20 lojas.

- Razão social: ${siteConfig.legalName} (CNPJ ${siteConfig.taxId}), no mercado desde 2022
- Categoria: SaaS de inteligência promocional (B2B)
- Público: redes de varejo físico (lojas, franquias, farmácias, supermercados,
  perfumarias, academias, pet shops, entre outras)
- País de atuação: Brasil
- Idioma do site: português do Brasil
- Endereço: ${siteConfig.address.street}, ${siteConfig.address.city}, ${siteConfig.address.region}, CEP ${siteConfig.address.postalCode}
- Contato: ${siteConfig.email} | WhatsApp ${siteConfig.phone}

## Produtos

- [Motor Promocional](${url}/motor-promocional): criação e ativação de campanhas
  promocionais pelo próprio marketing, com regras personalizáveis por rede,
  loja e público, e medição de resultado em tempo real.
- [Kashback](${url}/kashback): cashback automatizado com regras flexíveis,
  controle de saldo e painéis de recompra e ROI. O nome da ação é
  personalizável pela marca.
- [IMS, visão loja](${url}/ims): gestão de influenciadores como canal de vendas
  mensurável, com cupom exclusivo, rastreio por CPF e cashback automatizado.
- [IMS, visão influencer](${url}/ims/influencer): como o creator monetiza por
  performance, com rastreio por venda gerada e pagamento automático.

## Integrações

Integração via API com os principais ERPs do mercado, além de e-commerce,
WhatsApp e sistemas de venda. A integração com ERP não é obrigatória, mas
permite controle mais completo de regras, saldos e resultados.

## Perguntas frequentes

${HOME_FAQS.map((faq) => `### ${faq.question}\n\n${faq.answer}`).join("\n\n")}

## Links

- [Site](${url})
${siteConfig.sameAs.map((profile) => `- [Perfil oficial](${profile})`).join("\n")}
`;

export function GET(): Response {
  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
