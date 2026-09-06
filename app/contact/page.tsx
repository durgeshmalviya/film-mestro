'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import MuxPlayer from "@mux/mux-player-react";
import Navbar from '../components/Nav';
import { MapPin, Camera, Sparkles, ArrowRight } from 'lucide-react';

interface FormData {
  name: string
  email: string
  contact: string
  projectType: string
  message: string
}

const projectTypes = [
  'Fashion Photography',
  'Editorial Shoot',
  'Commercial Campaign',
  'Brand Film',
  'Product Photography',
  'Other'
]

const recentWorks = [
  {
    id: 1,
    playbackId: 'SwU4J7c8cBQ12FzaHkNqehQPY02WbfWCLGeMe5Acw00XU',
    title: 'Luxury Wear Spring 24',
    location: 'Mumbai',
    type: 'Fashion Film'
  },
  {
    id: 2,
    playbackId: 'kAmgd166Ny02AUB9Gad2SbDbjmPI4x00ZsaRkkRqy5uY4',
    title: 'Editorial Excellence',
    location: 'Bhopal',
    type: 'Editorial'
  },
  {
    id: 3,
    playbackId: 'AoxCMbUmrAu3QsGG00TKT00eX00g00fAozbE3muiJidBGN8',
    title: 'Brand Identity Campaign',
    location: 'Pan India',
    type: 'Commercial'
  }
]

const serviceLocations = [
  { city: 'Bhopal', region: 'Central India', specialization: 'Fashion & Editorial' },
  { city: 'Mumbai', region: 'Western India', specialization: 'Commercial & Luxury' },
  { city: 'Pan India', region: 'All Regions', specialization: 'Travel & Location Shoots' }
]

export default function SendEmail() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    contact: '',
    projectType: '',
    message: '',
  })
  const [selectedWork, setSelectedWork] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    try {
      const res = await fetch('/api/sendEmail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await res.json()
      if (res.ok) {
        setMessage('Thank you. We will get back to you shortly.')
        setFormData({ name: '', email: '', contact: '', projectType: '', message: '' })
      } else {
        setMessage(`Error: ${data.error || 'Something went wrong'}`)
      }
    } catch (err) {
      setMessage('Failed to send message. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Navbar />
      <section className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-[#F7F3EE] to-[#FBF9F7]">
        

        {/* ===== HERO SECTION ===== */}
        <div className="relative z-10 px-6 py-20 md:py-32">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9 }}
              className="text-center mb-16"
            >
              <div className="flex items-center justify-center gap-2 mb-4">
               
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#8A7A6A]">
                  Fashion Photography Studio <div
                itemProp="name"
                className="font-script text-5xl md:text-6xl text-[#a68b6a] mb-1 leading-none"
              >
                Maestro
              </div>
              
                Fashion Films & Photography
              

                </p> 
              </div>
              <h1 className="text-5xl md:text-7xl font-light text-[#2a2a2a] mb-6 tracking-tight">
                Cinematic <span className="font-semibold">Fashion Vision</span>
              </h1>
              <p className="text-lg md:text-xl text-[#6B5D54] max-w-2xl mx-auto leading-relaxed">
                Serving fashion brands, editorial publications, and luxury campaigns across Bhopal, Mumbai, and India. Premium production quality meets creative excellence.
              </p>
            </motion.div>

            {/* ===== SERVICE LOCATIONS GRID ===== */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="grid md:grid-cols-3 gap-6  "
            >
              {serviceLocations.map((location, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-[#E8DFD4] bg-white/70 backdrop-blur-sm p-6 hover:shadow-lg transition-all duration-500"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <MapPin size={20} className="text-[#C4785A] flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="text-lg font-semibold text-[#2a2a2a]">{location.city}</h3>
                      <p className="text-sm text-[#8A7A6A]">{location.region}</p>
                    </div>
                  </div>
                  <p className="text-sm text-[#6B5D54] leading-relaxed">
                    Specializing in {location.specialization}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
 

        {/* ===== CONTENT & FORM SECTION ===== */}
        <div className="relative z-10 px-6 -mt-10  ">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-start">
              {/* ===== LEFT: EXPERTISE SECTION ===== */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-4xl font-light text-[#2a2a2a] mb-8">Why Choose Maestro</h2>
                
                <div className="space-y-6">
                  {[
                    {
                      icon: Camera,
                      title: 'Professional Production',
                      desc: 'High-end cinematography & photography for fashion brands and editorial clients'
                    },
                    {
                      icon: Sparkles,
                      title: 'Creative Excellence',
                      desc: 'Award-winning team specializing in luxury fashion and commercial storytelling'
                    },
                    {
                      icon: MapPin,
                      title: 'Multi-Location Shoots',
                      desc: 'Full-service production across Bhopal, Mumbai, and pan-India locations'
                    }
                  ].map((item, idx) => {
                    const Icon = item.icon
                    return (
                      <div key={idx} className="flex gap-4">
                        <Icon size={24} className="text-[#C4785A] flex-shrink-0 mt-1" />
                        <div>
                          <h3 className="font-semibold text-[#2a2a2a] mb-2">{item.title}</h3>
                          <p className="text-[#6B5D54] text-sm leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>

                {/* SEO Trust Signals */}
                <div className="mt-10 pt-10 border-t border-[#E8DFD4]">
                  <p className="text-xs uppercase tracking-[0.2em] text-[#8A7A6A] mb-4">Studio Info</p>
                  <div className="space-y-3 text-sm text-[#6B5D54]">
                    <p><strong>Years of Experience:</strong> 40+ years in fashion & commercial production</p>
                    <p><strong>Service Areas:</strong> Bhopal, Mumbai, Pan India</p>
                    <p><strong>Specialization:</strong> Fashion photography, editorial shoots, brand films, commercial campaigns</p>
                  </div>
                </div>
              </motion.div>

              {/* ===== RIGHT: CONTACT FORM ===== */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="rounded-2xl border border-[#E8DFD4] bg-white/90 backdrop-blur-sm p-8 shadow-[0_20px_50px_-20px_rgba(92,78,66,0.15)]"
              >
                <h3 className="text-2xl font-semibold text-[#2a2a2a] mb-6">Get in Touch</h3>

                {message && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`mb-6 rounded-lg px-4 py-3 text-sm ${
                      message.includes('Error') || message.includes('Failed')
                        ? 'bg-red-50 text-red-700'
                        : 'bg-green-50 text-green-700'
                    }`}
                  >
                    {message}
                  </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-[0.15em] text-[#8A7A6A] mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full border-b-2 border-[#D9CFC3] bg-transparent py-2.5 text-[#2a2a2a] placeholder:text-[#B5A99A] focus:border-[#C4785A] focus:outline-none transition-colors duration-300"
                      placeholder="Your name"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-[0.15em] text-[#8A7A6A] mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full border-b-2 border-[#D9CFC3] bg-transparent py-2.5 text-[#2a2a2a] placeholder:text-[#B5A99A] focus:border-[#C4785A] focus:outline-none transition-colors duration-300"
                      placeholder="your@email.com"
                    />
                  </div>

                  {/* Contact */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-[0.15em] text-[#8A7A6A] mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="contact"
                      value={formData.contact}
                      onChange={handleChange}
                      className="w-full border-b-2 border-[#D9CFC3] bg-transparent py-2.5 text-[#2a2a2a] placeholder:text-[#B5A99A] focus:border-[#C4785A] focus:outline-none transition-colors duration-300"
                      placeholder="+91 75820 05558"
                    />
                  </div>

                  {/* Project Type */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-[0.15em] text-[#8A7A6A] mb-2">
                      Project Type
                    </label>
                    <select
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleChange}
                      required
                      className="w-full border-b-2 border-[#D9CFC3] bg-transparent py-2.5 text-[#2a2a2a] focus:border-[#C4785A] focus:outline-none transition-colors duration-300"
                    >
                      <option value="">Select a project type</option>
                      {projectTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-[0.15em] text-[#8A7A6A] mb-2">
                      Project Brief
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={3}
                      className="w-full resize-none border-b-2 border-[#D9CFC3] bg-transparent py-2.5 text-[#2a2a2a] placeholder:text-[#B5A99A] focus:border-[#C4785A] focus:outline-none transition-colors duration-300"
                      placeholder="Tell us about your shoot or campaign..."
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-3">
                    <button
                      type="submit"
                      disabled={loading}
                      className="group relative w-full overflow-hidden rounded-full bg-[#2a2a2a] py-3 text-sm font-semibold uppercase tracking-[0.2em] text-white transition-all duration-500 hover:bg-[#C4785A] disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      <span>{loading ? 'Sending...' : 'Send Inquiry'}</span>
                      {!loading && <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />}
                    </button>
                  </div>
                </form>

                <p className="text-xs text-[#8A7A6A] text-center mt-6">
                  We respond to inquiries within 24 hours
                </p>
              </motion.div>
            </div>
          </div>
        </div>

        {/* ===== SEO FOOTER ===== */}
        <div className="relative z-10 px-6 py-16 border-t border-[#E8DFD4] bg-white/50 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="grid md:grid-cols-2 gap-12"
            >
              <div>
                <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-[#8A7A6A] mb-4">Service Locations</h4>
                <p className="text-[#6B5D54] text-sm leading-relaxed">
                  Professional fashion photography and video production services in <strong>Bhopal</strong>, <strong>Mumbai</strong>, and across <strong>Pan India</strong>. Specializing in editorial shoots, commercial campaigns, luxury brand films, and fashion photography for discerning clients.
                </p>
              </div>
              <div>
                <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-[#8A7A6A] mb-4">Our Expertise</h4>
                <ul className="text-[#6B5D54] text-sm space-y-2">
                  <li>✓ Fashion Photography & Videography</li>
                  <li>✓ Editorial & Magazine Shoots</li>
                  <li>✓ Commercial & Advertising Campaigns</li>
                  <li>✓ Luxury Brand Films & Storytelling</li>
                  <li>✓ Product Photography</li>
                  <li>✓ Multi-location & Travel Shoots</li>
                </ul>
              </div>
            </motion.div>

            <div className="mt-10 pt-10 border-t border-[#E8DFD4] text-center text-xs text-[#8A7A6A]">
              <p>Maestro Films • Fashion Photography Studio • Since 1982</p>
              <p className="mt-2">Bhopal • Mumbai • Pan India</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}