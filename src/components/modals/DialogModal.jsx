"use client";
import React from "react";
import style from "./DialogModal.module.css";
import { DialogItem } from "../DialogItem/DialogItem";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "@/api";
import { useAuth } from "@/contexts/AuthContext";

const mockData = [
  {
    id: 1,
    message: `‘신청한 챌린지 이름'/’챌린지 이름'에 도전한 작업물에/’챌린지 이름’의 작업물에 작성한 피드백이 수정/삭제되었어요`,
    createdAt: new Date().toLocaleDateString(),
  },
  {
    id: 2,
    content: `‘신청한 챌린지 이름'이 승인/거절되었어요`,
    date: new Date().toLocaleDateString(),
  },
  {
    id: 3,
    content: `‘신청한 챌린지 이름'에 작업물이 추가되었어요`,
    date: new Date().toLocaleDateString(),
  },
  {
    id: 4,
    content: `‘챌린지 이름’에 도전한 작업물에 피드백이 추가되었어요`,
    date: new Date().toLocaleDateString(),
  },
  {
    id: 5,
    content: `‘신청한 챌린지 이름'이 마감되었어요`,
    date: new Date().toLocaleDateString(),
  },
  {
    id: 6,
    content: `‘신청한 챌린지 이름'이 망했어요.`,
    date: new Date().toLocaleDateString(),
  },
  {
    id: 7,
    content: `‘개강한거 개싫어요'이 망했어요`,
    date: new Date().toLocaleDateString(),
  },

  {
    id: 8,
    content: `‘1+2+3+4+5+6+7+8+9+10'이 마감되었어요`,
    date: new Date().toLocaleDateString(),
  },
];

const DialogModal = () => {
  const { isLoggedIn } = useAuth();
  const queryClient = useQueryClient();
  const { data: notification } = useQuery({
    queryFn: api.notification.getNotification,
    queryKey: ["notification"],
    enabled: isLoggedIn,
  });

  const { mutate: deleteNotification } = useMutation({
    mutationFn: (id) => api.notification.deleteNotificaiton(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notification"] });
    },
  });
  return (
    <div className={style.container}>
      <header className={style.header}>알림</header>
      <div className={style.dialogBox}>
        {notification?.map((item) => (
          <DialogItem
            key={item.id}
            content={item.message}
            date={item.createdAt}
            onClick={() => deleteNotification(item.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default DialogModal;
