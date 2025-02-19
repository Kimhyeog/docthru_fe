import Image from "next/image";
import styles from "./Card.module.css";
import clockIcon from "@/assets/ic_clock.svg";
import peopleIcon from "@/assets/ic_people.svg";
import ChipCardStatus from "../Chips/ChipCardStatus";
import { EllipsisVertical } from "lucide-react";

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

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <ChipCardStatus type="Recruitment" />
        <button
          className={styles.moreOptions}
          onClick={handleMoreOptionsClick}
          aria-label="moreOptions"
        >
          <EllipsisVertical />
        </button>
      </div>

      <h2 className={styles.title}>
        {title ? title : "Next.js - App Router: Routing Fundamentals"}
      </h2>

      <div className={styles.tags}>
        <span className={styles.nextJsTag}>{field}</span>
        <span className={styles.officialDoc}>{docType}</span>
      </div>

      <hr className={styles.separator} />

      <div className={styles.footer}>
        <div>
          <Image src={clockIcon} alt="마감 시계" width={16} height={16} />
          <span>
            {deadline
              ? new Date(deadline).toLocaleDateString()
              : "2024년 3월 3일 마감"}
          </span>
        </div>
        <div className={styles.participants}>
          <Image src={peopleIcon} alt="참여 인원" width={16} height={16} />
          <span>
            {participants && maxParticipants
              ? `${participants}/${maxParticipants}`
              : "15/15 참여 완료"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Card;
