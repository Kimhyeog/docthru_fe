"use client";
import Image from "next/image";
import styles from "./Container.module.css";
import clockIcon from "@/assets/ic_clock.svg";
import peopleIcon from "@/assets/ic_people.svg";
import dayjs from "dayjs";
import Button from "../Button/Button";
import api from "@/api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { useModalStore } from "@/store/useModalStore";
import LoginCheckModal from "../modals/LoginCheckModal";

const Container = ({ date, challenge: initialChallenge }) => {
  // userCount는 maximumUserCount 보다 낮아야 함
  const params = useParams();
  const challengeId = params.challengeId;
  const router = useRouter();
  const { checkModalOn, showModal, closeModal } = useModalStore();
  const { mutate: participateChallenge } = useMutation({
    mutationFn: () => api.participateChallenge(challengeId),
    onSuccess: (data) => {
      const workId = data.workId;
      console.log(data);
      if (!workId) {
        router.push(`/challenges/${challengeId}/challengeTask`); // 바로 가는가? ㄴㄴ work가 있으면 그페이지로 가야함
      } else {
        router.push(`/works/${workId}`);
      }
    },
    onError: (e) => {
      if (e.response.data === "Unauthenticated") {
        showModal("", false);
        return;
      }
      console.log(e);
    },
  });

  const { data: challenge } = useQuery({
    queryFn: () => api.getChallenge(challengeId),
    queryKey: ["challenge", { challengeId }],
    initialData: initialChallenge,
  });

  const handleParticipateClick = async () => {
    participateChallenge();
  };

  const onHide = () => {
    closeModal();
    router.push("/login");
  };

  const progress = challenge.progress;
  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <div className={styles.date}>
          <Image src={clockIcon} alt="마감 시계" width={16} height={16} />
          <span>{dayjs(date).format("YYYY년 MM월 DD일 마감")}</span>
        </div>
        <div className={styles.participants}>
          <Image src={peopleIcon} alt="참여 인원" width={16} height={16} />
          {`${challenge.participants}/${challenge.maxParticipants}`}
        </div>
      </div>
      <Button
        type="yellow"
        text={"원문 보기"}
        // onClick={() => {}}
      />
      {/* 이 버튼 조건문 달아서 색상 다르게  */}
      {progress === "COMPLETED" ? (
        <Button
          type={"gray"}
          text={"작업 도전하기"}
          // onClick={() => {}} 참여 토큰 생성 하고 , 페이지 이동,
        />
      ) : (
        <Button
          type={"black"}
          text={"작업 도전하기"}
          onClick={() => {
            handleParticipateClick();
          }}
        />
      )}
      <LoginCheckModal show={checkModalOn} onHide={onHide}></LoginCheckModal>
    </div>
  );
};

export default Container;
