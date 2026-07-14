import { SiteNav } from "../components/SiteNav";

const projects = [
  { number: "01", status: "Em atualização", title: "Título da obra cênica", note: "Imagem, ficha técnica e materiais de circulação entram aqui." },
  { number: "02", status: "Em atualização", title: "Título da obra cênica", note: "Imagem, ficha técnica e materiais de circulação entram aqui." },
];

export default function Cenicas() {
  return (
    <main className="archive-page">
      <SiteNav />
      <section className="archive-hero section-shell">
        <p className="eyebrow">01 · Obras cênicas</p>
        <h1>O corpo encontra<br />o lugar.</h1>
        <p className="archive-intro">Criações que se deslocam entre palco, rua e espaços de convivência — feitas para viver diante de quem assiste.</p>
      </section>
      <section className="projects section-shell" aria-label="Projetos cênicos">
        {projects.map((project) => (
          <article className="project-row" key={project.number}>
            <p className="project-number">{project.number}</p>
            <div className="project-placeholder scenic-placeholder" aria-hidden="true" />
            <div className="project-detail">
              <p className="eyebrow">{project.status}</p>
              <h2>{project.title}</h2>
              <p>{project.note}</p>
              <a href="mailto:contato@flyinglow.art?subject=Materiais%20C%C3%AAnicas">Solicitar material <span>↗</span></a>
            </div>
          </article>
        ))}
      </section>
      <section className="archive-cta section-shell">
        <p>Deseja receber um dossiê de circulação, ficha técnica ou materiais de imprensa?</p>
        <a href="mailto:contato@flyinglow.art">Falar com Flying Low <span>↗</span></a>
      </section>
    </main>
  );
}
