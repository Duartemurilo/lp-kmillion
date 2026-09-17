/**
 * Conteúdo da Política de Privacidade, Cookies e Termos de Uso.
 *
 * Transcrição do documento jurídico enviado pela Kmillion
 * ("LGPD Política v3", última atualização 15/03/2026). O texto é legal:
 * a redação NÃO deve ser reescrita ao mexer no layout. O que a página faz
 * é organizar esse texto em blocos tipados, para o sumário, os âncoras e a
 * tabela saírem da mesma fonte que o corpo.
 *
 * Módulo sem "use client" de propósito: a página (server) renderiza o texto
 * no HTML, o que importa tanto para leitura sem JavaScript quanto para
 * indexação de uma página que precisa ser encontrável.
 *
 * Numeração: o documento de origem traz "13" duas vezes (Governança e
 * Cookies), e por isso as seções seguintes ficavam defasadas. Aqui a
 * numeração é sequencial e gerada a partir da ordem do array, nunca digitada.
 */

export type PolicyBlock =
  | { type: "p"; text: string }
  | { type: "ul"; items: readonly string[] }
  /** Termo em destaque mais a definição. Ex.: "Dados cadastrais: ...". */
  | { type: "dl"; items: readonly { term: string; description: string }[] }
  | {
      type: "table";
      caption: string;
      columns: readonly [string, string];
      rows: readonly (readonly [string, string])[];
    }
  /** Frase que o leitor precisa ver mesmo passando o olho. */
  | { type: "callout"; text: string }
  | { type: "email"; label: string; address: string };

export type PolicySection = {
  /** Vira o id do âncora e o item do sumário. Não mudar: quebra links. */
  readonly id: string;
  readonly title: string;
  readonly blocks: readonly PolicyBlock[];
};

export const POLICY_META = {
  title: "Política de Privacidade, Cookies e Termos de Uso",
  version: "3",
  /** ISO para o <time>; o rótulo legível sai formatado na página. */
  updatedAt: "2026-03-15",
  contactEmail: "lgpd@kmillion.com.br",
} as const;

/** Abertura, antes da primeira seção numerada. */
export const POLICY_INTRO: readonly PolicyBlock[] = [
  {
    type: "p",
    text: "A Kmillion Tecnologia Ltda., inscrita no CNPJ nº 46.541.038/0001-72, com sede na Avenida Paulista, 302, conjunto 50, Bela Vista, São Paulo – SP, CEP 01310-000, respeita a privacidade e está comprometida com a proteção, segurança e uso responsável dos dados pessoais tratados no contexto de suas atividades.",
  },
  {
    type: "p",
    text: "Esta Política descreve como coletamos, utilizamos, armazenamos, compartilhamos e protegemos dados pessoais, em conformidade com a Lei nº 13.709/2018 (LGPD) e orientações da Autoridade Nacional de Proteção de Dados (ANPD).",
  },
  {
    type: "p",
    text: "O tratamento de dados pessoais realizado pela Kmillion observa, em todas as suas operações, os princípios previstos no artigo 6º da Lei Geral de Proteção de Dados Pessoais (LGPD), quais sejam:",
  },
  {
    type: "dl",
    items: [
      {
        term: "Finalidade",
        description:
          "realização do tratamento para propósitos legítimos, específicos, explícitos e informados ao titular",
      },
      {
        term: "Adequação",
        description:
          "compatibilidade do tratamento com as finalidades informadas",
      },
      { term: "Necessidade", description: "limitação ao mínimo necessário" },
      {
        term: "Livre acesso",
        description: "garantia de consulta facilitada aos titulares",
      },
      {
        term: "Qualidade dos dados",
        description: "exatidão, clareza e atualização das informações",
      },
      { term: "Transparência", description: "" },
      { term: "Segurança", description: "" },
      { term: "Prevenção", description: "" },
      { term: "Não discriminação", description: "" },
      {
        term: "Responsabilização e prestação de contas",
        description: "accountability",
      },
    ],
  },
  {
    type: "p",
    text: "Esses princípios norteiam todas as decisões relativas ao tratamento de dados e refletem o compromisso da Kmillion com a governança em privacidade.",
  },
];

export const POLICY_SECTIONS: readonly PolicySection[] = [
  {
    id: "papel-da-kmillion",
    title: "Papel da Kmillion no tratamento de dados",
    blocks: [
      {
        type: "p",
        text: "A Kmillion pode atuar como Controladora quando define as finalidades e os meios do tratamento de dados pessoais.",
      },
      {
        type: "p",
        text: "Pode atuar como Operadora quando realiza o tratamento de dados em nome de seus clientes contratantes (ex: varejistas, marketplaces e plataformas de e-commerce).",
      },
      {
        type: "p",
        text: "O papel desempenhado dependerá da relação contratual estabelecida. Em determinadas situações, quando dois ou mais agentes definirem conjuntamente as finalidades e os meios do tratamento de dados pessoais, poderão atuar como controladores conjuntos, assumindo responsabilidades compartilhadas nos termos da LGPD. Nessas hipóteses, as responsabilidades de cada parte serão definidas em instrumento contratual próprio. Quando a Kmillion atuar na condição de operadora, o tratamento de dados será realizado em nome do cliente controlador e de acordo com suas instruções, nos termos do art. 39 da Lei Geral de Proteção de Dados, sendo disciplinado por Contrato de Tratamento de Dados.",
      },
    ],
  },
  {
    id: "dados-tratados",
    title: "Dados pessoais tratados",
    blocks: [
      { type: "p", text: "Podemos tratar as seguintes categorias de dados:" },
      {
        type: "dl",
        items: [
          {
            term: "Dados cadastrais",
            description:
              "CPF ou CNPJ utilizado como identificador único do titular para gestão de benefícios e controle de elegibilidade promocional; nome, e-mail, telefone e endereço, quando fornecidos pelo cliente controlador ou pelo próprio titular.",
          },
          {
            term: "Dados transacionais",
            description:
              "histórico de compras e comportamento de consumo (produtos, SKU, valor, frequência, canal de venda), benefícios promocionais aplicados, cupons utilizados, cashback acumulado e resgatado, e limite de uso de benefícios por período. Esses dados são tratados exclusivamente para operação do motor promocional e não são utilizados para finalidades comerciais próprias da Kmillion.",
          },
          {
            term: "Dados técnicos",
            description:
              "endereço IP, logs de acesso, navegador, sistema operacional e dados de sessão (ambiente digital); identificadores de terminal de PDV, loja e canal (ambiente físico), quando integrados pelo cliente controlador via API ou sistema de frente de caixa.",
          },
          {
            term: "Dados de perfilamento comportamental",
            description:
              "segmentos de clientes, scores de propensão de compra, classificações de frequência e ticket médio e grupos de campanha, derivados do processamento automatizado do histórico transacional pelo motor promocional. Esses dados são de titularidade do cliente controlador e tratados pela Kmillion exclusivamente na qualidade de operadora, sem utilização para finalidades próprias.",
          },
        ],
      },
      {
        type: "callout",
        text: "A Kmillion não coleta ou armazena dados completos de cartão de crédito.",
      },
      {
        type: "p",
        text: "Origem dos dados: os dados pessoais tratados pela Kmillion podem ser obtidos: (i) diretamente do titular dos dados, no contexto de sua navegação ou contato com a empresa; (ii) por meio de clientes contratantes que utilizam a plataforma como controladores, nos termos do contrato firmado; ou (iii) através de integrações com sistemas de e-commerce, marketplaces ou outras plataformas autorizadas pelo cliente controlador. A origem dos dados é elemento determinante para a definição do papel jurídico da Kmillion (controladora ou operadora) em cada hipótese de tratamento.",
      },
    ],
  },
  {
    id: "finalidades-e-bases-legais",
    title: "Finalidades e bases legais",
    blocks: [
      {
        type: "p",
        text: "Tratamos dados pessoais para as seguintes finalidades:",
      },
      {
        type: "table",
        caption: "Finalidades do tratamento e a base legal correspondente",
        columns: ["Finalidade", "Base legal"],
        rows: [
          ["Processamento de campanhas promocionais", "Execução de contrato"],
          ["Geração de cupons, cashback e benefícios", "Execução de contrato"],
          [
            "Atendimento ao titular",
            "Execução de contrato ou cumprimento de obrigação legal (quando relacionado aos direitos do titular)",
          ],
          [
            "Segurança da plataforma e prevenção à fraude",
            "Legítimo interesse",
          ],
          ["Cumprimento de obrigações regulatórias", "Obrigação legal"],
          ["Envio de comunicações (quando aplicável)", "Consentimento"],
        ],
      },
      {
        type: "p",
        text: "Quando o tratamento de dados pessoais ocorrer com base no consentimento do titular, este poderá ser revogado a qualquer momento mediante solicitação expressa, observadas as hipóteses legais que autorizem a continuidade do tratamento independentemente do consentimento, nos termos do art. 8º, § 5º, da LGPD.",
      },
      {
        type: "p",
        text: "Quando o tratamento for fundamentado no legítimo interesse da Kmillion, serão observados os seguintes critérios:",
      },
      {
        type: "ul",
        items: [
          "existência de interesse legítimo real e concreto da empresa ou de terceiros;",
          "necessidade do tratamento para atendimento desse interesse;",
          "verificação de que os interesses ou direitos fundamentais do titular não prevalecem sobre o interesse do controlador (balancing test).",
        ],
      },
      {
        type: "p",
        text: "A Kmillion mantém registro interno das avaliações de impacto realizadas para fundamentar o uso desta base legal.",
      },
      {
        type: "p",
        text: "Além das finalidades descritas na tabela acima, a Kmillion, na qualidade de operadora, poderá realizar as seguintes operações de tratamento por instrução do cliente controlador:",
      },
      {
        type: "ul",
        items: [
          "perfilamento e segmentação comportamental de consumidores para personalização de campanhas;",
          "gestão de benefícios de colaboradores por CPF, com controle de limite de uso por canal e período;",
          "integração omnichannel de dados de compra entre loja física (PDV), e-commerce, aplicativo móvel e CRM;",
          "geração de inteligência promocional e relatórios de performance para o cliente controlador.",
        ],
      },
      {
        type: "p",
        text: "Em todas essas hipóteses, a Kmillion age exclusivamente conforme instruções do controlador, sem definir finalidades próprias para o tratamento.",
      },
    ],
  },
  {
    id: "decisoes-automatizadas",
    title: "Decisões automatizadas",
    blocks: [
      {
        type: "p",
        text: "O motor promocional da Kmillion opera por meio de processamento automatizado de dados transacionais e comportamentais para:",
      },
      {
        type: "ul",
        items: [
          "aplicar regras de elegibilidade a campanhas com base no perfil de compra do titular;",
          "calcular e conceder benefícios como cupons, cashback, descontos progressivos e brindes;",
          "controlar limites de uso de benefícios por CPF, canal e período;",
          "gerar segmentos dinâmicos de clientes para personalização de ofertas em tempo real, em ambiente omnichannel (loja física, e-commerce, app e CRM).",
        ],
      },
      { type: "p", text: "Essas decisões:" },
      {
        type: "ul",
        items: [
          "São baseadas em regras e parâmetros configurados pelo cliente contratante na plataforma;",
          "São executadas automaticamente pelo motor promocional, conforme as condições previamente estabelecidas pelo operador do sistema;",
          "Não produzem efeitos discriminatórios ou ilícitos;",
          "Podem ser objeto de solicitação de revisão pelo titular, nos termos da LGPD.",
        ],
      },
      {
        type: "p",
        text: "A solicitação de revisão de decisões automatizadas será respondida no prazo de 15 (quinze) dias úteis, contados do recebimento. O titular poderá requerer informações sobre os critérios e procedimentos utilizados na decisão, nos termos do art. 20, § 1º, da LGPD. A Kmillion se compromete a não utilizar decisões automatizadas que produzam efeitos discriminatórios com base em origem racial ou étnica, religião, opinião política, saúde ou orientação sexual, nos termos do art. 20, § 3º, da LGPD.",
      },
    ],
  },
  {
    id: "compartilhamento",
    title: "Compartilhamento de dados",
    blocks: [
      {
        type: "callout",
        text: "A Kmillion não comercializa nem compartilha dados pessoais com terceiros para finalidades próprias.",
      },
      {
        type: "p",
        text: "Os dados poderão ser tratados por terceiros apenas nas seguintes hipóteses:",
      },
      {
        type: "ul",
        items: [
          "Prestadores de serviço e provedores de infraestrutura tecnológica que atuem como suboperadores, exclusivamente para viabilizar a operação da plataforma;",
          "Plataformas integradas contratadas pelo próprio cliente (ex: sistemas de e-commerce), quando necessário para execução da campanha;",
          "Autoridades públicas, mediante obrigação legal ou regulatória.",
        ],
      },
      {
        type: "p",
        text: "Quando atuar como operadora, a Kmillion tratará os dados exclusivamente conforme as instruções do cliente contratante, que é o controlador dos dados.",
      },
      {
        type: "p",
        text: "Todos os terceiros envolvidos estão contratualmente obrigados a adotar medidas adequadas de segurança e confidencialidade.",
      },
      {
        type: "p",
        text: "A contratação de suboperadores pela Kmillion é precedida de due diligence de privacidade e segurança da informação. Os suboperadores estão sujeitos às mesmas obrigações de proteção de dados impostas à Kmillion, mediante cláusulas contratuais específicas, e respondem solidariamente pelos danos decorrentes do descumprimento da LGPD, na forma do art. 42 da LGPD.",
      },
    ],
  },
  {
    id: "transferencia-internacional",
    title: "Transferência internacional",
    blocks: [
      {
        type: "p",
        text: "A Kmillion poderá realizar transferência internacional de dados exclusivamente quando necessário para viabilizar sua infraestrutura tecnológica ou serviços contratados, como hospedagem em nuvem, backups ou serviços de suporte técnico.",
      },
      {
        type: "p",
        text: "Nesses casos, a transferência ocorrerá com a adoção de salvaguardas adequadas, incluindo:",
      },
      {
        type: "ul",
        items: [
          "Utilização de provedores que adotem padrões internacionais de segurança da informação;",
          "Cláusulas contratuais específicas de proteção de dados;",
          "Observância das diretrizes da Autoridade Nacional de Proteção de Dados (ANPD).",
        ],
      },
      {
        type: "p",
        text: "As transferências internacionais de dados realizadas pela Kmillion amparam-se, conforme o caso, nas seguintes hipóteses do art. 33 da LGPD:",
      },
      {
        type: "ul",
        items: [
          "países ou organismos que proporcionem grau de proteção adequado, reconhecido pela ANPD;",
          "cláusulas contratuais específicas aprovadas pela ANPD;",
          "normas corporativas globais (BCR, Binding Corporate Rules).",
        ],
      },
      {
        type: "p",
        text: "A Kmillion mantém registro das transferências realizadas, com identificação do destinatário, país de destino e mecanismo jurídico aplicado.",
      },
    ],
  },
  {
    id: "retencao-e-descarte",
    title: "Retenção e descarte",
    blocks: [
      {
        type: "p",
        text: "Os dados pessoais são mantidos enquanto necessários para o cumprimento das finalidades para as quais foram coletados, incluindo a execução de campanhas promocionais, controle de benefícios concedidos, prevenção a fraudes e melhoria da experiência do consumidor.",
      },
      {
        type: "p",
        text: "Considerando a natureza da plataforma, que opera com histórico promocional para garantir a correta aplicação de regras e benefícios futuros, os dados poderão ser mantidos enquanto:",
      },
      {
        type: "ul",
        items: [
          "Houver relação contratual ativa com o cliente controlador;",
          "Forem necessários para assegurar a integridade do histórico promocional;",
          "Forem relevantes para prevenção de inconsistências, fraudes ou duplicidade de benefícios;",
          "Houver obrigação legal ou regulatória aplicável.",
        ],
      },
      {
        type: "p",
        text: "Quando os dados deixarem de ser necessários ou mediante solicitação válida do titular, serão excluídos de forma segura ou anonimizados, quando tecnicamente viável. A retenção observará os princípios da necessidade e adequação previstos na LGPD.",
      },
      {
        type: "p",
        text: "Após o término do período de retenção aplicável, os dados pessoais serão eliminados ou anonimizados, salvo quando sua manutenção for necessária para: (i) cumprimento de obrigação legal ou regulatória; (ii) exercício regular de direitos em processos administrativos, arbitrais ou judiciais; ou (iii) prevenção a fraudes, nos termos do art. 16 da LGPD.",
      },
    ],
  },
  {
    id: "direitos-dos-titulares",
    title: "Direitos dos titulares",
    blocks: [
      {
        type: "p",
        text: "Nos termos da LGPD, o titular dos dados poderá exercer os seguintes direitos:",
      },
      {
        type: "ul",
        items: [
          "Confirmação da existência de tratamento;",
          "Acesso aos dados pessoais tratados;",
          "Correção de dados incompletos, inexatos ou desatualizados;",
          "Anonimização, bloqueio ou eliminação de dados desnecessários ou tratados em desconformidade com a legislação;",
          "Portabilidade dos dados, quando aplicável;",
          "Informação sobre eventual compartilhamento;",
          "Revogação do consentimento, quando essa for a base legal;",
          "Solicitação de revisão de decisões automatizadas;",
          "Oposição ao tratamento realizado com fundamento em hipótese de dispensa de consentimento, em caso de descumprimento à legislação aplicável (art. 18, § 2º, LGPD), sem prejuízo de outros direitos previstos na legislação aplicável.",
        ],
      },
      {
        type: "p",
        text: "Quando a Kmillion atuar na condição de operadora, as solicitações poderão ser encaminhadas ao controlador dos dados (cliente contratante), cabendo à Kmillion atuar em conformidade com as instruções recebidas.",
      },
      {
        type: "email",
        label: "As solicitações podem ser enviadas para",
        address: "lgpd@kmillion.com.br",
      },
      {
        type: "p",
        text: "As demandas serão analisadas e respondidas no prazo de 15 (quinze) dias úteis contados do recebimento, conforme art. 18, § 5º, da LGPD. Para atendimento das solicitações, poderá ser exigida comprovação de identidade do requerente. A Kmillion poderá recusar solicitações manifestamente infundadas ou excessivas, mediante justificativa fundamentada por escrito ao titular.",
      },
    ],
  },
  {
    id: "seguranca-da-informacao",
    title: "Segurança da informação",
    blocks: [
      {
        type: "p",
        text: "A Kmillion adota medidas técnicas e administrativas adequadas para proteger os dados pessoais, em conformidade com os princípios da LGPD e boas práticas de segurança da informação, incluindo:",
      },
      {
        type: "ul",
        items: [
          "Criptografia em trânsito (TLS 1.2 ou superior) e em repouso (AES-256 ou padrão equivalente) para dados sensíveis armazenados;",
          "Controle de acesso baseado em perfil (RBAC) e princípio do menor privilégio;",
          "Autenticação segura para acesso a sistemas internos;",
          "Monitoramento de ambientes e registros de atividades (logs);",
          "Rastreabilidade de operações críticas;",
          "Backups controlados e mecanismos de recuperação;",
          "Realização periódica de Avaliação de Impacto à Proteção de Dados (AIPD/DPIA), nos termos do art. 38 da LGPD, para atividades de tratamento de alto risco;",
          "Atualização contínua de sistemas e aplicação de correções de segurança quando necessárias.",
        ],
      },
      {
        type: "p",
        text: "Dado que a Kmillion realiza tratamento de dados em larga escala, abrangendo dados transacionais e comportamentais de consumidores de múltiplos varejistas, em ambiente omnichannel, são adotadas medidas adicionais proporcionais ao risco:",
      },
      {
        type: "ul",
        items: [
          "segregação lógica de dados por cliente controlador (data isolation), impedindo acesso cruzado entre bases de diferentes contratantes;",
          "pseudonimização de dados de titulares no ambiente de processamento analítico;",
          "política de retenção diferenciada por tipo de dado e contrato;",
          "controles específicos para integrações via API com sistemas de PDV, e-commerce e CRM dos clientes.",
        ],
      },
    ],
  },
  {
    id: "incidentes-de-seguranca",
    title: "Incidentes de segurança",
    blocks: [
      {
        type: "p",
        text: "A Kmillion adota procedimentos internos para identificação, avaliação e tratamento de eventuais incidentes de segurança que envolvam dados pessoais.",
      },
      {
        type: "ul",
        items: [
          "Caso seja identificado incidente de segurança que possa acarretar risco ou dano relevante aos titulares, a Kmillion adotará medidas imediatas de contenção e, no prazo máximo de 3 (três) dias úteis após a confirmação do incidente, comunicará a Autoridade Nacional de Proteção de Dados (ANPD), nos termos do art. 48 da LGPD e da Resolução CD/ANPD nº 15/2024;",
          "Comunicação ao cliente contratante, quando atuar na condição de operadora;",
          "Avaliação quanto à obrigatoriedade de notificação à Autoridade Nacional de Proteção de Dados (ANPD), conforme critérios legais aplicáveis;",
          "Comunicação aos titulares, quando exigido pela legislação vigente.",
        ],
      },
      {
        type: "p",
        text: "As medidas adotadas observarão os princípios de transparência, responsabilidade e conformidade previstos na LGPD.",
      },
    ],
  },
  {
    id: "dados-de-menores",
    title: "Proteção de dados de menores",
    blocks: [
      {
        type: "p",
        text: "A Kmillion não realiza, intencionalmente, coleta ou tratamento de dados pessoais de crianças (menores de 12 anos). Caso venha a ocorrer, o tratamento somente será realizado mediante consentimento específico e em destaque de um dos pais ou responsável legal, nos termos do art. 14 da LGPD.",
      },
      {
        type: "p",
        text: "Dados de colaboradores: quando a Kmillion opera como plataforma de gestão de benefícios de colaboradores (ex: desconto funcional por CPF), o tratamento dos dados dos trabalhadores ocorre por instrução do empregador-controlador, com base nas hipóteses do art. 7º, V (execução de contrato) ou art. 7º, II (cumprimento de obrigação legal ou regulatória) da LGPD. A Kmillion não acessa nem processa informações sensíveis dos trabalhadores (saúde, sindicalização, etc.), limitando o tratamento aos dados estritamente necessários para o controle de elegibilidade e limite de benefícios.",
      },
    ],
  },
  {
    id: "encarregado-dpo",
    title: "Encarregado de proteção de dados (DPO)",
    blocks: [
      {
        type: "p",
        text: "O Encarregado pelo Tratamento de Dados (Data Protection Officer, DPO) é o canal oficial de comunicação entre a Kmillion, os titulares e a ANPD. Suas atribuições incluem:",
      },
      {
        type: "ul",
        items: [
          "aceitar reclamações e comunicações dos titulares;",
          "prestar esclarecimentos e adotar providências;",
          "orientar os colaboradores sobre práticas de proteção de dados;",
          "executar as demais atribuições do art. 41 da LGPD e normas da ANPD.",
        ],
      },
      { type: "email", label: "Contato", address: "lgpd@kmillion.com.br" },
    ],
  },
  {
    id: "governanca",
    title: "Governança em proteção de dados",
    blocks: [
      {
        type: "p",
        text: "A Kmillion mantém programa contínuo de governança em proteção de dados, estruturado para assegurar conformidade permanente com a LGPD e demais normas aplicáveis. Esse programa compreende:",
      },
      {
        type: "ul",
        items: [
          "políticas internas de segurança da informação e privacidade;",
          "treinamento periódico de colaboradores sobre tratamento adequado de dados pessoais;",
          "controle de acesso e gestão de credenciais baseados no princípio do menor privilégio;",
          "avaliação e monitoramento de fornecedores e suboperadores quanto a práticas de privacidade;",
          "revisão periódica desta Política e dos procedimentos internos, inclusive à luz de orientações da Autoridade Nacional de Proteção de Dados (ANPD).",
        ],
      },
      {
        type: "p",
        text: "A existência desse programa demonstra postura proativa de accountability, conforme exigido pelo art. 50 da LGPD.",
      },
    ],
  },
  {
    id: "cookies",
    title: "Cookies",
    blocks: [
      {
        type: "p",
        text: "O site da Kmillion utiliza cookies e tecnologias semelhantes para garantir o funcionamento adequado da plataforma e melhorar a experiência do usuário. Podem ser utilizados:",
      },
      {
        type: "dl",
        items: [
          {
            term: "Cookies estritamente necessários",
            description:
              "indispensáveis para o funcionamento do site e do portal administrativo. Não podem ser desativados sem comprometer funcionalidades essenciais da plataforma.",
          },
          {
            term: "Cookies de desempenho e analytics",
            description:
              "utilizados para compreender métricas de navegação, identificar problemas de performance e melhorar funcionalidades. Requerem consentimento prévio do usuário.",
          },
          {
            term: "Cookies funcionais",
            description:
              "utilizados para lembrar preferências do usuário e otimizar a experiência de navegação personalizada. Requerem consentimento prévio do usuário.",
          },
        ],
      },
      {
        type: "callout",
        text: "Os cookies não são utilizados para comercialização de dados pessoais.",
      },
      {
        type: "p",
        text: "O usuário pode, a qualquer momento, gerenciar, restringir ou revogar o consentimento para cada categoria de cookies diretamente nas configurações do seu navegador ou por meio dos mecanismos de preferência de cookies disponibilizados pela Kmillion, ciente de que a desativação de determinadas categorias poderá impactar funcionalidades da plataforma. O consentimento para cookies não essenciais é granular, ou seja, o usuário pode aceitar ou recusar cada categoria de forma independente.",
      },
      {
        type: "p",
        text: "A utilização de cookies observará, em todos os casos, as boas práticas de transparência, minimalidade e consentimento informado previstas na LGPD e nas diretrizes da ANPD. A Kmillion se compromete a manter registro dos consentimentos obtidos para fins de cookies não essenciais.",
      },
    ],
  },
  {
    id: "alteracoes",
    title: "Alterações na Política",
    blocks: [
      {
        type: "p",
        text: "Esta Política será revisada periodicamente pela Kmillion e poderá ser atualizada a qualquer momento para refletir melhorias operacionais, alterações legais ou regulatórias, ou mudanças nos serviços prestados. A Kmillion poderá revisar esta Política sempre que necessário para refletir orientações, resoluções ou regulamentos emitidos pela Autoridade Nacional de Proteção de Dados (ANPD).",
      },
      {
        type: "p",
        text: "A versão vigente estará sempre disponível no site, com indicação da data da última atualização e número de versão. Quando houver alterações relevantes que impactem direitos dos titulares, a Kmillion comunicará os usuários por meios razoáveis e, quando aplicável, coletará novo consentimento.",
      },
    ],
  },
  {
    id: "termos-de-uso",
    title: "Termos de uso",
    blocks: [
      {
        type: "p",
        text: "O acesso e a navegação no site da Kmillion implicam ciência desta Política de Privacidade.",
      },
      {
        type: "p",
        text: "O conteúdo disponibilizado no site, incluindo textos, imagens, marcas, logotipos e demais materiais, é protegido por direitos de propriedade intelectual e não poderá ser reproduzido, distribuído ou utilizado sem autorização prévia.",
      },
      {
        type: "p",
        text: "A Kmillion envidará seus melhores esforços para garantir a disponibilidade da plataforma, não se responsabilizando por indisponibilidades decorrentes de caso fortuito, força maior, manutenção programada ou atos de terceiros. Não se responsabiliza também por danos decorrentes do uso indevido das informações pelo usuário ou por terceiros não autorizados.",
      },
      {
        type: "p",
        text: "Fica eleito o foro da comarca de São Paulo/SP para dirimir quaisquer controvérsias oriundas desta Política, com renúncia expressa a qualquer outro, por mais privilegiado que seja. A presente Política é regida pela legislação brasileira, em especial a LGPD (Lei nº 13.709/2018), o Marco Civil da Internet (Lei nº 12.965/2014) e o Código de Defesa do Consumidor, naquilo que for aplicável.",
      },
    ],
  },
];
