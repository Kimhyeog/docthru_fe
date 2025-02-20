"use client";
import React from "react";
import DropdownMenuButton from "@/components/Dropdown/DropdownMenuButton";
import { useAuth } from "@/contexts/AuthContext";
import { useMutation, useQuery } from "@tanstack/react-query";
import api from "@/api";
import { useParams, useRouter } from "next/navigation";

function DropdownMenuforWork({ writerId }) {
  const { isLoggedIn } = useAuth();
  const params = useParams();
  const workId = params.workId;
  const router = useRouter();
  const { data: userMe } = useQuery({
    queryFn: api.getUserMe,
    queryKey: ["useData"],
    enabled: isLoggedIn,
    initialData: {},
  });

  const { mutate: deleteWork } = useMutation({
    mutationFn: () => api.deleteWork(workId),
    onSuccess: () => {
      router.push("/challenges");
    },
  });

  return (
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
