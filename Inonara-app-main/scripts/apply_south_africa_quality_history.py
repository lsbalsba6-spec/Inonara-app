from pathlib import Path

TARGET = Path('frontend/src/components/CountryDossierView.jsx')

HISTORY_COMPONENT = r'''
function HistoryChapters({ items = [], sourceMap }) {
  if (!items.length) return null;

  return (
    <div className="space-y-7">
      {items.map((item, index) => (
        <article
          key={item.id || item.title || index}
          className="rounded-2xl border border-bone/10 bg-bone/[0.025] p-5 md:p-6"
        >
          <div className="flex flex-wrap items-center gap-2">
            {item.period && (
              <p className="text-xs uppercase tracking-[0.16em] text-gold">
                {item.period}
              </p>
            )}
            {item.status && <StatusBadge status={item.status} />}
          </div>

          <h2 className="mt-2 font-serif text-2xl text-bone md:text-3xl">
            {item.title}
          </h2>

          {item.summary && (
            <p className="mt-4 text-base leading-8 text-bone/75">
              {item.summary}
            </p>
          )}

          {Array.isArray(item.details) && item.details.length > 0 && (
            <div className="mt-5 space-y-3 border-l border-gold/25 pl-4">
              {item.details.map((detail, detailIndex) => (
                <p key={detailIndex} className="text-sm leading-7 text-bone/65">
                  {detail}
                </p>
              ))}
            </div>
          )}

          <SourceLinks ids={item.sources} sourceMap={sourceMap} />
        </article>
      ))}
    </div>
  );
}
'''.strip()


def main() -> None:
    if not TARGET.exists():
        raise SystemExit(f'Fichier introuvable: {TARGET}')

    text = TARGET.read_text(encoding='utf-8')

    if 'function HistoryChapters(' not in text:
        anchor = '\nfunction SimpleCards('
        if anchor not in text:
            raise SystemExit('Point d’insertion introuvable avant SimpleCards.')
        text = text.replace(anchor, f'\n\n{HISTORY_COMPONENT}\n\nfunction SimpleCards(', 1)

    old = '{active === "timeline" && <Timeline items={dossier.timeline} sourceMap={sourceMap} />}'
    new = '''{active === "timeline" && (
          dossier.overview?.history_chapters?.length
            ? <HistoryChapters items={dossier.overview.history_chapters} sourceMap={sourceMap} />
            : <Timeline items={dossier.timeline || []} sourceMap={sourceMap} />
        )}'''

    if old in text:
        text = text.replace(old, new, 1)
    elif 'dossier.overview?.history_chapters?.length' not in text:
        raise SystemExit('Ligne de rendu Histoire introuvable; aucun changement risqué appliqué.')

    TARGET.write_text(text, encoding='utf-8')
    print('OK: récit historique enrichi et détails existants rendus dans l’interface.')


if __name__ == '__main__':
    main()
