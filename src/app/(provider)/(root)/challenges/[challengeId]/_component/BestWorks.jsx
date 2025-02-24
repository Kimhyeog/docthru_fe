"use client";
import React, { useState } from "react";
import styles from "./BestWork.module.css";
import { useQuery } from "@tanstack/react-query";
import api from "@/api";
import { useParams } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import BestWork from "./BestWork";

function BestWorks({ topLikeWorks: initialWorks }) {
  const params = useParams();
  const challengeId = params.challengeId;

  const { data: topLikedWorks } = useQuery({
    queryFn: () => api.getTopLikeWorks(challengeId),
    queryKey: ["topLikedWorks", { challengeId }],
    initialData: initialWorks,
    enabled: !!initialWorks,
  });
  const works = topLikedWorks?.works;

  return (
    <div className={styles.wrap}>
      <Swiper
        navigation={true}
        modules={[Navigation]}
        className={styles.mySwiper}
      >
        {works.map((work) => {
          const user = work.user;
          return (
            <SwiperSlide key={work.id}>
              <BestWork work={work} user={user} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}

export default BestWorks;
