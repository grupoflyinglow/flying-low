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
        <div className="agenda-board-events">
          {agenda.events.map((event, index) => (
            <article className="agenda-board-event" key={`${event.title}-${index}`}>
              <div className="agenda-event-dates">
                <span className="agenda-mobile-label">{agenda.when}</span>
                {event.dates.map((date) => (
                  <div className="agenda-date" key={`${date.day}-${date.month}-${date.time}`}>
                    <span className="agenda-date-day">{date.day}</span>
                    <span className="agenda-date-meta">
                      {date.label && <span className="agenda-date-label">{date.label}</span>}
                      <span className="agenda-date-weekday">{date.weekday}</span>
                      <span className="agenda-date-month">{date.month}</span>
                      <strong className="agenda-date-time">{date.time}</strong>
                    </span>
                  </div>
                ))}
              </div>
              <div className="agenda-board-details">
                <span className="agenda-mobile-label">{agenda.where}</span>
                {event.note && <p className="agenda-event-note">{event.note}</p>}
                <h2>{event.title}</h2>
                <p className="agenda-event-venue">{event.venue}</p>
                <address className="agenda-event-address">{event.address}</address>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
