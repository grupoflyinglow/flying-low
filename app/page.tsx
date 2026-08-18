"use client";

import { useState, useSyncExternalStore } from "react";
import { SiteNav } from "./components/SiteNav";
import { useLocale } from "./components/LocaleProvider";
import { getEditorialContent } from "./editorial-content";
import { routeFor } from "./route-localization";

function subscribeToReducedMotion(callback: () => void) {
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
}

function getReducedMotionSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export default function Home() {
  const { locale, t } = useLocale();
  const agenda = getEditorialContent(locale).agenda;
  const [heroVideoReady, setHeroVideoReady] = useState(false);
  const prefersReducedMotion = useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotionSnapshot,
    () => true,
  );

  return (
    <main id="main-content" tabIndex={-1}>
      <section className="hero" aria-labelledby="hero-title">
        {!prefersReducedMotion && (
          <video
            className={`hero-video ${heroVideoReady ? "is-ready" : ""}`}
            aria-hidden="true"
            tabIndex={-1}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            onCanPlay={() => setHeroVideoReady(true)}
          >
            <source media="(max-width: 760px)" src="/video/flying-low-home-mobile.mp4" type="video/mp4" />
            <source src="/video/flying-low-home.mp4" type="video/mp4" />
          </video>
        )}
        <div className="hero-wash" />
        <SiteNav light />
        <div className="hero-caption">
          <h1 id="hero-title"><span>Flying</span><span>Low</span></h1>
        </div>
        <div className="hero-footer">
          <span>{t.home.location}</span>
          <a className="hero-primary-cta" href={routeFor(locale, "performances")}>
            {t.home.viewPerformances}<span aria-hidden="true">↗</span>
          </a>
        </div>
      </section>

      <section className="agenda section-shell" aria-labelledby="agenda-title">
        <div className="agenda-heading">
          <p className="eyebrow">{t.home.agendaEyebrow}</p>
          <h2 id="agenda-title">{t.home.agendaHeading}</h2>
        </div>
        <div className="agenda-list">
          <div className="agenda-columns" aria-hidden="true">
            <span>{agenda.when}</span>
            <span>{agenda.where}</span>
          </div>
          <div className="agenda-home-events">
            {agenda.events.map((event, index) => (
              <article className="agenda-home-event" key={`${event.title}-${index}`}>
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
                <div className="agenda-home-details">
                  <span className="agenda-mobile-label">{agenda.where}</span>
                  <h3>{event.title}</h3>
                  {event.note && <p>{event.note}</p>}
                  <strong>{event.venue}</strong>
                  <address className="agenda-event-address">{event.address}</address>
                </div>
              </article>
            ))}
          </div>
          <a className="text-link agenda-cta" href={routeFor(locale, "agenda")}>{t.home.agendaCta} <b>↗</b></a>
        </div>
      </section>

    </main>
  );
}
