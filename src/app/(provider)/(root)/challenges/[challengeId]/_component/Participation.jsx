"use client";
import React from "react";
import styles from "./ParticipateionList.module.css";
import Image from "next/image";
import Heart from "@/assets/ic_heart.svg";
import Keyboard from "@/assets/ic_keyboard.svg";
import Link from "next/link";
import api from "@/api";
import { useQuery } from "@tanstack/react-query";
import crown from "@/assets/ic_crown.svg";
import Arrowright from "@/assets/ic_arrow_right.svg";

function Participation({ work: initialWork, index }) {
  const workId = initialWork.id;
  const user = initialWork.user;
  const { data: work } = useQuery({
    queryFn: () => api.getWork(workId),
    queryKey: ["work", { workId }],
    initialData: initialWork,
  });

  return (
    <div key={workId} className={styles.listItem}>
      <div className={styles.listItemFirst}>
        <div className={`${styles.rank}`}>
          {index === 0 ? (
            <Image src={crown} alt="crown" width={16} height={16} />
          ) : null}
          {String(index + 1).padStart(2, "0")}
        </div>
        <div className={styles.userInfoContainer}>
          <Image src={Keyboard} alt="user icon" width={24} height={24}></Image>
          <div className={styles.uerInfo}>
            <span className={styles.nickname}>{user.nickname}</span>
            <span className={styles.role}>
              {user.grade === "GENERAL" ? "전문가" : "일반"}
            </span>
          </div>
        </div>
      </div>
      <div className={styles.listItemSecond}>
        <div className={styles.favoriteContainer}>
          <Image src={Heart} alt="heart" width={16} height={16}></Image>
          <div className={styles.favorites}>{work.likeCount}</div>
        </div>
        <Link href={`/works/${workId}`} className={styles.viewWork}>
          작업물 보기
          <Image src={Arrowright} alt="더보기" width={20} height={20}></Image>
        </Link>
      </div>
    </div>
  );
}

export default Participation;
