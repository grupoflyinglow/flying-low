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
      <section className="learning-page-hero section-shell">
        <h1 className="eyebrow">{collection.eyebrow}</h1>
      </section>
      <section className="learning-page-story section-shell">
        {content.learning.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      </section>
      <section className="learning-page-offerings section-shell">
        {offerings.map((offering) => (
          <article className="learning-page-offering" key={offering.title}>
            <h2>{offering.title}</h2>
            <div className="learning-page-offering-body">
              {offering.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
