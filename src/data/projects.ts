/**
 * NORD GARAGE — Project case data.
 * Central source of truth for the grid and the six case studies.
 * Studio photography is complemented by a model-specific Pexels selection.
 * Remote shots always include a local fallback so the viewer remains robust.
 */

export type HeroVariant = "full" | "split" | "concept" | "pano";
export type FeatureKind = "compare" | "hydro" | "map" | "process" | "fifty" | "chapters";
export type HeroSide = "left" | "right";

export interface GalleryFig {
  img: string;
  fallback?: string;
  cap: string;
  alt: string;
  span: string;
  h: string;
  pos?: string;
  zoom?: string;
  tone?: string;
}

export interface Step {
  t: string;
  d: string;
}

export interface Project {
  id: string;
  slug: string;
  titleLines: [string, string];
  vehicle: string;
  serviceLabel: string;
  serviceShort: string;
  theme: string;
  year: string;
  duration: string;
  protection: string;
  location: string;
  heroVariant: HeroVariant;
  heroImage: string;
  heroPos: string;
  heroSide?: HeroSide;
  thumb: { img: string; alt: string };
  facts: { k: string; v: string }[];
  story: { lines: [string, string]; paras: string[] };
  feature: FeatureKind;
  steps?: Step[];
  galleryLabel: string;
  gallery: GalleryFig[];
  result: [string, string];
}

export const GRID_LAYOUT = [
  { span: "md:col-span-7", h: "h-[300px] sm:h-[400px] lg:h-[560px]" },
  { span: "md:col-span-5", h: "h-[300px] sm:h-[400px] lg:h-[560px]" },
  { span: "md:col-span-5", h: "h-[280px] sm:h-[360px] lg:h-[440px]" },
  { span: "md:col-span-7", h: "h-[280px] sm:h-[360px] lg:h-[440px]" },
  { span: "md:col-span-4", h: "h-[280px] lg:h-[420px]" },
  { span: "md:col-span-8", h: "h-[280px] lg:h-[420px]" },
];

const pexels = (id: number) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=1800`;

export const PROJECTS: Project[] = [
  {
    id: "01",
    slug: "porsche-911-carrera",
    titleLines: ["PORSCHE", "911 CARRERA"],
    vehicle: "Porsche 911 Carrera",
    serviceLabel: "Polimento técnico + vitrificação",
    serviceShort: "Polimento + vitrificação",
    theme: "PAINT CORRECTION + CERAMIC COATING",
    year: "2024",
    duration: "2 dias",
    protection: "Cerâmico — 3 anos",
    location: "Curitiba — PR",
    heroVariant: "full",
    heroImage: "/img/gallery-a.jpg",
    heroPos: "50% 58%",
    thumb: {
      img: "/img/gallery-a.jpg",
      alt: "Porsche 911 Carrera escuro visto de traseira no estúdio, com reflexos de luzes lineares",
    },
    facts: [
      { k: "Veículo", v: "Porsche 911 Carrera" },
      { k: "Ano", v: "2024" },
      { k: "Serviço", v: "Polimento + vitrificação" },
      { k: "Tempo", v: "2 dias" },
      { k: "Proteção", v: "Cerâmico — 3 anos" },
      { k: "Local", v: "Curitiba — PR" },
    ],
    story: {
      lines: ["Riscos que só", "a luz revela."],
      paras: [
        "A pintura apresentava micro riscos e marcas de lavagem perceptíveis principalmente sob iluminação direta — o tipo de defeito que rouba profundidade do preto.",
        "O objetivo foi recuperar uniformidade e reflexo sem comprometer o verniz original. Após a correção em dois estágios, o conjunto recebeu coating cerâmico para preservar o resultado.",
      ],
    },
    feature: "compare",
    steps: [
      { t: "Inspeção", d: "Mapeamento com luz de inspeção e medidor de espessura por painel." },
      { t: "Preparação", d: "Lavagem técnica e descontaminação química e mecânica." },
      { t: "Correção", d: "Corte controlado para remoção dos micro riscos." },
      { t: "Refino", d: "Acabamento fino para devolver leitura limpa ao reflexo." },
      { t: "Proteção", d: "Coating cerâmico aplicado em cabine, com cura controlada." },
      { t: "Entrega", d: "Verificação final sob luz técnica e orientações de manutenção." },
    ],
    galleryLabel: "Registros — Entrega",
    gallery: [
      {
        img: "/img/gallery-a.jpg",
        cap: "911 Carrera — entrega",
        alt: "Porsche 911 Carrera escuro visto de traseira sob luzes lineares",
        span: "md:col-span-12",
        h: "h-[320px] md:h-[540px]",
        pos: "50% 58%",
      },
      {
        img: pexels(30968112),
        fallback: "/img/gallery-a.jpg",
        cap: "911 Carrera — night drive",
        alt: "Porsche 911 Carrera fotografado à noite em ambiente urbano",
        span: "md:col-span-7",
        h: "h-[300px] lg:h-[440px]",
        pos: "50% 54%",
      },
      {
        img: pexels(5195363),
        fallback: "/img/svc-polimento.jpg",
        cap: "911 — linhas originais",
        alt: "Porsche 911 em enquadramento lateral destacando suas linhas",
        span: "md:col-span-5",
        h: "h-[300px] lg:h-[440px]",
        pos: "50% 52%",
        tone: "saturate-[0.3] brightness-[0.72] contrast-[1.12]",
      },
      {
        img: "/img/svc-polimento.jpg",
        cap: "Correção — estágio 01",
        alt: "Politriz corrigindo a pintura preta do Porsche 911",
        span: "md:col-span-12",
        h: "h-[300px] md:h-[480px]",
        pos: "62% 50%",
      },
    ],
    result: ["O brilho de sair", "da concessionária."],
  },

  {
    id: "02",
    slug: "bmw-320i",
    titleLines: ["BMW", "320I"],
    vehicle: "BMW 320i",
    serviceLabel: "Vitrificação cerâmica",
    serviceShort: "Vitrificação cerâmica",
    theme: "CERAMIC COATING",
    year: "2025",
    duration: "1 dia",
    protection: "Cerâmico — 3 anos",
    location: "Curitiba — PR",
    heroVariant: "split",
    heroImage: "/img/svc-vitrificacao.jpg",
    heroPos: "50% 45%",
    heroSide: "right",
    thumb: {
      img: "/img/svc-vitrificacao.jpg",
      alt: "Aplicação de coating cerâmico com luva preta sobre capô preto",
    },
    facts: [
      { k: "Veículo", v: "BMW 320i" },
      { k: "Ano", v: "2025" },
      { k: "Serviço", v: "Vitrificação cerâmica" },
      { k: "Tempo", v: "1 dia" },
      { k: "Proteção", v: "Cerâmico — 3 anos" },
      { k: "Local", v: "Curitiba — PR" },
    ],
    story: {
      lines: ["Preservar o brilho", "do primeiro dia."],
      paras: [
        "Veículo recém-entregue, trazido direto da concessionária. A missão era travar no tempo a condição de fábrica da pintura.",
        "Após polimento de refino, o cerâmico foi aplicado em cabine com cura controlada — camada uniforme, sem marcas de aplicação.",
      ],
    },
    feature: "hydro",
    steps: [
      { t: "Inspeção", d: "Conferência da condição de fábrica painel a painel." },
      { t: "Preparação", d: "Lavagem técnica e descontaminação completa." },
      { t: "Polimento de refino", d: "Realce do brilho sem remoção agressiva de verniz." },
      { t: "Vitrificação", d: "Aplicação do cerâmico em seções controladas." },
      { t: "Cura", d: "Tempo de cura monitorado antes da liberação." },
      { t: "Entrega", d: "Inspeção de nível de camada e orientações de lavagem." },
    ],
    galleryLabel: "Registros — Aplicação",
    gallery: [
      {
        img: pexels(20398056),
        fallback: "/img/svc-vitrificacao.jpg",
        cap: "BMW 320i — noite",
        alt: "BMW Série 3 fotografado à noite após a vitrificação",
        span: "md:col-span-12",
        h: "h-[320px] md:h-[520px]",
        pos: "50% 55%",
        tone: "brightness-[0.72] contrast-[1.08] saturate-[0.75]",
      },
      {
        img: pexels(31983216),
        fallback: "/img/studio.jpg",
        cap: "Série 3 — superfície final",
        alt: "BMW Série 3 visto de frente após o tratamento cerâmico",
        span: "md:col-span-7",
        h: "h-[300px] lg:h-[420px]",
        pos: "50% 58%",
        tone: "brightness-[0.65] contrast-[1.12] saturate-[0.55]",
      },
      {
        img: pexels(1338396),
        fallback: "/img/svc-interior.jpg",
        cap: "Interior — cockpit BMW",
        alt: "Detalhe do volante e do interior do BMW Série 3",
        span: "md:col-span-5",
        h: "h-[300px] lg:h-[420px]",
        pos: "50% 50%",
        tone: "brightness-[0.7] contrast-[1.1] saturate-[0.7]",
      },
      {
        img: "/img/paint-macro.jpg",
        cap: "Beading — coating curado",
        alt: "Gotas de água sobre a pintura vitrificada do BMW 320i",
        span: "md:col-span-12",
        h: "h-[300px] md:h-[460px]",
        pos: "20% 50%",
      },
    ],
    result: ["A pintura agora", "trabalha a seu favor."],
  },

  {
    id: "03",
    slug: "bmw-m3",
    titleLines: ["BMW", "M3"],
    vehicle: "BMW M3",
    serviceLabel: "PPF frontal + coating",
    serviceShort: "PPF + coating",
    theme: "PPF + COATING",
    year: "2025",
    duration: "3 dias",
    protection: "PPF 10 anos + cerâmico",
    location: "Curitiba — PR",
    heroVariant: "split",
    heroImage: "/img/gallery-b.jpg",
    heroPos: "42% 55%",
    heroSide: "left",
    thumb: {
      img: "/img/gallery-b.jpg",
      alt: "Farol de LED e capô com gotas de água do BMW M3 em estúdio escuro",
    },
    facts: [
      { k: "Veículo", v: "BMW M3" },
      { k: "Ano", v: "2025" },
      { k: "Serviço", v: "PPF frontal + coating" },
      { k: "Tempo", v: "3 dias" },
      { k: "Proteção", v: "PPF 10 anos + cerâmico" },
      { k: "Local", v: "Curitiba — PR" },
    ],
    story: {
      lines: ["Blindagem invisível", "para o uso diário."],
      paras: [
        "Uso intenso em estrada: a frente concentrava impactos de pedra e insetos. O dono queria proteção real sem alterar a estética do carro.",
        "O PPF cobre as áreas críticas absorvendo o impacto. O coating entra por cima — e nas demais superfícies — garantindo hidrofobia e facilidade de manutenção.",
      ],
    },
    feature: "map",
    steps: [
      { t: "Inspeção", d: "Mapeamento dos pontos de impacto existentes." },
      { t: "Preparação", d: "Descontaminação para aderência total da película." },
      { t: "Correção leve", d: "Refino da frente antes da aplicação." },
      { t: "Aplicação do PPF", d: "Película recortada e aplicada sem emendas visíveis." },
      { t: "Coating", d: "Cerâmico sobre o PPF e demais superfícies expostas." },
      { t: "Entrega", d: "Conferência de bordas e lacres sob luz técnica." },
    ],
    galleryLabel: "Registros — Proteção",
    gallery: [
      {
        img: pexels(29580159),
        fallback: "/img/gallery-b.jpg",
        cap: "BMW M3 — presença",
        alt: "BMW M3 preto fotografado em ambiente urbano escuro",
        span: "md:col-span-12",
        h: "h-[320px] md:h-[540px]",
        pos: "50% 58%",
        tone: "brightness-[0.78] contrast-[1.08] saturate-[0.75]",
      },
      {
        img: pexels(29580163),
        fallback: "/img/gallery-b.jpg",
        cap: "M3 — detalhe frontal",
        alt: "Close do farol e da frente do BMW M3 preto",
        span: "md:col-span-7",
        h: "h-[300px] lg:h-[440px]",
        pos: "40% 52%",
        tone: "brightness-[0.78] contrast-[1.12] saturate-[0.72]",
      },
      {
        img: pexels(10879635),
        fallback: "/img/svc-ppf.jpg",
        cap: "M3 — perfil protegido",
        alt: "BMW M3 preto visto de perfil após a proteção frontal",
        span: "md:col-span-5",
        h: "h-[300px] lg:h-[440px]",
        pos: "52% 50%",
        tone: "brightness-[0.68] contrast-[1.12] saturate-[0.5]",
      },
      {
        img: "/img/svc-ppf.jpg",
        cap: "PPF — aplicação frontal",
        alt: "Película PPF sendo aplicada na frente do BMW M3",
        span: "md:col-span-12",
        h: "h-[300px] md:h-[480px]",
        pos: "50% 55%",
      },
    ],
    result: ["Invisível.", "Como deve ser."],
  },

  {
    id: "04",
    slug: "audi-rs3",
    titleLines: ["AUDI", "RS3"],
    vehicle: "Audi RS3",
    serviceLabel: "Detalhamento completo",
    serviceShort: "Detalhamento completo",
    theme: "FULL DETAIL",
    year: "2026",
    duration: "3 dias",
    protection: "Selantes + proteção interna",
    location: "Curitiba — PR",
    heroVariant: "full",
    heroImage: "/img/svc-polimento.jpg",
    heroPos: "62% 50%",
    thumb: {
      img: "/img/svc-polimento.jpg",
      alt: "Politriz em ação sobre pintura preta do RS3",
    },
    facts: [
      { k: "Veículo", v: "Audi RS3" },
      { k: "Ano", v: "2026" },
      { k: "Serviço", v: "Detalhamento completo" },
      { k: "Tempo", v: "3 dias" },
      { k: "Proteção", v: "Selantes + interna" },
      { k: "Local", v: "Curitiba — PR" },
    ],
    story: {
      lines: ["Três dias para", "voltar ao ponto zero."],
      paras: [
        "Uso diário intenso: marcas de lavagem no exterior, cabine desgastada e acabamentos sem vida. O carro pedia um reset completo, não uma lavagem.",
        "O detalhamento redefiniu pintura, cabine e acabamentos — superfície por superfície, com proteção final por selantes específicos para cada material.",
      ],
    },
    feature: "process",
    galleryLabel: "Registros — Reset",
    gallery: [
      {
        img: pexels(37953339),
        fallback: "/img/svc-polimento.jpg",
        cap: "Audi RS3 — entrega",
        alt: "Audi RS3 fotografado em garagem após o detalhamento completo",
        span: "md:col-span-12",
        h: "h-[320px] md:h-[520px]",
        pos: "50% 56%",
        tone: "grayscale brightness-[0.58] contrast-[1.18]",
      },
      {
        img: pexels(10626327),
        fallback: "/img/svc-interior.jpg",
        cap: "RS3 — assinatura interior",
        alt: "Detalhe iluminado da soleira RS3 após a higienização interna",
        span: "md:col-span-5",
        h: "h-[300px] lg:h-[420px]",
        pos: "50% 50%",
        tone: "brightness-[0.72] contrast-[1.12] saturate-[0.7]",
      },
      {
        img: pexels(37953340),
        fallback: "/img/studio.jpg",
        cap: "RS3 — traseira finalizada",
        alt: "Traseira do Audi RS3 após o detalhamento premium",
        span: "md:col-span-7",
        h: "h-[300px] lg:h-[420px]",
        pos: "50% 58%",
        tone: "grayscale brightness-[0.58] contrast-[1.18]",
      },
      {
        img: "/img/svc-interior.jpg",
        cap: "Interior — acabamento",
        alt: "Higienização detalhada do couro do Audi RS3",
        span: "md:col-span-12",
        h: "h-[300px] md:h-[480px]",
        pos: "50% 35%",
      },
    ],
    result: ["Ponto zero,", "de volta."],
  },

  {
    id: "05",
    slug: "porsche-macan",
    titleLines: ["PORSCHE", "MACAN"],
    vehicle: "Porsche Macan",
    serviceLabel: "Correção de pintura",
    serviceShort: "Correção de pintura",
    theme: "PAINT CORRECTION",
    year: "2024",
    duration: "2 dias",
    protection: "Selante — 12 meses",
    location: "Curitiba — PR",
    heroVariant: "concept",
    heroImage: "/img/paint-macro.jpg",
    heroPos: "50% 55%",
    heroSide: "right",
    thumb: {
      img: "/img/paint-macro.jpg",
      alt: "Macro da pintura do Macan com gotas de água e reflexo linear",
    },
    facts: [
      { k: "Veículo", v: "Porsche Macan" },
      { k: "Ano", v: "2024" },
      { k: "Serviço", v: "Correção de pintura" },
      { k: "Tempo", v: "2 dias" },
      { k: "Proteção", v: "Selante — 12 meses" },
      { k: "Local", v: "Curitiba — PR" },
    ],
    story: {
      lines: ["Hologramas sob", "cada holofote."],
      paras: [
        "Pintura escura acumulava hologramas e marcas circulares de lavagens automáticas — defeitos invisíveis na garagem, evidentes na rua.",
        "A correção por estágios devolveu a leitura limpa do reflexo, medida painel a painel sob luz de inspeção. O fechamento foi com selante de alta dureza.",
      ],
    },
    feature: "fifty",
    steps: [
      { t: "Inspeção", d: "Leitura dos hologramas sob fontes de luz distintas." },
      { t: "Preparação", d: "Descontaminação química e de clay bar." },
      { t: "Corte", d: "Remoção dos defeitos com compostos progressivos." },
      { t: "Refino", d: "Joalharia da pintura — profundidade e nitidez." },
      { t: "Proteção", d: "Selante de alta dureza para preservar o resultado." },
      { t: "Entrega", d: "Aprovação final com o cliente sob luz de inspeção." },
    ],
    galleryLabel: "Registros — Correção",
    gallery: [
      {
        img: "https://unsplash.com/photos/JaBTeddvIvE/download?force=true&w=1800",
        fallback: "/img/paint-macro.jpg",
        cap: "Porsche Macan — inspeção",
        alt: "Porsche Macan S preto antes da correção de pintura",
        span: "md:col-span-12",
        h: "h-[320px] md:h-[520px]",
        pos: "50% 58%",
        tone: "brightness-[0.68] contrast-[1.12] saturate-[0.62]",
      },
      {
        img: pexels(6872165),
        fallback: "/img/paint-macro.jpg",
        cap: "Macan — detalhe traseiro",
        alt: "Detalhe da lanterna e da pintura escura do Porsche Macan",
        span: "md:col-span-7",
        h: "h-[300px] lg:h-[440px]",
        pos: "50% 50%",
        tone: "brightness-[0.68] contrast-[1.15] saturate-[0.55]",
      },
      {
        img: pexels(14498784),
        fallback: "/img/svc-polimento.jpg",
        cap: "Macan — cockpit",
        alt: "Painel e instrumentos do Porsche Macan após o acabamento interno",
        span: "md:col-span-5",
        h: "h-[300px] lg:h-[440px]",
        pos: "50% 50%",
        tone: "brightness-[0.65] contrast-[1.12] saturate-[0.6]",
      },
      {
        img: "/img/svc-polimento.jpg",
        cap: "Correção — máquina rotativa",
        alt: "Correção de pintura em andamento no Porsche Macan",
        span: "md:col-span-12",
        h: "h-[300px] md:h-[480px]",
        pos: "58% 45%",
      },
    ],
    result: ["A luz agora", "trabalha a favor."],
  },

  {
    id: "06",
    slug: "ford-mustang",
    titleLines: ["FORD", "MUSTANG"],
    vehicle: "Ford Mustang",
    serviceLabel: "Detalhamento premium",
    serviceShort: "Detalhamento premium",
    theme: "PREMIUM DETAIL",
    year: "2025",
    duration: "2 dias",
    protection: "Cera + selantes",
    location: "Curitiba — PR",
    heroVariant: "pano",
    heroImage: "/img/final.jpg",
    heroPos: "50% 38%",
    thumb: {
      img: "/img/final.jpg",
      alt: "Aerofólio traseiro do Mustang preto com reflexo de luz horizontal",
    },
    facts: [
      { k: "Veículo", v: "Ford Mustang" },
      { k: "Ano", v: "2025" },
      { k: "Serviço", v: "Detalhamento premium" },
      { k: "Tempo", v: "2 dias" },
      { k: "Proteção", v: "Cera + selantes" },
      { k: "Local", v: "Curitiba — PR" },
    ],
    story: {
      lines: ["Um ícone merece", "presença à altura."],
      paras: [
        "Carro de fim de semana, guardado com cuidado — e tratado aqui com o mesmo carinho. Nenhum dano grave: apenas a preservação de um objeto de desejo.",
        "Do spoiler às rodas, cada superfície recebeu atenção individual. O acabamento final é quase cerimonial.",
      ],
    },
    feature: "chapters",
    steps: [
      { t: "Inspeção", d: "Registro da condição geral e pontos de atenção." },
      { t: "Lavagem técnica", d: "Processo seguro em duas etapas, sem contato agressivo." },
      { t: "Descontaminação", d: "Remoção de contaminantes de pintura e vidros." },
      { t: "Interior", d: "Higienização e hidratação de couro e acabamentos." },
      { t: "Acabamento", d: "Cera de carnaúba e curadoria de cada detalhe externo." },
      { t: "Entrega", d: "Revisão final sob luz técnica do estúdio." },
    ],
    galleryLabel: "Registros — Presença",
    gallery: [
      {
        img: pexels(13897261),
        fallback: "/img/final.jpg",
        cap: "Ford Mustang — traseira",
        alt: "Ford Mustang Bullitt visto de traseira ao entardecer",
        span: "md:col-span-12",
        h: "h-[320px] md:h-[520px]",
        pos: "50% 56%",
        tone: "brightness-[0.68] contrast-[1.12] saturate-[0.6]",
      },
      {
        img: pexels(18785790),
        fallback: "/img/svc-polimento.jpg",
        cap: "Mustang — assinatura traseira",
        alt: "Detalhe da traseira e emblema do Ford Mustang",
        span: "md:col-span-7",
        h: "h-[300px] lg:h-[420px]",
        pos: "50% 55%",
        tone: "brightness-[0.72] contrast-[1.1] saturate-[0.65]",
      },
      {
        img: pexels(6654311),
        fallback: "/img/final.jpg",
        cap: "Mustang — emblema",
        alt: "Close do emblema lateral do Ford Mustang",
        span: "md:col-span-5",
        h: "h-[300px] lg:h-[420px]",
        pos: "50% 50%",
        tone: "brightness-[0.62] contrast-[1.18] saturate-[0.5]",
      },
      {
        img: "/img/final.jpg",
        cap: "Spoiler — acabamento final",
        alt: "Aerofólio do Ford Mustang sob reflexo de luz linear",
        span: "md:col-span-12",
        h: "h-[300px] md:h-[460px]",
        pos: "50% 62%",
      },
    ],
    result: ["Presença", "restaurada."],
  },
];

export const getProject = (slug: string) => PROJECTS.find((p) => p.slug === slug);

export const getNextProject = (slug: string) => {
  const i = PROJECTS.findIndex((p) => p.slug === slug);
  return PROJECTS[(i + 1) % PROJECTS.length];
};

export const getPrevProject = (slug: string) => {
  const i = PROJECTS.findIndex((p) => p.slug === slug);
  return PROJECTS[(i - 1 + PROJECTS.length) % PROJECTS.length];
};
