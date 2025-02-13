"use client";

import { useState } from "react";
import style from "./page.module.css";
import CheckModal from "./modals/CheckModal";
import Button from "../components/Button/Button";
import LoginCheckModal from "./modals/LoginCheckModal";
import PopUpModal from "./modals/PopUpModal";

export default function Home() {
  // 삭제제 사유 모달 창 State 변수
  const [checkModalOn, setCheckModalOn] = useState(false);

  return (
    <div className={style.page}>
      <PopUpModal
        show={checkModalOn}
        onHide={() => {
          setCheckModalOn(false);
        }}
      />

      <Button
        text={`이 버튼을 누르면 **삭제완료** 모달창 열림`}
        onClick={() => {
          setCheckModalOn(true);
        }}
      />

      <PopUpModal
        show={checkModalOn}
        onHide={() => {
          setCheckModalOn(false);
        }}
      />

      <Button
        text={`이 버튼을 누르면 **삭제완료** 모달창 열림`}
        onClick={() => {
          setCheckModalOn(true);
        }}
      />
    </div>
  );
}
