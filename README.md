# Flying Low

Site institucional bilíngue do Grupo Flying Low. O projeto usa Next.js App
Router com React, compilado por Vinext/Vite para execução em Cloudflare
Workers.

## Rodar localmente

Requer Node.js `>=22.13.0`.

```bash
npm install
npm run dev
```

Use a URL impressa pelo Vite; a porta pode mudar se a padrão estiver ocupada.

## Validar mudanças

```bash
npm run lint
npx tsc --noEmit
npm test
```

`npm test` cria o build e executa testes de renderização server-side contra o
Worker compilado. Para mudanças visuais ou interativas, abra as rotas afetadas
em português e inglês no navegador e confira pelo menos celular e desktop.

## Onde editar

| Mudança | Fonte principal |
| --- | --- |
| Textos de navegação, home e interface | [`app/i18n.ts`](app/i18n.ts) |
| Projetos, coleções, agenda, histórico e mídia | [`app/editorial-content.ts`](app/editorial-content.ts) |
| URLs equivalentes em PT/EN e aliases | [`app/route-localization.ts`](app/route-localization.ts) |
| Metadados, canonical, hreflang e noindex | [`app/layout.tsx`](app/layout.tsx) |
| Componentes compartilhados | [`app/components/`](app/components/) |
| Estilos e breakpoints | [`app/globals.css`](app/globals.css) |
| Imagens e dimensões intrínsecas | [`public/`](public/) e [`app/image-dimensions.ts`](app/image-dimensions.ts) |

O mapa completo de arquitetura, rotas e fluxos de mudança está em
[`docs/CODEBASE_MAP.md`](docs/CODEBASE_MAP.md).

## Runtime e deploy

- [`proxy.ts`](proxy.ts) deriva locale e pathname antes da renderização.
- [`worker/index.ts`](worker/index.ts) é a entrada Cloudflare e também atende a
  otimização de imagens.
- [`vite.config.ts`](vite.config.ts) conecta Vinext, Sites e Cloudflare.
- [`.openai/hosting.json`](.openai/hosting.json) identifica o projeto hospedado;
  D1 e R2 não estão ativos.
- Não há script de deploy neste repositório: o build produz `dist/` compatível
  com Sites, e a publicação pertence ao ambiente externo de hospedagem.
- `db/`, `drizzle/` e `examples/d1/` são scaffolds opcionais e não fazem parte do
  site público atual.
