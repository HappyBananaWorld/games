"use client"
import { useRouter } from "next/navigation"
import styles from "@/styles/home.module.css"

export default function Home() {
  const router = useRouter()

  const handleStart = (difficulty: string) => {
    router.push(`/game?difficulty=${difficulty}`)
  }

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>🧠 Select Difficulty</h1>
      <div className={styles.cardGrid}>
        <button className={styles.card} onClick={() => handleStart("easy")}>
          <h2 className={styles.cardTitle}>Easy</h2>
          <p className={styles.cardText}>+ and - only</p>
        </button>
        <button className={styles.card} onClick={() => handleStart("hard")}>
          <h2 className={styles.cardTitle}>Hard</h2>
          <p className={styles.cardText}>+ − × ÷ mixed</p>
        </button>
        <button className={styles.card} onClick={() => handleStart("expert")}>
          <h2 className={styles.cardTitle}>Expert</h2>
          <p className={styles.cardText}>Bigger numbers. Faster!</p>
        </button>
      </div>
    </main>
  )
}
