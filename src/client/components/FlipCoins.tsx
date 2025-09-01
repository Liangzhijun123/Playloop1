import React, { useState } from "react";

type CoinSide = "Heads" | "Tails";

const FlipCoinsVsNPC: React.FC = () => {
  const [userChoice, setUserChoice] = useState<CoinSide | null>(null);
  const [npcChoice, setNpcChoice] = useState<CoinSide | null>(null);
  const [wins, setWins] = useState(0);
  const [losses, setLosses] = useState(0);
  const [ties, setTies] = useState(0);
  const [result, setResult] = useState<"Win" | "Lose" | "Tie" | null>(null);

  const flipCoin = () => {
    const outcomes: CoinSide[] = ["Heads", "Tails"];
    const userFlip = outcomes[Math.floor(Math.random() * outcomes.length)];
    const npcFlip = outcomes[Math.floor(Math.random() * outcomes.length)];

    setUserChoice(userFlip);
    setNpcChoice(npcFlip);

    // Determine result
    if (userFlip === npcFlip) {
      setTies((prev) => prev + 1);
      setResult("Tie");
    } else if (
      (userFlip === "Heads" && npcFlip === "Tails") ||
      (userFlip === "Tails" && npcFlip === "Heads")
    ) {
      setWins((prev) => prev + 1);
      setResult("Win");
    } else {
      setLosses((prev) => prev + 1);
      setResult("Lose");
    }
  };

  const getImage = (side: CoinSide | null) => {
    if (!side) return "/head.png";
    return side === "Heads" ? "/head.png" : "/tail.png";
  };

  const resultColor = () => {
    if (result === "Win") return "text-green-400 drop-shadow-glow-green animate-pulseText";
    if (result === "Lose") return "text-red-400 drop-shadow-glow-red animate-pulseText";
    if (result === "Tie") return "text-yellow-400 drop-shadow-glow-yellow animate-pulseText";
    return "";
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <button
        className="px-6 py-3 bg-gradient-to-r from-[#ff00ff] to-[#00fff7] text-black font-bold rounded-full hover:scale-105 transition-transform"
        onClick={flipCoin}
      >
        Flip Coin
      </button>

      <div className="flex items-center gap-12">
        <div className="flex flex-col items-center gap-2">
          <h2 className="font-bold text-xl text-[#ff00ff]">You</h2>
          <img src={getImage(userChoice)} alt="Your Coin" className="w-32 h-32" />
          {userChoice && <div className="text-lg font-semibold">{userChoice}</div>}
        </div>

        <div className="flex flex-col items-center gap-2">
          <h2 className="font-bold text-xl text-[#00fff7]">NPC</h2>
          <img src={getImage(npcChoice)} alt="NPC Coin" className="w-32 h-32" />
          {npcChoice && <div className="text-lg font-semibold">{npcChoice}</div>}
        </div>
      </div>

      {result && (
        <div className={`mt-4 text-3xl font-bold ${resultColor()}`}>
          {result === "Win" ? "You Win!" : result === "Lose" ? "You Lose!" : "It's a Tie!"}
        </div>
      )}

      <div className="flex gap-6 mt-4 text-lg font-bold">
        <div>Wins: {wins}</div>
        <div>Losses: {losses}</div>
        <div>Ties: {ties}</div>
      </div>
    </div>
  );
};

export default FlipCoinsVsNPC;
