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

      <div className={styles.inputWrapper}>
        <input
          type="text"
          className={styles.input}
          placeholder="YY/MM/DD"
          value={value}
          readOnly
        />
        <button
          className={styles.calendar}
          type="button"
          onClick={() => setShowCalendar(!showCalendar)}
        >
          <Calendar size={20} className={styles.calendarIcon} />
        </button>

        {showCalendar && (
          <div className={styles.datePickerContainer}>
            <DatePicker
              selected={value ? new Date(value) : null}
              onChange={(date) => {
                onChange(date.toISOString().split("T")[0]);
                setShowCalendar(false);
              }}
              dateFormat="yy/MM/dd"
              inline
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default DeadlineInput;
