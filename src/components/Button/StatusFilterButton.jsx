import React, { useState } from "react";
import style from "./StatusFilterButton.module.css";
import { IoIosOptions } from "react-icons/io";
import MyChallengeFilterModal from "../modals/MyChallengeFilterModal";

export const StatusFilterButton = ({ sortAttendType, setSortAttendType }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <div className={style.wrapper}>
        <div onClick={toggleModal} className={style.FilterButton}>
          <div className={style.sortType}>{sortAttendType}</div>{" "}
          <IoIosOptions style={{ width: "24px", height: "24px" }} />
        </div>
        {isOpen && (
          <MyChallengeFilterModal
            setIsOpen={setIsOpen}
            setSortAttendType={setSortAttendType}
          />
        )}
      </div>
    </>
  );
};
