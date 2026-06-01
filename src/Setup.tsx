import { useRef, useState } from "react";
import { CATEGORIES, FREE_COUNT, TOTAL_COUNT, type Category } from "./cards";

export interface Player {
  name: string;
  color: string;
}

export const PLAYER_COLORS = [
  "#ff6b6b",
  "#fbbf24",
  "#34d399",
  "#60a5fa",
  "#a78bfa",
  "#f472b6",
  "#22d3ee",
  "#fb923c",
];

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
  const [name, setName] = useState("");
  const [cats, setCats] = useState<Set<Category>>(
    new Set(Object.keys(CATEGORIES) as Category[])
  );
  const inputRef = useRef<HTMLInputElement>(null);

  const add = () => {
    const n = name.trim();
    if (!n || players.length >= 12) return;
    setPlayers((p) => [
      ...p,
      { name: n, color: PLAYER_COLORS[p.length % PLAYER_COLORS.length] },
    ]);
    setName("");
    inputRef.current?.focus();
  };

  const toggleCat = (id: Category) =>
    setCats((s) => {
      const n = new Set(s);
      n.has(id) ? n.delete(id) : n.add(id);
      if (n.size === 0) n.add(id);
      return n;
    });

  const canStart = players.length >= 1 && cats.size >= 1;

  return (
    <div className="screen setup">
      <div className="setup-hero">
        <div className="logo-wrap">
          <span className="logo-line">SUKO</span>
          <span className="logo-o">o</span>
          <span className="logo-line shot">SHOT</span>
        </div>
        <p className="tagline">Gawin ang hamon… o uminom. Walang awa.</p>
      </div>

      {premium ? (
        <div className="deck-banner premium">
          <span className="db-emoji">✨</span>
          <div className="db-text">
            <b>Buong deck</b>
            <small>Lahat ng {TOTAL_COUNT} cards naka-unlock</small>
          </div>
        </div>
      ) : (
        <button className="deck-banner locked" onClick={onUpgrade}>
          <span className="db-emoji">🔓</span>
          <div className="db-text">
            <b>Libreng {FREE_COUNT} cards</b>
            <small>I-unlock lahat ng {TOTAL_COUNT} →</small>
          </div>
          <span className="db-cta">PREMIUM</span>
        </button>
      )}

      <div className="setup-block">
        <div className="block-label">
          Sino ang kasali?{" "}
          <span>
            {players.length
              ? `${players.length} player${players.length > 1 ? "s" : ""}`
              : "pass-the-phone"}
          </span>
        </div>
        <div className="add-row">
          <input
            ref={inputRef}
            className="name-input"
            placeholder="Pangalan…"
            value={name}
            maxLength={14}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && add()}
          />
          <button className="add-btn" onClick={add} disabled={!name.trim()}>
            Idagdag
          </button>
        </div>
        <div className="player-chips">
          {players.length === 0 && (
            <div className="empty-hint">
              Magdagdag ng mga manlalaro para magsimula.
            </div>
          )}
          {players.map((p, i) => (
            <span
              key={i}
              className="player-chip"
              style={{ "--pc": p.color } as React.CSSProperties}
            >
              <span className="chip-dot" />
              {p.name}
              <button
                className="chip-x"
                onClick={() =>
                  setPlayers((ps) => ps.filter((_, k) => k !== i))
                }
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </div>

      <div className="setup-block">
        <div className="block-label">Mga kategorya</div>
        <div className="cat-grid">
          {Object.values(CATEGORIES).map((c) => (
            <button
              key={c.id}
              className={"cat-toggle" + (cats.has(c.id) ? " on" : "")}
              style={{ "--cat": c.color, "--cat-deep": c.deep } as React.CSSProperties}
              onClick={() => toggleCat(c.id)}
            >
              <span className="ct-emoji">{c.emoji}</span>
              <span className="ct-label">{c.label}</span>
            </button>
          ))}
        </div>
      </div>

      <button
        className="start-btn"
        disabled={!canStart}
        onClick={() => onStart(players, cats)}
      >
        Simulan ang Laro <span className="sb-arrow">→</span>
      </button>
    </div>
  );
}
