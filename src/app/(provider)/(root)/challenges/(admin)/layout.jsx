"use client";
import React, { useEffect, useState } from "react";
import style from "./layout.module.css";
import { basicFont } from "@/assets/fonts";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import api from "@/api/index";
import PopUpModal from "@/components/modals/PopUpModal";

function AdminLayout({ children }) {
  const { isLoggedIn, isAuthInitialized } = useAuth();
  const router = useRouter();
  const [userRole, setUserRole] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalComment, setModalComment] = useState("접근 권한이 없습니다.");
  useEffect(() => {
    if (!isAuthInitialized) return; // 인증 상태 초기화 전이면 아무 작업도 안 함

    if (!isLoggedIn) {
      setModalComment("로그인이 필요합니다.");
      setModalOpen(true);

      return;
    }

    async function fetchUserRole() {
      try {
        const userData = await api.user.getUserMe(); // ✅ API 요청
        if (userData.role !== "ADMIN") {
          setModalOpen(true); // ✅ 모달 열기

          // ✅ 1.5초 후 페이지 이동 (모달이 보일 수 있도록)
        } else {
          setUserRole(userData.role); // ✅ 관리자 권한일 때만 상태 업데이트
        }
      } catch (error) {
        console.error("유저 정보 가져오기 실패:", error);
        alert("유저 정보를 불러오는 데 실패했습니다.");
        router.replace("/login"); // API 요청 실패 시 로그인 페이지로 이동
      }
    }

    fetchUserRole();
  }, [isLoggedIn, isAuthInitialized, router]);

  return (
    <>
      {/* 🚀 모달을 항상 렌더링되도록 위치 변경 */}
      <PopUpModal
        show={modalOpen}
        onHide={() => {
          setModalOpen(false);
          if (isLoggedIn) {
            setTimeout(() => {
              router.replace("/challenges");
            }, 1000);
          } else {
            router.replace("/login");
          }
        }}
      >
        {modalComment}
      </PopUpModal>

      {/* 🚀 관리자 권한이 있을 때만 렌더링 */}
      {userRole === "ADMIN" && (
        <div
          className={style.layout}
          style={{ fontFamily: basicFont.style.fontFamily }}
        >
          {children}
        </div>
      )}
    </>
  );
}

export default AdminLayout;
