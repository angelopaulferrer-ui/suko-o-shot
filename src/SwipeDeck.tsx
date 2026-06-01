import { useEffect, useRef, useState } from "react";
import { CATEGORIES, type Card } from "./cards";

export type Verdict = "suko" | "ginawa";

const SUKO_THRESHOLD = 95; // px drag to trigger a fly-off

interface DragState {
  x: number;
  y: number;
  active: boolean;
}

export default function SwipeDeck({
  stack,
  onResolve,
}: {
  stack: Card[];
  onResolve: (v: Verdict) => void;
}) {
  // stack: cards with the top at index 0
  const [drag, setDrag] = useState<DragState>({ x: 0, y: 0, active: false });
  const [flyOff, setFlyOff] = useState<"left" | "right" | null>(null);
  const start = useRef<{ x: number; y: number } | null>(null);
  const topCard = stack[0];

  useEffect(() => {
    setDrag({ x: 0, y: 0, active: false });
    setFlyOff(null);
  }, [topCard?.id]);

  const point = (e: React.MouseEvent | React.TouchEvent) =>
    "touches" in e ? e.touches[0] : (e as React.MouseEvent);

  const onDown = (e: React.MouseEvent | React.TouchEvent) => {
    if (flyOff) return;
    const p = point(e);
    start.current = { x: p.clientX, y: p.clientY };
    setDrag((d) => ({ ...d, active: true }));
  };
  const onMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!start.current) return;
    const p = point(e);
    setDrag({
      x: p.clientX - start.current.x,
      y: (p.clientY - start.current.y) * 0.35,
      active: true,
    });
  };
  const finish = (dir: "left" | "right") => {
    setFlyOff(dir);
    const verdict: Verdict = dir === "left" ? "suko" : "ginawa";
    setTimeout(() => onResolve(verdict), 240);
  };
  const onUp = () => {
    if (!start.current) return;
    start.current = null;
    if (drag.x < -SUKO_THRESHOLD) return finish("left");
    if (drag.x > SUKO_THRESHOLD) return finish("right");
    setDrag({ x: 0, y: 0, active: false });
  };

  const intent = drag.x < -28 ? "suko" : drag.x > 28 ? "ginawa" : null;

  return (
    <div
      className="deck-area"
      onMouseDown={onDown}
      onMouseMove={onMove}
      onMouseUp={onUp}
      onMouseLeave={onUp}
      onTouchStart={onDown}
      onTouchMove={onMove}
      onTouchEnd={onUp}
    >
      {stack.map((card, i) => {
        if (i > 2) return null;
        const isTop = i === 0;
        const cat = CATEGORIES[card.category];
        let transform: string;
        let transition: string;
        let opacity = 1;
        if (isTop) {
          if (flyOff) {
            const dx = flyOff === "left" ? -640 : 640;
            const rot = flyOff === "left" ? -22 : 22;
            transform = `translate(${dx}px, 40px) rotate(${rot}deg)`;
            transition = "transform .26s cubic-bezier(.4,0,.6,1), opacity .26s";
            opacity = 0;
          } else {
            const rot = drag.x / 22;
            transform = `translate(${drag.x}px, ${drag.y}px) rotate(${rot}deg)`;
            transition = drag.active
              ? "none"
              : "transform .35s cubic-bezier(.2,.8,.2,1)";
          }
        } else {
          const lift = flyOff ? i - 1 : i;
          transform = `translateY(${lift * 14}px) scale(${1 - lift * 0.05})`;
          transition = "transform .3s cubic-bezier(.2,.8,.2,1)";
          opacity = lift > 1 ? 0 : 1;
        }
        return (
          <article
            key={card.id}
            className="game-card"
            style={
              {
                transform,
                transition,
                opacity,
                zIndex: 10 - i,
                "--cat": cat.color,
                "--cat-deep": cat.deep,
                cursor: isTop ? (drag.active ? "grabbing" : "grab") : "default",
              } as React.CSSProperties
            }
          >
            <div className="card-glow" />
            <div className="card-top">
              <span className="card-badge">
                <span className="badge-emoji">{cat.emoji}</span>
                {cat.label}
              </span>
              <span className="card-tag">{cat.tag}</span>
            </div>
            <h2 className="card-title">{card.title}</h2>
            <p className="card-body">{card.body}</p>
            <div className="card-foot">
              {card.keep ? (
                <span className="foot-hint keep">
                  🎟️ <b>I-swipe para Kunin</b> · i-save ang pass
                </span>
              ) : (
                <>
                  <span className="foot-hint left">
                    <b>← Suko</b> · shot
                  </span>
                  <span className="foot-hint right">
                    Ginawa <b>→</b>
                  </span>
                </>
              )}
            </div>
            {isTop &&
              (card.keep ? (
                <>
                  <div
                    className="stamp stamp-keep right"
                    style={{
                      opacity:
                        intent === "suko" ? Math.min(1, (-drag.x - 28) / 70) : 0,
                    }}
                  >
                    KUNIN 🎟️
                  </div>
                  <div
                    className="stamp stamp-keep left"
                    style={{
                      opacity:
                        intent === "ginawa" ? Math.min(1, (drag.x - 28) / 70) : 0,
                    }}
                  >
                    KUNIN 🎟️
                  </div>
                </>
              ) : (
                <>
                  <div
                    className="stamp stamp-suko"
                    style={{
                      opacity:
                        intent === "suko" ? Math.min(1, (-drag.x - 28) / 70) : 0,
                    }}
                  >
                    SHOT 🥃
                  </div>
                  <div
                    className="stamp stamp-ginawa"
                    style={{
                      opacity:
                        intent === "ginawa" ? Math.min(1, (drag.x - 28) / 70) : 0,
                    }}
                  >
                    GINAWA ✓
                  </div>
                </>
              ))}
          </article>
        );
      })}
    </div>
  );
}
