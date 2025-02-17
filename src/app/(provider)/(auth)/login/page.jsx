"use client";
import Image from "next/image";
import logo from "@/assets/logo.svg";
import style from "./LogIn.module.css";
import LogInForm from "./_components/LogInForm";
import Link from "next/link";

function LogInPage() {
  return (
    <div className={style.authContainer}>
      <Link href="/">
        <Image src={logo} alt="logo" width={320} height={72}></Image>
      </Link>
      <LogInForm />
    </div>
  );
}

export default LogInPage;
