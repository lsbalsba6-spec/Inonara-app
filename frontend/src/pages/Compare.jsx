import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { SmartImage } from "../components/SmartImage";
import { fetchCivilization, fetchCivilizations } from "../lib/api";
import { useI18n } from "../i18n";
import { useTranslated } from "../lib/useTranslated";
import { localizedValue } from "../lib/contentSort";

const fmt = (y, t) => (y < 0 ? `${Math.abs(y)} ${t("date.bce")}` : `${y} ${t("date.ce")}`);

const CivOption = ({ civ, lang }) => {
  const name = useTranslated(civ.name || "");
  return <option value={civ.id}>{name || localizedValue(civ.name, lang)}</option>;
};

const ComparisonBody = ({ civ, t, lang }) => {
  const name = useTranslated(civ.name || "");
  const political = useTranslated(civ.political_structure || "");
  const economy = useTranslated(civ.economy_and_trade || "");
  const knowledge = useTranslated(civ.science_and_knowledge || "");
  const art = useTranslated(civ.art_and_culture || "");
  const displayName = name || localizedValue(civ.name, lang);
  const regionKey = typeof civ.region === "string" ? civ.region : "";
  const regionLabel = regionKey ? t(`region.${regionKey}`) : localizedValue(civ.region, lang);

  return (
    <div className="mt-6 space-y-6">
      <div className="relative aspect-[4/3] overflow-hidden">
        <SmartImage src={civ.image_url} wikipediaTitle={civ.wikipedia_title} alt={displayName} wrapperClassName="absolute inset-0" className="h-full w-full object-cover" credit={civ.image_credit} sourceUrl={civ.image_source_url} />
        <div className="absolute inset-0 bg-gradient-to-t from-ebony to-transparent" />
        <div className="absolute bottom-0 left-0 p-5">
          <p className="overline">{regionLabel}</p>
          <h2 className="font-serif text-3xl text-bone mt-1">{displayName}</h2>
          <p className="text-gold text-xs uppercase tracking-[0.2em] mt-1">{fmt(civ.era_start, t)} — {fmt(civ.era_end, t)}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-xl border border-bone/10 bg-bone/[0.025] p-4">
          <p className="overline text-[0.6rem]">{t("compare.region")}</p>
          <p className="mt-2 text-sm text-bone/80">{regionLabel}</p>
        </div>
        <div className="rounded-xl border border-bone/10 bg-bone/[0.025] p-4">
          <p className="overline text-[0.6rem]">{t("compare.duration")}</p>
          <p className="mt-2 text-sm text-bone/80">{Number.isFinite(civ.era_start) && Number.isFinite(civ.era_end) ? `${Math.abs(civ.era_end - civ.era_start)} ${t("compare.years")}` : "—"}</p>
        </div>
      </div>

      {[
        [t("compare.political"), political || localizedValue(civ.political_structure, lang)],
        [t("compare.economy"), economy || localizedValue(civ.economy_and_trade, lang)],
        [t("compare.knowledge"), knowledge || localizedValue(civ.science_and_knowledge, lang)],
        [t("compare.art"), art || localizedValue(civ.art_and_culture, lang)],
      ].map(([h, body]) => (
        <div key={h}>
          <p className="overline">{h}</p>
          <p className="text-bone/80 mt-2 font-light leading-relaxed text-sm">{body || "—"}</p>
        </div>
      ))}
    </div>
  );
};

const Column = ({ civs, civ, onChange, side, t, lang }) => (
  <div className="flex-1 min-w-0" data-testid={`compare-column-${side}`}>
    <select
      value={civ?.id || ""}
      onChange={(e) => onChange(e.target.value)}
      className="w-full bg-[#12100E] border border-[#2A2421] text-bone px-4 py-3 text-sm uppercase tracking-[0.15em] focus:border-gold/60 outline-none"
      data-testid={`compare-select-${side}`}
    >
      <option value="">{t("compare.selectCiv")}</option>
      {civs.map((c) => <CivOption key={c.id} civ={c} lang={lang} />)}
    </select>

    {civ && <ComparisonBody civ={civ} t={t} lang={lang} />}
  </div>
);

const ReadingNote = ({ left, right, t, lang }) => {
  const leftName = useTranslated(left?.name || "");
  const rightName = useTranslated(right?.name || "");
  if (!left || !right) return null;
  const displayLeft = leftName || localizedValue(left.name, lang);
  const displayRight = rightName || localizedValue(right.name, lang);

  return (
    <section className="mt-8 rounded-2xl border border-gold/15 bg-gold/[0.03] p-5">
      <p className="overline text-gold">{t("compare.reading.label")}</p>
      <p className="mt-2 text-sm leading-6 text-bone/65">
        {t("compare.reading.copy").replace("{left}", displayLeft).replace("{right}", displayRight)}
      </p>
    </section>
  );
};

const Compare = () => {
  const { t, lang } = useI18n();
  const [civs, setCivs] = useState([]);
  const [leftId, setLeftId] = useState("mali");
  const [rightId, setRightId] = useState("songhai");
  const [left, setLeft] = useState(null);
  const [right, setRight] = useState(null);

  useEffect(() => { fetchCivilizations().then(setCivs).catch(() => {}); }, []);
  useEffect(() => { if (leftId) fetchCivilization(leftId).then(setLeft).catch(() => setLeft(null)); else setLeft(null); }, [leftId]);
  useEffect(() => { if (rightId) fetchCivilization(rightId).then(setRight).catch(() => setRight(null)); else setRight(null); }, [rightId]);

  return (
    <div className="pt-32 pb-24 max-w-[1600px] mx-auto px-6 md:px-10" data-testid="compare-page">
      <p className="overline">{t("page.compare.overline")}</p>
      <h1 className="font-serif text-5xl md:text-6xl text-bone mt-3 tracking-tight" data-testid="compare-title">{t("page.compare.title")}</h1>
      <p className="text-bone/70 max-w-2xl mt-6 font-light">{t("page.compare.lead")}</p>

      <section className="mt-10 grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-gold/20 bg-gold/[0.05] p-5">
          <p className="overline text-gold">{t("compare.corpus.label")}</p>
          <p className="mt-2 font-serif text-3xl text-bone">{civs.length}</p>
          <p className="mt-1 text-xs text-bone/50">{t("compare.corpus.copy")}</p>
        </div>
        <Link to="/timeline" className="rounded-xl border border-bone/10 bg-bone/[0.025] p-5 transition hover:border-gold/40">
          <p className="overline">{t("compare.time.label")}</p><p className="mt-2 font-serif text-xl text-bone">{t("compare.time.title")}</p>
          <p className="mt-1 text-xs text-bone/50">{t("compare.time.copy")}</p>
        </Link>
        <Link to="/atlas" className="rounded-xl border border-bone/10 bg-bone/[0.025] p-5 transition hover:border-gold/40">
          <p className="overline">{t("compare.space.label")}</p><p className="mt-2 font-serif text-xl text-bone">{t("compare.space.title")}</p>
          <p className="mt-1 text-xs text-bone/50">{t("compare.space.copy")}</p>
        </Link>
      </section>

      <ReadingNote left={left} right={right} t={t} lang={lang} />

      <div className="flex flex-col lg:flex-row gap-10 mt-10">
        <Column civs={civs} civ={left} onChange={setLeftId} side="left" t={t} lang={lang} />
        <div className="hidden lg:block w-px bg-[#2A2421]" />
        <Column civs={civs} civ={right} onChange={setRightId} side="right" t={t} lang={lang} />
      </div>
    </div>
  );
};

export default Compare;
