import React from "react";
import styles from "./LoadingSpinner.module.css";

const LoadingSpinner = () => {
  return (
    <div className={styles.container}>
      <div id="spinner" className={styles.spinner}></div>
    </div>
  );
};

export default LoadingSpinner;
