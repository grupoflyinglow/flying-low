"use client";

/* eslint-disable @next/next/no-img-element */
import {
  getEditorialContent,
  projectRouteFor,
  type CollectionKey,
} from "../editorial-content";
import { getImageDimensions } from "../image-dimensions";
import { useLocale } from "./LocaleProvider";
import { SiteNav } from "./SiteNav";

export function CollectionPage({ collectionKey }: { collectionKey: CollectionKey }) {
  const { locale } = useLocale();
  const content = getEditorialContent(locale);
  const collection = content.collections[collectionKey];

  return (
    <main className="editorial-page collection-page" id="main-content" tabIndex={-1}>
      <SiteNav />
      <section className="collection-hero section-shell">
        <p className="eyebrow">{collection.eyebrow}</p>
        <h1>{collection.heading}</h1>
        <p>{collection.intro}</p>
      </section>

      <section className="project-strip" aria-label={collection.stripLabel}>
        <div className="project-strip-track">
          {collection.projectKeys.map((projectKey, index) => {
            const project = content.projects[projectKey];
            return (
              <a className="strip-card" href={projectRouteFor(locale, projectKey)} key={projectKey}>
                <span className="strip-number">{String(index + 1).padStart(2, "0")}</span>
                {project.image ? (
                  <img {...getImageDimensions(project.image)} src={project.image} alt={project.imageAlt} loading={index < 3 ? "eager" : "lazy"} decoding="async" />
                ) : (
                  <span className="strip-placeholder">{project.placeholderLabel}</span>
                )}
                <span className="strip-copy">
                  <span>{project.year}</span>
                  <strong>{project.title}</strong>
                </span>
              </a>
            );
          })}
        </div>
      </section>

      <div className="collection-projects section-shell">
        {collection.projectKeys.map((projectKey, index) => {
          const project = content.projects[projectKey];
          return (
            <article className={`collection-project ${index % 2 ? "is-reversed" : ""}`} key={projectKey}>
              <div className="collection-project-media">
                {project.image ? (
                  <img {...getImageDimensions(project.image)} src={project.image} alt={project.imageAlt} loading="lazy" decoding="async" />
                ) : (
                  <div className="editorial-placeholder"><span>{project.placeholderLabel}</span></div>
                )}
              </div>
              <div className="collection-project-copy">
                <p className="eyebrow">{project.eyebrow} · {project.year}</p>
                <h2>{project.title}</h2>
                {project.status && <p className="project-status">{project.status}</p>}
                <p>{project.summary}</p>
                <a className="text-link" href={projectRouteFor(locale, projectKey)}>{content.common.openProject} <b>↗</b></a>
              </div>
            </article>
          );
        })}
      </div>
    </main>
  );
}
