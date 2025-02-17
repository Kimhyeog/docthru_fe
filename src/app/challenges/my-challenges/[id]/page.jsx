"use client";

import Header from "@/components/Headers/Header";
import style from "./my-challenges.module.css";
import Button from "@/components/Button/Button";
import { useRouter } from "next/navigation";
import Search from "@/components/Search/Search";
import Card from "@/components/Card/Card";

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
];

export default function Page() {
  const router = useRouter();

  return (
    <>
      <Header />
      <div className={style.container}>
        <header className={style.header}>
          <div className={style.header_head}>
            <h2 className={style.header_title}>나의 챌린지</h2>
            <Button
              type={"black"}
              text={"신규 챌린지 신청 +"}
              onClick={() => {
                router.push("/challenges/apply");
              }}
            />
          </div>
          <div className={style.header_btns}>
            <button>참여중인 챌린지</button>
            <button>완료한 챌린지</button>
            <button>신청한 챌린지</button>
          </div>
          <div className={style.header_main}>
            {/* 필터 버튼 (필요한 경우 추가) */}
            <div className={style.searchWrapper}>
              <Search />
            </div>
          </div>
        </header>
        <main className={style.main}>
          {mockData.map((group) => (
            <Card key={group.id} {...group} />
          ))}
        </main>
        <footer className={style.footer}>
          <Button type={"page"} text={"<"} />
          <div className={style.pageNumber}>
            <Button type={"page"} text={"1"} />
            <Button type={"page"} text={"2"} />
            <Button type={"page"} text={"3"} />
            <Button type={"page"} text={"4"} />
            <Button type={"page"} text={"5"} />
          </div>
          <Button type={"page"} text={">"} />
        </footer>
      </div>
    </>
  );
}
