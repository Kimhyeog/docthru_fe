import React from "react";
import styles from "./ParticipateionList.module.css";
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
