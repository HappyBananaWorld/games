"use client"
import { useEffect, useState } from "react"
import styles from "@/styles/math/math.module.css"

const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min

const generateQuestion = (difficulty) => {
  let num1, num2, op, answer
  const operators = ['+', '-', '×', '÷']
  const ops = difficulty === 'easy' ? ['+', '-'] : operators

  num1 = getRandomInt(difficulty === 'expert' ? 50 : 1, difficulty === 'expert' ? 150 : 20)
  num2 = getRandomInt(1, 20)
  op = ops[Math.floor(Math.random() * ops.length)]

  switch (op) {
    case '+': answer = num1 + num2; break
    case '-': answer = num1 - num2; break
    case '×': answer = num1 * num2; break
    case '÷':
      answer = parseFloat((num1 / num2).toFixed(1))
      num1 = answer * num2
      break
  }

  const fakeAnswers = new Set()
  while (fakeAnswers.size < 3) {
    let fake = answer + getRandomInt(-10, 10)
    if (fake !== answer) fakeAnswers.add(Number(fake.toFixed(1)))
  }

  const allAnswers = [...fakeAnswers, answer].sort(() => Math.random() - 0.5)

  return { num1, num2, op, answer, options: allAnswers }
}

export default function MathGame() {
  const [difficulty, setDifficulty] = useState(null)
  const [question, setQuestion] = useState(null)
  const [score, setScore] = useState(0)
  const [mistakes, setMistakes] = useState(0)
  const [timeLeft, setTimeLeft] = useState(30)
  const [gameOver, setGameOver] = useState(false)

  useEffect(() => {
    if (!difficulty) return
    setQuestion(generateQuestion(difficulty))
  }, [difficulty])

  useEffect(() => {
    if (timeLeft <= 0 || mistakes >= 3) {
      setGameOver(true)
      return
    }
    if (!difficulty) return

    const timer = setInterval(() => {
      setTimeLeft(t => t - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [timeLeft, mistakes, difficulty])

  const handleAnswer = (selected) => {
    if (!question) return
    if (selected === question.answer) {
      setScore(s => s + 1)
    } else {
      setMistakes(m => m + 1)
    }
    setQuestion(generateQuestion(difficulty))
  }

  const restart = () => {
    setScore(0)
    setMistakes(0)
    setTimeLeft(30)
    setGameOver(false)
    setQuestion(generateQuestion(difficulty))
  }

  if (!difficulty) {
    return (
      <main className={styles.main}>
        <h1 className={styles.title}>🎮 Choose Difficulty</h1>
        <div className={styles.cardGrid}>
          {["easy", "hard", "expert"].map(level => (
            <button
              key={level}
              className={styles.card}
              onClick={() => setDifficulty(level)}
            >
              <h2 className={styles.cardTitle}>{level.toUpperCase()}</h2>
              <p className={styles.cardText}>
                {level === "easy" && "+ − questions, small numbers"}
                {level === "hard" && "Mix of + − × ÷"}
                {level === "expert" && "Big numbers, fast pace!"}
              </p>
            </button>
          ))}
        </div>
      </main>
    )
  }

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>🧠 Math Game ({difficulty.toUpperCase()})</h1>

      {!gameOver ? (
        <div className={styles.cardGrid}>
          <div className={styles.card}>
            {question ? (
              <>
                <h2 className={styles.cardTitle}>
                  {question.num1} {question.op} {question.num2} = ?
                </h2>
                <div className={styles.options}>
                  {question.options.map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleAnswer(opt)}
                      className={styles.optionBtn}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <p className={styles.cardText}>Loading question...</p>
            )}
          </div>

          <div className={styles.card}>
            <p className={styles.cardText}>⏱️ {timeLeft}s</p>
            <p className={styles.cardText}>✅ Score: {score}</p>
            <p className={styles.cardText}>❌ Mistakes: {mistakes}/3</p>
          </div>
        </div>
      ) : (
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>🔥 Game Over</h2>
          <p className={styles.cardText}>Final Score: {score}</p>
          <button onClick={restart} className={styles.optionBtn}>
            Try Again
          </button>
        </div>
      )}
    </main>
  )
}
