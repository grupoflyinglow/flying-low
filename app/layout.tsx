import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import { LocaleProvider } from "./components/LocaleProvider";
import { SiteFooter } from "./components/SiteFooter";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host")?.split(",")[0]?.trim()
    || requestHeaders.get("host")
    || "flying-low-dance.vtrpldn.chatgpt.site";
  const protocol = requestHeaders.get("x-forwarded-proto")?.split(",")[0]?.trim()
    || (host.startsWith("localhost") ? "http" : "https");
  const socialImage = new URL("/og.png", `${protocol}://${host}`).toString();

  return {
    title: "Flying Low — dança, cena e imagem",
    description: "Flying Low é um coletivo de cinco intérpretes-criadores das periferias de São Paulo.",
    icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
    openGraph: {
      title: "Flying Low — dança, cena e imagem",
      description: "Flying Low é um coletivo de cinco intérpretes-criadores das periferias de São Paulo.",
      locale: "pt_BR",
      type: "website",
      images: [{ url: socialImage, width: 1200, height: 630, alt: "Flying Low — dança, cena e imagem" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Flying Low — dança, cena e imagem",
      description: "Flying Low é um coletivo de cinco intérpretes-criadores das periferias de São Paulo.",
      images: [socialImage],
    },
  };
}

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#0b0b0b",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>
        <a className="skip-link" href="#main-content">Pular para o conteúdo</a>
        <LocaleProvider>{children}<SiteFooter /></LocaleProvider>
      </body>
    </html>
  );
}
