import JSON from "./assets/games.json";
import { Game } from "./Game";
import "./common.css";
import "./App.css";

export default function App() {
  return (
    <div className="game_container">
      {JSON.map((gioco) => {
        return <Game gioco={gioco} key={gioco.name}></Game>;
      })}
    </div>
  );
}
