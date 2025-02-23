import styles from "./ChipCategory.module.css";

const ChipCategory = ({ category, ...props }) => {
  return (
    <div className={styles.chip_category} {...props}>
      {category === "BLOG" ? "블로그" : "공식문서"}
    </div>
  );
};

export default ChipCategory;
