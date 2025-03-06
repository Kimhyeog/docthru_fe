"use client";

import "bootstrap/dist/css/bootstrap.min.css";
import style from "./AcceptModal.module.css";
import { Modal } from "react-bootstrap";
import Button from "@/components/Button/Button";
import { FaCheckCircle } from "react-icons/fa";

export default function AcceptModal({ show, onHide, onAccept }) {
  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      dialogClassName={style["modal-custom"]}
      contentClassName={style["modal-content-custom"]}
    >
      <div className={style.logOutModalContents}>
        <FaCheckCircle size={"25"} />
        <p>승인되었습니다.</p>
      </div>
      <Button
        className={style["modal-button"]}
        type={"black"}
        text={"확인"}
        onClick={() => {
          onAccept(); // ✅ 승인 함수 실행
          onHide(); // ✅ 모달 닫기
        }}
        width={120}
        height={48}
      />
    </Modal>
  );
}
