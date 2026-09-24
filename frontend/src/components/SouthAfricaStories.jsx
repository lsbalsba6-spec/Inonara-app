import { useMemo, useState } from "react";
import { useI18n } from "../i18n";
import { localizedValue, searchableText } from "../lib/contentSort";
import { useTranslated } from "../lib/useTranslated";

const COPY = {
  en: { overline:"Stories & case studies", title:"Connected histories through places, people and themes", intro:"Explore the long-form case studies already documented in the South Africa dossier, from cities and landscapes to education, memory, culture, science and regional connections.", search:"Search a story, period or theme…", all:"All stories", period:"Period", chapter:"Chapter", empty:"No story matches this search." },
  fr: { overline:"Récits & études de cas", title:"Histoires connectées par les lieux, les personnes et les thèmes", intro:"Explorez les études de cas déjà documentées dans le dossier Afrique du Sud : villes, paysages, éducation, mémoire, culture, sciences et connexions régionales.", search:"Rechercher un récit, une période ou un thème…", all:"Tous les récits", period:"Période", chapter:"Chapitre", empty:"Aucun récit ne correspond à cette recherche." },
};

function T({ value }) {
  const { lang } = useI18n();
  const translated = useTranslated(value || "");
  return translated || localizedValue(value, lang) || null;
}

function SourceLinks({ ids = [], sourceMap = new Map() }) {
  const { lang } = useI18n();
  return <div className="mt-5 flex flex-wrap gap-2">{ids.map((id) => {
    const source = sourceMap.get(id);
    if (!source?.url) return null;
    return <a key={id} href={source.url} target="_blank" rel="noreferrer" className="rounded-full border border-gold/25 px-3 py-1 text-[11px] text-gold/85 hover:bg-gold/10">{localizedValue(source.publisher, lang) || localizedValue(source.title, lang) || id}</a>;
  })}</div>;
}

export function SouthAfricaStories({ dossier = {}, sourceMap = new Map() }) {
  const { lang } = useI18n();
  const copy = COPY[lang] || COPY.en;
  const stories = useMemo(() => Array.isArray(dossier.stories) ? dossier.stories : [], [dossier.stories]);
  const [query, setQuery] = useState("");
  const [openId, setOpenId] = useState(stories[0]?.id || null);
  const visible = useMemo(() => {
    const needle = searchableText(query);
    if (!needle) return stories;
    return stories.filter((story) => searchableText(story.title, story.summary, story.era, story.period, story.chapters?.map((chapter) => [chapter.heading, chapter.body])).includes(needle));
  }, [stories, query]);

  return <div className="space-y-8">
    <header className="rounded-2xl border border-gold/20 bg-gradient-to-br from-gold/[0.08] to-transparent p-6">
      <p className="overline text-gold">{copy.overline}</p>
      <h2 className="mt-2 font-serif text-3xl text-bone">{copy.title}</h2>
      <p className="mt-3 max-w-3xl leading-7 text-bone/65">{copy.intro}</p>
    </header>

    <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={copy.search} aria-label={copy.search} className="w-full rounded-xl border border-bone/15 bg-bone/[0.025] px-4 py-3 text-sm text-bone outline-none placeholder:text-bone/35 focus:border-gold/50" />

    <div className="grid gap-4">
      {visible.map((story, index) => {
        const id = story.id || `story-${index}`;
        const expanded = openId === id;
        return <article key={id} className="overflow-hidden rounded-2xl border border-bone/10 bg-bone/[0.025]">
          <button type="button" onClick={() => setOpenId(expanded ? null : id)} className="w-full p-5 text-left" aria-expanded={expanded}>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                {(story.era || story.period) && <p className="text-[10px] uppercase tracking-[0.18em] text-gold"><T value={story.era || story.period} /></p>}
                <h3 className="mt-2 font-serif text-2xl text-bone"><T value={story.title} /></h3>
              </div>
              <span className="text-xl text-gold">{expanded ? "−" : "+"}</span>
            </div>
            {story.summary && <p className="mt-4 max-w-4xl leading-7 text-bone/70"><T value={story.summary} /></p>}
          </button>

          {expanded && <div className="border-t border-bone/10 px-5 pb-6 pt-5">
            {story.chapters?.length > 0 && <div className="space-y-4">
              {story.chapters.map((chapter, chapterIndex) => <section key={chapter.id || `${id}-chapter-${chapterIndex}`} className="rounded-xl border border-bone/10 bg-black/10 p-5">
                <p className="text-[10px] uppercase tracking-[0.18em] text-gold/70">{copy.chapter} {chapterIndex + 1}</p>
                <h4 className="mt-2 font-serif text-xl text-bone"><T value={chapter.heading || chapter.title} /></h4>
                <p className="mt-3 text-sm leading-7 text-bone/72"><T value={chapter.body || chapter.text} /></p>
              </section>)}
            </div>}
            <SourceLinks ids={story.sources || story.sourceIds || []} sourceMap={sourceMap} />
          </div>}
        </article>;
      })}
    </div>
    {!visible.length && <div className="rounded-xl border border-bone/10 p-5 text-bone/60">{copy.empty}</div>}
  </div>;
}

export default SouthAfricaStories;
