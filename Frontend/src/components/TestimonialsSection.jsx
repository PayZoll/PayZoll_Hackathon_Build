import React from "react";

const testimonials = [
  {
    name: "Delbert Dicki",
    position: "HR Officer at Mailchimp",
    image: "/images/delbert.jpg",
    companyLogo: "/images/mailchimp-logo.png",
    feedback:
      "My favorite thing about Paie is the compliance aspect. They make quarterly taxes, onboarding, and everything else so simple and easy, which saves me a ton of time.",
    positionClass: "translate-x-0", // No shift for 1st card
  },
  {
    name: "Chatalyne Devan",
    position: "HR Officer at DocuSign",
    image: "/images/chatalyne.jpg",
    companyLogo: "/images/docusign-logo.png",
    feedback:
      "As soon as I saw how easy it was to set everything up I liked it, but the first time I ever dealt with customer service is when I really knew we chose the right payroll company.",
    positionClass: "translate-x-10", // Shift right for 2nd card
  },
  {
    name: "Marshall Beer",
    position: "HR Officer at Basecamp",
    image: "/images/marshall.jpg",
    companyLogo: "/images/basecamp-logo.png",
    feedback:
      "Paie helped me a lot especially with the attendance, so now the marketing team can check in and leave with the offsite application. The payroll process is also very fast.",
    positionClass: "translate-x-5", // Shift left for 3rd card
  },
];

export default function Testimonials() {
  return (
    <section className="bg-black py-16 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10">
        {/* Left Section: Heading & Illustration */}
        <div className=" flex flex-col space-y-6">
          <h2 className="text-3xl md:text-6xl font-bold text-white leading-tight ">
            So Ready to <br /> Experience Payzoll?
          </h2>
          <img
            src="/images/testimonial.gif" // Replace with the path to your GIF
            alt="Thumbs Up"
            className="w-64 md:w-96"
          />
        </div>

        {/* Right Section: Testimonials */}
        <div className="md:w-2/3 relative flex flex-col space-y-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`bg-white shadow-lg p-6 rounded-xl flex flex-col space-y-4 relative ${testimonial.positionClass}`}
            >
              {/* Profile Info */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-gray-900 font-semibold">{testimonial.name}</p>
                    <p className="text-gray-500 text-sm">{testimonial.position}</p>
                  </div>
                </div>
                <img
                  src={testimonial.companyLogo}
                  alt="Company Logo"
                  className="w-16"
                />
              </div>

              {/* Testimonial Text */}
              <p className="text-gray-600 text-lg">{testimonial.feedback}</p>
            </div>
          ))}

          {/* Pagination Dots (Static) */}
          <div className="absolute right-[-20px] top-1/2 transform -translate-y-1/2 flex flex-col space-y-2">
            <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
          </div>
        </div>
      </div>
    </section>
  );
}