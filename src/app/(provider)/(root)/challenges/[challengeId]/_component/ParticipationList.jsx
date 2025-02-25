"use client";
import React from "react";
import styles from "./ParticipateionList.module.css";
import Participation from "./Participation";
import { useQuery } from "@tanstack/react-query";
import api from "@/api";
import { useParams } from "next/navigation";

const ParticipationList = ({
  works: initialWorks,
  currentPage = 1,
  // totalPages = 1,
}) => {
  const params = useParams();
  const challengeId = params.challengeId;
  const { data: worksData } = useQuery({
    queryFn: () => api.getWorks(challengeId),
    queryKey: ["works", { challengeId }],
    initialData: initialWorks,
  });
  const works = worksData.works;
  const totalPages = worksData.totalPage !== 0 ? worksData.totalPage : 1;
  console.log(worksData);
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span>참여 현황</span>
        <span className={styles.pagination}>
          {currentPage} / {totalPages}
        </span>
      </div>
      <div className={styles.list}>
        {works &&
          works.map((work, index) => (
            <Participation key={work.id} work={work} index={index} />
          ))}
      </div>
    </div>
  );
};

export default ParticipationList;
