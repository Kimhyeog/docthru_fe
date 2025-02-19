"use client";
import React, { useState } from "react";
import style from "../work.module.css";
import TextBox from "@/components/TextBox/TextBox";
import Image from "next/image";
import arrowIcon from "@/assets/arrow_bottom.svg";
import { useAuth } from "@/contexts/AuthContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/api";
import { useParams } from "next/navigation";

function CreateFeedback() {
  const queryClinet = useQueryClient();
  const { isLoggedIn } = useAuth();
  const [content, setContent] = useState();
  const params = useParams();
  const workId = params.workId;
  const { mutate: createFeedback } = useMutation({
    mutationFn: ({ workId, content }) => api.createFeedback(workId, content),
    onSuccess: () => queryClinet.invalidateQueries(["feedbacks", { workId }]),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      alert("로그인해!");
      return;
    }
    console.log(content);
    createFeedback({ workId, content });
    setContent("");
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
      <Image
        src={arrowIcon}
        alt="arrowIcon"
        width={40}
        height={40}
        onClick={handleSubmit}
      />
    </form>
  );
}

export default CreateFeedback;
