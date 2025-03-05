import React from "react";
import style from "./DialogModal.module.css";
import { DialogItem } from "../DialogItem/DialogItem";

const mockData = [
  {
    id: 1,
    content: `‘신청한 챌린지 이름'/’챌린지 이름'에 도전한 작업물에/’챌린지 이름’의 작업물에 작성한 피드백이 수정/삭제되었어요`,
    date: new Date().toLocaleDateString(),
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
  return (
    <div className={style.container}>
      <header className={style.header}>알림</header>
      <div className={style.dialogBox}>
        {mockData.map((item) => (
          <DialogItem key={item.id} content={item.content} date={item.date} />
        ))}
      </div>
    </div>
  );
};

export default DialogModal;
