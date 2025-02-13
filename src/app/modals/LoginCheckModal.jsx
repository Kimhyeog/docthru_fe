"use client";

import { FaCheckCircle } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import style from "./LoginCheckModal.module.css";
import { Modal } from "react-bootstrap";
import Button from "@/components/Button/Button";

export default function LoginCheckModal({ show, onHide }) {
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
        <div className={style.comment}>
          <p>로그인이 필요한 기능이에요,</p>
          <p>로그인 하시겠어요?</p>
        </div>
      </div>
      <div className={style.btnSection}>
        <Button
          type={"black"}
          text={"로그인하러 가기"}
          onClick={onHide}
          className={style["modal-button"]} // ✅ 버튼 크기 적용
        />
      </div>
    </Modal>
  );
}
