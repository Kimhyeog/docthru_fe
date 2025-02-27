"use client"; // 클라이언트 컴포넌트로 설정

import style from "./Button.module.css";

// btnTypeArr 배열을 그대로 두고, 외부에서 type에 맞는 클래스를 찾을 수 있도록 구현
const btnTypeArr = [
  { black: style.button_black },
  { red: style.button_red },
  { green: style.button_green },
  { gray: style.button_gray },
  { yellow: style.button_yellow },
  { outline_icon: style.button_outline_icon },
  { page: style.button_page },
  { pageActive: style.button_page_active },
  { pageArrow: style.button_page_arrow },
  { rightBig: style.button_rightBig },
  { rightSmall: style.button_rightSmall },
  { bottom: style.button_bottom },
  { customBlack: style.custom_black },
  { load: style.load },
  { yes: style.yes },
  { no: style.no },
];

export default function Button({ type, text, onClick, icon, ...props }) {
  // btnTypeArr에서 type에 해당하는 클래스 찾기
  const buttonClass = btnTypeArr.find((btn) => btn[type]);

  return (
    <button
      onClick={onClick}
      className={`${style.button} ${buttonClass ? buttonClass[type] : ""} `}
      {...props}
    >
      {text}
      {(type === "outline_icon" ||
        type === "rightBig" ||
        type === "rightSmall" ||
        type === "bottom" ||
        type === "red") &&
        icon}
    </button>
  );
}
