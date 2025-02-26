import React, { useEffect, useRef, useState } from "react";
import styles from "./sideBar.module.css";
import Image from "next/image";
import List from "@/assets/ic_list.svg";

const Sidebar = ({ width = 280, children }) => {
  const [isOpen, setOpen] = useState(false);
  const [xPosition, setX] = useState(-width);
  const side = useRef();

  // button 클릭 시 토글
  const toggleMenu = () => {
    if (xPosition < 0) {
      setX(0);
      setOpen(true);
    } else {
      setX(-width);
      setOpen(false);
    }
  };

  return (
    <div className={styles.container}>
      <div
        ref={side}
        className={styles.sidebar}
        style={{
          width: `${width}px`,
          height: "100%",
          transform: `translatex(${-xPosition}px)`,
        }}
      >
        <button onClick={() => toggleMenu()} className={styles.button}>
          {isOpen ? (
            <span>X</span>
          ) : (
            <div className={styles.buttonContent}>
              <Image
                src={List}
                alt="sidebar open button"
                className={styles.openBtn}
              />
              <span className={styles.text}>원문</span>
            </div>
          )}
        </button>

        <div className={styles.content}>
          {/* {children} */}
          {isOpen && (
            <iframe
              src="https://www.naver.com"
              width="100%"
              height="100%"
              // style={{ border: "none" }}
            ></iframe>
          )}
        </div>
        {/*사이드바 컴포넌트 내부 값이 구현되는 위치*/}
      </div>
    </div>
  );
};

export default Sidebar;
