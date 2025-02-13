"use client";

import { useState } from "react";
import styles from "./ConfirmPasswordInput.module.css";
import { Eye, EyeOff } from "lucide-react";

const ConfirmPasswordInput = ({
  label,
  placeholder,
  value,
  onChange,
  password,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isMismatch = value && password !== value;

  return (
    <div className={styles.inputGroup}>
      <label className={styles.label}>{label}</label>
      <div
        className={`${styles.passwordWrapper} ${
          isMismatch ? styles.errorBorder : ""
        }`}
      >
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
      {isMismatch && (
        <span className={styles.errorText}>비밀번호가 일치하지 않습니다</span>
      )}
    </div>
  );
};

export default ConfirmPasswordInput;
