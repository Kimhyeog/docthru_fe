"use client";
import React from "react";
import style from "./DialogModal.module.css";
import { DialogItem } from "../DialogItem/DialogItem";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "@/api";
import { useAuth } from "@/contexts/AuthContext";

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
        {notification?.map((item, index) => (
          <DialogItem
            last={index === notification.length - 1} // 마지막 요소 판별
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
