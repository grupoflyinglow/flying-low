/* eslint-disable @next/next/no-img-element */
import { SiteNav } from "../components/SiteNav";

const projects = [
  { number: "01", year: "2019", title: "Menino Assum Preto", note: "Manifesto em movimento inspirado na canção de Luiz Gonzaga e Humberto Teixeira. Breaking e dança contemporânea para falar de aprisionamento, trabalho e liberdade.", image: "/images/flying-low-assum-preto.jpg", href: "/menino-assum-preto" },
  { number: "02", year: "2022", title: "As Pegadas do Kurupyra", note: "Obra que cruza breaking com as histórias dos seres encantados dos povos originários do Brasil e da diáspora africana.", image: "/images/flying-low-stage-blue.jpg", href: "mailto:producaoflyinglow@gmail.com?subject=As%20Pegadas%20do%20Kurupyra" },
];

export default function Cenicas() {
  return <main className="archive-page"><SiteNav /><section className="archive-hero section-shell"><p className="eyebrow">01 · Obras cênicas</p><h1>Corpos em cena.<br />Memória em ato.</h1><p className="archive-intro">Criações para teatros, espaços cênicos não convencionais e territórios de encontro.</p></section><section className="projects section-shell" aria-label="Projetos cênicos">{projects.map((project) => <article className="project-row" key={project.number}><p className="project-number">{project.number}</p><img className="project-photo" src={project.image} alt={project.title} /><div className="project-detail"><p className="eyebrow">{project.year}</p><h2>{project.title}</h2><p>{project.note}</p><a href={project.href}>{project.href.startsWith("/") ? "Ver dossiê" : "Solicitar material"} <span>↗</span></a></div></article>)}</section><section className="archive-cta section-shell"><p>Para ficha técnica, rider, disponibilidade e condições de circulação.</p><a href="mailto:producaoflyinglow@gmail.com">Falar com a produção <span>↗</span></a></section></main>;
}
