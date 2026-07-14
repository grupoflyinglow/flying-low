import { SiteNav } from "./components/SiteNav";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <section className="hero" aria-labelledby="hero-title">
        <video
          className="hero-video"
          autoPlay
          loop
          muted
          playsInline
          poster="/hero-poster.jpg"
          aria-label="Temporary background footage of a small dance group in motion"
        >
          <source src="/media/flying-low-hero-placeholder.mp4" type="video/mp4" />
        </video>
        <div className="hero-wash" />
        <SiteNav light />
        <div className="hero-caption">
          <p className="eyebrow hero-eyebrow">São Paulo · Brasil</p>
          <h1 id="hero-title">Flying Low</h1>
          <p className="hero-line">Cinco corpos em estado de escuta.</p>
        </div>
        <div className="hero-footer">
          <span>Em atividade desde 2016</span>
          <span className="hero-note">Vídeo temporário · a ser substituído por acervo Flying Low</span>
        </div>
      </section>

      <section className="intro section-shell" aria-labelledby="about-title">
        <p className="eyebrow">Sobre o grupo</p>
        <div className="intro-copy">
          <h2 id="about-title">A rua como ponto de partida.<br />A cena como campo de pesquisa.</h2>
          <p>
            Flying Low é um coletivo de cinco intérpretes-criadores. Desde 2016,
            investigamos a dança urbana em diálogo com dramaturgia, música e imagem em movimento.
          </p>
        </div>
      </section>

      <section className="work-gates section-shell" aria-labelledby="work-title">
        <div className="section-heading">
          <p className="eyebrow">Duas frentes, uma prática</p>
          <h2 id="work-title">Obras em presença<br />e em circulação.</h2>
        </div>
        <div className="gates-grid">
          <Link className="work-gate scenic" href="/cenicas">
            <div className="gate-visual" aria-hidden="true"><span>01</span></div>
            <div className="gate-copy">
              <p className="eyebrow">Cênicas</p>
              <h3>Trabalhos para palco, rua e espaços de encontro.</h3>
              <span className="text-link">Conhecer obras <b>↗</b></span>
            </div>
          </Link>
          <Link className="work-gate audiovisual" href="/audiovisual">
            <div className="gate-visual" aria-hidden="true"><span>02</span></div>
            <div className="gate-copy">
              <p className="eyebrow">Audiovisual</p>
              <h3>Videodança, filmes e colaborações para a câmera.</h3>
              <span className="text-link">Ver trabalhos <b>↗</b></span>
            </div>
          </Link>
        </div>
      </section>

      <section className="credibility section-shell" aria-label="Flying Low em números">
        <div><strong>05</strong><span>intérpretes-criadores</span></div>
        <div><strong>2016</strong><span>início do percurso coletivo</span></div>
        <div><strong>02</strong><span>frentes de criação e circulação</span></div>
      </section>

      <section className="contact-band" id="contato">
        <div className="section-shell contact-inner">
          <p className="eyebrow">Convites, parcerias e circulação</p>
          <a href="mailto:contato@flyinglow.art">Vamos conversar <span>↗</span></a>
        </div>
      </section>
    </main>
  );
}
