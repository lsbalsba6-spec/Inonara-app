import { useState } from "react";
import { Image as ImageIcon } from "lucide-react";
import { useWikiImage } from "../lib/useWikiImage";

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
  const wikiUrl = useWikiImage(wikipediaTitle);
  const [failed, setFailed] = useState(false);
  const resolved = failed ? null : wikiUrl || src || null;

  return (
    <figure className={`relative overflow-hidden bg-[#211d1a] ${wrapperClassName}`}>
      {resolved ? (
        <img
          src={resolved}
          alt={alt}
          loading={loading}
          onError={() => setFailed(true)}
          className={className}
        />
      ) : (
        <div className="flex h-full min-h-[180px] w-full items-center justify-center bg-gradient-to-br from-gold/10 via-bone/[0.03] to-black/30">
          <div className="text-center text-bone/35">
            <ImageIcon className="mx-auto mb-3" size={28} />
            <p className="text-[10px] uppercase tracking-[0.2em]">Illustration en préparation</p>
          </div>
        </div>
      )}

      {(credit || sourceUrl) && (
        <figcaption className="absolute bottom-2 right-2 max-w-[85%] rounded bg-black/65 px-2 py-1 text-right text-[9px] leading-4 text-bone/65 backdrop-blur">
          {sourceUrl ? (
            <a href={sourceUrl} target="_blank" rel="noreferrer" className="hover:text-gold">
              {credit || "Source de l’image"}
            </a>
          ) : credit}
        </figcaption>
      )}
    </figure>
  );
}
