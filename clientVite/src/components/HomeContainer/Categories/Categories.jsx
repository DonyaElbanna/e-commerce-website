import React, { useState, useEffect } from "react";
import axios from "axios";
import { Virtual } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/virtual";

const Categories = ({ subcats, handleFilter }) => {
  return (
    <>
      <div className="container px-5 mx-auto flex items-center">
        <Swiper
          autoplay
          modules={[Virtual]}
          breakpoints={{
            300: {
              width: 300,
              slidesPerView: 1,
            },
            550: {
              width: 550,
              slidesPerView: 2,
            },
            768: {
              width: 768,
              slidesPerView: 3,
            },
            1024: {
              width: 1024,
              slidesPerView: 4,
            },
          }}
          spaceBetween={20}
          slidesPerView={4}
          loop={true}
          virtual
          className="cursor-pointer relative carousel-center w-100 px-4 pt-4 pb-1 bg-neutral rounded-box my-10"
        >
          <div>
            {subcats.map((cat, index) => (
              <SwiperSlide
                key={cat._id}
                virtualIndex={index}
                onClick={() => handleFilter(cat._id)}
              >
                <div className="carousel-item h-32">
                  <div className="relative block bg-gray-900 group h-28 ">
                    <img
                      src={cat.image}
                      alt={cat.type}
                      className="rounded w-48 h-28 group-hover:opacity-50"
                    />
                    <p className="absolute place-self-center top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all opacity-0 group-hover:opacity-100 group-hover:translate-y-0 text-xl text-white">
                      {cat.type}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </div>
        </Swiper>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1}
          stroke="currentColor"
          className="w-8 h-8 stroke-2	ml-3 animate-ping	"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5"
          />
        </svg>
      </div>
    </>
  );
};

export default Categories;
