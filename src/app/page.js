"use client"
import Head from 'next/head'
import { useState } from 'react'

export default function Home() {
  const styles = {
    main: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f0f0f, #1a1a1a)',
      color: '#fff',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '4rem 2rem',
      fontFamily: "'Fredoka', sans-serif",
      overflow: 'hidden',
    },
    title: {
      fontSize: '3.5rem',
      marginBottom: '3rem',
      color: '#ff69b4',
      textShadow: '0 0 20px #ff69b488, 0 0 40px #ff69b455',
      letterSpacing: '1px',
      userSelect: 'none',
    },
    cardGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
      gap: '2rem',
      width: '100%',
      maxWidth: '1200px',
      zIndex: 2,
    },
    card: {
      background: 'rgba(255, 255, 255, 0.05)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      borderRadius: '24px',
      padding: '2rem',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      boxShadow: '0 4px 20px rgba(255, 105, 180, 0.2)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      cursor: 'pointer',
    },
    cardHover: {
      transform: 'translateY(-8px) scale(1.02)',
      boxShadow: '0 0 30px rgba(255, 105, 180, 0.5)',
    },
    cardTitle: {
      color: '#ff85c1',
      fontSize: '1.8rem',
      marginBottom: '1rem',
      fontWeight: 600,
    },
    cardText: {
      color: '#e0e0e0',
      fontSize: '1rem',
      lineHeight: '1.7',
    },
    glow: {
      position: 'absolute',
      width: '500px',
      height: '500px',
      background: 'radial-gradient(circle, #ff69b4 0%, transparent 70%)',
      top: '-150px',
      left: '-150px',
      zIndex: 0,
      filter: 'blur(100px)',
      opacity: 0.4,
    },
  }

  const Card = ({ title, desc }) => {
    const [hovered, setHovered] = useState(false)
    return (
      <div
        style={{ ...styles.card, ...(hovered ? styles.cardHover : {}) }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <h2 style={styles.cardTitle}>{title}</h2>
        <p style={styles.cardText}>{desc}</p>
      </div>
    )
  }

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

      <div style={styles.glow}></div>

      <main style={styles.main}>
        <h1 style={styles.title}>🔥 Mini Game Hub</h1>

        <div style={styles.cardGrid}>
          <Card title="🧠 Math Madness" desc="Quick math challenges to boost your brain power." />
          <Card title="🔢 Guess The Number" desc="Can you guess the secret number before your chances run out?" />
          <Card title="🕯️ Candle Fortune" desc="Light a digital candle and reveal your mysterious destiny." />
        </div>
      </main>
    </>
  )
}
