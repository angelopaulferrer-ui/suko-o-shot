import { useEffect, useRef, useState } from "react";
import {
  CATEGORIES,
  FREE_COUNT,
  TOTAL_COUNT,
  type Category,
} from "./cards";

export interface Player {
  name: string;
  color: string;
}

export const PLAYER_COLORS = [
  "#c8fa42",
  "#a78bfa",
  "#fb7185",
  "#fbbf24",
  "#34d399",
  "#60a5fa",
  "#f472b6",
  "#f59e0b",
];

const STORE_KEY = "sukoshot.home.v1";
const ALL_CATS = Object.keys(CATEGORIES) as Category[];

export default function Setup({
  onStart,
  premium,
  onUpgrade,
}: {
  onStart: (players: Player[], cats: Set<Category>) => void;
  premium: boolean;
  onUpgrade: () => void;
}) {
  const [players, setPlayers] = useState<Player[]>([]);
  const [draft, setDraft] = useState("");
  const [cats, setCats] = useState<Set<Category>>(new Set(ALL_CATS));
  const [shake, setShake] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // restore last session's players + selected decks
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORE_KEY);
      if (!raw) return;
      const s = JSON.parse(raw);
      if (Array.isArray(s.players)) setPlayers(s.players);
      if (Array.isArray(s.cats) && s.cats.length)
        setCats(new Set(s.cats as Category[]));
    } catch {
      /* ignore */
    }
  }, []);
  useEffect(() => {
    try {
      localStorage.setItem(
        STORE_KEY,
        JSON.stringify({ players, cats: [...cats] })
      );
    } catch {
      /* ignore */
    }
  }, [players, cats]);

  const canStart = players.length >= 2 && cats.size >= 1;

  const addPlayer = () => {
    const name = draft.trim();
    if (!name) {
      inputRef.current?.focus();
      return;
    }
    if (players.some((p) => p.name.toLowerCase() === name.toLowerCase())) {
      setDraft("");
      return;
    }
    setPlayers((p) => [
      ...p,
      { name, color: PLAYER_COLORS[p.length % PLAYER_COLORS.length] },
    ]);
    setDraft("");
    inputRef.current?.focus();
  };

  const removePlayer = (i: number) =>
    setPlayers((p) => p.filter((_, k) => k !== i));

  const toggleCat = (id: Category) =>
    setCats((s) => {
      const n = new Set(s);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });

  const allOn = cats.size === ALL_CATS.length;
  const toggleAll = () => setCats(allOn ? new Set() : new Set(ALL_CATS));

  const start = () => {
    if (!canStart) {
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }
    onStart(players, cats);
  };

  return (
    <div className="ss-screen">
      <div className="ss-bg" aria-hidden="true">
        <div className="ss-glow ss-glow--violet" />
        <div className="ss-glow ss-glow--teal" />
        <div className="ss-glow ss-glow--magenta" />
      </div>

      <div className="ss-scroll">
        {/* logo */}
        <div className="ss-logo">
          <div className="ss-logo-row">
            <span className="ss-logo-suko">SUKO</span>
            <span className="ss-logo-o" aria-label="o">
              o
            </span>
          </div>
          <span className="ss-logo-shot">SHOT</span>
        </div>
        <p className="ss-tagline">
          Gawin ang hamon… o uminom.
          <br />
          <span className="ss-tagline-strong">Walang awa.</span>
        </p>

        {/* premium banner */}
        {premium ? (
          <div className="ss-premium is-premium">
            <span className="ss-premium-lock" aria-hidden="true">
              ✨
            </span>
            <span className="ss-premium-txt">
              <span className="ss-premium-title">Buong deck</span>
              <span className="ss-premium-sub">
                Lahat ng {TOTAL_COUNT} cards naka-unlock
              </span>
            </span>
            <span className="ss-premium-pill">PREMIUM</span>
          </div>
        ) : (
          <button className="ss-premium" type="button" onClick={onUpgrade}>
            <span className="ss-premium-lock" aria-hidden="true">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <rect x="3.5" y="8.5" width="13" height="9" rx="2.2" stroke="currentColor" strokeWidth="1.6" />
                <path d="M6.5 8.5V6.2a3.5 3.5 0 1 1 7 0V8.5" stroke="currentColor" strokeWidth="1.6" />
              </svg>
            </span>
            <span className="ss-premium-txt">
              <span className="ss-premium-title">
                {FREE_COUNT} cards <span className="ss-premium-free">libre</span>
              </span>
              <span className="ss-premium-sub">
                I-unlock lahat ng {TOTAL_COUNT} →
              </span>
            </span>
            <span className="ss-premium-pill">PREMIUM</span>
          </button>
        )}

        {/* players */}
        <div className="ss-sec-head">
          <span className="ss-sec-title">Sino ang kasali?</span>
          <span className="ss-mode-tag">pass-the-phone</span>
        </div>

        <div className="ss-input-row">
          <div className="ss-field">
            <input
              ref={inputRef}
              className="ss-input"
              type="text"
              placeholder="Pangalan…"
              value={draft}
              maxLength={14}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addPlayer()}
            />
            {players.length > 0 && (
              <span className="ss-count">{players.length}</span>
            )}
          </div>
          <button
            className={"ss-add" + (draft.trim() ? " is-ready" : "")}
            type="button"
            onClick={addPlayer}
          >
            Idagdag
          </button>
        </div>

        {/* chips / empty state */}
        {players.length === 0 ? (
          <div className="ss-empty">
            <span className="ss-empty-dots">
              <i />
              <i />
              <i />
            </span>
            Magdagdag ng <b>2+ manlalaro</b> para magsimula.
          </div>
        ) : (
          <div className="ss-chips">
            {players.map((p, i) => (
              <span
                key={i}
                className="ss-chip"
                style={{ "--c": p.color } as React.CSSProperties}
              >
                <span className="ss-chip-av">
                  {p.name.slice(0, 1).toUpperCase()}
                </span>
                {p.name}
                <button
                  className="ss-chip-x"
                  type="button"
                  aria-label={"Tanggalin " + p.name}
                  onClick={() => removePlayer(i)}
                >
                  <svg width="11" height="11" viewBox="0 0 11 11">
                    <path d="M1.5 1.5l8 8M9.5 1.5l-8 8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
                  </svg>
                </button>
              </span>
            ))}
            {players.length < 2 && (
              <span className="ss-chip-hint">isa pa, please…</span>
            )}
          </div>
        )}

        {/* decks */}
        <div className="ss-sec-head ss-sec-head--cat">
          <span className="ss-sec-title">Mga deck</span>
          <button className="ss-toggle-all" type="button" onClick={toggleAll}>
            {allOn ? "Alisin lahat" : "Piliin lahat"}
          </button>
        </div>

        <div className="ss-grid">
          {Object.values(CATEGORIES).map((c) => {
            const on = cats.has(c.id);
            return (
              <button
                key={c.id}
                type="button"
                className={"ss-cat" + (on ? " is-on" : "")}
                style={{ "--hue": c.color } as React.CSSProperties}
                onClick={() => toggleCat(c.id)}
                aria-pressed={on}
              >
                <span className="ss-cat-check" aria-hidden="true">
                  <svg width="12" height="12" viewBox="0 0 12 12">
                    <path d="M2 6.2l2.6 2.6L10 3.2" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span className="ss-cat-emoji">{c.emoji}</span>
                <span className="ss-cat-label">{c.label}</span>
                <span className="ss-cat-sub">{c.sub}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* pinned CTA */}
      <div className="ss-dock">
        <button
          className={
            "ss-start" +
            (canStart ? " is-live" : " is-dim") +
            (shake ? " is-shake" : "")
          }
          type="button"
          onClick={start}
        >
          {canStart ? (
            <>
              <span>Simulan ang Laro</span>
              <span className="ss-start-meta">
                {players.length} players · {cats.size} deck
                {cats.size === 1 ? "" : "s"}
              </span>
              <span className="ss-start-arrow" aria-hidden="true">
                →
              </span>
            </>
          ) : (
            <span className="ss-start-need">
              {players.length < 2
                ? "Kailangan ng 2+ manlalaro"
                : "Pumili ng kahit 1 deck"}
            </span>
          )}
        </button>
      </div>
    </div>
  );
}
