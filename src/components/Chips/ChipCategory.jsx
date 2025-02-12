import styles from "./ChipCategory.module.css";

const ChipCategory = ({ category, ...props }) => {
  return (
    <div className={styles.chip_category} {...props}>
      {category}
    </div>
  );
};

export default ChipCategory;
