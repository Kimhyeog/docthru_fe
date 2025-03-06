"use client";

import "bootstrap/dist/css/bootstrap.min.css";
import style from "./RefusalOrDeleteModal.module.css";
import { Modal } from "react-bootstrap";
import Button from "@/components/Button/Button";
import api from "@/api/index";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";

export default function RefusalOrDeleteModal({
  type,
  show,
  onHide,
  challengeId,
  isAdmin = false,
}) {
  const [inputReason, setInputReason] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { mutate: deleteChallenge } = useMutation({
    mutationFn: () => api.deleteChallengeByAdmin(challengeId, inputReason),
    onSuccess: () => {
      alert("챌린지가 삭제되었습니다.");
      window.location.reload();
      onHide(); // API 요청 후 모달 닫기
    },
  });

  const rejectChallenge = async () => {
    if (!inputReason.trim()) {
      alert(`${type} 사유를 입력해주세요.`);
      return;
    }

    try {
      setIsLoading(true);
      await api.rejectedChallengeByAdmin(challengeId, inputReason);
      alert("챌린지가 거절되었습니다.");
      window.location.reload();
      onHide(); // API 요청 후 모달 닫기
    } catch (error) {
      console.error("챌린지 거절 실패:", error);
      alert("챌린지 거절에 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      dialogClassName={style["modal-custom"]}
      contentClassName={style["modal-content-custom"]}
    >
      <h2>{`${type} 사유`}</h2>
      <div className={style.content}>
        <p>내용</p>
        <textarea
          placeholder={`${type} 사유를 입력해주세요.`}
          value={inputReason}
          onChange={(e) => setInputReason(e.target.value)}
        />
      </div>
      <Button
        width="90%"
        type="black"
        text={isLoading ? "처리 중..." : "전송"}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          if (isAdmin) {
            deleteChallenge();
          } else {
            rejectChallenge();
          }
        }}
        disabled={isLoading}
      />
    </Modal>
  );
}
