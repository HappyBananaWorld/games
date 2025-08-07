"use client"
import Head from 'next/head'
import styles from "@/styles/home.module.css"
import Card from '@/components/Card'

export default function Home() {
  return (
    <>
      <Head>
        <title>Mini Games</title>
        <meta name="description" content="Sexy little game hub with math, guessing, and more!" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fredoka:wght@400;600&display=swap"
          rel="stylesheet"
        />
      </Head>

      <div className={styles.glow}></div>

      <main className={styles.main}>
        <h1 className={styles.title}>🍌 Happy Banana World</h1>

        <div className={styles.cardGrid}>
          <Card title="🧠 Math Madness" desc="Quick math challenges to boost your brain power." />
          <Card title="🔢 Guess The Number" desc="Can you guess the secret number before your chances run out?" />
          <Card title="🕯️ Candle Fortune" desc="Light a digital candle and reveal your mysterious destiny." />
        </div>
      </main>
    </>
  )
}
