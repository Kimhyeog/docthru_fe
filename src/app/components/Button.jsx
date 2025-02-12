"use client"; // 클라이언트 컴포넌트로 설정

import style from "./Button.module.css";

// 버튼 타입에 따른 스타일 매핑
const btnTypeArr = {
  black: style.button_black,
  red: style.button_red,
  green: style.button_green,
  gray: style.button_gray,
  yellow: style.button_yellow,
  outline_icon: style.button_outline_icon,
  page: style.button_page,
  rightBig: style.button_rightBig,
  rightSmall: style.button_rightSmall,
  bottom: style.button_bottom,
};

export default function Button({ type, text, onClick, icon, className }) {
  return (
    <button
      onClick={onClick}
      className={`${style.button} ${btnTypeArr[type] || ""} ${className || ""}`}
    >
      {text}
      {(type === "outline_icon" ||
        type === "rightBig" ||
        type === "rightSmall" ||
        type === "bottom") &&
        icon}
    </button>
  );
}
