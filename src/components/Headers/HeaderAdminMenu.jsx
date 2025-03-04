import React from "react";
import styles from "./Header.module.css";
import Link from "next/link";

function HeaderAdminMenu() {
  return (
    <>
      <Link href="/challenges/manage" className={styles.link}>
        챌린지 관리
      </Link>
      <Link href="/challenges/admin" className={styles.link}>
        챌린지 목록
      </Link>
    </>
  );
}

export default HeaderAdminMenu;
