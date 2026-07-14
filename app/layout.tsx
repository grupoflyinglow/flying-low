import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Flying Low — dança, cena e imagem",
  description: "Flying Low é um coletivo de cinco intérpretes-criadores em atividade desde 2016.",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
