"use client";

/* eslint-disable @next/next/no-html-link-for-pages */
import { useEffect, useRef, useState } from "react";
import { useLocale } from "./LocaleProvider";

function LanguageSwitch({ className = "" }: { className?: string }) {
  const { locale, setLocale, t } = useLocale();

  return (
    <div className={`language-switch ${className}`} role="group" aria-label={t.nav.languageSelector}>
      <button type="button" aria-label={t.nav.portuguese} aria-pressed={locale === "pt-BR"} onClick={() => setLocale("pt-BR")}>PT</button>
      <span aria-hidden="true">/</span>
      <button type="button" aria-label={t.nav.english} aria-pressed={locale === "en"} onClick={() => setLocale("en")}>EN</button>
    </div>
  );
}

export function SiteNav({ light = false }: { light?: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDialogElement>(null);
  const { t } = useLocale();
  const items = [
    { href: "/grupo", label: t.nav.group },
    { href: "/espetaculos", label: t.nav.stage },
    { href: "/audiovisual", label: t.nav.screen },
    { href: "/atividades-formativas", label: t.nav.learning },
    { href: "/debates-mediados", label: t.nav.debates },
    { href: "/historico", label: t.nav.history },
    { href: "/agenda", label: t.nav.agenda },
  ];

  useEffect(() => {
    const dialog = menuRef.current;
    if (!dialog) return;
    if (menuOpen && !dialog.open) dialog.showModal();
    if (!menuOpen && dialog.open) dialog.close();
    return () => { if (dialog.open) dialog.close(); };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={`site-nav ${light ? "site-nav-light" : ""}`}>
      <a className="wordmark" href="/" aria-label={t.nav.homeAria}>FL</a>
      <div className="nav-actions">
        <LanguageSwitch />
        <button className="menu-button" type="button" aria-controls="site-menu" aria-expanded={menuOpen} onClick={() => setMenuOpen(true)}>
          {t.nav.menu}<span aria-hidden="true">＋</span>
        </button>
      </div>

      <dialog className="menu-dialog" id="site-menu" ref={menuRef} aria-label={t.nav.mainMenu} onClose={closeMenu} onCancel={closeMenu}>
        <div className="menu-dialog-inner">
          <div className="menu-head">
            <a className="footer-wordmark" href="/" onClick={closeMenu} aria-label={t.nav.homeAria}>FL</a>
            <button className="menu-close" type="button" onClick={closeMenu}>{t.nav.close} <span aria-hidden="true">×</span></button>
          </div>
          <nav className="menu-links" aria-label={t.nav.mainMenu}>
            {items.map((item, index) => (
              <a href={item.href} key={item.href} onClick={closeMenu}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{item.label}</strong>
              </a>
            ))}
          </nav>
          <div className="menu-foot">
            <LanguageSwitch />
            <a href="mailto:producaoflyinglow@gmail.com">{t.nav.contactProduction} <span>↗</span></a>
          </div>
        </div>
      </dialog>
    </header>
  );
}
