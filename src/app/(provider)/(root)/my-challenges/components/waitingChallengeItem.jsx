import React from "react";
import style from "./waitingChallengeItem.module.css";

export default function WaitingChallengeItem({
  id,
  docType,
  field,
  title,
  maxParticipants,
  deadline,
  status,
}) {
  return (
    <div className={style.container}>
      <div>{id}</div>
      <div>{docType}</div>
      <div>{field}</div>
      <div className={style.title}>{title}</div>
      <div>{maxParticipants}</div>
      <div>{deadline}</div>
      <div>{status}</div>
    </div>
  );
}
