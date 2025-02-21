"use client";
import Image from "next/image";
import heartIcon from "@/assets/ic_heart_small.svg";
import heartEmptyIcon from "@/assets/ic_heart_empty.svg";
import style from "../work.module.css";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/contexts/AuthContext";
import api from "@/api";
import { useModalStore } from "@/store/useModalStore";
import LoginCheckModal from "@/components/modals/LoginCheckModal";
import { useRouter } from "next/navigation";

function Favorite({ work }) {
  const { isLoggedIn } = useAuth();
  const queryClinet = useQueryClient();
  const router = useRouter();
  const workId = work.id;
  const { checkModalOn, showModal, closeModal } = useModalStore();
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

  const onHide = () => {
    closeModal();
    router.push("/login");
  };

  return (
    <div className={style.favorite}>
      {queryWork.isFavorite ? (
        <div
          onClick={() => {
            if (!isLoggedIn) {
              showModal("", false);
              return;
            }
            deleteLike(workId);
          }}
        >
          <Image src={heartIcon} alt="heartIcon" width={16} height={16} />
        </div>
      ) : (
        <div
          onClick={() => {
            if (!isLoggedIn) {
              showModal("", false);
              return;
            }
            createLike(workId);
          }}
        >
          <Image
            src={heartEmptyIcon}
            alt="heartEmptyIcon"
            width={16}
            height={16}
          />
        </div>
      )}

      <p className={style.favoriteCount}>{queryWork?.likeCount}</p>
      <LoginCheckModal show={checkModalOn} onHide={onHide}></LoginCheckModal>
    </div>
  );
}

export default Favorite;
