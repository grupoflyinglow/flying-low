"use client";

/* eslint-disable @next/next/no-img-element */
import {
  collectionRouteFor,
  getEditorialContent,
  projectRouteFor,
  type CollectionKey,
  type ProjectKey,
} from "../editorial-content";
import { getImageDimensions } from "../image-dimensions";
import { useLocale } from "./LocaleProvider";
import { SiteNav } from "./SiteNav";

export function ProjectPage({
  projectKey,
  collectionKey,
}: {
  projectKey: ProjectKey;
  collectionKey: CollectionKey;
}) {
  const { locale } = useLocale();
  const content = getEditorialContent(locale);
  const project = content.projects[projectKey];
  const collection = content.collections[collectionKey];
  const isPerformance = collectionKey === "espetaculos";
  const heroImage = project.heroImage ?? project.image;
  const heroImageAlt = project.heroImageAlt ?? project.imageAlt;
  const heroImageCredit = project.heroImageCredit ?? project.imageCredit;
  const projectIndex = collection.projectKeys.indexOf(projectKey);
  const isCollectionProject = projectIndex >= 0;
  const previousKey = projectIndex > 0 ? collection.projectKeys[projectIndex - 1] : null;
  const nextKey = isCollectionProject && projectIndex < collection.projectKeys.length - 1
    ? collection.projectKeys[projectIndex + 1]
    : null;
  const synopsisLabelId = project.synopsisHeading
    ? "project-synopsis-heading"
    : "project-synopsis";

  return (
    <main className={`editorial-page project-page ${project.presentation === "poster" ? "project-page--poster" : ""}`} id="main-content" tabIndex={-1}>
      <SiteNav />
      <section className="project-hero">
        <div className="section-shell project-hero-copy">
          <a className="project-back" href={collectionRouteFor(locale, collectionKey)}>← {collection.eyebrow}</a>
          <p className="eyebrow">{project.eyebrow} · {project.year}</p>
          <h1>{project.title}</h1>
          {!isPerformance && <p>{project.summary}</p>}
          {project.status && <span className="project-status">{project.status}</span>}
          {isPerformance && project.video && (
            <a className="project-teaser-card project-teaser-card--performance" href={`https://www.youtube.com/watch?v=${project.video.youtubeId}`} target="_blank" rel="noreferrer" aria-label={project.video.thumbnailAlt ?? project.video.linkLabel}>
              <img {...getImageDimensions(project.video.thumbnail ?? project.image ?? "")} src={project.video.thumbnail ?? project.image ?? ""} alt="" loading="eager" decoding="async" />
              <span className="performance-cover-shade" aria-hidden="true" />
              <span className="project-teaser-card-label">{content.common.video} <b>↗</b></span>
            </a>
          )}
        </div>
        <div className={`project-hero-media ${project.presentation === "poster" ? "is-poster" : ""}`}>
          {heroImage ? (
            <img {...getImageDimensions(heroImage)} src={heroImage} alt={heroImageAlt} loading="eager" fetchPriority="high" decoding="async" />
          ) : (
            <div className="editorial-placeholder"><span>{project.placeholderLabel}</span></div>
          )}
          {heroImageCredit && <span className="project-hero-credit">{heroImageCredit}</span>}
        </div>
      </section>

      <section className="project-story section-shell" aria-labelledby={synopsisLabelId}>
        <div className="project-story-label">
          <p className="eyebrow" id={project.synopsisHeading ? undefined : synopsisLabelId}>{content.common.synopsis}</p>
        </div>
        <div className="project-story-copy">
          {project.synopsisHeading && <h2 id={synopsisLabelId}>{project.synopsisHeading}</h2>}
          {project.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
      </section>

      {project.video && !isPerformance && (
        <section className="project-video section-shell" aria-labelledby="project-video">
          <p className="eyebrow" id="project-video">{content.common.video}</p>
          <div className="project-video-content">
            <a className="project-teaser-card" href={`https://www.youtube.com/watch?v=${project.video.youtubeId}`} target="_blank" rel="noreferrer">
              <img {...getImageDimensions(project.video.thumbnail ?? project.image ?? "")} src={project.video.thumbnail ?? project.image ?? ""} alt="" loading="lazy" decoding="async" />
              <span className="performance-cover-shade" aria-hidden="true" />
              <span className="project-teaser-card-label">{project.video.linkLabel} <b>↗</b></span>
            </a>
          </div>
        </section>
      )}

      {project.secondaryImage && (
        <section className="project-secondary-image section-shell">
          <figure>
            <img {...getImageDimensions(project.secondaryImage)} src={project.secondaryImage} alt="" loading="lazy" decoding="async" />
            {project.secondaryImageCredit && <figcaption>{project.secondaryImageCredit}</figcaption>}
          </figure>
        </section>
      )}

      <section className="project-credits section-shell" aria-labelledby="project-full-credits">
        <p className="eyebrow" id="project-full-credits">{content.common.fullCredits}</p>
        {project.credits && project.credits.length > 0 ? (
          <dl className="project-credits-list">
            {project.credits.map((credit) => (
              <div className="project-credit-row" key={credit.role}><dt>{credit.role}</dt><dd>{credit.names}</dd></div>
            ))}
          </dl>
        ) : <p className="project-credits-pending">{content.common.creditsPending}</p>}
      </section>

      {project.gallery && project.gallery.length > 0 ? (
        <section className="project-gallery section-shell" aria-labelledby="project-gallery">
          <div className="project-gallery-heading"><p className="eyebrow" id="project-gallery">{project.galleryLabel ?? content.common.gallery}</p>{project.galleryCredit && <p>{project.galleryCredit}</p>}</div>
          <div className="project-gallery-grid">{project.gallery.map((image) => <figure className={image.poster ? "is-poster" : image.portrait ? "is-portrait" : undefined} key={image.src}><img {...getImageDimensions(image.src)} src={image.src} alt={image.alt} loading="lazy" decoding="async" />{image.credit && <figcaption>{image.credit}</figcaption>}</figure>)}</div>
        </section>
      ) : <section className="project-gallery section-shell"><p className="project-credits-pending">{content.common.galleryPending}</p></section>}

      <section className="project-facts section-shell" aria-labelledby="project-technical">
        <p className="eyebrow" id="project-technical">{content.common.technical}</p>
        <div className="project-facts-grid">
          {project.facts.map((fact) => (
            <div key={fact.label}>
              <span>{fact.label}</span>
              <strong>{fact.value}</strong>
            </div>
          ))}
        </div>
      </section>

      {project.videoWorks && project.videoWorks.length > 0 && (
        <section className="project-video-works section-shell" aria-label={project.title}>
          {project.videoWorks.map((work) => (
            <article key={work.href}>
              <a className="project-teaser-card" href={work.projectKey ? projectRouteFor(locale, work.projectKey) : work.href} target={work.projectKey ? undefined : "_blank"} rel={work.projectKey ? undefined : "noreferrer"}>
                <img {...getImageDimensions(work.image ?? project.image ?? "")} src={work.image ?? project.image ?? ""} alt="" loading="lazy" decoding="async" />
                <span className="performance-cover-shade" aria-hidden="true" />
                <span className="project-teaser-card-label">{work.title} · {work.year} <b>↗</b></span>
              </a>
              <dl className="project-credits-list">{work.credits.map((credit) => <div className="project-credit-row" key={credit.role}><dt>{credit.role}</dt><dd>{credit.names}</dd></div>)}</dl>
            </article>
          ))}
        </section>
      )}

      {!isPerformance && (project.links.length > 0 ? (
        <section className="project-links section-shell" aria-labelledby="project-media">
          <p className="eyebrow" id="project-media">{content.common.media}</p>
          <div>
            {project.links.map((link) => (
              <a href={link.href} key={link.label} target={link.href.startsWith("http") ? "_blank" : undefined} rel={link.href.startsWith("http") ? "noreferrer" : undefined}>
                {link.label} <span>↗</span>
              </a>
            ))}
          </div>
        </section>
      ) : <section className="project-links section-shell"><p className="eyebrow">{content.common.media}</p><p className="project-credits-pending">{content.common.updating}</p></section>)}

      {isCollectionProject && <nav className="project-pagination section-shell" aria-label={collection.stripLabel}>
        {previousKey ? <a href={projectRouteFor(locale, previousKey)}><span>{content.common.previous}</span><strong>← {content.projects[previousKey].title}</strong></a> : <span />}
        {nextKey ? <a href={projectRouteFor(locale, nextKey)}><span>{content.common.next}</span><strong>{content.projects[nextKey].title} →</strong></a> : <span />}
      </nav>}
    </main>
  );
}
