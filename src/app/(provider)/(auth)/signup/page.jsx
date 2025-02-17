"use client";
import Image from "next/image";
import logo from "@/assets/logo.svg";
import style from "./SignUp.module.css";
import SignUpForm from "./_components/SignUpForm";
import Link from "next/link";

function SignUpPage() {
  return (
    <div className={style.authContainer}>
      <Link href="/">
        <Image src={logo} alt="logo" width={320} height={72}></Image>
      </Link>
      <SignUpForm />
    </div>
  );
}

export default SignUpPage;
