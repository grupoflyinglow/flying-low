import Link from "next/link";

type SiteNavProps = { light?: boolean };

export function SiteNav({ light = false }: SiteNavProps) {
  return (
    <header className={`site-nav ${light ? "site-nav-light" : ""}`}>
      <Link className="wordmark" href="/" aria-label="Flying Low — início">FL</Link>
      <nav aria-label="Navegação principal">
        <Link href="/">Início</Link>
        <Link href="/cenicas">Cênicas</Link>
        <Link href="/audiovisual">Audiovisual</Link>
      </nav>
      <a className="nav-contact" href="mailto:contato@flyinglow.art">Contato <span>↗</span></a>
    </header>
  );
}
