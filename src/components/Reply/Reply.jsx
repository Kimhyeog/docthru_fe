"use client";
import styles from "./Reply.module.css";
import Image from "next/image";
import keyboardIcon from "@/assets/ic_keyboard.svg";
import dayjs from "dayjs";
import { useAuth } from "@/contexts/AuthContext";
import DropdownMenuForFeedback from "@/app/(provider)/(root)/works/[workId]/_components/DropdownMenuForFeedback";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "@/api";
import { useParams } from "next/navigation";
import Button from "../Button/Button";

const Reply = ({
  username,
  date,
  content,
  isMyFeedback,
  feedbackId,
  challenge: initialChallenge,
  isAdmin,
}) => {
  const queryClient = useQueryClient();
  const { isLoggedIn } = useAuth();
  const [edit, setEdit] = useState(false);
  const [updatedFeedback, setUpdateFeedback] = useState(content);
  const params = useParams();
  const workId = params.workId;
  const challengeId = initialChallenge.id;

  const { mutate: updateFeedback } = useMutation({
    mutationFn: (updatedFeedback) =>
      api.updateFeedback(feedbackId, updatedFeedback),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["feedbacks", { workId }],
      }),
  });

  const { data: challenge } = useQuery({
    queryFn: () => api.getChallenge(challengeId),
    queryKey: ["challenge", { challengeId }],
    initialData: initialChallenge,
  });
  const progress = challenge.progress;

  const handlebuttonclick = () => {
    updateFeedback(updatedFeedback);
    setEdit(false);
  };

  const handleCancelButton = () => {
    setEdit(false);
    setUpdateFeedback(content);
  };

  return (
    <div className={styles.replyContainer}>
      <div className={styles.replyContent}>
        <Image
          src={keyboardIcon}
          alt="User Avatar"
          width={32}
          height={32}
          className={styles.keyboardIcon}
        />
        <div className={styles.header}>
          <div className={styles.userAndDate}>
            <span className={styles.username}>{username ? username : ""}</span>
            <span className={styles.date}>
              {date ? dayjs(date).format("YY/MM/DD HH:mm") : ""}
            </span>
          </div>
          <div>
            {(isAdmin || (progress !== "COMPLETED" && isMyFeedback)) &&
              isLoggedIn && (
                <DropdownMenuForFeedback
                  feedbackId={feedbackId}
                  onEdit={() => setEdit(true)}
                />
              )}
          </div>
        </div>
      </div>
      {edit ? (
        <div className={styles.textContainer}>
          <textarea
            className={styles.textarea}
            value={updatedFeedback}
            onChange={(e) => setUpdateFeedback(e.target.value)}
          />
          <div className={styles.buttons}>
            <Button text={"취소"} onClick={handleCancelButton} width={60}>
              취소
            </Button>
            <Button
              type={"customBlack"}
              text={"수정"}
              onClick={handlebuttonclick}
              width={60}
            >
              수정
            </Button>
          </div>
        </div>
      ) : (
        <p className={styles.comment}>{content ? content : ""}</p>
      )}
    </div>
  );
};

export default Reply;
