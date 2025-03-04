import ChipStatus from "@/components/Chips/ChipStatus";
import style from "./waitingChallengeItem.module.css"; // CSS 모듈 경로를 확인하고 제대로 import
import setTypeEngToKor from "../Utility/setTypeToKor"; // 타입명 한글로 바꾸기
import setUppercaseToCategory from "../Utility/setfieldToCase"; // 대문자명필드 지정한 카테고리명으로 바꾸기

const statusText = {
  WAITING: "승인 대기",
  REJECTED: "신청 거절",
  ACCEPTED: "신청 승인",
  DELETED: "챌린지 삭제",
};

export default function WaitingChallengeItem({
  no,
  docType,
  field,
  title,
  maxParticipants,
  deadline,
  application, // 수정된 부분
}) {
  // application이 없을 경우 '상태 없음' 또는 다른 기본 값을 처리
  const status = application ? application.status : null; // 안전한 접근

  return (
    <div className={style.container}>
      <div className={style.cell}>{no}</div>
      <div className={style.cell}>{setTypeEngToKor(docType)}</div>
      <div className={style.cell}>{setUppercaseToCategory(field)}</div>
      <div className={style.title}>{title}</div>
      <div className={style.cell}>{maxParticipants}</div>
      <div className={style.cell}>
        {new Date(deadline).toLocaleDateString()}
      </div>
      <div className={style.cell}>
        <ChipStatus status={status}>{statusText[status]}</ChipStatus>
      </div>
    </div>
  );
}
