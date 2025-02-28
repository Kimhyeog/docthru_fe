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

export default function DeletedOrRejectedPage() {
  const params = useParams(); // ✅ useParams로 params 가져오기
  const challengeId = params?.myChallengeId;

  const [challenge, setChallenge] = useState(null);
  const [user, setUser] = useState(null);
  const [works, setWorks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [myDelete, setMyDelete] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleConfirm = async () => {
    try {
      await api.deleteChallenge(challengeId); // 챌린지 삭제 API 호출
      setMyDelete(true);
      alert("삭제완료");

      setIsModalOpen(false); // 모달 닫기
    } catch (error) {
      console.error("챌린지 삭제 중 오류 발생:", error);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false); // 모달 닫기
  };

  // 삭제 완료 시 자동으로 챌린지 데이터 다시 불러오기
  useEffect(() => {
    if (myDelete) {
      async function fetchUpdatedData() {
        try {
          const updatedChallengeData = await api.getChallenge(challengeId);
          setChallenge(updatedChallengeData);
        } catch (error) {
          console.error("업데이트된 챌린지 데이터 불러오기 실패:", error);
        }
      }
      fetchUpdatedData();
    }
  }, [myDelete]); // ✅ myDelete가 변경될 때만 실행

  useEffect(() => {
    if (!challengeId) return;

    async function fetchData() {
      try {
        const challengeData = await api.getChallenge(challengeId);
        setChallenge(challengeData);

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
            status === "WAITING"
              ? styles.statusTitle_WAITING
              : status === "DELETED"
              ? styles.statusTitle
              : status === "REJECTED"
              ? styles.statusTitle_REJECTED
              : ""
          }`}
        >
          {statusTitle[status]?.title || "알 수 없는 상태입니다."}
        </div>
        {status !== "WAITING" && (
          <div className={styles.statusCommentContainer}>
            <p className={styles.commentTitle}>
              {statusTitle[status]?.subTitle || "알 수 없는 상태입니다."}
            </p>
            <div>
              {myDelete === true
                ? "해당 계정 사용자가 삭제한 챌린지입니다."
                : reasonComment}
            </div>
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
