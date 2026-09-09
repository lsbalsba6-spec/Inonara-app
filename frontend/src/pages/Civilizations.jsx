import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { fetchCivilizations } from "../lib/api";
import { useI18n } from "../i18n";
import { sortChronologically } from "../lib/contentSort";
import { SmartImage } from "../components/SmartImage";

const fmt = (y) => (y < 0 ? `${Math.abs(y)} BCE` : `${y} CE`);

const Civilizations = () => {
  const { t } = useI18n();
  const [civs, setCivs] = useState([]);
  const [region, setRegion] = useState("all");
  const [query, setQuery] = useState("");
  useEffect(() => { fetchCivilizations().then(setCivs).catch(() => {}); }, []);

  const regions = useMemo(() => [...new Set(civs.map((c) => c.region).filter(Boolean))].sort(), [civs]);
  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return sortChronologically(
      civs.filter((c) => {
        const matchesRegion = region === "all" || c.region === region;
        const haystack = `${c.name || ""} ${c.summary || ""} ${c.region || ""}`.toLowerCase();
        return matchesRegion && (!needle || haystack.includes(needle));
      }),
      "era_start",
      "name"
    );
  }, [civs, region, query]);

  const earliest = civs.length ? Math.min(...civs.map((c) => c.era_start).filter(Number.isFinite)) : null;
  const latest = civs.length ? Math.max(...civs.map((c) => c.era_end).filter(Number.isFinite)) : null;

  return (
    <div className="pt-32 pb-24 max-w-[1600px] mx-auto px-6 md:px-10" data-testid="civilizations-page">
      <p className="overline">{t("page.civilizations.overline")}</p>
      <h1 className="font-serif text-5xl md:text-6xl text-bone mt-3 tracking-tight" data-testid="civilizations-title">{t("page.civilizations.title")}</h1>
      <p className="text-bone/70 max-w-2xl mt-6 font-light leading-relaxed">
        {t("page.civilizations.lead")}
      </p>

      <section className="mt-10 grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-gold/20 bg-gold/[0.05] p-5">
          <p className="overline text-gold">Corpus actuel</p>
          <p className="mt-2 font-serif text-3xl text-bone">{civs.length}</p>
          <p className="mt-1 text-xs text-bone/50">civilisations et formations historiques documentées</p>
        </div>
        <div className="rounded-xl border border-bone/10 bg-bone/[0.025] p-5">
          <p className="overline">Amplitude chronologique</p>
          <p className="mt-2 font-serif text-xl text-bone">{earliest !== null ? fmt(earliest) : "—"} → {latest !== null ? fmt(latest) : "—"}</p>
          <p className="mt-1 text-xs text-bone/50">du corpus actuellement disponible</p>
        </div>
        <Link to="/atlas" className="rounded-xl border border-bone/10 bg-bone/[0.025] p-5 transition hover:border-gold/40">
          <p className="overline">Explorer autrement</p>
          <p className="mt-2 font-serif text-xl text-bone">Voir dans l’Atlas</p>
          <p className="mt-1 text-xs text-bone/50">replace les civilisations dans l’espace, le temps et les migrations</p>
        </Link>
      </section>

      <section className="mt-10 rounded-2xl border border-bone/10 bg-bone/[0.02] p-5">
        <div className="grid gap-4 lg:grid-cols-[1fr_auto]">
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Rechercher une civilisation, une région ou un mot-clé…"
            className="w-full rounded-xl border border-bone/15 bg-ebony px-4 py-3 text-sm text-bone outline-none placeholder:text-bone/35 focus:border-gold/50"
          />
          <div className="flex gap-2 overflow-x-auto">
            <button type="button" onClick={() => setRegion("all")} className={`whitespace-nowrap rounded-full border px-3 py-2 text-xs ${region === "all" ? "border-gold bg-gold/10 text-gold" : "border-bone/15 text-bone/60"}`}>
              Toutes les régions
            </button>
            {regions.map((item) => (
              <button key={item} type="button" onClick={() => setRegion(item)} className={`whitespace-nowrap rounded-full border px-3 py-2 text-xs ${region === item ? "border-gold bg-gold/10 text-gold" : "border-bone/15 text-bone/60"}`}>
                {t(`region.${item}`)}
              </button>
            ))}
          </div>
        </div>
        <p className="mt-4 text-xs text-bone/45">{visible.length} résultat{visible.length > 1 ? "s" : ""}</p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {visible.map((c) => (
          <Link
            key={c.id}
            to={`/civilization/${c.id}`}
            data-testid={`civ-card-${c.id}`}
            className="museum-card relative group overflow-hidden aspect-[4/5]"
          >
            <SmartImage src={c.image_url} wikipediaTitle={c.wikipedia_title} alt={c.name} wrapperClassName="absolute inset-0" className="h-full w-full object-cover opacity-55 transition-all duration-1000 group-hover:scale-105 group-hover:opacity-75" credit={c.image_credit} sourceUrl={c.image_source_url} />
            <div className="absolute inset-0 bg-gradient-to-t from-ebony via-ebony/70 to-ebony/10" />
            <div className="relative h-full p-7 flex flex-col justify-end">
              <p className="overline text-[0.65rem]">{t(`region.${c.region}`)}</p>
              <h3 className="font-serif text-3xl text-bone mt-3 leading-tight">{c.name}</h3>
              <p className="text-gold text-xs uppercase tracking-[0.2em] mt-2">{fmt(c.era_start)} — {fmt(c.era_end)}</p>
              <p className="text-bone/70 text-sm font-light mt-4 line-clamp-3">{c.summary}</p>
            </div>
          </Link>
        ))}
      </div>
      {!visible.length && (
        <div className="mt-8 rounded-xl border border-bone/10 p-6 text-bone/60">
          Aucun élément du corpus ne correspond à ces filtres.
        </div>
      )}
    </div>
  );
};

export default Civilizations;
