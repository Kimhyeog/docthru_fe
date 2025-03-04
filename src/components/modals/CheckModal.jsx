"use client";

import { FaCheckCircle } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import style from "./CheckModal.module.css";
import { Modal } from "react-bootstrap";
import Button from "@/components/Button/Button";

export default function CheckModal({ show, onHide, text, onClick }) {
  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      dialogClassName={style["modal-custom"]} // ✅ 모달 가로 크기 조정
      contentClassName={style["modal-content-custom"]} // ✅ 내부 컨텐츠 크기 조정
    >
      <div className={style.content}>
        <FaCheckCircle size={"25"} />
        <p>{text}</p>
      </div>
      <div className={style.btnSection}>
        <Button
          type={"no"}
          text={"아니요"}
          onClick={onHide}
          width={90}
          height={40}
        />
        <Button
          type={"yes"}
          text={"네"}
          onClick={onClick}
          width={90}
          height={40}
        />
      </div>
    </Modal>
  );
}
