import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchStories, fetchStory } from "../lib/api";
import { ArrowLeft, BookOpen, Volume2 } from "lucide-react";
import { useI18n } from "../i18n";

export const StoriesList = () => {
  const { t } = useI18n();
  const [stories, setStories] = useState([]);
  useEffect(() => { fetchStories().then(setStories).catch(() => {}); }, []);
  return (
    <div className="pt-32 pb-24 max-w-[1600px] mx-auto px-6 md:px-10" data-testid="stories-page">
      <p className="overline">{t("page.stories.overline")}</p>
      <h1 className="font-serif text-5xl md:text-6xl text-bone mt-3 tracking-tight" data-testid="stories-title">{t("page.stories.title")}</h1>
      <p className="text-bone/70 max-w-2xl mt-6 font-light">{t("page.stories.lead")}</p>
      <div className="mt-5 inline-flex items-center gap-2 px-3 py-1.5 border border-gold/30 text-gold/80 text-[0.6rem] uppercase tracking-[0.22em] bg-gold/[0.04] rounded-full" data-testid="stories-narrate-banner">
        <Volume2 size={12} className="opacity-80" />
        {t("narrate.comingSoon")}
      </div>

      <div className="grid md:grid-cols-2 gap-6 mt-14">
        {stories.map((s) => (
          <Link
            key={s.id}
            to={`/story/${s.id}`}
            data-testid={`story-card-${s.id}`}
            className="museum-card p-8 group block"
          >
            <div className="flex items-center gap-2 text-gold">
              <BookOpen size={14} />
              <span className="overline text-[0.65rem]">{s.era}</span>
            </div>
            <h3 className="font-serif text-3xl text-bone mt-4 group-hover:text-gold transition-colors">{s.title}</h3>
            <p className="text-bone/70 mt-3 font-light leading-relaxed">{s.summary}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

// Voice narration is being upgraded — Web Speech + ElevenLabs Studio code
// is preserved in git history at iter13. For now we show a single, honest
// "coming soon" indicator so we don't ship inconsistent browser-voice audio.
const NarrateButton = () => {
  const { t } = useI18n();
  return (
    <div className="mt-5 flex items-center gap-2" data-testid="narrate-block">
      <span
        className="inline-flex items-center gap-2 px-3 py-1.5 border border-gold/30 text-gold/80 text-[0.6rem] uppercase tracking-[0.22em] bg-gold/[0.04] rounded-full"
        data-testid="narrate-coming-soon"
      >
        <Volume2 size={12} className="opacity-80" />
        {t("narrate.comingSoon")}
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

  return (
    <div className="pt-32 pb-24 max-w-3xl mx-auto px-6" data-testid="story-detail">
      <Link to="/stories" className="text-bone/60 hover:text-gold text-xs uppercase tracking-[0.2em] flex items-center gap-2" data-testid="back-to-stories">
        <ArrowLeft size={14} /> {t("common.back.stories")}
      </Link>
      <p className="overline mt-8">{s.era}</p>
      <h1 className="font-serif text-5xl text-bone mt-3 leading-tight">{s.title}</h1>
      <p className="text-bone/70 mt-6 text-lg font-light leading-relaxed">{s.summary}</p>

      <div className="mt-16 space-y-14">
        {s.chapters.map((ch, i) => (
          <article key={i} data-testid={`chapter-${i}`} className="animate-fade-up" style={{ animationDelay: `${i * 100}ms` }}>
            <p className="overline">{t("story.chapter")} {i + 1}</p>
            <h2 className="font-serif text-3xl text-bone mt-3">{ch.heading}</h2>
            <p className="text-bone/80 mt-5 text-lg font-light leading-relaxed">{ch.body}</p>
            <NarrateButton text={`${ch.heading}. ${ch.body}`} />
          </article>
        ))}
      </div>

      {s.sources?.length > 0 && (
        <div className="mt-20 border-t border-[#2A2421] pt-10">
          <p className="overline">{t("common.sources")}</p>
          <ul className="list-disc pl-5 space-y-2 mt-4 text-bone/70">
            {s.sources.map((src) => <li key={src}>{src}</li>)}
          </ul>
        </div>
      )}
    </div>
  );
};
