"use client";

import { useState } from "react";
import styles from "./PasswordInput.module.css";
import { Eye, EyeOff } from "lucide-react";

const PasswordInput = ({ label, placeholder, value, onChange }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={styles.inputGroup}>
      <label className={styles.label}>{label}</label>
      <div className={styles.passwordWrapper}>
        <input
          type={showPassword ? "text" : "password"}
          className={styles.input}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className={styles.eyeButton}
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>
    </div>
  );
};

export default PasswordInput;
