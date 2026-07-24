import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useI18n } from "../i18n";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

// In-memory cache (per session) to avoid redundant requests
const cache = new Map();
const inflight = new Map();

const fetchTranslation = async (text, target) => {
  const key = `${target}::${text}`;
  if (cache.has(key)) return cache.get(key);
  if (inflight.has(key)) return inflight.get(key);
  const p = axios.post(`${API}/translate`, { text, target_lang: target }).then((r) => {
    const out = r.data.translated || text;
    cache.set(key, out);
    inflight.delete(key);
    return out;
  }).catch(() => {
    inflight.delete(key);
    return text;
  });
  inflight.set(key, p);
  return p;
};

/**
 * Returns the translated text when language is non-English; otherwise the original.
 * Falls back gracefully on error. Caches per-session.
 */
export const useTranslated = (text) => {
  const { lang } = useI18n();
  const [out, setOut] = useState(text);
  const last = useRef("");
  useEffect(() => {
    if (!text) { setOut(""); return; }
    if (lang === "en") { setOut(text); return; }
    const key = `${lang}::${text}`;
    if (last.current === key) return;
    last.current = key;
    setOut(text); // optimistic: show original while loading
    let alive = true;
    fetchTranslation(text, lang).then((tr) => { if (alive) setOut(tr); });
    return () => { alive = false; };
  }, [text, lang]);
  return out;
};

export const Translated = ({ children, as: As = "span", ...rest }) => {
  const value = useTranslated(typeof children === "string" ? children : "");
  return <As {...rest}>{value}</As>;
};
