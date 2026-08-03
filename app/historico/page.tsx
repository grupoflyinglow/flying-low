"use client";

import { SiteNav } from "../components/SiteNav";
import { useLocale } from "../components/LocaleProvider";
import { getEditorialContent } from "../editorial-content";

export default function Historico() {
  const { locale } = useLocale();
  const history = getEditorialContent(locale).history;

  return (
    <main className="editorial-page history-page" id="main-content" tabIndex={-1}>
      <SiteNav />
      <section className="history-hero section-shell">
        <p className="eyebrow">{history.eyebrow}</p>
        <h1>{history.heading}</h1>
        <p>{history.intro}</p>
      </section>
      <section className="timeline section-shell" aria-label={history.eyebrow}>
        {history.events.map((event, index) => (
          <article className="timeline-event" key={`${event.year}-${event.title}`}>
            <div className="timeline-year"><span>{String(index + 1).padStart(2, "0")}</span><strong>{event.year}</strong></div>
            <div className="timeline-copy"><h2>{event.title}</h2><p>{event.description}</p></div>
          </article>
        ))}
      </section>
      <section className="clipping-status section-shell">
        <p className="eyebrow">{history.clippingLabel}</p>
        <strong>{history.clippingStatus}</strong>
      </section>
    </main>
  );
}
