"use client";

import React, { useEffect, useState } from "react";
import styles from "./Dropdown.module.css";

function Dropdown({ label, options, onSelect, firstOption }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(
    firstOption || options[0]
  ); // 기본값: 첫 번째 옵션
  useEffect(() => {
    if (firstOption) {
      setSelectedOption(firstOption);
    }
  }, [firstOption]);
  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    onSelect(option); // 선택된 옵션을 부모 컴포넌트로 전달
  };

  return (
    <div className={`${styles.dropdown} ${isOpen ? styles.open : ""}`}>
      <label className={styles.label}>{label}</label>
      <button onClick={() => setIsOpen(!isOpen)}>{selectedOption}</button>
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
  );
}

export default Dropdown;
