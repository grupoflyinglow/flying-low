"use client";

/* eslint-disable @next/next/no-img-element */
import { useLocale } from "./LocaleProvider";
import { routeFor } from "../route-localization";

export function SiteFooter() {
  const { locale, t } = useLocale();

  return (
    <footer className="site-footer">
      <div className="section-shell site-footer-grid">
        <a className="footer-wordmark" href={routeFor(locale, "home")} aria-label={t.nav.homeAria}>
          <img src="/brand/logo-mark-dark.png" alt="" aria-hidden="true" width={273} height={414} loading="lazy" decoding="async" />
        </a>
        <div className="footer-intro">
          <p className="eyebrow">{t.footer.location}</p>
        </div>
        <nav aria-label={t.nav.footerNavigation}>
          <a href={routeFor(locale, "group")}>{t.nav.group}</a>
          <a href={routeFor(locale, "performances")}>{t.nav.stage}</a>
          <a href={routeFor(locale, "screen")}>{t.nav.screen}</a>
          <a href={routeFor(locale, "learning")}>{t.nav.learning}</a>
          <a href={routeFor(locale, "debates")}>{t.nav.debates}</a>
          <a href={routeFor(locale, "agenda")}>{t.nav.agenda}</a>
          <a href={routeFor(locale, "contact")}>{t.nav.contact}</a>
        </nav>
        <div className="footer-contact-links">
          <a className="footer-contact" href="mailto:producaoflyinglow@gmail.com">producaoflyinglow@gmail.com <span>↗</span></a>
          <div className="footer-social-links" aria-label={t.footer.socialNavigation}>
            <a href="https://www.instagram.com/grupo_flyinglow/" target="_blank" rel="noreferrer">Instagram <span>↗</span></a>
            <a href="https://www.youtube.com/@grupoflyinglow2473" target="_blank" rel="noreferrer">YouTube <span>↗</span></a>
          </div>
        </div>
      </div>
      <div className="section-shell footer-meta"><span>© {new Date().getFullYear()} Flying Low</span></div>
    </footer>
  );
}
