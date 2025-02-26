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
import "./slider.css";
import nextButton from "@/assets/btn_right.svg";
import Image from "next/image";

function BestWorks({ topLikeWorks: initialWorks }) {
  const params = useParams();
  const challengeId = params.challengeId;
  const [currentIndex, setCurrentIndex] = useState(0);

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
        // navigation={true}
        navigation={{ nextEl: ".next" }}
        modules={[Navigation]}
        className="mySwiper"
        slidesPerView={works.length === 1 ? 1 : 1.08}
        spaceBetween={20}
        onSlideChange={(swiper) => setCurrentIndex(swiper.activeIndex)}
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
      {currentIndex < works.length - 1 && (
        <Image
          src={nextButton}
          alt="nextButton"
          width={40}
          height={40}
          className="next"
        />
      )}
    </div>
  );
}

export default BestWorks;
