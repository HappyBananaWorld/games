import React from "react";
import styles from "@/styles/components/card.module.css";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Card = ({ title, desc, path }) => {
  const [hovered, setHovered] = useState(false);
  const router = useRouter();

  return (
    <div
      className={`${styles.card} ${hovered ? styles.cardHover : ""}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => router.push(path)}
    >
      <h2 className={styles.cardTitle}>{title}</h2>
      <p className={styles.cardText}>{desc}</p>
    </div>
  );
};

export default Card;
