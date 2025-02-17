import React from "react";
import Keyboard from "@/assets/ic_keyboard.svg";
import Image from "next/image";
import styles from "./Header.module.css";
import Admin from "@/assets/ic_admin.svg";

function HeaderDropDown({ userData, logOut }) {
  return (
    <div className={styles.userProfile}>
      <div className={styles.userInfo}>
        {userData.role === "ADMIN" ? (
          <Image src={Admin} alt="Admin" width={32} height={32} />
        ) : (
          <Image src={Keyboard} alt="keyboard" width={32} height={32} />
        )}
        <div className={styles.userInfoContainer}>
          <p className={styles.nickname}>{userData.nickname}</p>
          <p className={styles.grade}>
            {userData.role === "ADMIN"
              ? "어드민"
              : userData.grade === "GENERAL"
              ? "전문가"
              : "일반"}
          </p>
        </div>
      </div>
      <div className={styles.divider} />
      <div>
        {userData.role === "ADMIN" ? (
          ""
        ) : (
          <p className={styles.menuMyChallenge}>나의 챌린지</p>
        )}
        <div
          className={styles.menuLogOut}
          onClick={() => {
            logOut();
          }}
        >
          로그아웃
        </div>
      </div>
    </div>
  );
}

export default HeaderDropDown;
