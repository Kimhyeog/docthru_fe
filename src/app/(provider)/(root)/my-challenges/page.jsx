"use client";

import style from "./myChallenge.module.css";
import Button from "@/components/Button/Button";
import { useRouter } from "next/navigation";
import Search from "@/components/Search/Search";
import Card from "@/components/Card/Card";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext"; // AuthContext import
import api from "@/api/index";
import React from "react";
import WaitingChallengeItem from "./components/waitingChallengeItem";
import { StatusFilterButton } from "@/components/Button/StatusFilterButton";

const statusText = {
  "승인 대기": "WAITING",
  "신청 거절": "REJECTED",
  "신청 승인": "ACCEPTED",
  "챌린지 삭제": "DELETED",
};

const sortAttendTypeArr = {
  "승인 대기": "WAITING",
  "신청 거절": "REJECTED",
  "신청 승인": "ACCEPTED",
  "신청 시간 빠른순": "appliedAtDsc",
  "신청 시간 느린순": "appliedAtAsc",
  "마감 기한 빠른순": "deadlineDsc",
  "마감 기한 느린순": "deadlineAsc",
};

export default function Page() {
  const router = useRouter();

  const [sortType, setSortType] = useState("ongoing");

  // 신청한 챌린지 필터 Sort State 변수
  const [sortAttendType, setSortAttendType] = useState("승인 대기");

  const [challenges, setChallenges] = useState([]);

  let challenges_no = 1;

  // 로그인 상태 관리 State()
  const { isLoggedIn, isAuthInitialized } = useAuth(); // 로그인 상태 가져오기

  // 페이지 값 State 변수
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(challenges.length / 5);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // 🔒 페이지 접근 제한 로직
  useEffect(() => {
    if (isAuthInitialized && !isLoggedIn) {
      alert("로그인이 필요한 페이지입니다.");
      router.replace("/login");
    }
  }, [isAuthInitialized, isLoggedIn, router]);

  //로그인이 된 상태라면, => 초기의 참여상태의 Challenges렌더링
  useEffect(() => {
    if (isAuthInitialized && isLoggedIn) {
      fetchMyChallenges(sortType);
    }
  }, [isAuthInitialized, isLoggedIn, sortType]);

  useEffect(() => {
    // 현재 페이지가 전체 페이지 수보다 크다면 마지막 페이지로 이동
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [challenges, totalPages, currentPage]);

  const fetchMyChallenges = async (type) => {
    try {
      let data;
      if (type === "application") {
        // 신청한 챌린지의 경우 별도의 API 호출
        data = await api.getApplications(); // 이 부분은 기존의 fetchApplications처럼 동작
      } else {
        // ongoing 또는 completed일 경우 통합된 API 호출
        data = await api.getMyChallenges(type);
      }
      console.log(`${type} 챌린지 데이터:`, data); // 데이터 확인용 출력
      setChallenges(data.challenges); // 챌린지 데이터 설정
    } catch (error) {
      console.error(`${type} 챌린지 조회 실패:`, error); // 에러 출력
    }
  };

  // 버튼 클릭 시 호출할 핸들러
  const handleFetchChallenges = (challengeType) => {
    switch (challengeType) {
      case "ongoing":
        setSortType("ongoing");
        fetchMyChallenges("ongoing");
        break;
      case "completed":
        setSortType("completed");
        fetchMyChallenges("completed");
        break;
      case "application":
        setSortType("application");
        fetchMyChallenges("application"); // 통합된 함수 호출
        break;
      default:
        console.error("유효하지 않은 챌린지 타입:", challengeType);
    }
  };

  return (
    <>
      <div className={style.container}>
        <header className={style.header}>
          <div className={style.header_head}>
            <h2 className={style.header_title}>나의 챌린지</h2>
            <Button
              type={"black"}
              text={"신규 챌린지 신청 +"}
              onClick={() => {
                router.push("/create");
              }}
            />
          </div>
          <div className={style.header_btns}>
            <button
              onClick={() => {
                handleFetchChallenges("ongoing");
              }}
              className={sortType === "ongoing" ? style.active : ""}
            >
              참여중인 챌린지
            </button>
            <button
              onClick={() => {
                handleFetchChallenges("completed");
              }}
              className={sortType === "completed" ? style.active : ""}
            >
              완료한 챌린지
            </button>
            <button
              onClick={() => {
                handleFetchChallenges("application");
              }}
              className={sortType === "application" ? style.active : ""}
            >
              신청한 챌린지
            </button>
          </div>
          <div className={style.header_main}>
            <div className={style.searchWrapper}>
              <Search />{" "}
              {sortType === "application" && (
                <StatusFilterButton
                  setSortAttendType={setSortAttendType}
                  sortAttendType={sortAttendType}
                />
              )}
            </div>
          </div>
        </header>
        <main className={style.main}>
          {sortType === "ongoing" || sortType === "completed" ? (
            challenges.map((challenge) => (
              <Link href={`/challenges/${challenge.id}`} key={challenge.id}>
                <Card {...challenge} />
              </Link>
            ))
          ) : sortType === "application" ? (
            <>
              {/* 헤더 */}
              <div className={style.table_header}>
                <div className={style.cell}>No.</div>
                <div className={style.cell}>분야</div>
                <div className={style.cell}>카테고리</div>
                <div className={style.cell_title}>챌린지 제목</div>
                <div className={style.cell}>모집 인원</div>
                <div className={style.cell}>마감 기한</div>
                <div className={style.cell}>상태</div>
              </div>
              {/* 데이터 목록 */}
              {challenges.map((challenge) => (
                <WaitingChallengeItem
                  key={challenge.id}
                  {...challenge}
                  no={
                    challenges_no < challenges.length
                      ? challenges_no++
                      : challenges_no
                  }
                  application={challenge.application} // 수정된 부분
                />
              ))}
            </>
          ) : null}
        </main>
        <footer className={style.footer}>
          <Button
            type={"page"}
            text={"<"}
            onClick={() => handlePageChange(currentPage - 1)}
          />
          <div className={style.pageNumber}>
            {[...Array(totalPages)].map((_, index) => (
              <Button
                key={index + 1}
                type={
                  "page" +
                  `${currentPage === Number(index + 1) ? "Active" : ""}`
                }
                text={String(index + 1)}
                onClick={() => handlePageChange(index + 1)}
              />
            ))}
          </div>
          <Button
            type={"page"}
            text={">"}
            onClick={() => handlePageChange(currentPage + 1)}
          />
        </footer>
      </div>
    </>
  );
}
