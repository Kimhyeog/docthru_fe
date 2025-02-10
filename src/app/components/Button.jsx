"use client"; // 클라이언트 컴포넌트로 설정

import style from "./Button.module.css";

// btnTypeArr 배열을 그대로 두고, 외부에서 type에 맞는 클래스를 찾을 수 있도록 구현
const btnTypeArr = [
  { black: style.button_black },
  { red: style.button_red },
  { green: style.button_green },
  { gray: style.button_gray },
  { yellow: style.button_yellow },
];

export default function Button({ type, text, onClick }) {
  // btnTypeArr에서 type에 해당하는 클래스 찾기
  const buttonClass = btnTypeArr.find((btn) => btn[type]);

  return (
    <button
      onClick={onClick}
      className={`${style.button} ${buttonClass ? buttonClass[type] : ""}`}
    >
      {text}
    </button>
  );
}
