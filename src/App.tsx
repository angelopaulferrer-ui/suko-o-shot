import { useState } from "react";
import Setup, { type Player } from "./Setup";
import Game from "./Game";
import type { Category } from "./cards";

interface GameConfig {
  players: Player[];
  cats: Set<Category>;
}

export default function App() {
  // "neon" vibe is the design default; the design's tweak panel (vibe/accent/
  // font switcher) was author-tooling, not part of the shipped app.
  const [game, setGame] = useState<GameConfig | null>(null);

  return (
    <div className="app-root" data-vibe="neon">
      <div className="bg-fx">
        <span className="blob b1" />
        <span className="blob b2" />
        <span className="blob b3" />
      </div>
      {game ? (
        <Game
          players={game.players}
          cats={game.cats}
          onQuit={() => setGame(null)}
        />
      ) : (
        <Setup onStart={(players, cats) => setGame({ players, cats })} />
      )}
    </div>
  );
}
