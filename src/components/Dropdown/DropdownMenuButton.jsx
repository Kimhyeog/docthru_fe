"use client";
import { useState } from "react";
import Image from "next/image";
import kebab from "@/assets/ic_kebab.svg";
import styles from "./DropdownMenuButton.module.css";
import OptionButton from "@/assets/ic_option.svg";

function DropdownMenuButton({ menus, option = "general" }) {
  const [isDropdown, setIsDropdown] = useState(false);

  const handleButtonClick = () => {
    setIsDropdown(!isDropdown);
  };

  return (
    <div className={styles.relative}>
      {option === "general" ? (
        <Image
          src={kebab.src}
          width={24}
          height={24}
          alt="kebabicon"
          onClick={handleButtonClick}
        />
      ) : (
        <Image
          src={OptionButton}
          alt="option"
          width={24}
          height={24}
          onClick={handleButtonClick}
        ></Image>
      )}

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
