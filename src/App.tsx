import { useEffect, useMemo, useState } from "react";
import { CARDS, CATEGORY_META, type Card, type Category } from "./cards";

// Fisher–Yates, seeded only by call order (fine for a party game).
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const ALL_CATS = Object.keys(CATEGORY_META) as Category[];

export default function App() {
  const [active, setActive] = useState<Set<Category>>(new Set(ALL_CATS));
  const [deck, setDeck] = useState<Card[]>(() => shuffle(CARDS));
  const [index, setIndex] = useState(0);
  const [flipKey, setFlipKey] = useState(0);

  const filtered = useMemo(
    () => deck.filter((c) => active.has(c.category)),
    [deck, active]
  );

  // Keep index in range when filters change.
  useEffect(() => {
    if (index >= filtered.length) setIndex(0);
  }, [filtered.length, index]);

  const card = filtered[index];
  const done = filtered.length === 0;
  const last = index >= filtered.length - 1;

  function reshuffle() {
    setDeck(shuffle(CARDS));
    setIndex(0);
    setFlipKey((k) => k + 1);
  }

  function next() {
    if (last) {
      reshuffle();
      return;
    }
    setIndex((i) => i + 1);
    setFlipKey((k) => k + 1);
  }

  function toggleCat(cat: Category) {
    setActive((prev) => {
      const nxt = new Set(prev);
      if (nxt.has(cat)) {
        if (nxt.size > 1) nxt.delete(cat); // never let it hit zero
      } else {
        nxt.add(cat);
      }
      return nxt;
    });
    setIndex(0);
    setFlipKey((k) => k + 1);
  }

  const meta = card ? CATEGORY_META[card.category] : null;

  return (
    <div className="app">
      <header className="topbar">
        <div className="brand">
          <span className="brand-mark">Suko</span>
          <span className="brand-dot">o</span>
          <span className="brand-mark accent">Shot</span>
        </div>
        <div className="counter">
          {done ? "—" : `${index + 1} / ${filtered.length}`}
        </div>
      </header>

      <div className="filters">
        {ALL_CATS.map((cat) => {
          const m = CATEGORY_META[cat];
          const on = active.has(cat);
          return (
            <button
              key={cat}
              className={`chip ${on ? "on" : ""}`}
              style={on ? { borderColor: m.color, color: m.color } : undefined}
              onClick={() => toggleCat(cat)}
            >
              {m.emoji} {m.label}
            </button>
          );
        })}
      </div>

      <main className="stage" onClick={next}>
        {card && meta ? (
          <article
            key={flipKey}
            className="card pop"
            style={{ "--cat": meta.color } as React.CSSProperties}
          >
            <div className="cat-chip" style={{ background: meta.color }}>
              {meta.emoji} {meta.label}
            </div>
            <h1 className="card-title">{card.title}</h1>
            <p className="card-body">{card.body}</p>
            <div className="card-foot">Tap para sa susunod →</div>
          </article>
        ) : (
          <div className="card empty">
            <p>Walang baraha sa filter na 'to.</p>
          </div>
        )}
      </main>

      <footer className="actions">
        <button className="btn ghost" onClick={reshuffle}>
          🔀 Bagong Deck
        </button>
        <button className="btn primary" onClick={next}>
          {last ? "Ulitin" : "Sunod"} →
        </button>
      </footer>
    </div>
  );
}
