import styles from "./ChipStatus.module.css";

const ChipStatus = ({ statusKr, status, ...props }) => {
  const statusStyle = styles[`chip_${status}`];

  return (
    <div className={statusStyle} {...props}>
      {statusKr}
    </div>
  );
};

export default ChipStatus;
