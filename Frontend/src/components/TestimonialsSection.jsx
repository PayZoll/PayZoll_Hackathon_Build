import React from "react";

const testimonials = [
  {
    name: "Delbert Dicki",
    position: "HR Officer at Mailchimp",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150",
    feedback:
      "My favorite thing about PayZoll is the compliance aspect. They make quarterly taxes, onboarding, and everything else so simple and easy, which saves me a ton of time.",
  },
  {
    name: "Chatalyne Devan",
    position: "HR Officer at DocuSign",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150&h=150",
    feedback:
      "As soon as I saw how easy it was to set everything up I liked it, but the first time I ever dealt with customer service is when I really knew we chose the right payroll company.",
  },
  {
    name: "Marshall Beer",
    position: "HR Officer at Basecamp",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150",
    feedback:
      "PayZoll helped me a lot especially with the attendance, so now the marketing team can check in and leave with the offsite application. The payroll process is also very fast.",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="flex flex-col items-center w-full">
      <div className="max-w-6xl mx-auto w-full">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            What Our <span className="gradient-text">Clients Say</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Hear from businesses that have transformed their payroll
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-crypto-card rounded-xl p-8 border border-gray-800 h-full flex flex-col"
            >
              <p className="text-gray-300 text-base leading-relaxed mb-8 flex-grow">{testimonial.feedback}</p>
              
              {/* Profile Info */}
              <div className="flex items-center space-x-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover border border-gray-700"
                />
                <div>
                  <p className="text-white font-medium">{testimonial.name}</p>
                  <p className="text-gray-400 text-sm mt-1">{testimonial.position}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}