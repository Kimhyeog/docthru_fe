"use client";
import React, { useEffect, useState } from "react";
import TextInput from "@/components/Input/TextInput";
import PasswordInput from "@/components/Input/PasswordInput";
import Button from "@/components/Button/Button";
import style from "../LogIn.module.css";
import { useMutation } from "@tanstack/react-query";
import api from "@/api";
import PopUpModal from "@/components/modals/PopUpModal";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useModalStore } from "@/store/useModalStore";
import { useLogInValidataion } from "@/hooks/useAuthValidation";
import { useAuth } from "@/contexts/AuthContext";

function LogInForm() {
  const router = useRouter();
  const { logIn } = useAuth();
  const [isValid, setIsValid] = useState(false);
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const { checkModalOn, modalMessage, showModal, closeModal } = useModalStore();
  const { validate, validateForm } = useLogInValidataion(); // 여기를 로그인으로로
  useEffect(() => {
    setIsValid(validateForm(userData));
  }, [userData]);

  const { mutate: logInApi } = useMutation({
    mutationFn: (userData) => api.logIn(userData),
    onSuccess: () => {
      logIn();
      router.back();
    },
    onError: (error) => {
      showModal(error.response?.data || "회원가입 실패", false);
    },
  });

  const handleOnSubmit = (e) => {
    e.preventDefault();
    logInApi(userData);
  };

  const onHide = () => {
    closeModal();
  };

  return (
    <form className={style.authContent} onSubmit={handleOnSubmit}>
      <div className={style.authInput}>
        <TextInput
          label="이메일"
          placeholder="이메일을 입력해주세요"
          value={userData.email}
          onChange={(val) => setUserData((prev) => ({ ...prev, email: val }))}
          validate={(val) => validate("email", val, userData)}
        ></TextInput>
        <PasswordInput
          label="비밀번호"
          placeholder="비밀번호를 입력해주세요"
          value={userData.password}
          onChange={(val) =>
            setUserData((prev) => ({ ...prev, password: val }))
          }
          validate={(val) => validate("password", val)}
        ></PasswordInput>
      </div>
      <Button text="로그인" type="black" disabled={!isValid} width={"100%"} />
      <p className={style.authPrompt}>
        회원이 아니신가요?{" "}
        <Link href="./signup" className={style.link}>
          회원가입하기
        </Link>
      </p>
      <PopUpModal show={checkModalOn} onHide={onHide}>
        {modalMessage}
      </PopUpModal>
    </form>
  );
}

export default LogInForm;
