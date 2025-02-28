"use client";
import React, { useEffect, useRef, useState } from "react";
import dayjs from "dayjs";
import Image from "next/image";
import Keyboard from "@/assets/ic_keyboard.svg";
import heart from "@/assets/ic_heart.svg";
import heartEmpty from "@/assets/ic_heart_empty.svg";
import styles from "./BestWork.module.css";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import showMoreIcon from "@/assets/ic_show_more.svg";
import showLessIcon from "@/assets/ic_show_less.svg";
import medal from "@/assets/ic_medal.svg";

function BestWork({ work, user }) {
  const [showText, setShowText] = useState(false);

  const [isOverflowing, setIsOverflowing] = useState(false);
  const descriptionRef = useRef(null);

  useEffect(() => {
    if (descriptionRef.current) {
      const { scrollHeight, clientHeight } = descriptionRef.current;
      setIsOverflowing(scrollHeight > clientHeight);
      console.log(scrollHeight, clientHeight);
    }
  }, [work.description]);

  return (
    <div
      className={`${styles.container} ${
        showText ? styles.fullText : styles.shortText
      }`}
    >
      <div className={styles.header}>
        <Image src={medal} alt="medal" width={16} height={16} />
        <div>최다 추천 번역</div>
      </div>
      <div className={styles.userContainer}>
        <div className={styles.userHeader}>
          <div className={styles.userInfo}>
            <Image
              src={Keyboard}
              alt="user icon"
              width={24}
              height={24}
            ></Image>
            <span className={styles.nickname}>{user.nickname} </span>
            <span className={styles.grade}>
              {user.grade === "GENERAL" ? "일반" : "전문가"}
            </span>
          </div>
          <div className={styles.favorite}>
            {work.like ? (
              <Image src={heart} alt="heart" width={24} height={24} />
            ) : (
              <Image src={heartEmpty} alt="heartEmpty" width={24} height={24} />
            )}

            <span className={styles.nickname}>{work.likeCount}</span>
          </div>
        </div>
        <span className={styles.date}>
          {dayjs(work.lastModifiedAt).format("YY/MM/DD hh:mm")}
        </span>
      </div>
      <hr className={styles.separator} />
      <div
        className={`${styles.description} ${
          isOverflowing && !showText && styles.collapsed
        }`}
        ref={descriptionRef}
      >
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {work.description}
        </ReactMarkdown>
      </div>
      {isOverflowing && (
        <div
          className={styles.button}
          onClick={() => setShowText((prev) => !prev)}
        >
          {showText ? "접기" : "더보기"}
          {showText ? (
            <Image
              src={showLessIcon}
              alt="show less icon"
              width={24}
              height={24}
            />
          ) : (
            <Image
              src={showMoreIcon}
              alt="show less icon"
              width={24}
              height={24}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default BestWork;
