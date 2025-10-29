import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Navigation } from "swiper/modules";
export default function MenuSlider() {
  return (
    <div className="menu-slider relative pb-5 border-b">
      <h1 className="md:text-2xl text-md font-bold pb-3 pt-5 mb-2 mt-3  ">
        What's on your mind?
      </h1>
      <Swiper
        slidesPerView={6}
        spaceBetween={0}
        navigation={true}
        loop={true}
        modules={[Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <div className="">
            <img
              className="rounded-[100%] w-[120px]"
              src="	https://assets.box8.co.in/horizontal-rectangle/web/banner/2503"
              alt=""
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="rounded-full">
            <img
              className="rounded-[100%] w-[120px] "
              src="	https://assets.box8.co.in/horizontal-rectangle/web/banner/2500"
              alt=""
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="">
            <img
              className="rounded-[100%] w-[120px]"
              src="	https://assets.box8.co.in/horizontal-rectangle/web/banner/2503"
              alt=""
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="rounded-full">
            <img
              className="rounded-[100%] w-[120px] "
              src="	https://assets.box8.co.in/horizontal-rectangle/web/banner/2500"
              alt=""
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="">
            <img
              className="rounded-[100%] w-[120px]"
              src="	https://assets.box8.co.in/horizontal-rectangle/web/banner/2503"
              alt=""
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="rounded-full">
            <img
              className="rounded-[100%] w-[120px] "
              src="	https://assets.box8.co.in/horizontal-rectangle/web/banner/2500"
              alt=""
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="">
            <img
              className="rounded-[100%] w-[120px]"
              src="	https://assets.box8.co.in/horizontal-rectangle/web/banner/2503"
              alt=""
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="rounded-full">
            <img
              className="rounded-[100%] w-[120px] "
              src="	https://assets.box8.co.in/horizontal-rectangle/web/banner/2500"
              alt=""
            />
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
