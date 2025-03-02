"use client";

import { useEffect, useState } from "react";
import style from "./challengesByAdmin.module.css";
import Card from "@/components/Card/Card";
import Search from "@/components/Search/Search";
import Button from "@/components/Button/Button";
import { useRouter } from "next/navigation";
import api from "@/api/index";
import React from "react";
import { FilterButton } from "@/components/Button/FilterButton";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";

export default function ChallengesAdminPage() {
  const router = useRouter();
  const { isLoggedIn } = useAuth();
  // 검색창에 대한 state값

  // 불러온 데이터 State 변수
  const [challenges, setChallenges] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  // 필터링 관련 상태
  const [selectedDocType, setSelectedDocType] = useState("");
  const [selectedProgress, setSelectedProgress] = useState("");
  const [selectedField, setSelectedField] = useState("");
  const [inputWord, setKeyWord] = useState("");

  // API에서 데이터 가져오는 함수
  const fetchChallenges = async () => {
    try {
      const pageToSend = currentPage < 1 ? 1 : currentPage;

      const response = await api.getChallenges({
        keyword: inputWord || undefined, // 🔥 keyWord -> keyword로 수정 (타이핑 오류)
        docType: selectedDocType || undefined,
        progress: selectedProgress || undefined,
        field: Array.isArray(selectedField)
          ? selectedField.join(",") // 배열을 콤마로 구분된 문자열로 변환
          : selectedField || undefined,
        page: pageToSend,
      });

      setChallenges(response.challenges);
      setTotalPage(Math.max(1, response.totalPages)); // 🔥 페이지 수 업데이트
    } catch (error) {
      console.error("Error fetching challenges:", error);
      if (error.response) {
        console.error("API response error:", error.response.data);
      } else {
        console.error("Error message:", error.message);
      }
    }
  };
  // 페이지 변경 시 데이터 다시 가져오기
  // **이거 맞는지 확인
  useEffect(() => {
    fetchChallenges();
  }, [
    currentPage,
    selectedDocType,
    selectedProgress,
    selectedField,
    inputWord,
  ]);
  // totalPages가 변경될 때 currentPage 조정
  useEffect(() => {
    if (currentPage > totalPage) {
      setCurrentPage(totalPage);
    }
  }, [totalPage]);

  // totalPage 상태를 직접 사용
  const totalPages = Math.max(totalPage, 1);

  // 페이지 변경 핸들러
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const searchChallenges = (inputText) => {
    setKeyWord(inputText); // 검색어 상태 업데이트
    setCurrentPage(1);
  };
  return (
    <>
      <div className={style.container}>
        <header>
          <div className={style.header_head}>
            <h2 className={style.header_title}>챌린지 목록</h2>
          </div>
          <div className={style.header_main}>
            <div className={style.searchWrapper}>
              <FilterButton
                setSelectedField={setSelectedField}
                setDocType={setSelectedDocType}
                setProgress={setSelectedProgress}
                selectedDocType={selectedDocType}
                selectedProgress={selectedProgress}
                selectedField={selectedField}
                onClick={() => {}}
              />
              <Search onSearch={searchChallenges} />
            </div>
          </div>
        </header>

        <main className={style.main}>
          {challenges.map((challenge) => (
            <Link key={challenge.id} href={`/challenges/${challenge.id}`}>
              <Card key={challenge.id} {...challenge} />
            </Link>
          ))}
        </main>

        <footer className={style.footer}>
          {/* 이전 페이지 버튼 */}
          <Button
            type="pageArrow"
            text="<"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          />

          <div className={style.pageNumber}>
            {[...Array(totalPages)].map((_, index) => (
              <Button
                key={index + 1}
                type={`page${
                  currentPage === Number(index + 1) ? "Active" : ""
                }`}
                text={String(index + 1)}
                onClick={() => handlePageChange(index + 1)}
              />
            ))}
          </div>

          {/* 다음 페이지 버튼 */}
          <Button
            type="pageArrow"
            text=">"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          />
        </footer>
      </div>
    </>
  );
}
