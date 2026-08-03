import { useEffect, useState } from "react";
import { fetchCivilization, fetchCivilizations } from "../lib/api";
import { useI18n } from "../i18n";

const fmt = (y) => (y < 0 ? `${Math.abs(y)} BCE` : `${y} CE`);

const Column = ({ civs, civ, onChange, side, t }) => (
  <div className="flex-1 min-w-0" data-testid={`compare-column-${side}`}>
    <select
      value={civ?.id || ""}
      onChange={(e) => onChange(e.target.value)}
      className="w-full bg-[#12100E] border border-[#2A2421] text-bone px-4 py-3 text-sm uppercase tracking-[0.15em] focus:border-gold/60 outline-none"
      data-testid={`compare-select-${side}`}
    >
      <option value="">{t("compare.selectCiv")}</option>
      {civs.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
    </select>

    {civ && (
      <div className="mt-6 space-y-6">
        <div className="relative aspect-[4/3] overflow-hidden">
          <img src={civ.image_url} alt={civ.name} className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-ebony to-transparent" />
          <div className="absolute bottom-0 left-0 p-5">
            <p className="overline">{t(`region.${civ.region}`)}</p>
            <h2 className="font-serif text-3xl text-bone mt-1">{civ.name}</h2>
            <p className="text-gold text-xs uppercase tracking-[0.2em] mt-1">{fmt(civ.era_start)} — {fmt(civ.era_end)}</p>
          </div>
        </div>

        {[
          [t("compare.political"), civ.political_structure],
          [t("compare.economy"), civ.economy_and_trade],
          [t("compare.knowledge"), civ.science_and_knowledge],
          [t("compare.art"), civ.art_and_culture],
        ].map(([h, body]) => (
          <div key={h}>
            <p className="overline">{h}</p>
            <p className="text-bone/80 mt-2 font-light leading-relaxed text-sm">{body}</p>
          </div>
        ))}
      </div>
    )}
  </div>
);

const Compare = () => {
  const { t } = useI18n();
  const [civs, setCivs] = useState([]);
  const [leftId, setLeftId] = useState("mali");
  const [rightId, setRightId] = useState("songhai");
  const [left, setLeft] = useState(null);
  const [right, setRight] = useState(null);

  useEffect(() => { fetchCivilizations().then(setCivs).catch(() => {}); }, []);
  useEffect(() => { if (leftId) fetchCivilization(leftId).then(setLeft); else setLeft(null); }, [leftId]);
  useEffect(() => { if (rightId) fetchCivilization(rightId).then(setRight); else setRight(null); }, [rightId]);

  return (
    <div className="pt-32 pb-24 max-w-[1600px] mx-auto px-6 md:px-10" data-testid="compare-page">
      <p className="overline">{t("page.compare.overline")}</p>
      <h1 className="font-serif text-5xl md:text-6xl text-bone mt-3 tracking-tight" data-testid="compare-title">{t("page.compare.title")}</h1>
      <p className="text-bone/70 max-w-2xl mt-6 font-light">{t("page.compare.lead")}</p>

      <div className="flex flex-col lg:flex-row gap-10 mt-14">
        <Column civs={civs} civ={left} onChange={setLeftId} side="left" t={t} />
        <div className="hidden lg:block w-px bg-[#2A2421]" />
        <Column civs={civs} civ={right} onChange={setRightId} side="right" t={t} />
      </div>
    </div>
  );
};

export default Compare;
