import { useMutation } from "@tanstack/react-query";
import DeadlineInput from "@/components/Input/DeadlineInput";
import TextInput from "@/components/Input/TextInput";
import React, { useState, useEffect } from "react";
import style from "../Create.module.css";
import Button from "@/components/Button/Button";
import PopUpModal from "@/components/modals/PopUpModal";
import { useRouter } from "next/navigation";
import Dropdown from "@/components/Dropdown/Dropdown";

function CreateChallengeForm() {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [category, setCategory] = useState("");
  const [docType, setDocType] = useState("");
  const [maxUsers, setMaxUsers] = useState("");
  const [date, setDate] = useState("");
  const [content, setContent] = useState("");

  const categoryOptions = ["Career", "Modern JS", "Web", "Next.js", "API"];
  const docTypeOptions = ["블로그", "공식문서"];

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
      maxUsers: maxUsers.trim() !== "",
      content: content.trim() !== "",
    });
  }, [title, link, category, docType, maxUsers, date, content]);

  //   const createChallenge = async (challengeData) => {
  //     const response = await fetch(
  //       "https://docthru-be-5u42.onrender.com/challenges",
  //       {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify(challengeData),
  //       }
  //     );

  //     if (!response.ok) {
  //       const errorData = await response.json();
  //       throw new Error(errorData.message || "챌린지 생성 실패");
  //     }

  //     return response.json();
  //   };

  //   const mutation = useMutation({
  //     mutationFn: createChallenge,
  //     onSuccess: () => {
  //       console.log("챌린지 생성 성공!");
  //       setShowModal(true);
  //     },
  //     onError: (error) => {
  //       console.error("에러 발생:", error.message);
  //       alert("챌린지 생성 중 문제가 발생했습니다.");
  //     },
  //   });

  const handleMaxUsersChange = (val) => {
    if (/^\d*$/.test(val)) {
      setMaxUsers(val);
    }
  };

  const handleSubmit = () => {
    if (!Object.values(isValid).every(Boolean)) return;

    // const requestBody = {
    //   title,
    //   field: category.toUpperCase(),
    //   docType: docType === "블로그" ? "BLOG" : "OFFICIAL",
    //   docUrl: link,
    //   deadline: date,
    //   maxParticipants: Number(maxUsers),
    //   content,
    // };

    // mutation.mutate(requestBody);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    router.push("/login");
  };

  return (
    <div className={style.container}>
      <p className={style.title}>신규 챌린지 신청</p>
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
        validate={(val) =>
          /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)(\/[\w-]*)*$/i.test(val)
            ? ""
            : "올바른 링크를 입력하세요"
        }
      />
      <Dropdown label="분야" options={categoryOptions} onSelect={setCategory} />
      <Dropdown
        label="문서 타입"
        options={docTypeOptions}
        onSelect={setDocType}
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
      <div className={style.button}>
        <Button
          type="black"
          text="신청하기"
          onClick={handleSubmit}
          disabled={!Object.values(isValid).every(Boolean)} // mutation.isPending ||
        />
      </div>

      <PopUpModal show={showModal} onHide={handleCloseModal}>
        성공적으로 신청되었습니다!
      </PopUpModal>
    </div>
  );
}

export default CreateChallengeForm;
