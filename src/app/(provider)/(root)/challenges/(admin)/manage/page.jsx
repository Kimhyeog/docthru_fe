"use client";
import Search from "@/components/Search/Search";
import style from "./challengesManage.module.css";
import { useAuth } from "@/contexts/AuthContext";
import { useState, useEffect, useCallback } from "react";
import { StatusFilterButton } from "@/components/Button/StatusFilterButton";
import Link from "next/link";
import Button from "@/components/Button/Button";
import api from "@/api/index";
import pageRightActive from "@/assets/ic_page_right_active.svg";
import pageLeft from "@/assets/ic_page_left.svg";
import Image from "next/image";
import WaitingChallengeItem from "../../../my-challenges/_components/waitingChallengeItem";

const sortAttendTypeArr = {
  "승인 대기": "WAITING",
  "신청 거절": "REJECTED",
  "신청 승인": "ACCEPTED",
  "신청 시간 빠른순": "ApplyDeadlineDesc",
  "신청 시간 느린순": "ApplyDeadlineAsc",
  "마감 기한 빠른순": "DeadlineDesc",
  "마감 기한 느린순": "DeadlineAsc",
};

export default function AdminManagePage() {
  const [searchInput, setSearchInput] = useState("");
  const [sortAttendType, setSortAttendType] = useState("신청 시간 빠른순");
  const [challenges, setChallenges] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { isLoggedIn, isAuthInitialized } = useAuth();

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const fetchMyChallenges = useCallback(async () => {
    if (!isAuthInitialized || !isLoggedIn) return;
    try {
      const response = await api.getApplicationsByAdmin(
        sortAttendTypeArr[sortAttendType],
        10,
        searchInput,
        currentPage
      );
      setChallenges(response.challenges || []);
      setTotalPages(Math.ceil((response.totalCount || 1) / 10));
    } catch (error) {
      console.error("챌린지 조회 실패:", error);
      setChallenges([]);
      setTotalPages(1);
    }
  }, [isAuthInitialized, isLoggedIn, sortAttendType, searchInput, currentPage]);

  useEffect(() => {
    fetchMyChallenges();
  }, [fetchMyChallenges]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchInput]);

  return (
    <div className={style.container}>
      <header className={style.header}>
        <div className={style.header_head}>
          <h2 className={style.header_title}>챌린지 신청 관리</h2>
        </div>
        <div className={style.header_main}>
          <div className={style.searchWrapper}>
            <Search onSearch={setSearchInput} />
            <StatusFilterButton
              setSortAttendType={setSortAttendType}
              sortAttendType={sortAttendType}
            />
          </div>
        </div>
      </header>
      <main className={style.main}>
        <div className={style.table_header}>
          <div className={style.cell}>No.</div>
          <div className={style.cell}>분야</div>
          <div className={style.cell}>카테고리</div>
          <div className={style.cell_title}>챌린지 제목</div>
          <div className={style.cell}>모집 인원</div>
          <div className={style.cell}>마감 기한</div>
          <div className={style.cell}>상태</div>
        </div>
        {challenges.map((challenge, index) => {
          const applicationStatus = challenge.application?.status;
          const challengeNo = (currentPage - 1) * 10 + index + 1;
          const challengeItem = (
            <WaitingChallengeItem
              key={challenge.id}
              {...challenge}
              no={challengeNo}
              application={challenge.application}
            />
          );
          return applicationStatus === "DELETED" ||
            applicationStatus === "REJECTED" ||
            applicationStatus === "WAITING" ? (
            <Link
              key={challenge.id}
              href={`/challenges/manage/${challenge.id}`}
            >
              {challengeItem}
            </Link>
          ) : (
            challengeItem
          );
        })}
      </main>
      <footer className={style.footer}>
        <Button
          type="none"
          icon={
            <Image src={pageLeft} alt="page left icon" width={40} height={40} />
          }
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        />
        <div className={style.pageNumber}>
          {totalPages > 1 &&
            Array.from({ length: totalPages }, (_, index) => (
              <Button
                key={index + 1}
                type={currentPage === index + 1 ? "pageActive" : "pageInactive"}
                text={String(index + 1)}
                onClick={() => handlePageChange(index + 1)}
                width={40}
                height={40}
              />
            ))}
        </div>
        <Button
          type="none"
          icon={
            <Image
              src={pageRightActive}
              alt="page right icon"
              width={40}
              height={40}
            />
          }
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
        />
      </footer>
    </div>
  );
}
