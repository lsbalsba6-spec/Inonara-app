import { useState } from "react";
import { Image as ImageIcon } from "lucide-react";
import { useWikiImage } from "../lib/useWikiImage";
import { useI18n } from "../i18n";
import { localizedValue } from "../lib/contentSort";

const COPY = {
  en: {
    preparing: "Illustration in preparation",
    imageSource: "Image source",
  },
  fr: {
    preparing: "Illustration en préparation",
    imageSource: "Source de l’image",
  },
};

export function SmartImage({
  src,
  wikipediaTitle,
  alt = "",
  className = "",
  wrapperClassName = "",
  loading = "lazy",
  credit,
  sourceUrl,
}) {
  const { lang } = useI18n();
  const copy = COPY[lang] || COPY.en;
  const localizedWikipediaTitle = localizedValue(wikipediaTitle, lang, "");
  const localizedAlt = localizedValue(alt, lang, "");
  const localizedCredit = localizedValue(credit, lang, "");
  const wikiUrl = useWikiImage(localizedWikipediaTitle);
  const [failed, setFailed] = useState(false);
  const resolved = failed ? null : wikiUrl || src || null;

  return (
    <figure className={`relative overflow-hidden bg-[#211d1a] ${wrapperClassName}`}>
      {resolved ? (
        <img
          src={resolved}
          alt={localizedAlt}
          loading={loading}
          onError={() => setFailed(true)}
          className={className}
        />
      ) : (
        <div className="flex h-full min-h-[180px] w-full items-center justify-center bg-gradient-to-br from-gold/10 via-bone/[0.03] to-black/30">
          <div className="text-center text-bone/35">
            <ImageIcon className="mx-auto mb-3" size={28} />
            <p className="text-[10px] uppercase tracking-[0.2em]">{copy.preparing}</p>
          </div>
        </div>
      )}

      {(localizedCredit || sourceUrl) && (
        <figcaption className="absolute bottom-2 right-2 max-w-[85%] rounded bg-black/65 px-2 py-1 text-right text-[9px] leading-4 text-bone/65 backdrop-blur">
          {sourceUrl ? (
            <a href={sourceUrl} target="_blank" rel="noreferrer" className="hover:text-gold">
              {localizedCredit || copy.imageSource}
            </a>
          ) : localizedCredit}
        </figcaption>
      )}
    </figure>
  );
}
