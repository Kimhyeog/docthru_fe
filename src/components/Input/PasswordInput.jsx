"use client";

import { useState } from "react";
import styles from "./PasswordInput.module.css";
import { Eye, EyeOff } from "lucide-react";

const PasswordInput = ({ label, placeholder, value, onChange, validate }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const val = e.target.value;
    onChange(val);

    if (validate) {
      const errorMessage = validate(val);
      setError(errorMessage);
    }
  };

  return (
    <div className={styles.inputGroup}>
      <label className={styles.label}>{label}</label>
      <div className={styles.passwordWrapper}>
        <input
          type={showPassword ? "text" : "password"}
          className={styles.input}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
        />
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className={styles.eyeButton}
        >
          {showPassword ? (
            <EyeOff size={20} className={styles.eyeIcon} />
          ) : (
            <Eye size={20} className={styles.eyeIcon} />
          )}
        </button>
      </div>
      {error && <span className={styles.errorText}>{error}</span>}
    </div>
  );
};

export default PasswordInput;
