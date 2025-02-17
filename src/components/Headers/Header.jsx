import Image from "next/image";
import Link from "next/link";
import styles from "./Header.module.css";
import Logo from "@/assets/logo.svg";
import HeaderLogInMenu from "./HeaderLogInMenu";

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

      <HeaderLogInMenu />
    </header>
  );
};

export default Header;
