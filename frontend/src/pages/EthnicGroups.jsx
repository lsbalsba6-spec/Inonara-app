import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { fetchEthnicGroups, fetchEthnicGroup } from "../lib/api";
import { useI18n } from "../i18n";
import { sortAlphabetically } from "../lib/contentSort";
import { SmartImage } from "../components/SmartImage";

export const EthnicGroupsList = () => {
  const { t } = useI18n();
  const [groups, setGroups] = useState([]);
  const [query, setQuery] = useState("");
  const [family, setFamily] = useState("all");
  useEffect(() => { fetchEthnicGroups().then(setGroups).catch(() => {}); }, []);

  const families = useMemo(() => [...new Set(groups.map((g) => g.language_family).filter(Boolean))].sort(), [groups]);
  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return sortAlphabetically(groups.filter((g) => {
      const matchesFamily = family === "all" || g.language_family === family;
      const haystack = `${g.name || ""} ${g.homeland || ""} ${g.language_family || ""} ${g.summary || ""}`.toLowerCase();
      return matchesFamily && (!needle || haystack.includes(needle));
    }), "name");
  }, [groups, family, query]);
  return (
    <div className="pt-32 pb-24 max-w-[1600px] mx-auto px-6 md:px-10" data-testid="ethnic-groups-page">
      <p className="overline">{t("page.ethnic.overline")}</p>
      <h1 className="font-serif text-5xl md:text-6xl text-bone mt-3 tracking-tight" data-testid="ethnic-groups-title">{t("page.ethnic.title")}</h1>
      <p className="text-bone/70 max-w-2xl mt-6 font-light leading-relaxed">
        {t("page.ethnic.lead")}
      </p>
      <section className="mt-10 grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-gold/20 bg-gold/[0.05] p-5">
          <p className="overline text-gold">Corpus actuel</p>
          <p className="mt-2 font-serif text-3xl text-bone">{groups.length}</p>
          <p className="mt-1 text-xs text-bone/50">peuples et communautés documentés</p>
        </div>
        <div className="rounded-xl border border-bone/10 bg-bone/[0.025] p-5">
          <p className="overline">Familles linguistiques</p>
          <p className="mt-2 font-serif text-3xl text-bone">{families.length}</p>
          <p className="mt-1 text-xs text-bone/50">familles représentées dans le corpus actuel</p>
        </div>
        <Link to="/atlas" className="rounded-xl border border-bone/10 bg-bone/[0.025] p-5 transition hover:border-gold/40">
          <p className="overline">Territoires & mouvements</p>
          <p className="mt-2 font-serif text-xl text-bone">Explorer dans l’Atlas</p>
          <p className="mt-1 text-xs text-bone/50">situer les peuples, leurs espaces et leurs migrations</p>
        </Link>
      </section>

      <section className="mt-10 rounded-2xl border border-bone/10 bg-bone/[0.02] p-5">
        <div className="grid gap-4 lg:grid-cols-[1fr_auto]">
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Rechercher un peuple, une région, une langue…" className="w-full rounded-xl border border-bone/15 bg-ebony px-4 py-3 text-sm text-bone outline-none placeholder:text-bone/35 focus:border-gold/50" />
          <div className="flex gap-2 overflow-x-auto">
            <button type="button" onClick={() => setFamily("all")} className={`whitespace-nowrap rounded-full border px-3 py-2 text-xs ${family === "all" ? "border-gold bg-gold/10 text-gold" : "border-bone/15 text-bone/60"}`}>Toutes les familles</button>
            {families.map((item) => <button key={item} type="button" onClick={() => setFamily(item)} className={`whitespace-nowrap rounded-full border px-3 py-2 text-xs ${family === item ? "border-gold bg-gold/10 text-gold" : "border-bone/15 text-bone/60"}`}>{item}</button>)}
          </div>
        </div>
        <p className="mt-4 text-xs text-bone/45">{visible.length} résultat{visible.length > 1 ? "s" : ""}</p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {visible.map((g) => (
          <Link key={g.id} to={`/people/${g.id}`} className="museum-card relative group overflow-hidden aspect-[4/5]" data-testid={`ethnic-card-${g.id}`}>
            <SmartImage src={g.image_url} wikipediaTitle={g.wikipedia_title} alt={g.name} wrapperClassName="absolute inset-0" className="h-full w-full object-cover opacity-55 transition-all duration-1000 group-hover:scale-105 group-hover:opacity-75" credit={g.image_credit} sourceUrl={g.image_source_url} />
            <div className="absolute inset-0 bg-gradient-to-t from-ebony via-ebony/70 to-ebony/10" />
            <div className="relative h-full p-7 flex flex-col justify-end">
              <p className="overline text-[0.65rem]">{g.language_family}</p>
              <h3 className="font-serif text-3xl text-bone mt-3 leading-tight">{g.name}</h3>
              <p className="text-gold text-xs uppercase tracking-[0.2em] mt-2">{g.homeland}</p>
              <p className="text-bone/70 text-sm font-light mt-4 line-clamp-3">{g.summary}</p>
            </div>
          </Link>
        ))}
      </div>
      {!visible.length && <div className="mt-8 rounded-xl border border-bone/10 p-6 text-bone/60">Aucun peuple ne correspond à ces filtres.</div>}
    </div>
  );
};

const Field = ({ label, children }) => (
  <div>
    <p className="overline">{label}</p>
    <div className="text-bone/85 mt-3 font-light leading-relaxed">{children}</div>
  </div>
);

export const EthnicGroupDetail = () => {
  const { t } = useI18n();
  const { id } = useParams();
  const [g, setG] = useState(null);
  useEffect(() => { fetchEthnicGroup(id).then(setG).catch(() => {}); }, [id]);
  if (!g) return <div className="pt-32 text-center text-bone/40 overline">{t("common.loading")}</div>;
  return (
    <div data-testid="ethnic-detail">
      <div className="relative h-[60vh] min-h-[400px] overflow-hidden">
        <SmartImage src={g.image_url} wikipediaTitle={g.wikipedia_title} alt={g.name} wrapperClassName="absolute inset-0" className="h-full w-full object-cover animate-slow-zoom" credit={g.image_credit} sourceUrl={g.image_source_url} />
        <div className="absolute inset-0 bg-gradient-to-t from-ebony via-ebony/60 to-ebony/30" />
        <div className="relative max-w-[1600px] mx-auto px-6 md:px-10 h-full flex flex-col justify-end pb-16">
          <Link to="/people" className="text-bone/60 hover:text-gold text-xs uppercase tracking-[0.2em] flex items-center gap-2 mb-6" data-testid="back-to-people">
            <ArrowLeft size={14} /> {t("common.back.peoples")}
          </Link>
          <p className="overline">{g.language_family}</p>
          <h1 className="font-serif text-5xl md:text-7xl text-bone mt-3 leading-[0.95] tracking-tight">{g.name}</h1>
          <p className="text-gold text-sm uppercase tracking-[0.25em] mt-4">{g.homeland} · {g.population}</p>
          <p className="text-bone/80 mt-6 max-w-2xl text-lg font-light leading-relaxed">{g.summary}</p>
        </div>
      </div>
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-16 grid md:grid-cols-2 gap-10">
        <Field label="Language">{g.language}</Field>
        <Field label="Religion">{g.religion}</Field>
        <Field label="Culture">{g.culture}</Field>
        <Field label="In the Diaspora">{g.diaspora}</Field>
      </div>
      {g.sources?.length > 0 && (
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 pb-24">
          <div className="border-t border-[#2A2421] pt-10">
            <p className="overline">{t("common.sources")}</p>
            <ul className="list-disc pl-5 space-y-2 mt-4 text-bone/70">{g.sources.map((s) => <li key={s}>{s}</li>)}</ul>
          </div>
        </div>
      )}
    </div>
  );
};
