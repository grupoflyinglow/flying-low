import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import { LocaleProvider } from "./components/LocaleProvider";
import { SiteFooter } from "./components/SiteFooter";
import { DEFAULT_LOCALE, messages, type Locale } from "./i18n";
import {
  localeFromPathname,
  routeFor,
  routeKeyFromPathname,
} from "./route-localization";
import "./globals.css";

function localeFromHeaders(requestHeaders: Pick<Headers, "get">): Locale {
  const pathname = requestHeaders.get("x-flying-low-pathname");
  if (pathname) return localeFromPathname(pathname);
  return requestHeaders.get("x-flying-low-locale") === "en" ? "en" : DEFAULT_LOCALE;
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
  const copy = messages[locale].meta;
  const pathname = requestHeaders.get("x-flying-low-pathname") || routeFor(locale, "home");
  const routeKey = routeKeyFromPathname(pathname) || "home";
  const portugueseUrl = new URL(routeFor("pt-BR", routeKey), origin);
  const englishUrl = new URL(routeFor("en", routeKey), origin);
  const canonicalUrl = locale === "en" ? englishUrl : portugueseUrl;

  return {
    title: copy.title,
    description: copy.description,
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
      title: copy.title,
      description: copy.description,
      locale: copy.openGraphLocale,
      type: "website",
      url: canonicalUrl,
      images: [{ url: socialImage, width: 1200, height: 630, alt: copy.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: copy.title,
      description: copy.description,
      images: [socialImage],
    },
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
