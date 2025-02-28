"use client";
import React, { useState } from "react";
import DropdownMenuButton from "@/components/Dropdown/DropdownMenuButton";
import { useAuth } from "@/contexts/AuthContext";
import { useMutation, useQuery } from "@tanstack/react-query";
import api from "@/api";
import { useParams, useRouter } from "next/navigation";
import CheckModal from "@/components/modals/CheckModal";

function DropdownMenuforWork({ writerId, challenge: initialChallenge }) {
  const { isLoggedIn } = useAuth();
  const params = useParams();
  const workId = params.workId;
  const router = useRouter();
  const challengeId = initialChallenge.id;
  const [showModal, setShowModal] = useState(false);

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
    (userMe.role === "ADMIN" ||
      (progress !== "COMPLETED" && writerId === userMe.id)) &&
    isLoggedIn && (
      <div>
        <DropdownMenuButton
          menus={[
            {
              label: "수정하기",
              onClick: () => {
                router.push(`/works/${workId}/edit`);
              },
            },
            {
              label: "삭제하기",
              onClick: () => setShowModal(true),
            },
          ]}
        />
        <CheckModal
          text={"정말로 삭제하시겠습니까?"}
          onHide={() => setShowModal(false)}
          show={showModal}
          onClick={() => deleteWork()}
        />
      </div>
    )
  );
}

export default DropdownMenuforWork;
