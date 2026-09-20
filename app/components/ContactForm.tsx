"use client";

import { useState } from "react";

function CornerMark() {
  return (
    <div className="pointer-events-none absolute bottom-4 right-4 z-10 opacity-0 group-hover:opacity-90 transition-opacity duration-500">
      <span className="font-serif text-white/90 text-sm tracking-wide drop-shadow-[0_1px_6px_rgba(0,0,0,0.55)]">
        Maestro Films
      </span>
    </div>
  );
}

export default function ContactForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    inquiryType: "",
    budget: "",
    message: "",
  });

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      inquiryType: "",
      budget: "",
      message: "",
    });
  };

  const showBudget = formData.inquiryType === "shoot";

  return (
    <section
      id="contact"
      className="py-10 md:py-16 px-5 md:px-10 lg:px-16 bg-[#f5f1ed]"
      aria-labelledby="contact-heading"
    >
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 lg:gap-20 items-stretch">
          
          {/* Image Side - Hidden on mobile */}
          <div className="relative hidden md:block order-2 md:order-1">
            <div className="relative h-full min-h-[520px] overflow-hidden rounded-sm group">
              <img
                src="https://ik.imagekit.io/mfashion/editorial/maestrofilms-7.jpg?updatedAt=1789720889496&ik-s=8e33738f8ef8a87a3af3589fd9179aab418e3b16"
                alt="Contact Maestro Films - Fashion photography studio"
                className="protected-image w-full h-full object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                loading="lazy"
                decoding="async"
                onContextMenu={(e) => e.preventDefault()}
                onDragStart={(e) => e.preventDefault()}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />

              <div className="absolute bottom-10 left-8 z-10">
                <p className="text-[11px] tracking-[0.28em] uppercase text-white/60 mb-3 font-light">
                  Get in touch
                </p>
                <h2
                  id="contact-heading"
                  className="font-body text-5xl lg:text-6xl font-light text-white leading-none mb-1"
                >
                  Let’s
                </h2>
                <h2 className="font-body text-6xl lg:text-7xl font-medium text-[#c9a86c] tracking-tight">
                  Talk
                </h2>
              </div>

              <CornerMark />
            </div>
          </div>

          {/* Form Side */}
          <div className="order-1 md:order-2 flex items-center">
            <form
              onSubmit={handleFormSubmit}
              className="w-full max-w-lg mx-auto md:mx-0 space-y-7"
              aria-label="Contact form"
            >
              {/* Mobile heading */}
              <div className="md:hidden text-center mb-2">
                <p className="text-[11px] tracking-[0.28em] uppercase text-[#a68b6a] mb-2">
                  Get in touch
                </p>
                <h2 className="font-body text-4xl font-light text-[#a68b6a] leading-none">
                  Let’s <span className="font-medium text-[#c9a86c]">Talk</span>
                </h2>
              </div>

              <p className="text-[12px] tracking-[0.18em] uppercase text-[#a68b6a] text-center md:text-left opacity-80">
                Brief us, and the rest will be taken care of
              </p>

              {/* Full Name */}
              <div>
                <label htmlFor="fullName" className="block text-[11px] tracking-[0.2em] uppercase text-[#a68b6a] mb-2 font-light">
                  Full Name
                </label>
                <input
                  id="fullName"
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleFormChange}
                  placeholder="Your name"
                  required
                  className="w-full bg-transparent border-b border-[#c9a86c]/40 py-3 text-[#1a1a1a] placeholder-[#a68b6a]/50 focus:outline-none focus:border-[#c9a86c] transition-all duration-500 font-light text-[15px] tracking-wide"
                />
              </div>

              {/* Email + Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
                <div>
                  <label htmlFor="email" className="block text-[11px] tracking-[0.2em] uppercase text-[#a68b6a] mb-2 font-light">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    placeholder="your@email.com"
                    required
                    className="w-full bg-transparent border-b border-[#c9a86c]/40 py-3 text-[#1a1a1a] placeholder-[#a68b6a]/50 focus:outline-none focus:border-[#c9a86c] transition-all duration-500 font-light text-[15px] tracking-wide"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-[11px] tracking-[0.2em] uppercase text-[#a68b6a] mb-2 font-light">
                    Phone
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleFormChange}
                    placeholder="+91 00000 00000"
                    className="w-full bg-transparent border-b border-[#c9a86c]/40 py-3 text-[#1a1a1a] placeholder-[#a68b6a]/50 focus:outline-none focus:border-[#c9a86c] transition-all duration-500 font-light text-[15px] tracking-wide"
                  />
                </div>
              </div>

              {/* Inquiry Type (FAQ / Recommendations / Shoot) */}
              <div>
                <label htmlFor="inquiryType" className="block text-[11px] tracking-[0.2em] uppercase text-[#a68b6a] mb-2 font-light">
                  Inquiry Type
                </label>
                <select
                  id="inquiryType"
                  name="inquiryType"
                  value={formData.inquiryType}
                  onChange={handleFormChange}
                  required
                  className="w-full bg-transparent border-b border-[#c9a86c]/40 py-3 text-[#1a1a1a] focus:outline-none focus:border-[#c9a86c] transition-all duration-500 font-light text-[15px] tracking-wide appearance-none"
                >
                  <option value="" disabled>Select an option</option>
                  <option value="faq">FAQ</option>
                  <option value="recommendation">Recommendations</option>
                  <option value="shoot">Shoot Booking</option>
                </select>
              </div>

              {/* Budget - Only shown when "Shoot Booking" is selected */}
              {showBudget && (
                <div>
                  <label htmlFor="budget" className="block text-[11px] tracking-[0.2em] uppercase text-[#a68b6a] mb-2 font-light">
                    Budget
                  </label>
                  <select
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleFormChange}
                    required
                    className="w-full bg-transparent border-b border-[#c9a86c]/40 py-3 text-[#1a1a1a] focus:outline-none focus:border-[#c9a86c] transition-all duration-500 font-light text-[15px] tracking-wide appearance-none"
                  >
                    <option value="" disabled>Select budget range</option>
                    <option value="15k-50k">₹15,000 – ₹50,000</option>
                    <option value="50k-2L">₹50,000 – ₹2,00,000</option>
                    <option value="2L-10L">₹2,00,000 – ₹10,00,000</option>
                  </select>
                </div>
              )}

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-[11px] tracking-[0.2em] uppercase text-[#a68b6a] mb-2 font-light">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleFormChange}
                  placeholder="Tell us about your project..."
                  rows={4}
                  required
                  className="w-full bg-transparent border-b border-[#c9a86c]/40 py-3 text-[#1a1a1a] placeholder-[#a68b6a]/50 focus:outline-none focus:border-[#c9a86c] transition-all duration-500 resize-none font-light text-[15px] tracking-wide"
                />
              </div>

              <button
                type="submit"
                className="mt-2 w-full sm:w-auto px-10 py-3.5 bg-[#c9a86c] text-[#f5f1ed] text-[12px] tracking-[0.2em] uppercase font-medium hover:bg-[#b8975a] transition-all duration-500 rounded-sm"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}