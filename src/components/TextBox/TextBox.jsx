import styles from "./TextBox.module.css";

const TextBox = ({ placeholder, value, onChange }) => {
  return (
    <textarea
      className={styles.textBox}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    ></textarea>
  );
};

export default TextBox;
