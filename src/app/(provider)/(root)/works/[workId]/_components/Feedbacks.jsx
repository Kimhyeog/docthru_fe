"use client";
import api from "@/api";
import Reply from "@/components/Reply/Reply";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import style from "../work.module.css";
import { useAuth } from "@/contexts/AuthContext";

function Feedbacks({ feedbacks: initialFeedbacks }) {
  const params = useParams();
  const workId = params.workId;
  const [pageSize, setPageSize] = useState(3);
  const { isLoggedIn } = useAuth();

  const { data: userMe } = useQuery({
    queryFn: api.getUserMe,
    queryKey: ["userData"],
    enabled: isLoggedIn,
  });

  const { data: feedbacksData, isLoading } = useQuery({
    queryFn: () => api.getFeedbacks(workId),
    queryKey: ["feedbacks", { workId }],
    initialData: initialFeedbacks,
  });
  const feedbacks = feedbacksData.feedbacks;

  const loadMore = () => {
    setPageSize((prev) => prev + 3);
  };
  // if (isLoading) return <p>로딩중...</p>;

  return (
    <div className={style.feedbackContainer}>
      <div className={style.feedbacks}>
        {feedbacks?.slice(0, pageSize).map((feedback) => {
          return (
            <Reply
              key={feedback.id}
              content={feedback.content}
              username={feedback.user.nickname}
              date={feedback.createdAt}
              isMyFeedback={feedback.userId === userMe?.id}
              feedbackId={feedback.id}
            />
          );
        })}
      </div>
      {pageSize < feedbacksData.totalCount && (
        <button className={style.loadMore} onClick={loadMore}>
          더보기
        </button>
      )}
    </div>
  );
}

export default Feedbacks;
