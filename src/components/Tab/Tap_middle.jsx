"use client";

import { useState } from "react";
import styles from "./Tab_middle.module.css";

function TabMiddleButton({ children, active, onClick }) {
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

export default TabMiddleButton;
