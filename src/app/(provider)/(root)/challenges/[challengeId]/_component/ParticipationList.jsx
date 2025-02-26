"use client";
import React, { useMemo, useState } from "react";
import styles from "./ParticipateionList.module.css";
import Participation from "./Participation";
import { useQuery } from "@tanstack/react-query";
import api from "@/api";
import { useParams } from "next/navigation";
import Image from "next/image";
import ArrowLeft from "@/assets/ic_arrow_left.svg";
import ArrowRight from "@/assets/ic_arrow_right.svg";

const ParticipationList = ({
  works: initialWorks,
  // currentPage = 1,
  // totalPages = 1,
}) => {
  const params = useParams();
  const challengeId = params.challengeId;
  const [currentPage, setCurrentPage] = useState(1);
  const { data: worksData } = useQuery({
    queryFn: () => api.getWorks(challengeId),
    queryKey: ["works", { challengeId }],
    initialData: initialWorks,
  });
  const itemsPerPage = 5;
  const works = worksData.works;
  const totalPages = worksData.totalPage !== 0 ? worksData.totalPage : 0;
  const currentWorks = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, works.length);
    return works.slice(startIndex, endIndex);
  }, [works, currentPage, itemsPerPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span>참여 현황</span>
        {totalPages > 0 && itemsPerPage && (
          <div className={styles.pagination}>
            <div className={styles.paginationList}>
              <span className={styles.currentPage}>{currentPage}</span>
              <span>/ {totalPages}</span>
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
              }}
              disabled={currentPage === totalPages}
              className={styles.paginationButton}
            >
              <Image src={ArrowRight} alt="Next Page" width={30} height={30} />{" "}
            </button>
          </div>
        )}
      </div>
      <div className={styles.list}>
        {currentWorks.map((work, index) => (
          <Participation
            key={work.id}
            work={work}
            index={index + (currentPage - 1) * itemsPerPage}
          />
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
