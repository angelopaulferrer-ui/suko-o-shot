import { useState } from "react";
import { FREE_COUNT, TOTAL_COUNT } from "./cards";
import { PREMIUM_PRICE, purchasePremium, restorePurchases } from "./purchases";

export default function Paywall({
  onClose,
  onUnlocked,
}: {
  onClose: () => void;
  onUnlocked: () => void;
}) {
  const [busy, setBusy] = useState<null | "buy" | "restore">(null);
  const [err, setErr] = useState<string | null>(null);

  const buy = async () => {
    setBusy("buy");
    setErr(null);
    try {
      const ok = await purchasePremium();
      if (ok) onUnlocked();
      else setErr("Hindi natuloy ang bili. Subukan ulit.");
    } catch {
      setErr("May problema sa pagbili. Subukan ulit.");
    } finally {
      setBusy(null);
    }
  };

  const restore = async () => {
    setBusy("restore");
    setErr(null);
    try {
      const ok = await restorePurchases();
      if (ok) onUnlocked();
      else setErr("Walang nahanap na dating bili.");
    } catch {
      setErr("Hindi ma-restore ngayon.");
    } finally {
      setBusy(null);
    }
  };

  return (
    <div className="board-overlay" onClick={onClose}>
      <div className="board-sheet paywall" onClick={(e) => e.stopPropagation()}>
        <div className="board-grip" />
        <div className="pw-badge">⚡ PREMIUM</div>
        <h3 className="pw-title">I-unlock ang Buong Deck</h3>
        <p className="pw-sub">
          Libre kang naglalaro gamit ang {FREE_COUNT} cards. I-unlock lahat ng{" "}
          <b>{TOTAL_COUNT}</b> — isang bayad, habambuhay.
        </p>

        <ul className="pw-perks">
          <li>
            <span>🎴</span> Lahat ng {TOTAL_COUNT} cards sa 6 na kategorya
          </li>
          <li>
            <span>🚫</span> Walang ads, walang abala
          </li>
          <li>
            <span>🔓</span> Isang beses bayad — pang-habambuhay
          </li>
          <li>
            <span>✨</span> Lahat ng bagong card pack, libre na
          </li>
        </ul>

        {err && <div className="pw-err">{err}</div>}

        <button className="start-btn pw-buy" onClick={buy} disabled={!!busy}>
          {busy === "buy" ? "Sandali…" : `I-unlock — ${PREMIUM_PRICE}`}
        </button>
        <button className="pw-restore" onClick={restore} disabled={!!busy}>
          {busy === "restore" ? "Nire-restore…" : "I-restore ang bili"}
        </button>
        <button className="pw-close" onClick={onClose} disabled={!!busy}>
          Hindi muna
        </button>
      </div>
    </div>
  );
}
