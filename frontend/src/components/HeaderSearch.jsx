import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { search } from "../lib/api";
import { useI18n } from "../i18n";
import { localizedValue } from "../lib/contentSort";

const TYPE_LABELS = {
  en: {
    Country: "Country",
    People: "People",
    Civilization: "Civilization",
    Figure: "Figure",
    Diaspora: "Diaspora",
    Module: "Module",
    Story: "Story",
    Culture: "Culture",
  },
  fr: {
    Country: "Pays",
    People: "Peuple",
    Civilization: "Civilisation",
    Figure: "Personnalité",
    Diaspora: "Diaspora",
    Module: "Module",
    Story: "Histoire",
    Culture: "Culture",
  },
};

const flatten = (results, lang) => {
  if (!results) return [];
  const out = [];
  (results.countries || []).slice(0, 3).forEach((country) => {
    const iso2 = country.iso2 || country.country_iso2;
    out.push({ type: "Country", title: country.name || country.display_name || country.country, to: iso2 ? `/country/${iso2}` : "/countries" });
  });
  (results.peoples || []).slice(0, 3).forEach((people) => out.push({ type: "People", title: people.name, to: `/people/${people.id}` }));
  (results.civilizations || []).slice(0, 3).forEach((c) => out.push({ type: "Civilization", title: c.name, to: `/civilization/${c.id}` }));
  (results.figures || []).slice(0, 4).forEach((f) => out.push({ type: "Figure", title: f.name, to: `/figure/${f.id}` }));
  (results.diaspora || []).slice(0, 3).forEach((d) => out.push({ type: "Diaspora", title: d.name, to: `/diaspora/${d.id}` }));
  (results.modules || []).slice(0, 2).forEach((m) => out.push({ type: "Module", title: m.title, to: `/module/${m.id}` }));
  (results.stories || []).slice(0, 2).forEach((s) => out.push({ type: "Story", title: s.title, to: `/story/${s.id}` }));
  (results.culture || []).slice(0, 2).forEach((item) => {
    const title = localizedValue(item.title, lang);
    out.push({ type: "Culture", title: item.title, to: `/search?q=${encodeURIComponent(title)}` });
  });
  return out;
};

export const HeaderSearch = () => {
  const { t, lang } = useI18n();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const wrapRef = useRef(null);
  const typeLabels = TYPE_LABELS[lang] || TYPE_LABELS.en;

  useEffect(() => {
    const onDoc = (e) => { if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  useEffect(() => {
    const term = q.trim();
    if (term.length < 2) { setItems([]); return; }
    const handle = setTimeout(async () => {
      setLoading(true);
      try {
        const r = await search(term);
        setItems(flatten(r.results, lang));
      } catch { setItems([]); }
      finally { setLoading(false); }
    }, 200);
    return () => clearTimeout(handle);
  }, [q, lang]);

  const submit = (e) => {
    e.preventDefault();
    if (q.trim().length >= 2) {
      setOpen(false);
      navigate(`/search?q=${encodeURIComponent(q.trim())}`);
    }
  };

  return (
    <div ref={wrapRef} className="relative" data-testid="header-search">
      {!open ? (
        <button
          onClick={() => setOpen(true)}
          aria-label={lang === "fr" ? "Ouvrir la recherche" : "Open search"}
          className="text-bone/70 hover:text-gold transition-colors"
          data-testid="header-search-toggle"
        >
          <Search size={16} />
        </button>
      ) : (
        <form onSubmit={submit} className="flex items-center gap-2 border border-[#2A2421] focus-within:border-gold/60 px-3">
          <Search size={14} className="text-gold" />
          <input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={t("headerSearch.placeholder")}
            className="bg-transparent outline-none py-2 text-sm text-bone placeholder:text-bone/40 w-56"
            data-testid="header-search-input"
          />
        </form>
      )}

      {open && q.trim().length >= 2 && (
        <div className="absolute right-0 top-full mt-2 w-[360px] glass max-h-[60vh] overflow-y-auto z-50" data-testid="header-search-dropdown">
          {loading && <p className="p-4 overline animate-pulse">{t("common.searching")}</p>}
          {!loading && items.length === 0 && <p className="p-4 text-bone/60 text-sm">{t("headerSearch.noMatches")}</p>}
          {!loading && items.length > 0 && (
            <ul>
              {items.map((it, i) => (
                <li key={`${it.type}-${i}`}>
                  <button
                    onClick={() => { setOpen(false); setQ(""); navigate(it.to); }}
                    className="w-full text-left px-4 py-3 hover:bg-[#1A1614] border-b border-[#2A2421] last:border-b-0"
                    data-testid="header-search-result"
                  >
                    <p className="overline text-[0.6rem]">{typeLabels[it.type] || it.type}</p>
                    <p className="text-bone text-sm mt-1">{localizedValue(it.title, lang)}</p>
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={submit}
                  className="w-full text-left px-4 py-3 text-gold text-xs uppercase tracking-[0.2em] hover:bg-[#1A1614]"
                  data-testid="header-search-see-all"
                >
                  {t("common.seeAll")}
                </button>
              </li>
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default HeaderSearch;
