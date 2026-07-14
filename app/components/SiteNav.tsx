type SiteNavProps = { light?: boolean };

export function SiteNav({ light = false }: SiteNavProps) {
  return (
    <header className={`site-nav ${light ? "site-nav-light" : ""}`}>
      {/* vinext serves these as standard documents; anchors avoid client-runtime routing. */}
      {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
      <a className="wordmark" href="/" aria-label="Flying Low — início">FL</a>
      <nav aria-label="Navegação principal">
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        <a href="/">Início</a>
        <a href="/cenicas">Cênicas</a>
        <a href="/audiovisual">Audiovisual</a>
      </nav>
      <a className="nav-contact" href="mailto:contato@flyinglow.art">Contato <span>↗</span></a>
    </header>
  );
}
