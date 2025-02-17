import style from "./Check.module.css";

export default function Check({ type, name, text, value, checked, onChange }) {
  return (
    <label className={style.label}>
      <input
        type={type}
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className={style[type]}
      />
      <span
        className={
          type === "checkbox" ? style.customCheckbox : style.customRadio
        }
      ></span>
      <span className={style.text}>{text}</span>
    </label>
  );
}
