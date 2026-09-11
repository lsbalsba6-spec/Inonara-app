import { ATLAS_COLORS } from "../lib/designTokens";
import { useI18n } from "../i18n";
import { useTranslated } from "../lib/useTranslated";

const COPY = {
  en: {
    prototype: "Prototype v3",
    approximatePosition: "Approximate, unsourced position — real geometry has not yet been integrated.",
    status: "Status",
    historiography: "Historiographic phase",
    sources: "Sources",
    author: "Author",
    license: "License",
    statuses: {
      ready: "Established",
      provisional: "Provisional",
      disputed: "Disputed",
      "research-gap": "Research gap",
    },
  },
  fr: {
    prototype: "Prototype v3",
    approximatePosition: "Position approximative, non sourcée — la géométrie réelle n’est pas encore intégrée.",
    status: "Statut",
    historiography: "Phase historiographique",
    sources: "Sources",
    author: "Auteur",
    license: "Licence",
    statuses: {
      ready: "Établi",
      provisional: "Provisoire",
      disputed: "Disputé",
      "research-gap": "Recherche incomplète",
    },
  },
};

const STATUS_COLOR = {
  ready: "#4ade80",
  provisional: ATLAS_COLORS.amber,
  disputed: ATLAS_COLORS.deepRed,
  "research-gap": "#9CA3AF",
};

function TranslatedInline({ value }) {
  const translated = useTranslated(value || "");
  return translated || value || null;
}

function Badge({ status, copy }) {
  if (!status) return null;
  return (
    <span
      className="text-[0.6rem] px-2 py-0.5 rounded-full border"
      style={{ borderColor: STATUS_COLOR[status] || "#9CA3AF", color: STATUS_COLOR[status] || "#9CA3AF" }}
    >
      {copy.statuses[status] || status}
    </span>
  );
}

function SourceItem({ source, copy, index }) {
  const label = <><span>[<TranslatedInline value={source.category} />]</span>{" "}<TranslatedInline value={source.label || source.title} /></>;
  return (
    <div className="text-[0.65rem] text-bone/70" data-testid={`pilot-v3-source-${index}`}>
      {source.url ? (
        <a href={source.url} target="_blank" rel="noreferrer" className="text-gold/80 hover:text-gold underline underline-offset-2">
          {label}
        </a>
      ) : label}
      {(source.author || source.license) && (
        <p className="mt-0.5 text-[0.58rem] text-bone/45">
          {source.author && <>{copy.author}: <TranslatedInline value={source.author} /></>}
          {source.author && source.license && <span> · </span>}
          {source.license && <>{copy.license}: <TranslatedInline value={source.license} /></>}
        </p>
      )}
    </div>
  );
}

/**
 * Click panel for a pilot v3 marker: shows every coexisting active name,
 * the active status/period-interpretation, sources, and an explicit
 * approximate-position warning (see pilotV3Adapter.js).
 */
export default function PilotV3InfoPanel({ marker, onClose }) {
  const { lang } = useI18n();
  const copy = COPY[lang] || COPY.en;
  if (!marker) return null;
  const { entity, activeNames, activeStatus, activePeriodInterpretation, isApproximatePosition } = marker;

  return (
    <div
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[600] glass rounded-xl p-4 max-w-sm w-[90vw] max-h-[60vh] overflow-y-auto"
      data-testid="pilot-v3-info-panel"
    >
      <div className="flex justify-between items-start mb-2">
        <p className="overline text-[0.6rem]" style={{ color: ATLAS_COLORS.gold }}>
          {copy.prototype} · <TranslatedInline value={entity.category} />
        </p>
        <button
          onClick={onClose}
          className="text-bone/60 hover:text-bone"
          data-testid="pilot-v3-info-panel-close"
          aria-label={lang === "fr" ? "Fermer" : "Close"}
        >
          ✕
        </button>
      </div>

      {isApproximatePosition && (
        <p className="text-[0.65rem] text-amber-400/90 mb-2" data-testid="pilot-v3-approx-warning">
          ⚠ {copy.approximatePosition}
        </p>
      )}

      <div className="space-y-2 mb-3">
        {activeNames.map((name) => (
          <div key={name.id} className="flex items-center justify-between gap-2">
            <span className="font-serif text-bone" style={{ opacity: name.resolvedStyle.opacity }}>
              <TranslatedInline value={name.value} />
              {name.isPreferredDisplayName && <span className="text-gold text-xs ml-1">★</span>}
            </span>
            <Badge status={name.integrationStatus} copy={copy} />
          </div>
        ))}
      </div>

      {activeStatus && (
        <div className="mb-2 text-sm">
          <span className="text-bone/70">{copy.status} : </span>
          <span className="text-bone"><TranslatedInline value={activeStatus.value} /></span>{" "}
          <Badge status={activeStatus.integrationStatus} copy={copy} />
        </div>
      )}

      {activePeriodInterpretation && (
        <div className="mb-2 text-sm">
          <span className="text-bone/70">{copy.historiography} : </span>
          <span className="text-bone"><TranslatedInline value={activePeriodInterpretation.label} /></span>{" "}
          <Badge status={activePeriodInterpretation.integrationStatus} copy={copy} />
          {activePeriodInterpretation.notes && (
            <p className="text-[0.65rem] text-bone/60 mt-1"><TranslatedInline value={activePeriodInterpretation.notes} /></p>
          )}
        </div>
      )}

      <div className="border-t border-[#2A2421] pt-2 mt-2">
        <p className="text-[0.6rem] text-bone/50 mb-1">{copy.sources}</p>
        <div className="space-y-1.5">
          {(activeNames[0]?.sources || []).map((source, index) => (
            <SourceItem key={source.id || source.url || index} source={source} copy={copy} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
