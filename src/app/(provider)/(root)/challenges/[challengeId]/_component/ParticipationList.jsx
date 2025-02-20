import React from "react";
import Image from "next/image";
import styles from "./ParticipateionList.module.css";
import Heart from "@/assets/ic_heart.svg";
import Keyboard from "@/assets/ic_keyboard.svg";
import Participation from "./Participation";

const ParticipationList = ({ works, currentPage = 1, totalPages = 1 }) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span>참여 현황</span>
        <span className={styles.pagination}>
          {currentPage} / {totalPages}
        </span>
      </div>
      <div className={styles.list}>
        {works.map((work, index) => (
          <Participation key={work.id} work={work} index={index} />
        ))}
      </div>
    </div>
  );
};

export default ParticipationList;
