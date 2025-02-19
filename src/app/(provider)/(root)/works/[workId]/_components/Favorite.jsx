"use client";
import Image from "next/image";
import heartIcon from "@/assets/ic_heart_small.svg";
import heartEmptyIcon from "@/assets/ic_heart_empty.svg";
import style from "../work.module.css";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/contexts/AuthContext";
import api from "@/api";

function Favorite({ work }) {
  const { isLoggedIn } = useAuth();
  const queryClinet = useQueryClient();
  const workId = work.id;
  const { data: queryWork } = useQuery({
    queryFn: () => api.getWork(workId),
    queryKey: ["work", { workId }],
    initialData: work,
  });
  const { mutate: createLike } = useMutation({
    mutationFn: () => api.createLike(workId),
    onSuccess: () => queryClinet.invalidateQueries(["work", { workId }]),
  });

  const { mutate: deleteLike } = useMutation({
    mutationFn: () => api.deleteLike(workId),
    onSuccess: () => queryClinet.invalidateQueries(["work", { workId }]),
  });
  return (
    <div className={style.favorite}>
      {queryWork.isFavorite ? (
        <div
          onClick={() => {
            if (!isLoggedIn) {
              alert("로그인해");
              return;
            }
            deleteLike(workId);
          }}
        >
          <Image src={heartIcon} alt="heartIcon" />
        </div>
      ) : (
        <div
          onClick={() => {
            if (!isLoggedIn) {
              alert("로그인해");
              return;
            }
            createLike(workId);
          }}
        >
          <Image src={heartEmptyIcon} alt="heartEmptyIcon" />
        </div>
      )}

      <p className={style.favoriteCount}>{queryWork?.likeCount}</p>
    </div>
  );
}

export default Favorite;
