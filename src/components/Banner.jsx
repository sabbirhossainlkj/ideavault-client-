"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const slides = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
    title: "Turn Ideas Into Reality",
    desc: "Build, share, and grow your startup ideas with a powerful innovation platform.",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1559136555-9303baea8ebd",
    title: "AI-Powered Innovation",
    desc: "Use modern AI tools to transform your ideas into real-world solutions faster than ever.",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1523961131990-5ea7c61b2107",
    title: "Connect With Creators",
    desc: "Join a community of developers, founders, and innovators shaping the future.",
  },
];

const Banner = () => {
  return (
    <section className="relative w-full h-[80vh] overflow-hidden">

      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop={true}
        className="w-full h-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            
            <div
              className="absolute inset-0 bg-cover bg-center scale-110"
              style={{ backgroundImage: `url(${slide.image})` }}
            />

            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/30" />

            <div className="relative z-20 h-full flex items-center justify-center px-6">

              <div className=" p-8 md:p-12 rounded-2xl text-center max-w-2xl ">

                <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
                  {slide.title}
                </h1>

                <p className="text-gray-200 mb-6">
                  {slide.desc}
                </p>

                <button className="px-8 py-3 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 text-white font-semibold rounded-full hover:scale-105 transition-all shadow-lg">
                  Explore Ideas
                </button>

              </div>

            </div>

          </SwiperSlide>
        ))}
      </Swiper>

      <style>{`
        .swiper-pagination-bullet {
          background: rgba(255,255,255,0.4);
          width: 10px;
          height: 10px;
          opacity: 1;
        }

        .swiper-pagination-bullet-active {
          background: #67e8f9;
          transform: scale(1.3);
        }

        .swiper-pagination {
          bottom: 20px !important;
        }
      `}</style>
    </section>
  );
};

export default Banner;