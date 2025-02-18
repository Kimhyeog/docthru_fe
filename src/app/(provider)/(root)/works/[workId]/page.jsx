import api from "@/api";
import Chip from "@/components/Chips/Chip";
import ChipCategory from "@/components/Chips/ChipCategory";
import React from "react";
import style from "./work.module.css";
import dayjs from "dayjs";
import TextBox from "@/components/TextBox/TextBox";

async function WorkPage({ params }) {
  const param = await params;
  const workId = param.workId;
  const work = await api.getWork(workId);
  const challengeId = work.challengeId;
  const challenge = await api.getChallege(challengeId);
  const type = challenge?.field;
  const writerData = await api.getUserDate(work.userId);
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
      <div className={style.info}>
        <div>
          {writerData.nickname} {work?.likeCount}
        </div>
        <div>{dayjs(work.lastModifiedAt).format("YY/MM/DD")}</div>
      </div>
      <div className={style.divider} />
      <div className={style.description}>{work?.description}</div>
      <div className={style.divider} />
      <TextBox placeholder="피드백을 남겨주세요"></TextBox>
      <div>피드백들~~</div>
    </div>
  );
}

export default WorkPage;
