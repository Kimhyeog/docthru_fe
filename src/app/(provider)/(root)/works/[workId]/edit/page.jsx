"use client";

import { useEffect, useRef, useState } from "react";
import SimpleMDE from "simplemde";
import "simplemde/dist/simplemde.min.css";
import Image from "next/image";
import logo from "@/assets/logo.svg";
import Button from "@/components/Button/Button";
import { LuDoorOpen } from "react-icons/lu";
import styles from "./EditWork.module.css";
import { useMutation, useQuery } from "@tanstack/react-query";
import api from "@/api";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import Sidebar from "./sideBar";
import Link from "next/link";
import xIcon from "@/assets/ic_out_circle.svg";
import { useModalStore } from "@/store/useModalStore";
import CheckModal from "@/components/modals/CheckModal";

function WorkEditPage() {
  const textareaRef = useRef(null);
  const simplemdeRef = useRef(null);
  const [content, setContent] = useState("");
  const router = useRouter();
  const params = useParams();
  const workId = params.workId;
  const [showLoad, setShowLoad] = useState(true);

  const { isLoggedIn } = useAuth();
  const { checkModalOn, showModal, closeModal } = useModalStore();

  const { data: work } = useQuery({
    queryFn: () => api.getWork(workId),
    queryKey: ["work", { workId }],
  });

  const challengeId = work?.challengeId;

  useEffect(() => {
    if (work?.description) {
      setContent(work.description);
    }
  }, [work?.description]);

  useEffect(() => {
    if (textareaRef.current) {
      simplemdeRef.current = new SimpleMDE({
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

      if (work?.description) {
        simplemdeRef.current.value(work.description);
      }
      simplemdeRef.current.codemirror.on("change", () => {
        setContent(simplemdeRef.current.value());
      });

      return () => {
        simplemdeRef.current.toTextArea();
      };
    }
  }, [work?.description]);

  const { data: savedData } = useQuery({
    queryFn: () => api.getSavedWork(challengeId),
    queryKey: ["savedWork", { challengeId }],
    enabled: isLoggedIn,
  });

  const { data: challenge } = useQuery({
    queryFn: () => api.getChallenge(challengeId),
    queryKey: ["challenge", { challengeId }],
    enabled: !!challengeId,
  });

  //업데이트로 바꾸기기
  const { mutate: updatework } = useMutation({
    mutationFn: (description) => api.updateWork(workId, description),
    onSuccess: () => {
      router.replace(`/works/${work.id}`);
    },
  });

  // 이거는 그냥 나둬도 될듯?
  const { mutate: saveWork } = useMutation({
    mutationFn: (description) => api.saveWork(challengeId, description),
    onSuccess: () => {
      router.replace(`/works/${work.id}`);
    },
  });

  const handleSave = () => {
    saveWork(content);
  };
  const handleSubmit = () => {
    updatework(content);
  };
  const handleGiveUp = () => {
    router.replace(`/works/${workId}`);
  };

  const handleLoad = () => {
    showModal();
  };
  const handleOnClick = () => {
    if (savedData?.description && simplemdeRef.current) {
      simplemdeRef.current.value(savedData.description);
      setContent(savedData.description);
    }
    setShowLoad(false);
    closeModal();
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
            text={"수정하기"}
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
      {savedData && showLoad && (
        <div className={styles.savedWork}>
          <div className={styles.savedInfo}>
            <Image
              src={xIcon}
              alt="x icon"
              width={24}
              height={24}
              onClick={() => {
                setShowLoad(false);
              }}
              className={styles.xIcon}
            />
            <p>임시 저장된 작엄물이 있어요. 저장된 작업물을 불러오시겠어요??</p>
          </div>
          <Button type={"load"} text={"불러오기"} onClick={handleLoad} />
        </div>
      )}
      <Sidebar width={500}></Sidebar>
      <CheckModal
        text={"이전 작업물을 불러오시겠어요?"}
        show={checkModalOn}
        onHide={closeModal}
        onClick={handleOnClick}
      />
    </div>
  );
}

export default WorkEditPage;
