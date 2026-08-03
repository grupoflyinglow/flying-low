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
  assert.match(html, /aria-label="Português"[^>]+aria-pressed="true"/);
  assert.match(html, /aria-label="Inglês"[^>]+aria-pressed="false"/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton|Your site is taking shape/i);
});

test("server-renders every portfolio route in Portuguese", async () => {
  const routes = [
    ["/grupo", "Entre margens"],
    ["/cenicas", "Corpos em cena"],
    ["/audiovisual", "Quando a câmera"],
    ["/formacao", "Aprender em roda"],
    ["/menino-assum-preto", "O pássaro aprisionado"],
  ];

  for (const [pathname, expectedCopy] of routes) {
    const response = await render(pathname);
    assert.equal(response.status, 200, pathname);
    assert.match(await response.text(), new RegExp(expectedCopy), pathname);
  }
});

test("keeps complete Portuguese and English copy in one typed dictionary", async () => {
  const i18n = await readFile(new URL("../app/i18n.ts", import.meta.url), "utf8");
  const provider = await readFile(new URL("../app/components/LocaleProvider.tsx", import.meta.url), "utf8");

  assert.match(i18n, /DEFAULT_LOCALE: Locale = "pt-BR"/);
  assert.match(i18n, /Dance from São Paulo’s peripheries/);
  assert.match(i18n, /Bodies on stage\./);
  assert.match(i18n, /When the camera/);
  assert.match(i18n, /Learn in a circle\./);
  assert.match(i18n, /The captive bird meets the urban worker\./);
  assert.match(provider, /window\.localStorage\.setItem/);
  assert.match(provider, /document\.documentElement\.lang = locale/);
});
