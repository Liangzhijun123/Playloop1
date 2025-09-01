import React, { useEffect, useMemo, useState } from "react";
import { pickWordForDate } from "../utils/dailyWords";

const STORAGE_KEY = "playloop:anagram:guesses";

function shuffleString(s: string) {
  const arr = s.split("");
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.join("");
}

export default function DailyAnagram() {
  const today = new Date().toISOString().slice(0,10);
  const word = useMemo(()=> pickWordForDate(today), [today]);
  const [scrambled, setScrambled] = useState<string>(() => shuffleString(word));
  const [guess, setGuess] = useState("");
  const [message, setMessage] = useState("");
  const [solved, setSolved] = useState(false);

  useEffect(()=> {
    // create a deterministic scramble (so everyone sees similar scramble) — we re-shuffle but avoid same as word
    let s = shuffleString(word);
    if (s === word) s = shuffleString(word.split("").reverse().join(""));
    setScrambled(s);
    // load solved state
    const raw = localStorage.getItem(`${STORAGE_KEY}:${today}`);
    if (raw === "solved") setSolved(true);
  }, [today, word]);

  function submit() {
    if (!guess.trim()) return;
    if (guess.trim().toLowerCase() === word.toLowerCase()){
      setMessage("Nice! You unscrambled it 🎉");
      setSolved(true);
      localStorage.setItem(`${STORAGE_KEY}:${today}`, "solved");
    } else {
      setMessage("Not yet — try again!");
    }
    setGuess("");
  }

  function reveal() {
    setMessage(`The word was: ${word}`);
    setSolved(true);
    localStorage.setItem(`${STORAGE_KEY}:${today}`, "solved");
  }

  return (
    <div>
      <p className="small-muted">Scrambled: <strong style={{letterSpacing:2,fontSize:18}}>{scrambled}</strong></p>

      <div style={{display:"flex",gap:8, marginTop:10}}>
        <input className="input" placeholder="Unscramble the word" value={guess} onChange={(e)=>setGuess(e.target.value)} />
        <button className="button" onClick={submit} disabled={solved}>Submit</button>
        <button className="button secondary" onClick={reveal}>Reveal</button>
      </div>

      <div className="status">{message}</div>
      {solved && <div style={{marginTop:8}} className="small-muted">Solved for today — come back tomorrow for a new one.</div>}
    </div>
  );
}
