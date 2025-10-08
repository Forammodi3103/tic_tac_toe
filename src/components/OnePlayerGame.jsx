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

    const ended = checkGameOver(newGrid);

    if (!ended && currentPlayer === "X") {
      setCurrentPlayer("O");
      setTimeout(() => computerMove(newGrid), 500);
    }
  };

  const computerMove = (grid) => {
    if (gameOver) return;

    // Helper to find a winning or blocking move
    const findMove = (player) => {
      for (const [a, b, c] of winningPositions) {
        const line = [grid[a], grid[b], grid[c]];
        const emptyIndex = [a, b, c].find(i => grid[i] === "");
        if (line.filter(cell => cell === player).length === 2 && emptyIndex !== undefined) {
          return emptyIndex;
        }
      }
      return null;
    };

    // 1. Try to win
    let move = findMove("O");
    // 2. Block player win
    if (move === null) move = findMove("X");
    // 3. Take center
    if (move === null && grid[4] === "") move = 4;
    // 4. Take a corner
    if (move === null) {
      const corners = [0, 2, 6, 8].filter(i => grid[i] === "");
      if (corners.length) move = corners[Math.floor(Math.random() * corners.length)];
    }
    // 5. Take a side
    if (move === null) {
      const sides = [1, 3, 5, 7].filter(i => grid[i] === "");
      if (sides.length) move = sides[Math.floor(Math.random() * sides.length)];
    }

    if (move === null) return;

    const newGrid = [...grid];
    newGrid[move] = "O";
    setGameGrid(newGrid);

    const ended = checkGameOver(newGrid);
    if (!ended) setCurrentPlayer("X");
  };

  const checkGameOver = (grid) => {
    for (const [a, b, c] of winningPositions) {
      if (grid[a] && grid[a] === grid[b] && grid[a] === grid[c]) {
        setWinner(grid[a]);
        setWinningCells([a, b, c]);
        setGameOver(true);
        return true;
      }
    }
    if (grid.every(cell => cell !== "")) {
      setWinner("Tie");
      setGameOver(true);
      return true;
    }
    return false;
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
