"use client";
import React from "react";
import dayjs from "dayjs";
import Image from "next/image";
import Keyboard from "@/assets/ic_keyboard.svg";
import heart from "@/assets/ic_heart.svg";
import heartEmpty from "@/assets/ic_heart_empty.svg";
import styles from "./BestWork.module.css";

function BestWork({ work, user }) {
  return (
    <div className={styles.container}>
      <div className={styles.header}>최다 추천 번역</div>
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
      <div>{work.description}</div>
    </div>
  );
}

export default BestWork;
