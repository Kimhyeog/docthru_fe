"use client";

import { useEffect, useRef, useState } from "react";
import SimpleMDE from "simplemde";
import "simplemde/dist/simplemde.min.css";
import Image from "next/image";
import logo from "@/assets/logo.svg";
import Button from "@/components/Button/Button";
import { LuDoorOpen } from "react-icons/lu";
import styles from "./challengeTask.module.css";
import Sidebar from "./sideBar";

function ChallengeTask() {
  const textareaRef = useRef(null);
  const [content, setContent] = useState("");

  useEffect(() => {
    if (textareaRef.current) {
      const simplemde = new SimpleMDE({
        element: textareaRef.current,
        toolbar: [
          "bold",
          "italic",
          "heading",
          "|",
          "quote",
          "unordered-list",
          "ordered-list",
          "|",
          "link",
        ],
        placeholder: "번역 내용을 적어주세요",
        status: false,
      });

      simplemde.value(content);

      simplemde.codemirror.on("change", () => {
        setContent(simplemde.value());
      });

      return () => {
        simplemde.toTextArea().value = "";
        simplemde = null;
      };
    }
  }, []);

  const handleSave = () => {
    console.log("제출하기:", content);
  };

  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <Image src={logo} alt="logo" width={108.95} height={31}></Image>

        <div className={styles.buttonContainer}>
          <Button
            className={styles.exitButton}
            onClick={handleSave}
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
            onClick={handleSave}
            text={"제출하기"}
          />
        </div>
      </div>
      <div className={styles.challengeTitle}>타이틀 들어갈 자리</div>
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
