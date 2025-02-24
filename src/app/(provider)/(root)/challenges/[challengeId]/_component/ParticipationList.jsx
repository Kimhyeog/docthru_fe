import React from "react";
import styles from "./ParticipateionList.module.css";
import Participation from "./Participation";

const ParticipationList = ({ works, currentPage = 1, totalPages = 1 }) => {
  const showPagenation = works && works.length > 5;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span>참여 현황</span>
        {showPagenation && (
          <span className={styles.pagination}>
            {currentPage} / {totalPages}
          </span>
        )}
      </div>
      <div className={styles.list}>
        {works.map((work, index) => (
          <Participation key={work.id} work={work} index={index} />
        ))}
      </div>

      {/* 참여 현황 없을때 */}
      {works && works.length === 0 ? (
        <div
          className={styles.noPaticipants}
          aria-label="아직 참여한 도전자가 없어요."
        >
          아직 참여한 도전자가 없어요,
          <br /> 지금 바로 도전해 보세요!
        </div>
      ) : null}
    </div>
  );
};

export default ParticipationList;
