"use client";

import { useState } from "react";
import Header from "@/components/Headers/Header";
import style from "./challenges.module.css";
import Card from "@/components/Card/Card";
import Search from "@/components/Search/Search";
import Button from "@/components/Button/Button";
import { useRouter } from "next/navigation";

const mockData = [
  {
    id: 1,
    date: new Date().toLocaleDateString(),
    title: "점심 같이먹기",
    userCount: 3,
    maxUserCount: 7,
  },
  {
    id: 2,
    date: new Date().toLocaleDateString(),
    title: "저녁 같이먹기",
    userCount: 3,
    maxUserCount: 7,
  },
  {
    id: 3,
    date: new Date().toLocaleDateString(),
    title: "아침 같이먹기",
    userCount: 3,
    maxUserCount: 7,
  },
  {
    id: 4,
    date: new Date().toLocaleDateString(),
    title: "같이 배부르기",
    userCount: 3,
    maxUserCount: 7,
  },
  {
    id: 5,
    date: new Date().toLocaleDateString(),
    title: "같이 배만지기",
    userCount: 2,
    maxUserCount: 6,
  },
  {
    id: 6,
    date: new Date().toLocaleDateString(),
    title: "같이 배고프기",
    userCount: 4,
    maxUserCount: 8,
  },
  {
    id: 7,
    date: new Date().toLocaleDateString(),
    title: "같이 배태우기",
    userCount: 5,
    maxUserCount: 10,
  },
];

const ITEMS_PER_PAGE = 5;

export default function ChallengesPage() {
  const router = useRouter();

  // 5개씩 카드 출력을 위한 State 와 핸들러 함수 구현부
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
