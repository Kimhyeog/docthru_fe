"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import DeadlineInput from "@/components/Input/DeadlineInput";
import TextInput from "@/components/Input/TextInput";
import React, { useState, useEffect } from "react";
import style from "../Edit.module.css";
import Button from "@/components/Button/Button";
import PopUpModal from "@/components/modals/PopUpModal";
import { useParams, useRouter } from "next/navigation";
import Dropdown from "@/components/Dropdown/Dropdown";
import api from "@/api";
import { z } from "zod";
import dayjs from "dayjs";

function EditChallengeForm() {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [category, setCategory] = useState("Career");
  const [docType, setDocType] = useState("BLOG");
  const [maxUsers, setMaxUsers] = useState("");
  const [date, setDate] = useState("");
  const [content, setContent] = useState("");

  const categoryOptions = ["Career", "ModernJS", "Web", "Nextjs", "API"];
  const docTypeOptions = ["블로그", "공식문서"];
  const urlSchema = z.string().url();

  const params = useParams();
  const challengeId = params.challengeId;
  const queryClinet = useQueryClient();

  const { data: initialChallenge } = useQuery({
    queryFn: () => api.getChallenge(challengeId),
    queryKey: ["challenge", { challengeId }],
  });

  useEffect(() => {
    if (initialChallenge) {
      setTitle(initialChallenge.title);
      setLink(initialChallenge.docUrl);
      setCategory(initialChallenge.field);
      setDocType(initialChallenge.docType);
      setDate(dayjs(initialChallenge.deadline).format("YYYY-MM-DD"));
      setMaxUsers(initialChallenge.maxParticipants);
      setContent(initialChallenge.content);
    }
  }, [initialChallenge]);

  const [isValid, setIsValid] = useState({
    title: true,
    link: true,
    category: true,
    docType: true,
    maxUsers: true,
    content: true,
  });

  useEffect(() => {
    setIsValid({
      title: title.trim() !== "",
      link: link.trim() !== "",
      category: category !== "",
      docType: docType !== "",
      maxUsers: /^[0-9]+$/.test(maxUsers),
      content: content.trim() !== "",
    });
  }, [title, link, category, docType, maxUsers, date, content]);

  const { mutate: updateChallenge } = useMutation({
    mutationFn: (dto) => api.updateChallenge(challengeId, dto),
    onSuccess: (data) => {
      setShowModal(true);
      queryClinet.invalidateQueries({
        queryKey: ["challenge", { challengeId }],
      });
    },
    onError: (error) => {
      console.error("에러 발생:", error.message);
    },
  });

  const handleMaxUsersChange = (val) => {
    if (/^\d*$/.test(val)) {
      setMaxUsers(val);
    }
  };

  const handleSubmit = async () => {
    const requestBody = {
      title: title.trim(),
      field: category ? category.toUpperCase() : "",
      docType: docType === "블로그" ? "BLOG" : "OFFICIAL",
      docUrl: link.trim(),
      deadline: date ? new Date(date).toISOString() : null,
      maxParticipants: maxUsers ? Number(maxUsers) : 0,
      content: content.trim(),
    };
    updateChallenge(requestBody);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    router.push("/");
  };

  return (
    <div className={style.container}>
      <p className={style.title}>챌린지 수정</p>
      <TextInput
        label="제목"
        placeholder="제목을 입력하세요"
        value={title}
        onChange={setTitle}
      />
      <TextInput
        label="원문 링크"
        placeholder="원문 링크를 입력하세요"
        value={link}
        onChange={setLink}
        validate={(val) => {
          const result = urlSchema.safeParse(val);
          return result.success ? "" : "올바른 링크를 입력하세요";
        }}
      />
      <Dropdown
        label="분야"
        options={categoryOptions}
        onSelect={setCategory}
        firstOption={initialChallenge?.field}
      />
      <Dropdown
        label="문서 타입"
        options={docTypeOptions}
        onSelect={setDocType}
        firstOption={
          initialChallenge?.docType === "BLOG" ? "블로그" : "공식문서"
        }
      />
      <DeadlineInput label="날짜" value={date} onChange={setDate} />
      <TextInput
        label="최대 인원"
        placeholder="인원을 입력해 주세요"
        value={maxUsers}
        onChange={handleMaxUsersChange}
      />
      <TextInput
        label="내용"
        placeholder="내용을 입력해 주세요"
        value={content}
        className={style.content}
        onChange={setContent}
        isTextArea={true}
      />
      <Button
        type="black"
        text="수정하기"
        onClick={handleSubmit}
        disabled={!Object.values(isValid).every(Boolean)}
        width={"100%"}
      />

      <PopUpModal show={showModal} onHide={handleCloseModal}>
        수정되었습니다
      </PopUpModal>
    </div>
  );
}

export default EditChallengeForm;
