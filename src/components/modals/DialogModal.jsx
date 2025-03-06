import React from "react";
import style from "./DialogModal.module.css";
import { DialogItem } from "../DialogItem/DialogItem";

const DialogModal = ({ notification }) => {
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
          />
        ))}
      </div>
    </div>
  );
};

export default DialogModal;
