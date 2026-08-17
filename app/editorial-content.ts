import type { Locale } from "./i18n";
import { routeFor, type RouteKey } from "./route-localization";

export type ProjectKey =
  | "meninoAssumPreto"
  | "kurupyra"
  | "revoada"
  | "concepcoesMarginais"
  | "emFormacao"
  | "videodancas"
  | "evenInTheTrash"
  | "fightingOverACap"
  | "cantigas"
  | "oficinas"
  | "residencia"
  | "debatePrimeiraEdicao";

export type CollectionKey = "espetaculos" | "audiovisual" | "formacao" | "debates";

const projectRouteKeys: Record<ProjectKey, RouteKey> = {
  meninoAssumPreto: "performanceMenino",
  kurupyra: "performanceKurupyra",
  revoada: "performanceRevoada",
  concepcoesMarginais: "screenConcepcoes",
  emFormacao: "screenEmFormacao",
  videodancas: "screenVideodances",
  evenInTheTrash: "screenEvenTrash",
  fightingOverACap: "screenFightingOverACap",
  cantigas: "screenCantigas",
  oficinas: "learningWorkshops",
  residencia: "learningResidency",
  debatePrimeiraEdicao: "debateFirstEdition",
};

const collectionRouteKeys: Record<CollectionKey, RouteKey> = {
  espetaculos: "performances",
  audiovisual: "screen",
  formacao: "learning",
  debates: "debates",
};

export function projectRouteFor(locale: Locale, projectKey: ProjectKey) {
  return routeFor(locale, projectRouteKeys[projectKey]);
}

export function collectionRouteFor(locale: Locale, collectionKey: CollectionKey) {
  return routeFor(locale, collectionRouteKeys[collectionKey]);
}

type Link = {
  href: string;
  label: string;
};

type Credit = {
  role: string;
  names: string;
};

type ProjectImage = {
  src: string;
  alt: string;
  credit?: string;
  portrait?: boolean;
  poster?: boolean;
};

type ProjectVideo = {
  youtubeId: string;
  title: string;
  linkLabel: string;
  thumbnail?: string;
  thumbnailAlt?: string;
};

type VideoWork = {
  title: string;
  year: string;
  href: string;
  projectKey?: ProjectKey;
  description?: string;
  image?: string;
  credits: Credit[];
};

export type EditorialProject = {
  title: string;
  eyebrow: string;
  year: string;
  status?: string;
  presentation?: "poster";
  summary: string;
  synopsisHeading?: string;
  body: string[];
  image?: string;
  imageCredit?: string;
  secondaryImage?: string;
  secondaryImageCredit?: string;
  gallery?: ProjectImage[];
  galleryLabel?: string;
  galleryCredit?: string;
  video?: ProjectVideo;
  videoWorks?: VideoWork[];
  credits?: Credit[];
  imageAlt: string;
  placeholderLabel?: string;
  facts: Array<{ label: string; value: string }>;
  links: Link[];
};

type EditorialCollection = {
  eyebrow: string;
  heading: string;
  intro: string;
  stripLabel: string;
  projectKeys: ProjectKey[];
};

type Member = {
  name: string;
  role: string;
  bio: string;
  portraitClass: string;
  links: Link[];
};

type EditorialContent = {
  common: {
    openProject: string;
    synopsis: string;
    technical: string;
    fullCredits: string;
    creditsPending: string;
    gallery: string;
    video: string;
    media: string;
    sourceNote: string;
    previous: string;
    next: string;
    updating: string;
    galleryPending: string;
  };
  collections: Record<CollectionKey, EditorialCollection>;
  projects: Record<ProjectKey, EditorialProject>;
  group: {
    membersEyebrow: string;
    membersHeading: string;
    membersIntro: string;
    membersVisible?: boolean;
    members: Member[];
    researchEyebrow: string;
    researchHeading: string;
    researchBody: string[];
    researchAxes: string[];
  };
  history: {
    eyebrow: string;
    heading: string;
    intro: string;
    clippingLabel: string;
    clippingStatus: string;
    events: Array<{ year: string; title: string; description: string }>;
  };
  agenda: {
    eyebrow: string;
    heading: string;
    intro: string;
    when: string;
    where: string;
    events: Array<{
      title: string;
      note?: string;
      dates: Array<{
        day: string;
        weekday: string;
        month: string;
        time: string;
        label?: string;
      }>;
      venue: string;
      address: string;
    }>;
  };
};

const sharedImages = {
  assum: "/images/flying-low-assum-preto.jpg",
  collective: "/images/flying-low-collective.jpg",
  portrait: "/images/flying-low-portrait.jpg",
  amber: "/images/flying-low-stage-amber.jpg",
  blue: "/images/flying-low-stage-blue.jpg",
  kurupyraHero: "/images/kurupyra/kurupyra-193.webp",
  kurupyraSecondary: "/images/kurupyra/kurupyra-317.webp",
  concepcoesHero: "/images/concepcoes-marginais/concepcoes-marginais-hero.webp",
  concepcoesWide: "/images/concepcoes-marginais/concepcoes-marginais-wide.webp",
  evenTrashHero: "/images/even-in-the-trash-grows-flowers/even-trash-hero.webp",
  evenTrashWide: "/images/even-in-the-trash-grows-flowers/even-trash-wide.webp",
  evenTrashYouTube: "/images/even-in-the-trash-grows-flowers/even-trash-youtube.webp",
  fightingOverACapYouTube: "/images/fighting-over-a-cap/fighting-over-a-cap-youtube.webp",
};

const ptBR: EditorialContent = {
  common: {
    openProject: "Abrir projeto",
    synopsis: "Sinopse",
    technical: "Informações",
    fullCredits: "Ficha técnica",
    creditsPending: "Ficha técnica em atualização.",
    gallery: "Registros de cena",
    video: "Teaser",
    media: "Contato",
    sourceNote: "Perfil e créditos públicos",
    previous: "Anterior",
    next: "Próximo",
    updating: "Em atualização",
    galleryPending: "Registros em atualização.",
  },
  collections: {
    espetaculos: {
      eyebrow: "Espetáculos",
      heading: "Obras que nascem do corpo e do território.",
      intro: "No palco, o breaking encontra memória, ancestralidade e imaginação para contar histórias de liberdade, confinamento e outros futuros possíveis.",
      stripLabel: "Espetáculos do Flying Low",
      projectKeys: ["meninoAssumPreto", "kurupyra", "revoada"],
    },
    audiovisual: {
      eyebrow: "Audiovisual",
      heading: "A câmera também entra na roda.",
      intro: "Diante da câmera, o breaking encontra outras distâncias, ritmos e formas de fazer memória.",
      stripLabel: "Projetos audiovisuais",
      projectKeys: ["concepcoesMarginais", "emFormacao", "videodancas"],
    },
    formacao: {
      eyebrow: "Atividades formativas",
      heading: "Aprender em roda. Criar em coletivo.",
      intro: "A roda se abre para compartilhar histórias, fundamentos e ferramentas de criação com diferentes experiências em dança.",
      stripLabel: "Percursos formativos",
      projectKeys: ["oficinas", "residencia"],
    },
    debates: {
      eyebrow: "Debates mediados",
      heading: "A conversa continua depois da cena.",
      intro: "Encontros públicos para atravessar os temas das obras, aproximar artistas e territórios e transformar a escuta em parte do trabalho.",
      stripLabel: "Edições e materiais",
      projectKeys: ["debatePrimeiraEdicao"],
    },
  },
  projects: {
    meninoAssumPreto: {
      title: "Menino Assum Preto",
      eyebrow: "Espetáculo",
      year: "2019",
      summary: "Um manifesto em movimento sobre trabalho, aprisionamento e o direito de sonhar.",
      body: [
        "Inspirado na canção “Assum Preto”, de Luiz Gonzaga e Humberto Teixeira, o espetáculo aproxima o pássaro aprisionado e cegado — que canta sem ver o mundo — do trabalhador urbano submetido à exploração e à invisibilidade. Entre breaking e dança contemporânea, os intérpretes-criadores transformam esse paralelo em uma cena sobre dignidade, liberdade, dor e poesia.",
        "A montagem estreou em 2019 e, desde então, circula por festivais e espaços culturais, afirmando a arte periférica como expressão crítica, sensível e transformadora.",
      ],
      image: "/images/menino-assum-preto/assum-01.webp",
      secondaryImage: "/images/menino-assum-preto/assum-04.webp",
      imageAlt: "Intérpretes de Menino Assum Preto em cena",
      galleryLabel: "Registros de cena",
      gallery: [
        { src: "/images/menino-assum-preto/assum-02.webp", alt: "Elenco de Menino Assum Preto em cena diante do público" },
        { src: "/images/menino-assum-preto/assum-03.webp", alt: "Dois intérpretes de Menino Assum Preto em movimento" },
        { src: "/images/menino-assum-preto/assum-05.webp", alt: "Integrantes do Flying Low reunidos em retrato" },
      ],
      video: {
        youtubeId: "A244vRmQt8I",
        title: "Teaser de Menino Assum Preto",
        linkLabel: "Assistir teaser no YouTube",
        thumbnail: "/images/menino-assum-preto/assum-01.webp",
        thumbnailAlt: "Abrir teaser de Menino Assum Preto no YouTube",
      },
      facts: [
        { label: "Duração", value: "45 min" },
        { label: "Classificação", value: "10 anos" },
        { label: "Espaço", value: "Caixa preta e espaços não convencionais com iluminação" },
      ],
      credits: [
        { role: "Concepção, criação, coreografia e dramaturgia", names: "Eddie Guedes, Gustavo Teles Fagundes, Henrique Yude Furucho, Fioot, Turtle Lee e Ricardo Ura" },
        { role: "Co-Direção e Interpretação", names: "Emersu (Emerson S. Oliveira), Fioot (Jeff dos Santos Rodrigues), Turtle Lee (Lee Anderson), Manuel Victor e Ricardo Ura" },
        { role: "Trilha sonora", names: "Tiago Penalva" },
        { role: "Figurino", names: "Alma Luz Adelia" },
        { role: "Design de luz", names: "Bruna Tovian" },
        { role: "Produção", names: "Laís Machado" },
      ],
      links: [
        { label: "Solicitar rider técnico", href: "mailto:producaoflyinglow@gmail.com?subject=Rider%20-%20Menino%20Assum%20Preto" },
      ],
    },
    kurupyra: {
      title: "As Pegadas do Kurupyra",
      eyebrow: "Espetáculo",
      year: "2022",
      summary: "Uma travessia guiada pelos encantados, onde breaking e improvisação convocam memória e ancestralidade.",
      body: [
        "Inspirado nos encantados da cultura brasileira, As Pegadas do Kurupyra aproxima fundamentos africanos e indígenas, breaking, música e improvisação. A obra nasce da pesquisa continuada do coletivo sobre ancestralidade e imaginação.",
      ],
      image: sharedImages.kurupyraHero,
      imageCredit: "Foto · Sarará Rodrigues",
      secondaryImage: sharedImages.kurupyraSecondary,
      secondaryImageCredit: "Foto · Sarará Rodrigues",
      imageAlt: "Elenco de As Pegadas do Kurupyra em cena",
      galleryCredit: "Fotografia · Sarará Rodrigues",
      gallery: [
        { src: "/images/kurupyra/kurupyra-120.webp", alt: "Intérprete de As Pegadas do Kurupyra em gesto solo", credit: "Foto · Sarará Rodrigues", portrait: true },
        { src: "/images/kurupyra/kurupyra-199.webp", alt: "Elenco de As Pegadas do Kurupyra em roda", credit: "Foto · Sarará Rodrigues" },
        { src: "/images/kurupyra/kurupyra-213.webp", alt: "Elenco de As Pegadas do Kurupyra em cena", credit: "Foto · Sarará Rodrigues" },
        { src: "/images/kurupyra/kurupyra-22.webp", alt: "Retrato do elenco de As Pegadas do Kurupyra", credit: "Foto · Sarará Rodrigues" },
        { src: "/images/kurupyra/kurupyra-221.webp", alt: "Dois intérpretes de As Pegadas do Kurupyra em movimento", credit: "Foto · Sarará Rodrigues" },
        { src: "/images/kurupyra/kurupyra-261.webp", alt: "Três intérpretes de As Pegadas do Kurupyra em cena", credit: "Foto · Sarará Rodrigues" },
        { src: "/images/kurupyra/kurupyra-77.webp", alt: "Intérprete de As Pegadas do Kurupyra em cena", credit: "Foto · Sarará Rodrigues" },
      ],
      video: {
        youtubeId: "TQZI4t759ng",
        title: "Teaser de As Pegadas do Kurupyra",
        linkLabel: "Assistir no YouTube",
        thumbnail: "/images/kurupyra/kurupyra-193.webp",
        thumbnailAlt: "Abrir teaser de As Pegadas do Kurupyra no YouTube",
      },
      facts: [
        { label: "Duração", value: "60 min" },
        { label: "Classificação", value: "Livre" },
        { label: "Linguagens", value: "Breaking, dança contemporânea e improvisação" },
      ],
      credits: [
        { role: "Direção", names: "Emerson Silva Oliveira, Jeff dos Santos Rodrigues, Lee Anderson Rodrigues dos Santos, Manuel Victor dos Santos Pereira e Ricardo de Assis Ura" },
        { role: "Coreografia", names: "Emerson Silva Oliveira, Jeff dos Santos Rodrigues, Lee Anderson Rodrigues dos Santos, Ricardo de Assis Ura, Jorge Luiz dos Santos Vicente e Tiago Estevan Theodoro Penalva" },
        { role: "Elenco", names: "Emerson Silva Oliveira, Jeff dos Santos Rodrigues, Lee Anderson Rodrigues dos Santos, Manuel Victor dos Santos Pereira, Ricardo de Assis Ura e Jorge Luiz dos Santos Vicente" },
        { role: "Fotografia", names: "Sarará Rodrigues" },
      ],
      links: [
        { label: "Solicitar rider técnico", href: "mailto:producaoflyinglow@gmail.com?subject=Rider%20-%20As%20Pegadas%20do%20Kurupyra" },
      ],
    },
    revoada: {
      title: "Revoada",
      eyebrow: "Novo trabalho",
      year: "2026",
      status: "Em atualização",
      summary: "Estreia em 18 de setembro de 2026, no Teatro Galpão do Folias.",
      body: [
        "O novo trabalho do Flying Low estreia em setembro de 2026 no Teatro Galpão do Folias, em São Paulo.",
        "Informações sobre a criação serão publicadas conforme o processo avançar.",
      ],
      image: sharedImages.amber,
      secondaryImage: sharedImages.portrait,
      imageAlt: "Flying Low em processo cênico",
      facts: [
        { label: "Estreia", value: "18 de setembro de 2026" },
        { label: "Horários", value: "19h às sextas e sábados · 18h aos domingos" },
        { label: "Local", value: "Teatro Galpão do Folias · R. Ana Cintra, 213" },
      ],
      links: [],
    },
    concepcoesMarginais: {
      title: "Concepções Marginais",
      eyebrow: "Pesquisa audiovisual",
      year: "2024",
      summary: "Breaking e dramaturgia levam histórias e imagens das periferias a uma pesquisa que ganha forma diante da câmera.",
      synopsisHeading: "A margem como lugar de invenção.",
      body: [
        "Conduzida por Gerson Afrobreak com o Flying Low e artistas residentes, a pesquisa atravessa breaking, dramaturgia e fundamentos históricos do Afrobreak.",
        "Máscaras, identidade, culturas populares e a arquitetura periférica da Grande São Paulo alimentam gestos, textos, cenas e coreografias que encontram sua forma final em videodança.",
      ],
      image: sharedImages.concepcoesHero,
      imageCredit: "Still do filme · Concepções Marginais (2024)",
      secondaryImage: sharedImages.concepcoesWide,
      secondaryImageCredit: "Still do filme · Direção e edição: Gerson Afrobreak",
      imageAlt: "Artista com máscara de papel dança com a perna estendida na calçada",
      galleryLabel: "Stills do filme",
      galleryCredit: "Concepções Marginais (2024) · Direção e edição: Gerson Afrobreak",
      gallery: [
        { src: "/images/concepcoes-marginais/concepcoes-marginais-01.webp", alt: "Artista mascarada em cena em preto e branco" },
        { src: "/images/concepcoes-marginais/concepcoes-marginais-02.webp", alt: "Artista com capuz vermelho se movimenta junto a uma grade" },
        { src: "/images/concepcoes-marginais/concepcoes-marginais-03.webp", alt: "Artista com máscara de papel em composição na calçada" },
        { src: "/images/concepcoes-marginais/concepcoes-marginais-04.webp", alt: "Artista com máscara de papel dança em cena em preto e branco" },
        { src: "/images/concepcoes-marginais/concepcoes-marginais-05.webp", alt: "Artista mascarada dança no asfalto diante de um caminhão amarelo" },
      ],
      video: {
        youtubeId: "cX55NPxLzxs",
        title: "Concepções Marginais",
        linkLabel: "Assistir no YouTube",
      },
      facts: [
        { label: "Formato", value: "Videodança" },
        { label: "Ano", value: "2024" },
        { label: "Pesquisa", value: "Breaking, dramaturgia e Afrobreak" },
      ],
      credits: [
        { role: "Residentes e intérpretes-criadores", names: "Bruno Novais, Dandara Pilar Ferreira, David Silveira, Dillyane França Freitas, Emerson Silva Oliveira, Jeff dos Santos Rodrigues, Laís Machado, Lee Anderson Rodrigues dos Santos, Luna Well, Manuel Victor dos Santos Pereira e Ricardo Aparecido Silva" },
        { role: "Provocadores da residência", names: "Gerson Afrobreak e Willi Verse" },
        { role: "Direção e edição de vídeo", names: "Gerson Afrobreak" },
      ],
      links: [],
    },
    emFormacao: {
      title: "Em Formação",
      eyebrow: "Série documental",
      year: "2021",
      summary: "Em Formação escuta quem constrói o breaking e acompanha as histórias que mantêm essa cultura em movimento.",
      synopsisHeading: "Aprender também é produzir memória.",
      body: [
        "Contemplada pelo Programa VAI em 2018, a primeira temporada percorre histórias do hip hop pela dança breaking: sua origem nos Estados Unidos, sua presença em São Paulo, a atuação das mulheres na cena e a entrada das danças urbanas nos teatros.",
        "A segunda temporada nasce dentro de Na Manha com Flying Low, projeto contemplado pelo edital PROAC nº 31/2021 — Cidadania, Cultura Negra, Urbana e Hip Hop — e amplia essa escuta para novas trajetórias da cena.",
      ],
      image: sharedImages.portrait,
      secondaryImage: sharedImages.collective,
      imageAlt: "Flying Low em cena",
      facts: [
        { label: "Formato", value: "Série documental" },
        { label: "Ano", value: "2021" },
        { label: "Contexto", value: "Na Manha com Flying Low · PROAC 31/2021" },
      ],
      links: [],
      videoWorks: [
        { title: "1ª temporada", year: "2019", href: "https://youtube.com/playlist?list=PLFCLbfPrGy7Wbtit0RQmJhksj-NRihhvP", image: sharedImages.portrait, credits: [{ role: "Episódios", names: "Henrique Bianchini · Mr. Fê · B.girl Thaisinha · B.girl Aline · B.boy Gerson · Douglas Iesus · Márcio Greyk" }, { role: "Produção", names: "Grupo Flying Low" }] },
        { title: "2ª temporada", year: "2023", href: "https://youtube.com/playlist?list=PLFCLbfPrGy7X_yIP8OzFL0918sa-pLZgC", image: sharedImages.collective, credits: [{ role: "Episódios", names: "Manuel Victor · Tati Sanchis · Anelise Mayumi · Gui Nobre · Kika Sousa · Fabgirl" }, { role: "Produção", names: "Grupo Flying Low" }] },
      ],
    },
    videodancas: {
      title: "Videodanças",
      eyebrow: "Audiovisual",
      year: "2021",
      status: "Em atualização",
      summary: "Entre disputa e acolhimento, dois encontros transformam a câmera em espaço de presença, tensão e cuidado.",
      synopsisHeading: "Corpo, câmera e encontro.",
      body: ["Até no lixo crescem flores e Brigando por uma touca partem do encontro entre intérpretes para investigar como os corpos se apoiam, se desafiam e criam relações diante da câmera."],
      image: sharedImages.evenTrashHero,
      imageAlt: "Cena de videodança do Flying Low",
      facts: [{ label: "Formato", value: "Videodanças" }],
      links: [],
      videoWorks: [
        { title: "Até no lixo crescem flores", year: "2021", href: "/audiovisual/mesmo-no-lixo-nascem-flores", projectKey: "evenInTheTrash", image: sharedImages.evenTrashYouTube, credits: [{ role: "Produção", names: "Grupo Flying Low" }, { role: "Intérpretes", names: "Koide Ura e Lee Anderson" }] },
        { title: "Brigando por uma touca", year: "2021", href: "/audiovisual/brigando-por-uma-touca", projectKey: "fightingOverACap", image: sharedImages.fightingOverACapYouTube, credits: [{ role: "Direção", names: "Grupo Flying Low" }, { role: "Intérpretes-criadores", names: "Jeff dos Santos Rodrigues (Fioot) e Gustavo Teles Fagundes" }] },
      ],
    },
    evenInTheTrash: {
      title: "Até no lixo crescem flores",
      eyebrow: "Videodança",
      year: "2021",
      summary: "Em uma situação-limite, o encontro entre duas pessoas transforma a amizade em abrigo e possibilidade de permanência.",
      synopsisHeading: "Mesmo no lixo nascem flores.",
      body: [
        "Uma pessoa se aproxima de um limite sem retorno. O encontro com outra interrompe esse trajeto e abre espaço para permanecer.",
        "Interpretada por Koide Ura e Lee Anderson, a videodança trata a amizade como presença, porto seguro e possibilidade de vida — uma flor que insiste em nascer onde parecia não haver terreno.",
      ],
      image: sharedImages.evenTrashHero,
      imageCredit: "Still do filme · Even in the Trash Grows Flowers (2021)",
      secondaryImage: sharedImages.evenTrashWide,
      secondaryImageCredit: "Still do filme · Produção: Grupo Flying Low",
      imageAlt: "Koide Ura e Lee Anderson dançam juntos em uma quadra aberta",
      galleryLabel: "Stills do filme",
      galleryCredit: "Even in the Trash Grows Flowers (2021) · Grupo Flying Low",
      gallery: [
        { src: "/images/even-in-the-trash-grows-flowers/even-trash-01.webp", alt: "Lee Anderson encara a câmera sob uma estrutura de concreto" },
        { src: "/images/even-in-the-trash-grows-flowers/even-trash-02.webp", alt: "Koide Ura e Lee Anderson se apoiam durante a dança" },
        { src: "/images/even-in-the-trash-grows-flowers/even-trash-03.webp", alt: "Um intérprete se aproxima enquanto o outro está sentado na quadra" },
        { src: "/images/even-in-the-trash-grows-flowers/even-trash-04.webp", alt: "Lee Anderson dança diante da arquibancada grafitada" },
        { src: "/images/even-in-the-trash-grows-flowers/even-trash-05.webp", alt: "Koide Ura projeta o corpo para trás durante um solo" },
      ],
      video: {
        youtubeId: "HlWvODEryF4",
        title: "Even in the Trash Grows Flowers",
        linkLabel: "Assistir no YouTube",
        thumbnail: sharedImages.evenTrashYouTube,
      },
      facts: [
        { label: "Formato", value: "Videodança" },
        { label: "Ano", value: "2021" },
        { label: "Duração", value: "4 min 28 s" },
      ],
      credits: [
        { role: "Produção", names: "Grupo Flying Low" },
        { role: "Intérpretes", names: "Koide Ura e Lee Anderson" },
        { role: "Composição musical", names: "Tiago Penalva e Rafaela Maciel" },
      ],
      links: [],
    },
    fightingOverACap: {
      title: "Brigando por uma touca",
      eyebrow: "Videodança",
      year: "2021",
      status: "Em atualização",
      summary: "Um jogo a dois em que o corpo transforma a disputa em dança.",
      synopsisHeading: "Entre o jogo e a disputa.",
      body: ["Jeff dos Santos Rodrigues (Fioot) e Gustavo Teles Fagundes são os intérpretes-criadores desta videodança construída a partir do encontro e da disputa entre dois corpos."],
      image: sharedImages.fightingOverACapYouTube,
      imageCredit: "Imagem do vídeo · Grupo Flying Low",
      imageAlt: "Imagem de Brigando por uma touca",
      video: {
        youtubeId: "6m865ISf3to",
        title: "Brigando por uma touca",
        linkLabel: "Assistir no YouTube",
        thumbnail: sharedImages.fightingOverACapYouTube,
      },
      facts: [
        { label: "Formato", value: "Videodança" },
        { label: "Ano", value: "2021" },
      ],
      credits: [
        { role: "Direção", names: "Grupo Flying Low" },
        { role: "Intérpretes-criadores", names: "Jeff dos Santos Rodrigues (Fioot) e Gustavo Teles Fagundes" },
      ],
      links: [],
    },
    cantigas: {
      title: "Cantigas do Meu Matulão",
      eyebrow: "Videodança",
      year: "2020",
      summary: "Videodança contemplada pelo Prêmio Aldir Blanc e criada como desdobramento da pesquisa cênica do grupo.",
      synopsisHeading: "Corpo, câmera e memória em deslocamento.",
      body: [
        "Cantigas do Meu Matulão leva a dança para o enquadramento da câmera, buscando outras proximidades entre gesto, espaço e montagem.",
        "Vídeo, ficha completa e registros de processo estão em atualização.",
      ],
      image: sharedImages.blue,
      secondaryImage: sharedImages.assum,
      imageAlt: "Cena azul de trabalho do Flying Low",
      status: "Em atualização",
      facts: [
        { label: "Formato", value: "Videodança" },
        { label: "Ano", value: "2020" },
        { label: "Reconhecimento", value: "Prêmio Aldir Blanc" },
      ],
      links: [
        { label: "Solicitar acesso", href: "mailto:producaoflyinglow@gmail.com?subject=Cantigas%20do%20Meu%20Matulao" },
      ],
    },
    oficinas: {
      title: "Oficinas",
      eyebrow: "Atividade formativa",
      year: "Percursos adaptáveis",
      summary: "Da primeira roda à criação autoral, as oficinas compartilham história, musicalidade e fundamentos do breaking.",
      synopsisHeading: "Do fundamento à autoria.",
      body: [
        "As oficinas partem da história, da cultura, da musicalidade e dos fundamentos do breaking. Com quem começa, constroem as primeiras bases; com quem já dança, aprofundam repertório, improvisação e pesquisa de movimento; com profissionais, compartilham ferramentas de criação presentes nas obras do Flying Low.",
        "Cada percurso se adapta ao grupo, ao tempo disponível e ao espaço. As oficinas já passaram por ambientes de formação e criação como a ETEC de Artes, a Companhia de Danças de Diadema e a Oficina Cultural Oswald de Andrade.",
      ],
      image: sharedImages.amber,
      secondaryImage: sharedImages.collective,
      imageAlt: "Flying Low em prática de dança",
      facts: [
        { label: "Iniciante", value: "Fundamentos, contexto e musicalidade" },
        { label: "Já dançantes", value: "Treinamento, improvisação e autoria" },
        { label: "Profissionais", value: "Pesquisa de linguagem e criação cênica" },
      ],
      links: [
        { label: "Solicitar proposta", href: "mailto:producaoflyinglow@gmail.com?subject=Proposta%20de%20oficina" },
      ],
    },
    residencia: {
      title: "Residência",
      eyebrow: "Atividade formativa",
      year: "Processo intensivo",
      summary: "Um processo intensivo para transformar perguntas, experiências e movimento em criação coletiva.",
      synopsisHeading: "Do treinamento ao surgimento de uma obra.",
      body: [
        "A residência parte das perguntas e experiências trazidas por cada grupo. Jogos de composição, escrita de corpo, improvisação e dramaturgia organizam um processo coletivo de investigação.",
        "Conforme a duração e o contexto, o percurso pode se abrir ao público ou culminar em uma apresentação. A residência também pode servir de laboratório para pesquisas ligadas a Concepções Marginais e Revoada.",
      ],
      image: sharedImages.portrait,
      secondaryImage: sharedImages.blue,
      imageAlt: "Retrato do grupo Flying Low em processo",
      facts: [
        { label: "Foco", value: "Procedimentos de criação" },
        { label: "Formato", value: "Intensivo adaptável" },
        { label: "Desdobramento", value: "Abertura de processo ou apresentação" },
      ],
      links: [
        { label: "Conversar sobre uma residência", href: "mailto:producaoflyinglow@gmail.com?subject=Residencia%20Flying%20Low" },
      ],
    },
    debatePrimeiraEdicao: {
      title: "Fora da Gaiola",
      eyebrow: "Debate mediado · Primeira edição",
      year: "29 de maio · 19h30",
      presentation: "poster",
      summary: "Uma conversa pública sobre dramaturgia marginal e suas relações com a dança contemporânea.",
      synopsisHeading: "O que a dança contemporânea tem a ver com isso?",
      body: [
        "Fora da Gaiola reúne Márcio Greyk, Dillyane França, Maria Emilia e Manuel Victor para atravessar experiências de criação, margem e presença na dança.",
        "A primeira edição acontece no Instituto Brasileiro de Teatro, na Bela Vista, e faz da conversa uma extensão pública das pesquisas do Grupo Flying Low.",
      ],
      image: "/images/debates/fora-da-gaiola-capa.webp",
      imageCredit: "Flyer · Fora da Gaiola",
      imageAlt: "Flyer vermelho de Fora da Gaiola com quatro cadeiras brancas",
      galleryLabel: "Flyers da primeira edição",
      gallery: [
        {
          src: "/images/debates/fora-da-gaiola-capa.webp",
          alt: "Flyer de Fora da Gaiola com data, horário, local e participantes",
          poster: true,
        },
        {
          src: "/images/debates/fora-da-gaiola-convidados.webp",
          alt: "Flyer de Fora da Gaiola com retratos de Márcio Greyk, Dillyane França, Maria Emilia e Manuel Victor",
          poster: true,
        },
      ],
      facts: [
        { label: "Data e horário", value: "29 de maio · 19h30" },
        { label: "Local", value: "IBT · Instituto Brasileiro de Teatro" },
        { label: "Endereço", value: "Av. Brigadeiro Luís Antônio, 277 · Bela Vista" },
      ],
      credits: [
        { role: "Participantes", names: "Márcio Greyk, Dillyane França, Maria Emilia e Manuel Victor" },
        { role: "Realização", names: "Grupo Flying Low" },
        { role: "Fomento", names: "38ª Edição do Programa Municipal de Fomento à Dança para a cidade de São Paulo" },
      ],
      links: [],
    },
  },
  group: {
    membersEyebrow: "Quem são",
    membersHeading: "Cinco artistas, uma criação compartilhada.",
    membersIntro: "Formado em 2018 a partir de Menino Assum Preto, o Flying Low reúne Lee Anderson (Turtle Lee), Jeff dos Santos Rodrigues (Fioot), Manuel Victor, Emerson Silva (Emersu) e Ricardo Ura (Koide). Desde então, o grupo cruza cena, audiovisual e formação em obras, séries, oficinas e circulações que levam o breaking a diferentes públicos e territórios.",
    membersVisible: false,
    members: [
      {
        name: "Turtle Lee",
        role: "Interpretação · codireção · criação coreográfica",
        bio: "Artista integrante do Flying Low. Nos trabalhos do grupo, atua em interpretação, codireção e criação coreográfica, articulando o breaking à construção cênica coletiva.",
        portraitClass: "member-portrait-1",
        links: [
          { label: "@grupo_flyinglow", href: "https://www.instagram.com/grupo_flyinglow/" },
          { label: "Créditos públicos", href: "https://abcdanca.com.br/wp-content/uploads/2025/07/Programa-ABCDanca-Transpetro-2025.pdf" },
        ],
      },
      {
        name: "Fioot",
        role: "Criação · codireção · formação em breaking",
        bio: "Artista integrante do Flying Low. Atua em criação, codireção e interpretação, além de conduzir práticas formativas de breaking ligadas a movimento, improvisação, musicalidade e autoria.",
        portraitClass: "member-portrait-2",
        links: [
          { label: "@grupo_flyinglow", href: "https://www.instagram.com/grupo_flyinglow/" },
          { label: "Voando com Flying Low", href: "https://www.sescsp.org.br/wp-content/uploads/2024/03/Guia-de-Programacao_Agosto_SJC.pdf" },
        ],
      },
      {
        name: "Manuel Victor",
        role: "Dança · performance · palavra · formação",
        bio: "Artista da dança, da performance e da palavra. Pesquisa estéticas marginais e atua também na formação em breaking, atravessando criação, dramaturgia e educação.",
        portraitClass: "member-portrait-3",
        links: [
          { label: "@grupo_flyinglow", href: "https://www.instagram.com/grupo_flyinglow/" },
          { label: "Perfil de pesquisa", href: "https://proceedings.science/p/203064?lang=pt-br" },
        ],
      },
      {
        name: "Emersu",
        role: "Dança · atuação · arte-educação",
        bio: "Artista da dança, ator e arte-educador. Pesquisa o breaking em diálogo com hip-hop, ancestralidade e pedagogia crítica, conectando prática corporal e território.",
        portraitClass: "member-portrait-4",
        links: [
          { label: "@grupo_flyinglow", href: "https://www.instagram.com/grupo_flyinglow/" },
          { label: "@sinergiamarginal", href: "https://www.instagram.com/sinergiamarginal/" },
        ],
      },
      {
        name: "Ricardo Ura",
        role: "Interpretação · dramaturgia · direção · design",
        bio: "Intérprete-criador e artista visual. No Flying Low, desenvolve trabalhos de direção, criação coreográfica, dramaturgia e design, aproximando cena e imagem.",
        portraitClass: "member-portrait-5",
        links: [
          { label: "@grupo_flyinglow", href: "https://www.instagram.com/grupo_flyinglow/" },
          { label: "Créditos públicos", href: "https://www.sjc.sp.gov.br/noticias/2024/abril/10/cet-recebe-espetaculo-de-danca-menino-assum-preto/" },
        ],
      },
    ],
    researchEyebrow: "Pesquisa",
    researchHeading: "O que move a pesquisa.",
    researchBody: [
      "A pesquisa do Flying Low parte do breaking como linguagem cênica, política e poética. Pela direção compartilhada e pelo encontro entre danças urbanas e contemporâneas, o coletivo cria dramaturgias corporais ligadas a experiências periféricas e coletivas.",
      "Nas obras, o grupo investiga aprisionamento, ancestralidade, precarização do trabalho e outros futuros possíveis. Menino Assum Preto aproxima o corpo engaiolado do trabalhador marginalizado; As Pegadas do Kurupyra encontra nos encantados caminhos para fabular memória e ancestralidade.",
      "A pesquisa também se desdobra na formação e no audiovisual, com Voando com Flying Low e a série Em Formação. Em cada linguagem, o encontro permanece como modo de criar, aprender e imaginar.",
    ],
    researchAxes: ["Breaking e autoria", "Memória periférica", "Criação coletiva", "Cena e audiovisual"],
  },
  history: {
    eyebrow: "Histórico",
    heading: "Uma linha feita de encontros, obras e deslocamentos.",
    intro: "Uma seleção de marcos da trajetória do Flying Low. Programas, registros e matérias de imprensa ajudam a contar uma história que continua em movimento.",
    clippingLabel: "Arquivo de imprensa",
    clippingStatus: "Em atualização",
    events: [
      { year: "2018", title: "Menino Assum Preto", description: "O projeto é contemplado pelo Programa VAI e consolida uma pesquisa autoral entre breaking, experiência periférica e criação cênica." },
      { year: "2019", title: "Primeiras apresentações", description: "Menino Assum Preto circula por espaços culturais de São Paulo e amplia o encontro do grupo com novos públicos." },
      { year: "2020", title: "Cantigas do Meu Matulão", description: "A pesquisa se desdobra em videodança com apoio do Prêmio Aldir Blanc." },
      { year: "2021", title: "Na Manha com Flying Low", description: "O projeto de ações pedagógicas apoiado pelo PROAC 31/2021 gera práticas formativas e a série documental Em Formação." },
      { year: "2022", title: "As Pegadas do Kurupyra", description: "O grupo apresenta uma nova obra inspirada nos encantados brasileiros, cruzando breaking, improvisação e dança contemporânea." },
      { year: "2024", title: "Circulação e formação", description: "Temporadas de Menino Assum Preto se conectam a oficinas, conversas com o público e compartilhamentos de processo." },
      { year: "2025", title: "Novos rastros", description: "As Pegadas do Kurupyra segue em circulação enquanto o grupo organiza novas frentes de pesquisa, criação e arquivo." },
    ],
  },
  agenda: {
    eyebrow: "Agenda",
    heading: "Próximos encontros.",
    intro: "Apresentações confirmadas para setembro e outubro de 2026. Horários e locais ainda em definição serão atualizados aqui.",
    when: "Quando · 2026",
    where: "Onde",
    events: [
      {
        title: "Revoada",
        note: "Nome final a confirmar",
        dates: [
          { day: "18—19", weekday: "sexta e sábado", month: "setembro", time: "19h", label: "estreia dia 18" },
          { day: "20", weekday: "domingo", month: "setembro", time: "18h" },
          { day: "25—26", weekday: "sexta e sábado", month: "setembro", time: "19h" },
          { day: "27", weekday: "domingo", month: "setembro", time: "18h" },
        ],
        venue: "Teatro Galpão do Folias",
        address: "Rua Ana Cintra, 213 · Santa Cecília · São Paulo, SP",
      },
      {
        title: "Revoada",
        note: "Nome final a confirmar",
        dates: [{ day: "01—04", weekday: "quinta a domingo", month: "outubro", time: "Horário a confirmar" }],
        venue: "Local a confirmar",
        address: "Endereço a confirmar",
      },
      {
        title: "Menino Assum Preto",
        dates: [{ day: "15—18", weekday: "quinta a domingo", month: "outubro", time: "Horário a confirmar" }],
        venue: "Teatro Galpão do Folias",
        address: "Rua Ana Cintra, 213 · Santa Cecília · São Paulo, SP",
      },
    ],
  },
};

const en: EditorialContent = {
  common: {
    openProject: "Open project",
    synopsis: "Synopsis",
    technical: "Details",
    fullCredits: "Technical credits",
    creditsPending: "Full credits are being updated.",
    gallery: "Stage records",
    video: "Teaser",
    media: "Contact",
    sourceNote: "Public profile and credits",
    previous: "Previous",
    next: "Next",
    updating: "Being updated",
    galleryPending: "Visual records are being updated.",
  },
  collections: {
    espetaculos: {
      eyebrow: "Performances",
      heading: "Works born from body and territory.",
      intro: "On stage, breaking meets memory, ancestry, and imagination to tell stories of freedom, confinement, and other possible futures.",
      stripLabel: "Flying Low performances",
      projectKeys: ["meninoAssumPreto", "kurupyra", "revoada"],
    },
    audiovisual: {
      eyebrow: "Screen work",
      heading: "The camera joins the circle.",
      intro: "In front of the camera, breaking finds new distances, rhythms, and ways of making memory.",
      stripLabel: "Screen projects",
      projectKeys: ["concepcoesMarginais", "emFormacao", "videodancas"],
    },
    formacao: {
      eyebrow: "Learning activities",
      heading: "Learn in a circle. Create collectively.",
      intro: "The circle opens to share histories, foundations, and creative tools across different levels of dance experience.",
      stripLabel: "Learning pathways",
      projectKeys: ["oficinas", "residencia"],
    },
    debates: {
      eyebrow: "Moderated conversations",
      heading: "The conversation continues after the stage.",
      intro: "Public encounters exploring the themes of the works, bringing artists and territories closer, and making listening part of the practice.",
      stripLabel: "Editions and materials",
      projectKeys: ["debatePrimeiraEdicao"],
    },
  },
  projects: {
    meninoAssumPreto: {
      title: "Menino Assum Preto",
      eyebrow: "Performance",
      year: "2019",
      summary: "A manifesto in motion about labour, confinement, and the right to dream.",
      body: [
        "Inspired by “Assum Preto,” by Luiz Gonzaga and Humberto Teixeira, the work connects the captive, blinded bird — singing without seeing the world — to the urban worker subjected to exploitation and invisibility. Through breaking and contemporary dance, the performer-creators turn that parallel into a work about dignity, freedom, pain, and poetry.",
        "Since premiering in 2019, the work has toured festivals and cultural spaces, affirming art from the peripheries as a critical, sensitive, and transformative form of expression.",
      ],
      image: "/images/menino-assum-preto/assum-01.webp",
      secondaryImage: "/images/menino-assum-preto/assum-04.webp",
      imageAlt: "Performers from Menino Assum Preto on stage",
      galleryLabel: "Stage records",
      gallery: [
        { src: "/images/menino-assum-preto/assum-02.webp", alt: "Cast of Menino Assum Preto performing before an audience" },
        { src: "/images/menino-assum-preto/assum-03.webp", alt: "Two Menino Assum Preto performers in motion" },
        { src: "/images/menino-assum-preto/assum-05.webp", alt: "Flying Low members gathered for a portrait" },
      ],
      video: { youtubeId: "A244vRmQt8I", title: "Menino Assum Preto teaser", linkLabel: "Watch teaser on YouTube", thumbnail: "/images/menino-assum-preto/assum-01.webp", thumbnailAlt: "Open the Menino Assum Preto teaser on YouTube" },
      facts: [
        { label: "Running time", value: "45 min" },
        { label: "Age rating", value: "Ages 10+" },
        { label: "Space", value: "Black box and unconventional spaces with lighting" },
      ],
      credits: [
        { role: "Concept, creation, choreography, and dramaturgy", names: "Eddie Guedes, Gustavo Teles Fagundes, Henrique Yude Furucho, Fioot, Turtle Lee, and Ricardo Ura" },
        { role: "Co-direction and performance", names: "Emersu (Emerson S. Oliveira), Fioot (Jeff dos Santos Rodrigues), Turtle Lee (Lee Anderson), Manuel Victor, and Ricardo Ura" },
        { role: "Original score", names: "Tiago Penalva" },
        { role: "Costume design", names: "Alma Luz Adelia" },
        { role: "Lighting design", names: "Bruna Tovian" },
        { role: "Production", names: "Laís Machado" },
      ],
      links: [
        { label: "Request technical rider", href: "mailto:producaoflyinglow@gmail.com?subject=Rider%20-%20Menino%20Assum%20Preto" },
      ],
    },
    kurupyra: {
      title: "As Pegadas do Kurupyra",
      eyebrow: "Performance",
      year: "2022",
      summary: "A journey guided by enchanted beings, where breaking and improvisation call up memory and ancestry.",
      body: [
        "Inspired by the enchanted beings of Brazilian culture, As Pegadas do Kurupyra brings African and Indigenous foundations into dialogue with breaking, music, and improvisation. The work grows from the collective’s ongoing research into ancestry and imagination.",
      ],
      image: sharedImages.kurupyraHero,
      imageCredit: "Photo · Sarará Rodrigues",
      secondaryImage: sharedImages.kurupyraSecondary,
      secondaryImageCredit: "Photo · Sarará Rodrigues",
      imageAlt: "Cast of As Pegadas do Kurupyra performing",
      galleryCredit: "Photography · Sarará Rodrigues",
      gallery: [
        { src: "/images/kurupyra/kurupyra-120.webp", alt: "As Pegadas do Kurupyra performer in a solo gesture", credit: "Photo · Sarará Rodrigues", portrait: true },
        { src: "/images/kurupyra/kurupyra-199.webp", alt: "Cast of As Pegadas do Kurupyra forming a circle", credit: "Photo · Sarará Rodrigues" },
        { src: "/images/kurupyra/kurupyra-213.webp", alt: "Cast of As Pegadas do Kurupyra performing", credit: "Photo · Sarará Rodrigues" },
        { src: "/images/kurupyra/kurupyra-22.webp", alt: "Cast portrait for As Pegadas do Kurupyra", credit: "Photo · Sarará Rodrigues" },
        { src: "/images/kurupyra/kurupyra-221.webp", alt: "Two As Pegadas do Kurupyra performers in motion", credit: "Photo · Sarará Rodrigues" },
        { src: "/images/kurupyra/kurupyra-261.webp", alt: "Three As Pegadas do Kurupyra performers on stage", credit: "Photo · Sarará Rodrigues" },
        { src: "/images/kurupyra/kurupyra-77.webp", alt: "As Pegadas do Kurupyra performer on stage", credit: "Photo · Sarará Rodrigues" },
      ],
      video: {
        youtubeId: "TQZI4t759ng",
        title: "As Pegadas do Kurupyra teaser",
        linkLabel: "Watch on YouTube",
        thumbnail: "/images/kurupyra/kurupyra-193.webp",
        thumbnailAlt: "Open the As Pegadas do Kurupyra teaser on YouTube",
      },
      facts: [
        { label: "Running time", value: "60 min" },
        { label: "Age rating", value: "All ages" },
        { label: "Languages", value: "Breaking, contemporary dance, and improvisation" },
      ],
      credits: [
        { role: "Direction", names: "Emerson Silva Oliveira, Jeff dos Santos Rodrigues, Lee Anderson Rodrigues dos Santos, Manuel Victor dos Santos Pereira, and Ricardo de Assis Ura" },
        { role: "Choreography", names: "Emerson Silva Oliveira, Jeff dos Santos Rodrigues, Lee Anderson Rodrigues dos Santos, Ricardo de Assis Ura, Jorge Luiz dos Santos Vicente, and Tiago Estevan Theodoro Penalva" },
        { role: "Cast", names: "Emerson Silva Oliveira, Jeff dos Santos Rodrigues, Lee Anderson Rodrigues dos Santos, Manuel Victor dos Santos Pereira, Ricardo de Assis Ura, and Jorge Luiz dos Santos Vicente" },
        { role: "Photography", names: "Sarará Rodrigues" },
      ],
      links: [
        { label: "Request technical rider", href: "mailto:producaoflyinglow@gmail.com?subject=Rider%20-%20As%20Pegadas%20do%20Kurupyra" },
      ],
    },
    revoada: {
      title: "Revoada",
      eyebrow: "New work",
      year: "2026",
      status: "Being updated",
      summary: "Premieres on 18 September 2026 at Teatro Galpão do Folias.",
      body: [
        "Flying Low’s new work premieres in September 2026 at Teatro Galpão do Folias in São Paulo.",
        "More about the creation will be published as the process unfolds.",
      ],
      image: sharedImages.amber,
      secondaryImage: sharedImages.portrait,
      imageAlt: "Flying Low in a stage process",
      facts: [
        { label: "Premiere", value: "18 September 2026" },
        { label: "Times", value: "7 pm on Fridays and Saturdays · 6 pm on Sundays" },
        { label: "Venue", value: "Teatro Galpão do Folias · R. Ana Cintra, 213" },
      ],
      links: [],
    },
    concepcoesMarginais: {
      title: "Concepções Marginais",
      eyebrow: "Screen research",
      year: "2024",
      summary: "Breaking and dramaturgy bring stories and images from the peripheries into a research process shaped for the camera.",
      synopsisHeading: "The margin as a place of invention.",
      body: [
        "Led by Gerson Afrobreak with Flying Low and resident artists, the research moves through breaking, dramaturgy, and the historical foundations of Afrobreak.",
        "Masks, identity, popular cultures, and the peripheral architecture of Greater São Paulo feed gestures, texts, scenes, and choreographies that find their final form in a dance film.",
      ],
      image: sharedImages.concepcoesHero,
      imageCredit: "Film still · Concepções Marginais (2024)",
      secondaryImage: sharedImages.concepcoesWide,
      secondaryImageCredit: "Film still · Direction and editing: Gerson Afrobreak",
      imageAlt: "Performer in a paper mask dances with one leg extended on the pavement",
      galleryLabel: "Film stills",
      galleryCredit: "Concepções Marginais (2024) · Direction and editing: Gerson Afrobreak",
      gallery: [
        { src: "/images/concepcoes-marginais/concepcoes-marginais-01.webp", alt: "Masked performer in a black-and-white scene" },
        { src: "/images/concepcoes-marginais/concepcoes-marginais-02.webp", alt: "Performer in a red hood moving beside a metal grid" },
        { src: "/images/concepcoes-marginais/concepcoes-marginais-03.webp", alt: "Performer in a paper mask posing on the pavement" },
        { src: "/images/concepcoes-marginais/concepcoes-marginais-04.webp", alt: "Performer in a paper mask dancing in a black-and-white scene" },
        { src: "/images/concepcoes-marginais/concepcoes-marginais-05.webp", alt: "Masked performer dancing on the street in front of a yellow truck" },
      ],
      video: {
        youtubeId: "cX55NPxLzxs",
        title: "Concepções Marginais",
        linkLabel: "Watch on YouTube",
      },
      facts: [
        { label: "Format", value: "Dance film" },
        { label: "Year", value: "2024" },
        { label: "Research", value: "Breaking, dramaturgy, and Afrobreak" },
      ],
      credits: [
        { role: "Resident artists and performer-creators", names: "Bruno Novais, Dandara Pilar Ferreira, David Silveira, Dillyane França Freitas, Emerson Silva Oliveira, Jeff dos Santos Rodrigues, Laís Machado, Lee Anderson Rodrigues dos Santos, Luna Well, Manuel Victor dos Santos Pereira, and Ricardo Aparecido Silva" },
        { role: "Residence provocateurs", names: "Gerson Afrobreak and Willi Verse" },
        { role: "Direction and video editing", names: "Gerson Afrobreak" },
      ],
      links: [],
    },
    emFormacao: {
      title: "Em Formação",
      eyebrow: "Documentary series",
      year: "2021",
      summary: "Em Formação listens to the people shaping breaking and follows the stories that keep its culture in motion.",
      synopsisHeading: "Learning also produces memory.",
      body: [
        "Supported by the VAI Programme in 2018, the first season traces hip-hop histories through breaking: its origins in the United States, its presence in São Paulo, women’s work in the scene, and the arrival of urban dance in theatres.",
        "The second season grew from Na Manha com Flying Low, supported by PROAC 31/2021 — Citizenship, Black, Urban, and Hip Hop Culture — and extends that listening to new trajectories within the scene.",
      ],
      image: sharedImages.portrait,
      secondaryImage: sharedImages.collective,
      imageAlt: "Flying Low performing",
      facts: [
        { label: "Format", value: "Documentary series" },
        { label: "Year", value: "2021" },
        { label: "Context", value: "Na Manha com Flying Low · PROAC 31/2021" },
      ],
      links: [],
      videoWorks: [
        { title: "Season 1", year: "2019", href: "https://youtube.com/playlist?list=PLFCLbfPrGy7Wbtit0RQmJhksj-NRihhvP", image: sharedImages.portrait, credits: [{ role: "Episodes", names: "Henrique Bianchini · Mr. Fê · B.girl Thaisinha · B.girl Aline · B.boy Gerson · Douglas Iesus · Márcio Greyk" }, { role: "Production", names: "Grupo Flying Low" }] },
        { title: "Season 2", year: "2023", href: "https://youtube.com/playlist?list=PLFCLbfPrGy7X_yIP8OzFL0918sa-pLZgC", image: sharedImages.collective, credits: [{ role: "Episodes", names: "Manuel Victor · Tati Sanchis · Anelise Mayumi · Gui Nobre · Kika Sousa · Fabgirl" }, { role: "Production", names: "Grupo Flying Low" }] },
      ],
    },
    videodancas: {
      title: "Dance films",
      eyebrow: "Screen work",
      year: "2021",
      status: "Being updated",
      summary: "Between conflict and care, two encounters turn the camera into a space for presence, tension, and support.",
      synopsisHeading: "Body, camera, and encounter.",
      body: ["Even in the Trash Grows Flowers and Fighting Over a Cap begin with encounters between performers, exploring how bodies support, challenge, and relate to one another on camera."],
      image: sharedImages.evenTrashHero,
      imageAlt: "A scene from a Flying Low dance film",
      facts: [{ label: "Format", value: "Dance films" }],
      links: [],
      videoWorks: [
        { title: "Even in the Trash Grows Flowers", year: "2021", href: "/en/screen/even-in-the-trash-grows-flowers", projectKey: "evenInTheTrash", image: sharedImages.evenTrashYouTube, credits: [{ role: "Production", names: "Grupo Flying Low" }, { role: "Performers", names: "Koide Ura and Lee Anderson" }] },
        { title: "Fighting Over a Cap", year: "2021", href: "/en/screen/fighting-over-a-cap", projectKey: "fightingOverACap", image: sharedImages.fightingOverACapYouTube, credits: [{ role: "Direction", names: "Grupo Flying Low" }, { role: "Performer-creators", names: "Jeff dos Santos Rodrigues (Fioot) and Gustavo Teles Fagundes" }] },
      ],
    },
    evenInTheTrash: {
      title: "Even in the Trash Grows Flowers",
      eyebrow: "Dance film",
      year: "2021",
      summary: "At a moment of crisis, the meeting of two people turns friendship into shelter and a reason to remain.",
      synopsisHeading: "Flowers can grow even in the trash.",
      body: [
        "One person approaches a point of no return. Meeting another interrupts that path and opens up the possibility of staying.",
        "Performed by Koide Ura and Lee Anderson, the dance film treats friendship as presence, safe harbour, and the possibility of life — a flower insisting on growing where there seemed to be no ground.",
      ],
      image: sharedImages.evenTrashHero,
      imageCredit: "Film still · Even in the Trash Grows Flowers (2021)",
      secondaryImage: sharedImages.evenTrashWide,
      secondaryImageCredit: "Film still · Produced by Grupo Flying Low",
      imageAlt: "Koide Ura and Lee Anderson dance together on an outdoor court",
      galleryLabel: "Film stills",
      galleryCredit: "Even in the Trash Grows Flowers (2021) · Grupo Flying Low",
      gallery: [
        { src: "/images/even-in-the-trash-grows-flowers/even-trash-01.webp", alt: "Lee Anderson faces the camera beneath a concrete structure" },
        { src: "/images/even-in-the-trash-grows-flowers/even-trash-02.webp", alt: "Koide Ura and Lee Anderson support one another during the dance" },
        { src: "/images/even-in-the-trash-grows-flowers/even-trash-03.webp", alt: "One performer approaches while the other sits on the court" },
        { src: "/images/even-in-the-trash-grows-flowers/even-trash-04.webp", alt: "Lee Anderson dances before the graffiti-covered stands" },
        { src: "/images/even-in-the-trash-grows-flowers/even-trash-05.webp", alt: "Koide Ura leans backwards during a solo" },
      ],
      video: {
        youtubeId: "HlWvODEryF4",
        title: "Even in the Trash Grows Flowers",
        linkLabel: "Watch on YouTube",
        thumbnail: sharedImages.evenTrashYouTube,
      },
      facts: [
        { label: "Format", value: "Dance film" },
        { label: "Year", value: "2021" },
        { label: "Running time", value: "4 min 28 sec" },
      ],
      credits: [
        { role: "Production", names: "Grupo Flying Low" },
        { role: "Performers", names: "Koide Ura and Lee Anderson" },
        { role: "Music composition", names: "Tiago Penalva and Rafaela Maciel" },
      ],
      links: [],
    },
    fightingOverACap: {
      title: "Fighting Over a Cap",
      eyebrow: "Dance film",
      year: "2021",
      status: "Being updated",
      summary: "A duet in which the body turns conflict into dance.",
      synopsisHeading: "Between play and conflict.",
      body: ["Jeff dos Santos Rodrigues (Fioot) and Gustavo Teles Fagundes are the performer-creators of this dance film, built from an encounter and a contest between two bodies."],
      image: sharedImages.fightingOverACapYouTube,
      imageCredit: "Image from the video · Grupo Flying Low",
      imageAlt: "Image from Fighting Over a Cap",
      video: {
        youtubeId: "6m865ISf3to",
        title: "Fighting Over a Cap",
        linkLabel: "Watch on YouTube",
        thumbnail: sharedImages.fightingOverACapYouTube,
      },
      facts: [
        { label: "Format", value: "Dance film" },
        { label: "Year", value: "2021" },
      ],
      credits: [
        { role: "Direction", names: "Grupo Flying Low" },
        { role: "Performer-creators", names: "Jeff dos Santos Rodrigues (Fioot) and Gustavo Teles Fagundes" },
      ],
      links: [],
    },
    cantigas: {
      title: "Cantigas do Meu Matulão",
      eyebrow: "Dance film",
      year: "2020",
      summary: "A dance film supported by the Aldir Blanc Award and created as an extension of the collective’s stage research.",
      synopsisHeading: "Body, camera, and memory in motion.",
      body: [
        "Cantigas do Meu Matulão carries dance into the camera frame, seeking other proximities between gesture, space, and editing.",
        "The film, full credits, and process records are being updated.",
      ],
      image: sharedImages.blue,
      secondaryImage: sharedImages.assum,
      imageAlt: "Blue-lit scene from Flying Low",
      status: "Being updated",
      facts: [
        { label: "Format", value: "Dance film" },
        { label: "Year", value: "2020" },
        { label: "Recognition", value: "Aldir Blanc Award" },
      ],
      links: [
        { label: "Request access", href: "mailto:producaoflyinglow@gmail.com?subject=Cantigas%20do%20Meu%20Matulao" },
      ],
    },
    oficinas: {
      title: "Workshops",
      eyebrow: "Learning activity",
      year: "Adaptable pathways",
      summary: "From the first circle to original creation, the workshops share breaking’s history, musicality, and foundations.",
      synopsisHeading: "From foundations to authorship.",
      body: [
        "The workshops begin with breaking’s history, culture, musicality, and foundations. With beginners, they build the first bases; with experienced dancers, they deepen repertoire, improvisation, and movement research; with professionals, they share creative tools used in Flying Low’s works.",
        "Each pathway adapts to the group, available time, and space. The workshops have taken place in learning and creative settings including ETEC de Artes, Companhia de Danças de Diadema, and Oficina Cultural Oswald de Andrade.",
      ],
      image: sharedImages.amber,
      secondaryImage: sharedImages.collective,
      imageAlt: "Flying Low in dance practice",
      facts: [
        { label: "Beginners", value: "Foundations, context, and musicality" },
        { label: "Experienced dancers", value: "Training, improvisation, and authorship" },
        { label: "Professionals", value: "Language research and stage creation" },
      ],
      links: [
        { label: "Request a proposal", href: "mailto:producaoflyinglow@gmail.com?subject=Proposta%20de%20oficina" },
      ],
    },
    residencia: {
      title: "Residency",
      eyebrow: "Learning activity",
      year: "Intensive process",
      summary: "An intensive process that turns questions, experience, and movement into collective creation.",
      synopsisHeading: "From training to the emergence of a work.",
      body: [
        "The residency begins with the questions and experiences brought by each group. Composition games, body writing, improvisation, and dramaturgy organise a collective process of inquiry.",
        "Depending on its duration and context, the process may open to the public or culminate in a presentation. The residency can also serve as a laboratory for research connected to Concepções Marginais and Revoada.",
      ],
      image: sharedImages.portrait,
      secondaryImage: sharedImages.blue,
      imageAlt: "Portrait of Flying Low in process",
      facts: [
        { label: "Focus", value: "Creative procedures" },
        { label: "Format", value: "Adaptable intensive" },
        { label: "Outcome", value: "Process sharing or public presentation" },
      ],
      links: [
        { label: "Discuss a residency", href: "mailto:producaoflyinglow@gmail.com?subject=Residencia%20Flying%20Low" },
      ],
    },
    debatePrimeiraEdicao: {
      title: "Fora da Gaiola",
      eyebrow: "Moderated conversation · First edition",
      year: "29 May · 7:30 pm",
      presentation: "poster",
      summary: "A public conversation about marginal dramaturgy and its relationship with contemporary dance.",
      synopsisHeading: "What does contemporary dance have to do with it?",
      body: [
        "Fora da Gaiola brings Márcio Greyk, Dillyane França, Maria Emilia, and Manuel Victor together to explore experiences of creation, the margins, and presence in dance.",
        "The first edition takes place at Instituto Brasileiro de Teatro in Bela Vista, making conversation a public extension of Grupo Flying Low’s research.",
      ],
      image: "/images/debates/fora-da-gaiola-capa.webp",
      imageCredit: "Flyer · Fora da Gaiola",
      imageAlt: "Red Fora da Gaiola flyer with four white chairs",
      galleryLabel: "First-edition flyers",
      gallery: [
        {
          src: "/images/debates/fora-da-gaiola-capa.webp",
          alt: "Fora da Gaiola flyer listing the date, time, venue, and participants in Portuguese",
          poster: true,
        },
        {
          src: "/images/debates/fora-da-gaiola-convidados.webp",
          alt: "Fora da Gaiola flyer with portraits of Márcio Greyk, Dillyane França, Maria Emilia, and Manuel Victor",
          poster: true,
        },
      ],
      facts: [
        { label: "Date and time", value: "29 May · 7:30 pm" },
        { label: "Venue", value: "IBT · Instituto Brasileiro de Teatro" },
        { label: "Address", value: "Av. Brigadeiro Luís Antônio, 277 · Bela Vista" },
      ],
      credits: [
        { role: "Participants", names: "Márcio Greyk, Dillyane França, Maria Emilia, and Manuel Victor" },
        { role: "Presented by", names: "Grupo Flying Low" },
        { role: "Public funding", names: "38th edition of São Paulo’s Municipal Dance Development Programme" },
      ],
      links: [],
    },
  },
  group: {
    membersEyebrow: "Who they are",
    membersHeading: "Five artists, one shared practice.",
    membersIntro: "Formed in 2018 through Menino Assum Preto, Flying Low brings together Lee Anderson (Turtle Lee), Jeff dos Santos Rodrigues (Fioot), Manuel Victor, Emerson Silva (Emersu), and Ricardo Ura (Koide). Since then, the collective has connected stage, screen, and learning through performances, films, workshops, and touring projects that bring breaking to different audiences and territories.",
    membersVisible: false,
    members: [
      {
        name: "Turtle Lee",
        role: "Performance · co-direction · choreography",
        bio: "An artist with Flying Low, working across performance, co-direction, and choreography while connecting breaking to collective stage creation.",
        portraitClass: "member-portrait-1",
        links: [
          { label: "@grupo_flyinglow", href: "https://www.instagram.com/grupo_flyinglow/" },
          { label: "Public credits", href: "https://abcdanca.com.br/wp-content/uploads/2025/07/Programa-ABCDanca-Transpetro-2025.pdf" },
        ],
      },
      {
        name: "Fioot",
        role: "Creation · co-direction · breaking education",
        bio: "An artist with Flying Low, working in creation, co-direction, and performance while leading breaking practices around movement, improvisation, musicality, and authorship.",
        portraitClass: "member-portrait-2",
        links: [
          { label: "@grupo_flyinglow", href: "https://www.instagram.com/grupo_flyinglow/" },
          { label: "Voando com Flying Low", href: "https://www.sescsp.org.br/wp-content/uploads/2024/03/Guia-de-Programacao_Agosto_SJC.pdf" },
        ],
      },
      {
        name: "Manuel Victor",
        role: "Dance · performance · words · learning",
        bio: "An artist of dance, performance, and words. His research addresses marginal aesthetics, and his practice also spans breaking education, dramaturgy, and creation.",
        portraitClass: "member-portrait-3",
        links: [
          { label: "@grupo_flyinglow", href: "https://www.instagram.com/grupo_flyinglow/" },
          { label: "Research profile", href: "https://proceedings.science/p/203064?lang=pt-br" },
        ],
      },
      {
        name: "Emersu",
        role: "Dance · acting · arts education",
        bio: "A dance artist, actor, and arts educator researching breaking through hip-hop, ancestry, and critical pedagogy, connecting bodily practice and territory.",
        portraitClass: "member-portrait-4",
        links: [
          { label: "@grupo_flyinglow", href: "https://www.instagram.com/grupo_flyinglow/" },
          { label: "@sinergiamarginal", href: "https://www.instagram.com/sinergiamarginal/" },
        ],
      },
      {
        name: "Ricardo Ura",
        role: "Performance · dramaturgy · direction · design",
        bio: "A dance-maker and visual artist whose work with Flying Low spans direction, choreography, dramaturgy, and design, bringing stage and image together.",
        portraitClass: "member-portrait-5",
        links: [
          { label: "@grupo_flyinglow", href: "https://www.instagram.com/grupo_flyinglow/" },
          { label: "Public credits", href: "https://www.sjc.sp.gov.br/noticias/2024/abril/10/cet-recebe-espetaculo-de-danca-menino-assum-preto/" },
        ],
      },
    ],
    researchEyebrow: "Research",
    researchHeading: "What drives the work.",
    researchBody: [
      "Flying Low’s research approaches breaking as a stage, political, and poetic language. Through shared direction and the meeting of urban and contemporary dance, the collective creates body dramaturgies rooted in peripheral and collective experience.",
      "The works explore confinement, ancestry, precarious labour, and other possible futures. Menino Assum Preto connects the caged body to the marginalised worker; As Pegadas do Kurupyra turns to enchanted beings to imagine memory and ancestry.",
      "The research also unfolds through learning and screen work in Voando com Flying Low and the documentary series Em Formação. Across each form, encounter remains a way to create, learn, and imagine.",
    ],
    researchAxes: ["Breaking and authorship", "Peripheral memory", "Collective creation", "Stage and screen"],
  },
  history: {
    eyebrow: "History",
    heading: "A line made of encounters, works, and movement.",
    intro: "A selection of milestones in Flying Low’s journey. Programmes, records, and press coverage help tell a story that remains in motion.",
    clippingLabel: "Press archive",
    clippingStatus: "Being updated",
    events: [
      { year: "2018", title: "Menino Assum Preto", description: "The project receives support from Programa VAI and consolidates an original inquiry into breaking, peripheral experience, and stage creation." },
      { year: "2019", title: "First performances", description: "Menino Assum Preto tours cultural venues in São Paulo, expanding the collective’s encounters with new audiences." },
      { year: "2020", title: "Cantigas do Meu Matulão", description: "The research expands into a dance film supported by the Aldir Blanc Award." },
      { year: "2021", title: "Na Manha com Flying Low", description: "Supported by PROAC 31/2021, the learning project leads to educational activities and the documentary series Em Formação." },
      { year: "2022", title: "As Pegadas do Kurupyra", description: "The group presents a new work inspired by Brazilian enchanted beings, bringing breaking, improvisation, and contemporary dance together." },
      { year: "2024", title: "Touring and learning", description: "Seasons of Menino Assum Preto connect performances to workshops, audience conversations, and process sharing." },
      { year: "2025", title: "New traces", description: "As Pegadas do Kurupyra continues touring while the group organises new research, creation, and archive initiatives." },
    ],
  },
  agenda: {
    eyebrow: "Agenda",
    heading: "Upcoming encounters.",
    intro: "Confirmed performances for September and October 2026. Times and venues still to be confirmed will be updated here.",
    when: "When · 2026",
    where: "Where",
    events: [
      {
        title: "Revoada",
        note: "Final title to be confirmed",
        dates: [
          { day: "18—19", weekday: "Friday and Saturday", month: "September", time: "7 pm", label: "premiere on the 18th" },
          { day: "20", weekday: "Sunday", month: "September", time: "6 pm" },
          { day: "25—26", weekday: "Friday and Saturday", month: "September", time: "7 pm" },
          { day: "27", weekday: "Sunday", month: "September", time: "6 pm" },
        ],
        venue: "Teatro Galpão do Folias",
        address: "Rua Ana Cintra, 213 · Santa Cecília · São Paulo, SP",
      },
      {
        title: "Revoada",
        note: "Final title to be confirmed",
        dates: [{ day: "01—04", weekday: "Thursday to Sunday", month: "October", time: "Time to be confirmed" }],
        venue: "Venue to be confirmed",
        address: "Address to be confirmed",
      },
      {
        title: "Menino Assum Preto",
        dates: [{ day: "15—18", weekday: "Thursday to Sunday", month: "October", time: "Time to be confirmed" }],
        venue: "Teatro Galpão do Folias",
        address: "Rua Ana Cintra, 213 · Santa Cecília · São Paulo, SP",
      },
    ],
  },
};

const editorialContent: Record<Locale, EditorialContent> = { "pt-BR": ptBR, en };

export function getEditorialContent(locale: Locale) {
  return editorialContent[locale];
}
