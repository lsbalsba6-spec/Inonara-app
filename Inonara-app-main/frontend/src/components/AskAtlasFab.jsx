import { useState, useRef, useEffect } from "react";
import { Sparkles, Send, X } from "lucide-react";
import { askAtlas } from "../lib/api";
import { useI18n } from "../i18n";

export const AskAtlasFab = ({ contextCivId = null }) => {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [sessionId, setSessionId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const send = async () => {
    const q = question.trim();
    if (!q || loading) return;
    setMessages((m) => [...m, { role: "user", text: q }]);
    setQuestion("");
    setLoading(true);
    try {
      const res = await askAtlas({ session_id: sessionId, question: q, context_civ_id: contextCivId });
      setSessionId(res.session_id);
      setMessages((m) => [...m, { role: "atlas", text: res.answer }]);
    } catch (e) {
      setMessages((m) => [...m, { role: "atlas", text: t("askFab.unavailable") }]);
    } finally {
      setLoading(false);
    }
  };

  const suggestions = [t("askFab.q1"), t("askFab.q2"), t("askFab.q3")];

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-40 glass px-5 py-3 flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-gold hover:bg-gold hover:text-ebony transition-colors"
        data-testid="ask-atlas-fab"
      >
        <Sparkles size={14} /> {t("askFab.button")}
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-end p-0 md:p-8 bg-black/60" data-testid="ask-atlas-panel">
          <div className="glass w-full md:w-[480px] h-[70vh] md:h-[600px] flex flex-col">
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#2A2421]">
              <div>
                <p className="overline">{t("ask.overline")}</p>
                <p className="font-serif text-lg text-bone">{t("askFab.title")}</p>
              </div>
              <button onClick={() => setOpen(false)} className="text-bone/60 hover:text-gold" data-testid="ask-atlas-close">
                <X size={18} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-5 space-y-4">
              {messages.length === 0 && (
                <div className="text-bone/60 text-sm space-y-3">
                  <p>{t("askFab.tryOne")}</p>
                  <ul className="space-y-2">
                    {suggestions.map((s) => (
                      <li key={s}>
                        <button
                          onClick={() => setQuestion(s)}
                          className="text-left w-full px-3 py-2 border border-[#2A2421] hover:border-gold/50 text-bone/80 text-sm"
                          data-testid="suggested-question"
                        >
                          {s}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[85%] px-4 py-3 text-sm leading-relaxed ${
                      m.role === "user"
                        ? "bg-[#1A1614] text-bone/80"
                        : "border border-gold/30 text-bone"
                    }`}
                  >
                    {m.role === "atlas" && <p className="overline mb-2">{t("ask.atlasLabel")}</p>}
                    <p className="whitespace-pre-wrap">{m.text}</p>
                  </div>
                </div>
              ))}
              {loading && <p className="overline animate-pulse">{t("ask.thinking")}</p>}
              <div ref={endRef} />
            </div>

            <div className="border-t border-[#2A2421] p-3 flex gap-2">
              <input
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
                placeholder={t("ask.fab.placeholder")}
                className="flex-1 bg-transparent border border-[#2A2421] focus:border-gold/60 outline-none px-3 py-2 text-sm text-bone placeholder:text-bone/40"
                data-testid="ask-atlas-input"
              />
              <button
                onClick={send}
                disabled={loading}
                className="px-4 py-2 bg-gold text-ebony text-xs uppercase tracking-[0.2em] disabled:opacity-40 flex items-center gap-2"
                data-testid="ask-atlas-send"
              >
                <Send size={14} /> {t("askFab.send")}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AskAtlasFab;
