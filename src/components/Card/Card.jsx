import Image from "next/image";
import styles from "./Card.module.css";
import clockIcon from "@/assets/ic_clock.svg";
import peopleIcon from "@/assets/ic_people.svg";
import ChipCategory from "../Chips/ChipCategory";
import Chip from "../Chips/Chip";
import dayjs from "dayjs";
import ChipCardStatus from "../Chips/ChipCardStatus";

const Card = ({
  deadline,
  field,
  docType,
  title,
  participants,
  maxParticipants,
}) => {
  const handleMoreOptionsClick = () => {
    // 더보기 버튼 클릭 시
  };
  const now = dayjs();
  console.log(now.isAfter(deadline));
  return (
    <div className={styles.card}>
      <div className={styles.titleContainer}>
        {now.isAfter(deadline) ? (
          <ChipCardStatus />
        ) : participants === maxParticipants ? (
          <ChipCardStatus type="Recruitment" />
        ) : null}

        <h2 className={styles.title}>
          {title ? title : "Next.js - App Router: Routing Fundamentals"}
        </h2>
        <div className={styles.tags}>
          <Chip type={field} />
          <ChipCategory category={docType} />
        </div>
      </div>

      <hr className={styles.separator} />

      <div className={styles.footer}>
        <div className={styles.date}>
          <Image src={clockIcon} alt="마감 시계" width={24} height={24} />
          <span>
            {deadline
              ? dayjs(deadline).format("YYYY년 MM월 DD일 마감")
              : "2024년 3월 3일 마감"}
          </span>
        </div>
        <div className={styles.participants}>
          <Image src={peopleIcon} alt="참여 인원" width={24} height={24} />
          <span>
            {participants && maxParticipants
              ? ` ${participants}/${maxParticipants} 참여중`
              : "15/15 참여 완료"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Card;
