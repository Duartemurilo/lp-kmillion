import {
  Box,
  Copy,
  ArrowUpRight,
  Clock3,
  Gauge,
  Repeat2,
  RefreshCcw,
  SlidersHorizontal,
  User,
  Workflow,
  Zap,
  MessageSquareText,
  type LucideIcon,
} from "lucide-react";

export type MotorCard = {
  title: string;
  body: string;
};

export type CapabilityCard = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export type DifferentialRow = {
  icon: LucideIcon;
  label: string;
  market: string;
  kmillion: string;
};

export const ease = [0.23, 1, 0.32, 1] as const;

export const motorSteps = [
  {
    icon: Clock3,
    title: "A promoção precisa passar por TI.",
    description:
      "Quando cada ajuste vira fila técnica, a operação perde velocidade e o marketing perde autonomia.",
  },
  {
    icon: MessageSquareText,
    title: "O sistema só permite regras básicas.",
    description:
      "A plataforma limita mecânicas que poderiam ser mais ricas, flexíveis e aderentes à estratégia.",
  },
  {
    icon: Gauge,
    title: "O PDV demora para atualizar.",
    description:
      "A campanha roda, mas a validade ainda depende de carga offline ou sincronização manual.",
  },
  {
    icon: Workflow,
    title: "O omnichannel não conversa entre si.",
    description:
      "Loja, app, e-commerce e campanha não operam como um único fluxo de decisão.",
  },
  {
    icon: Zap,
    title: "Existe limite de regras concorrentes.",
    description:
      "A estratégia comercial fica presa em um motor que não acompanha a ambição da operação.",
  },
] as const;

export const motorCards: MotorCard[] = [
  {
    title: "Definir Regras",
    body: "Transforme ações pontuais em fluxo constante.",
  },
  {
    title: "Publicar",
    body: "Valer em tempo real. Transforme ações pontuais em fluxo constante.",
  },
  {
    title: "Acompanhar resultados",
    body: "Transforme ações pontuais em fluxo constante.",
  },
  {
    title: "Testar sem limites",
    body: "Transforme ações pontuais em fluxo constante.",
  },
];

export const motorCapabilities: CapabilityCard[] = [
  {
    icon: SlidersHorizontal,
    title: "Defina condições",
    description: "Produto, loja, região, cliente, pagamento e muito mais.",
  },
  {
    icon: Repeat2,
    title: "Escolha o benefício",
    description: "Desconto, cashback, brinde, combo, cupom e regras compostas.",
  },
  {
    icon: ArrowUpRight,
    title: "Publique",
    description: "A regra passa a valer instantaneamente em todos os canais.",
  },
];

export const comparisons = [
  ["Limite de promoções concorrentes", "Limitado", "Promoções ilimitadas"],
  ["Atualização", "Por carga", "Real-time"],
  ["Regras", "Simples", "Altamente customizáveis"],
  ["Dependência de TI", "Alta", "Autonomia do marketing"],
  ["Benefícios", "Isolados", "Ecossistema de benefícios"],
] as const;

export const differentialRows: DifferentialRow[] = [
  {
    icon: Copy,
    label: "Limite de promoções concorrentes",
    market: "Limite de promoções concorrentes",
    kmillion: "Promoções ilimitadas",
  },
  {
    icon: RefreshCcw,
    label: "Atualização",
    market: "Atualização por carga",
    kmillion: "Atualização real-time",
  },
  {
    icon: SlidersHorizontal,
    label: "Regras",
    market: "Regras simples",
    kmillion: "Regras altamente customizáveis",
  },
  {
    icon: User,
    label: "Dependência de TI",
    market: "Dependência de TI",
    kmillion: "Autonomia do marketing",
  },
  {
    icon: Box,
    label: "Benefícios",
    market: "Benefícios isolados",
    kmillion: "Ecossistema de benefícios",
  },
];

export const audience = [
  "Redes de varejo físico",
  "Operações omnichannel",
  "Franquias",
  "Marcas com múltiplas lojas",
  "Empresas com programas de fidelização",
  "Operações com revendedores",
  "Marketing que quer autonomia",
] as const;
