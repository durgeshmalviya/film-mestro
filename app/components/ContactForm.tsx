"use client";

import { useState } from "react";

function CornerMark() {
  return (
    <div className="pointer-events-none absolute bottom-3 right-3 md:bottom-4 md:right-4 z-10 opacity-0 group-hover:opacity-90 transition-opacity duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
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
    message: "",
  });

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setFormData({ fullName: "", email: "", phone: "", message: "" });
  };

  return (
    <section
      id="contact"
      className="py-5 md:py-10 px-5 md:px-10 lg:px-16 bg-[#f5f1ed]"
    >
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 lg:gap-20 items-stretch">
          {/* Image Side */}
          <div className="relative order-2 md:order-1">
            <div className="relative h-80 md:h-full min-h-[460px] overflow-hidden rounded-sm group">
              <img
                src="https://ik.imagekit.io/maestrofilms/Bg.jpg?updatedAt=null&ik-s=d747a03b935c03a093d0fd778cddb26f056b5e51"
                alt="Contact Maestro Films"
                className="protected-image w-full h-full object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                loading="lazy"
                decoding="async"
                onContextMenu={(e) => e.preventDefault()}
                onDragStart={(e) => e.preventDefault()}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />

              <div className="absolute bottom-8 left-7 md:bottom-12 md:left-10 z-10">
                <p className="text-[11px] tracking-[0.28em] uppercase text-white/60 mb-3 font-light">
                  Get in touch
                </p>
                <h2 className="font-body text-4xl md:text-5xl lg:text-6xl font-light text-white leading-none mb-1">
                  Let’s
                </h2>
                <h2 className="font-body text-5xl md:text-6xl lg:text-7xl font-medium text-[#c9a86c] tracking-tight">
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
              className="w-full space-y-8 md:space-y-10"
            >
              <div> <p className="text-[11px] tracking-[0.28em] uppercase text-gold text-center mb-3 font-base text-center ">
                 Brief us, and the rest will be taken care of
                </p>
                <label className="block text-[11px] tracking-[0.2em] uppercase text-[#a68b6a] mb-2 font-light">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleFormChange}
                  placeholder="Your name"
                  required
                  className="w-full bg-transparent border-b border-[#c9a86c]/40 py-3 text-[#1a1a1a] placeholder-[#a68b6a]/50 focus:outline-none focus:border-[#c9a86c] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] font-light text-[15px] tracking-wide"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-[11px] tracking-[0.2em] uppercase text-[#a68b6a] mb-2 font-light">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    placeholder="your@email.com"
                    required
                    className="w-full bg-transparent border-b border-[#c9a86c]/40 py-3 text-[#1a1a1a] placeholder-[#a68b6a]/50 focus:outline-none focus:border-[#c9a86c] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] font-light text-[15px] tracking-wide"
                  />
                </div>
                <div>
                  <label className="block text-[11px] tracking-[0.2em] uppercase text-[#a68b6a] mb-2 font-light">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleFormChange}
                    placeholder="+91 00000 00000"
                    className="w-full bg-transparent border-b border-[#c9a86c]/40 py-3 text-[#1a1a1a] placeholder-[#a68b6a]/50 focus:outline-none focus:border-[#c9a86c] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] font-light text-[15px] tracking-wide"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] tracking-[0.2em] uppercase text-[#a68b6a] mb-2 font-light">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleFormChange}
                  placeholder="Tell us about your project..."
                  rows={4}
                  required
                  className="w-full bg-transparent border-b border-[#c9a86c]/40 py-3 text-[#1a1a1a] placeholder-[#a68b6a]/50 focus:outline-none focus:border-[#c9a86c] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] resize-none font-light text-[15px] tracking-wide"
                />
              </div>

              <button
                type="submit"
                className="mt-2 px-10 py-3.5 bg-[#c9a86c] cursor-pointer text-[#f5f1ed] text-[12px] tracking-[0.2em] uppercase font-medium hover:bg-[#b8975a] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] rounded-sm"
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