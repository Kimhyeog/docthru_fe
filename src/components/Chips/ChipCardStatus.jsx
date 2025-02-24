import Image from "next/image";
import style from "./ChipCardStatus.module.css";
import deadlineIcon from "@/assets/ic_deadline.svg";
import personIcon from "@/assets/ic_person.svg";

export default function ChipCardStatus({ type }) {
  if (type === "Recruitment") {
    return (
      <div className={style.recruit_end}>
        <Image src={personIcon} width={16} height={16} alt="personIcon" />{" "}
        모집이 완료된 상태에요
      </div>
    );
  }

  return (
    <div className={style.date_end}>
      <Image src={deadlineIcon} width={16} height={16} alt="deadlineIcon" />
      챌린지가 마감되었어요
    </div>
  ); // 기본적으로 아무것도 렌더링하지 않음
}
