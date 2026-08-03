"use client";

import { useLocale } from "./LocaleProvider";

export function SiteFooter() {
  const { t } = useLocale();

  return (
    <footer className="site-footer">
      <div className="section-shell site-footer-grid">
        {/* vinext serves these as standard documents; anchors avoid client-runtime routing. */}
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        <a className="footer-wordmark" href="/" aria-label={t.nav.homeAria}>FL</a>
        <div className="footer-intro">
          <p className="eyebrow">{t.footer.location}</p>
          <p>{t.footer.tagline}</p>
        </div>
        <nav aria-label={t.nav.footerNavigation}>
          <a href="/grupo">{t.nav.group}</a>
          <a href="/cenicas">{t.nav.stage}</a>
          <a href="/audiovisual">{t.nav.screen}</a>
          <a href="/formacao">{t.nav.learning}</a>
        </nav>
        <a className="footer-contact" href="mailto:producaoflyinglow@gmail.com">producaoflyinglow@gmail.com <span>↗</span></a>
      </div>
      <div className="section-shell footer-meta"><span>© {new Date().getFullYear()} Flying Low</span><span>{t.footer.activeSince}</span></div>
    </footer>
  );
}
