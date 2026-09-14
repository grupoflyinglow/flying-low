"use client";

/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef } from "react";
import {
  getEditorialContent,
  projectRouteFor,
  type CollectionKey,
} from "../editorial-content";
import { getImageDimensions } from "../image-dimensions";
import { useLocale } from "./LocaleProvider";
import { SiteNav } from "./SiteNav";

export function PerformancesPage({
  collectionKey = "espetaculos",
}: {
  collectionKey?: Extract<CollectionKey, "espetaculos" | "audiovisual">;
}) {
  const { locale } = useLocale();
  const content = getEditorialContent(locale);
  const collection = content.collections[collectionKey];
  const railRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const rail = railRef.current;
    const sticky = stickyRef.current;
    const track = trackRef.current;
    if (!rail || !sticky || !track) return;

    const compactLayout = window.matchMedia("(max-width: 760px), (prefers-reduced-motion: reduce)");
    let frame = 0;
    let focusFrame = 0;
    let railTop = 0;
    let travel = 0;

    const resetNativeHorizontalScroll = () => {
      if (!compactLayout.matches && sticky.scrollLeft !== 0) sticky.scrollLeft = 0;
    };

    const updatePosition = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        if (compactLayout.matches || travel <= 0) {
          track.style.removeProperty("transform");
          return;
        }

        const scrollRange = Math.max(1, rail.offsetHeight - window.innerHeight);
        const progress = Math.min(1, Math.max(0, (window.scrollY - railTop) / scrollRange));
        track.style.transform = `translate3d(${-travel * progress}px, 0, 0)`;
      });
    };

    const updateLayout = () => {
      if (compactLayout.matches) {
        rail.style.removeProperty("height");
        track.style.removeProperty("transform");
        travel = 0;
        return;
      }

      travel = Math.max(0, track.scrollWidth - window.innerWidth);
      rail.style.height = `${window.innerHeight + travel}px`;
      railTop = window.scrollY + rail.getBoundingClientRect().top;
      updatePosition();
    };

    const focusCover = (event: FocusEvent) => {
      const cover = event.target;
      if (compactLayout.matches || travel <= 0 || !(cover instanceof HTMLAnchorElement) || !cover.classList.contains("performance-cover")) return;

      const currentOffset = Math.min(travel, Math.max(0, window.scrollY - railTop));
      const inset = 14;
      const left = cover.offsetLeft - currentOffset;
      const right = left + cover.offsetWidth;
      const nextOffset = right > window.innerWidth - inset
        ? cover.offsetLeft + cover.offsetWidth - window.innerWidth + inset
        : left < inset
          ? cover.offsetLeft - inset
          : currentOffset;

      resetNativeHorizontalScroll();
      window.scrollTo({ top: railTop + Math.min(travel, Math.max(0, nextOffset)), behavior: "instant" });
      updatePosition();
      window.cancelAnimationFrame(focusFrame);
      focusFrame = window.requestAnimationFrame(() => {
        resetNativeHorizontalScroll();
        updatePosition();
      });
    };

    const resizeObserver = new ResizeObserver(updateLayout);
    resizeObserver.observe(track);
    window.addEventListener("resize", updateLayout);
    window.addEventListener("scroll", updatePosition, { passive: true });
    compactLayout.addEventListener("change", updateLayout);
    sticky.addEventListener("focusin", focusCover);
    sticky.addEventListener("scroll", resetNativeHorizontalScroll, { passive: true });
    updateLayout();

    return () => {
      window.cancelAnimationFrame(frame);
      window.cancelAnimationFrame(focusFrame);
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateLayout);
      window.removeEventListener("scroll", updatePosition);
      compactLayout.removeEventListener("change", updateLayout);
      sticky.removeEventListener("focusin", focusCover);
      sticky.removeEventListener("scroll", resetNativeHorizontalScroll);
    };
  }, []);

  return (
    <main className={`editorial-page performances-page performances-page--${collectionKey}`} id="main-content" tabIndex={-1}>
      <SiteNav />
      <h1 className="sr-only">{collection.eyebrow}</h1>

      <section className="performances-rail" ref={railRef} aria-label={collection.stripLabel}>
        <div className="performances-rail-sticky" ref={stickyRef}>
          <div className="performances-track" ref={trackRef}>
            {collection.projectKeys.map((projectKey, index) => {
              const project = content.projects[projectKey];
              return (
                <a className="performance-cover" href={projectRouteFor(locale, projectKey)} key={projectKey}>
                  {project.image ? (
                    <img
                      {...getImageDimensions(project.image)}
                      src={project.image}
                      alt={project.imageAlt}
                      loading={index === 0 ? "eager" : "lazy"}
                      fetchPriority={index === 0 ? "high" : undefined}
                      decoding="async"
                    />
                  ) : (
                    <span className="performance-cover-placeholder">{project.placeholderLabel}</span>
                  )}
                  <span className="performance-cover-shade" aria-hidden="true" />
                  <span className="performance-cover-number">{String(index + 1).padStart(2, "0")}</span>
                  <span className="performance-cover-year">{project.year}</span>
                  <strong className="performance-cover-title">{project.title}</strong>
                  <span className="performance-cover-arrow" aria-hidden="true">↗</span>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      <section className="performance-chapters" aria-label={collection.stripLabel}>
        {collection.projectKeys.map((projectKey, index) => {
          const project = content.projects[projectKey];
          const chapterImage = project.secondaryImage || project.image;

          return (
            <article className="performance-chapter" key={projectKey}>
              <a className="performance-chapter-media" href={projectRouteFor(locale, projectKey)}>
                {chapterImage ? (
                  <img
                    {...getImageDimensions(chapterImage)}
                    src={chapterImage}
                    alt={project.imageAlt}
                    loading="lazy"
                    decoding="async"
                  />
                ) : (
                  <span className="performance-cover-placeholder">{project.placeholderLabel}</span>
                )}
                <span className="performance-cover-shade" aria-hidden="true" />
                <span className="performance-chapter-index">{String(index + 1).padStart(2, "0")}</span>
                <h2>{project.title}</h2>
              </a>

              <div className="performance-chapter-copy section-shell">
                <p className="eyebrow">{project.eyebrow} · {project.year}</p>
                <div>
                  {project.status && <p className="project-status">{project.status}</p>}
                  <p>{project.summary}</p>
                  <a className="text-link" href={projectRouteFor(locale, projectKey)}>{content.common.openProject} <b>↗</b></a>
                </div>
              </div>
            </article>
          );
        })}
      </section>
    </main>
  );
}
