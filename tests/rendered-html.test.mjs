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
  assert.match(html, /aria-label="Português"[^>]+aria-pressed="true"/);
  assert.match(html, /aria-label="Inglês"[^>]+aria-pressed="false"/);
  assert.match(html, /<nav class="desktop-nav" aria-label="Navegação principal"/);
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
  assert.match(home, /Endereço a confirmar/);
  assert.match(home, /Horário a confirmar/);
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
  assert.match(agenda, /class="agenda-date-time">19h/);
  assert.match(agenda, /class="agenda-event-address">Rua Ana Cintra, 213/);
  assert.match(agenda, /Local a confirmar/);
  assert.match(agenda, /Menino Assum Preto/);
});

test("server-renders the complete information architecture in Portuguese", async () => {
  const routes = [
    ["/grupo", "Cinco trajetórias"],
    ["/espetaculos", "Menino Assum Preto"],
    ["/espetaculos/menino-assum-preto", "O pássaro aprisionado"],
    ["/espetaculos/as-pegadas-do-kurupyra", "Rastros de um território vivo"],
    ["/espetaculos/revoada", "ainda está encontrando sua forma"],
    ["/audiovisual", "A câmera também entra na roda"],
    ["/audiovisual/concepcoes-marginais", "A margem como lugar de invenção"],
    ["/audiovisual/em-formacao", "Aprender também é produzir memória"],
    ["/audiovisual/cantigas-do-meu-matulao", "Corpo, câmera e memória"],
    ["/atividades-formativas", "Aprender em roda"],
    ["/atividades-formativas/oficinas", "Três entradas"],
    ["/atividades-formativas/residencia", "surgimento de uma obra"],
    ["/debates-mediados", "A conversa continua"],
    ["/debates-mediados/primeira-edicao", "continuar o que a cena começou"],
    ["/historico", "Uma linha feita de encontros"],
    ["/agenda", "Próximos encontros"],
    ["/menino-assum-preto", "O pássaro aprisionado"],
  ];

  for (const [pathname, expectedCopy] of routes) {
    const response = await render(pathname);
    assert.equal(response.status, 200, pathname);
    const html = await response.text();
    assert.match(html, new RegExp(expectedCopy), pathname);
    assert.doesNotMatch(html, /class="archive-cta"/, pathname);
  }
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

test("keeps complete Portuguese and English copy in one typed dictionary", async () => {
  const i18n = await readFile(new URL("../app/i18n.ts", import.meta.url), "utf8");
  const editorial = await readFile(new URL("../app/editorial-content.ts", import.meta.url), "utf8");
  const provider = await readFile(new URL("../app/components/LocaleProvider.tsx", import.meta.url), "utf8");

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
  assert.match(editorial, /Turtle Lee/);
  assert.match(editorial, /Fioot/);
  assert.match(editorial, /Manuel Victor/);
  assert.match(editorial, /Emersu/);
  assert.match(editorial, /Ricardo Ura/);
  assert.match(editorial, /@grupo_flyinglow/);
  assert.match(editorial, /label: "premiere on the 18th"/);
  assert.match(editorial, /day: "15—18", weekday: "Thursday to Sunday", month: "October", time: "Time to be confirmed"/);
  assert.match(editorial, /address: "Address to be confirmed"/);
  assert.match(editorial, /Venue to be confirmed/);
  assert.match(provider, /window\.localStorage\.setItem/);
  assert.match(provider, /document\.documentElement\.lang = locale/);
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
  assert.match(css, /:where\(a, button\):focus-visible/);
  assert.match(css, /\.menu-button\s*\{\s*display:\s*none/);
  assert.match(css, /\.desktop-nav\s*\{\s*display:\s*none/);
  assert.match(css, /overscroll-behavior:\s*contain/);
  assert.match(css, /@media \(prefers-reduced-motion:\s*reduce\)/);
  assert.match(css, /\.hero-primary-cta\s*\{[^}]*background:\s*var\(--paper\)/);
  assert.match(css, /\.hero-primary-cta:hover\s*\{[^}]*background:\s*var\(--red\)/);
  assert.match(css, /\.agenda-date-day\s*\{[^}]*font-size:\s*clamp\(38px/);
  assert.match(css, /\.hero-primary-cta:hover\s*\{\s*transform:\s*none/);
  assert.match(home, /useSyncExternalStore/);
  assert.match(home, /!prefersReducedMotion/);
  assert.match(layout, /themeColor:\s*"#0b0b0b"/);
});
