"use client";

import { useEffect, useRef, useState } from "react";

type SiteNavProps = { light?: boolean };

export function SiteNav({ light = false }: SiteNavProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDialogElement>(null);

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
      <a className="wordmark" href="/" aria-label="Flying Low — início">FL</a>
      <nav className="desktop-nav" aria-label="Navegação principal">
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        <a href="/">Início</a>
        <a href="/grupo">Grupo</a>
        <a href="/cenicas">Cênicas</a>
        <a href="/audiovisual">Audiovisual</a>
        <a href="/formacao">Formação</a>
      </nav>
      <a className="nav-contact" href="mailto:producaoflyinglow@gmail.com">Contato <span>↗</span></a>
      <button
        className="mobile-menu-button"
        type="button"
        aria-controls="mobile-navigation"
        aria-expanded={mobileMenuOpen}
        onClick={() => setMobileMenuOpen((isOpen) => !isOpen)}
      >
        <span className="mobile-menu-label">{mobileMenuOpen ? "Fechar" : "Menu"}</span>
        <span className="mobile-menu-icon" aria-hidden="true" />
      </button>
      <dialog
        className="mobile-menu-dialog"
        id="mobile-navigation"
        ref={mobileMenuRef}
        aria-label="Menu principal"
        onClose={closeMobileMenu}
        onCancel={closeMobileMenu}
      >
        <div className="mobile-menu-dialog-inner">
          <button className="mobile-menu-close" type="button" onClick={closeMobileMenu}>Fechar <span aria-hidden="true">×</span></button>
          <nav aria-label="Menu principal">
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a href="/" onClick={closeMobileMenu}>Início</a>
            <a href="/grupo" onClick={closeMobileMenu}>Grupo</a>
            <a href="/cenicas" onClick={closeMobileMenu}>Cênicas</a>
            <a href="/audiovisual" onClick={closeMobileMenu}>Audiovisual</a>
            <a href="/formacao" onClick={closeMobileMenu}>Formação</a>
            <a className="mobile-menu-contact" href="mailto:producaoflyinglow@gmail.com">Falar com a produção <span>↗</span></a>
          </nav>
        </div>
      </dialog>
    </header>
  );
}
