import React from "react";
import styles from "./ParticipateionList.module.css";

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
          <div key={work.id} className={styles.listItem}>
            <div
              className={`${styles.rank} ${index === 0 ? styles.crown : ""}`}
            >
              {String(index + 1).padStart(2, "0")}
            </div>
            <div className={styles.userInfo}>
              {/* <span className={styles.nickname}>닉네임</span>
              <span className={styles.role}>등급</span> */}
            </div>
            <div className={styles.favorites}>{/* 좋아요수 */}</div>
            <button className={styles.viewWork}>작업물 보기</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ParticipationList;
