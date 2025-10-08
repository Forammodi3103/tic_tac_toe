export default function GridDesign({ gameGrid, handleClick, winningCells }) {
  return (
    <div className="grid grid-cols-3 w-full max-w-[400px] sm:max-w-[500px] md:max-w-[500px] aspect-square gap-1 sm:gap-2 md:gap-3">
      {gameGrid.map((value, index) => (
        <div
          key={index}
          onClick={() => handleClick(index)}
          className={`flex justify-center items-center text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-none text-white select-none transition-all duration-200
            border-[1.5px] border-white/80 aspect-square
            ${winningCells.includes(index)
              ? "bg-green-500/70 backdrop-blur-sm shadow-[0_0_20px_rgba(34,197,94,0.6)]"
              : "hover:bg-white/10"
            }`}
        >
          {value}
        </div>
      ))}
    </div>
  );
}
