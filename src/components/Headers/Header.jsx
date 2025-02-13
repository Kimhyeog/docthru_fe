import Image from "next/image";
import Link from "next/link";
import styles from "./Header.module.css";
import Logo from "@/assets/logo.svg";
import Bell from "@/assets/bell.svg";
import Keyboard from "@/assets/ic_keyboard.svg";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/">
          <Image
            src={Logo}
            alt="Logo"
            width={120}
            height={27}
            style={{ cursor: "pointer" }}
          />
        </Link>
        <nav className={styles.nav}>
          <Link href="/challenge/manage" className={styles.link}>
            챌린지 관리
          </Link>
          <Link href="/challenge/list" className={styles.link}>
            챌린지 목록
          </Link>
        </nav>
      </div>
      <div className={styles.icons}>
        <Image src={Bell} alt="bell" width={24} height={24} />
        <Image src={Keyboard} alt="keyboard" width={24} height={24} />
      </div>
    </header>
  );
};

export default Header;
