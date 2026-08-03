"use client";

/* eslint-disable @next/next/no-img-element */
import { SiteNav } from "../components/SiteNav";
import { useLocale } from "../components/LocaleProvider";
import { getEditorialContent } from "../editorial-content";

export default function Grupo() {
  const { locale, t } = useLocale();
  const content = getEditorialContent(locale).group;

  return (
    <main className="editorial-page group-page" id="main-content" tabIndex={-1}>
      <SiteNav />
      <section className="archive-hero section-shell">
        <p className="eyebrow">{t.group.eyebrow}</p>
        <h1>{t.group.heading1}<br />{t.group.heading2}</h1>
        <p className="archive-intro">{t.group.intro}</p>
      </section>

      <section className="members-section section-shell" aria-labelledby="members-title">
        <div className="members-heading">
          <p className="eyebrow">{content.membersEyebrow}</p>
          <h2 id="members-title">{content.membersHeading}</h2>
          <p>{content.membersIntro}</p>
        </div>
        <div className="members-list">
          {content.members.map((member, index) => (
            <article className="member-profile" key={member.name}>
              <span className="member-number">{String(index + 1).padStart(2, "0")}</span>
              <div className={`member-photo ${member.portraitClass}`}>
                <img src="/images/flying-low-collective.jpg" alt={member.name} width={800} height={533} loading="lazy" decoding="async" />
              </div>
              <div className="member-copy">
                <h3>{member.name}</h3>
                <p className="member-role">{member.role}</p>
                <p>{member.bio}</p>
                <div className="member-links">
                  {member.links.map((link) => (
                    <a href={link.href} key={link.label} target="_blank" rel="noreferrer">{link.label} ↗</a>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="group-research" aria-labelledby="research-title">
        <div className="section-shell group-research-grid">
          <p className="eyebrow">{content.researchEyebrow}</p>
          <div>
            <h2 id="research-title">{content.researchHeading}</h2>
            <div className="research-copy">
              {content.researchBody.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
            <ol className="research-axes">
              {content.researchAxes.map((axis, index) => <li key={axis}><span>{String(index + 1).padStart(2, "0")}</span>{axis}</li>)}
            </ol>
          </div>
        </div>
      </section>
    </main>
  );
}
