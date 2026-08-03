"use client";

import { useSyncExternalStore } from "react";
import { SiteNav } from "./components/SiteNav";
import { useLocale } from "./components/LocaleProvider";
import { getEditorialContent } from "./editorial-content";

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
  const prefersReducedMotion = useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotionSnapshot,
    () => true,
  );

  return (
    <main id="main-content" tabIndex={-1}>
      <section className="hero" aria-labelledby="hero-title">
        {!prefersReducedMotion && (
          <iframe
            className="hero-youtube"
            src="https://www.youtube-nocookie.com/embed/A244vRmQt8I?autoplay=1&mute=1&playsinline=1&loop=1&playlist=A244vRmQt8I&controls=0&disablekb=1&fs=0&iv_load_policy=3&cc_load_policy=0&rel=0"
            title={t.home.teaserTitle}
            aria-hidden="true"
            tabIndex={-1}
            loading="eager"
            allow="autoplay; encrypted-media; picture-in-picture"
            referrerPolicy="strict-origin-when-cross-origin"
          />
        )}
        <div className="hero-wash" />
        <SiteNav light />
        <div className="hero-caption">
          <h1 id="hero-title"><span>Flying</span><span>Low</span></h1>
          <p className="hero-line">{t.home.heroLine1}<br />{t.home.heroLine2}</p>
        </div>
        <div className="hero-footer">
          <span>{t.home.location}</span>
          <a className="hero-primary-cta" href="/espetaculos">
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
                </div>
              </article>
            ))}
          </div>
          <a className="text-link agenda-cta" href="/agenda">{t.home.agendaCta} <b>↗</b></a>
        </div>
      </section>

      <section className="collective-image section-shell" aria-label={t.home.collectiveSectionLabel}>
        <a className="collective-image-link" href="/grupo">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/flying-low-collective.jpg" alt={t.home.collectiveAlt} width={800} height={533} loading="lazy" decoding="async" />
          <span className="image-label">{t.home.meetGroup} ↗</span>
        </a>
      </section>

    </main>
  );
}
