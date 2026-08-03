"use client";

import { SiteNav } from "../components/SiteNav";
import { useLocale } from "../components/LocaleProvider";
import { getEditorialContent } from "../editorial-content";

export default function Agenda() {
  const { locale } = useLocale();
  const agenda = getEditorialContent(locale).agenda;

  return (
    <main className="editorial-page agenda-page" id="main-content" tabIndex={-1}>
      <SiteNav />
      <section className="agenda-page-hero section-shell">
        <p className="eyebrow">{agenda.eyebrow}</p>
        <h1>{agenda.heading}</h1>
        <p>{agenda.intro}</p>
      </section>
      <section className="agenda-board section-shell">
        <div className="agenda-board-head"><span>{agenda.when}</span><span>{agenda.where}</span></div>
        <div className="agenda-board-empty">
          <strong>{agenda.status}</strong>
          <p>{agenda.description}</p>
        </div>
      </section>
    </main>
  );
}
