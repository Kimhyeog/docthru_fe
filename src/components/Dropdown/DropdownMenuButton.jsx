"use client";
import { useState } from "react";
import Image from "next/image";
import kebab from "@/assets/ic_kebab.svg";
import OptionButton from "@/assets/ic_option.svg";
import styles from "./DropdownMenuButton.module.css";

function DropdownMenuButton({ menus, option = "general" }) {
  const [isDropdown, setIsDropdown] = useState(false);

  const handleButtonClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
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
          onClick={(e) => handleButtonClick(e)}
        />
      ) : (
        <Image
          src={OptionButton}
          alt="option"
          width={24}
          height={24}
          onClick={(e) => handleButtonClick(e)}
        ></Image>
      )}

      {isDropdown && (
        <div className={styles.absolute}>
          {menus.map((menu, index) => (
            <button
              key={menu.label}
              onClick={(e) => {
                menu.onClick(e);
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
