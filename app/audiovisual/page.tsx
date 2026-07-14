import { SiteNav } from "../components/SiteNav";

const projects = [
  { number: "01", kind: "Videodança", title: "Título do trabalho audiovisual", note: "Frame, sinopse, créditos e links de exibição entram aqui." },
  { number: "02", kind: "Filme / colaboração", title: "Título do trabalho audiovisual", note: "Frame, sinopse, créditos e links de exibição entram aqui." },
];

export default function Audiovisual() {
  return (
    <main className="archive-page audiovisual-page">
      <SiteNav />
      <section className="archive-hero section-shell">
        <p className="eyebrow">02 · Audiovisual</p>
        <h1>Coreografia<br />para a câmera.</h1>
        <p className="archive-intro">Quando o movimento encontra enquadramento, montagem e som, surgem outras escalas de proximidade.</p>
      </section>
      <section className="projects section-shell" aria-label="Projetos audiovisuais">
        {projects.map((project) => (
          <article className="project-row" key={project.number}>
            <p className="project-number">{project.number}</p>
            <div className="project-placeholder audiovisual-placeholder" aria-hidden="true"><span>PLAY</span></div>
            <div className="project-detail">
              <p className="eyebrow">{project.kind}</p>
              <h2>{project.title}</h2>
              <p>{project.note}</p>
              <a href="mailto:contato@flyinglow.art?subject=Materiais%20Audiovisual">Solicitar material <span>↗</span></a>
            </div>
          </article>
        ))}
      </section>
      <section className="archive-cta section-shell">
        <p>Para programações, exibições ou colaborações, escreva para a gente.</p>
        <a href="mailto:contato@flyinglow.art">Falar com Flying Low <span>↗</span></a>
      </section>
    </main>
  );
}
