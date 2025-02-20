"use client";

import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./DeadlineInput.module.css";
import { Calendar } from "lucide-react";

const DeadlineInput = ({ label, value, onChange }) => {
  const [showCalendar, setShowCalendar] = useState(false);

  return (
    <div className={styles.inputGroup}>
      <label className={styles.label}>{label}</label>

      {/* 달력 위치 조정 */}
      {showCalendar && (
        <div className={styles.datePickerContainer}>
          <DatePicker
            selected={value ? new Date(value) : null}
            onChange={(date) => {
              onChange(date.toISOString().split("T")[0]); // YYYY-MM-DD 형식
              setShowCalendar(false);
            }}
            dateFormat="yy/MM/dd"
            inline
          />
        </div>
      )}

      <div className={styles.inputWrapper}>
        <input
          type="text"
          className={styles.input}
          placeholder="YY/MM/DD"
          value={value}
          readOnly // 직접 입력 방지
        />
        <button
          className={styles.calendar}
          type="button"
          onClick={() => setShowCalendar(!showCalendar)}
        >
          <Calendar size={20} className={styles.calendarIcon} />
        </button>
      </div>
    </div>
  );
};

export default DeadlineInput;
