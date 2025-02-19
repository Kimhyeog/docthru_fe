import styles from "./DeadlineInput.module.css";
import { Calendar } from "lucide-react";

const DeadlineInput = ({ label, value, onChange }) => {
  return (
    <div className={styles.inputGroup}>
      <label className={styles.label}>{label}</label>
      <div className={styles.inputWrapper}>
        <input
          type="text"
          className={styles.input}
          placeholder="YY/MM/DD"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <button className={styles.calendar}>
          <Calendar size={20} className={styles.calendarIcon} />
        </button>
      </div>
    </div>
  );
};

export default DeadlineInput;
