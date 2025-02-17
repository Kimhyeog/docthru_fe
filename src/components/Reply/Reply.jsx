import styles from "./Reply.module.css";
import Image from "next/image";
import keyboardIcon from "@/assets/ic_keyboard.svg";
import { EllipsisVertical } from "lucide-react";

const Reply = ({ username, date, content }) => {
  const handleMoreOptionsClick = () => {
    // 더보기 버튼 클릭 시
  };
  return (
    <div className={styles.replyContainer}>
      <Image
        src={keyboardIcon}
        alt="User Avatar"
        width={40}
        height={40}
        className={styles.keyboardIcon}
      />
      <div className={styles.replyContent}>
        <div className={styles.header}>
          <div className={styles.userAndDate}>
            <span className={styles.username}>
              {username ? "" : "럽윈즈올"}
            </span>
            <span className={styles.date}>{date ? "" : "24/01/17 15:38"}</span>
          </div>
          <button
            className={styles.moreOptions}
            onClick={handleMoreOptionsClick}
            aria-label="moreOptions"
          >
            <EllipsisVertical />
          </button>
        </div>
        <p className={styles.comment}>
          {content
            ? ""
            : "일반적으로 개발자는 일련의 하드 스킬을 가지고 있어야 -> 일반적으로 개발자는 개인이 갖고 있는 스킬셋에 대한 전문성이 있어야 커리어에서 유망하다고 여겨집니다. 라고 바꾸는게 더 자연스러운 말일 것 같아요"}
        </p>
      </div>
    </div>
  );
};

export default Reply;
