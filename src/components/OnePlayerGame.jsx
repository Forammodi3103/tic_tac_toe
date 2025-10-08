import { useState } from "react";
import GridDesign from "./GridDesign";
import bgImg from "../assets/backgoround.jpg";

const winningPositions = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

export default function OnePlayerGame({ setMode }) {
  const [gameGrid, setGameGrid] = useState(Array(9).fill(""));
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [winner, setWinner] = useState("");
  const [winningCells, setWinningCells] = useState([]);
  const [gameOver, setGameOver] = useState(false);

  const handleClick = (index) => {
    if (gameGrid[index] !== "" || gameOver) return;

    const newGrid = [...gameGrid];
    newGrid[index] = currentPlayer;
    setGameGrid(newGrid);

    const ended = checkGameOver(newGrid); // returns true if game ended

    if (!ended && currentPlayer === "X") {
      setCurrentPlayer("O");
      setTimeout(() => computerMove(newGrid), 500);
    }
  };

  const computerMove = (grid) => {
    const emptyIndices = grid.map((v, i) => (v === "" ? i : null)).filter(i => i !== null);
    if (emptyIndices.length === 0 || gameOver) return;

    const randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
    const newGrid = [...grid];
    newGrid[randomIndex] = "O";
    setGameGrid(newGrid);

    const ended = checkGameOver(newGrid); // check if computer won
    if (!ended) setCurrentPlayer("X");
  };

  const checkGameOver = (grid) => {
    for (const [a, b, c] of winningPositions) {
      if (grid[a] && grid[a] === grid[b] && grid[a] === grid[c]) {
        setWinner(grid[a]);
        setWinningCells([a, b, c]);
        setGameOver(true);
        return true; // game ended
      }
    }
    if (grid.every(cell => cell !== "")) {
      setWinner("Tie");
      setGameOver(true);
      return true; // game ended
    }
    return false; // game not ended
  };

  const resetGame = () => {
    setGameGrid(Array(9).fill(""));
    setCurrentPlayer("X");
    setWinner("");
    setWinningCells([]);
    setGameOver(false);
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen p-4 bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImg})` }}
    >
      <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-3xl p-6 shadow-2xl w-[95vw] max-w-[30rem]">
        <div className="flex justify-start mb-4">
          <button
            onClick={() => setMode("")}
            className="bg-white/20 text-white border border-white/30 px-4 py-1 rounded-xl font-semibold hover:bg-white/30 transition"
          >
            ← Back
          </button>
        </div>

        <p className="text-white text-xl sm:text-2xl font-medium text-center mb-6">
          {winner ? (winner === "Tie" ? "Game Tied!" : `Winner: ${winner}`) : `Current Player: ${currentPlayer}`}
        </p>

        <GridDesign gameGrid={gameGrid} handleClick={handleClick} winningCells={winningCells} />

        {gameOver && (
          <div className="flex justify-center mt-6">
            <button
              onClick={resetGame}
              className="bg-white/20 text-white border border-white/30 px-6 py-2 rounded-xl font-semibold hover:bg-white/30 transition"
            >
              New Game
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
