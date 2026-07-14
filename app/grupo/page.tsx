/* eslint-disable @next/next/no-img-element */
import { SiteNav } from "../components/SiteNav";

const members = ["Turtle Lee", "Fioot", "Manuel Victor", "Emersu", "Ricardo Ura"];

export default function Grupo() {
  return <main className="archive-page"><SiteNav /><section className="archive-hero section-shell"><p className="eyebrow">Sobre o Flying Low</p><h1>Entre margens,<br />memória e imaginação.</h1><p className="archive-intro">Coletivo de artistas das periferias de São Paulo que pesquisa o breaking como linguagem cênica, política e poética.</p></section><section className="group-layout section-shell"><div className="group-portrait"><img src="/images/flying-low-portrait.jpg" alt="Retrato do grupo Flying Low" /></div><div className="group-copy"><p>Em 2018, a criação de <em>Menino Assum Preto</em>, contemplada pelo Programa VAI, consolidou uma trajetória autoral que articula cena, audiovisual e formação em torno de estéticas periféricas e modos coletivos de criação.</p><p>A direção compartilhada e a experiência em grupo organizam uma prática feita de afetos, urgências e pesquisa corporal.</p><ul>{members.map((member) => <li key={member}>{member}</li>)}</ul></div></section><section className="research-statement"><div className="section-shell"><p className="eyebrow">Pesquisa</p><h2>Uma dança que transforma experiência periférica em presença crítica, sensível e comunitária.</h2></div></section></main>;
}
