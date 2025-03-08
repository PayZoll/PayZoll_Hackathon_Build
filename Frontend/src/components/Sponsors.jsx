import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";

const sponsors = [
  "/logo1.png",
  "/logo2.png",
  "/logo3.png",
  "/logo1.png",
  "/logo2.png",
  "/logo3.png",
];

export default function Sponsors() {
  return (
    <section className="flex flex-col items-center justify-center mt-10">
      <div className="max-w-6xl text-center mb-20">
        <h2 className="text-3xl md:text-7xl font-bold text-gray-100 leading-tight max-w-4xl mb-10 relative inline-block">
          Our Trusted <span className="relative">Sponsors
            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full h-1 bg-yellow-400"></span>
          </span>
        </h2>
      </div>

      {/* Swiper Carousel */}
      <div className="overflow-hidden w-full">
        <Swiper
          spaceBetween={50}
          slidesPerView={2}
          breakpoints={{
            640: { slidesPerView: 3 },
            768: { slidesPerView: 4 },
            1024: { slidesPerView: 5 },
          }}
          loop={true}
          autoplay={{
            delay: 200,
            disableOnInteraction: false,
          }}
          speed={1000}
          modules={[Autoplay]}
          className="flex items-center"
        >
          {sponsors.map((logo, index) => (
            <SwiperSlide key={index} className="flex justify-center">
              <img
                src={logo}
                alt={`Sponsor ${index + 1}`}
                className="h-16 w-auto grayscale hover:grayscale-0 transition duration-300"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}