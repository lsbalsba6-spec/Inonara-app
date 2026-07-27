import { getHistoricalDataSource } from "../lib/featureFlags";

// PR4 point 5: discreet dev-only indicator of which historical-polities data
// source is active (v1/v2). Extracted into its own component so its
// dev-vs-production visibility can be unit tested directly (see
// __tests__/DevDataSourceIndicator.test.jsx), without needing to mount the
// full Atlas page.
//
// Gated on NODE_ENV !== "production" so it never appears in the deployed
// production build — CRA sets NODE_ENV=production automatically for
// `npm run build` (confirmed: grepping the built bundle for this
// component's marker text returns zero matches, see PR4 verification).
// Purely a QA aid, never part of the public interface, and adds no layout
// (fixed positioning, does not affect document flow).
const DevDataSourceIndicator = () => {
  if (process.env.NODE_ENV === "production") return null;

  return (
    <div
      className="fixed bottom-2 left-2 z-[9999] text-[10px] px-2 py-1 rounded bg-black/70 text-lime-400 font-mono pointer-events-none"
      data-testid="dev-data-source-indicator"
    >
      data-source: {getHistoricalDataSource()}
    </div>
  );
};

export default DevDataSourceIndicator;
