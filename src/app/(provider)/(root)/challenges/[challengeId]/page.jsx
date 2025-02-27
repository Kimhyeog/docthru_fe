import Image from "next/image";
import api from "@/api";
import Chip from "@/components/Chips/Chip";
import ChipCategory from "@/components/Chips/ChipCategory";
import React from "react";
import Container from "@/components/Container/Container";
import styles from "./challengeDetail.module.css";
import ParticipationList from "./_component/ParticipationList";
import Kyeboard from "@/assets/ic_keyboard.svg";
import ChipCardStatus from "@/components/Chips/ChipCardStatus";
import BestWork from "./_component/BestWorks";
import DropdownMenuForAdmin from "./_component/DropdownMenuForAdmin";

async function ChallengeDetailPage({ params }) {
  const param = await params;
  const challengeId = param.challengeId;
  const challenge = await api.getChallenge(challengeId);
  const type = challenge?.field;

  const userId = challenge?.application.userId;
  const user = await api.getUserData(userId);
  const works = await api.getWorks(challengeId);
  const { progress, participants, maxParticipants } = challenge;
  const topLikeWorks = await api.getTopLikeWorks(challengeId);
  console.log(user);
  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        {/* 헤더 */}
        <div>
          <div className={styles.challengeTitle}>
            <div className={styles.chipStatus}>
              {progress === "COMPLETED" ? (
                <ChipCardStatus />
              ) : participants === maxParticipants ? (
                <ChipCardStatus type="Recruitment" />
              ) : null}
              <div className={styles.title}>{challenge.title} </div>
            </div>

            <DropdownMenuForAdmin />
          </div>
          {/* chips */}
          <div className={styles.chips}>
            <Chip type={type}>{type}</Chip>
            <ChipCategory category={challenge.docType} />
          </div>
          {/* 챌린지 내용 및 작성자 닉네임 */}
          <div>
            <div className={styles.contentContainer}>
              <div className={styles.content}>{challenge.content}</div>
              <div className={styles.userContainer}>
                <Image
                  src={Kyeboard}
                  alt="user icon"
                  width={24}
                  height={24}
                ></Image>
                <div>{user.nickname}</div>
              </div>
            </div>
          </div>
        </div>

        {/* 원문보기, 작업도전하기 */}
        <div>
          <Container
            date={challenge.deadline}
            challenge={challenge}
          ></Container>
        </div>
        <div className={styles.horizontalLine}></div>
      </div>
      {/* 참여 현황*/}
      <div className={styles.horizontalLine}></div>
      <div className={styles.contentContainer}>
        {progress === "COMPLETED" && topLikeWorks && (
          <BestWork topLikeWorks={topLikeWorks} />
        )}
        <ParticipationList works={works} />
      </div>
    </div>
  );
}

export default ChallengeDetailPage;
