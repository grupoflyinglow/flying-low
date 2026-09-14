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
  assert.doesNotMatch(html, /Dança das periferias de São Paulo para a cena, a câmera e o encontro\./);
  assert.match(html, /class="hero-primary-cta" href="\/espetaculos"/);
  assert.match(html, /Ver espetáculos/);
  assert.match(html, /Próximos encontros\./);
  assert.match(html, /class="agenda-date-day">18—19/);
  assert.match(html, /estreia dia 18/);
  assert.match(html, /Teatro Galpão do Folias/);
  assert.match(html, /aria-current="page" aria-label="Português" href="\/" hrefLang="pt-BR" lang="pt-BR">PT<\/a>/);
  assert.match(html, /aria-label="Inglês" href="\/en" hrefLang="en" lang="en">EN<\/a>/);
  assert.match(html, /class="nav-actions"><div class="language-switch(?: [^"]*)?"/);
  assert.match(html, /<nav class="desktop-nav" aria-label="Navegação principal"/);
  assert.match(html, /class="wordmark"[^>]*><img src="\/brand\/logo-mark-light\.png" alt="" aria-hidden="true" width="273" height="414"/);
  assert.match(html, /class="footer-wordmark"[^>]*><img src="\/brand\/logo-mark-dark\.png" alt="" aria-hidden="true" width="273" height="414"/);
  assert.match(html, /href="\/brand\/favicon\.png"/);
  assert.match(html, />Formação<\/a>/);
  assert.match(html, />Debates<\/a>/);
  assert.match(html, /class="skip-link" href="#main-content"/);
  assert.match(html, /<main id="main-content" tabindex="-1"/);
  assert.doesNotMatch(html, /Em atividade desde 2016/);
  assert.doesNotMatch(html, /Breaking como linguagem cênica, política e poética/);
  assert.doesNotMatch(html, /class="contact-band"/);
  assert.doesNotMatch(html, /class="nav-title"/);
  assert.doesNotMatch(html, /Novas datas em breve/);
  assert.doesNotMatch(html, /Assistir teaser/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton|Your site is taking shape/i);
});

test("renders the confirmed season and ticket availability in both languages", async () => {
  const ticketUrl = "https://www.sympla.com.br/evento/espetaculo-em-revoada---grupo-flying-low/3576716";
  for (const [pathname, english] of [["/", false], ["/agenda", false], ["/en", true], ["/en/agenda", true]]) {
    const response = await render(pathname);
    assert.equal(response.status, 200, pathname);
    const html = await response.text();
    const articles = [...html.matchAll(/<article class="agenda-(?:home|board)-event"[^>]*>([\s\S]*?)<\/article>/g)].map((match) => match[1]);
    assert.equal(articles.length, 3, pathname);
    const expectedDates = [
      [["18—19", "20h"], ["20", "18h"], ["25—26", "20h"], ["27", "18h"]],
      [["01", "20h"], ["02", "20h"], ["03", "20h"], ["04", "18h"]],
      [["15—17", "20h"], ["18", "18h"]],
    ];
    for (const [index, article] of articles.entries()) {
      const days = [...article.matchAll(/class="agenda-date-day">([^<]+)/g)].map((match) => match[1]);
      const times = [...article.matchAll(/class="agenda-date-time">([^<]+)/g)].map((match) => match[1]);
      assert.deepEqual(days, expectedDates[index].map(([day]) => day), pathname);
      assert.deepEqual(times, expectedDates[index].map(([, time]) => english ? time === "20h" ? "8 pm" : "6 pm" : time), pathname);
      assert.ok(article.includes(index === 2 ? "Menino Assum Preto" : "Em Revoada"), pathname);
      assert.ok(article.includes("Teatro Galpão do Folias"), pathname);
      assert.ok(article.includes("R. Ana Cintra, 213 · Campos Elíseos · São Paulo/SP"), pathname);
      if (index < 2) assert.ok(article.includes(`href="${ticketUrl}"`), pathname);
      else {
        assert.ok(article.includes(english ? "Tickets available soon" : "Ingressos disponíveis em breve"), pathname);
        assert.doesNotMatch(article, /agenda-ticket-link/, pathname);
      }
    }
    const octoberDates = articles[1].split('class="agenda-date">').slice(1);
    assert.match(octoberDates[1], /Libras/, pathname);
    for (const index of [0, 2, 3]) assert.doesNotMatch(octoberDates[index], /Libras/, pathname);
    assert.doesNotMatch(html, /Nome final a confirmar|Horário a confirmar|Final title to be confirmed|Time to be confirmed/, pathname);
    assert.doesNotMatch(html, /class="collective-image-link"|class="manifesto|class="featured-work|class="practice-grid/, pathname);
  }
});

test("defers home video until the browser can check reduced motion", async () => {
  for (const pathname of ["/", "/en"]) {
    const html = await (await render(pathname)).text();
    assert.doesNotMatch(html, /<video\b|<iframe\b/, pathname);
    assert.match(html, /class="hero"/, pathname);
    assert.match(html, /class="hero-primary-cta"/, pathname);
  }
});

test("server-renders the complete information architecture in Portuguese", async () => {
  const routes = [
    ["/grupo", "Sobre o Flying Low"],
    ["/espetaculos", "Menino Assum Preto"],
    ["/espetaculos/menino-assum-preto", "Menino Assum Preto"],
    ["/espetaculos/as-pegadas-do-kurupyra", "As Pegadas do Kurupyra"],
    ["/espetaculos/revoada", "o salto ou a queda"],
    ["/audiovisual", "Em Formação"],
    ["/audiovisual/concepcoes-marginais", "A margem como lugar de invenção"],
    ["/audiovisual/em-formacao", "Em Formação"],
    ["/audiovisual/mesmo-no-lixo-nascem-flores", "Mesmo no lixo nascem flores"],
    ["/audiovisual/brigando-por-uma-touca", "Entre o jogo e a disputa."],
    ["/audiovisual/cantigas-do-meu-matulao", "Corpo, câmera e memória"],
    ["/atividades-formativas", "Voando com Flying Low"],
    ["/debates-mediados", "Debates mediados"],
    ["/debates-mediados/primeira-edicao", "O que a dança contemporânea tem a ver com isso"],
    ["/historico", "Uma linha feita de encontros"],
    ["/agenda", "Próximos encontros"],
    ["/menino-assum-preto", "Menino Assum Preto"],
  ];

  for (const [pathname, expectedCopy] of routes) {
    const response = await render(pathname);
    assert.equal(response.status, 200, pathname);
    const html = await response.text();
    assert.match(html, new RegExp(expectedCopy), pathname);
    assert.doesNotMatch(html, /class="archive-cta"/, pathname);
  }

  for (const pathname of ["/atividades-formativas/oficinas", "/atividades-formativas/residencia"]) {
    assert.equal((await render(pathname)).status, 404, pathname);
  }
});

test("server-renders English at translated URLs without a Portuguese first paint", async () => {
  const routes = [
    ["/en", "Flying"],
    ["/en/collective", "About Flying Low"],
    ["/en/performances", "Menino Assum Preto"],
    ["/en/performances/menino-assum-preto", "Menino Assum Preto"],
    ["/en/performances/the-footprints-of-kurupyra", "As Pegadas do Kurupyra"],
    ["/en/performances/revoada", "the leap or the fall"],
    ["/en/screen", "In Formation"],
    ["/en/screen/marginal-conceptions", "The margin as a place of invention."],
    ["/en/screen/in-formation", "In Formation"],
    ["/en/screen/even-in-the-trash-grows-flowers", "Flowers can grow even in the trash."],
    ["/en/screen/fighting-over-a-cap", "Between play and conflict."],
    ["/en/screen/songs-from-my-bundle", "Body, camera, and memory in motion."],
    ["/en/learning", "Voando com Flying Low"],
    ["/en/conversations", "Moderated conversations"],
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

  for (const pathname of ["/en/learning/workshops", "/en/learning/residency"]) {
    assert.equal((await render(pathname)).status, 404, pathname);
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

test("renders one primary heading for the collective and conversations pages", async () => {
  for (const [pathname, heading] of [
    ["/grupo", "Sobre o Flying Low"],
    ["/en/collective", "About Flying Low"],
    ["/debates-mediados", "Debates mediados"],
    ["/en/conversations", "Moderated conversations"],
  ]) {
    const html = await (await render(pathname)).text();
    assert.match(html, new RegExp(`<h1[^>]*>${heading}</h1>`), pathname);
    assert.equal((html.match(/<h1\b/g) ?? []).length, 1, pathname);
  }
});

test("lists both dance films directly under Audiovisual", async () => {
  for (const [pathname, projects, removedGroupPath] of [
    [
      "/audiovisual",
      [
        ["/audiovisual/mesmo-no-lixo-nascem-flores", "Em uma situação-limite"],
        ["/audiovisual/brigando-por-uma-touca", "Um jogo a dois"],
      ],
      "/audiovisual/videodancas",
    ],
    [
      "/en/screen",
      [
        ["/en/screen/even-in-the-trash-grows-flowers", "At a moment of crisis"],
        ["/en/screen/fighting-over-a-cap", "A duet in which the body turns conflict into dance"],
      ],
      "/en/screen/dance-films",
    ],
  ]) {
    const response = await render(pathname);
    assert.equal(response.status, 200, pathname);
    const html = await response.text();

    for (const [projectPath, expectedCopy] of projects) {
      assert.equal((html.match(new RegExp(`href="${projectPath}"`, "g")) ?? []).length, 3, projectPath);
      assert.match(html, new RegExp(expectedCopy), pathname);
    }

    assert.doesNotMatch(html, new RegExp(`href="${removedGroupPath}"`), pathname);
  }

  assert.equal((await render("/audiovisual/videodancas")).status, 404);
  assert.equal((await render("/en/screen/dance-films")).status, 404);
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
  const audiovisualHtml = await audiovisual.text();
  assert.match(audiovisualHtml, /class="performances-rail"/);
  assert.match(audiovisualHtml, /class="[^"]*\bperformances-page--audiovisual\b[^"]*"/);
  assert.doesNotMatch(audiovisualHtml, /class="collection-hero/);
});

test("keeps only the horizontal project section for moderated conversations", async () => {
  for (const [pathname, projectPath] of [
    ["/debates-mediados", "/debates-mediados/primeira-edicao"],
    ["/en/conversations", "/en/conversations/first-edition"],
  ]) {
    const response = await render(pathname);
    assert.equal(response.status, 200, pathname);
    const html = await response.text();
    assert.match(html, /class="collection-projects section-shell"/, pathname);
    assert.match(html, new RegExp(`href="${projectPath}"`), pathname);
    assert.doesNotMatch(html, /class="project-strip"/, pathname);
  }

  const audiovisual = await render("/audiovisual");
  assert.match(await audiovisual.text(), /class="performances-rail"/);
});

test("renders minimalist contact routes, footer socials, and localized navigation in both languages", async () => {
  for (const [pathname, pageName, mailLabel] of [
    ["/contato", "Contato", "producaoflyinglow@gmail.com"],
    ["/en/contact", "Contact", "producaoflyinglow@gmail.com"],
  ]) {
    const response = await render(pathname);
    assert.equal(response.status, 200, pathname);
    const html = await response.text();
    assert.match(html, new RegExp(`<h1[^>]*>${pageName}</h1>`), pathname);
    assert.doesNotMatch(html, /Vamos conversar\.|Let’s talk\./, pathname);
    assert.match(html, new RegExp(`href="mailto:${mailLabel}"`), pathname);
    assert.match(html, /https:\/\/www\.instagram\.com\/grupo_flyinglow\//);
    assert.match(html, /https:\/\/www\.youtube\.com\/@grupoflyinglow2473/);
    assert.match(html, /class="nav-actions"><div class="language-switch(?: [^"]*)?"/);
  }

  const home = await (await render("/")).text();
  assert.match(home, /https:\/\/www\.instagram\.com\/grupo_flyinglow\//);
  assert.match(home, /https:\/\/www\.youtube\.com\/@grupoflyinglow2473/);
  assert.match(home, /<nav class="desktop-nav"[^>]*>[\s\S]*href="\/contato">Contato<\/a>/);
  assert.match(home, /<nav class="menu-links"[^>]*>[\s\S]*href="\/contato"[^>]*>[\s\S]*<strong>Contato<\/strong>/);

  const performances = await (await render("/espetaculos")).text();
  assert.match(performances, /<nav class="desktop-nav"[^>]*>[\s\S]*aria-current="page" href="\/espetaculos">Espetáculos<\/a>/);
  assert.match(performances, /<nav class="menu-links"[^>]*>[\s\S]*aria-current="page" href="\/espetaculos"[^>]*>[\s\S]*<strong>Espetáculos<\/strong>/);

  const englishHome = await (await render("/en")).text();
  assert.match(englishHome, /<nav class="desktop-nav"[^>]*>[\s\S]*href="\/en\/contact">Contact<\/a>/);
  assert.match(englishHome, /<nav class="menu-links"[^>]*>[\s\S]*href="\/en\/contact"[^>]*>[\s\S]*<strong>Contact<\/strong>/);
});

test("renders the revised Grupo copy as paragraphs without retired research headlines", async () => {
  for (const [pathname, firstParagraph, lastParagraph, retiredHeading, retiredMembersHeading] of [
    ["/grupo", "Um coletivo de artistas das periferias de São Paulo que pesquisa o breaking como linguagem cênica", "Lai Machado na produção.", "O que move a pesquisa.", "Cinco artistas, uma criação compartilhada."],
    ["/en/collective", "A collective of artists from São Paulo’s peripheries that researches breaking as a performance language", "with Lai Machado in production.", "What drives the work.", "Five artists, one shared practice."],
  ]) {
    const html = await (await render(pathname)).text();
    assert.match(html, new RegExp(firstParagraph), pathname);
    assert.match(html, new RegExp(lastParagraph.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")), pathname);
    assert.doesNotMatch(html, new RegExp(retiredHeading.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")), pathname);
    assert.doesNotMatch(html, new RegExp(retiredMembersHeading.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")), pathname);
    const membersHeading = html.match(/class="members-heading">([\s\S]*?)<\/div>/)?.[1] ?? "";
    assert.equal((membersHeading.match(/<p>/g) ?? []).length, 5, pathname);
  }
});

test("uses the Em Formação thumbnail in the audiovisual chapter below the rail", async () => {
  for (const pathname of ["/audiovisual", "/en/screen"]) {
    const html = await (await render(pathname)).text();
    const chapters = html.split('class="performance-chapters"')[1] ?? "";
    assert.match(chapters, /href="\/(?:audiovisual\/em-formacao|en\/screen\/in-formation)"[\s\S]*src="\/images\/em-formacao-thumb\.webp"/, pathname);
  }
});

test("keeps the merged learning page focused on supplied and original programme copy", async () => {
  for (const [pathname, suppliedBody, workshopBody, residencyBody, retiredCopy] of [
    ["/atividades-formativas", "A atividade formativa “Voando com Flying Low” foi desenvolvida como um espaço de compartilhamento", "As oficinas partem da história, da cultura, da musicalidade e dos fundamentos do breaking.", "A residência parte das perguntas e experiências trazidas por cada grupo.", ["Da prática à criação coletiva.", "Solicitar proposta de formação", "Da primeira roda à criação autoral", "Do fundamento à autoria.", "Iniciante"]],
    ["/en/learning", "The learning activity “Voando com Flying Low” was developed as a space for sharing", "The workshops begin with breaking’s history, culture, musicality, and foundations.", "The residency begins with the questions and experiences brought by each group.", ["From practice to collective creation.", "Request a learning proposal", "From the first circle to original creation", "From foundations to authorship.", "Beginners"]],
  ]) {
    const html = await (await render(pathname)).text();
    assert.match(html, new RegExp(suppliedBody), pathname);
    assert.match(html, new RegExp(workshopBody), pathname);
    assert.match(html, new RegExp(residencyBody), pathname);
    for (const copy of retiredCopy) assert.doesNotMatch(html, new RegExp(copy.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")), pathname);
  }
});

test("renders Em Formação as two linked documentary seasons without the retired project-page blocks", async () => {
  const seasonData = [
    [
      "PLFCLbfPrGy7Wbtit0RQmJhksj-NRihhvP",
      ["5Yf23_6TWVU", "56FQgBwKDsI", "k5vjNCDuZts", "hqOcoKp8wlc", "Wsdpkyce1_Y", "3ZOSOa6V0IA", "eh1iFyy-bzQ"],
    ],
    [
      "PLFCLbfPrGy7X_yIP8OzFL0918sa-pLZgC",
      ["-faXk6Ccp3g", "26R16sgpr-w", "7iSXz5dzV6Y", "85kGhgSwF_U", "86Hs-faIxho", "T7lWm4UYQfo"],
    ],
  ];

  for (const [pathname, seasonLabels, removedCopy] of [
    ["/audiovisual/em-formacao", ["1ª temporada", "2ª temporada"], "Aprender também é produzir memória\."],
    ["/en/screen/in-formation", ["Season 1", "Season 2"], "Learning also produces memory\."],
  ]) {
    const response = await render(pathname);
    assert.equal(response.status, 200, pathname);
    const html = await response.text();
    assert.match(html, /class="[^"]*\bem-formacao-page\b[^"]*"/, pathname);
    assert.match(html, /class="[^"]*\bem-formacao-season\b[^"]*"/, pathname);
    assert.doesNotMatch(html, /class="[^"]*\bproject-hero-media\b[^"]*"/, pathname);
    assert.doesNotMatch(html, new RegExp(removedCopy), pathname);
    assert.doesNotMatch(html, /class="contact-band"/, pathname);

    for (const label of seasonLabels) assert.match(html, new RegExp(label), pathname);
    for (const [playlistId, episodes] of seasonData) {
      assert.match(html, new RegExp(`youtube\\.com/playlist\\?list=${playlistId}`), pathname);
      for (const [index, videoId] of episodes.entries()) {
        assert.match(html, new RegExp(`https://i\\.ytimg\\.com/vi/${videoId}/hqdefault\\.jpg`), pathname);
        assert.match(html, new RegExp(`watch\\?v=${videoId}&amp;list=${playlistId}&amp;index=${index + 1}`), pathname);
      }
    }
  }
});

test("gives every performance detail page an image hero without retired summaries or contact links", async () => {
  for (const [pathname, title, heroImage, removedSummary] of [
    ["/espetaculos/menino-assum-preto", "Menino Assum Preto", "/images/menino-assum-preto/menino-assum-preto-sarara-rodrigues-236.webp", "Um manifesto em movimento"],
    ["/espetaculos/as-pegadas-do-kurupyra", "As Pegadas do Kurupyra", "/images/kurupyra/kurupyra-317.webp", "Uma travessia guiada pelos encantados"],
    ["/espetaculos/revoada", "Em Revoada", "/images/em-revoada/em-revoada-cover.webp", "Estreia em 18 de setembro de 2026"],
    ["/en/performances/menino-assum-preto", "Menino Assum Preto", "/images/menino-assum-preto/menino-assum-preto-sarara-rodrigues-236.webp", "A manifesto in motion about labour"],
    ["/en/performances/the-footprints-of-kurupyra", "As Pegadas do Kurupyra", "/images/kurupyra/kurupyra-317.webp", "A journey guided by enchanted beings"],
    ["/en/performances/revoada", "Em Revoada", "/images/em-revoada/em-revoada-cover.webp", "Premieres on 18 September 2026"],
  ]) {
    const html = await (await render(pathname)).text();
    const bodyHtml = html.split("</head>")[1] ?? html;
    const heroCopy = bodyHtml.match(/class="section-shell project-hero-copy">([\s\S]*?)<\/div><div class="project-hero-media/)?.[1] ?? "";
    assert.match(html, new RegExp(`<h1>${title}</h1>`), pathname);
    assert.match(html, /class="[^"]*\bproject-hero-media\b[^"]*"/, pathname);
    assert.match(html, new RegExp('src="' + heroImage + '"'), pathname);
    assert.doesNotMatch(heroCopy, new RegExp(removedSummary), pathname);
    assert.doesNotMatch(html, /class="project-links"/, pathname);
  }

  for (const [pathname, youtubeId] of [
    ["/espetaculos/menino-assum-preto", "A244vRmQt8I"],
    ["/espetaculos/as-pegadas-do-kurupyra", "TQZI4t759ng"],
    ["/en/performances/menino-assum-preto", "A244vRmQt8I"],
    ["/en/performances/the-footprints-of-kurupyra", "TQZI4t759ng"],
  ]) {
    const html = await (await render(pathname)).text();
    assert.match(html, /class="project-teaser-card project-teaser-card--performance"/, pathname);
    assert.match(html, new RegExp("youtube\\.com/watch\\?v=" + youtubeId), pathname);
    const heroIndex = html.indexOf('class="project-hero"');
    const teaserIndex = html.indexOf('class="project-performance-teaser"');
    assert.ok(heroIndex >= 0 && teaserIndex > heroIndex, `${pathname} teaser follows the hero`);
  }

  for (const pathname of ["/espetaculos/revoada", "/en/performances/revoada"]) {
    const html = await (await render(pathname)).text();
    assert.doesNotMatch(html, /project-teaser-card--performance/, pathname);
  }
});

test("renders clickable video thumbnails, Kurupyra photo credits, and full technical sheets", async () => {
  const kurupyra = await render("/espetaculos/as-pegadas-do-kurupyra");
  assert.equal(kurupyra.status, 200);
  const kurupyraHtml = await kurupyra.text();
  assert.match(kurupyraHtml, /class="project-teaser-card project-teaser-card--performance" href="https:\/\/www\.youtube\.com\/watch\?v=TQZI4t759ng" target="_blank" rel="noreferrer"/);
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
  assert.match(meninoHtml, /Inspirado na canção emblemática[\s\S]*Assum Preto/);
  assert.match(meninoHtml, /Desde sua estreia em 2019, o espetáculo circula por festivais e espaços culturais/);
  for (const filename of [
    "menino-assum-preto-fundacao-cultural-cassiano-ricardo-1.webp",
    "menino-assum-preto-fundacao-cultural-cassiano-ricardo-2.webp",
    "menino-assum-preto-fundacao-cultural-cassiano-ricardo-3.webp",
    "menino-assum-preto-sarara-rodrigues-130.webp",
    "menino-assum-preto-sarara-rodrigues-2-2024.webp",
    "menino-assum-preto-sarara-rodrigues-2.webp",
    "menino-assum-preto-sarara-rodrigues-236.webp",
    "menino-assum-preto-sarara-rodrigues-26.webp",
    "menino-assum-preto-sarara-rodrigues-27-corte.webp",
    "menino-assum-preto-sarara-rodrigues-331.webp",
    "menino-assum-preto-sarara-rodrigues-358.webp",
    "menino-assum-preto-sarara-rodrigues-396.webp",
    "menino-assum-preto-sarara-rodrigues-543.webp",
    "menino-assum-preto-sarara-rodrigues-7.webp",
  ]) assert.match(meninoHtml, new RegExp(filename.replaceAll(".", "\\.")));
  assert.match(meninoHtml, /Foto · Sarará Rodrigues/);
  assert.match(meninoHtml, /Acervo · Fundação Cultural Cassiano Ricardo/);
  for (const [filename, width, height, loading] of [
    ["assum-01.webp", 1920, 1080, "lazy"],
    ["assum-02.webp", 1920, 1080, "lazy"],
    ["assum-03.webp", 1920, 1080, "lazy"],
    ["assum-04.webp", 3235, 2537, "lazy"],
    ["assum-05.webp", 5000, 3333, "lazy"],
  ]) {
    const source = "/images/menino-assum-preto/" + filename;
    const imageTag = new RegExp('<img(?=[^>]*src="' + source + '")(?=[^>]*width="' + width + '")(?=[^>]*height="' + height + '")(?=[^>]*loading="' + loading + '")[^>]*>');
    assert.match(meninoHtml, imageTag, source);
  }
  assert.match(meninoHtml, /Ficha técnica/);
  assert.match(meninoHtml, /Emersu \(Emerson S\. Oliveira\)/);
  assert.match(meninoHtml, /Fioot \(Jeff dos Santos Rodrigues\)/);
  assert.match(meninoHtml, /Turtle Lee \(Lee Anderson\)/);
  assert.match(meninoHtml, /Design de luz/);
  assert.match(meninoHtml, /Bruna Tovian/);
  assert.doesNotMatch(meninoHtml, /Luciana Gandelini|Restauração de figurino/);

  const meninoEnglishHtml = await (await render("/en/performances/menino-assum-preto")).text();
  assert.match(meninoEnglishHtml, /Photo · Sarará Rodrigues/);
  assert.match(meninoEnglishHtml, /Archive · Fundação Cultural Cassiano Ricardo/);

  const revoada = await render("/espetaculos/revoada");
  const revoadaHtml = await revoada.text();
  assert.doesNotMatch(revoadaHtml, /Ficha técnica em atualização\./);
  assert.match(revoadaHtml, /src="\/images\/em-revoada\/em-revoada-cover\.webp"/);
  assert.match(revoadaHtml, /20h às quintas, sextas e sábados · 18h aos domingos/);

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
  assert.doesNotMatch(evenTrashHtml, /even-trash-youtube\.webp/);
  assert.doesNotMatch(evenTrashHtml, /youtube-nocookie\.com\/embed\/HlWvODEryF4/);
  assert.match(evenTrashHtml, /even-trash-hero\.webp/);
  assert.match(evenTrashHtml, /even-trash-wide\.webp/);
  for (const stillId of ["01", "02", "03", "04", "05"]) {
    assert.match(evenTrashHtml, new RegExp(`even-trash-${stillId}\\.webp`));
  }
  assert.match(evenTrashHtml, /Stills do filme/);
  assert.match(evenTrashHtml, /Koide Ura e Lee Anderson/);
  assert.match(evenTrashHtml, /Tiago Penalva e Rafaela Maciel/);
  assert.match(evenTrashHtml, /class="project-back" href="\/audiovisual">← (?:<!-- -->)?Audiovisual<\/a>/);
  assert.match(evenTrashHtml, /href="\/audiovisual\/brigando-por-uma-touca"><span>Próximo<\/span><strong>Brigando por uma touca(?:<!-- -->)? →<\/strong><\/a>/);

  const evenTrashEnglish = await render("/en/screen/even-in-the-trash-grows-flowers");
  const evenTrashEnglishHtml = await evenTrashEnglish.text();
  assert.match(evenTrashEnglishHtml, /Flowers can grow even in the trash\./);
  assert.match(evenTrashEnglishHtml, /Film stills/);
  assert.match(evenTrashEnglishHtml, /href="\/audiovisual\/mesmo-no-lixo-nascem-flores" hrefLang="pt-BR"/);
  assert.match(evenTrashEnglishHtml, /href="\/en\/screen\/fighting-over-a-cap"><span>Next<\/span><strong>Fighting Over a Cap(?:<!-- -->)? →<\/strong><\/a>/);

  const fightingOverACap = await render("/audiovisual/brigando-por-uma-touca");
  const fightingOverACapHtml = await fightingOverACap.text();
  assert.match(fightingOverACapHtml, /class="project-teaser-card" href="https:\/\/www\.youtube\.com\/watch\?v=6m865ISf3to" target="_blank" rel="noreferrer"/);
  assert.match(fightingOverACapHtml, /src="\/images\/fighting-over-a-cap\/fighting-over-a-cap-youtube\.webp"/);
  assert.match(fightingOverACapHtml, /Jeff dos Santos Rodrigues \(Fioot\) e Gustavo Teles Fagundes/);
  assert.match(fightingOverACapHtml, /href="\/audiovisual\/mesmo-no-lixo-nascem-flores"><span>Anterior<\/span><strong>← (?:<!-- -->)?Até no lixo crescem flores<\/strong><\/a>/);

  const cantigas = await render("/audiovisual/cantigas-do-meu-matulao");
  assert.match(await cantigas.text(), /<meta name="robots" content="noindex, nofollow"\/>/);
  assert.doesNotMatch(evenTrashHtml, /<meta name="robots" content="noindex, nofollow"\/>/);
  assert.doesNotMatch(fightingOverACapHtml, /<meta name="robots" content="noindex, nofollow"\/>/);
});

test("merges the learning offer into its parent and removes the old collection headlines", async () => {
  for (const [pathname, expectedCopy, removedHeadline] of [
    ["/atividades-formativas", "Voando com Flying Low", "Aprender em roda"],
    ["/en/learning", "Voando com Flying Low", "Learn in a circle"],
  ]) {
    const response = await render(pathname);
    assert.equal(response.status, 200, pathname);
    const html = await response.text();
    assert.match(html, new RegExp(expectedCopy), pathname);
    assert.match(html, /(?:stance|top rock|go downs|footwork)/i, pathname);
    assert.doesNotMatch(html, new RegExp(removedHeadline), pathname);
    assert.doesNotMatch(html, /href="(?:\/en)?\/(?:atividades-formativas|learning)\/(?:oficinas|workshops|residencia|residency)"/, pathname);
  }

  for (const pathname of ["/atividades-formativas/oficinas", "/atividades-formativas/residencia", "/en/learning/workshops", "/en/learning/residency"]) {
    assert.equal((await render(pathname)).status, 404, pathname);
  }

  for (const [pathname, removedHeadline] of [
    ["/grupo", "Cinco artistas, uma criação compartilhada"],
    ["/en/collective", "Five artists, one shared practice"],
    ["/debates-mediados", "A conversa continua"],
    ["/en/conversations", "The conversation continues after the stage"],
  ]) {
    assert.doesNotMatch(await (await render(pathname)).text(), new RegExp(removedHeadline), pathname);
  }
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
  assert.match(editorial, /Works born from body and territory/);
  assert.doesNotMatch(editorial, /A primeira faixa|a rolagem abre|opening strip|scrolling unfolds|Duas temporadas documentais|Duas videodanças|Two documentary seasons|gathered on one page|seleção inicial|initial selection/i);
  assert.doesNotMatch(editorial, /videodancas:/);
  assert.doesNotMatch(routes, /screenVideodances|\/audiovisual\/videodancas|\/en\/screen\/dance-films/);
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
  assert.doesNotMatch(provider, /localStorage|useSyncExternalStore|document\.documentElement\.lang/);
  assert.match(provider, /locale: Locale/);
  assert.match(routes, /en: "\/en\/performances\/the-footprints-of-kurupyra"/);
  assert.match(routes, /en: "\/en\/screen\/marginal-conceptions"/);
  assert.match(routes, /en: "\/en\/screen\/even-in-the-trash-grows-flowers"/);
  assert.doesNotMatch(routes, /learningWorkshops|learningResidency|\/en\/learning\/(?:workshops|residency)/);
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


test("publishes Em Revoada first with all six images, individual credits and the complete technical sheet", async () => {
  const expectedImages = [
    "em-revoada-hernandes-06.webp", "em-revoada-ricardo-ura.jpg", "em-revoada-hernandes-02.webp",
    "em-revoada-hernandes-11.webp", "em-revoada-hernandes-05.webp", "em-revoada-season.jpg",
  ];
  for (const [collectionPath, detailPath, groupPath, english] of [
    ["/espetaculos", "/espetaculos/revoada", "/grupo", false],
    ["/en/performances", "/en/performances/revoada", "/en/collective", true],
  ]) {
    const collection = await (await render(collectionPath)).text();
    const covers = [...collection.matchAll(/class="performance-cover(?: [^"]*)?" href="([^"]+)"/g)].map((match) => match[1]);
    assert.equal(covers[0], detailPath);
    const detail = await (await render(detailPath)).text();
    assert.match(detail, /<h1>Em Revoada<\/h1>/);
    assert.ok(detail.includes(english ? "the leap or the fall?" : "o salto ou a queda?"));
    const gallery = detail.match(/class="project-gallery-grid">([\s\S]*?)<\/section>/)?.[1] ?? "";
    const figures = [...gallery.matchAll(/<figure[^>]*>([\s\S]*?)<\/figure>/g)].map((match) => match[1]);
    assert.equal(figures.length, 6);
    for (const [index, figure] of figures.entries()) {
      assert.ok(figure.includes(`/images/em-revoada/${expectedImages[index]}`));
      assert.match(figure, /loading="lazy"/);
      if (index === 5) assert.doesNotMatch(figure, /figcaption/);
      else assert.ok(figure.includes(index === 1 ? "Design · Ricardo Ura" : "Hernandes · @ronyhernandes"));
    }
    const credits = detail.match(/class="project-credits-list">([\s\S]*?)<\/dl>/)?.[1] ?? "";
    assert.equal((credits.match(/class="project-credit-row"/g) ?? []).length, 21);
    for (const name of ["Clara Prates", "Gustavo Zanela", "Bruna Tovian", "Willian Sampaio", "Aimé Césaire", "Incluir Pela Arte", "Marrese Assessoria", "Lai Machado | Monstra Produções", "Ana Carolina Yamamoto", "Zeme Produções Artísticas"]) assert.ok(credits.includes(name), name);
    assert.ok(detail.includes(english ? "All ages" : "Livre"));
    assert.doesNotMatch(detail, /Em atualização|Being updated|Registros em atualização/);
    const group = await (await render(groupPath)).text();
    assert.ok(group.includes(english ? "Founded in 2016 at Núcleo Luz by Lee Anderson and Eddie Guedes" : "Formado em 2016 no Núcleo Luz por Lee Anderson e Eddie Guedes"));
    assert.ok(group.includes(english ? "VAI Programme in 2018" : "Programa VAI em 2018"));
  }
  for (const filename of expectedImages) {
    const bytes = await readFile(new URL(`../public/images/em-revoada/${filename}`, import.meta.url));
    assert.ok(bytes.length > 1000, filename);
  }
});
