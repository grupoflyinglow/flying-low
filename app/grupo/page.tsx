"use client";

/* eslint-disable @next/next/no-img-element */
import { useLocale } from "../components/LocaleProvider";
import { SiteNav } from "../components/SiteNav";

const members = ["Turtle Lee", "Fioot", "Manuel Victor", "Emersu", "Ricardo Ura"];

export default function Grupo() {
  const { t } = useLocale();

  return (
    <main className="archive-page">
      <SiteNav />
      <section className="archive-hero section-shell">
        <p className="eyebrow">{t.group.eyebrow}</p>
        <h1>{t.group.heading1}<br />{t.group.heading2}</h1>
        <p className="archive-intro">{t.group.intro}</p>
      </section>
      <section className="group-layout section-shell">
        <div className="group-portrait">
          <img src="/images/flying-low-portrait.jpg" alt={t.group.portraitAlt} />
        </div>
        <div className="group-copy">
          <p>{t.group.body1}</p>
          <p>{t.group.body2}</p>
          <ul>{members.map((member) => <li key={member}>{member}</li>)}</ul>
        </div>
      </section>
      <section className="research-statement">
        <div className="section-shell">
          <p className="eyebrow">{t.group.researchEyebrow}</p>
          <h2>{t.group.researchStatement}</h2>
        </div>
      </section>
    </main>
  );
}
