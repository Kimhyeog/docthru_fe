import styles from "./Chip.module.css";

const typeMapping = {
  modernjs: "Modern JS",
  web: "Web",
  api: "API",
  nextjs: "Next JS",
  career: "Career",
};

const Chip = ({ type, ...props }) => {
  const lowerType = type.toLowerCase();
  const chipStyle = lowerType ? styles[`chip_${lowerType}`] : styles.lowerType;
  const label = typeMapping[lowerType] || "";
  return (
    <div className={chipStyle} {...props}>
      {label}
    </div>
  );
};

export default Chip;
