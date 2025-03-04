"use client";

import { useEffect, useState } from "react";
import style from "./challenges.module.css";
import Card from "@/components/Card/Card";
import Search from "@/components/Search/Search";
import Button from "@/components/Button/Button";
import { useRouter } from "next/navigation";
import api from "@/api/index";
import React from "react";
import { FilterButton } from "@/components/Button/FilterButton";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { useModalStore } from "@/store/useModalStore";
import LoginCheckModal from "@/components/modals/LoginCheckModal";

export default function ChallengesPage() {
  const router = useRouter();
  const { isLoggedIn } = useAuth();

  const [challenges, setChallenges] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  const [selectedDocType, setSelectedDocType] = useState("");
  const [selectedProgress, setSelectedProgress] = useState("");
  const [selectedField, setSelectedField] = useState("");
  const [inputWord, setKeyWord] = useState("");

  const { checkModalOn, showModal, closeModal } = useModalStore();

  const fetchChallenges = async () => {
    try {
      const pageToSend = currentPage < 1 ? 1 : currentPage;

      const response = await api.getChallenges({
        keyword: inputWord || undefined,
        docType: selectedDocType || undefined,
        progress: selectedProgress || undefined,
        field: Array.isArray(selectedField)
          ? selectedField.join(",")
          : selectedField || undefined,
        page: pageToSend,
      });
      console.log(response);

      setChallenges(response.challenges);
      setTotalPage(Math.max(1, response.totalPages));
    } catch (error) {
      console.error("Error fetching challenges:", error);
      if (error.response) {
        console.error("API response error:", error.response.data);
      } else {
        console.error("Error message:", error.message);
      }
    }
  };

  useEffect(() => {
    fetchChallenges();
  }, [
    currentPage,
    selectedDocType,
    selectedProgress,
    selectedField,
    inputWord,
  ]);

  useEffect(() => {
    if (currentPage > totalPage) {
      setCurrentPage(totalPage);
    }
  }, [totalPage]);

  const totalPages = Math.max(totalPage, 1);

  const onHide = () => {
    closeModal();
    router.push("/login");
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const searchChallenges = (inputText) => {
    setKeyWord(inputText);
    setCurrentPage(1);
  };

  return (
    <>
      <div className={style.container}>
        <header>
          <div className={style.header_head}>
            <h2 className={style.header_title}>챌린지 목록</h2>
            <Button
              type="black"
              text="신규 챌린지 신청 +"
              onClick={() => {
                if (isLoggedIn) {
                  router.push("/create");
                  return;
                }
                showModal("", false);
              }}
            />
          </div>
          <div className={style.header_main}>
            <div className={style.searchWrapper}>
              <FilterButton
                setSelectedField={setSelectedField}
                setDocType={setSelectedDocType}
                setProgress={setSelectedProgress}
                selectedDocType={selectedDocType}
                selectedProgress={selectedProgress}
                selectedField={selectedField}
                onClick={() => {}}
              />
              <Search onSearch={searchChallenges} />
            </div>
          </div>
        </header>

        {challenges.length === 0 ? (
          <p className={style.noChallenges}>아직 챌린지가 없습니다.</p>
        ) : (
          <>
            <main className={style.main}>
              {challenges.map((challenge) => (
                <Link key={challenge.id} href={`/challenges/${challenge.id}`}>
                  <Card key={challenge.id} {...challenge} />
                </Link>
              ))}
            </main>

            <footer className={style.footer}>
              <Button
                type="pageArrow"
                text="<"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              />

              <div className={style.pageNumber}>
                {[...Array(totalPages)].map((_, index) => (
                  <Button
                    key={index + 1}
                    type={`page${
                      currentPage === Number(index + 1) ? "Active" : ""
                    }`}
                    text={String(index + 1)}
                    onClick={() => handlePageChange(index + 1)}
                  />
                ))}
              </div>

              <Button
                type="pageArrow"
                text=">"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              />
            </footer>
          </>
        )}

        <LoginCheckModal show={checkModalOn} onHide={onHide}></LoginCheckModal>
      </div>
    </>
  );
}
