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

const mockData = [
  {
    id: 1,
    date: new Date().toLocaleDateString(),
    title: "점심 같이먹기",
    userCount: 3,
    maxUserCount: 7,
  },
];

const ITEMS_PER_PAGE = 5;

export default function Page() {
  const router = useRouter();

  const [sortType, setSortType] = useState("ongoing");

  const [challenges, setChallenges] = useState([]);

  // 로그인 상태 관리 State()
  const { isLoggedIn, isAuthInitialized } = useAuth(); // 로그인 상태 가져오기

  // 페이지 값 State 변수
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(mockData.length / ITEMS_PER_PAGE);
  const paginatedData = mockData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

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

  // sortType 변경 시 해당 챌린지 데이터를 가져옴
  useEffect(() => {
    fetchMyChallenges(sortType);
  }, [setSortType]); // ✅ sortType 변경 시마다 실행

  const fetchMyChallenges = async (type) => {
    try {
      const data = await api.getMyChallenges(type); // 통합된 API 함수 호출
      console.log(`${type} 챌린지 데이터:`, data); // 데이터 확인용 출력
      setChallenges(data.challenges);
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
        fetchMyChallenges("application");
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
              <Search />
            </div>
          </div>
        </header>
        <main className={style.main}>
          {challenges.map((challenge) => (
            <Link href={`/challenges/${challenge.id}`} key={challenge.id}>
              <Card {...challenge} />
            </Link>
          ))}
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
