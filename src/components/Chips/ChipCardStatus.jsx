import style from "./ChipCardStatus.module.css";

export default function ChipCardStatus({ type }) {
  if (type === "Recruitment") {
    return <div className={style.recruit_end}>👨‍👩‍👧‍👦 모집이 완료된 상태에요</div>;
  }

  return <div className={style.date_end}>⏰ 챌린지가 마감되었어요</div>; // 기본적으로 아무것도 렌더링하지 않음
}
