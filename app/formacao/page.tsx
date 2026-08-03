"use client";

/* eslint-disable @next/next/no-img-element */
import { useLocale } from "../components/LocaleProvider";
import { SiteNav } from "../components/SiteNav";

export default function Formacao() {
  const { t } = useLocale();

  return (
    <main className="archive-page">
      <SiteNav />
      <section className="archive-hero section-shell">
        <p className="eyebrow">{t.learning.eyebrow}</p>
        <h1>{t.learning.heading1}<br />{t.learning.heading2}</h1>
        <p className="archive-intro">{t.learning.intro}</p>
      </section>
      <section className="formation-layout section-shell">
        <div>
          <p className="eyebrow">{t.learning.since}</p>
          <h2>{t.learning.statement1}<br />{t.learning.statement2}</h2>
        </div>
        <div>
          <p>{t.learning.body}</p>
          <a className="text-link" href="mailto:producaoflyinglow@gmail.com?subject=Voando%20com%20Flying%20Low">
            {t.learning.requestProposal} <b>↗</b>
          </a>
        </div>
      </section>
      <section className="formation-photo section-shell">
        <img src="/images/flying-low-stage-amber.jpg" alt={t.learning.imageAlt} />
      </section>
    </main>
  );
}
