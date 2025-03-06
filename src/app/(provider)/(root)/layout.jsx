"use client";
import Header from "@/components/Headers/Header";
import { usePathname } from "next/navigation";
import React from "react";
import { basicFont } from "@/assets/fonts";
import style from "./RootLayout.module.css";
import { useQuery } from "@tanstack/react-query";
import api from "@/api";
import { useAuth } from "@/contexts/AuthContext";

function RootLayout({ children }) {
  const pathname = usePathname();
  const { isLoggedIn } = useAuth();
  const isHeaderHidden =
    (pathname.includes("/works/") && pathname.endsWith("/edit")) ||
    (pathname.includes("/challenges/") && pathname.endsWith("/challengeTask"));

  // 패스네임 힌트로 저도 페이지별 배경색 다르게 했다요
  const backgroundColor =
    pathname === "/challenges" || pathname === "/my-challenges"
      ? "#FAFAFA"
      : "white";

  const { data: notification } = useQuery({
    queryFn: api.getNotification,
    queryKey: ["notification"],
    enabled: isLoggedIn,
  });

  return (
    <div
      style={{
        fontFamily: basicFont.style.fontFamily,
        backgroundColor: backgroundColor,
      }}
      className={style.layout}
    >
      {!isHeaderHidden && <Header notification={notification} />}

      {children}
    </div>
  );
}

export default RootLayout;
