"use client";

import Button from "./components/Button";
import style from "./page.module.css";

export default function Home() {
  return (
    <div className={style.page}>
      <Button text={"나는 버튼입니다."} onClick={() => {}} />
      <Button
        type={"black"}
        text={"나는 블랙 버튼입니다."}
        onClick={() => {}}
      />
      <Button type={"red"} text={"나는 레드 버튼입니다."} onClick={() => {}} />
      <Button
        type={"yellow"}
        text={"나는 노란 버튼입니다."}
        onClick={() => {}}
      />
      <Button type={"gray"} text={"나는 회색 버튼입니다."} onClick={() => {}} />
    </div>
  );
}
