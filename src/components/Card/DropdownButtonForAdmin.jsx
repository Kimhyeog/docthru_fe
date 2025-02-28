"use client";
import api from "@/api";
import DropdownMenuButton from "@/components/Dropdown/DropdownMenuButton";
import CheckModal from "@/components/modals/CheckModal";
import { useAuth } from "@/contexts/AuthContext";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import RefusalOrDeleteModal from "../modals/RefusalOrDeleteModal";

function DropdownButtonForAdmin({ challengeId }) {
  const { isLoggedIn } = useAuth();
  const [checkModalOn, setCheckModalOn] = useState(false);
  const params = useParams();
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
    <div onClick={(e) => e.stopPropagation()}>
      {userMe.role == "ADMIN" && (
        <DropdownMenuButton
          menus={[
            {
              label: "수정하기",
              onClick: (e) => {
                e.preventDefault();
                e.stopPropagation();
                router.push(`/challenges/${challengeId}/edit`);
              },
            },
            {
              label: "삭제하기",
              onClick: (e) => {
                e.preventDefault();
                e.stopPropagation();
                setCheckModalOn(true);
              },
            },
          ]}
        />
      )}
      <RefusalOrDeleteModal
        type={"삭제"}
        show={checkModalOn}
        onHide={(e) => {
          if (e) {
            e.preventDefault();
            e.stopPropagation();
          }
          setCheckModalOn(false);
        }}
      />
    </div>
  );
}

export default DropdownButtonForAdmin;
