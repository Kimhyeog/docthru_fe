import React from "react";
import style from "./MyChallengeFilterModal.module.css";

const MyChallengeFilterModal = ({ setSortAttendType, setIsOpen }) => {
  const onClickSortType = (e) => {
    setIsOpen(false);
    setSortAttendType(e.target.textContent);
  };

  return (
    <div className={style.container}>
      <div onClick={onClickSortType}>승인 대기</div>
      <div onClick={onClickSortType}>신청 승인</div>
      <div onClick={onClickSortType}>신청 거절</div>
      <div onClick={onClickSortType}>신청 시간 빠른순</div>
      <div onClick={onClickSortType}>신청 시간 느린순</div>
      <div onClick={onClickSortType}>마감 기한 빠른순</div>
      <div onClick={onClickSortType}>마감 기한 느린순</div>
    </div>
  );
};

export default MyChallengeFilterModal;
