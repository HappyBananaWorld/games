"use client";

import { useEffect, useState } from "react";
import styles from "@/styles/reaction/reaction.module.css";

export default function ReactionGame() {
  const [status, setStatus] = useState("waiting"); // waiting, ready, clicked, tooSoon
  const [message, setMessage] = useState("Click 'Start' to begin!");
  const [startTime, setStartTime] = useState(0);
  const [reactionTime, setReactionTime] = useState(null);
  const [timeoutId, setTimeoutId] = useState(null);

  const startGame = () => {
    setReactionTime(null);
    setStatus("waiting");
    setMessage("Wait for it...");
    const randomDelay = Math.floor(Math.random() * 4000) + 1000;
    const id = setTimeout(() => {
      setStatus("ready");
      setStartTime(Date.now());
      setMessage("NOW! Click the button!");
    }, randomDelay);
    setTimeoutId(id);
  };

  const handleClick = () => {
    if (status === "waiting") {
      clearTimeout(timeoutId);
      setStatus("tooSoon");
      setMessage("Too soon! Wait for the green.");
    } else if (status === "ready") {
      const endTime = Date.now();
      const reaction = endTime - startTime;
      setReactionTime(reaction);
      setMessage(`Great! Your reaction time is ${reaction} ms.`);
      setStatus("clicked");
    } else {
      startGame();
    }
  };

  const getButtonClass = () => {
    if (status === "ready") return `${styles.button} ${styles.ready}`;
    if (status === "tooSoon") return `${styles.button} ${styles.tooSoon}`;
    return styles.button;
  };

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>⚡ Reaction Speed Game</h1>
      <p className={styles.message}>{message}</p>
      <button className={getButtonClass()} onClick={handleClick}>
        {status === "clicked" || status === "tooSoon" ? "Play Again" : "Click Me"}
      </button>
      {reactionTime && (
        <p className={styles.result}>⏱️ Your time: {reactionTime} ms</p>
      )}
    </main>
  );
}
