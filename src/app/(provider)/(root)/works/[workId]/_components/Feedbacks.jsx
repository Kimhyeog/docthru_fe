"use client";
import api from "@/api";
import Reply from "@/components/Reply/Reply";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import style from "../work.module.css";

function Feedbacks({ feedbacks: initialFeedbacks }) {
  const params = useParams();
  const workId = params.workId;

  const [pageSize, setPageSize] = useState(3);

  const { data: feedbacksData, isLoading } = useQuery({
    queryFn: () => api.getFeedbacks(workId, pageSize),
    queryKey: ["feedbacks", { workId, pageSize }],
    initialData: initialFeedbacks,
  });
  const feedbacks = feedbacksData.feedbacks;

  const loadMore = () => {
    setPageSize((prev) => prev + 3);
    console.log(pageSize);
  };
  // if (isLoading) return <p>로딩중...</p>;

  return (
    <div className={style.feedbackContainer}>
      <div className={style.feedbacks}>
        {feedbacks?.map((feedback) => {
          return (
            <Reply
              key={feedback.id}
              content={feedback.content}
              username={feedback.user.nickname}
              date={feedback.createdAt}
            />
          );
        })}
      </div>
      {feedbacks.length < feedbacksData.totalCount && (
        <button className={style.loadMore} onClick={loadMore}>
          더보기
        </button>
      )}
    </div>
  );
}

export default Feedbacks;
