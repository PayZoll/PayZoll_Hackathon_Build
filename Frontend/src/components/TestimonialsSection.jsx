import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    quote:
      "PayZoll has made payroll seamless and secure for our global team. It's the future of workforce management!",
    author: "Sarah Chen",
    position: "CEO, TechForward",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150",
  },
  {
    quote:
      "The integration of blockchain technology has eliminated all our cross-border payment hassles. Simply revolutionary!",
    author: "Michael Rodriguez",
    position: "HR Director, GlobalTech Solutions",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150&h=150",
  },
  {
    quote:
      "Zero-knowledge proofs ensure our payroll data stays confidential while maintaining transparency. Exactly what we needed!",
    author: "Emma Thompson",
    position: "CFO, Innovation Labs",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150&h=150",
  },
];

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  return (
    <section className="py-20 bg-crypto-dark relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Trusted by Forward-Thinking Businesses
          </h2>
          <p className="text-xl text-gray-400">
            Join the companies revolutionizing their payroll management
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 p-2 text-gray-400 hover:text-indigo-400 transition-colors"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-full flex-shrink-0 px-8">
                  <div className="bg-crypto-card rounded-2xl p-8 border border-gray-800 hover:border-indigo-600/50 transition-all">
                    <div className="flex flex-col items-center">
                      <img
                        src={testimonial.image}
                        alt={testimonial.author}
                        className="w-20 h-20 rounded-full mb-6 object-cover ring-2 ring-indigo-500/20"
                      />
                      <blockquote className="text-xl text-gray-300 text-center mb-6 italic">
                        "{testimonial.quote}"
                      </blockquote>
                      <cite className="not-italic">
                        <p className="text-lg font-semibold text-white">
                          {testimonial.author}
                        </p>
                        <p className="text-indigo-400">
                          {testimonial.position}
                        </p>
                      </cite>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 p-2 text-gray-400 hover:text-indigo-400 transition-colors"
          >
            <ChevronRight className="w-8 h-8" />
          </button>

          <div className="flex justify-center mt-8 gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                  currentIndex === index
                    ? "bg-gradient-to-r from-indigo-600 to-purple-600"
                    : "bg-gray-700"
                }`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
