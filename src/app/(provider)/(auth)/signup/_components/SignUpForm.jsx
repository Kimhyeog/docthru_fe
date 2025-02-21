"use client";
import React, { useEffect, useState } from "react";
import TextInput from "@/components/Input/TextInput";
import PasswordInput from "@/components/Input/PasswordInput";
import ConfirmPasswordInput from "@/components/Input/ConfirmPasswordInput";
import Button from "@/components/Button/Button";
import style from "../SignUp.module.css";
import { useMutation } from "@tanstack/react-query";
import api from "@/api";
import PopUpModal from "@/components/modals/PopUpModal";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useModalStore } from "@/store/useModalStore";
import { useSignUpValidataion } from "@/hooks/useAuthValidation";

function SignUpForm() {
  const router = useRouter();
  const [isValid, setIsValid] = useState(false);
  const [userData, setUserData] = useState({
    email: "",
    nickname: "",
    password: "",
    passwordConfirmation: "",
  });

  const { checkModalOn, modalMessage, isSuccess, showModal, closeModal } =
    useModalStore();
  const { validate, validateForm } = useSignUpValidataion();
  useEffect(() => {
    setIsValid(validateForm(userData));
  }, [userData]);

  const { mutate: signUp } = useMutation({
    mutationFn: (userData) => api.signUp(userData),
    onSuccess: () => {
      showModal("가입이 완료되었습니다", true);
    },
    onError: (error) => {
      showModal(error.response?.data || "회원가입 실패", false);
    },
  });

  const handleOnSubmit = (e) => {
    e.preventDefault();
    signUp(userData);
  };

  const onHide = () => {
    closeModal();
    if (isSuccess) {
      router.push("/login");
    }
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
        <TextInput
          label="닉네임"
          placeholder="닉네임을 입력해주세요"
          value={userData.nickname}
          onChange={(val) =>
            setUserData((prev) => ({ ...prev, nickname: val }))
          }
          validate={(val) => validate("nickname", val)}
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
        <ConfirmPasswordInput
          label="비밀번호 확인"
          placeholder="비밀번호를 한번 더 입력해 주세요"
          value={userData.passwordConfirmation}
          password={userData.password}
          onChange={(val) =>
            setUserData((prev) => ({ ...prev, passwordConfirmation: val }))
          }
        ></ConfirmPasswordInput>
      </div>
      <Button text="로그인" type="black" disabled={!isValid} />
      <p className={style.authPrompt}>
        회원이신가요?{" "}
        <Link href="./login" className={style.link}>
          로그인하기
        </Link>
      </p>
      <PopUpModal show={checkModalOn} onHide={onHide}>
        {modalMessage}
      </PopUpModal>
    </form>
  );
}

export default SignUpForm;
