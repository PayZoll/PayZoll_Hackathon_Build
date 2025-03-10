import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";

const sponsors = [
  "/images/logo1.png",
  "/images/logo2.png",
  "/images/logo3.png",
  "/images/logo4.png",
  "/images/logo5.png",
  "/images/logo3.png",
];

export default function Sponsors() {
  return (
    <section id="sponsors">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-100 leading-tight mb-4">
          Our <span className="gradient-text">Partners</span>
        </h2>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
          Trusted by industry leaders
        </p>
      </div>

      {/* Swiper Carousel */}
      <div className="overflow-hidden w-full px-6 bg-crypto-card/30 py-12 rounded-xl">
        <Swiper
          spaceBetween={60}
          slidesPerView={2}
          breakpoints={{
            640: { slidesPerView: 3 },
            768: { slidesPerView: 4 },
            1024: { slidesPerView: 5 },
          }}
          loop={true}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          speed={1000}
          modules={[Autoplay]}
          className="flex items-center"
        >
          {sponsors.map((logo, index) => (
            <SwiperSlide key={index} className="flex justify-center items-center h-24">
              <img
                src={logo}
                alt={`Sponsor ${index + 1}`}
                className="h-14 w-auto grayscale opacity-70"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}