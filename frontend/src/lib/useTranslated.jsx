import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useI18n } from "../i18n";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

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
  if (typeof value !== "object" || Array.isArray(value)) {
    return { text: asText(value), localized: lang === "en" };
  }

  const direct = asText(value[lang]);
  if (direct) return { text: direct, localized: true };

  const english = asText(value.en);
  const french = asText(value.fr);
  const generic = asText(value.text);
  const fallback = english || french || generic;

  // English is the source language for the translation endpoint. If an
  // object lacks the requested locale, keep a stable textual fallback and
  // only call the translator for non-English targets.
  return { text: fallback, localized: lang === "en" || (!english && lang === "fr" && Boolean(french)) };
};

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
 * Returns localized text for either plain strings or structured values such
 * as { fr, en }. Structured values use the requested locale immediately when
 * available; otherwise the textual fallback is translated for non-English
 * locales. Falls back gracefully on error and caches translations per session.
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
    if (lang === "en" || alreadyLocalized) {
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