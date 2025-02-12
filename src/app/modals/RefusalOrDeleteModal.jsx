"use client";

import "bootstrap/dist/css/bootstrap.min.css";
import style from "./RefusalOrDeleteModal.module.css";
import { Modal } from "react-bootstrap";
import Button from "../components/Button";

export default function RefusalOrDeleteModal({ type, show, onHide }) {
  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      dialogClassName={style["modal-custom"]} // ✅ 모달 가로 크기 조정
      contentClassName={style["modal-content-custom"]} // ✅ 내부 컨텐츠 크기 조정
    >
      <h2>{`${type} 사유`}</h2>
      <div className={style.content}>
        <p>내용</p>
        <textarea placeholder={`${type} 사유를 입력해주세요.`} />
      </div>
      <Button
        type={"black"}
        text={`전송`}
        onClick={onHide}
        className={style["modal-button"]} // ✅ 버튼 크기 적용
      />
    </Modal>
  );
}
