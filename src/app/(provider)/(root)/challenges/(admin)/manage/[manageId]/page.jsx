"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import styles from "./challengesManageId.module.css";
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
import Button from "@/components/Button/Button";
import RefusalOrDeleteModal from "@/components/modals/RefusalOrDeleteModal";

export default function DeletedOrRejectedPage() {
  const params = useParams(); // ✅ useParams로 params 가져오기
  const challengeId = params?.manageId; // ✅ [manageId]와 일치하는지 확인

  console.log("challengeId:", challengeId);
  const router = useRouter();

  const [challenge, setChallenge] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [works, setWorks] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAcceptByAdmin = async () => {
    try {
      await api.acceptChallengeByAdmin(challengeId); // 챌린지 삭제 API 호출
      window.location.reload();

      router.refresh;
    } catch (error) {
      console.error("챌린지 승인인 중 오류 발생:", error);
    }
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
    ACCEPTED: { title: "신청이 승인된 챌린지입니다." },
  };

  function getStatusClass(status) {
    switch (status) {
      case "ACCEPTED":
        return styles.statusTitle_WAITING;
      case "REJECTED":
        return styles.statusTitle_REJECTED;
      default:
        return ""; // 기본 스타일 (DELETED 포함)
    }
  }

  return (
    <div className={styles.Container}>
      <div className={styles.header}>
        {status !== "WAITING" && (
          <div className={`${styles.statusTitle} ${getStatusClass(status)}`}>
            {statusTitle[status]?.title || "알 수 없는 상태입니다."}
          </div>
        )}

        {status !== "WAITING" && status !== "ACCEPTED" && (
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
      <div className={styles.adminBtns}>
        {status === "WAITING" && (
          <Button
            type={"red"}
            text={"거절하기"}
            width={153}
            height={48}
            onClick={() => {
              setIsModalOpen(true);
            }}
          />
        )}
        {status === "WAITING" && (
          <Button
            type={"black"}
            text={"승인하기"}
            width={153}
            height={48}
            onClick={() => {
              handleAcceptByAdmin(challengeId);

              alert("챌린지가 승인되었습니다.");
            }}
          />
        )}
        <RefusalOrDeleteModal
          show={isModalOpen}
          type={"거절"}
          onHide={handleCancel}
          challengeId={challengeId}
        />
      </div>
    </div>
  );
}
