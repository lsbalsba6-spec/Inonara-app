import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchStories, fetchStory } from "../lib/api";
import { ArrowLeft, BookOpen, Volume2 } from "lucide-react";
import { useI18n } from "../i18n";
import { searchableText, sortChronologically } from "../lib/contentSort";
import { SmartImage } from "../components/SmartImage";
import { Translated } from "../lib/useTranslated";

export const StoriesList = () => {
  const { t, lang } = useI18n();
  const [stories, setStories] = useState([]);
  const [query, setQuery] = useState("");
  useEffect(() => { fetchStories().then(setStories).catch(() => {}); }, []);
  const visible = useMemo(() => {
    const needle = query.trim().toLocaleLowerCase(lang === "fr" ? "fr" : "en");
    return sortChronologically(stories.filter((s) => {
      const haystack = searchableText(s.title, s.summary, s.era);
      return !needle || haystack.includes(needle);
    }), "era", "title");
  }, [stories, query, lang]);
  const illustrated = useMemo(() => stories.filter((s) => s.image_url || s.wikipedia_title).length, [stories]);
  return (
    <div className="pt-32 pb-24 max-w-[1600px] mx-auto px-6 md:px-10" data-testid="stories-page">
      <p className="overline">{t("page.stories.overline")}</p>
      <h1 className="font-serif text-5xl md:text-6xl text-bone mt-3 tracking-tight" data-testid="stories-title">{t("page.stories.title")}</h1>
      <p className="text-bone/70 max-w-2xl mt-6 font-light">{t("page.stories.lead")}</p>
      <div className="mt-5 inline-flex items-center gap-2 px-3 py-1.5 border border-gold/30 text-gold/80 text-[0.6rem] uppercase tracking-[0.22em] bg-gold/[0.04] rounded-full" data-testid="stories-narrate-banner">
        <Volume2 size={12} className="opacity-80" />
        {t("narrate.comingSoon")}
      </div>

      <section className="mt-10 grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-gold/20 bg-gold/[0.05] p-5">
          <p className="overline text-gold">{t("stories.corpus.label")}</p>
          <p className="mt-2 font-serif text-3xl text-bone">{stories.length}</p>
          <p className="mt-1 text-xs text-bone/50">{t("stories.corpus.copy")}</p>
        </div>
        <div className="rounded-xl border border-bone/10 bg-bone/[0.025] p-5">
          <p className="overline">{t("stories.illustrations.label")}</p>
          <p className="mt-2 font-serif text-3xl text-bone">{illustrated}</p>
          <p className="mt-1 text-xs text-bone/50">{t("stories.illustrations.copy")}</p>
        </div>
        <Link to="/timeline" className="rounded-xl border border-bone/10 bg-bone/[0.025] p-5 transition hover:border-gold/40">
          <p className="overline">{t("stories.context.label")}</p>
          <p className="mt-2 font-serif text-xl text-bone">{t("stories.context.title")}</p>
          <p className="mt-1 text-xs text-bone/50">{t("stories.context.copy")}</p>
        </Link>
      </section>
      <section className="mt-8 rounded-2xl border border-bone/10 bg-bone/[0.02] p-5">
        <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={t("stories.search.placeholder")} className="w-full rounded-xl border border-bone/15 bg-ebony px-4 py-3 text-sm text-bone outline-none placeholder:text-bone/35 focus:border-gold/50" />
        <p className="mt-4 text-xs text-bone/45">{visible.length} {visible.length > 1 ? t("stories.count.many") : t("stories.count.one")}</p>
      </section>

      <div className="grid md:grid-cols-2 gap-6 mt-8">
        {visible.map((s) => (
          <Link key={s.id} to={`/story/${s.id}`} data-testid={`story-card-${s.id}`} className="museum-card overflow-hidden group block">
            <SmartImage src={s.image_url} wikipediaTitle={s.wikipedia_title} alt={s.title} wrapperClassName="aspect-[16/9]" className="h-full w-full object-cover opacity-70 transition duration-700 group-hover:scale-105 group-hover:opacity-90" credit={s.image_credit} sourceUrl={s.image_source_url} />
            <div className="p-8">
              <div className="flex items-center gap-2 text-gold"><BookOpen size={14} /><Translated as="span" className="overline text-[0.65rem]">{s.era || ""}</Translated></div>
              <Translated as="h3" className="font-serif text-3xl text-bone mt-4 group-hover:text-gold transition-colors">{s.title || ""}</Translated>
              <Translated as="p" className="text-bone/70 mt-3 font-light leading-relaxed">{s.summary || ""}</Translated>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

const NarrateButton = () => {
  const { t } = useI18n();
  return (
    <div className="mt-5 flex items-center gap-2" data-testid="narrate-block">
      <span className="inline-flex items-center gap-2 px-3 py-1.5 border border-gold/30 text-gold/80 text-[0.6rem] uppercase tracking-[0.22em] bg-gold/[0.04] rounded-full" data-testid="narrate-coming-soon">
        <Volume2 size={12} className="opacity-80" />{t("narrate.comingSoon")}
      </span>
    </div>
  );
};

export const StoryDetail = () => {
  const { t } = useI18n();
  const { id } = useParams();
  const [s, setS] = useState(null);
  useEffect(() => { fetchStory(id).then(setS).catch(() => {}); }, [id]);
  if (!s) return <div className="pt-32 text-center text-bone/40 overline">{t("common.loading")}</div>;
  const chapters = Array.isArray(s.chapters) ? s.chapters : [];

  return (
    <div className="pt-32 pb-24 max-w-3xl mx-auto px-6" data-testid="story-detail">
      <Link to="/stories" className="text-bone/60 hover:text-gold text-xs uppercase tracking-[0.2em] flex items-center gap-2" data-testid="back-to-stories"><ArrowLeft size={14} /> {t("common.back.stories")}</Link>
      <SmartImage src={s.image_url} wikipediaTitle={s.wikipedia_title} alt={s.title} wrapperClassName="mt-8 aspect-[16/9] rounded-2xl" className="h-full w-full object-cover" credit={s.image_credit} sourceUrl={s.image_source_url} />
      <Translated as="p" className="overline mt-8">{s.era || ""}</Translated>
      <Translated as="h1" className="font-serif text-5xl text-bone mt-3 leading-tight">{s.title || ""}</Translated>
      <Translated as="p" className="text-bone/70 mt-6 text-lg font-light leading-relaxed">{s.summary || ""}</Translated>

      <section className="mt-12 grid gap-4 md:grid-cols-3">
        <Link to="/timeline" className="rounded-xl border border-gold/20 bg-gold/[0.04] p-5 transition hover:border-gold/50"><p className="overline text-gold">{t("stories.detail.timeline.label")}</p><p className="mt-2 font-serif text-lg text-bone">{t("stories.detail.timeline.title")}</p></Link>
        <Link to="/atlas" className="rounded-xl border border-bone/10 p-5 transition hover:border-gold/40"><p className="overline">{t("stories.detail.atlas.label")}</p><p className="mt-2 font-serif text-lg text-bone">{t("stories.detail.atlas.title")}</p></Link>
        <Link to="/civilizations" className="rounded-xl border border-bone/10 p-5 transition hover:border-gold/40"><p className="overline">{t("stories.detail.contexts.label")}</p><p className="mt-2 font-serif text-lg text-bone">{t("stories.detail.contexts.title")}</p></Link>
      </section>

      <div className="mt-16 space-y-14">
        {chapters.map((ch, i) => (
          <article key={i} data-testid={`chapter-${i}`} className="animate-fade-up" style={{ animationDelay: `${i * 100}ms` }}>
            <p className="overline">{t("story.chapter")} {i + 1}</p>
            <Translated as="h2" className="font-serif text-3xl text-bone mt-3">{ch.heading || ""}</Translated>
            <Translated as="p" className="text-bone/80 mt-5 text-lg font-light leading-relaxed">{ch.body || ""}</Translated>
            <NarrateButton />
          </article>
        ))}
      </div>

      {(s.image_credit || s.image_source_url) && (
        <section className="mt-16 border-t border-[#2A2421] pt-10">
          <p className="overline text-gold">{t("stories.visualDocs")}</p>
          {s.image_credit && <p className="mt-3 text-sm text-bone/65">{t("stories.credit")} : {s.image_credit}</p>}
          {s.image_source_url && <a href={s.image_source_url} target="_blank" rel="noreferrer" className="mt-3 inline-flex text-xs text-gold underline underline-offset-2">{t("stories.visualRights")}</a>}
        </section>
      )}
      {s.sources?.length > 0 && (
        <div className="mt-20 border-t border-[#2A2421] pt-10">
          <p className="overline">{t("common.sources")}</p>
          <ul className="list-disc pl-5 space-y-2 mt-4 text-bone/70">{s.sources.map((src, index) => <Translated as="li" key={src?.id || src?.url || index}>{src}</Translated>)}</ul>
        </div>
      )}
    </div>
  );
};
