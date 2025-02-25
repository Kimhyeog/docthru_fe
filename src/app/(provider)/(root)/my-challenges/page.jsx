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
  const [sortAttendType, setSortAttendType] = useState("승인 대기");

  const [challenges, setChallenges] = useState([]);

  let challenges_no = 1;

  const [itemsSize, setItemSize] = useState(5);

  // 로그인 상태 관리 State()
  const { isLoggedIn, isAuthInitialized } = useAuth(); // 로그인 상태 가져오기

  // 페이지 값 State 변수
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(challenges.length / itemsSize);

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
  // api에서 데이터 fetch하는 코드:
  const fetchMyChallenges = async (type) => {
    try {
      let data;
      if (type === "application") {
        if (searchInput === "") {
          // 신청한 챌린지의 경우 별도의 API 호출
          data = await api.getApplications(
            `${sortAttendTypeArr[sortAttendType]}`
          ); // 매개변수 수정
        } else {
          data = await api.getApplications(
            `${sortAttendTypeArr[sortAttendType]}`,
            10,
            searchInput
          );
        }
      } else {
        // ongoing 또는 completed일 경우 통합된 API 호출
        if (searchInput === "") {
          data = await api.getMyChallenges(type); // keyword 없이 호출
        } else {
          data = await api.getMyChallenges(type, searchInput); // keyword 포함하여 호출
        }
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

  console.log(`검색창의 내용 : ${searchInput}`);
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
            type={"pageArrow"}
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
            type={"pageArrow"}
            text={">"}
            onClick={() => handlePageChange(currentPage + 1)}
          />
        </footer>
      </div>
    </>
  );
}
