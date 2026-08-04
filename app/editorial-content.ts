import type { Locale } from "./i18n";
import { routeFor, type RouteKey } from "./route-localization";

export type ProjectKey =
  | "meninoAssumPreto"
  | "kurupyra"
  | "revoada"
  | "concepcoesMarginais"
  | "emFormacao"
  | "evenInTheTrash"
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
  evenInTheTrash: "screenEvenTrash",
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
};

type ProjectVideo = {
  youtubeId: string;
  title: string;
  linkLabel: string;
};

export type EditorialProject = {
  title: string;
  eyebrow: string;
  year: string;
  status?: string;
  summary: string;
  synopsisHeading: string;
  body: string[];
  image?: string;
  imageCredit?: string;
  secondaryImage?: string;
  secondaryImageCredit?: string;
  gallery?: ProjectImage[];
  galleryLabel?: string;
  galleryCredit?: string;
  video?: ProjectVideo;
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
  };
  collections: Record<CollectionKey, EditorialCollection>;
  projects: Record<ProjectKey, EditorialProject>;
  group: {
    membersEyebrow: string;
    membersHeading: string;
    membersIntro: string;
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
};

const ptBR: EditorialContent = {
  common: {
    openProject: "Abrir projeto",
    synopsis: "Sinopse",
    technical: "Informações",
    fullCredits: "Ficha técnica completa",
    creditsPending: "Ficha técnica em atualização.",
    gallery: "Registros de cena",
    video: "Em vídeo",
    media: "Vídeos e materiais",
    sourceNote: "Perfil e créditos públicos",
    previous: "Anterior",
    next: "Próximo",
  },
  collections: {
    espetaculos: {
      eyebrow: "Espetáculos",
      heading: "Trabalhos para corpos e territórios em presença.",
      intro: "Obras cênicas que cruzam breaking, dança contemporânea, memória periférica e fabulação. A primeira faixa reúne os trabalhos; a rolagem abre cada processo em imagens, sinopse e contexto.",
      stripLabel: "Espetáculos do Flying Low",
      projectKeys: ["meninoAssumPreto", "kurupyra", "revoada"],
    },
    audiovisual: {
      eyebrow: "Audiovisual",
      heading: "A câmera também entra na roda.",
      intro: "Filmes, séries e experimentos que transportam a pesquisa do grupo para outros enquadramentos, tempos e modos de circulação.",
      stripLabel: "Projetos audiovisuais",
      projectKeys: ["concepcoesMarginais", "emFormacao", "evenInTheTrash", "cantigas"],
    },
    formacao: {
      eyebrow: "Atividades formativas",
      heading: "Aprender em roda. Criar em coletivo.",
      intro: "Práticas para diferentes experiências em dança: dos fundamentos do breaking à criação de uma linguagem autoral e compartilhada.",
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
      synopsisHeading: "O pássaro aprisionado encontra o trabalhador urbano.",
      body: [
        "Inspirado na canção “Assum Preto”, de Luiz Gonzaga e Humberto Teixeira, o espetáculo cria um paralelo entre o pássaro cegado que canta sem ver o mundo e o trabalhador empurrado a sobreviver em um cotidiano de exploração e invisibilidade.",
        "Breaking e dança contemporânea constroem uma narrativa sobre dignidade e liberdade, entre dor, poesia, acrobacia e força.",
      ],
      image: sharedImages.assum,
      secondaryImage: sharedImages.amber,
      imageAlt: "Cena do espetáculo Menino Assum Preto",
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
        { label: "Assistir teaser", href: "https://youtu.be/A244vRmQt8I" },
        { label: "Espetáculo na íntegra", href: "https://youtu.be/HoIGxT3XuSU" },
        { label: "Solicitar rider técnico", href: "mailto:producaoflyinglow@gmail.com?subject=Rider%20-%20Menino%20Assum%20Preto" },
      ],
    },
    kurupyra: {
      title: "As Pegadas do Kurupyra",
      eyebrow: "Espetáculo",
      year: "2022",
      summary: "Encantados brasileiros, breaking e improvisação em uma obra sobre ganância, partilha e imaginação coletiva.",
      synopsisHeading: "Rastros de um território vivo.",
      body: [
        "Inspirada nos encantados e no bestiário do território brasileiro, a obra aproxima perspectivas afro-diaspóricas e indígenas de uma pesquisa corporal que mescla breaking e dança contemporânea.",
        "Jogos de improvisação cênica e interação com o público movem uma investigação sobre ganância e partilha, fazendo do encontro uma parte essencial da dramaturgia.",
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
      eyebrow: "Espetáculo em desenvolvimento",
      year: "Em processo",
      status: "Conteúdo em preparação",
      summary: "Uma pesquisa em curso sobre deslocamento, decisão coletiva e a força de corpos que mudam de direção juntos.",
      synopsisHeading: "Uma obra que ainda está encontrando sua forma.",
      body: [
        "Revoada nasce como campo de investigação do Flying Low para observar como um grupo produz movimento, abrigo e imaginação em comum.",
        "Esta página acompanhará o processo com imagens, textos e créditos à medida que a criação avançar.",
      ],
      image: sharedImages.amber,
      secondaryImage: sharedImages.portrait,
      imageAlt: "Flying Low em processo cênico",
      facts: [
        { label: "Etapa", value: "Pesquisa e criação" },
        { label: "Formato", value: "Em definição" },
        { label: "Atualização", value: "Novos materiais em breve" },
      ],
      links: [],
    },
    concepcoesMarginais: {
      title: "Concepções Marginais",
      eyebrow: "Pesquisa audiovisual",
      year: "2024",
      summary: "Uma investigação em breaking e dramaturgia que transforma perspectivas marginais e periféricas em videodança.",
      synopsisHeading: "A margem como lugar de invenção.",
      body: [
        "Direcionada por Gerson Afrobreak ao Flying Low e a artistas residentes, a pesquisa atravessa breaking, dramaturgia e fundamentos históricos do Afrobreak.",
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
      summary: "Uma série produzida dentro de Na Manha com Flying Low, projeto de ações pedagógicas apoiado pelo PROAC 31/2021.",
      synopsisHeading: "Aprender também é produzir memória.",
      body: [
        "Em Formação registra práticas, conversas e processos pedagógicos desenvolvidos pelo grupo em torno do breaking.",
        "A série aproxima ensino, criação e documentação para tornar visíveis os modos coletivos de construir conhecimento em dança.",
      ],
      image: sharedImages.portrait,
      secondaryImage: sharedImages.collective,
      imageAlt: "Flying Low em cena",
      facts: [
        { label: "Formato", value: "Série documental" },
        { label: "Ano", value: "2021" },
        { label: "Contexto", value: "Na Manha com Flying Low · PROAC 31/2021" },
      ],
      links: [
        { label: "Solicitar materiais", href: "mailto:producaoflyinglow@gmail.com?subject=Serie%20Em%20Formacao" },
      ],
    },
    evenInTheTrash: {
      title: "Even in the Trash Grows Flowers",
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
    cantigas: {
      title: "Cantigas do Meu Matulão",
      eyebrow: "Videodança",
      year: "2020",
      summary: "Videodança contemplada pelo Prêmio Aldir Blanc e criada como desdobramento da pesquisa cênica do grupo.",
      synopsisHeading: "Corpo, câmera e memória em deslocamento.",
      body: [
        "Cantigas do Meu Matulão leva a dança para o enquadramento da câmera, buscando outras proximidades entre gesto, espaço e montagem.",
        "A página será ampliada com vídeo, ficha completa e registros de processo.",
      ],
      image: sharedImages.blue,
      secondaryImage: sharedImages.assum,
      imageAlt: "Cena azul de trabalho do Flying Low",
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
      summary: "Fundamentos, treinamento e criação em breaking para quem começa, para quem já dança e para profissionais.",
      synopsisHeading: "Três entradas. Uma prática construída em roda.",
      body: [
        "Para iniciantes, a oficina apresenta história, cultura, musicalidade e fundamentos do breaking sem exigir experiência prévia. Para pessoas que já dançam, aprofunda repertório, improvisação e pesquisa de movimento. Para profissionais, compartilha ferramentas de criação e procedimentos usados nas obras do Flying Low.",
        "Cada percurso é ajustado ao contexto do grupo, à duração disponível e ao espaço. A prática já dialogou com ambientes de formação e criação como ETEC de Artes, Companhia de Danças de Diadema e Oficina Cultural Oswald de Andrade.",
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
      summary: "Um espaço de pesquisa menos centrado na técnica e mais dedicado a procedimentos de criação compartilhada.",
      synopsisHeading: "Do treinamento ao surgimento de uma obra.",
      body: [
        "A residência parte das perguntas e experiências trazidas por cada grupo. Jogos de composição, escrita de corpo, improvisação e dramaturgia organizam um processo coletivo de investigação.",
        "Dependendo do tempo e do contexto, o percurso pode chegar a uma abertura de processo ou resultado apresentável, como laboratório para pesquisas relacionadas a Concepções Marginais e Revoada.",
      ],
      image: sharedImages.portrait,
      secondaryImage: sharedImages.blue,
      imageAlt: "Retrato do grupo Flying Low em processo",
      facts: [
        { label: "Foco", value: "Procedimentos de criação" },
        { label: "Formato", value: "Intensivo adaptável" },
        { label: "Desdobramento", value: "Abertura de processo ou resultado apresentável" },
      ],
      links: [
        { label: "Conversar sobre uma residência", href: "mailto:producaoflyinglow@gmail.com?subject=Residencia%20Flying%20Low" },
      ],
    },
    debatePrimeiraEdicao: {
      title: "Primeira edição",
      eyebrow: "Debates mediados",
      year: "Arquivo em construção",
      status: "Flyer em atualização",
      summary: "A primeira edição inaugura um espaço de conversa pública sobre corpo, território e criação periférica.",
      synopsisHeading: "Uma roda para continuar o que a cena começou.",
      body: [
        "Os debates mediados aproximam artistas, público e pessoas convidadas em torno das questões que atravessam os trabalhos do Flying Low.",
        "O flyer, a programação completa e os registros desta edição serão publicados aqui assim que o arquivo estiver organizado.",
      ],
      imageAlt: "Espaço reservado para o flyer da primeira edição",
      placeholderLabel: "Flyer 01",
      facts: [
        { label: "Formato", value: "Conversa mediada" },
        { label: "Arquivo", value: "Em organização" },
        { label: "Programação", value: "Em breve" },
      ],
      links: [],
    },
  },
  group: {
    membersEyebrow: "Quem são",
    membersHeading: "Cinco artistas. Cinco trajetórias em movimento.",
    membersIntro: "As minibios abaixo reúnem informações verificáveis em programações, fichas técnicas e perfis culturais públicos. Perfis pessoais não confirmados não foram atribuídos.",
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
    researchHeading: "O breaking como ponto de partida, não como limite.",
    researchBody: [
      "A pesquisa do Flying Low parte do breaking e atravessa danças urbanas, dramaturgias do corpo, audiovisual e práticas colaborativas de criação.",
      "Em cena, na câmera ou em processos formativos, o grupo transforma experiência periférica em presença crítica, sensível e comunitária.",
    ],
    researchAxes: ["Breaking e autoria", "Memória periférica", "Criação coletiva", "Cena e audiovisual"],
  },
  history: {
    eyebrow: "Histórico",
    heading: "Uma linha feita de encontros, obras e deslocamentos.",
    intro: "Uma seleção de marcos para percorrer a trajetória do Flying Low. O arquivo completo de programas, registros e clipping será conectado a esta página quando estiver organizado.",
    clippingLabel: "Clipping completo",
    clippingStatus: "Link em preparação",
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
    fullCredits: "Full credits",
    creditsPending: "Full credits are being updated.",
    gallery: "Stage records",
    video: "On video",
    media: "Videos and materials",
    sourceNote: "Public profile and credits",
    previous: "Previous",
    next: "Next",
  },
  collections: {
    espetaculos: {
      eyebrow: "Performances",
      heading: "Works for bodies and territories in presence.",
      intro: "Stage works bringing breaking, contemporary dance, peripheral memory, and fabulation together. The opening strip gathers the projects; scrolling unfolds each process through images, synopsis, and context.",
      stripLabel: "Flying Low performances",
      projectKeys: ["meninoAssumPreto", "kurupyra", "revoada"],
    },
    audiovisual: {
      eyebrow: "Screen work",
      heading: "The camera joins the circle.",
      intro: "Films, series, and experiments carrying the collective’s research into other frames, temporalities, and forms of circulation.",
      stripLabel: "Screen projects",
      projectKeys: ["concepcoesMarginais", "emFormacao", "evenInTheTrash", "cantigas"],
    },
    formacao: {
      eyebrow: "Learning activities",
      heading: "Learn in a circle. Create collectively.",
      intro: "Practices for different levels of dance experience, from breaking foundations to the creation of an original, shared language.",
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
      synopsisHeading: "The captive bird meets the urban worker.",
      body: [
        "Inspired by “Assum Preto,” by Luiz Gonzaga and Humberto Teixeira, the work draws a parallel between the blinded bird that sings without seeing the world and the worker forced to survive amid exploitation and invisibility.",
        "Breaking and contemporary dance build a narrative of dignity and freedom, between pain, poetry, acrobatics, and strength.",
      ],
      image: sharedImages.assum,
      secondaryImage: sharedImages.amber,
      imageAlt: "Scene from Menino Assum Preto",
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
        { label: "Watch teaser", href: "https://youtu.be/A244vRmQt8I" },
        { label: "Full performance", href: "https://youtu.be/HoIGxT3XuSU" },
        { label: "Request technical rider", href: "mailto:producaoflyinglow@gmail.com?subject=Rider%20-%20Menino%20Assum%20Preto" },
      ],
    },
    kurupyra: {
      title: "As Pegadas do Kurupyra",
      eyebrow: "Performance",
      year: "2022",
      summary: "Brazilian enchanted beings, breaking, and improvisation in a work about greed, sharing, and collective imagination.",
      synopsisHeading: "Traces of a living territory.",
      body: [
        "Inspired by enchanted beings and the Brazilian bestiary, the work draws Afro-diasporic and Indigenous perspectives into bodily research blending breaking and contemporary dance.",
        "Stage improvisation and audience interaction drive an inquiry into greed and sharing, making the encounter an essential part of the dramaturgy.",
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
      eyebrow: "Performance in development",
      year: "In process",
      status: "Content in preparation",
      summary: "An ongoing inquiry into displacement, collective decisions, and the force of bodies changing direction together.",
      synopsisHeading: "A work still finding its form.",
      body: [
        "Revoada begins as a field of inquiry for Flying Low to observe how a group produces movement, shelter, and imagination in common.",
        "This page will follow the process through images, writing, and credits as the creation develops.",
      ],
      image: sharedImages.amber,
      secondaryImage: sharedImages.portrait,
      imageAlt: "Flying Low in a stage process",
      facts: [
        { label: "Stage", value: "Research and creation" },
        { label: "Format", value: "To be defined" },
        { label: "Update", value: "New materials coming soon" },
      ],
      links: [],
    },
    concepcoesMarginais: {
      title: "Concepções Marginais",
      eyebrow: "Screen research",
      year: "2024",
      summary: "An investigation in breaking and dramaturgy that turns marginal and peripheral perspectives into a dance film.",
      synopsisHeading: "The margin as a place of invention.",
      body: [
        "Led by Gerson Afrobreak with Flying Low and resident artists, the research crosses breaking, dramaturgy, and the historical foundations of Afrobreak.",
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
      summary: "A series produced within Na Manha com Flying Low, a learning project supported by PROAC 31/2021.",
      synopsisHeading: "Learning also produces memory.",
      body: [
        "Em Formação documents practices, conversations, and pedagogical processes developed by the group around breaking.",
        "The series connects teaching, creation, and documentation to make collective ways of building dance knowledge visible.",
      ],
      image: sharedImages.portrait,
      secondaryImage: sharedImages.collective,
      imageAlt: "Flying Low performing",
      facts: [
        { label: "Format", value: "Documentary series" },
        { label: "Year", value: "2021" },
        { label: "Context", value: "Na Manha com Flying Low · PROAC 31/2021" },
      ],
      links: [
        { label: "Request materials", href: "mailto:producaoflyinglow@gmail.com?subject=Serie%20Em%20Formacao" },
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
    cantigas: {
      title: "Cantigas do Meu Matulão",
      eyebrow: "Dance film",
      year: "2020",
      summary: "A dance film supported by the Aldir Blanc Award and created as an extension of the collective’s stage research.",
      synopsisHeading: "Body, camera, and memory in motion.",
      body: [
        "Cantigas do Meu Matulão carries dance into the camera frame, seeking other proximities between gesture, space, and editing.",
        "The page will be expanded with the film, full credits, and process records.",
      ],
      image: sharedImages.blue,
      secondaryImage: sharedImages.assum,
      imageAlt: "Blue-lit scene from Flying Low",
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
      summary: "Breaking foundations, training, and creation for beginners, experienced dancers, and professionals.",
      synopsisHeading: "Three entry points. One practice built in a circle.",
      body: [
        "For beginners, the workshop introduces breaking history, culture, musicality, and foundations with no previous experience required. For experienced dancers, it deepens repertoire, improvisation, and movement research. For professionals, it shares creative tools and procedures used in Flying Low’s works.",
        "Each pathway adapts to the group, available duration, and space. The practice has engaged learning and creation environments including ETEC de Artes, Companhia de Danças de Diadema, and Oficina Cultural Oswald de Andrade.",
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
      summary: "A research space less centred on technique and more devoted to shared creative procedures.",
      synopsisHeading: "From training to the emergence of a work.",
      body: [
        "The residency begins with the questions and experiences brought by each group. Composition games, body writing, improvisation, and dramaturgy organise a collective process of inquiry.",
        "Depending on time and context, the pathway can lead to a process sharing or presentable outcome, serving as a laboratory for research connected to Concepções Marginais and Revoada.",
      ],
      image: sharedImages.portrait,
      secondaryImage: sharedImages.blue,
      imageAlt: "Portrait of Flying Low in process",
      facts: [
        { label: "Focus", value: "Creative procedures" },
        { label: "Format", value: "Adaptable intensive" },
        { label: "Outcome", value: "Process sharing or presentable result" },
      ],
      links: [
        { label: "Discuss a residency", href: "mailto:producaoflyinglow@gmail.com?subject=Residencia%20Flying%20Low" },
      ],
    },
    debatePrimeiraEdicao: {
      title: "First edition",
      eyebrow: "Moderated conversations",
      year: "Archive in progress",
      status: "Flyer being updated",
      summary: "The first edition opens a public conversation about body, territory, and peripheral creation.",
      synopsisHeading: "A circle to continue what the stage began.",
      body: [
        "The moderated conversations bring artists, audiences, and invited guests together around the questions running through Flying Low’s works.",
        "The flyer, full programme, and records from this edition will be published here once the archive is organised.",
      ],
      imageAlt: "Reserved space for the first-edition flyer",
      placeholderLabel: "Flyer 01",
      facts: [
        { label: "Format", value: "Moderated conversation" },
        { label: "Archive", value: "Being organised" },
        { label: "Programme", value: "Coming soon" },
      ],
      links: [],
    },
  },
  group: {
    membersEyebrow: "Who they are",
    membersHeading: "Five artists. Five trajectories in motion.",
    membersIntro: "These short biographies use verifiable information from public programmes, credits, and cultural profiles. Unconfirmed personal accounts have not been attributed.",
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
    researchHeading: "Breaking as a point of departure, not a limit.",
    researchBody: [
      "Flying Low’s research begins with breaking and moves through urban dances, body dramaturgies, screen work, and collaborative creative practices.",
      "On stage, on camera, or in learning processes, the group transforms peripheral experience into critical, sensitive, and communal presence.",
    ],
    researchAxes: ["Breaking and authorship", "Peripheral memory", "Collective creation", "Stage and screen"],
  },
  history: {
    eyebrow: "History",
    heading: "A line made of encounters, works, and movement.",
    intro: "A selection of milestones through Flying Low’s trajectory. The full archive of programmes, records, and press clippings will be connected to this page once organised.",
    clippingLabel: "Complete clipping archive",
    clippingStatus: "Link in preparation",
    events: [
      { year: "2018", title: "Menino Assum Preto", description: "The project receives support from Programa VAI and consolidates an original inquiry into breaking, peripheral experience, and stage creation." },
      { year: "2019", title: "First performances", description: "Menino Assum Preto circulates through cultural venues in São Paulo, expanding the collective’s encounters with new audiences." },
      { year: "2020", title: "Cantigas do Meu Matulão", description: "The research expands into a dance film supported by the Aldir Blanc Award." },
      { year: "2021", title: "Na Manha com Flying Low", description: "The learning project supported by PROAC 31/2021 generates educational practices and the documentary series Em Formação." },
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
