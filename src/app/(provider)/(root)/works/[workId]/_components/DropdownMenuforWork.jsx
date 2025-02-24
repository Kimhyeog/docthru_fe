"use client";
import React from "react";
import DropdownMenuButton from "@/components/Dropdown/DropdownMenuButton";
import { useAuth } from "@/contexts/AuthContext";
import { useMutation, useQuery } from "@tanstack/react-query";
import api from "@/api";
import { useParams, useRouter } from "next/navigation";

function DropdownMenuforWork({ writerId, challenge: initialChallenge }) {
  const { isLoggedIn } = useAuth();
  const params = useParams();
  const workId = params.workId;
  const router = useRouter();
  const challengeId = initialChallenge.id;

  const { data: userMe } = useQuery({
    queryFn: api.getUserMe,
    queryKey: ["userData"],
    enabled: isLoggedIn,
    initialData: {},
  });

  const { mutate: deleteWork } = useMutation({
    mutationFn: () => api.deleteWork(workId),
    onSuccess: () => {
      router.push("/challenges");
    },
  });

  const { data: challenge } = useQuery({
    queryFn: () => api.getChallenge(challengeId),
    queryKey: ["challenge", { challengeId }],
    initialData: initialChallenge,
  });
  const progress = challenge.progress;

  return (
    progress !== "COMPLETED" &&
    isLoggedIn &&
    writerId === userMe.id && (
      <DropdownMenuButton
        menus={[
          {
            label: "수정하기",
            onClick: () => {
              router.push("/works/edit");
            },
          },
          {
            label: "삭제하기",
            onClick: deleteWork,
          },
        ]}
      />
    )
  );
}

export default DropdownMenuforWork;
