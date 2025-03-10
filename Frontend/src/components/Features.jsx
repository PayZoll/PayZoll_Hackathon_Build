import { motion } from "framer-motion";
import { useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import useMeasure from "react-use-measure";

const CARD_WIDTH = 350;
const CARD_HEIGHT = 380;
const MARGIN = 30;
const CARD_SIZE = CARD_WIDTH + MARGIN;
const VISIBLE_CARDS = 3; // Only show 3 cards at a time

const CardCarousel = () => {
  const [ref, { width }] = useMeasure();
  const [offset, setOffset] = useState(0);

  const totalWidth = CARD_SIZE * items.length;
  const visibleWidth = VISIBLE_CARDS * CARD_SIZE;
  const CAN_SHIFT_LEFT = offset < 0;
  const CAN_SHIFT_RIGHT = Math.abs(offset) < totalWidth - visibleWidth;

  const shiftLeft = () => {
    if (!CAN_SHIFT_LEFT) return;
    setOffset((pv) => Math.min(pv + CARD_SIZE, 0));
  };

  const shiftRight = () => {
    if (!CAN_SHIFT_RIGHT) return;
    setOffset((pv) => Math.max(pv - CARD_SIZE, -(totalWidth - visibleWidth)));
  };

  return (
    <section id="features" ref={ref} className="flex flex-col items-center">
      <div className="relative overflow-hidden mx-auto w-full"> 
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-100 leading-tight mb-4">
            Why Choose <span className="gradient-text">Us</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Discover the advantages of our decentralized payroll solution
          </p>
        </div>

        {/* Cards */}
        <div className="relative w-full mx-auto px-6 py-8">
          <motion.div animate={{ x: offset }} className="flex justify-center">
            {items.map((item) => (
              <Card key={item.id} {...item} />
            ))}
          </motion.div>
        </div>

        {/* Buttons */}
        <>
          <motion.button
            initial={false}
            animate={{ x: CAN_SHIFT_LEFT ? "0%" : "-100%" }}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-30 rounded-r-xl glass-effect p-4 pl-3 text-4xl text-purple-400"
            onClick={shiftLeft}
          >
            <FiChevronLeft />
          </motion.button>
          <motion.button
            initial={false}
            animate={{ x: CAN_SHIFT_RIGHT ? "0%" : "100%" }}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-30 rounded-l-xl glass-effect p-4 pr-3 text-4xl text-purple-400"
            onClick={shiftRight}
          >
            <FiChevronRight />
          </motion.button>
        </>
      </div>
    </section>
  );
};

const Card = ({ url, category, title, description }) => {
  return (
    <div
      className="relative shrink-0 cursor-pointer rounded-2xl shadow-md"
      style={{
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        marginRight: MARGIN,
        backgroundImage: `url(${url})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <div className="absolute inset-0 z-20 rounded-2xl bg-gradient-to-b from-black/90 via-black/60 to-black/0 p-8 text-white">
        <span className="text-xs font-semibold uppercase tracking-wider text-purple-300">
          {category}
        </span>
        <p className="my-3 text-2xl font-bold">{title}</p>
        <p className="text-base text-slate-300 leading-relaxed">{description}</p>
      </div>
    </div>
  );
};

export default CardCarousel;

const items = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1501167786227-4cba60f6d58f?auto=format&fit=crop&q=80&w=1200",
    category: "Payments",
    title: "Instant Global Transactions",
    description: "Execute payouts to your global workforce simultaneously, eliminating delays and reducing costs.",
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200",
    category: "Security",
    title: "Privacy by Design",
    description: "Zero-Knowledge Proofs ensure complete data privacy while maintaining full compliance.",
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200",
    category: "Compliance",
    title: "Automated Compliance",
    description: "Smart contracts handle tax deductions and reporting automatically.",
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&q=80&w=1200",
    category: "Equity",
    title: "ESOP Management",
    description: "Manage tokenized equity compensation with transparent claiming processes.",
  },
  {
    id: 5,
    url: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&q=80&w=1200",
    category: "Global",
    title: "Global Coverage",
    description: "Pay your team anywhere in the world with instant crypto transactions.",
  },
];
