import { useState } from "react";
import styles from "./TextInput.module.css";

const TextInput = ({ label, placeholder, value, onChange, validate }) => {
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
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        className={styles.input}
      />
      {error && <span className={styles.errorText}>{error}</span>}
    </div>
  );
};

export default TextInput;
