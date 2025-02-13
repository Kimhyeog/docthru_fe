import styles from "./TextBox.module.css";

const TextBox = ({ placeholder }) => {
  return (
    <textarea className={styles.textBox} placeholder={placeholder}></textarea>
  );
};

export default TextBox;
