import React, { useEffect, useState } from "react";

type GuessRecord = { guess: string; correct: boolean; at: number };

const STORAGE_KEY = "playloop:dailyword:guesses";

export default function DailyWord() {
  const today = new Date().toISOString().slice(0, 10);
  const [word, setWord] = useState<string | null>(null);
  const [wordLength, setWordLength] = useState<number | null>(null);
  const [input, setInput] = useState("");
  const [message, setMessage] = useState<string>("");
  const [guesses, setGuesses] = useState<GuessRecord[]>([]);

  useEffect(() => {
    // Load guesses
    const raw = localStorage.getItem(`${STORAGE_KEY}:${today}`);
    if (raw) setGuesses(JSON.parse(raw));

    async function fetchWord() {
      const storedWord = localStorage.getItem(`dailyWord:${today}`);
      if (storedWord) {
        setWord(storedWord);
        setWordLength(storedWord.length);
        return;
      }

      try {
        const res = await fetch("/words.json");
        const words: string[] = await res.json();

        // Pick a word based on date for consistency
        const index = new Date(today).getDate() % words.length;
        const dailyWord = words[index].toLowerCase();

        localStorage.setItem(`dailyWord:${today}`, dailyWord);
        setWord(dailyWord);
        setWordLength(dailyWord.length);
      } catch (err) {
        console.error("Failed to load words:", err);
        setMessage("Failed to load today's word. Try again later.");
      }
    }

    fetchWord();
  }, [today]);

  function save(guessesArr: GuessRecord[]) {
    setGuesses(guessesArr);
    localStorage.setItem(`${STORAGE_KEY}:${today}`, JSON.stringify(guessesArr));
  }

  function submit() {
    if (!input.trim()) return setMessage("Enter a guess.");
    if (!word) return setMessage("Word not loaded yet.");
    const correct = input.trim().toLowerCase() === word.toLowerCase();
    const rec: GuessRecord = { guess: input.trim(), correct, at: Date.now() };
    save([...guesses, rec]);
    setInput("");
    setMessage(correct ? "Correct! 🎉" : "Nope — try again.");
  }

  function resetDay() {
    localStorage.removeItem(`${STORAGE_KEY}:${today}`);
    setGuesses([]);
    setMessage("Guesses cleared for today.");
  }

  return (
    <div>
      <p className="small-muted">
        Today's word has <strong>{wordLength ?? "..."}</strong> letters.
      </p>

      <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
        <input
          className="input"
          placeholder="Enter guess"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="button" onClick={submit}>
          Guess
        </button>
        <button className="button secondary" onClick={resetDay}>
          Clear
        </button>
      </div>

      <div className="status">{message}</div>

      <h4 style={{ marginTop: 12 }}>Your guesses</h4>
      <ul className="list">
        {guesses.length === 0 && (
          <li className="small-muted">No guesses yet — good luck!</li>
        )}
        {guesses.map((g, i) => (
          <li key={i}>
            <strong>{g.guess}</strong> — {g.correct ? "✅" : "❌"}{" "}
            <span style={{ color: "#94a3b8", marginLeft: 8 }}>
              {new Date(g.at).toLocaleTimeString()}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
