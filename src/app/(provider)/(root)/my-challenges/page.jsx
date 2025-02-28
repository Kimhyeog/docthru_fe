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
  "신청 시간 빠른순": "ApplyDeadlineDesc",
  "신청 시간 느린순": "ApplyDeadlineAsc",
  "마감 기한 빠른순": "DeadlineDesc",
  "마감 기한 느린순": "DeadlineAsc",
};

export default function Page() {
  const router = useRouter();

  const [sortType, setSortType] = useState("ongoing");

  // 검색창 State 변수수
  const [searchInput, setSearchInput] = useState("");

  // 신청한 챌린지 필터 Sort State 변수
  const [sortAttendType, setSortAttendType] = useState("신청 시간 빠른순");

  const [challenges, setChallenges] = useState([]);

  let challenges_no = 1;

  const [itemSize, setItemSize] = useState(5);

  // 로그인 상태 관리 State()
  const { isLoggedIn, isAuthInitialized } = useAuth(); // 로그인 상태 가져오기

  // 페이지 값 State 변수
  const [currentPage, setCurrentPage] = useState(1);

  const [totalPages, setTotalPages] = useState(1); // ✅ totalPages 상태 추가

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

  // sortAttendType 변경 시 데이터를 다시 가져오는 useEffect 추가
  useEffect(() => {
    if (sortType === "application" && isAuthInitialized && isLoggedIn) {
      fetchMyChallenges(sortType);
    }
  }, [sortAttendType, sortType, isAuthInitialized, isLoggedIn]);

  // 🔍 searchInput이 변경될 때마다 fetch
  useEffect(() => {
    // sortType이 application일 때만 검색
    if (isAuthInitialized && isLoggedIn) {
      fetchMyChallenges(sortType);
    }
  }, [searchInput, sortType, isAuthInitialized, isLoggedIn]);

  // api에서 데이터 fetch하는 코드:
  const fetchMyChallenges = async (type) => {
    try {
      let data;
      if (type === "application") {
        data = await api.getApplications(
          sortAttendTypeArr[sortAttendType],
          itemSize, // ✅ pageSize
          searchInput || undefined,
          currentPage // ✅ 현재 페이지 적용
        );
      } else {
        data = await api.getMyChallenges(type, searchInput || undefined);
      }

      // ✅ 응답 데이터가 비어 있을 경우 안전 처리
      const challengesList = Array.isArray(data.challenges)
        ? data.challenges
        : [];
      setChallenges(challengesList);

      // ✅ totalCount가 존재하지 않을 경우 안전한 기본값(0) 적용
      const totalCount = data.totalCount ?? 0;
      setTotalPages(totalCount > 0 ? Math.ceil(totalCount / itemSize) : 1);
    } catch (error) {
      console.error(`${type} 챌린지 조회 실패:`, error);

      // ✅ 오류 발생 시 안전한 초기값 적용
      setChallenges([]);
      setTotalPages(1);
    }
  };

  // ✅ useEffect에서 currentPage 변경 감지하여 fetch 실행
  useEffect(() => {
    if (isAuthInitialized && isLoggedIn) {
      fetchMyChallenges(sortType);
    }
  }, [currentPage, sortType, isAuthInitialized, isLoggedIn]);

  useEffect(() => {
    if (isAuthInitialized && isLoggedIn) {
      fetchMyChallenges(sortType);
    }
  }, [itemSize, sortType, isAuthInitialized, isLoggedIn]);

  // 버튼 클릭 시 호출할 핸들러
  const handleFetchChallenges = (challengeType) => {
    switch (challengeType) {
      case "ongoing":
        setSortType("ongoing");
        setItemSize(5);
        fetchMyChallenges("ongoing");
        break;
      case "completed":
        setSortType("completed");
        setItemSize(5);
        fetchMyChallenges("completed");
        break;
      case "application":
        setSortType("application");
        setItemSize(10);
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
              className={sortType === "ongoing" ? style.active : style.inactive}
            >
              참여중인 챌린지
            </button>
            <button
              onClick={() => {
                handleFetchChallenges("completed");
              }}
              className={
                sortType === "completed" ? style.active : style.inactive
              }
            >
              완료한 챌린지
            </button>
            <button
              onClick={() => {
                handleFetchChallenges("application");
              }}
              className={
                sortType === "application" ? style.active : style.inactive
              }
            >
              신청한 챌린지
            </button>
          </div>
          <div className={style.header_main}>
            <div className={style.searchWrapper}>
              <Search onSearch={setSearchInput} />{" "}
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
            <div className={style.cardContainer}>
              {challenges.map((challenge) => (
                <Link href={`/challenges/${challenge.id}`} key={challenge.id}>
                  <Card {...challenge} />
                </Link>
              ))}
            </div>
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
              {challenges.map((challenge) => {
                // challenge.application이 존재하는지 확인
                const applicationStatus = challenge.application
                  ? challenge.application.status
                  : null;

                const challengeNo =
                  challenges_no < challenges.length
                    ? (currentPage - 1) * 10 + challenges_no++
                    : (currentPage - 1) * 10 + challenges_no;

                const challengeItem = (
                  <WaitingChallengeItem
                    key={challenge.id}
                    {...challenge}
                    no={challengeNo}
                    application={challenge.application}
                  />
                );

                if (
                  applicationStatus === "DELETED" ||
                  applicationStatus === "REJECTED" ||
                  applicationStatus === "WAITING"
                ) {
                  return (
                    <Link
                      key={challenge.id}
                      href={`/my-challenges/${challenge.id}`}
                    >
                      {challengeItem}
                    </Link>
                  );
                }

                return challengeItem;
              })}
            </>
          ) : null}
        </main>
        <footer className={style.footer}>
          <Button
            type={"pageArrow"}
            text={"<"}
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          />
          <div className={style.pageNumber}>
            {[...Array(totalPages)].map((_, index) => (
              <Button
                key={index + 1}
                type={`page${currentPage === index + 1 ? "Active" : ""}`} // ✅ 수정
                text={String(index + 1)}
                onClick={() => handlePageChange(index + 1)}
              />
            ))}
          </div>
          <Button
            type={"pageArrow"}
            text={">"}
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage >= totalPages} // ✅ 수정
          />
        </footer>
      </div>
    </>
  );
}
