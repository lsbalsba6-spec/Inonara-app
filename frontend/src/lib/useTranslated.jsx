import { useEffect, useState, useRef } from "react";
import { useI18n } from "../i18n";
import { api } from "./api";

// In-memory cache (per session) to avoid redundant requests
const cache = new Map();
const inflight = new Map();

const asText = (value) => {
  if (value === null || value === undefined) return "";
  if (typeof value === "string") return value;
  if (typeof value === "number" || typeof value === "boolean") return String(value);
  return "";
};

const resolveLocalizedValue = (value, lang) => {
  if (!value) return { text: "", localized: true };

  // The historical corpus is French-first. Plain strings are therefore
  // considered already localized in French, but must be translated when the
  // interface is switched to English. Structured { fr, en } values still win
  // immediately and never trigger a translation request when the requested
  // locale exists.
  if (typeof value !== "object" || Array.isArray(value)) {
    return { text: asText(value), localized: lang === "fr" };
  }

  const direct = asText(value[lang]);
  if (direct) return { text: direct, localized: true };

  const french = asText(value.fr);
  const english = asText(value.en);
  const generic = asText(value.text);

  if (french) return { text: french, localized: lang === "fr" };
  if (english) return { text: english, localized: lang === "en" };
  return { text: generic, localized: false };
};

const fetchTranslation = async (text, target) => {
  const key = `${target}::${text}`;
  if (cache.has(key)) return cache.get(key);
  if (inflight.has(key)) return inflight.get(key);
  const p = api.post("/translate", { text, target_lang: target }).then((r) => {
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
 * Returns localized text for either French-first plain strings or structured
 * values such as { fr, en }. Structured values use the requested locale
 * immediately when available. Missing locales and plain French-first strings
 * are translated to the active locale, with graceful fallback on failure and
 * a per-session translation cache.
 */
export const useTranslated = (value) => {
  const { lang } = useI18n();
  const resolved = resolveLocalizedValue(value, lang);
  const sourceText = resolved.text;
  const alreadyLocalized = resolved.localized;
  const [out, setOut] = useState(sourceText);
  const last = useRef("");

  useEffect(() => {
    if (!sourceText) {
      setOut("");
      return;
    }
    if (alreadyLocalized) {
      setOut(sourceText);
      return;
    }

    const key = `${lang}::${sourceText}`;
    if (last.current === key) return;
    last.current = key;
    setOut(sourceText); // optimistic: show source while loading
    let alive = true;
    fetchTranslation(sourceText, lang).then((translated) => {
      if (alive) setOut(translated);
    });
    return () => {
      alive = false;
    };
  }, [sourceText, lang, alreadyLocalized]);

  return out;
};

export const Translated = ({ children, as: As = "span", ...rest }) => {
  const value = useTranslated(children);
  return <As {...rest}>{value}</As>;
};
