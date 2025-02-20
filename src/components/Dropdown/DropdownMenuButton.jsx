"use client";
import { useState } from "react";
import Image from "next/image";
import kebab from "@/assets/ic_kebab.svg";
import styles from "./DrodownMenuButton.module.css";

function DropdownMenuButton({ menus }) {
  const [isDropdown, setIsDropdown] = useState(false);

  const handleButtonClick = () => {
    setIsDropdown(!isDropdown);
  };

  return (
    <div className={styles.relative}>
      <Image
        src={kebab.src}
        width={24}
        height={24}
        alt="kebabicon"
        onClick={handleButtonClick}
      />
      {isDropdown && (
        <div className={styles.absolute}>
          {menus.map((menu, index) => (
            <button
              key={menu.label}
              onClick={() => {
                menu.onClick();
                setIsDropdown(false);
              }}
              className={`${styles.button} ${
                index === 0 ? styles.first : styles.last
              }`}
            >
              {menu.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default DropdownMenuButton;
