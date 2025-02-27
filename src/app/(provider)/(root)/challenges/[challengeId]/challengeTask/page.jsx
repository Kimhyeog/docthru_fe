"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./challengeTask.module.css";
import SimpleMDE from "simplemde";
import "simplemde/dist/simplemde.min.css";
import Image from "next/image";
import logo from "@/assets/logo.svg";
import Button from "@/components/Button/Button";
import { LuDoorOpen } from "react-icons/lu";
import { useMutation, useQuery } from "@tanstack/react-query";
import api from "@/api";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import Sidebar from "./sideBar";
import Link from "next/link";

function ChallengeTask() {
  const textareaRef = useRef(null);
  const [content, setContent] = useState("");
  const router = useRouter();
  const params = useParams();
  const challengeId = params.challengeId;

  const { isLoggedIn } = useAuth();

  useEffect(() => {
    if (textareaRef.current) {
      const simplemde = new SimpleMDE({
        element: textareaRef.current,

        // 툴바 설정부분
        toolbar: [
          {
            name: "bold",
            action: SimpleMDE.toggleBold,
            className: "fa fa-bold",
            title: "Bold",
          },
          // 커스텀 방법
          // {
          //   name: "custom",
          //   action: function customFunction(editor) {
          //     // Add your own code
          //   },
          //   className: "fa fa-star",
          //   title: "Custom Button",
          // },

          {
            name: "italic",
            action: SimpleMDE.toggleItalic,
            className: "fa fa-italic",
            title: "기울임",
          },
          {
            name: "underline",
            action: function (editor) {
              editor.codemirror.execCommand("underline");
            },
            className: "fa fa-underline",
            title: "밑줄",
          },

          {
            name: "alignLeft",
            action: function (editor) {
              const selectedText = editor.codemirror.getSelection();
              const alignedText = `<div style="text-align: left;">${selectedText}</div>`;
              editor.codemirror.replaceSelection(alignedText);
            },
            className: "fa fa-align-left",
            title: "왼쪽 정렬",
          },
          {
            name: "alignCenter",
            action: function (editor) {
              const selectedText = editor.codemirror.getSelection();
              const alignedText = `<div style="text-align: center;">${selectedText}</div>`;
              editor.codemirror.replaceSelection(alignedText);
            },
            className: "fa fa-align-center",
            title: "가운데 정렬",
          },
          {
            name: "alignRight",
            action: function (editor) {
              const selectedText = editor.codemirror.getSelection();
              const alignedText = `<div style="text-align: right;">${selectedText}</div>`;
              editor.codemirror.replaceSelection(alignedText);
            },
            className: "fa fa-align-right",
            title: "오른쪽 정렬",
          },

          {
            name: "bullet",
            action: function (editor) {
              editor.toggleUnorderedList();
            },
            className: "fa fa-list-ul",
            title: "글머리 기호",
          },
          {
            name: "numbering",
            action: function (editor) {
              editor.toggleOrderedList();
            },
            className: "fa fa-list-ol",
            title: "번호 매기기",
          },

          {
            name: "coloring", // 컬러 바꾸게 하는건데 이거 뭐 파렛트 넣고해야하는거?!
            action: function (editor) {},
            className: "fa fa-paint-brush",
            title: "색상 변경",
          },
        ],

        //옵션 설정부분
        placeholder: "번역 내용을 적어주세요",
        status: false, // 하단 상태바 없애기
        spellChecker: false, // 멎춤법 검사기능 없애기
      });

      simplemde.value(content);

      simplemde.codemirror.on("change", () => {
        setContent(simplemde.value());
      });

      return () => {
        simplemde.toTextArea();
      };
    }
  }, []);

  const { data: savedData } = useQuery({
    queryFn: () => api.getSavedWork(challengeId),
    queryKey: ["savedWork", { challengeId }],
    enabled: isLoggedIn,
  });

  const { data: challenge } = useQuery({
    queryFn: () => api.getChallenge(challengeId),
    queryKey: ["challenge", { challengeId }],
  });

  const { mutate: createWork } = useMutation({
    mutationFn: (description) => api.createWork(challengeId, description),
    onSuccess: (data) => {
      router.replace(`/works/${data.id}`);
    },
  });

  const { mutate: saveWork } = useMutation({
    mutationFn: (description) => api.saveWork(challengeId, description),
    onSuccess: () => {
      router.replace(`/challenges/${challengeId}`);
    },
  });

  const { mutate: giveUp } = useMutation({
    mutationFn: () => api.deleteParticipate(challengeId),
    onSuccess: () => {
      router.replace(`/challenges/${challengeId}`);
    },
  });

  const handleSave = () => {
    saveWork(content);
    console.log("임시 저장:", content);
  };
  const handleSubmit = () => {
    console.log("제출 하기:", content);
    createWork(content);
  };
  const handleGiveUp = () => {
    console.log("포기 하기", content);
    giveUp();
  };

  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <Link href={"./"}>
          <Image src={logo} alt="logo" width={108.95} height={31}></Image>
        </Link>

        <div className={styles.buttonContainer}>
          <Button
            className={styles.exitButton}
            onClick={handleGiveUp}
            text={"포기"}
            icon={<LuDoorOpen />}
          />
          <Button
            className={styles.saveDraftButton}
            onClick={handleSave}
            text={"임시저장"}
          />
          <Button
            className={styles.submitButton}
            onClick={handleSubmit}
            text={"제출하기"}
          />
        </div>
      </div>
      <div className={styles.challengeTitle}>{challenge?.title}</div>
      <div className={styles.horizontalLine}></div>
      <div className={styles.editorContainer}>
        <textarea
          ref={textareaRef}
          style={{ display: "none" }} // SimpleMDE가 textarea를 관리하므로 숨김
        ></textarea>
      </div>
      <Sidebar width={500}></Sidebar>
    </div>
  );
}

export default ChallengeTask;
