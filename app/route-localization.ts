import type { Locale } from "./i18n";

export type RouteKey =
  | "home"
  | "group"
  | "performances"
  | "performanceMenino"
  | "performanceKurupyra"
  | "performanceRevoada"
  | "screen"
  | "screenConcepcoes"
  | "screenEmFormacao"
  | "screenVideodances"
  | "screenEvenTrash"
  | "screenFightingOverACap"
  | "screenCantigas"
  | "learning"
  | "learningWorkshops"
  | "learningResidency"
  | "debates"
  | "debateFirstEdition"
  | "history"
  | "agenda";

export const localizedRoutes: Record<RouteKey, Record<Locale, string>> = {
  home: { "pt-BR": "/", en: "/en" },
  group: { "pt-BR": "/grupo", en: "/en/collective" },
  performances: { "pt-BR": "/espetaculos", en: "/en/performances" },
  performanceMenino: {
    "pt-BR": "/espetaculos/menino-assum-preto",
    en: "/en/performances/menino-assum-preto",
  },
  performanceKurupyra: {
    "pt-BR": "/espetaculos/as-pegadas-do-kurupyra",
    en: "/en/performances/the-footprints-of-kurupyra",
  },
  performanceRevoada: {
    "pt-BR": "/espetaculos/revoada",
    en: "/en/performances/revoada",
  },
  screen: { "pt-BR": "/audiovisual", en: "/en/screen" },
  screenConcepcoes: {
    "pt-BR": "/audiovisual/concepcoes-marginais",
    en: "/en/screen/marginal-conceptions",
  },
  screenEmFormacao: {
    "pt-BR": "/audiovisual/em-formacao",
    en: "/en/screen/in-formation",
  },
  screenVideodances: {
    "pt-BR": "/audiovisual/videodancas",
    en: "/en/screen/dance-films",
  },
  screenEvenTrash: {
    "pt-BR": "/audiovisual/mesmo-no-lixo-nascem-flores",
    en: "/en/screen/even-in-the-trash-grows-flowers",
  },
  screenFightingOverACap: {
    "pt-BR": "/audiovisual/brigando-por-uma-touca",
    en: "/en/screen/fighting-over-a-cap",
  },
  screenCantigas: {
    "pt-BR": "/audiovisual/cantigas-do-meu-matulao",
    en: "/en/screen/songs-from-my-bundle",
  },
  learning: { "pt-BR": "/atividades-formativas", en: "/en/learning" },
  learningWorkshops: {
    "pt-BR": "/atividades-formativas/oficinas",
    en: "/en/learning/workshops",
  },
  learningResidency: {
    "pt-BR": "/atividades-formativas/residencia",
    en: "/en/learning/residency",
  },
  debates: { "pt-BR": "/debates-mediados", en: "/en/conversations" },
  debateFirstEdition: {
    "pt-BR": "/debates-mediados/primeira-edicao",
    en: "/en/conversations/first-edition",
  },
  history: { "pt-BR": "/historico", en: "/en/history" },
  agenda: { "pt-BR": "/agenda", en: "/en/agenda" },
};

const routeAliases: Record<string, RouteKey> = {
  "/cenicas": "performances",
  "/formacao": "learning",
  "/menino-assum-preto": "performanceMenino",
};

const routeEntries = Object.entries(localizedRoutes) as Array<
  [RouteKey, Record<Locale, string>]
>;

function normalizePathname(pathname: string) {
  if (pathname === "/") return pathname;
  return pathname.replace(/\/+$/, "") || "/";
}

export function localeFromPathname(pathname: string): Locale {
  const normalizedPathname = normalizePathname(pathname);
  return normalizedPathname === "/en" || normalizedPathname.startsWith("/en/")
    ? "en"
    : "pt-BR";
}

export function routeFor(locale: Locale, routeKey: RouteKey) {
  return localizedRoutes[routeKey][locale];
}

export function routeKeyFromPathname(pathname: string): RouteKey | null {
  const normalizedPathname = normalizePathname(pathname);
  const alias = routeAliases[normalizedPathname];
  if (alias) return alias;

  for (const [routeKey, routes] of routeEntries) {
    if (routes["pt-BR"] === normalizedPathname || routes.en === normalizedPathname) {
      return routeKey;
    }
  }

  return null;
}

export function alternateLocalePath(pathname: string, locale: Locale) {
  const routeKey = routeKeyFromPathname(pathname);
  return routeKey ? routeFor(locale, routeKey) : routeFor(locale, "home");
}
