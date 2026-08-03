"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { alternateLocalePath, routeFor } from "../route-localization";
import { useLocale } from "./LocaleProvider";

function LanguageSwitch({ className = "" }: { className?: string }) {
  const pathname = usePathname();
  const { locale, t } = useLocale();

  return (
    <div className={`language-switch ${className}`} role="group" aria-label={t.nav.languageSelector}>
      <a
        aria-current={locale === "pt-BR" ? "page" : undefined}
        aria-label={t.nav.portuguese}
        href={alternateLocalePath(pathname, "pt-BR")}
        hrefLang="pt-BR"
        lang="pt-BR"
      >PT</a>
      <span aria-hidden="true">/</span>
      <a
        aria-current={locale === "en" ? "page" : undefined}
        aria-label={t.nav.english}
        href={alternateLocalePath(pathname, "en")}
        hrefLang="en"
        lang="en"
      >EN</a>
    </div>
  );
}

export function SiteNav({ light = false }: { light?: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDialogElement>(null);
  const { locale, t } = useLocale();
  const items = [
    { routeKey: "group", label: t.nav.group, desktopLabel: t.nav.group },
    { routeKey: "performances", label: t.nav.stage, desktopLabel: t.nav.stage },
    { routeKey: "screen", label: t.nav.screen, desktopLabel: t.nav.screen },
    { routeKey: "learning", label: t.nav.learning, desktopLabel: t.nav.learningShort },
    { routeKey: "debates", label: t.nav.debates, desktopLabel: t.nav.debatesShort },
    { routeKey: "history", label: t.nav.history, desktopLabel: t.nav.history },
    { routeKey: "agenda", label: t.nav.agenda, desktopLabel: t.nav.agenda },
  ] as const;

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
      <a className="wordmark" href={routeFor(locale, "home")} aria-label={t.nav.homeAria}>FL</a>
      <nav className="desktop-nav" aria-label={t.nav.mainNavigation}>
        {items.map((item) => {
          const href = routeFor(locale, item.routeKey);
          return <a href={href} key={href}>{item.desktopLabel}</a>;
        })}
      </nav>
      <div className="nav-actions">
        <LanguageSwitch />
        <button className="menu-button" type="button" aria-controls="site-menu" aria-expanded={menuOpen} onClick={() => setMenuOpen(true)}>
          {t.nav.menu}<span aria-hidden="true">＋</span>
        </button>
      </div>

      <dialog className="menu-dialog" id="site-menu" ref={menuRef} aria-label={t.nav.mainMenu} onClose={closeMenu} onCancel={closeMenu}>
        <div className="menu-dialog-inner">
          <div className="menu-head">
            <a className="footer-wordmark" href={routeFor(locale, "home")} onClick={closeMenu} aria-label={t.nav.homeAria}>FL</a>
            <button className="menu-close" type="button" onClick={closeMenu}>{t.nav.close} <span aria-hidden="true">×</span></button>
          </div>
          <nav className="menu-links" aria-label={t.nav.mainMenu}>
            {items.map((item, index) => {
              const href = routeFor(locale, item.routeKey);
              return (
                <a href={href} key={href} onClick={closeMenu}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{item.label}</strong>
                </a>
              );
            })}
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
