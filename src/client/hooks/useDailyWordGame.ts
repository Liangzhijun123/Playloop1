import { useEffect, useState } from 'react';

// Words pool (could be from API later)
const WORDS = ['apple', 'banana', 'cherry', 'grapes', 'orange'];

export function useDailyWordGame() {
  const [word, setWord] = useState('');
  const [guesses, setGuesses] = useState<string[]>([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Daily word logic: choose based on date
    const today = new Date();
    const index = today.getDate() % WORDS.length;
    setWord(WORDS[index] ?? '');
  }, []);

  function makeGuess(guess: string) {
    if (!guess) return;
    const normalizedGuess = guess.toLowerCase();
    setGuesses(prev => [...prev, normalizedGuess]);

    if (normalizedGuess === word) {
      setMessage('🎉 Correct! You guessed the word!');
    } else {
      setMessage(`❌ ${guess} is wrong. Try again!`);
    }
  }

  return {
    word,
    guesses,
    message,
    makeGuess
  };
}
