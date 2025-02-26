"use client";

import { useEffect, useRef, useState } from "react";
import SimpleMDE from "simplemde";
import "simplemde/dist/simplemde.min.css";
import Image from "next/image";
import logo from "@/assets/logo.svg";
import Button from "@/components/Button/Button";
import { LuDoorOpen } from "react-icons/lu";
import styles from "./challengeTask.module.css";
import { useMutation, useQuery } from "@tanstack/react-query";
import api from "@/api";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

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
        spellChecker: false,
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
        <Image src={logo} alt="logo" width={108.95} height={31}></Image>

        <div className={styles.buttonContainer}>
          <Button
            className={styles.exitButton}
            onClick={handleGiveUp}
            text={"포기"}
            type={"red"}
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
            type={"black"}
          />
        </div>
      </div>
      <div className={styles.challengeTitle}>{challenge.title}</div>
      <div className={styles.horizontalLine}></div>
      <div className={styles.editorContainer}>
        <textarea
          ref={textareaRef}
          style={{ display: "none" }} // SimpleMDE가 textarea를 관리하므로 숨김
        ></textarea>
      </div>
    </div>
  );
}

export default ChallengeTask;
