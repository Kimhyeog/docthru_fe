import Image from "next/image";
import styles from "./Card.module.css";

const Card = () => {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={styles.status}>모집이 완료된 상태에요</span>
        <Image
          src="/three-dots-icon.png"
          alt="More options"
          width={20}
          height={20}
        />
      </div>

      <h2 className={styles.title}>
        Next.js - App Router: Routing Fundamentals
      </h2>

      <div className={styles.tags}>
        <span className={styles.nextJsTag}>Next.js</span>
        <span className={styles.officialDoc}>공식문서</span>
      </div>

      <hr className={styles.separator} />

      <div className={styles.footer}>
        <span>⏳ 2024년 3월 3일 마감</span>
        <span>👥 5/5 참여 완료</span>
      </div>
    </div>
  );
};

export default Card;
