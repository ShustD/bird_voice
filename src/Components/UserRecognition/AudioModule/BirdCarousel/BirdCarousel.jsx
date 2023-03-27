
import React, { useEffect, useState } from 'react';
import bird4 from '../../../../assets/UserRecognition/Rectangle 15.png';
import bird2 from '../../../../assets/UserRecognition/Rectangle 16.png';
import bird3 from '../../../../assets/UserRecognition/Rectangle 25.png';
import bird1 from '../../../../assets/UserRecognition/Group 88.png';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cube";
import "swiper/css/pagination";
import "./BirdCarousel.css";
import { EffectCube, Autoplay } from "swiper";

export const BirdCarousel = ({animation}) => {
    const [swiper, setSwiper] = useState(null);

    const handleSwiper = (swiper) => {
      setSwiper(swiper);
    };
  
    useEffect(() => {
      if (animation && swiper !== null) {
        swiper.autoplay.start();
      }
    }, [animation, swiper]);
    return (
        <>
            <Swiper
                effect={"cube"}
                grabCursor={true}
                allowTouchMove={false}
                loop={true}
                speed={1000}
                cubeEffect={{
                    shadow: true,
                    slideShadows: true,
                    shadowOffset: 20,
                    shadowScale: 0.94,
                }}
                autoplay={animation ? {
                    delay: 2000,
                    disableOnInteraction: false,
                  } : false}
                modules={[EffectCube, Autoplay]}
                className="mySwiper"
                onSwiper={handleSwiper}
            >
                {[bird1, bird2, bird3, bird4].map((e, index) => <SwiperSlide key={index}>
                    <img src={e} alt='' />
                </SwiperSlide>
                )}
            </Swiper>
        </>
    );
}
