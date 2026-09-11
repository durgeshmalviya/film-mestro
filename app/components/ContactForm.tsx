"use client";

import { useRef, useState } from "react";
 
function CornerMark() {
  return (
    <div className="pointer-events-none absolute bottom-3 right-3 md:bottom-4 md:right-4 z-10 opacity-0 group-hover:opacity-80 transition-opacity duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
      <span className="font-serif text-gold text-lg md:text-lg drop-shadow-[0_1px_6px_rgba(0,0,0,0.55)]">
        Maestro films
      </span>
    </div>
  );
}

export default function ContactForm() {
 const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setFormData({ fullName: '', email: '', phone: '', message: '' });
  };

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    message: '',
  });


  return (
    <>
    
      <section id="contact" className="py-10 md:py-14 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14 items-stretch">
            <div className="relative reveal order-2 md:order-1"> 
              <div className="relative h-72 md:h-full min-h-[420px] rounded-sm overflow-hidden shadow-2xl group">
                <img
                  src="https://ik.imagekit.io/maestrofilms/Bg.jpg?updatedAt=null&ik-s=d747a03b935c03a093d0fd778cddb26f056b5e51"
                  alt="Contact Maestro Films"
                  className="protected-image w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
                  loading="lazy"
                  decoding="async"
                  onContextMenu={(e) => e.preventDefault()}
                  onDragStart={(e) => e.preventDefault()}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 z-10">
                  <h2 className="font-body text-3xl md:text-5xl font-light text-gold leading-none mb-1">Let's</h2>
                  <h2 className="font-body text-4xl md:text-7xl font-bold text-gold tracking-tight">TALK</h2>
                </div>
                <CornerMark />
              </div>
            </div>
            <div className="order-1 md:order-2 flex items-center reveal">
              <form onSubmit={handleFormSubmit} className="w-full space-y-6 md:space-y-8 text-gold">
                <div>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleFormChange}
                    placeholder="full name"
                    required
                    className="w-full bg-transparent border-b border-gray-400 py-3  placeholder-gray-500 focus:outline-none focus:border-[#2a2a2a] transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] font-body font-light text-sm tracking-wide"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    placeholder="email"
                    required
                    className="w-full bg-transparent border-b border-gray-400 py-3  placeholder-gray-500 focus:outline-none focus:border-[#2a2a2a] transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] font-body font-light text-sm tracking-wide"
                  />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleFormChange}
                    placeholder="phone"
                    className="w-full bg-transparent border-b border-gray-400 py-3 placeholder-gray-500 focus:outline-none focus:border-[#2a2a2a] transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] font-body font-light text-sm tracking-wide"
                  />
                </div>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleFormChange}
                  placeholder="message"
                  rows={3}
                  required
                  className="w-full bg-transparent border-b border-gray-400 py-3   placeholder-gray-500 focus:outline-none focus:border-[#2a2a2a] transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] resize-none font-body font-light text-sm tracking-wide"
                />
                <button
                  type="submit"
                  className="mt-2 px-8 py-3 bg-[#c4a882] text-white/60 cursor-pointer border-b border-#c4a882  font-body font-medium hover:bg-[#c9a86c] transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] rounded-sm text-xs tracking-wider uppercase shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    
    </>
  );
}