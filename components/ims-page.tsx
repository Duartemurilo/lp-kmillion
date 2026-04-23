"use client";

import {
  BadgeCheck,
  BarChart3,
  CalendarClock,
  ClipboardList,
  Gauge,
  HandCoins,
  Megaphone,
  Banknote,
  RefreshCcw,
  ScanSearch,
  ShieldCheck,
  Sparkles,
  Store,
  Target,
  Trophy,
  Users,
  type LucideIcon,
} from "lucide-react";
import { Hero } from "@/components/hero";
import {
  ImsComoFuncionaProblemSection,
  imsInfluencerComoFuncionaSteps,
  type ImsComoFuncionaStep,
} from "@/components/ims-como-funciona-problem-section";
import { ImsAudienceSection } from "@/components/ims-audience-section";
import { ImsBrandBentoSection } from "@/components/ims-brand-bento-section";
import { ImsBrandVideoSection } from "@/components/ims-brand-video-section";
import { ImsFaqSection } from "@/components/ims-faq-section";
import { ImsWorthItSection } from "@/components/ims-worth-it-section";
import { type ReactNode } from "react";
import { WHATSAPP_CONTACT_URL } from "@/lib/whatsapp";

type Persona = "brand" | "influencer";

type Stat = {
  value: string;
  label: string;
};

type Step = {
  number: string;
  title: string;
  description: string;
};

type FeatureCard = {
  title: string;
  description: string;
  icon: LucideIcon;
};

type AudienceCard = {
  title: string;
  description: string;
  icon: LucideIcon;
};

type FaqItem = {
  question: string;
  answer: string;
};

type PersonaContent = {
  eyebrow: string;
  description: string;
  ctaPrimary: { label: string; href: string };
  ctaSecondary: { label: string; href: string };
  stats: Stat[];
  heroBullets: string[];
  heroNote: string;
  heroTone: "light" | "dark";
  stepEyebrow: string;
  stepLead: string;
  steps: Step[];
  reasonEyebrow: string;
  reasonTitle: string;
  reasonLead: string;
  reasons: FeatureCard[];
  audienceEyebrow: string;
  audienceTitle: string;
  audienceLead: string;
  audience: AudienceCard[];
  faqEyebrow: string;
  faqTitle: string;
  faqLead: string;
  faqs: FaqItem[];
  finalPrimary: { label: string; href: string };
  finalSecondary: { label: string; href: string };
};

const personaContent: Record<Persona, PersonaContent> = {
  influencer: {
    eyebrow: "LP IMS - Versão influenciador",
    description:
      "Com o IMS da Kmillion, seu conteúdo vira resultado real e você recebe de forma automática, transparente e rastreável por venda gerada.",
    ctaPrimary: { label: "Quero fazer parte", href: WHATSAPP_CONTACT_URL },
    ctaSecondary: { label: "IMS Marca", href: "/ims" },
    stats: [
      { value: "1 cupom", label: "exclusivo por creator" },
      { value: "CPF", label: "rastreando cada compra" },
      { value: "100%", label: "cashback automático" },
      { value: "+ ganho", label: "quanto mais vende" },
    ],
    heroBullets: [
      "Cupom exclusivo para a sua audiência",
      "Venda registrada automaticamente por CPF",
      "Ranking, metas e recompensas extras",
    ],
    heroNote:
      "Você continua criando do seu jeito. A plataforma cuida da rastreabilidade, do registro e da remuneração.",
    heroTone: "light",
    stepEyebrow: "Como funciona pra você",
    stepLead:
      "A jornada foi desenhada para ser natural para quem cria conteúdo e clara para quem acompanha performance.",
    steps: [
      {
        number: "01",
        title: "Você recebe seu cupom exclusivo",
        description:
          "personalizado pra sua audiência e rastreado pela plataforma",
      },
      {
        number: "02",
        title: "Você posta do seu jeito",
        description:
          "story, reels, vídeo — o formato é seu, a estratégia também",
      },
      {
        number: "03",
        title: "Sua audiência compra",
        description:
          "a venda é registrada automaticamente via CPF, sem complicação",
      },
      {
        number: "04",
        title: "Você recebe seu cashback",
        description: "automático, transparente, sem precisar cobrar ninguém",
      },
      {
        number: "05",
        title: "Quanto mais você vende, mais você ganha",
        description: "ranking, metas e recompensas extras pra quem performa",
      },
    ],
    reasonEyebrow: "Por que vale a pena",
    reasonTitle: "Seu conteúdo tem mais valor do que você imagina.",
    reasonLead: "",
    reasons: [
      {
        title: "Ganhos reais por venda",
        description:
          "Não por post entregue. Você recebe proporcionalmente ao resultado que gera, não por um valor fixo que não reflete seu impacto.",
        icon: HandCoins,
      },
      {
        title: "Transparência total",
        description:
          "Acompanhe em tempo real quantas vendas seu cupom gerou. Sem depender de relatório da marca, sem achismo.",
        icon: ScanSearch,
      },
      {
        title: "Liberdade criativa",
        description:
          "Você cria do jeito que a sua audiência responde. A plataforma rastreia; você se preocupa só com o conteúdo.",
        icon: Sparkles,
      },
      {
        title: "Escala com você",
        description:
          "Seja micro ou grande creator, o IMS funciona. Quanto maior sua conversão, maior seu ganho.",
        icon: Gauge,
      },
      {
        title: "Recompensas extras",
        description:
          "Ranking entre creators, metas por campanha e bônus pra quem mais vende.",
        icon: Trophy,
      },
    ],
    audienceEyebrow: "Para quem é",
    audienceTitle:
      "Se você já indica, por que não está ganhando por cada venda?",
    audienceLead:
      "Feito para creators que querem transformar influência em monetização previsível e rastreável.",
    audience: [
      {
        title: "Criadores de conteúdo",
        description: "Quem quer monetizar de verdade com campanhas rastreadas.",
        icon: Users,
      },
      {
        title: "Microinfluenciadores",
        description: "Audiência menor, mas engajada e pronta para converter.",
        icon: Megaphone,
      },
      {
        title: "Quem já indica produtos",
        description: "Indicação sem rastreio vira oportunidade perdida.",
        icon: BadgeCheck,
      },
      {
        title: "Creators orientados por dado",
        description: "Parcerias com métricas claras, não só com feeling.",
        icon: ClipboardList,
      },
    ],
    faqEyebrow: "FAQ",
    faqTitle: "Suas dúvidas, respondidas.",
    faqLead:
      "Se você está começando ou já tem audiência, a lógica continua a mesma: conversão primeiro.",
    faqs: [
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
    ],
    finalPrimary: { label: "Quero fazer parte do IMS", href: WHATSAPP_CONTACT_URL },
    finalSecondary: { label: "Falar com a Kmillion", href: "#faq" },
  },
  brand: {
    eyebrow: "LP IMS - Versão marca",
    description:
      "Com o IMS da Kmillion, sua marca transforma influenciadores em um motor de conversão real, rastreável e escalável - do post à venda, tudo conectado.",
    ctaPrimary: { label: "Falar com um especialista", href: WHATSAPP_CONTACT_URL },
    ctaSecondary: { label: "IMS Influencer", href: "/ims/influencer" },
    stats: [
      { value: "100%", label: "rastreabilidade por CPF" },
      { value: "0", label: "planilhas manuais" },
      { value: "infinita", label: "escalabilidade de creators" },
      { value: "tempo real", label: "relatórios" },
    ],
    heroBullets: [
      "Jornada conectada do post à venda",
      "Rastreio por CPF, canal e campanha",
      "Campanhas ativadas, pausadas e ajustadas sem TI",
    ],
    heroNote:
      "Você mantém visão de campanha em tempo real e elimina o atrito operacional entre mídia, execução e venda.",
    heroTone: "dark",
    stepEyebrow: "Como funciona",
    stepLead:
      "Acompanhe a jornada completa de cada influenciador - sem achismo, sem planilha, sem perda de dado.",
    steps: [
      {
        number: "01",
        title: "Post com cupom",
        description: "O influenciador posta com cupom exclusivo rastreado.",
      },
      {
        number: "02",
        title: "Audiência engaja",
        description: "Seguidores veem, interagem e vão até a loja.",
      },
      {
        number: "03",
        title: "Venda rastreada",
        description:
          "A compra é registrada por CPF, canal e campanha em tempo real.",
      },
      {
        number: "04",
        title: "Cashback automático",
        description: "O influenciador recebe sua recompensa automaticamente.",
      },
      {
        number: "05",
        title: "Ciclo recomeça",
        description: "Nova campanha ativada com dados da anterior.",
      },
    ],
    reasonEyebrow: "Por que isso importa",
    reasonTitle: "Mais do que engajamento. Mais do que mídia.",
    reasonLead: "",
    reasons: [
      {
        title: "Canal de venda previsível",
        description:
          "Transforme ações pontuais em fluxo constante de vendas e acompanhe o que cada creator gera de receita.",
        icon: Target,
      },
      {
        title: "Mensuração real",
        description:
          "Saiba qual influenciador converte de verdade. Não por likes, mas por vendas rastreadas por CPF e canal.",
        icon: BarChart3,
      },
      {
        title: "Campanhas em tempo real",
        description:
          "Ative, pause ou ajuste campanhas com agilidade, sem depender de TI ou processo manual.",
        icon: CalendarClock,
      },
      {
        title: "Segmentação inteligente",
        description:
          "Personalize cupons por perfil de influenciador, loja e canal para cada creator operar com estratégia própria.",
        icon: ScanSearch,
      },
      {
        title: "Gamificação colaborativa",
        description:
          "Use ranking, metas e recompensas para estimular creators a vender mais e melhor.",
        icon: Trophy,
      },
      {
        title: "Integração total",
        description:
          "Conecta com ERP, e-commerce, WhatsApp e PDV físico. Funciona onde sua venda acontece.",
        icon: ShieldCheck,
      },
    ],
    audienceEyebrow: "Para quem é",
    audienceTitle: "Feito para marcas que exigem resultado.",
    audienceLead:
      "Ideal para operações que precisam de escala com governança, rastreabilidade e velocidade de execução.",
    audience: [
      {
        title: "Times de marketing",
        description: "Quem quer olhar creator como canal de performance.",
        icon: Megaphone,
      },
      {
        title: "Marcas com creators",
        description:
          "Campanhas com vários influenciadores sem perder rastreio.",
        icon: Users,
      },
      {
        title: "Operações omnichannel",
        description: "Conversa com loja, app, e-commerce e atendimento.",
        icon: Store,
      },
      {
        title: "Gestão orientada por dado",
        description:
          "Relatórios em tempo real para decidir melhor e mais rápido.",
        icon: ClipboardList,
      },
    ],
    faqEyebrow: "FAQ",
    faqTitle: "Pronto para transformar influenciadores em performance?",
    faqLead:
      "Perguntas comuns de quem precisa integrar, medir e escalar sem travar a operação.",
    faqs: [
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
          "Sim - escalabilidade e rastreio são exatamente os pontos fortes do IMS.",
      },
    ],
    finalPrimary: { label: "Solicitar demonstração", href: WHATSAPP_CONTACT_URL },
    finalSecondary: { label: "Falar com o time comercial", href: WHATSAPP_CONTACT_URL },
  },
};

const imsTitleAccent = {
  fontWeight: 600,
  letterSpacing: "-0.04em",
};

const imsInfluencerComoFuncionaTitle: ReactNode = (
  <>
    <span className="whitespace-nowrap">
      <span>Simples</span>{" "}
      <span className="text-[#300250]" style={imsTitleAccent}>
        assim
      </span>
      .
    </span>
  </>
);

const imsBrandComoFuncionaTitle: ReactNode = (
  <>
    <span className="block">Da postagem à conversão,</span>
    <span className="block">
      <span className="text-[#FE6634]" style={imsTitleAccent}>
        tudo conectado
      </span>
      .
    </span>
  </>
);

const imsBrandComoFuncaoIcons: readonly LucideIcon[] = [
  Megaphone,
  Users,
  ScanSearch,
  Banknote,
  RefreshCcw,
];

const imsWorthInfluencerReasonTitle: ReactNode = (
  <>
    <span className="block sm:inline">
      Seu conteúdo tem mais valor do que você{" "}
    </span>
    <span className="text-[#300250]" style={imsTitleAccent}>
      imagina
    </span>
    <span className="sm:inline">.</span>
  </>
);

const imsWorthBrandReasonTitle: ReactNode = (
  <>
    <span className="block">Mais do que engajamento.</span>
    <span className="block">
      Mais do que{" "}
      <span className="text-[#FE6634]" style={imsTitleAccent}>
        mídia
      </span>
      .
    </span>
  </>
);

function buildImsComoFuncionaSteps(
  persona: Persona,
  steps: Step[]
): ImsComoFuncionaStep[] {
  if (persona === "influencer") {
    return imsInfluencerComoFuncionaSteps;
  }
  return steps.map((s, i) => ({
    icon: imsBrandComoFuncaoIcons[i]!,
    title: s.title,
    description: s.description,
  }));
}

export function ImsInfluencerPage(): ReactNode {
  const influencerContent = personaContent.influencer;

  return (
    <main
      id="main-content"
      className="flex-1 overflow-hidden bg-white text-[#18131a]"
    >
      <Hero
        id="top"
        headlineLines={[
          <span key="ims-hero" className="text-white">
            Influência que gera{" "}
            <span className="font-semibold tracking-[-0.04em] text-[#300250]">
              vendas
            </span>
            .
          </span>,
        ]}
        subheadline={
          <div className="space-y-1">
            <span className="block">Você posta. A venda acontece.</span>
            <span className="block">Você ganha por cada resultado.</span>
          </div>
        }
        ctaLabel={influencerContent.ctaSecondary.label}
        ctaHref={influencerContent.ctaSecondary.href}
        secondaryCta={influencerContent.ctaPrimary}
        showPreview={false}
        showLogos={false}
        fillViewport
        lightText
        dualCtaImsLayout
        backgroundImageSrc="/BGIMS.jpg"
      />

      <ImsComoFuncionaProblemSection
        id="como-funciona"
        eyebrow={influencerContent.stepEyebrow}
        lead={influencerContent.stepLead}
        title={imsInfluencerComoFuncionaTitle}
        steps={buildImsComoFuncionaSteps("influencer", influencerContent.steps)}
      />

      <ImsWorthItSection
        id="por-que"
        eyebrow={influencerContent.reasonEyebrow}
        title={imsWorthInfluencerReasonTitle}
        reasons={influencerContent.reasons}
        centerImageSrc="/influencer.avif"
        centerImageAlt="Influenciador e performance no IMS"
        {...(influencerContent.reasonLead != null &&
        influencerContent.reasonLead.trim().length > 0
          ? { lead: influencerContent.reasonLead }
          : {})}
      />

      <ImsAudienceSection />
      <ImsFaqSection />
    </main>
  );
}

export function ImsBrandPage(): ReactNode {
  const brandContent = personaContent.brand;
  const brandAccent = "#FE6634";
  const brandHeroHeadline: ReactNode[] = [
    <span key="brand-hero-1" className="text-white">
      Influencer não é mídia.
    </span>,
    <span key="brand-hero-2" className="text-white">
      É{" "}
      <span className="font-semibold tracking-[-0.04em] text-[#FE6634]">
        canal de vendas
      </span>
      .
    </span>,
  ];

  return (
    <main
      id="main-content"
      className="flex-1 overflow-hidden bg-[#0f0f12] text-white"
    >
      <Hero
        id="top"
        headlineLines={brandHeroHeadline}
        subheadline={
          <div className="space-y-1">
            <span className="block">{brandContent.description}</span>
          </div>
        }
        ctaLabel={brandContent.ctaSecondary.label}
        ctaHref={brandContent.ctaSecondary.href}
        secondaryCta={brandContent.ctaPrimary}
        showPreview={false}
        showLogos={false}
        fillViewport
        lightText
        dualCtaImsLayout
        dualCtaPrimaryColor={brandAccent}
        backgroundImageSrc="/BGIMS.jpg"
      />

      <ImsBrandVideoSection
        eyebrow=""
        title={
          <>
            Do caos à performance:{" "}
            <span className="font-semibold tracking-[-0.04em] text-[#FE6634]">
              influenciadores
            </span>{" "}
            com{" "}
            <span className="font-semibold tracking-[-0.04em] text-[#FE6634]">
              ROI
            </span>{" "}
            real
          </>
        }
        description={
          <>
            Chega de cupons soltos, planilhas confusas e achismo.
            <br />
            <br />
            Com o IMS da Kmillion, cada influenciador vira um canal mensurável
            de vendas - com rastreio em tempo real, autonomia para o marketing e
            campanhas que entregam resultado.
          </>
        }
        videoSrc="/videos/ims_marca.mp4"
      />

      <ImsComoFuncionaProblemSection
        id="como-funciona"
        eyebrow={brandContent.stepEyebrow}
        lead={brandContent.stepLead}
        title={imsBrandComoFuncionaTitle}
        steps={buildImsComoFuncionaSteps("brand", brandContent.steps)}
        tone="dark"
        accentColor={brandAccent}
      />

      <ImsWorthItSection
        id="por-que"
        eyebrow={brandContent.reasonEyebrow}
        title={imsWorthBrandReasonTitle}
        reasons={brandContent.reasons}
        centerImageSrc="/influencer.avif"
        centerImageAlt="Influenciadores como canal de vendas no IMS"
        backgroundVideoSrc="/videos/IML.mp4"
        tone="dark"
        accentColor={brandAccent}
        {...(brandContent.reasonLead != null &&
        brandContent.reasonLead.trim().length > 0
          ? { lead: brandContent.reasonLead }
          : {})}
      />

      <ImsBrandBentoSection
        eyebrow={brandContent.audienceEyebrow}
        title={
          <>
            Um motor que se adapta à sua{" "}
            <span className="font-semibold tracking-[-0.04em] text-[#FE6634]">
              estratégia
            </span>
            . Não o contrário.
          </>
        }
        description={brandContent.audienceLead}
        cards={brandContent.audience}
      />

      <ImsFaqSection
        id="faq"
        eyebrow={brandContent.faqEyebrow}
        title={brandContent.faqTitle}
        faqs={brandContent.faqs}
        primaryCta={brandContent.finalPrimary}
        secondaryCta={brandContent.finalSecondary}
        tone="dark"
        accentColor={brandAccent}
      />
    </main>
  );
}
