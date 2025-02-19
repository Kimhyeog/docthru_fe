import Image from "next/image";
import api from "@/api";
import Chip from "@/components/Chips/Chip";
import OptionButton from "@/assets/ic_option.svg";
import ChipCategory from "@/components/Chips/ChipCategory";
import React from "react";
import Container from "@/components/Container/Container";
import styles from "./challengeDetail.module.css";
import ParticipationList from "./_component/ParticipationList";
import Kyeboard from "@/assets/ic_keyboard.svg";

async function ChallengeDetailPage({ params }) {
  const param = await params;
  const challengeId = param.challengeId;
  const challenge = await api.getChallenge(challengeId);
  const type = challenge?.field;
  console.log(challenge);
  const userId = challenge?.participate[0].userId;
  const user = await api.getUserDate(userId);
  const worksData = await api.getWorks(challengeId);
  console.log(worksData);
  const works = worksData.works;
  console.log(works);
  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        {/* 헤더 */}
        <div>
          <div className={styles.challengeTitle}>
            <h2>{challenge.title}</h2>
            <Image
              src={OptionButton}
              alt="option"
              width={24}
              height={24}
            ></Image>
          </div>
          {/* chips */}
          <div className={styles.chips}>
            <Chip type={type}>{type}</Chip>
            <ChipCategory category="블로그" />
          </div>
          {/* 챌린지 내용 및 작성자 닉네임 */}
          <div>
            <div className={styles.contentContainer}>
              <div>{challenge.content}</div>
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
            userCount={challenge.participants}
            maximumUserCount={challenge.maxParticipants}
          ></Container>
        </div>
        <div className={styles.horizontalLine}></div>
      </div>
      {/* 참여 현황*/}
      <div className={styles.horizontalLine}></div>
      <ParticipationList works={works} totalPages={worksData.totalPages} />
    </div>
  );
}

export default ChallengeDetailPage;
