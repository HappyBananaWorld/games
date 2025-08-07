import React from "react";
import styles from "@/styles/components/card.module.css";
import { useState } from "react";

const Card = ({ title, desc }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`${styles.card} ${hovered ? styles.cardHover : ""}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <h2 className={styles.cardTitle}>{title}</h2>
      <p className={styles.cardText}>{desc}</p>
    </div>
  );
};

export default Card;
