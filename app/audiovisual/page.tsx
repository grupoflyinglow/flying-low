"use client";

import { useLocale } from "../components/LocaleProvider";
import { SiteNav } from "../components/SiteNav";

export default function Audiovisual() {
  const { t } = useLocale();
  const projects = [
    {
      number: "01",
      kind: t.screen.cantigasKind,
      title: "Cantigas do Meu Matulão",
      note: t.screen.cantigasNote,
    },
    {
      number: "02",
      kind: t.screen.formacaoKind,
      title: "Em Formação",
      note: t.screen.formacaoNote,
    },
  ];
  const materialsHref = `mailto:producaoflyinglow@gmail.com?subject=${encodeURIComponent(t.screen.emailSubject)}`;

  return (
    <main className="archive-page audiovisual-page">
      <SiteNav />
      <section className="archive-hero section-shell">
        <p className="eyebrow">{t.screen.eyebrow}</p>
        <h1>{t.screen.heading1}<br />{t.screen.heading2}</h1>
        <p className="archive-intro">{t.screen.intro}</p>
      </section>
      <section className="projects section-shell" aria-label={t.screen.projectsLabel}>
        {projects.map((project) => (
          <article className="project-row" key={project.number}>
            <p className="project-number">{project.number}</p>
            <div className="project-placeholder audiovisual-placeholder"><span>{t.screen.moving}</span></div>
            <div className="project-detail">
              <p className="eyebrow">{project.kind}</p>
              <h2>{project.title}</h2>
              <p>{project.note}</p>
              <a href={materialsHref}>{t.screen.requestMaterial} <span>↗</span></a>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
