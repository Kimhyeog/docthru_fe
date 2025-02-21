"use client";
import { useState } from "react";
import styles from "./TextInput.module.css";
import { ChevronDown } from "lucide-react";

const TextInput = ({
  label,
  placeholder,
  value,
  onChange,
  validate,
  dropdown,
  options,
  isTextArea = false,
}) => {
  const [error, setError] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  const handleChange = (e) => {
    const val = e.target.value;
    onChange(val);

    if (validate) {
      const errorMessage = validate(val);
      setError(errorMessage);
    }
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    onChange(option);
  };

  return (
    <div className={styles.inputGroup}>
      <label className={styles.label}>{label}</label>
      {isTextArea ? (
        <textarea
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          className={`${styles.input} ${styles.textarea}`} // textarea 스타일 적용
        />
      ) : (
        <input
          type="text"
          placeholder={placeholder}
          value={selectedOption || value}
          onChange={handleChange}
          className={styles.input}
        />
      )}
      {dropdown && options && (
        <div className={styles.dropdown}>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={styles.dropdownButton}
          >
            {selectedOption || placeholder}
            <ChevronDown size={20} />
          </button>
          {isOpen && (
            <ul className={styles["dropdown-menu"]}>
              {options.map((option) => (
                <li key={option} onClick={() => handleOptionClick(option)}>
                  {option}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
      {error && <span className={styles.errorText}>{error}</span>}
    </div>
  );
};

export default TextInput;
