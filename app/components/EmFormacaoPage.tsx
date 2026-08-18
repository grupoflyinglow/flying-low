"use client";

/* eslint-disable @next/next/no-img-element */
import "./em-formacao-page.css";
import { useLocale } from "./LocaleProvider";
import { SiteNav } from "./SiteNav";

type Episode = {
  id: string;
  name: string;
};

type Season = {
  number: 1 | 2;
  year: string;
  playlistId: string;
  episodes: Episode[];
};

const seasons: Season[] = [
  {
    number: 1,
    year: "2019",
    playlistId: "PLFCLbfPrGy7Wbtit0RQmJhksj-NRihhvP",
    episodes: [
      { id: "5Yf23_6TWVU", name: "Henrique Bianchini" },
      { id: "56FQgBwKDsI", name: "Mr. Fê" },
      { id: "k5vjNCDuZts", name: "B.girl Thaisinha" },
      { id: "hqOcoKp8wlc", name: "B.girl Aline" },
      { id: "Wsdpkyce1_Y", name: "B.boy Gerson" },
      { id: "3ZOSOa6V0IA", name: "Douglas Iesus" },
      { id: "eh1iFyy-bzQ", name: "Márcio Greyk" },
    ],
  },
  {
    number: 2,
    year: "2023",
    playlistId: "PLFCLbfPrGy7X_yIP8OzFL0918sa-pLZgC",
    episodes: [
      { id: "-faXk6Ccp3g", name: "Manu" },
      { id: "26R16sgpr-w", name: "Tati Sanchis" },
      { id: "7iSXz5dzV6Y", name: "Anelise Mayumi" },
      { id: "85kGhgSwF_U", name: "Gui Nobre" },
      { id: "86Hs-faIxho", name: "Kika Souza" },
      { id: "T7lWm4UYQfo", name: "Fabgirl" },
    ],
  },
];

const copy = {
  "pt-BR": {
    back: "← Audiovisual",
    eyebrow: "Série documental",
    title: "Em Formação",
    season: (number: number) => `${number}ª temporada`,
    synopsis: {
      1: "Contemplada pelo Programa VAI em 2018, a primeira temporada percorre histórias do hip hop pela dança breaking: sua origem nos Estados Unidos, sua presença em São Paulo, a atuação das mulheres na cena e a entrada das danças urbanas nos teatros.",
      2: "A segunda temporada nasce dentro de Na Manha com Flying Low, projeto contemplado pelo edital PROAC nº 31/2021 — Cidadania, Cultura Negra, Urbana e Hip Hop — e amplia essa escuta para novas trajetórias da cena.",
    },
    watchSeason: "Ver temporada completa",
    watchEpisode: "Assistir episódio",
    episode: "Episódio",
  },
  en: {
    back: "← Screen work",
    eyebrow: "Documentary series",
    title: "In Formation",
    season: (number: number) => `Season ${number}`,
    synopsis: {
      1: "Supported by the VAI Programme in 2018, the first season traces hip-hop histories through breaking: its origins in the United States, its presence in São Paulo, women’s work in the scene, and the arrival of urban dance in theatres.",
      2: "The second season grew from Na Manha com Flying Low, supported by PROAC 31/2021 — Citizenship, Black, Urban, and Hip Hop Culture — and extends that listening to new trajectories within the scene.",
    },
    watchSeason: "Watch full season",
    watchEpisode: "Watch episode",
    episode: "Episode",
  },
} as const;

function videoHref(season: Season, episode: Episode, index: number) {
  return `https://www.youtube.com/watch?v=${episode.id}&list=${season.playlistId}&index=${index + 1}`;
}

export function EmFormacaoPage() {
  const { locale } = useLocale();
  const t = copy[locale];

  return (
    <main className="editorial-page em-formacao-page" id="main-content" tabIndex={-1}>
      <SiteNav />
      <header className="em-formacao-hero section-shell">
        <a className="em-formacao-back" href={locale === "en" ? "/en/screen" : "/audiovisual"}>{t.back}</a>
        <p className="eyebrow">{t.eyebrow}</p>
        <h1>{t.title}</h1>
      </header>

      <div className="em-formacao-seasons">
        {seasons.map((season) => (
          <section className="em-formacao-season section-shell" key={season.playlistId} aria-labelledby={`em-formacao-season-${season.number}`}>
            <div className="em-formacao-season-intro">
              <p className="eyebrow">{season.year}</p>
              <h2 id={`em-formacao-season-${season.number}`}>{t.season(season.number)}</h2>
              <p>{t.synopsis[season.number]}</p>
              <a className="em-formacao-season-link" href={`https://www.youtube.com/playlist?list=${season.playlistId}`} target="_blank" rel="noreferrer">
                {t.watchSeason} <span aria-hidden="true">↗</span>
              </a>
            </div>

            <div className="em-formacao-episode-grid">
              {season.episodes.map((episode, index) => (
                <article className="em-formacao-episode-card" key={episode.id}>
                  <a href={videoHref(season, episode, index)} target="_blank" rel="noreferrer" aria-label={`${t.watchEpisode}: ${episode.name}`}>
                    <img src={`https://i.ytimg.com/vi/${episode.id}/hqdefault.jpg`} alt="" loading="lazy" decoding="async" />
                    <span className="em-formacao-episode-overlay" aria-hidden="true" />
                    <span className="em-formacao-episode-play" aria-hidden="true">↗</span>
                  </a>
                  <div className="em-formacao-episode-copy">
                    <span>{t.episode} {String(index + 1).padStart(2, "0")}</span>
                    <h3>{episode.name}</h3>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
