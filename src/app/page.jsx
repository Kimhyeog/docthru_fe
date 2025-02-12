"use client";

import { useState } from "react";
import PopUpModal from "./modals/PopUpModal";
import RefusalOrDeleteModal from "./modals/RefusalOrDeleteModal";
import style from "./page.module.css";
import Button from "./components/Button";
import Check from "../components/Input/Check";

export default function Home() {
  // 가입 완료 모달 창 State 변수
  const [popUpModalOn, setPopUpModalOn] = useState(false);

  // 거절 사유 모달 창 State 변수
  const [refusalModalOn, setRefusalModalOn] = useState(false);
  // 삭제제 사유 모달 창 State 변수
  const [deleteModalOn, setDeleteModalOn] = useState(false);

  return (
    <div className={style.page}>
      <PopUpModal
        show={popUpModalOn}
        onHide={() => {
          setPopUpModalOn(false);
        }}
      />

      <Button
        text={`이 버튼을 누르면 **가입완료** 모달창 열림`}
        onClick={() => {
          setPopUpModalOn(true);
        }}
      />
      <br />
      <RefusalOrDeleteModal
        show={refusalModalOn}
        onHide={() => {
          setRefusalModalOn(false);
        }}
        type={"거절"}
      />

      <Button
        text={`이 버튼을 누르면 **거절완료** 모달창 열림`}
        onClick={() => {
          setRefusalModalOn(true);
        }}
      />
      <br />
      <RefusalOrDeleteModal
        show={deleteModalOn}
        onHide={() => {
          setDeleteModalOn(false);
        }}
        type={"삭제"}
      />

      <Button
        text={`이 버튼을 누르면 **삭제완료** 모달창 열림`}
        onClick={() => {
          setDeleteModalOn(true);
        }}
      />
    </div>
  );
}
