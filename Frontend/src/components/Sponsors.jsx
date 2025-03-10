import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";

// Using high-quality blockchain logo URLs
const sponsors = [
  {
    name: "Ethereum",
    logo: "https://cryptologos.cc/logos/ethereum-eth-logo.png"
  },
  {
    name: "Polygon",
    logo: "https://cryptologos.cc/logos/polygon-matic-logo.png"
  },
  {
    name: "Solana",
    logo: "https://cryptologos.cc/logos/solana-sol-logo.png"
  },
  {
    name: "Arbitrum",
    logo: "https://cryptologos.cc/logos/arbitrum-arb-logo.png"
  },
  {
    name: "Avalanche",
    logo: "https://cryptologos.cc/logos/avalanche-avax-logo.png"
  },
  {
    name: "Chainlink",
    logo: "https://cryptologos.cc/logos/chainlink-link-logo.png"
  },
  {
    name: "Optimism",
    logo: "https://cryptologos.cc/logos/optimism-op-logo.png"
  },
  {
    name: "Base",
    logo: "https://cryptologos.cc/logos/base-logo.png"
  },
  {
    name: "Binance",
    logo: "https://cryptologos.cc/logos/bnb-bnb-logo.png"
  },
  {
    name: "Aave",
    logo: "https://cryptologos.cc/logos/aave-aave-logo.png"
  }
];

export default function Sponsors() {
  return (
    <section id="sponsors" className="flex flex-col items-center w-full">
      <div className="text-center mb-16 w-full">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-100 leading-tight mb-4">
          Our <span className="gradient-text">Partners</span>
        </h2>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
          Trusted by industry leaders in blockchain technology
        </p>
      </div>

      {/* Swiper Carousel */}
      <div className="overflow-hidden w-full px-6 bg-crypto-card/30 py-12 rounded-xl relative">
        {/* Background glow effects */}
        <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-purple-500/10 rounded-full filter blur-3xl"></div>
        <div className="absolute top-1/2 right-1/4 w-32 h-32 bg-indigo-500/10 rounded-full filter blur-3xl"></div>
        
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
          {sponsors.map((sponsor, index) => (
            <SwiperSlide key={index} className="flex justify-center items-center h-28">
              <div className="h-20 w-auto flex items-center justify-center bg-gradient-to-b from-crypto-dark to-crypto-dark/80 p-4 rounded-xl border border-purple-500/10 hover:border-purple-500/30 transition-all duration-300 shadow-lg group">
                <img
                  src={sponsor.logo}
                  alt={sponsor.name}
                  className="h-16 w-auto object-contain filter brightness-125 group-hover:scale-110 transition-transform duration-300"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div className="hidden text-purple-400 text-xl font-bold items-center justify-center">
                  {sponsor.name}
                </div>
                <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">{sponsor.name}</span>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Subtle blockchain pattern */}
      <div className="w-full mt-16 flex justify-center">
        <div className="w-full max-w-4xl h-[1px] bg-gradient-to-r from-transparent via-purple-500/20 to-transparent"></div>
      </div>
    </section>
  );
}