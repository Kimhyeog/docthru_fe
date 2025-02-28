"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
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
import CheckModal from "@/components/modals/CheckModal";
import api from "@/api/index";

export default function DeletedOrRejectedPage() {
  const params = useParams(); // ✅ useParams로 params 가져오기
  const challengeId = params?.myChallengeId;

  const [challenge, setChallenge] = useState(null);
  const [user, setUser] = useState(null);
  const [works, setWorks] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleConfirm = () => {
    setIsModalOpen(false); // 모달 닫기
  };

  const handleCancel = () => {
    setIsModalOpen(false); // 모달 닫기
  };

  useEffect(() => {
    if (!challengeId) return;

    async function fetchData() {
      try {
        const challengeData = await api.getChallenge(challengeId);
        setChallenge(challengeData);

        console.log(challengeData);

        if (challengeData?.application?.userId) {
          const userData = await api.getUserData(
            challengeData.application.userId
          );
          setUser(userData);
        }

        const worksData = await api.getWorks(challengeId);
        setWorks(worksData.works);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [challengeId]);

  if (loading) return <div>로딩 중...</div>;
  if (!challenge) return <div>챌린지를 찾을 수 없습니다.</div>;

  const {
    progress,
    participants,
    maxParticipants,
    title,
    content,
    deadline,
    application,
  } = challenge;
  const status = application?.status;
  const reasonComment = application?.invalidationComment;

  const statusTitle = {
    DELETED: { title: "삭제된 챌린지입니다.", subTitle: "삭제 사유" },
    REJECTED: { title: "신청이 거절된 챌린지입니다.", subTitle: "거절 사유" },
    WAITING: { title: "승인 대기 중입니다." },
  };

  return (
    <div className={styles.Container}>
      <div className={styles.header}>
        <div
          className={`${styles.statusTitle} ${
            status === "WAITING" ? styles.statusTitle_WAITING : ""
          }`}
        >
          {statusTitle[status]?.title || "알 수 없는 상태입니다."}
        </div>
        {status !== "WAITING" && (
          <div className={styles.statusCommentContainer}>
            <p className={styles.commentTitle}>
              {statusTitle[status]?.subTitle || "알 수 없는 상태입니다."}
            </p>
            <div>{reasonComment}</div>
          </div>
        )}
      </div>
      <div className={styles.cardContainer}>
        <div className={styles.challengeTitle}>{title}</div>
        <div className={styles.chips}>
          <Chip type={challenge.field}>{challenge.field}</Chip>
          <ChipCategory category={challenge.docType} />
          {status === "WAITING" && (
            <div className={styles.buttonSection}>
              <button
                onClick={() => {
                  setIsModalOpen(true);
                }}
              >
                취소하기
              </button>
            </div>
          )}
          <CheckModal
            show={isModalOpen}
            onHide={handleCancel}
            text={"정말 취소하시겠어요?"}
            onClick={handleConfirm}
          />
        </div>
        <div className={styles.challengeContent}>{content}</div>
        <div className={styles.footer}>
          <div className={styles.date}>
            <Image src={clockIcon} alt="마감 시계" width={24} height={24} />
            <span>
              {deadline
                ? dayjs(deadline).format("YYYY년 MM월 DD일 마감")
                : "마감일 미정"}
            </span>
          </div>
          <div className={styles.participants}>
            <Image src={peopleIcon} alt="참여 인원" width={24} height={24} />
            <span>
              {participants && maxParticipants
                ? ` ${participants}/${maxParticipants} 참여중`
                : "참여 정보 없음"}
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
            링크 열기 <FaArrowRight />
          </Link>
        </div>
      </div>
    </div>
  );
}
