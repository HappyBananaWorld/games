"use client";
import Head from "next/head";
import styles from "@/styles/home.module.css";
import Card from "@/components/Card";

export default function Home() {
  return (
    <>
      <Head>
        <title>Mini Games</title>
        <meta
          name="description"
          content="Sexy little game hub with math, guessing, and more!"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Fredoka:wght@400;600&display=swap"
          rel="stylesheet"
        />
      </Head>

      <div className={styles.glow}></div>

      <main className={styles.main}>
        <h1 className={styles.title}>🍌 Happy Banana World</h1>

        <div className={styles.cardGrid}>
          <Card
            path={"/math"}
            title="🧠 Math Madness"
            desc="Quick math challenges to boost your brain power."
          />
          <Card
            path={"/memory"}
            title="⚡ Reaction Test"
            desc="Tap the button as fast as you can when it changes color. How quick are your reflexes?"
          />
          <Card
            path={"/reaction"}
            title="🔢 Number Speed Challenge"
            desc="Quickly type the numbers shown before time runs out. Can you keep up the pace?"
          />
        </div>
      </main>
    </>
  );
}
