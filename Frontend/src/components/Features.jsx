import { motion } from "framer-motion";
import { useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import useMeasure from "react-use-measure";

const CARD_WIDTH = 350;
const CARD_HEIGHT = 350;
const MARGIN = 20;
const CARD_SIZE = CARD_WIDTH + MARGIN;

const BREAKPOINTS = {
  sm: 640,
  lg: 1024,
};

const CardCarousel = () => {
  const [ref, { width }] = useMeasure();
  const [offset, setOffset] = useState(0);

  const CARD_BUFFER =
    width > BREAKPOINTS.lg ? 3 : width > BREAKPOINTS.sm ? 2 : 1;

  const CAN_SHIFT_LEFT = offset < 0;

  const CAN_SHIFT_RIGHT =
    Math.abs(offset) < CARD_SIZE * (items.length - CARD_BUFFER);

  const shiftLeft = () => {
    if (!CAN_SHIFT_LEFT) return;
    setOffset((pv) => pv + CARD_SIZE);
  };

  const shiftRight = () => {
    if (!CAN_SHIFT_RIGHT) return;
    setOffset((pv) => pv - CARD_SIZE);
  };

  return (
    <section id="features" ref={ref}>
      <div className="relative overflow-hidden p-4">
        {/* CARDS */}
        <div className="mx-auto max-w-6xl mb-20">
        <section className="flex flex-col items-center justify-center mt-20">
      <div className="max-w-6xl text-center mb-20">
        <h4 className="text-3xl md:text-7xl font-bold text-gray-100 leading-tight max-w-4xl mb-10 relative inline-block">
          Why Choose <span className="relative">Us?
            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full h-1 bg-yellow-400"></span>
          </span>
            
        </h4>
      </div>
      </section>
          <motion.div
            animate={{ x: offset }}
            className="flex"
          >
            {items.map((item) => (
              <Card key={item.id} {...item} />
            ))}
          </motion.div>
        </div>

        {/* BUTTONS */}
        <>
          <motion.button
            initial={false}
            animate={{ x: CAN_SHIFT_LEFT ? "0%" : "-100%" }}
            className="absolute left-0 top-[60%] z-30 rounded-r-xl bg-slate-100/30 p-3 pl-2 text-4xl text-white backdrop-blur-sm transition-all hover:pl-3"
            onClick={shiftLeft}
          >
            <FiChevronLeft />
          </motion.button>
          <motion.button
            initial={false}
            animate={{ x: CAN_SHIFT_RIGHT ? "0%" : "100%" }}
            className="absolute right-0 top-[60%] z-30 rounded-l-xl bg-slate-100/30 p-3 pr-2 text-4xl text-white backdrop-blur-sm transition-all hover:pr-3"
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
      className="relative shrink-0 cursor-pointer rounded-2xl  shadow-md transition-all hover:scale-[1.015] hover:shadow-xl"
      style={{
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        marginRight: MARGIN,
        backgroundImage: `url(${url})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <div className="absolute inset-0 z-20 rounded-2xl bg-gradient-to-b from-black/90 via-black/60 to-black/0 p-6 text-white transition-all hover:backdrop-blur-sm">
        <span className="text-xs font-semibold uppercase text-violet-300">
          {category}
        </span>
        <p className="my-2 text-3xl font-bold">{title}</p>
        <p className="text-lg text-slate-300">{description}</p>
      </div>
    </div>
  );
};

export default CardCarousel;

const items = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1501167786227-4cba60f6d58f?auto=format&fit=crop&q=80&w=1200",
    category: "Mice",
    title: "Instant Global Transactions",
    description:
      "Execute payouts to your global workforce simultaneously, eliminating delays and reducing costs."
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200",
    category: "Keyboards",
    title: "Privacy by Design",
    description:
      "Zero-Knowledge Proofs ensure complete data privacy while maintaining full compliance.",
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200",
    category: "Monitors",
    title: "Automated Compliance",
    description:
      "Smart contracts handle tax deductions and reporting automatically.",
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&q=80&w=1200",
    category: "Chairs",
    title: "ESOP Management",
    description:
      "Manage tokenized equity compensation with transparent claiming processes.",
  },
  {
    id: 5,
    url: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&q=80&w=1200",
    category: "Lights",
    title: "Global Coverage",
    description:
      "Pay your team anywhere in the world with instant crypto transactions.",
  },
  {
    id: 6,
    url: "https://images.unsplash.com/photo-1556740739-87b5e5f16e57?auto=format&fit=crop&q=80&w=1200",
    category: "Desks",
    title: "Automated Payroll",
    description:
      "Sync your browser's HR data with payroll to automate calculations and payments.",
  },
  {
    id: 7,
    url: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=1200",
    category: "Desks",
    title: "Enterprise Security",
    description:
      "Bank-grade encryption and multi-sig protection for your funds.",
  }
];