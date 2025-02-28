"use client";
import api from "@/api";
import DropdownMenuButton from "@/components/Dropdown/DropdownMenuButton";
import CheckModal from "@/components/modals/CheckModal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import React, { useState } from "react";

function DropdownMenuForFeedback({ feedbackId, onEdit }) {
  const queryClient = useQueryClient();

  const params = useParams();
  const workId = params.workId;

  const [showModal, setShowModal] = useState(false);

  const { mutate: deleteFeedback } = useMutation({
    mutationFn: (feedbackId) => api.deleteFeedback(feedbackId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["feedbacks", { workId }],
      });
    },
  });

  return (
    <div>
      <DropdownMenuButton
        menus={[
          {
            label: "수정하기",
            onClick: onEdit,
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
        onClick={() => deleteFeedback(feedbackId)}
      />
    </div>
  );
}

export default DropdownMenuForFeedback;
