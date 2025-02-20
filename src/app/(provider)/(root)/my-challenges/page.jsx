"use client";

import style from "./myChallenge.module.css";
import Button from "@/components/Button/Button";
import { useRouter } from "next/navigation";
import Search from "@/components/Search/Search";
import Card from "@/components/Card/Card";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext"; // AuthContext import

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
  const { isLoggedIn, isAuthInitialized } = useAuth(); // 로그인 상태 가져오기
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

  // 🔒 초기화 전에는 아무것도 렌더링하지 않음
  if (!isAuthInitialized) return null;

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
            <button>참여중인 챌린지</button>
            <button>완료한 챌린지</button>
            <button>신청한 챌린지</button>
          </div>
          <div className={style.header_main}>
            <div className={style.searchWrapper}>
              <Search />
            </div>
          </div>
        </header>
        <main className={style.main}>
          {paginatedData.map((challenge) => (
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
