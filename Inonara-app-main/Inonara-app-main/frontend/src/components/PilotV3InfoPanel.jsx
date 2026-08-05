import { ATLAS_COLORS } from "../lib/designTokens";

const STATUS_LABEL_FR = {
  ready: "Prêt",
  provisional: "Provisoire",
  disputed: "Disputé",
  "research-gap": "Recherche incomplète",
};

const STATUS_COLOR_FR = {
  ready: "#4ade80",
  provisional: ATLAS_COLORS.amber,
  disputed: ATLAS_COLORS.deepRed,
  "research-gap": "#9CA3AF",
};

function Badge({ status }) {
  if (!status) return null;
  return (
    <span
      className="text-[0.6rem] px-2 py-0.5 rounded-full border"
      style={{ borderColor: STATUS_COLOR_FR[status] || "#9CA3AF", color: STATUS_COLOR_FR[status] || "#9CA3AF" }}
    >
      {STATUS_LABEL_FR[status] || status}
    </span>
  );
}

/**
 * Click panel for a pilot v3 marker: shows every coexisting active name,
 * the active status/period-interpretation, sources, and an explicit
 * "approximate, unsourced position" warning (see pilotV3Adapter.js).
 */
export default function PilotV3InfoPanel({ marker, onClose }) {
  if (!marker) return null;
  const { entity, activeNames, activeStatus, activePeriodInterpretation, isApproximatePosition } = marker;

  return (
    <div
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[600] glass rounded-xl p-4 max-w-sm w-[90vw] max-h-[60vh] overflow-y-auto"
      data-testid="pilot-v3-info-panel"
    >
      <div className="flex justify-between items-start mb-2">
        <p className="overline text-[0.6rem]" style={{ color: ATLAS_COLORS.gold }}>
          Prototype v3 · {entity.category}
        </p>
        <button onClick={onClose} className="text-bone/60 hover:text-bone" data-testid="pilot-v3-info-panel-close">
          ✕
        </button>
      </div>

      {isApproximatePosition && (
        <p className="text-[0.65rem] text-amber-400/90 mb-2" data-testid="pilot-v3-approx-warning">
          ⚠ Position approximative, non sourcée — géométrie réelle non encore intégrée.
        </p>
      )}

      <div className="space-y-2 mb-3">
        {activeNames.map((name) => (
          <div key={name.id} className="flex items-center justify-between gap-2">
            <span className="font-serif text-bone" style={{ opacity: name.resolvedStyle.opacity }}>
              {name.value}
              {name.isPreferredDisplayName && <span className="text-gold text-xs ml-1">★</span>}
            </span>
            <Badge status={name.integrationStatus} />
          </div>
        ))}
      </div>

      {activeStatus && (
        <div className="mb-2 text-sm">
          <span className="text-bone/70">Statut : </span>
          <span className="text-bone">{activeStatus.value}</span> <Badge status={activeStatus.integrationStatus} />
        </div>
      )}

      {activePeriodInterpretation && (
        <div className="mb-2 text-sm">
          <span className="text-bone/70">Phase historiographique : </span>
          <span className="text-bone">{activePeriodInterpretation.label}</span>{" "}
          <Badge status={activePeriodInterpretation.integrationStatus} />
          {activePeriodInterpretation.notes && (
            <p className="text-[0.65rem] text-bone/60 mt-1">{activePeriodInterpretation.notes}</p>
          )}
        </div>
      )}

      <div className="border-t border-[#2A2421] pt-2 mt-2">
        <p className="text-[0.6rem] text-bone/50 mb-1">Sources</p>
        {(activeNames[0]?.sources || []).map((s, i) => (
          <p key={i} className="text-[0.65rem] text-bone/70">
            [{s.category}] {s.label}
          </p>
        ))}
      </div>
    </div>
  );
}
