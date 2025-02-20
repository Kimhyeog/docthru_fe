"use client";

import { useState } from "react";
import styles from "./Tap_top.module.css";

function TabTopButton({ children, active, onClick }) {
  return (
    <button
      className={`${styles.tabButton} ${
        active ? styles.active : styles.inactive
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default TabTopButton;
