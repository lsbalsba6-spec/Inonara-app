import { useEffect, useState } from "react";

const KEY = "inonara.wikiImages.v2";
const loadCache = () => { try { return JSON.parse(localStorage.getItem(KEY) || "{}"); } catch { return {}; } };
const saveCache = (value) => { try { localStorage.setItem(KEY, JSON.stringify(value)); } catch {} };

let cache = loadCache();
const inflight = new Map();

async function resolveWikipediaImage(title) {
  if (!title) return null;
  if (cache[title] !== undefined) return cache[title];
  if (inflight.has(title)) return inflight.get(title);

  const promise = fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`)
    .then((response) => (response.ok ? response.json() : null))
    .then((payload) => {
      const result = payload?.originalimage?.source || payload?.thumbnail?.source || null;
      cache[title] = result;
      saveCache(cache);
      inflight.delete(title);
      return result;
    })
    .catch(() => {
      cache[title] = null;
      saveCache(cache);
      inflight.delete(title);
      return null;
    });

  inflight.set(title, promise);
  return promise;
}

export function useWikiImage(title) {
  const [url, setUrl] = useState(() => (title ? cache[title] || null : null));

  useEffect(() => {
    if (!title) {
      setUrl(null);
      return undefined;
    }
    if (cache[title] !== undefined) {
      setUrl(cache[title]);
      return undefined;
    }
    let alive = true;
    resolveWikipediaImage(title).then((result) => {
      if (alive) setUrl(result);
    });
    return () => { alive = false; };
  }, [title]);

  return url;
}
