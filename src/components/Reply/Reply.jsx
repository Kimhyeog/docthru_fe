"use client";
import styles from "./Reply.module.css";
import Image from "next/image";
import keyboardIcon from "@/assets/ic_keyboard.svg";
import { EllipsisVertical } from "lucide-react";
import dayjs from "dayjs";

const Reply = ({ username, date, content }) => {
  const handleMoreOptionsClick = () => {
    // 더보기 버튼 클릭 시
  };
  return (
    <div className={styles.replyContainer}>
      <Image
        src={keyboardIcon}
        alt="User Avatar"
        width={40}
        height={40}
        className={styles.keyboardIcon}
      />
      <div className={styles.replyContent}>
        <div className={styles.header}>
          <div className={styles.userAndDate}>
            <span className={styles.username}>{username ? username : ""}</span>
            <span className={styles.date}>
              {date ? dayjs(date).format("YY/MM/DD HH:mm") : ""}
            </span>
          </div>
          <button
            className={styles.moreOptions}
            onClick={handleMoreOptionsClick}
            aria-label="moreOptions"
          >
            <EllipsisVertical />
          </button>
        </div>
        <p className={styles.comment}>{content ? content : ""}</p>
      </div>
    </div>
  );
};

export default Reply;
