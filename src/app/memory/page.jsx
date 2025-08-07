"use client";

import { useEffect, useState, useRef } from "react";
import styles from "@/styles/memory/memory.module.css";

export default function MemoryGame() {
  const [level, setLevel] = useState(3);
  const [number, setNumber] = useState("");
  const [input, setInput] = useState("");
  const [feedback, setFeedback] = useState("");
  const [lives, setLives] = useState(3);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isShowingNumber, setIsShowingNumber] = useState(true);
  const inputRef = useRef(null);

  useEffect(() => {
    if (timeLeft <= 0 || lives <= 0) return;
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, lives]);

  useEffect(() => {
    generateNewNumber();
  }, []);

  useEffect(() => {
    if (isShowingNumber) {
      const timer = setTimeout(() => setIsShowingNumber(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [number]);

  const generateNewNumber = () => {
    const newNumber = Array.from({ length: level }, () =>
      Math.floor(Math.random() * 10)
    ).join("");
    setNumber(newNumber);
    setInput("");
    setFeedback("");
    setIsShowingNumber(true);
    inputRef.current?.focus();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (input.trim() === number) {
      const newScore = score + 1;
      setScore(newScore);
      setFeedback("✅ Correct!");
      setTimeLeft((t) => t + 3); // 🔥 Add 3 seconds on correct answer
      if (newScore % 3 === 0) setLevel((l) => l + 1);
    } else {
      setLives((l) => l - 1);
      setFeedback(`❌ Wrong! Correct: ${number}`);
    }

    setTimeout(() => {
      if (timeLeft > 0 && lives > 0) {
        generateNewNumber();
      }
    }, 1500);
  };

  const resetGame = () => {
    setLevel(3);
    setScore(0);
    setLives(3);
    setTimeLeft(30);
    generateNewNumber();
  };

  if (timeLeft <= 0 || lives <= 0) {
    return (
      <main className={styles.main}>
        <h1 className={styles.title}>🧠 Memory Numbers Game</h1>
        <p className={styles.message}>Game Over!</p>
        <p className={styles.score}>Your Score: {score}</p>
        <button onClick={resetGame} className={styles.button}>
          Restart Game
        </button>
      </main>
    );
  }

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>🧠 Memory Numbers Game</h1>

      <div className={styles.stats}>
        <span>⏱️ Time: {timeLeft}s</span>
        <span>❤️ Lives: {lives}</span>
        <span>⭐ Score: {score}</span>
      </div>

      <div className={styles.card}>
        <h2 className={styles.number}>
          {isShowingNumber ? number : "?"}
        </h2>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          ref={inputRef}
          className={styles.input}
          type="number"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          autoFocus
          placeholder="Enter the number"
        />
        <button type="submit" className={styles.button}>Submit</button>
      </form>

      {feedback && <p className={styles.message}>{feedback}</p>}
    </main>
  );
}
