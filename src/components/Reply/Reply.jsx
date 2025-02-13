import styles from "./Reply.module.css";
import Image from "next/image";
import keyboardIcon from "@/assets/ic_keyboard.svg";

const Reply = ({ username, date, content }) => {
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
          <div>
            <span className={styles.username}>{username}</span>
            <span className={styles.date}>{date}</span>
          </div>
          <button className={styles.moreButton}>⋮</button>
        </div>
        <p className={styles.comment}>{content}</p>
      </div>
    </div>
  );
};

export default Reply;
