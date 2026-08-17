import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import { LocaleProvider } from "./components/LocaleProvider";
import { SiteFooter } from "./components/SiteFooter";
import { getEditorialContent, type CollectionKey, type ProjectKey } from "./editorial-content";
import { DEFAULT_LOCALE, messages, type Locale } from "./i18n";
import {
  localeFromPathname,
  routeFor,
  routeKeyFromPathname,
  type RouteKey,
} from "./route-localization";
import "./globals.css";

const collectionKeyByRoute: Partial<Record<RouteKey, CollectionKey>> = {
  performances: "espetaculos",
  screen: "audiovisual",
  learning: "formacao",
  debates: "debates",
};

const projectKeyByRoute: Partial<Record<RouteKey, ProjectKey>> = {
  performanceMenino: "meninoAssumPreto",
  performanceKurupyra: "kurupyra",
  performanceRevoada: "revoada",
  screenConcepcoes: "concepcoesMarginais",
  screenEmFormacao: "emFormacao",
  screenVideodances: "videodancas",
  screenEvenTrash: "evenInTheTrash",
  screenFightingOverACap: "fightingOverACap",
  screenCantigas: "cantigas",
  learningWorkshops: "oficinas",
  learningResidency: "residencia",
  debateFirstEdition: "debatePrimeiraEdicao",
};

const noIndexRouteKeys = new Set<RouteKey>([
  "history",
  "screenCantigas",
]);

function localeFromHeaders(requestHeaders: Pick<Headers, "get">): Locale {
  const pathname = requestHeaders.get("x-flying-low-pathname");
  if (pathname) return localeFromPathname(pathname);
  return requestHeaders.get("x-flying-low-locale") === "en" ? "en" : DEFAULT_LOCALE;
}

function pageMetadata(locale: Locale, routeKey: RouteKey) {
  const copy = messages[locale];
  const content = getEditorialContent(locale);
  const projectKey = projectKeyByRoute[routeKey];

  if (projectKey) {
    const project = content.projects[projectKey];
    return { title: project.title, description: project.summary };
  }

  const collectionKey = collectionKeyByRoute[routeKey];
  if (collectionKey) {
    const collection = content.collections[collectionKey];
    return { title: collection.eyebrow, description: collection.intro };
  }

  switch (routeKey) {
    case "group":
      return { title: copy.nav.group, description: copy.group.intro };
    case "history":
      return { title: content.history.eyebrow, description: content.history.intro };
    case "agenda":
      return { title: content.agenda.eyebrow, description: content.agenda.intro };
    default:
      return copy.meta;
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host")?.split(",")[0]?.trim()
    || requestHeaders.get("host")
    || "flying-low-dance.vtrpldn.chatgpt.site";
  const protocol = requestHeaders.get("x-forwarded-proto")?.split(",")[0]?.trim()
    || (host.startsWith("localhost") ? "http" : "https");
  const origin = `${protocol}://${host}`;
  const socialImage = new URL("/og.png", origin).toString();
  const locale = localeFromHeaders(requestHeaders);
  const pathname = requestHeaders.get("x-flying-low-pathname") || routeFor(locale, "home");
  const routeKey = routeKeyFromPathname(pathname) || "home";
  const page = pageMetadata(locale, routeKey);
  const siteTitle = messages[locale].meta.title;
  const title = routeKey === "home" ? siteTitle : `${page.title} | Flying Low`;
  const portugueseUrl = new URL(routeFor("pt-BR", routeKey), origin);
  const englishUrl = new URL(routeFor("en", routeKey), origin);
  const canonicalUrl = locale === "en" ? englishUrl : portugueseUrl;

  return {
    title,
    description: page.description,
    icons: {
      icon: [{ url: "/brand/favicon.png", type: "image/png", sizes: "192x192" }],
      shortcut: "/brand/favicon.png",
      apple: [{ url: "/brand/app-icon.png", type: "image/png", sizes: "512x512" }],
    },
    alternates: {
      canonical: canonicalUrl,
      languages: {
        "pt-BR": portugueseUrl,
        en: englishUrl,
        "x-default": portugueseUrl,
      },
    },
    openGraph: {
      title,
      description: page.description,
      locale: messages[locale].meta.openGraphLocale,
      type: "website",
      url: canonicalUrl,
      images: [{ url: socialImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: page.description,
      images: [socialImage],
    },
    robots: noIndexRouteKeys.has(routeKey) ? { index: false, follow: false } : undefined,
  };
}

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#0b0b0b",
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const requestHeaders = await headers();
  const locale = localeFromHeaders(requestHeaders);
  const copy = messages[locale];

  return (
    <html lang={locale}>
      <body>
        <a className="skip-link" href="#main-content">{copy.nav.skipToContent}</a>
        <LocaleProvider locale={locale}>{children}<SiteFooter /></LocaleProvider>
      </body>
    </html>
  );
}
