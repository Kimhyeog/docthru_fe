"use client";
import api from "@/api";
import DropdownMenuButton from "@/components/Dropdown/DropdownMenuButton";
import CheckModal from "@/components/modals/CheckModal";
import { useAuth } from "@/contexts/AuthContext";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";

function DropdownMenuForAdmin() {
  const { isLoggedIn } = useAuth();
  const [checkModalOn, setCheckModalOn] = useState(false);
  const params = useParams();
  const challengeId = params.challengeId;
  const router = useRouter();

  const { data: userMe } = useQuery({
    queryFn: api.getUserMe,
    queryKey: ["userData"],
    enabled: isLoggedIn,
    initialData: {},
  });

  const { mutate: deleteChallenge } = useMutation({
    mutationFn: () => api.deleteChallengeByAdmin(challengeId),
    onSuccess: () => {
      router.replace("/challenges");
    },
  });

  return (
    <div>
      {userMe.role == "ADMIN" && (
        <DropdownMenuButton
          menus={[
            {
              label: "수정하기",
              onClick: () => {
                router.push(`/challenges/${challengeId}/edit`);
              },
            },
            {
              label: "삭제하기",
              onClick: () => setCheckModalOn(true),
            },
          ]}
          option="admin"
        />
      )}
      <CheckModal
        text={"정말로 삭제하시겠습니까?"}
        show={checkModalOn}
        onHide={() => {
          setCheckModalOn(false);
        }}
        onClick={() => {
          deleteChallenge();
        }}
      />
    </div>
  );
}

export default DropdownMenuForAdmin;
