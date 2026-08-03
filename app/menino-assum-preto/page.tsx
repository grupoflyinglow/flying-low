"use client";

/* eslint-disable @next/next/no-img-element */
import { useLocale } from "../components/LocaleProvider";
import { SiteNav } from "../components/SiteNav";

export default function MeninoAssumPreto() {
  const { t } = useLocale();

  return (
    <main className="archive-page assum-page">
      <SiteNav />
      <section className="assum-hero">
        <div className="section-shell">
          <p className="eyebrow">{t.assum.eyebrow}</p>
          <h1>Menino<br />Assum Preto</h1>
          <p>{t.assum.manifesto}</p>
        </div>
      </section>
      <section className="assum-synopsis section-shell">
        <p className="eyebrow">{t.assum.synopsis}</p>
        <div>
          <h2>{t.assum.synopsisHeading}</h2>
          <p>{t.assum.body1}</p>
          <p>{t.assum.body2}</p>
        </div>
      </section>
      <section className="assum-media section-shell">
        <img src="/images/flying-low-assum-preto.jpg" alt={t.assum.imageAlt} />
        <div className="media-links">
          <a href="https://youtu.be/A244vRmQt8I" target="_blank" rel="noreferrer">{t.assum.teaser} <span>↗</span></a>
          <a href="https://youtu.be/HoIGxT3XuSU" target="_blank" rel="noreferrer">{t.assum.fullPerformance} <span>↗</span></a>
        </div>
      </section>
      <section className="technical-grid section-shell">
        <div><strong>45 min</strong><span>{t.assum.duration}</span></div>
        <div><strong>{t.assum.ageValue}</strong><span>{t.assum.ageRating}</span></div>
        <div><strong>{t.assum.venueValue}</strong><span>{t.assum.venue}</span></div>
      </section>
    </main>
  );
}
