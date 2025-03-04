"use client";
import api from "@/api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import Button from "../Button/Button";
import rigthArrow from "@/assets/ic_arrow_right_in_mywork.svg";
import document from "@/assets/ic_document.svg";
import Image from "next/image";

function CardButton({ challengeId, isCompleted }) {
  const router = useRouter();
  const pathname = usePathname();

  const { data: myWork } = useQuery({
    queryFn: () => api.getMyWork(challengeId),
    queryKey: ["myWork", { challengeId }],
  });

  if (!pathname.startsWith("/my-challenges")) return null;

  const workId = myWork?.work?.id;
  return (
    <div>
      {isCompleted ? (
        <Button
          text={"내 작업물 보기"}
          type={"button_my_work"}
          width={132}
          height={33}
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            if (myWork?.existWork) {
              router.push(`/works/${workId}`);
            } else {
              router.push(`/challenges/${challengeId}`);
            }
          }}
          icon={<Image src={document} alt="document" width={24} height={24} />}
        />
      ) : (
        <Button
          text={"도전 계속하기"}
          type={"outline_icon"}
          width={132}
          height={33}
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            if (myWork?.existWork) {
              router.push(`/works/${workId}`);
            } else {
              router.push(`/challenges/${challengeId}/challengeTask`);
            }
          }}
          icon={
            <Image src={rigthArrow} alt="right arrow" width={24} height={24} />
          }
        />
      )}
    </div>
  );
}

export default CardButton;
