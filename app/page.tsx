import { SiteNav } from "./components/SiteNav";

export default function Home() {
  return (
    <main>
      <section className="hero" aria-labelledby="hero-title">
        <iframe
          className="hero-youtube"
          src="https://www.youtube-nocookie.com/embed/A244vRmQt8I?autoplay=1&mute=1&playsinline=1&loop=1&playlist=A244vRmQt8I&controls=0&disablekb=1&fs=0&iv_load_policy=3&cc_load_policy=0&rel=0"
          title="Teaser de Menino Assum Preto"
          aria-hidden="true"
          tabIndex={-1}
          loading="eager"
          allow="autoplay; encrypted-media; picture-in-picture"
          referrerPolicy="strict-origin-when-cross-origin"
        />
        <div className="hero-wash" />
        <SiteNav light />
        <div className="hero-caption">
          <p className="eyebrow hero-eyebrow">Breaking como linguagem cênica, política e poética</p>
          <h1 id="hero-title"><span>Flying</span><span>Low</span></h1>
          <p className="hero-line">Dança das periferias de São Paulo<br />para a cena, a câmera e o encontro.</p>
        </div>
        <div className="hero-footer"><span>Em atividade desde 2016</span><span>São Paulo · Brasil</span><a href="https://youtu.be/A244vRmQt8I" target="_blank" rel="noreferrer">Assistir teaser ↗</a></div>
      </section>

      <section className="manifesto section-shell" aria-labelledby="manifesto-title">
        <p className="eyebrow">O grupo</p>
        <div className="manifesto-copy">
          <h2 id="manifesto-title">Cinco artistas.<br />Uma dança que vem<br />do vivido.</h2>
          <p>Flying Low é um coletivo de artistas das periferias de São Paulo. A pesquisa parte do breaking e atravessa danças urbanas, dramaturgias do corpo e práticas colaborativas de criação.</p>
          <a className="text-link" href="/grupo">Conhecer o grupo <b>↗</b></a>
        </div>
      </section>

      <section className="collective-image section-shell" aria-label="Flying Low em retrato">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/flying-low-collective.jpg" alt="Os cinco integrantes do coletivo Flying Low" />
        <span className="image-label">Turtle Lee · Fioot · Manuel Victor · Emersu · Ricardo Ura</span>
      </section>

      <section className="featured-work section-shell" aria-labelledby="featured-title">
        <div className="featured-work-copy">
          <p className="eyebrow">Em destaque · 2019</p>
          <h2 id="featured-title">Menino<br />Assum Preto</h2>
          <p>Um manifesto em movimento sobre trabalho, aprisionamento e o direito de sonhar.</p>
          <a className="text-link" href="/menino-assum-preto">Ver dossiê da obra <b>↗</b></a>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/flying-low-assum-preto.jpg" alt="Cena de Menino Assum Preto" />
      </section>

      <section className="practice-grid section-shell" aria-labelledby="practice-title">
        <div className="section-heading"><p className="eyebrow">Criação em movimento</p><h2 id="practice-title">Cena, imagem<br />e formação.</h2></div>
        <div className="gates-grid">
          <a className="work-gate scenic" href="/cenicas">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="gate-photo" src="/images/flying-low-stage-amber.jpg" alt="Cena de espetáculo do Flying Low" />
            <div className="gate-copy"><p className="eyebrow">Cênicas</p><h3>Obras que misturam breaking, memória, ancestralidade e fabulação.</h3><span className="text-link">Ver obras <b>↗</b></span></div>
          </a>
          <a className="work-gate audiovisual" href="/audiovisual">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="gate-photo" src="/images/flying-low-stage-blue.jpg" alt="Cena azul de espetáculo do Flying Low" />
            <div className="gate-copy"><p className="eyebrow">Audiovisual</p><h3>Videodança e documentário como desdobramento da pesquisa.</h3><span className="text-link">Ver trabalhos <b>↗</b></span></div>
          </a>
        </div>
      </section>

      <section className="contact-band" id="contato"><div className="section-shell contact-inner"><p className="eyebrow">Convites, circulação, formação e parcerias</p><a href="mailto:producaoflyinglow@gmail.com">Falar com<br />Flying Low <span>↗</span></a></div></section>
    </main>
  );
}
