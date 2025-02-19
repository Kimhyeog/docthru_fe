import api from "@/api";
import Chip from "@/components/Chips/Chip";
import ChipCategory from "@/components/Chips/ChipCategory";
import React from "react";
import Container from "@/components/Container/Container";
import styles from "./challengeDetail.module.css";
import ParticipationList from "./_component/ParticipationList";

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
          <div>
            <h2>{challenge.title}</h2>
            {/* chips */}
            <div>
              <Chip type={type}>{type}</Chip>
              <ChipCategory category="블로그" />
            </div>
          </div>
          {/* 챌린지 내용 및 작성자 닉네임 */}
          <div>
            <div>
              <div>{challenge.content}</div>
              <div>{user.nickname}</div>
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
      </div>
      {/* 참여 현황*/}
      <ParticipationList works={works} totalPages={worksData.totalPages} />
    </div>
  );
}

export default ChallengeDetailPage;
