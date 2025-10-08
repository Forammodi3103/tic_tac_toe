import bgImg from "../assets/backgoround.jpg";

export default function ModeSelection({ setMode }) {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen p-4 sm:p-6 md:p-8 bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImg})` }}
    >
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white mb-6 font-bold drop-shadow-lg text-center">
        Tic Tac Toe
      </h1>

      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 md:gap-8">
        <button
          onClick={() => setMode("one")}
          className="bg-white/20 text-white border border-white/30 px-6 py-3 rounded-xl font-semibold hover:bg-white/30 transition text-sm sm:text-base md:text-lg"
        >
          One Player
        </button>

        <button
          onClick={() => setMode("two")}
          className="bg-white/20 text-white border border-white/30 px-6 py-3 rounded-xl font-semibold hover:bg-white/30 transition text-sm sm:text-base md:text-lg"
        >
          Two Players
        </button>
      </div>
    </div>
  );
}
