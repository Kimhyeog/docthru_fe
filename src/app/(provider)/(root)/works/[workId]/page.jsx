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
import DropdownMenuforWork from "./_components/DropdownMenuforWork";
import ChipCardStatus from "@/components/Chips/ChipCardStatus";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "github-markdown-css/github-markdown.css";
import Link from "next/link";

async function WorkPage({ params }) {
  const param = await params;
  const workId = param.workId;
  const work = await api.getWork(workId);
  const challengeId = work.challengeId;
  const challenge = await api.getChallenge(challengeId);
  const type = challenge?.field;
  const writerData = await api.getUserData(work.userId);
  const feedbacks = await api.getFeedbacks(workId);
  const { progress, participants, maxParticipants } = challenge;

  return (
    <div className={style.container}>
      <div className={style.header}>
        <div className={style.titleContainer}>
          <div className={style.chipCardStatus}>
            {progress === "COMPLETED" ? (
              <ChipCardStatus />
            ) : participants === maxParticipants ? (
              <ChipCardStatus type="Recruitment" />
            ) : null}
            <Link href={`/challenges/${challengeId}`}>
              <h2 className={style.title}>{challenge?.title}</h2>
            </Link>
          </div>
          <DropdownMenuforWork writerId={writerData.id} challenge={challenge} />
        </div>
        <div className={style.meta}>
          <Chip type={type}>{type}</Chip>
          <ChipCategory category={challenge.docType} />
        </div>
      </div>
      <div className={style.divider} />
      <div className={style.info}>
        <div className={style.users}>
          <Image src={keyboard} alt="keyboradIcon" width={24} height={24} />
          <p className={style.nickname}>{writerData.nickname}</p>
          <Favorite work={work} progress={progress} />
        </div>
        <div className={style.favoriteCount}>
          {dayjs(work.lastModifiedAt).format("YY/MM/DD")}
        </div>
      </div>
      <div className={style.divider} />
      <div className={`${style.description} markdown-body`}>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {work?.description}
        </ReactMarkdown>
      </div>
      <div className={style.divider} />
      <CreateFeedback challenge={challenge} />
      <Feedbacks feedbacks={feedbacks} challenge={challenge} />
    </div>
  );
}

export default WorkPage;
