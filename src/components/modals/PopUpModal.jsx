"use client";

import "bootstrap/dist/css/bootstrap.min.css";
import style from "./PopUpModal.module.css";
import { Modal } from "react-bootstrap";
import Button from "@/components/Button/Button";

export default function PopUpModal({ show, onHide, children }) {
  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      dialogClassName={style["modal-custom"]} // ✅ 모달 가로 크기 조정
      contentClassName={style["modal-content-custom"]} // ✅ 내부 컨텐츠 크기 조정
    >
      <p>{children}</p>
      <div>
        <Button
          type={"black"}
          text={"확인"}
          onClick={onHide}
          className={style["modal-button"]} // ✅ 버튼 크기 적용
        />
      </div>
    </Modal>
  );
}
