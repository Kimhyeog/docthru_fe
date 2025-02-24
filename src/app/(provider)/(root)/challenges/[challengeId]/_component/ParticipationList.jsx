"use client";

import React, { useMemo, useState } from "react";
import styles from "./ParticipateionList.module.css";
import Participation from "./Participation";
import Image from "next/image";
import ArrowLeft from "@/assets/ic_arrow_left.svg";
import ArrowRight from "@/assets/ic_arrow_right.svg";

const ParticipationList = ({ works }) => {
  const itemsPerPage = 3;
  const [currentPage, setCurrentPage] = useState(1);

  const calculatedTotalPages = useMemo(() => {
    return Math.ceil(works.length / itemsPerPage);
  }, [works, itemsPerPage]);

  const currentWorks = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, works.length); // Prevent overflow
    return works.slice(startIndex, endIndex);
  }, [works, currentPage, itemsPerPage]);

  const handlePageChange = (pageNumber) => {
    console.log("pageNumber:", pageNumber); // 추가
    setCurrentPage(pageNumber);
    console.log("currentPage:", currentPage); // 추가
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span>참여 현황</span>
        {works.length > itemsPerPage && (
          <div className={styles.pagination}>
            <div className={styles.paginationList}>
              <span className={styles.currentPage}>{currentPage}</span>
              <span>/ {calculatedTotalPages}</span>
            </div>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={styles.paginationButton}
            >
              <Image
                src={ArrowLeft}
                alt="Previous Page"
                width={32}
                height={32}
              />
            </button>

            <button
              onClick={() => {
                handlePageChange(currentPage + 1);
                console.log("Next page button clicked"); // 추가
              }}
              disabled={currentPage === calculatedTotalPages}
              className={styles.paginationButton}
            >
              <Image src={ArrowRight} alt="Next Page" width={30} height={30} />{" "}
            </button>
          </div>
        )}
      </div>
      <div className={styles.list}>
        {currentWorks.map((work, index) => (
          <Participation key={work.id} work={work} index={index} />
        ))}
      </div>
      {works.length === 0 && (
        <div className={styles.noPaticipants}>
          아직 참여한 도전자가 없어요,
          <br /> 지금 바로 도전해 보세요!
        </div>
      )}
    </div>
  );
};

export default ParticipationList;
