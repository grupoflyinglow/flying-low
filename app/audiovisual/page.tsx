import { SiteNav } from "../components/SiteNav";

const projects = [
  { number: "01", kind: "Videodança · 2020", title: "Cantigas do Meu Matulão", note: "Projeto de criação em videodança contemplado pelo Prêmio Aldir Blanc." },
  { number: "02", kind: "Série documental · 2021", title: "Em Formação", note: "Série realizada dentro de Na Manha com Flying Low, projeto de ações pedagógicas apoiado pelo PROAC 31/2021." },
];

export default function Audiovisual() {
  return <main className="archive-page audiovisual-page"><SiteNav /><section className="archive-hero section-shell"><p className="eyebrow">02 · Audiovisual</p><h1>Quando a câmera<br />entra na roda.</h1><p className="archive-intro">O audiovisual estende a pesquisa do grupo para outras distâncias, tempos e modos de escuta.</p></section><section className="projects section-shell" aria-label="Projetos audiovisuais">{projects.map((project) => <article className="project-row" key={project.number}><p className="project-number">{project.number}</p><div className="project-placeholder audiovisual-placeholder"><span>EM MOVIMENTO</span></div><div className="project-detail"><p className="eyebrow">{project.kind}</p><h2>{project.title}</h2><p>{project.note}</p><a href="mailto:producaoflyinglow@gmail.com?subject=Materiais%20Audiovisual">Solicitar material <span>↗</span></a></div></article>)}</section><section className="archive-cta section-shell"><p>Para exibições, colaborações e informações de acesso aos trabalhos.</p><a href="mailto:producaoflyinglow@gmail.com">Falar com Flying Low <span>↗</span></a></section></main>;
}
