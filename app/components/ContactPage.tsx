"use client";

import { useLocale } from "./LocaleProvider";
import { SiteNav } from "./SiteNav";

const socialLinks = [
  { label: "Instagram", href: "https://www.instagram.com/grupo_flyinglow/" },
  { label: "YouTube", href: "https://www.youtube.com/@grupoflyinglow2473" },
] as const;

export function ContactPage() {
  const { t } = useLocale();

  return (
    <main className="editorial-page contact-page" id="main-content" tabIndex={-1}>
      <SiteNav />
      <section className="contact-page-header section-shell" aria-labelledby="contact-heading">
        <p className="eyebrow">{t.contact.eyebrow}</p>
        <h1 id="contact-heading">{t.contact.heading}</h1>
        <p>{t.contact.intro}</p>
      </section>
      <section className="contact-page-links section-shell" aria-label={t.contact.eyebrow}>
        <p className="eyebrow">{t.contact.emailLabel}</p>
        <div className="contact-page-link-list">
          <a href="mailto:producaoflyinglow@gmail.com">producaoflyinglow@gmail.com <span aria-hidden="true">↗</span></a>
        </div>
      </section>
      <section className="contact-page-links section-shell" aria-label={t.contact.socialLabel}>
        <p className="eyebrow">{t.contact.socialLabel}</p>
        <div className="contact-page-link-list">
          {socialLinks.map((link) => (
            <a href={link.href} key={link.href} target="_blank" rel="noreferrer">{link.label} <span aria-hidden="true">↗</span></a>
          ))}
        </div>
      </section>
    </main>
  );
}
