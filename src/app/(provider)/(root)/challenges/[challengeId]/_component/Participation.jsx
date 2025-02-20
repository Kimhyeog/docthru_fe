import React, { use } from "react";
import styles from "./ParticipateionList.module.css";
import Image from "next/image";
import Heart from "@/assets/ic_heart.svg";
import Keyboard from "@/assets/ic_keyboard.svg";
import Link from "next/link";
import api from "@/api";

async function Participation({ work, index }) {
  const workId = work.id;
  const userId = work.userId;
  const user = await api.getUserData(userId);
  console.log(work);
  return (
    <div key={workId} className={styles.listItem}>
      <div className={`${styles.rank} ${index === 0 ? styles.crown : ""}`}>
        {String(index + 1).padStart(2, "0")}
      </div>
      <div className={styles.userInfo}>
        <Image src={Keyboard} alt="user icon" width={16} height={16}></Image>
        <span className={styles.nickname}>{user.nickname}</span>
        <span className={styles.role}>
          {user.grade === "GENERAL" ? "전문가" : "일반"}
        </span>
      </div>
      <div className={styles.favoriteContainer}>
        <Image src={Heart} alt="heart" width={16} height={16}></Image>
        <div className={styles.favorites}>{work.likeCount}</div>
      </div>
      <Link href={`/works/${workId}`} className={styles.viewWork}>
        작업물 보기
      </Link>
    </div>
  );
}

export default Participation;
