import Image from "next/image";
import styles from "./Search.module.css";
import searchIcon from "@/assets/ic_search.svg";

const Search = () => {
  return (
    <div className={styles.container}>
      <Image src={searchIcon} alt="search" width={20} height={20} />
      <input
        type="text"
        placeholder="챌린지 이름을 검색해보세요"
        className={styles.input}
      />
    </div>
  );
};

export default Search;
