import JSON from "./assets/games.json";
import { Game } from "./Game";
import "./App.css";

export default function App() {
  return (
    <>
      {JSON.map((gioco) => {
        return <Game gioco={gioco} key={gioco.name}></Game>;
      })}
    </>
  );
}
