import api from "@/api";
import Chip from "@/components/Chips/Chip";
import ChipCategory from "@/components/Chips/ChipCategory";
import React from "react";
import style from "./work.module.css";
import dayjs from "dayjs";
import Image from "next/image";
import keyboard from "@/assets/ic_keyboard.svg";
import Favorite from "./_components/Favorite";
import Feedbacks from "./_components/Feedbacks";
import CreateFeedback from "./_components/CreateFeedback";

async function WorkPage({ params }) {
  const param = await params;
  const workId = param.workId;
  const work = await api.getWork(workId);
  const challengeId = work.challengeId;
  const challenge = await api.getChallenge(challengeId);
  const type = challenge?.field;
  const writerData = await api.getUserDate(work.userId);
  const feedbacks = await api.getFeedbacks(workId);
  return (
    <div className={style.container}>
      <div className={style.header}>
        <h2 className={style.title}>{challenge?.title}</h2>
        <div className={style.meta}>
          <Chip type={type}>{type}</Chip>
          <ChipCategory category="블로그" />
        </div>
      </div>
      <div className={style.divider} />
      {/* 백엔드 수정해해서 하트 색깔 확인하기 */}
      <div className={style.info}>
        <div className={style.users}>
          <Image src={keyboard} alt="keyboradIcon" width={24} height={24} />
          <p>{writerData.nickname}</p>
          <Favorite work={work} />
        </div>
        <div className={style.favoriteCount}>
          {dayjs(work.lastModifiedAt).format("YY/MM/DD")}
        </div>
      </div>
      <div className={style.divider} />
      <div className={style.description}>{work?.description}</div>
      <div className={style.divider} />
      <CreateFeedback />
      <Feedbacks feedbacks={feedbacks} />
    </div>
  );
}

export default WorkPage;
