import React from "react";
import style from "./DialogItem.module.css";
import dayjs from "dayjs";

export const DialogItem = ({ content, date, last = false }) => {
  return (
    <div className={`${style.container} ${last ? style.last : ""}`}>
      <p className={style.content}>{content}</p>
      <p className={style.date}>{dayjs(date).format("YYYY.MM.DD")}</p>
    </div>
  );
};
