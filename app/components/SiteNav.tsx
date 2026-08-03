"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale } from "./LocaleProvider";

type SiteNavProps = { light?: boolean };

function LanguageSwitch({ className = "" }: { className?: string }) {
  const { locale, setLocale, t } = useLocale();

  return (
    <div className={`language-switch ${className}`} role="group" aria-label={t.nav.languageSelector}>
      <button
        type="button"
        aria-label={t.nav.portuguese}
        aria-pressed={locale === "pt-BR"}
        onClick={() => setLocale("pt-BR")}
      >
        PT
      </button>
      <span aria-hidden="true">/</span>
      <button
        type="button"
        aria-label={t.nav.english}
        aria-pressed={locale === "en"}
        onClick={() => setLocale("en")}
      >
        EN
      </button>
    </div>
  );
}

export function SiteNav({ light = false }: SiteNavProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDialogElement>(null);
  const { t } = useLocale();

  useEffect(() => {
    const dialog = mobileMenuRef.current;
    if (!dialog) return;

    if (mobileMenuOpen && !dialog.open) dialog.showModal();
    if (!mobileMenuOpen && dialog.open) dialog.close();

    return () => { if (dialog.open) dialog.close(); };
  }, [mobileMenuOpen]);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <header className={`site-nav ${light ? "site-nav-light" : ""}`}>
      {/* vinext serves these as standard documents; anchors avoid client-runtime routing. */}
      {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
      <a className="wordmark" href="/" aria-label={t.nav.homeAria}>FL</a>
      <nav className="desktop-nav" aria-label={t.nav.mainNavigation}>
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        <a href="/">{t.nav.home}</a>
        <a href="/grupo">{t.nav.group}</a>
        <a href="/cenicas">{t.nav.stage}</a>
        <a href="/audiovisual">{t.nav.screen}</a>
        <a href="/formacao">{t.nav.learning}</a>
      </nav>
      <div className="nav-actions">
        <LanguageSwitch />
        <a className="nav-contact" href="mailto:producaoflyinglow@gmail.com">{t.nav.contact} <span>↗</span></a>
      </div>
      <button
        className="mobile-menu-button"
        type="button"
        aria-controls="mobile-navigation"
        aria-expanded={mobileMenuOpen}
        onClick={() => setMobileMenuOpen((isOpen) => !isOpen)}
      >
        <span className="mobile-menu-label">{mobileMenuOpen ? t.nav.close : t.nav.menu}</span>
        <span className="mobile-menu-icon" aria-hidden="true" />
      </button>
      <dialog
        className="mobile-menu-dialog"
        id="mobile-navigation"
        ref={mobileMenuRef}
        aria-label={t.nav.mainMenu}
        onClose={closeMobileMenu}
        onCancel={closeMobileMenu}
      >
        <div className="mobile-menu-dialog-inner">
          <div className="mobile-menu-head">
            <LanguageSwitch className="mobile-language-switch" />
            <button className="mobile-menu-close" type="button" onClick={closeMobileMenu}>{t.nav.close} <span aria-hidden="true">×</span></button>
          </div>
          <nav aria-label={t.nav.mainMenu}>
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a href="/" onClick={closeMobileMenu}>{t.nav.home}</a>
            <a href="/grupo" onClick={closeMobileMenu}>{t.nav.group}</a>
            <a href="/cenicas" onClick={closeMobileMenu}>{t.nav.stage}</a>
            <a href="/audiovisual" onClick={closeMobileMenu}>{t.nav.screen}</a>
            <a href="/formacao" onClick={closeMobileMenu}>{t.nav.learning}</a>
            <a className="mobile-menu-contact" href="mailto:producaoflyinglow@gmail.com">{t.nav.contactProduction} <span>↗</span></a>
          </nav>
        </div>
      </dialog>
    </header>
  );
}
