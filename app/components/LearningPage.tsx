"use client";

import { getEditorialContent } from "../editorial-content";
import { useLocale } from "./LocaleProvider";
import { SiteNav } from "./SiteNav";
import "./learning-page.css";

export function LearningPage() {
  const { locale } = useLocale();
  const content = getEditorialContent(locale);
  const collection = content.collections.formacao;
  const offerings = content.learning.offerings;

  return (
    <main className="editorial-page learning-page" id="main-content" tabIndex={-1}>
      <SiteNav />
      <section className="learning-page-hero section-shell" aria-labelledby="learning-intro">
        <p className="eyebrow">{collection.eyebrow}</p>
        <p id="learning-intro">{collection.intro}</p>
      </section>
      <section className="learning-page-story section-shell" aria-label={collection.eyebrow}>
        {content.learning.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      </section>
      <section className="learning-page-offerings section-shell" aria-labelledby="learning-offerings-title">
        <div>
          <p className="eyebrow">{collection.stripLabel}</p>
          <h2 id="learning-offerings-title">{locale === "pt-BR" ? "Da prática à criação coletiva." : "From practice to collective creation."}</h2>
        </div>
        <div className="learning-page-offering-list">
          {offerings.map((offering) => (
            <article className="learning-page-offering" key={offering.title}>
              <header>
                <p className="eyebrow">{offering.eyebrow}</p>
                <h3>{offering.title}</h3>
                <p>{offering.summary}</p>
              </header>
              <div className="learning-page-offering-body">
                <h4>{offering.heading}</h4>
                {offering.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
              <dl className="learning-page-offering-facts">
                {offering.facts.map((fact) => <div key={fact.label}><dt>{fact.label}</dt><dd>{fact.value}</dd></div>)}
              </dl>
            </article>
          ))}
          <a className="text-link learning-page-cta" href="mailto:producaoflyinglow@gmail.com?subject=Proposta%20de%20forma%C3%A7%C3%A3o">{locale === "pt-BR" ? "Solicitar proposta de formação" : "Request a learning proposal"} <b>↗</b></a>
        </div>
      </section>
    </main>
  );
}
