import { useState } from "react";
import ModeSelection from "./components/ModeSelection";
import OnePlayerGame from "./components/OnePlayerGame";
import TwoPlayerGame from "./components/TwoPlayerGame";

export default function App() {
  const [mode, setMode] = useState(""); // "" | "one" | "two"

  return (
    <>
      {!mode && <ModeSelection setMode={setMode} />}
      {mode === "one" && <OnePlayerGame setMode={setMode} />}
      {mode === "two" && <TwoPlayerGame setMode={setMode} />}

      {/* Footer */}
      <div
        style={{
          position: "fixed",
          bottom: "10px",
          right: "10px",
          fontSize: "18px",
          color: "#BCCCDC",
        }}
      >
        Developed by Foram Modi © 2025
      </div>
    </>
  );
}
