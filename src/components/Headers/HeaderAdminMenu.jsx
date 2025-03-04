"use client";
import React from "react";
import styles from "./Header.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";

function HeaderAdminMenu() {
  const pathname = usePathname();
  return (
    <>
      <Link
        href="/challenges/manage"
        className={`${styles.link} ${
          pathname === "/challenges/manage" ? styles.active : ""
        }`}
      >
        챌린지 관리
      </Link>
      <Link
        href="/challenges/admin"
        className={`${styles.link} ${
          pathname === "/challenges/admin" ? styles.active : ""
        }`}
      >
        챌린지 목록
      </Link>
    </>
  );
}

export default HeaderAdminMenu;
