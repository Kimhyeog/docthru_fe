import styles from "./DeletedOrRejected.module.css";
import clockIcon from "@/assets/ic_clock.svg";
import Image from "next/image";
import api from "@/api";
import Chip from "@/components/Chips/Chip";
import ChipCategory from "@/components/Chips/ChipCategory";
import dayjs from "dayjs";
import peopleIcon from "@/assets/ic_people.svg";
import Link from "next/link";
import nextImg from "@/assets/images/nextJs.png";
import { FaArrowRight } from "react-icons/fa6";

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
  const status = challenge.application.status;
  const reasonComment = challenge.application.invalidationComment;
  const challengeTitle = challenge.title;
  const challengeContent = challenge.content;
  const deadline = challenge.deadline;

  const statusTitle = [
    { value: "DELETED", title: "삭제된 챌린지입니다.", subTitle: "삭제사유" },
    { value: "REJECTED", title: "신청이 거절된 챌린지입니다." },
  ];

  const getTitle = (status) => {
    if (status === statusTitle[0].value) return statusTitle[0].title;
    if (status === statusTitle[1].value) return statusTitle[1].title;

    return "알 수 없는 상태입니다.";
  };

  const getSubTitle = (status) => {
    if (status === statusTitle[0].value) return statusTitle[0].subTitle;
    if (status === statusTitle[1].value) return statusTitle[1].subTitle;

    return "알 수 없는 상태입니다.";
  };

  const docUrl = challenge.docUrl;

  return (
    <>
      <div className={styles.Container}>
        <div className={styles.header}>
          <div className={styles.statusTitle}>{getTitle(status)}</div>
          <div className={styles.statusCommentContainer}>
            <p className={styles.commentTitle}>{getSubTitle(status)}</p>
            <div>{reasonComment}</div>
          </div>
        </div>
        <div className={styles.cardContainer}>
          <div className={styles.challengeTitle}>{challengeTitle}</div>
          <div className={styles.chips}>
            <Chip type={type}>{type}</Chip>
            <ChipCategory category={challenge.docType} />
          </div>
          <div className={styles.challengeContent}>{challengeContent}</div>
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
          </div>
        </div>
        <div className={styles.contentContainer}>
          <p className={styles.linkTitle}>원문 링크</p>
          <div className={styles.imgContainer}>
            <Image
              className={styles.urlImg}
              src={nextImg}
              alt="Next.js 로고"
              objectFit="cover"
            />
            <Link
              target="_blank"
              href={challenge.docUrl}
              className={styles.button}
            >
              링크 열기 {<FaArrowRight />}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default DeletedOrRejectedPage;
