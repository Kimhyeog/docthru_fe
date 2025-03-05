"use client";
import Image from "next/image";
import Link from "next/link";
import styles from "./Header.module.css";
import Logo from "@/assets/logo.svg";
import HeaderLogInMenu from "./HeaderLogInMenu";
import HeaderAdminMenu from "./HeaderAdminMenu";
import { useAuth } from "@/contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import api from "@/api";

const Header = ({ notification }) => {
  const { isLoggedIn } = useAuth();

  const { data: userData } = useQuery({
    queryFn: api.getUserMe,
    queryKey: ["userData"],
    initialData: {},
    enabled: isLoggedIn,
  });

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
          {isLoggedIn && userData.role === "ADMIN" && <HeaderAdminMenu />}
        </nav>
      </div>
      <HeaderLogInMenu userData={userData} notification={notification} />
    </header>
  );
};

export default Header;
