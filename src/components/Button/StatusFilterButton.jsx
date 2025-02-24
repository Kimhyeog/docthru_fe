import React, { useState } from "react";
import style from "./StatusFilterButton.module.css";
import { IoIosOptions } from "react-icons/io";
import MyChallengeFilterModal from "../modals/MyChallengeFilterModal";

const statusText = {
  "승인 대기": "WAITING",
  "신청 거절": "REJECTED",
  "신청 승인": "ACCEPTED",
  "챌린지 삭제": "DELETED",
};

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
