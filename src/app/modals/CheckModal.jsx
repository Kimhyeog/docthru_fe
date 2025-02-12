"use client";

import { FaCheckCircle } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import style from "./CheckModal.module.css";
import { Modal } from "react-bootstrap";
import Button from "../components/Button";

export default function CheckModal({ show, onHide }) {
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
        <p>정말 취소하시겠습니까?</p>
      </div>
      <div className={style.btnSection}>
        <Button
          text={"아니요"}
          onClick={onHide}
          className={style["modal-button"]} // ✅ 버튼 크기 적용
        />
        <Button
          type={"black"}
          text={"네"}
          onClick={onHide}
          className={style["modal-button"]} // ✅ 버튼 크기 적용
        />
      </div>
    </Modal>
  );
}
