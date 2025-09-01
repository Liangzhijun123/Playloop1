import React, { useState } from "react";

const WORDS = ["NEON", "CYBER", "GLOW", "FLASH", "LIGHT"];
const TARGET_WORD =
  WORDS.length > 0
    ? WORDS[Math.floor(Math.random() * WORDS.length)]!.toUpperCase()
    : "WORDS";

const Wordle: React.FC = () => {
  const [guess, setGuess] = useState("");
  const [guesses, setGuesses] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  const [revealed, setRevealed] = useState(false);
  const [hint, setHint] = useState<string | null>(null);

  const handleGuess = () => {
    if (guess.length !== TARGET_WORD.length) {
      setMessage(`Word must be ${TARGET_WORD.length} letters`);
      return;
    }
    const upperGuess = guess.toUpperCase();
    setGuesses([...guesses, upperGuess]);
    setGuess("");
    if (upperGuess === TARGET_WORD) {
      setMessage("🎉 Correct!");
    } else if (guesses.length >= 5) {
      setMessage(`Game Over! Word was ${TARGET_WORD}`);
    } else {
      setMessage("");
    }
  };

  const getLetterClass = (letter: string, index: number) => {
    if (TARGET_WORD[index] === letter) return "bg-green-500 text-black";
    else if (TARGET_WORD.includes(letter)) return "bg-yellow-400 text-black";
    return "bg-gray-700 text-white";
  };

  const revealWord = () => {
    setMessage(`Word is: ${TARGET_WORD}`);
    setRevealed(true);
  };

  const giveHint = () => {
    if (!hint) {
      // Collect all guessed letters
      const guessedLetters = guesses.flatMap((g) => g.split(""));
      // Find letters in TARGET_WORD that haven’t been guessed yet
      const remainingLetters = TARGET_WORD.split("").filter(
        (l) => !guessedLetters.includes(l)
      );
      if (remainingLetters.length > 0) {
        const randomLetter = remainingLetters[Math.floor(Math.random() * remainingLetters.length)];
        setHint(randomLetter);
        setMessage(`Hint: One letter is '${randomLetter}'`);
      } else {
        setMessage("No new hints available!");
      }
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex flex-col gap-2">
        {guesses.map((g, i) => (
          <div key={i} className="flex gap-1">
            {g.split("").map((l, idx) => (
              <div
                key={idx}
                className={`w-10 h-10 flex items-center justify-center font-bold rounded ${getLetterClass(
                  l,
                  idx
                )}`}
              >
                {l}
              </div>
            ))}
          </div>
        ))}
      </div>
      <input
        className="px-3 py-2 rounded text-white text-center w-32 border border-gray-400"
        maxLength={TARGET_WORD.length}
        value={guess}
        onChange={(e) => setGuess(e.target.value.toUpperCase())}
      />
      <div className="flex gap-2">
        <button
          className="px-4 py-2 bg-gradient-to-r from-[#00fff7] to-[#ff00ff] text-black font-bold rounded hover:scale-105 transition-transform"
          onClick={handleGuess}
        >
          Guess
        </button>
        <button
          className="px-4 py-2 bg-gray-600 text-white font-bold rounded hover:scale-105 transition-transform"
          onClick={revealWord}
        >
          Reveal Word
        </button>
        <button
          className="px-4 py-2 bg-yellow-400 text-black font-bold rounded hover:scale-105 transition-transform"
          onClick={giveHint}
          disabled={!!hint}
        >
          Hint
        </button>
      </div>
      {message && <div className="text-lg text-[#ff00ff] drop-shadow-neon">{message}</div>}
    </div>
  );
};

export default Wordle;
