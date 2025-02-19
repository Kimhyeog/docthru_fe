"use client";

import { useEffect, useState } from "react";
import style from "./challenges.module.css";
import Card from "@/components/Card/Card";
import Search from "@/components/Search/Search";
import Button from "@/components/Button/Button";
import { useRouter } from "next/navigation";
import api from "@/api/index";
import React from "react";
import { FilterButton } from "@/components/Button/FilterButton";

export default function ChallengesPage() {
  const router = useRouter();

  // 불러온 데이터 State 변수
  const [challenges, setChallenges] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  // 필터링 관련 상태
  const [selectedDocType, setSelectedDocType] = useState("");
  const [selectedProgress, setSelectedProgress] = useState("");
  const [selectedField, setSelectedField] = useState("");
  // API에서 데이터 가져오는 함수
  const fetchChallenges = async () => {
    try {
      const pageToSend = currentPage < 1 ? 1 : currentPage; // page가 0이 되지 않도록 보장

      const response = await api.getChallenges({
        docType: selectedDocType || undefined,
        progress: selectedProgress || undefined,
        field: Array.isArray(selectedField)
          ? selectedField[0]
          : selectedField || undefined,
        page: pageToSend, // 수정된 page 값 전달
      });

      setChallenges(response.challenges);
      setTotalPage(response.totalPages);
    } catch (error) {
      console.error(
        "Error fetching challenges:",
        error.response ? error.response.data : error.message
      );
    }
  };

  // 페이지 변경 시 데이터 다시 가져오기
  // **이거 맞는지 확인
  useEffect(() => {
    console.log("useEffect triggered", {
      currentPage,
      selectedDocType,
      selectedProgress,
      selectedField,
    });
    fetchChallenges();
  }, [currentPage, selectedDocType, selectedProgress, selectedField]);

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

  return (
    <>
      <div className={style.container}>
        <header>
          <div className={style.header_head}>
            <h2 className={style.header_title}>챌린지 목록</h2>
            <Button
              type="black"
              text="신규 챌린지 신청 +"
              onClick={() => router.push("/challenges/apply")}
            />
          </div>
          <div className={style.header_main}>
            <div className={style.searchWrapper}>
              <FilterButton
                setFiledType={setSelectedField}
                setDocType={setSelectedDocType}
                setProgress={setSelectedProgress}
                onClick={() => {}}
              />
              <Search />
            </div>
          </div>
        </header>

        <main className={style.main}>
          {challenges.map((group) => (
            <Card key={group.id} {...group} />
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
                type={`page${currentPage === index + 1 ? "Active" : ""}`}
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
