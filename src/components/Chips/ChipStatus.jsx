import styles from "./ChipStatus.module.css";

const ChipStatus = ({ status, ...props }) => {
  const statusStyle = styles[`chip_${status}`];

  return (
    <div className={statusStyle} {...props}>
      {props.children}
    </div>
  );
};

export default ChipStatus;
