"use client";
import React, { useState } from "react";
import style from "../work.module.css";
import TextBox from "@/components/TextBox/TextBox";
import Image from "next/image";
import inactiveArrowIcon from "@/assets/inactive_arrow_bottom.svg";
import activeArrowIcon from "@/assets/active_arrow_bottom.svg";
import { useAuth } from "@/contexts/AuthContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/api";
import { useParams, useRouter } from "next/navigation";
import { useModalStore } from "@/store/useModalStore";
import LoginCheckModal from "@/components/modals/LoginCheckModal";

function CreateFeedback() {
  const queryClinet = useQueryClient();
  const { isLoggedIn } = useAuth();
  const router = useRouter();
  const [content, setContent] = useState();
  const params = useParams();
  const workId = params.workId;
  const { checkModalOn, showModal, closeModal } = useModalStore();
  const { mutate: createFeedback } = useMutation({
    mutationFn: ({ workId, content }) => api.createFeedback(workId, content),
    onSuccess: () => queryClinet.invalidateQueries(["feedbacks", { workId }]),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      showModal("", false);
      return;
    }
    createFeedback({ workId, content });
    setContent("");
  };

  const onHide = () => {
    closeModal();
    router.push("/login");
  };

  return (
    <form className={style.feedbackInput} onSubmit={handleSubmit}>
      <TextBox
        placeholder="피드백을 남겨주세요"
        value={content}
        onChange={(e) => {
          setContent(e.target.value);
        }}
      ></TextBox>
      {content ? (
        <Image
          src={activeArrowIcon}
          alt="activeArrowIcon"
          width={40}
          height={40}
          onClick={handleSubmit}
        />
      ) : (
        <Image
          src={inactiveArrowIcon}
          alt="inactiveArrowIcon"
          width={40}
          height={40}
        />
      )}

      <LoginCheckModal show={checkModalOn} onHide={onHide}></LoginCheckModal>
    </form>
  );
}

export default CreateFeedback;
