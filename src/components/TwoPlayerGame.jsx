import { useState } from "react";
import GridDesign from "./GridDesign";
import bgImg from "../assets/backgoround.jpg"; // import your image

const winningPositions = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];

export default function TwoPlayerGame({ setMode }) {
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
    checkGameOver(newGrid);

    if (!gameOver) setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
  };

  const checkGameOver = (grid) => {
    for (const [a,b,c] of winningPositions) {
      if (grid[a] && grid[a] === grid[b] && grid[a] === grid[c]) {
        setWinner(grid[a]);
        setWinningCells([a,b,c]);
        setGameOver(true);
        return;
      }
    }
    if (grid.every(cell => cell !== "")) {
      setWinner("Tie");
      setGameOver(true);
    }
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
      className="flex flex-col items-center justify-center min-h-screen p-4  sm:p-5 md:p-7 bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImg})` }} // set your image as background
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
