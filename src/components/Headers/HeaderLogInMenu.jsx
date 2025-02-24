"use client";
import Image from "next/image";
import Link from "next/link";
import styles from "./Header.module.css";
import Bell from "@/assets/bell.svg";
import Keyboard from "@/assets/ic_keyboard.svg";
import Admin from "@/assets/ic_admin.svg";
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import Button from "../Button/Button";
import HeaderDropDown from "./HeaderDropDown";
import { useState } from "react";

function HeaderLogInMenu({ userData }) {
  const [isOpen, setIsOpen] = useState(false);
  const { isLoggedIn, logOut, isAuthInitialized } = useAuth();
  if (!isAuthInitialized) return;
  return (
    <>
      {isLoggedIn ? (
        <div className={styles.icons}>
          {userData.role === "ADMIN" ? (
            ""
          ) : (
            <Image src={Bell} alt="bell" width={24} height={24} />
          )}
          <div className={styles.none}>
            <div onClick={() => setIsOpen((prev) => !prev)}>
              {userData.role === "ADMIN" ? (
                <Image src={Admin} alt="Admin" width={32} height={32} />
              ) : (
                <Image src={Keyboard} alt="keyboard" width={32} height={32} />
              )}
            </div>
            {isOpen && <HeaderDropDown userData={userData} logOut={logOut} />}
          </div>
        </div>
      ) : (
        <Link href="/login" className={styles.logInButton}>
          <Button text="로그인" type="gray" />
        </Link>
      )}
    </>
  );
}

export default HeaderLogInMenu;
