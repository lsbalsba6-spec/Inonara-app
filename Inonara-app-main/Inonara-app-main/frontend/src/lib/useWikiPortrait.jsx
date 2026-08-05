import { useEffect, useState } from "react";

// localStorage cache to avoid re-fetching across navigations
const KEY = "afroatlas.wikiPortraits.v1";
const load = () => { try { return JSON.parse(localStorage.getItem(KEY) || "{}"); } catch { return {}; } };
const save = (data) => { try { localStorage.setItem(KEY, JSON.stringify(data)); } catch {} };
let cache = load();
const inflight = new Map();

const fetchPortrait = async (title) => {
  if (!title) return null;
  if (cache[title] !== undefined) return cache[title];
  if (inflight.has(title)) return inflight.get(title);
  const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`;
  const p = fetch(url).then((r) => (r.ok ? r.json() : null)).then((d) => {
    const src = d?.thumbnail?.source || d?.originalimage?.source || null;
    cache[title] = src;
    save(cache);
    inflight.delete(title);
    return src;
  }).catch(() => {
    cache[title] = null;
    save(cache);
    inflight.delete(title);
    return null;
  });
  inflight.set(title, p);
  return p;
};

/** Returns the Wikimedia thumbnail URL for a Wikipedia page title, or null */
export const useWikiPortrait = (title) => {
  const [url, setUrl] = useState(() => (title ? cache[title] || null : null));
  useEffect(() => {
    if (!title) { setUrl(null); return; }
    if (cache[title] !== undefined) { setUrl(cache[title]); return; }
    let alive = true;
    fetchPortrait(title).then((src) => { if (alive) setUrl(src); });
    return () => { alive = false; };
  }, [title]);
  return url;
};
