import { useState, useRef, useEffect } from "react";
import { Sparkles, Send } from "lucide-react";
import { askAtlas } from "../lib/api";
import { useI18n } from "../i18n";

const AskPage = () => {
  const { t } = useI18n();
  const [question, setQuestion] = useState("");
  const [sessionId, setSessionId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const endRef = useRef(null);

  const suggestions = [t("ask.s1"), t("ask.s2"), t("ask.s3"), t("ask.s4")];

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, loading]);

  const send = async (q) => {
    const text = (q ?? question).trim();
    if (!text || loading) return;
    setMessages((m) => [...m, { role: "user", text }]);
    setQuestion("");
    setLoading(true);
    try {
      const res = await askAtlas({ session_id: sessionId, question: text });
      setSessionId(res.session_id);
      setMessages((m) => [...m, { role: "atlas", text: res.answer }]);
    } catch (e) {
      setMessages((m) => [...m, { role: "atlas", text: t("ask.unavailable") }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-32 pb-24 max-w-3xl mx-auto px-6" data-testid="ask-page">
      <div className="flex items-center gap-3 text-gold">
        <Sparkles size={16} />
        <p className="overline">{t("ask.overline")}</p>
      </div>
      <h1 className="font-serif text-5xl md:text-6xl text-bone mt-3 tracking-tight">{t("ask.title")}</h1>
      <p className="text-bone/70 max-w-2xl mt-6 font-light leading-relaxed">{t("ask.lead")}</p>

      {messages.length === 0 && (
        <div className="mt-12 grid sm:grid-cols-2 gap-3">
          {suggestions.map((s) => (
            <button
              key={s}
              onClick={() => send(s)}
              className="text-left p-5 border border-[#2A2421] hover:border-gold/50 text-bone/80 transition-colors"
              data-testid="ask-suggestion"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      <div className="mt-10 space-y-6">
        {messages.map((m, i) => (
          <div key={i} className={`${m.role === "user" ? "flex justify-end" : ""}`}>
            <div className={`max-w-[90%] px-5 py-4 ${m.role === "user" ? "bg-[#1A1614] text-bone/80" : "border border-gold/30 text-bone"}`}>
              {m.role === "atlas" && <p className="overline mb-2">{t("ask.atlasLabel")}</p>}
              <p className="whitespace-pre-wrap leading-relaxed">{m.text}</p>
            </div>
          </div>
        ))}
        {loading && <p className="overline animate-pulse">{t("ask.thinking")}</p>}
        <div ref={endRef} />
      </div>

      <div className="mt-10 flex gap-3">
        <input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder={t("ask.placeholder")}
          className="flex-1 bg-transparent border border-[#2A2421] focus:border-gold/60 outline-none px-4 py-3 text-bone placeholder:text-bone/40"
          data-testid="ask-page-input"
        />
        <button
          onClick={() => send()}
          disabled={loading}
          className="px-6 py-3 bg-gold text-ebony text-xs uppercase tracking-[0.25em] disabled:opacity-40 flex items-center gap-2"
          data-testid="ask-page-send"
        >
          <Send size={14} /> {t("ask.send")}
        </button>
      </div>
    </div>
  );
};

export default AskPage;
