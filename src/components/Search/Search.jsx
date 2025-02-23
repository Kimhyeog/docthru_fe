import { useState } from "react";
import Image from "next/image";
import styles from "./Search.module.css";
import searchIcon from "@/assets/ic_search.svg";

const Search = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  // 입력값 변경 시 상태 업데이트
  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // 엔터 키 입력 시 검색 실행
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && searchTerm.trim() !== "") {
      onSearch(searchTerm); // 검색 실행
    }
  };

  return (
    <div className={styles.container}>
      <Image src={searchIcon} alt="search" width={24} height={24} />
      <input
        type="text"
        placeholder="챌린지 이름을 검색해보세요"
        className={styles.input}
        value={searchTerm}
        onChange={handleChange}
        onKeyDown={handleKeyDown} // 수정된 부분
      />
    </div>
  );
};

export default Search;
