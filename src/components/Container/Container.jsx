import Image from "next/image";
import styles from "./Container.module.css";
import clockIcon from "@/assets/ic_clock.svg";
import peopleIcon from "@/assets/ic_people.svg";
import Button from "../Button/Button";

const Container = ({ date, userCount, maximumUserCount: maxUserCount }) => {
  // userCount는 maximumUserCount 보다 낮아야 함
  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <div className={styles.date}>
          <Image src={clockIcon} alt="마감 시계" width={16} height={16} />
          <span>{date ? "" : "2024년 3월 3일 마감"}</span>
        </div>
        <div className={styles.participants}>
          <Image src={peopleIcon} alt="참여 인원" width={16} height={16} />
          {userCount && maxUserCount
            ? `${userCount}/${maxUserCount}`
            : " 15/15"}
        </div>
      </div>
      <Button
        type={"yellow"}
        text={"원문 보기"}
        className={styles.fullWidthButton}
        onClick={() => {}}
      />
      <Button
        type={"black"}
        text={"작업 도전하기"}
        className={styles.fullWidthButton}
        onClick={() => {}}
      />
    </div>
  );
};

export default Container;
