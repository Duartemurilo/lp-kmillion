/**
 * Fonte única das perguntas frequentes.
 *
 * Módulo sem "use client" de propósito: as mesmas perguntas alimentam os
 * acordeões (client) e o JSON-LD de FAQPage (server). Duas cópias divergiriam
 * e o schema.org passaria a mentir sobre o conteúdo da página.
 */

export type FaqEntry = {
  question: string;
  answer: string;
};

export const HOME_FAQS: readonly FaqEntry[] = [
  {
    question: "O que difere a Kmillion de outras plataformas?",
    answer:
      "A Kmillion foi criada exclusivamente para o varejo físico. É a única plataforma que une autonomia para o marketing com personalização e integração entre canais físicos e digitais, sem depender do TI.",
  },
  {
    question: "Posso personalizar os nomes das ações (ex: cashback)?",
    answer:
      'Sim! Você pode nomear ações como quiser, criando experiências únicas, por exemplo: "Cashback Kmillion", "PremiaFashion" ou "Volta+".',
  },
  {
    question: "Preciso integrar com o ERP?",
    answer:
      "Não é obrigatório, mas integrar com o ERP permite um controle mais completo de regras, saldos e resultados. A Kmillion se conecta via API com os principais ERPs do mercado.",
  },
  {
    question: "A Kmillion serve para redes pequenas?",
    answer:
      "A Kmillion é ideal para redes com mais de 20 lojas, especialmente no varejo de moda. Para redes pequenas, o ganho com automação pode ser limitado, mas analisamos caso a caso.",
  },
] as const;

export const IMS_INFLUENCER_FAQS: readonly FaqEntry[] = [
  {
    question: "Preciso ter muitos seguidores?",
    answer:
      "Não. O que importa é conversão, não tamanho de base. O IMS foi desenhado para creator que gera resultado.",
  },
  {
    question: "Como sei que fui eu que gerei a venda?",
    answer:
      "Seu cupom é exclusivo e rastreado por CPF. Cada compra aparece no painel em tempo real.",
  },
  {
    question: "Quando recebo meu cashback?",
    answer:
      "Automaticamente após a validação da compra. Sem precisar cobrar, sem esperar aprovação manual.",
  },
  {
    question: "Posso trabalhar com mais de uma marca?",
    answer:
      "Sim. Você pode atuar em várias campanhas ativas ao mesmo tempo, com cupons diferentes por parceria.",
  },
] as const;

export const IMS_BRAND_FAQS: readonly FaqEntry[] = [
  {
    question: "Precisa integrar com o PDV?",
    answer:
      "Sim, a Kmillion integra com ERP, e-commerce, WhatsApp e sistemas de vendas.",
  },
  {
    question: "Como o influenciador recebe o cashback?",
    answer:
      "O resgate é automatizado após a validação da compra via CPF, sem intervenção manual.",
  },
  {
    question: "Funciona com microinfluenciadores?",
    answer:
      "Sim. Escalabilidade e rastreio são exatamente os pontos fortes do IMS.",
  },
] as const;
