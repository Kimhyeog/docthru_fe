"use client";
import Image from "next/image";
import Link from "next/link";
import styles from "./Header.module.css";
import Bell from "@/assets/bell.svg";
import Keyboard from "@/assets/ic_keyboard.svg";
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import api from "@/api";
import Button from "../Button/Button";
import HeaderDropDown from "./HeaderDropDown";

function HeaderLogInMenu() {
  const { isLoggedIn, logOut, isAuthInitialized } = useAuth();
  const { data: userData } = useQuery({
    queryFn: api.getUserMe,
    queryKey: ["userData"],
    initialData: {},
    enabled: isLoggedIn,
  });

  if (!isAuthInitialized) return;

  return (
    <>
      {isLoggedIn ? (
        <div className={styles.icons}>
          <Image src={Bell} alt="bell" width={24} height={24} />
          <div>
            <Image src={Keyboard} alt="keyboard" width={24} height={24} />
            <HeaderDropDown />
          </div>

          {/* 이거 클릭하면 모달 나오게 */}
        </div>
      ) : (
        <Link href="/login">
          <Button text="로그인" type="gray" />
        </Link>
      )}
    </>
  );
}

export default HeaderLogInMenu;
