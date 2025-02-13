import styles from "./Chip.module.css";

const Chip = ({ type, ...props }) => {
  const chipStyle = type ? styles[`chip_${type}`] : styles.chip;

  return (
    <div className={chipStyle} {...props}>
      {props.children}
    </div>
  );
};

export default Chip;
