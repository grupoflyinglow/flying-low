import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${pathname}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${pathname}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders Portuguese as the primary language", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<html[^>]+lang="pt-BR"/i);
  assert.match(html, /<title>Flying Low — dança, cena e imagem<\/title>/i);
  assert.match(html, /Dança das periferias de São Paulo/);
  assert.match(html, /class="hero-primary-cta" href="\/espetaculos"/);
  assert.match(html, /Ver espetáculos/);
  assert.match(html, /Próximos encontros\./);
  assert.match(html, /class="agenda-date-day">18—19/);
  assert.match(html, /estreia dia 18/);
  assert.match(html, /Teatro Galpão do Folias/);
  assert.match(html, /aria-current="page" aria-label="Português" href="\/" hrefLang="pt-BR" lang="pt-BR">PT<\/a>/);
  assert.match(html, /aria-label="Inglês" href="\/en" hrefLang="en" lang="en">EN<\/a>/);
  assert.match(html, /<nav class="desktop-nav" aria-label="Navegação principal"/);
  assert.match(html, /class="wordmark"[^>]*><img src="\/brand\/logo-mark-light\.png" alt="" aria-hidden="true" width="273" height="414"/);
  assert.match(html, /class="footer-wordmark"[^>]*><img src="\/brand\/logo-mark-dark\.png" alt="" aria-hidden="true" width="273" height="414"/);
  assert.match(html, /href="\/brand\/favicon\.png"/);
  assert.match(html, />Formação<\/a>/);
  assert.match(html, />Debates<\/a>/);
  assert.match(html, /class="skip-link" href="#main-content"/);
  assert.match(html, /<main id="main-content" tabindex="-1"/);
  assert.match(html, /width="800" height="533" loading="lazy"/);
  assert.doesNotMatch(html, /Em atividade desde 2016/);
  assert.doesNotMatch(html, /Breaking como linguagem cênica, política e poética/);
  assert.doesNotMatch(html, /class="contact-band"/);
  assert.doesNotMatch(html, /class="nav-title"/);
  assert.doesNotMatch(html, /Novas datas em breve/);
  assert.doesNotMatch(html, /Assistir teaser/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton|Your site is taking shape/i);
});

test("renders the 2026 schedule and the simplified home composition", async () => {
  const homeResponse = await render();
  const home = await homeResponse.text();
  assert.match(home, /class="agenda-home-events"/);
  assert.match(home, /class="agenda-date-day">01—04/);
  assert.match(home, /class="agenda-date-day">15—18/);
  assert.match(home, /class="agenda-date-weekday">sexta e sábado/);
  assert.match(home, /class="agenda-date-weekday">quinta a domingo/);
  assert.match(home, /Rua Ana Cintra, 213 · Santa Cecília · São Paulo, SP/);
  assert.match(home, /Em atualização/);
  assert.match(home, /Horário TBC/);
  assert.match(home, /class="collective-image-link" href="\/grupo"/);
  assert.match(home, /Conhecer o grupo/);
  assert.doesNotMatch(home, /class="manifesto/);
  assert.doesNotMatch(home, /class="featured-work/);
  assert.doesNotMatch(home, /class="practice-grid/);
  assert.doesNotMatch(home, /Em destaque · 2019|Criação em movimento/);

  const agendaResponse = await render("/agenda");
  assert.equal(agendaResponse.status, 200);
  const agenda = await agendaResponse.text();
  assert.match(agenda, /class="agenda-board-events"/);
  assert.match(agenda, /class="agenda-date-day">18—19/);
  assert.match(agenda, /class="agenda-date-day">20/);
  assert.match(agenda, /class="agenda-date-day">25—26/);
  assert.match(agenda, /class="agenda-date-day">27/);
  assert.match(agenda, /class="agenda-date-label">estreia dia 18/);
  assert.match(agenda, /class="agenda-date-month">setembro/);
  assert.match(agenda, /class="agenda-date-time">Horário TBC/);
  assert.match(agenda, /class="agenda-event-address">Rua Ana Cintra, 213/);
  assert.match(agenda, /Em atualização/);
  assert.match(agenda, /Menino Assum Preto/);
});

test("server-renders the complete information architecture in Portuguese", async () => {
  const routes = [
    ["/grupo", "Um coletivo de artistas das periferias de São Paulo"],
    ["/espetaculos", "Menino Assum Preto"],
    ["/espetaculos/menino-assum-preto", "Um manifesto em movimento"],
    ["/espetaculos/as-pegadas-do-kurupyra", "Encantados brasileiros"],
    ["/espetaculos/revoada", "Estreia em 18 de setembro de 2026"],
    ["/audiovisual", "A câmera também entra na roda"],
    ["/audiovisual/concepcoes-marginais", "A margem como lugar de invenção"],
    ["/audiovisual/em-formacao", "Aprender também é produzir memória"],
    ["/audiovisual/mesmo-no-lixo-nascem-flores", "Mesmo no lixo nascem flores"],
    ["/audiovisual/cantigas-do-meu-matulao", "Corpo, câmera e memória"],
    ["/atividades-formativas", "Aprender em roda"],
    ["/atividades-formativas/oficinas", "Três entradas"],
    ["/atividades-formativas/residencia", "surgimento de uma obra"],
    ["/debates-mediados", "A conversa continua"],
    ["/debates-mediados/primeira-edicao", "O que a dança contemporânea tem a ver com isso"],
    ["/historico", "Uma linha feita de encontros"],
    ["/agenda", "Próximos encontros"],
    ["/menino-assum-preto", "Um manifesto em movimento"],
  ];

  for (const [pathname, expectedCopy] of routes) {
    const response = await render(pathname);
    assert.equal(response.status, 200, pathname);
    const html = await response.text();
    assert.match(html, new RegExp(expectedCopy), pathname);
    assert.doesNotMatch(html, /class="archive-cta"/, pathname);
  }
});

test("server-renders English at translated URLs without a Portuguese first paint", async () => {
  const routes = [
    ["/en", "Dance from São Paulo’s peripheries"],
    ["/en/collective", "A collective of artists from São Paulo’s peripheries."],
    ["/en/performances", "Menino Assum Preto"],
    ["/en/performances/menino-assum-preto", "A manifesto in motion about labour"],
    ["/en/performances/the-footprints-of-kurupyra", "Brazilian enchanted beings"],
    ["/en/performances/revoada", "Premieres on 18 September 2026"],
    ["/en/screen", "The camera joins the circle."],
    ["/en/screen/marginal-conceptions", "The margin as a place of invention."],
    ["/en/screen/in-formation", "Learning also produces memory."],
    ["/en/screen/even-in-the-trash-grows-flowers", "Flowers can grow even in the trash."],
    ["/en/screen/songs-from-my-bundle", "Body, camera, and memory in motion."],
    ["/en/learning", "Learn in a circle. Create collectively."],
    ["/en/learning/workshops", "Three entry points. One practice built in a circle."],
    ["/en/learning/residency", "From training to the emergence of a work."],
    ["/en/conversations", "The conversation continues after the stage."],
    ["/en/conversations/first-edition", "What does contemporary dance have to do with it?"],
    ["/en/history", "A line made of encounters, works, and movement."],
    ["/en/agenda", "Upcoming encounters."],
  ];

  for (const [pathname, expectedCopy] of routes) {
    const response = await render(pathname);
    assert.equal(response.status, 200, pathname);
    const html = await response.text();
    assert.match(html, /<html[^>]+lang="en"/i, pathname);
    assert.match(html, new RegExp(expectedCopy.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")), pathname);
    assert.doesNotMatch(html, /Pular para o conteúdo|Navegação principal|Ver espetáculos/, pathname);
  }

  const performances = await render("/en/performances");
  const performancesHtml = await performances.text();
  for (const href of [
    "/en/collective",
    "/en/performances",
    "/en/screen",
    "/en/learning",
    "/en/conversations",
    "/en/agenda",
    "/en/performances/the-footprints-of-kurupyra",
  ]) {
    assert.match(performancesHtml, new RegExp(`href="${href}"`), href);
  }
  assert.doesNotMatch(performancesHtml, /href="\/en\/history"/);
  assert.match(performancesHtml, /aria-label="Portuguese" href="\/espetaculos" hrefLang="pt-BR" lang="pt-BR">PT<\/a>/);
  assert.match(performancesHtml, /aria-current="page" aria-label="English" href="\/en\/performances" hrefLang="en" lang="en">EN<\/a>/);
  assert.match(performancesHtml, /<title>Performances \| Flying Low<\/title>/i);
  assert.match(performancesHtml, /rel="canonical" href="https:\/\/flying-low-dance\.vtrpldn\.chatgpt\.site\/en\/performances"/);
  assert.match(performancesHtml, /hrefLang="pt-BR" href="https:\/\/flying-low-dance\.vtrpldn\.chatgpt\.site\/espetaculos"/);
  assert.match(performancesHtml, /hrefLang="en" href="https:\/\/flying-low-dance\.vtrpldn\.chatgpt\.site\/en\/performances"/);
});

test("gives the performances page its own image-led composition", async () => {
  const performances = await render("/espetaculos");
  assert.equal(performances.status, 200);
  const performancesHtml = await performances.text();
  assert.match(performancesHtml, /class="performances-rail"/);
  assert.match(performancesHtml, /class="performance-chapters"/);
  assert.match(performancesHtml, /Menino Assum Preto/);
  assert.match(performancesHtml, /As Pegadas do Kurupyra/);
  assert.match(performancesHtml, /Revoada/);
  assert.doesNotMatch(performancesHtml, /class="collection-hero/);
  assert.doesNotMatch(performancesHtml, /Trabalhos para corpos e territórios em presença/);

  const audiovisual = await render("/audiovisual");
  assert.equal(audiovisual.status, 200);
  assert.match(await audiovisual.text(), /class="collection-hero section-shell"/);
});

test("renders clickable video thumbnails, Kurupyra photo credits, and full technical sheets", async () => {
  const kurupyra = await render("/espetaculos/as-pegadas-do-kurupyra");
  assert.equal(kurupyra.status, 200);
  const kurupyraHtml = await kurupyra.text();
  assert.match(kurupyraHtml, /class="project-teaser-card" href="https:\/\/www\.youtube\.com\/watch\?v=TQZI4t759ng" target="_blank" rel="noreferrer"/);
  assert.match(kurupyraHtml, /src="\/images\/kurupyra\/kurupyra-193\.webp"/);
  assert.doesNotMatch(kurupyraHtml, /youtube-nocookie\.com\/embed\/TQZI4t759ng/);
  for (const photoId of [22, 77, 120, 193, 199, 213, 221, 261, 317]) {
    assert.match(kurupyraHtml, new RegExp(`kurupyra-${photoId}\\.webp`));
  }
  assert.match(kurupyraHtml, /Fotografia · Sarará Rodrigues/);
  assert.match(kurupyraHtml, /Ficha técnica/);
  assert.match(kurupyraHtml, /Jorge Luiz dos Santos Vicente/);

  const menino = await render("/espetaculos/menino-assum-preto");
  const meninoHtml = await menino.text();
  assert.match(meninoHtml, /Ficha técnica/);
  assert.match(meninoHtml, /Emersu \(Emerson S\. Oliveira\)/);
  assert.match(meninoHtml, /Fioot \(Jeff dos Santos Rodrigues\)/);
  assert.match(meninoHtml, /Turtle Lee \(Lee Anderson\)/);
  assert.match(meninoHtml, /Design de luz/);
  assert.match(meninoHtml, /Bruna Tovian/);
  assert.doesNotMatch(meninoHtml, /Luciana Gandelini|Restauração de figurino/);

  const revoada = await render("/espetaculos/revoada");
  assert.match(await revoada.text(), /Ficha técnica em atualização\./);

  const concepcoes = await render("/audiovisual/concepcoes-marginais");
  const concepcoesHtml = await concepcoes.text();
  assert.match(concepcoesHtml, /class="project-teaser-card" href="https:\/\/www\.youtube\.com\/watch\?v=cX55NPxLzxs" target="_blank" rel="noreferrer"/);
  assert.match(concepcoesHtml, /src="\/images\/concepcoes-marginais\/concepcoes-marginais-hero\.webp"/);
  assert.doesNotMatch(concepcoesHtml, /youtube-nocookie\.com\/embed\/cX55NPxLzxs/);
  assert.match(concepcoesHtml, /concepcoes-marginais-hero\.webp/);
  assert.match(concepcoesHtml, /concepcoes-marginais-wide\.webp/);
  for (const stillId of ["01", "02", "03", "04", "05"]) {
    assert.match(concepcoesHtml, new RegExp(`concepcoes-marginais-${stillId}\\.webp`));
  }
  assert.match(concepcoesHtml, /Stills do filme/);
  assert.match(concepcoesHtml, /Direção e edição: Gerson Afrobreak/);
  assert.match(concepcoesHtml, /Gerson Afrobreak/);
  assert.match(concepcoesHtml, /Bruno Novais/);

  const marginalConceptions = await render("/en/screen/marginal-conceptions");
  const marginalConceptionsHtml = await marginalConceptions.text();
  assert.match(marginalConceptionsHtml, /Film stills/);
  assert.match(marginalConceptionsHtml, /Direction and editing: Gerson Afrobreak/);

  const evenTrash = await render("/audiovisual/mesmo-no-lixo-nascem-flores");
  const evenTrashHtml = await evenTrash.text();
  assert.match(evenTrashHtml, /class="project-teaser-card" href="https:\/\/www\.youtube\.com\/watch\?v=HlWvODEryF4" target="_blank" rel="noreferrer"/);
  assert.match(evenTrashHtml, /src="\/images\/even-in-the-trash-grows-flowers\/even-trash-hero\.webp"/);
  assert.doesNotMatch(evenTrashHtml, /youtube-nocookie\.com\/embed\/HlWvODEryF4/);
  assert.match(evenTrashHtml, /even-trash-hero\.webp/);
  assert.match(evenTrashHtml, /even-trash-wide\.webp/);
  for (const stillId of ["01", "02", "03", "04", "05"]) {
    assert.match(evenTrashHtml, new RegExp(`even-trash-${stillId}\\.webp`));
  }
  assert.match(evenTrashHtml, /Stills do filme/);
  assert.match(evenTrashHtml, /Koide Ura e Lee Anderson/);
  assert.match(evenTrashHtml, /Tiago Penalva e Rafaela Maciel/);

  const evenTrashEnglish = await render("/en/screen/even-in-the-trash-grows-flowers");
  const evenTrashEnglishHtml = await evenTrashEnglish.text();
  assert.match(evenTrashEnglishHtml, /Flowers can grow even in the trash\./);
  assert.match(evenTrashEnglishHtml, /Film stills/);
  assert.match(evenTrashEnglishHtml, /href="\/audiovisual\/mesmo-no-lixo-nascem-flores" hrefLang="pt-BR"/);
});

test("renders both Fora da Gaiola flyers and confirmed event details", async () => {
  const debate = await render("/debates-mediados/primeira-edicao");
  assert.equal(debate.status, 200);
  const debateHtml = await debate.text();
  assert.match(debateHtml, /project-page--poster/);
  assert.match(debateHtml, /width="1080" height="1350" src="\/images\/debates\/fora-da-gaiola-capa\.webp"/);
  assert.match(debateHtml, /fora-da-gaiola-convidados\.webp/);
  assert.match(debateHtml, /Flyers da primeira edição/);
  assert.match(debateHtml, /29 de maio · 19h30/);
  assert.match(debateHtml, /IBT · Instituto Brasileiro de Teatro/);
  assert.match(debateHtml, /Márcio Greyk, Dillyane França, Maria Emilia e Manuel Victor/);
  assert.match(debateHtml, /38ª Edição do Programa Municipal de Fomento à Dança/);
  assert.doesNotMatch(debateHtml, /Flyer 01|Flyer em atualização|Arquivo em construção|Espaço reservado/);

  const conversation = await render("/en/conversations/first-edition");
  assert.equal(conversation.status, 200);
  const conversationHtml = await conversation.text();
  assert.match(conversationHtml, /First-edition flyers/);
  assert.match(conversationHtml, /29 May · 7:30 pm/);
  assert.match(conversationHtml, /Red Fora da Gaiola flyer with four white chairs/);
  assert.match(conversationHtml, /38th edition of São Paulo’s Municipal Dance Development Programme/);
  assert.doesNotMatch(conversationHtml, /Flyer being updated|Archive in progress|Reserved space/);
});

test("keeps complete Portuguese and English copy in one typed dictionary", async () => {
  const i18n = await readFile(new URL("../app/i18n.ts", import.meta.url), "utf8");
  const editorial = await readFile(new URL("../app/editorial-content.ts", import.meta.url), "utf8");
  const provider = await readFile(new URL("../app/components/LocaleProvider.tsx", import.meta.url), "utf8");
  const routes = await readFile(new URL("../app/route-localization.ts", import.meta.url), "utf8");

  assert.match(i18n, /DEFAULT_LOCALE: Locale = "pt-BR"/);
  assert.match(i18n, /Dance from São Paulo’s peripheries/);
  assert.match(i18n, /Bodies on stage\./);
  assert.match(i18n, /When the camera/);
  assert.match(i18n, /Learn in a circle\./);
  assert.match(i18n, /The captive bird meets the urban worker\./);
  assert.match(i18n, /Upcoming dates\./);
  assert.doesNotMatch(i18n, /New dates coming soon|Novas datas em breve/);
  assert.doesNotMatch(i18n, /Active since 2016|Em atividade desde 2016/);
  assert.doesNotMatch(i18n, /Breaking (como|as) (a )?(linguagem|scenic)/);
  assert.doesNotMatch(i18n, /Falar com Flying Low|Talk to Flying Low/);
  assert.match(editorial, /Works for bodies and territories in presence/);
  assert.match(editorial, /Full credits/);
  assert.match(editorial, /Photography · Sarará Rodrigues/);
  assert.match(editorial, /Direction and video editing/);
  assert.match(editorial, /Turtle Lee/);
  assert.match(editorial, /Fioot/);
  assert.match(editorial, /Manuel Victor/);
  assert.match(editorial, /Emersu/);
  assert.match(editorial, /Ricardo Ura/);
  assert.match(editorial, /@grupo_flyinglow/);
  assert.match(editorial, /label: "premiere on the 18th"/);
  assert.match(editorial, /day: "15—18", weekday: "Thursday to Sunday", month: "October", time: "Time TBC"/);
  assert.match(editorial, /address: "Being updated"/);
  assert.match(editorial, /venue: "Being updated"/);
  assert.doesNotMatch(provider, /localStorage|useSyncExternalStore|document\.documentElement\.lang/);
  assert.match(provider, /locale: Locale/);
  assert.match(routes, /en: "\/en\/performances\/the-footprints-of-kurupyra"/);
  assert.match(routes, /en: "\/en\/screen\/marginal-conceptions"/);
  assert.match(routes, /en: "\/en\/screen\/even-in-the-trash-grows-flowers"/);
  assert.match(routes, /en: "\/en\/learning\/workshops"/);
});

test("keeps every pixel-based text size at 16px or larger", async () => {
  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
  const declarations = [...css.matchAll(/font-size:\s*([^;]+);/g)];

  for (const declaration of declarations) {
    const pixelValues = [...declaration[1].matchAll(/(\d+(?:\.\d+)?)px/g)];
    for (const pixelValue of pixelValues) {
      assert.ok(
        Number(pixelValue[1]) >= 16,
        `Found a font size below 16px: ${declaration[0]}`,
      );
    }
  }
});

test("keeps interaction and motion safeguards in the visual system", async () => {
  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
  const home = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
  const layout = await readFile(new URL("../app/layout.tsx", import.meta.url), "utf8");

  assert.match(css, /color-scheme:\s*dark/);
  assert.match(css, /--ink:\s*#cbc5bb/);
  assert.match(css, /body\s*\{[^}]*color:\s*var\(--ink\)/);
  assert.match(css, /:where\(a, button\):focus-visible/);
  assert.match(css, /\.menu-button\s*\{\s*display:\s*none/);
  assert.match(css, /\.desktop-nav\s*\{\s*display:\s*none/);
  assert.match(css, /overscroll-behavior:\s*contain/);
  assert.match(css, /@media \(prefers-reduced-motion:\s*reduce\)/);
  assert.match(css, /\.hero-primary-cta\s*\{[^}]*background:\s*var\(--paper\)/);
  assert.match(css, /\.hero-primary-cta:hover\s*\{[^}]*background:\s*var\(--red\)/);
  assert.match(css, /\.agenda-date-day\s*\{[^}]*font-size:\s*clamp\(38px/);
  assert.match(css, /\.hero-primary-cta:hover\s*\{\s*transform:\s*none/);
  assert.match(css, /background:\s*url\("\/brand\/logo-wordmark-light\.png"\)/);
  assert.match(home, /useSyncExternalStore/);
  assert.match(home, /!prefersReducedMotion/);
  assert.match(layout, /themeColor:\s*"#0b0b0b"/);
  assert.match(layout, /icon:\s*\[\{ url:\s*"\/brand\/favicon\.png"/);
  assert.match(layout, /apple:\s*\[\{ url:\s*"\/brand\/app-icon\.png"/);
  assert.doesNotMatch(layout, /favicon\.svg/);
});
