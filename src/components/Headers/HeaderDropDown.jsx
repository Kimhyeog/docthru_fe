import React from "react";
import Keyboard from "@/assets/ic_keyboard.svg";
import Image from "next/image";
import styles from "./Header.module.css";
import Admin from "@/assets/ic_admin.svg";
import { useRouter } from "next/navigation";

function HeaderDropDown({ userData, logOut }) {
  const router = useRouter();

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
              ? "일반"
              : "전문가"}
          </p>
        </div>
      </div>
      <div className={styles.divider} />
      <div>
        {userData.role === "ADMIN" ? (
          ""
        ) : (
          <p
            onClick={() => {
              router.push("/my-challenges");
              // 나의 챌린지 클릭시, 나의 첼린지 이동
            }}
            className={styles.menuMyChallenge}
          >
            나의 챌린지
          </p>
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
