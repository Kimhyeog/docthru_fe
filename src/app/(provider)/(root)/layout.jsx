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
  return (
    <div
      style={{ fontFamily: basicFont.style.fontFamily }}
      className={style.layout}
    >
      {!isHeaderHidden && <Header />}

      {children}
    </div>
  );
}

export default RootLayout;
