import { useEffect, useMemo, useState } from "react";
import {
  CARDS,
  CATEGORIES,
  FREE_IDS,
  TOTAL_COUNT,
  type Card,
  type Category,
} from "./cards";
import SwipeDeck, { type Verdict } from "./SwipeDeck";
import type { Player } from "./Setup";
import { buzzShot, tick } from "./native";

const shuffle = <T,>(a: T[]): T[] => {
  const x = a.slice();
  for (let i = x.length - 1; i > 0; i--) {
    const j = (Math.random() * (i + 1)) | 0;
    [x[i], x[j]] = [x[j], x[i]];
  }
  return x;
};

function buildDeck(activeCats: Set<Category>, premium: boolean): Card[] {
  return shuffle(
    CARDS.filter(
      (c) => activeCats.has(c.category) && (premium || FREE_IDS.has(c.id))
    )
  );
}

interface Toast {
  msg: string;
  tone: "suko" | "ginawa" | "neutral" | "pass";
}

export default function Game({
  players,
  cats,
  premium,
  onQuit,
  onUpgrade,
}: {
  players: Player[];
  cats: Set<Category>;
  premium: boolean;
  onQuit: () => void;
  onUpgrade: () => void;
}) {
  const [deck, setDeck] = useState<Card[]>(() => buildDeck(cats, premium));
  const [pos, setPos] = useState(0);
  const [turn, setTurn] = useState(0);
  const [shots, setShots] = useState<number[]>(() => players.map(() => 0));
  const [passes, setPasses] = useState<number[]>(() => players.map(() => 0));
  const [filter, setFilter] = useState<Set<Category>>(new Set(cats));
  const [toast, setToast] = useState<Toast | null>(null);
  const [board, setBoard] = useState(false);
  const [pulse, setPulse] = useState(0);

  // remaining cards from current pos, respecting the category filter
  const view = useMemo(
    () => deck.slice(pos).filter((c) => filter.has(c.category)),
    [deck, pos, filter]
  );
  const current = players[turn];

  const reshuffle = () => {
    setDeck(buildDeck(cats, premium));
    setPos(0);
    setToast({ msg: "Bagong deck! 🔀", tone: "neutral" });
  };

  // advance past the given card and pass the phone to the next player
  const advance = (card: Card) => {
    const realIdx = deck.indexOf(card);
    setPos(realIdx + 1);
    setTurn((tn) => (tn + 1) % players.length);
  };

  const resolve = (verdict: Verdict) => {
    const card = view[0];
    if (!card) return;
    // Keepable cards (Free Pass etc.) are claimed by the current player —
    // either swipe direction or the Kunin button grants a token.
    if (card.keep) {
      setPasses((p) => p.map((v, i) => (i === turn ? v + 1 : v)));
      setToast({ msg: `${current.name} — +1 Free Pass 🎟️`, tone: "pass" });
      tick();
      advance(card);
      return;
    }
    if (verdict === "suko") {
      setShots((s) => s.map((v, i) => (i === turn ? v + 1 : v)));
      setToast({ msg: `${current.name} — SHOT! 🥃`, tone: "suko" });
      setPulse((p) => p + 1);
      buzzShot();
    } else {
      setToast({ msg: `${current.name} — Ginawa! ✓`, tone: "ginawa" });
      tick();
    }
    advance(card);
  };

  // Spend a held Free Pass to dodge the current card's shot.
  const usePass = () => {
    const card = view[0];
    if (!card || card.keep || passes[turn] < 1) return;
    setPasses((p) => p.map((v, i) => (i === turn ? v - 1 : v)));
    setToast({ msg: `${current.name} — Free Pass! 🎟️ ligtas`, tone: "pass" });
    tick();
    advance(card);
  };

  useEffect(() => {
    if (!toast) return;
    const id = setTimeout(() => setToast(null), 1500);
    return () => clearTimeout(id);
  }, [toast]);

  const seen = pos;
  const total = deck.length;
  const out = view.length === 0;

  const toggleFilter = (id: Category) =>
    setFilter((s) => {
      const n = new Set(s);
      n.has(id) ? n.delete(id) : n.add(id);
      if (n.size === 0) return s;
      return n;
    });

  return (
    <div className={"screen game" + (pulse ? " pulsed" : "")}>
      {/* top bar */}
      <header className="game-top">
        <button className="ghost-btn" onClick={onQuit} aria-label="Bumalik">
          ‹
        </button>
        <div
          className="turn-pill"
          style={{ "--pc": current.color } as React.CSSProperties}
        >
          <span className="turn-dot" />
          <span className="turn-meta">
            <span className="turn-label">Tira ni</span>
            <strong>{current.name}</strong>
          </span>
          {passes[turn] > 0 && (
            <button
              className="pass-badge"
              onClick={usePass}
              disabled={out || !!view[0]?.keep}
              title="Gamitin ang Free Pass — iwas sa shot"
            >
              🎟️ {passes[turn]}
            </button>
          )}
        </div>
        <button className="ghost-btn score" onClick={() => setBoard(true)}>
          🥃 {shots.reduce((a, b) => a + b, 0)}
        </button>
      </header>

      {/* progress */}
      <div className="progress-row">
        <div className="progress-track">
          <div
            className="progress-fill"
            style={{ width: `${total ? (seen / total) * 100 : 0}%` }}
          />
        </div>
        <span className="progress-num">
          {Math.min(seen + 1, total)} / {total}
        </span>
      </div>

      {/* category filter */}
      <div className="filter-rail">
        {Object.values(CATEGORIES).map((c) => (
          <button
            key={c.id}
            className={"filter-pill" + (filter.has(c.id) ? " on" : "")}
            style={{ "--cat": c.color } as React.CSSProperties}
            onClick={() => toggleFilter(c.id)}
          >
            <span>{c.emoji}</span>
            {c.label}
          </button>
        ))}
      </div>

      {/* deck */}
      <div className="deck-wrap">
        {out ? (
          <div className="deck-empty">
            <div className="de-emoji">🍹</div>
            <h3>Ubos na ang deck!</h3>
            <p>Naka-{seen} card kayo. Tara, bagong deck?</p>
            <button className="start-btn slim" onClick={reshuffle}>
              Bagong Deck 🔀
            </button>
            {!premium && (
              <button className="unlock-nudge" onClick={onUpgrade}>
                🔓 Gusto mo pa? I-unlock lahat ng {TOTAL_COUNT} cards →
              </button>
            )}
          </div>
        ) : (
          <SwipeDeck stack={view} onResolve={resolve} />
        )}
        {toast && <div className={"toast " + toast.tone}>{toast.msg}</div>}
      </div>

      {/* action buttons */}
      {!out &&
        (view[0]?.keep ? (
          <div className="action-row">
            <button
              className="act-btn keep"
              onClick={() => resolve("ginawa")}
            >
              <span className="act-emoji">🎟️</span>
              <span className="act-txt">
                <b>Kunin</b>
                <small>i-save kay {current.name}</small>
              </span>
            </button>
          </div>
        ) : (
          <div className="action-row">
            <button className="act-btn suko" onClick={() => resolve("suko")}>
              <span className="act-emoji">🥃</span>
              <span className="act-txt">
                <b>Suko</b>
                <small>uminom</small>
              </span>
            </button>
            <button
              className="act-btn ginawa"
              onClick={() => resolve("ginawa")}
            >
              <span className="act-txt">
                <b>Ginawa</b>
                <small>safe</small>
              </span>
              <span className="act-emoji">✓</span>
            </button>
          </div>
        ))}
      <button className="reshuffle-link" onClick={reshuffle}>
        🔀 Bagong deck
      </button>

      {/* leaderboard */}
      {board && (
        <div className="board-overlay" onClick={() => setBoard(false)}>
          <div className="board-sheet" onClick={(e) => e.stopPropagation()}>
            <div className="board-grip" />
            <h3>Shot Count 🥃</h3>
            <ul className="board-list">
              {players
                .map((p, i) => ({ p, i, n: shots[i] }))
                .sort((a, b) => b.n - a.n)
                .map(({ p, i, n }, rank) => (
                  <li key={i} style={{ "--pc": p.color } as React.CSSProperties}>
                    <span className="bl-rank">{rank + 1}</span>
                    <span className="bl-dot" />
                    <span className="bl-name">{p.name}</span>
                    {passes[i] > 0 && (
                      <span className="bl-pass">🎟️ {passes[i]}</span>
                    )}
                    <span className="bl-count">
                      {n} <small>shot{n === 1 ? "" : "s"}</small>
                    </span>
                  </li>
                ))}
            </ul>
            <button className="start-btn slim" onClick={() => setBoard(false)}>
              Tapos
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
