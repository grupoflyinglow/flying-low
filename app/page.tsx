"use client";

import { SiteNav } from "./components/SiteNav";
import { useLocale } from "./components/LocaleProvider";

export default function Home() {
  const { t } = useLocale();

  return (
    <main>
      <section className="hero" aria-labelledby="hero-title">
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
        <div className="hero-wash" />
        <SiteNav light />
        <div className="hero-caption">
          <h1 id="hero-title"><span>Flying</span><span>Low</span></h1>
          <p className="hero-line">{t.home.heroLine1}<br />{t.home.heroLine2}</p>
        </div>
        <div className="hero-footer"><span>{t.home.location}</span><a href="https://youtu.be/A244vRmQt8I" target="_blank" rel="noreferrer">{t.home.watchTeaser} ↗</a></div>
      </section>

      <section className="agenda section-shell" aria-labelledby="agenda-title">
        <div className="agenda-heading">
          <p className="eyebrow">{t.home.agendaEyebrow}</p>
          <h2 id="agenda-title">{t.home.agendaHeading}</h2>
        </div>
        <div className="agenda-list">
          <div className="agenda-columns" aria-hidden="true">
            <span>{t.home.agendaWhen}</span>
            <span>{t.home.agendaWhere}</span>
          </div>
          <div className="agenda-empty">
            <strong>{t.home.agendaStatus}</strong>
            <div><p>{t.home.agendaDescription}</p><a className="text-link" href="/agenda">{t.home.agendaCta} <b>↗</b></a></div>
          </div>
        </div>
      </section>

      <section className="manifesto section-shell" aria-labelledby="manifesto-title">
        <p className="eyebrow">{t.home.groupEyebrow}</p>
        <div className="manifesto-copy">
          <h2 id="manifesto-title">{t.home.groupHeading1}<br />{t.home.groupHeading2}<br />{t.home.groupHeading3}</h2>
          <p>{t.home.groupDescription}</p>
          <a className="text-link" href="/grupo">{t.home.meetGroup} <b>↗</b></a>
        </div>
      </section>

      <section className="collective-image section-shell" aria-label={t.home.collectiveSectionLabel}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/flying-low-collective.jpg" alt={t.home.collectiveAlt} />
        <span className="image-label">Turtle Lee · Fioot · Manuel Victor · Emersu · Ricardo Ura</span>
      </section>

      <section className="featured-work section-shell" aria-labelledby="featured-title">
        <div className="featured-work-copy">
          <p className="eyebrow">{t.home.featuredEyebrow}</p>
          <h2 id="featured-title">Menino<br />Assum Preto</h2>
          <p>{t.home.featuredDescription}</p>
          <a className="text-link" href="/espetaculos/menino-assum-preto">{t.home.viewDossier} <b>↗</b></a>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/flying-low-assum-preto.jpg" alt={t.home.featuredAlt} />
      </section>

      <section className="practice-grid section-shell" aria-labelledby="practice-title">
        <div className="section-heading"><p className="eyebrow">{t.home.practiceEyebrow}</p><h2 id="practice-title">{t.home.practiceHeading1}<br />{t.home.practiceHeading2}</h2></div>
        <div className="gates-grid">
          <a className="work-gate scenic" href="/espetaculos">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="gate-photo" src="/images/flying-low-stage-amber.jpg" alt={t.home.stageAlt} />
            <div className="gate-copy"><p className="eyebrow">{t.home.stageLabel}</p><h3>{t.home.stageDescription}</h3><span className="text-link">{t.home.viewWorks} <b>↗</b></span></div>
          </a>
          <a className="work-gate audiovisual" href="/audiovisual">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="gate-photo" src="/images/flying-low-stage-blue.jpg" alt={t.home.screenAlt} />
            <div className="gate-copy"><p className="eyebrow">{t.home.screenLabel}</p><h3>{t.home.screenDescription}</h3><span className="text-link">{t.home.viewProjects} <b>↗</b></span></div>
          </a>
        </div>
      </section>

    </main>
  );
}
