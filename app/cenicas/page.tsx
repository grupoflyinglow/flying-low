"use client";

/* eslint-disable @next/next/no-img-element */
import { useLocale } from "../components/LocaleProvider";
import { SiteNav } from "../components/SiteNav";

export default function Cenicas() {
  const { t } = useLocale();
  const projects = [
    {
      number: "01",
      year: "2019",
      title: "Menino Assum Preto",
      note: t.stage.assumNote,
      image: "/images/flying-low-assum-preto.jpg",
      href: "/menino-assum-preto",
    },
    {
      number: "02",
      year: "2022",
      title: "As Pegadas do Kurupyra",
      note: t.stage.kurupyraNote,
      image: "/images/flying-low-stage-blue.jpg",
      href: "mailto:producaoflyinglow@gmail.com?subject=As%20Pegadas%20do%20Kurupyra",
    },
  ];

  return (
    <main className="archive-page">
      <SiteNav />
      <section className="archive-hero section-shell">
        <p className="eyebrow">{t.stage.eyebrow}</p>
        <h1>{t.stage.heading1}<br />{t.stage.heading2}</h1>
        <p className="archive-intro">{t.stage.intro}</p>
      </section>
      <section className="projects section-shell" aria-label={t.stage.projectsLabel}>
        {projects.map((project) => (
          <article className="project-row" key={project.number}>
            <p className="project-number">{project.number}</p>
            <img className="project-photo" src={project.image} alt={project.title} />
            <div className="project-detail">
              <p className="eyebrow">{project.year}</p>
              <h2>{project.title}</h2>
              <p>{project.note}</p>
              <a href={project.href}>
                {project.href.startsWith("/") ? t.stage.viewDossier : t.stage.requestMaterial} <span>↗</span>
              </a>
            </div>
          </article>
        ))}
      </section>
      <section className="archive-cta section-shell">
        <p>{t.stage.cta}</p>
        <a href="mailto:producaoflyinglow@gmail.com">{t.stage.contactProduction} <span>↗</span></a>
      </section>
    </main>
  );
}
