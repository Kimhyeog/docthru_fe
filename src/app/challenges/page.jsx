"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Headers/Header";
import style from "./challenges.module.css";
import Card from "@/components/Card/Card";
import Search from "@/components/Search/Search";
import Button from "@/components/Button/Button";
import { useRouter } from "next/navigation";
import api from "@/api/index";
import React from "react";

const ITEMS_PER_PAGE = 5;

export default function ChallengesPage() {
  const router = useRouter();

  //불러온 데이터 State 변수
  const [mockChallenges, setChallenges] = useState([]);

  //Api에서 갖고오는 부분
  const getChallenges = async () => {
    try {
      const response = await api.getChalleges();
      console.log(response); // 응답 데이터 확인
      setChallenges(response.challenges); // 배열만 저장
    } catch (error) {
      console.error("Failed to fetch challenges:", error);
    }
  };
  //Mount 시에만 작동하기
  useEffect(() => {
    getChallenges();
  }, []);

  // 5개씩 카드 출력을 위한 State 와 핸들러 함수 구현부
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(mockChallenges.length / ITEMS_PER_PAGE);
  const paginatedData = mockChallenges.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <>
      <Header />
      <div className={style.container}>
        <header>
          <div className={style.header_head}>
            <h2 className={style.header_title}>챌린지 목록</h2>
            <Button
              type={"black"}
              text={"신규 챌린지 신청 +"}
              onClick={() => router.push("/challenges/apply")}
            />
          </div>
          <div className={style.header_main}>
            <div className={style.searchWrapper}>
              <Search />
            </div>
          </div>
        </header>
        <main className={style.main}>
          {paginatedData.map((group) => (
            <Card key={group.id} {...group} />
          ))}
        </main>
        <footer className={style.footer}>
          <Button
            type={"pageArrow"}
            text={"<"}
            onClick={() => handlePageChange(currentPage - 1)}
          />
          <div className={style.pageNumber}>
            {/* mockData의 Card 데이터 개수에 따라 버튼 개수 출력 구현부 */}
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
