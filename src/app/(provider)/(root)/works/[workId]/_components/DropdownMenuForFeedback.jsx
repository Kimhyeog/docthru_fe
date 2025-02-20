"use client";
import api from "@/api";
import DropdownMenuButton from "@/components/Dropdown/DropdownMenuButton";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import React from "react";

function DropdownMenuForFeedback({ feedbackId, onEdit }) {
  const queryClient = useQueryClient();

  const params = useParams();
  const workId = params.workId;
  const { mutate: deleteFeedback } = useMutation({
    mutationFn: (feedbackId) => api.deleteFeedback(feedbackId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["feedbacks", { workId }],
      });
    },
  });

  return (
    <DropdownMenuButton
      menus={[
        {
          label: "수정하기",
          onClick: onEdit,
        },
        {
          label: "삭제하기",
          onClick: () => deleteFeedback(feedbackId),
        },
      ]}
    />
  );
}

export default DropdownMenuForFeedback;
