import Image from "next/image";
import styles from "./Card.module.css";
import clockIcon from "@/assets/ic_clock.svg";
import peopleIcon from "@/assets/ic_people.svg";
import ChipCategory from "../Chips/ChipCategory";
import Chip from "../Chips/Chip";
import dayjs from "dayjs";
import ChipCardStatus from "../Chips/ChipCardStatus";
import DropdownButtonForAdmin from "./DropdownButtonForAdmin";
import CardButton from "./CardButton";

const Card = ({
  deadline,
  field,
  docType,
  title,
  participants,
  maxParticipants,
  id,
}) => {
  const now = dayjs();
  return (
    <div className={styles.card}>
      <div className={styles.titleContainer}>
        <div className={styles.titleWrap}>
          <div className={styles.chipTitle}>
            {now.isAfter(deadline) ? (
              <ChipCardStatus />
            ) : participants === maxParticipants ? (
              <ChipCardStatus type="Recruitment" />
            ) : null}
            <h2 className={styles.title}>
              {title ? title : "Next.js - App Router: Routing Fundamentals"}
            </h2>
          </div>
          <DropdownButtonForAdmin challengeId={id} />
        </div>
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
        <div className={styles.CardButton}>
          <CardButton challengeId={id} isCompleted={now.isAfter(deadline)} />
        </div>
      </div>
    </div>
  );
};

export default Card;
