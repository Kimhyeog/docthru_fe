import ChipCardStatus from "@/components/Chips/ChipCardStatus";
import styles from "./DeletedOrRejected.module.css";
import Image from "next/image";
import api from "@/api";

async function DeletedOrRejectedPage({ params }) {
  const param = await params;
  const challengeId = param.myChallengeId;
  const challenge = await api.getChallenge(challengeId);
  const type = challenge?.field;
  const userId = challenge?.application.userId;
  const user = await api.getUserData(userId);
  const worksData = await api.getWorks(challengeId);
  const works = worksData.works;
  const { progress, participants, maxParticipants } = challenge;

  return (
    <div>
      <div>삭제된 챌린지 입니다.</div>
      <div>
        독스루는 개발 문서 번역 플랫폼으로, 폭력성과 관련된 내용을 포함할 수
        없음을 안내드립니다. 감사합니다.
      </div>
      <h1>Next.js - App Router : Routing Fundamentals</h1>
      <div className={styles.challengeTitle}>
        <div className={styles.chipStatus}>
          {progress === "COMPLETED" ? (
            <ChipCardStatus />
          ) : participants === maxParticipants ? (
            <ChipCardStatus type="Recruitment" />
          ) : null}
          <div className={styles.title}>{challenge.title} </div>
        </div>
      </div>
    </div>
  );
}

export default DeletedOrRejectedPage;
