import React from "react";
import style from "./DialogItem.module.css";

export const DialogItem = ({ content, date }) => {
  return (
    <div className={style.container}>
      <p className={style.content}>{content}</p>
      <p className={style.date}>{date}</p>
    </div>
  );
};
