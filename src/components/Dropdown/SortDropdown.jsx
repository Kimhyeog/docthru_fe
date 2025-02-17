"use client";

import { useState } from "react";
import styles from "./SortDropdown.module.css";

const SortDropdown = ({ options, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(options[0]);

  const handleSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    onSelect(option); // 부모 컴포넌트에 선택된 옵션 전달
  };

  return (
    <div className={styles.dropdown}>
      <button onClick={() => setIsOpen(!isOpen)}>
        {selectedOption || "정렬 기준 선택"}
      </button>
      {isOpen && (
        <ul className={styles.dropdownMenu}>
          {options.map((option) => (
            <li
              className={styles.dropdownItem}
              key={option}
              onClick={() => handleSelect(option)}
            >
              {option}
            </li>
          ))}
          <li className={styles.cancel} onClick={() => setIsOpen(false)}>
            취소하기
          </li>
        </ul>
      )}
    </div>
  );
};

export default SortDropdown;
