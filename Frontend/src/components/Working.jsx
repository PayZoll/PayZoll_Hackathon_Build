import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

type Feature = {
  id: number;
  title: string;
  description: string;
  contentPosition: string;
  imageSrc: string;
};

const features: Feature[] = [
  {
    id: 1,
    title: "Instant Global Transactions",
    description:
      "Execute payouts to your global workforce simultaneously, eliminating delays and reducing costs.",
    contentPosition: "r",
    imageSrc: "/f1.jpg",
  },
  {
    id: 2,
    title: "Privacy By Design",
    description:
      "Zero-Knowledge Proofs ensure complete data privacy while maintaining full compliance.",
    contentPosition: "l",
    imageSrc: "/f2.webp",
  },
  {
    id: 3,
    title: "Automated Compliance",
    description: "Smart contracts handle tax deductions and reporting automatically.",
    contentPosition: "r",
    imageSrc: "/f3.jpeg",
  },
];

const Working = () => {
  return (
    <div className="text-center mt-20">
      <h1 className="text-4xl font-bold">
        Why Choose{" "}
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">
          PayZoll
        </span>
        ?
      </h1>
      <p className="text-gray-400 mt-2">
        Experience the future of payroll management with our cutting-edge features
      </p>
      <SwapColumnFeatures />
    </div>
  );
};

const SwapColumnFeatures = () => {
  const [featureInView, setFeatureInView] = useState<Feature>(features[0]);

  return (
    <section className="relative mx-auto max-w-7xl">
      <SlidingFeatureDisplay featureInView={featureInView} />

      <div className="-mt-[100vh] hidden md:block" />

      {features.map((feature) => (
        <Content
          key={feature.id}
          feature={feature}
          setFeatureInView={setFeatureInView}
        />
      ))}
    </section>
  );
};

const SlidingFeatureDisplay = ({ featureInView }: { featureInView: Feature }) => {
  return (
    <div
      className={`pointer-events-none sticky top-0 z-10 hidden h-screen w-full items-center justify-center md:flex ${
        featureInView.contentPosition === "l" ? "justify-end" : "justify-start"
      }`}
    >
      <motion.div
        layout
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 25,
        }}
        
        className="h-fit w-3/5 rounded-xl p-8">
        <ExampleFeature featureInView={featureInView} />
      </motion.div>
    </div>
  );
};

const Content = ({
  setFeatureInView,
  feature,
}: {
  setFeatureInView: React.Dispatch<React.SetStateAction<Feature>>;
  feature: Feature;
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, {
    margin: "-150px",
  });

  useEffect(() => {
    if (isInView) {
      setFeatureInView(feature);
    }
  }, [isInView, setFeatureInView, feature]);

  return (
    <section
      ref={ref}
      className={`relative z-0 flex h-fit md:h-screen ${
        feature.contentPosition === "l" ? "justify-start" : "justify-end"
      }`}
    >
      <div className="grid h-full w-full place-content-center px-4 py-12 md:w-2/5 md:px-8 md:py-8">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <p className="my-3 text-5xl font-bold">{feature.title}</p>
          <p className="text-slate-600">{feature.description}</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="mt-8 block md:hidden"
        >
          <ExampleFeature featureInView={feature} />
        </motion.div>
      </div>
    </section>
  );
};

const ExampleFeature = ({ featureInView }: { featureInView: Feature }) => {
  return (
    <div className="relative h-96 w-[30rem] rounded-xl shadow-xl overflow-hidden">
      <img
        src={featureInView.imageSrc}
        alt={featureInView.title}
        className="object-cover w-full h-full"
      />
    </div>
  );
};

export default Working;