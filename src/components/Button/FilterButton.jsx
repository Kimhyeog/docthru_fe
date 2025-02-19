import React, { useState } from "react";
import { FaFilter } from "react-icons/fa";
import style from "./FilterButton.module.css";
import FilterModal from "../modals/FilterModal";

export const FilterButton = ({ setFiledType, setDocType, setProgress }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className={style.wrapper}>
      <div onClick={toggleModal} className={style.FilterButton}>
        <span>필터</span> <FaFilter />
      </div>
      {isOpen && (
        <FilterModal
          setProgress={setProgress}
          setDocType={setDocType}
          setFiledType={setFiledType}
          onClose={toggleModal}
        />
      )}
    </div>
  );
};
