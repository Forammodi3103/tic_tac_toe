import { useState } from "react";
import ModeSelection from "./components/ModeSelection";
import OnePlayerGame from "./components/OnePlayerGame";
import TwoPlayerGame from "./components/TwoPlayerGame";

export default function App() {
  const [mode, setMode] = useState(""); // "" | "one" | "two"

  if (!mode) return <ModeSelection setMode={setMode} />;

  return (
    <>
      {mode === "one" && <OnePlayerGame setMode={setMode} />}
      {mode === "two" && <TwoPlayerGame setMode={setMode} />}
    </>
  );
}
