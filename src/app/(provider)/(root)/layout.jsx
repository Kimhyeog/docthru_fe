"use client";
import Header from "@/components/Headers/Header";
import { usePathname } from "next/navigation";
import React from "react";
import { basicFont } from "@/assets/fonts";
import style from "./RootLayout.module.css";

function RootLayout({ children }) {
  const pathname = usePathname();
  const isHeaderHidden =
    (pathname.includes("/works/") && pathname.endsWith("/edit")) ||
    (pathname.includes("/challenges/") && pathname.endsWith("/challengeTask"));

  // 패스네임 힌트로 저도 페이지별 배경색 다르게 했다요
  const backgroundColor =
    pathname === "/challenges" || pathname === "/my-challenges"
      ? "#FAFAFA"
      : "white";

  return (
    <div
      style={{
        fontFamily: basicFont.style.fontFamily,
        backgroundColor: backgroundColor,
      }}
      className={style.layout}
    >
      {!isHeaderHidden && <Header />}

      {children}
    </div>
  );
}

export default RootLayout;
