"use client";
import React from "react";
import style from "./DialogItem.module.css";
import dayjs from "dayjs";

export const DialogItem = ({ content, date, onClick }) => {
  return (
    <div className={style.container} onClick={onClick}>
      <p className={style.content}>{content}</p>
      <p className={style.date}>{dayjs(date).format("YYYY.MM.DD")}</p>
    </div>
  );
};
