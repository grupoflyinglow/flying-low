export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="section-shell site-footer-grid">
        {/* vinext serves these as standard documents; anchors avoid client-runtime routing. */}
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        <a className="footer-wordmark" href="/" aria-label="Flying Low — início">FL</a>
        <div className="footer-intro">
          <p className="eyebrow">Flying Low · São Paulo, Brasil</p>
          <p>Breaking como linguagem cênica, política e poética.</p>
        </div>
        <nav aria-label="Navegação no rodapé">
          <a href="/grupo">Grupo</a>
          <a href="/cenicas">Cênicas</a>
          <a href="/audiovisual">Audiovisual</a>
          <a href="/formacao">Formação</a>
        </nav>
        <a className="footer-contact" href="mailto:producaoflyinglow@gmail.com">producaoflyinglow@gmail.com <span>↗</span></a>
      </div>
      <div className="section-shell footer-meta"><span>© {new Date().getFullYear()} Flying Low</span><span>Em atividade desde 2016</span></div>
    </footer>
  );
}
