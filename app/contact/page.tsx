'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Navbar from '../components/Nav'
import { MapPin, Camera, Sparkles, ArrowRight } from 'lucide-react'

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
  'Social Media & Ads',
  'Other',
]

const serviceLocations = [
  { city: 'Bhopal', region: 'Central India', specialization: 'Fashion & Editorial' },
  { city: 'Mumbai', region: 'Western India', specialization: 'Commercial & Luxury' },
  { city: 'Pan India', region: 'All Regions', specialization: 'Travel & Location Shoots' },
]

export default function SendEmail() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    contact: '',
    projectType: '',
    message: '',
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    try {
      const res = await fetch('/api/sendmail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (res.ok) {
        setMessage('Thank you. We will get back to you shortly.')
        setFormData({
          name: '',
          email: '',
          contact: '',
          projectType: '',
          message: '',
        })
      } else {
        setMessage(`Error: ${data.error || 'Something went wrong'}`)
      }
    } catch {
      setMessage('Failed to send message. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Navbar />
      <section className="relative min-h-screen w-full overflow-hidden bg-[#f5f1ed]">
        {/* ===== HERO ===== */}
        <div className="relative z-10 px-6 py-20 md:py-28">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9 }}
              className="text-center mb-5 md:mb-2"
            >
              <div className="font-script text-5xl md:text-6xl text-[#a68b6a] mb-3 leading-none">
                Maestro
              </div>
              <p className="text-sm tracking-[0.2em] uppercase text-[#a68b6a] mb-8">
                Fashion Films & Photography
              </p>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-gold mb-6 tracking-tight">
                Cinematic <span className="font-semibold">Fashion Vision</span>
              </h1>
              <p className="text-base md:text-lg text-gold max-w-2xl mx-auto leading-relaxed font-light">
                Serving fashion brands, editorial publications, and luxury campaigns
                across Bhopal, Mumbai, and India. Premium production quality meets
                creative excellence.
              </p>
            </motion.div>
          </div>
        </div>

        {/* ===== CONTENT & FORM ===== */}
        <div className="relative z-10 px-6 pb-20 md:pb-28">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-start">
              {/* LEFT: WHY MAESTRO */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <p className="text-[11px] tracking-[0.32em] uppercase text-gold mb-3 font-light">
                  Why Maestro
                </p>
                <h2 className="text-3xl md:text-4xl font-light text-gold mb-8">
                  Why Choose Maestro
                </h2>

                <div className="space-y-7">
                  {[
                    {
                      icon: Camera,
                      title: 'Professional Production',
                      desc: 'High-end cinematography & photography for fashion brands and editorial clients',
                    },
                    {
                      icon: Sparkles,
                      title: 'Creative Excellence',
                      desc: 'Award-winning team specializing in luxury fashion and commercial storytelling',
                    },
                    {
                      icon: MapPin,
                      title: 'Multi-Location Shoots',
                      desc: 'Full-service production across Bhopal, Mumbai, and pan-India locations',
                    },
                  ].map((item, idx) => {
                    const Icon = item.icon
                    return (
                      <div key={idx} className="flex gap-4">
                        <Icon
                          size={22}
                          className="text-gold flex-shrink-0 mt-1"
                          strokeWidth={1.6}
                        />
                        <div>
                          <h3 className="font-medium text-gold mb-1.5">{item.title}</h3>
                          <p className="text-gold text-sm leading-relaxed font-light">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    )
                  })}
                </div>

                <div className="mt-10 pt-10 border-t border-[#e0d6c8]">
                  <p className="text-[11px] uppercase tracking-[0.25em] text-gold mb-4">
                    Studio Info
                  </p>
                  <div className="space-y-3 text-sm text-gold font-light">
                    <p>
                      <span className="text-gold font-medium">Years of Experience:</span>{' '}
                      40+ years in fashion & commercial production
                    </p>
                    <p>
                      <span className="text-gold font-medium">Service Areas:</span>{' '}
                      Bhopal, Mumbai, Pan India
                    </p>
                    <p>
                      <span className="text-gold font-medium">Specialization:</span>{' '}
                      Fashion photography, editorial shoots, brand films, commercial
                      campaigns, social & ads
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* RIGHT: CONTACT FORM */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="rounded-sm border border-[#e0d6c8] bg-[#f0ebe4] p-7 md:p-8 shadow-[0_16px_48px_-16px_rgba(201,168,108,0.12)]"
              >
                <h3 className="text-xl md:text-2xl font-light text-gold mb-6">
                  Get in Touch
                </h3>

                {message && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`mb-6 rounded-sm px-4 py-3 text-sm ${
                      message.includes('Error') || message.includes('Failed')
                        ? 'bg-[#f5e6e2] text-[#8a4a3a] border border-[#e0c8c0]'
                        : 'bg-[#e8f0e6] text-[#3d5c38] border border-[#c5d6c2]'
                    }`}
                  >
                    {message}
                  </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-[11px] font-medium uppercase tracking-[0.18em] text-gold mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full border-b border-[#d9cfc3] bg-transparent py-2.5 text-[#1a1a1a] placeholder:text-[#b5a99a] focus:border-[#c9a86c] focus:outline-none transition-colors duration-300"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium uppercase tracking-[0.18em] text-[#a68b6a] mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full border-b border-[#d9cfc3] bg-transparent py-2.5 text-[#1a1a1a] placeholder:text-[#b5a99a] focus:border-[#c9a86c] focus:outline-none transition-colors duration-300"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium uppercase tracking-[0.18em] text-[#a68b6a] mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="contact"
                      value={formData.contact}
                      onChange={handleChange}
                      className="w-full border-b border-[#d9cfc3] bg-transparent py-2.5 text-[#1a1a1a] placeholder:text-[#b5a99a] focus:border-[#c9a86c] focus:outline-none transition-colors duration-300"
                      placeholder="+91 75820 05558"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium uppercase tracking-[0.18em] text-gold mb-2">
                      Project Type
                    </label>
                    <select
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleChange}
                      required
                      className="w-full border-b border-[#d9cfc3] bg-[#f5f1ed] py-2.5 text-[#1a1a1a] focus:border-[#c9a86c] focus:outline-none transition-colors duration-300"
                    >
                      <option value="">Select a project type</option>
                      {projectTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium uppercase tracking-[0.18em] text-[#a68b6a] mb-2">
                      Project Brief
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={3}
                      className="w-full resize-none border-b border-[#d9cfc3] bg-transparent py-2.5 text-[#1a1a1a] placeholder:text-[#b5a99a] focus:border-[#c9a86c] focus:outline-none transition-colors duration-300"
                      placeholder="Tell us about your shoot or campaign..."
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="group relative w-full overflow-hidden rounded-sm bg-[#c9a86c] py-3.5 text-[12px] font-medium uppercase tracking-[0.2em]  text-transparent transition-all duration-500 hover:bg-[#e0c48a] hover:shadow-[0_0_32px_rgba(201,168,108,0.3)] disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      <span>{loading ? 'Sending...' : 'Send Inquiry'}</span>
                      {!loading && (
                        <ArrowRight
                          size={16}
                          className="group-hover:translate-x-1 transition-transform"
                        />
                      )}
                    </button>
                  </div>
                </form>

                <p className="text-xs text-[#a68b6a] text-center mt-6">
                  We respond to inquiries within 24 hours
                </p>
              </motion.div>
            </div>
          </div>

          {/* Locations + footer */}
          <div className="py-5 text-center text-xs m-2 text-[#a68b6a]">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="grid md:grid-cols-3 gap-5 md:gap-6"
            >
              {serviceLocations.map((location, idx) => (
                <div
                  key={idx}
                  className="rounded-sm border border-[#e0d6c8] bg-[#f0ebe4] p-6 hover:border-[#c9a86c]/45 hover:shadow-[0_12px_40px_rgba(201,168,108,0.08)] transition-all duration-500"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <MapPin
                      size={18}
                      className="text-[#c9a86c] flex-shrink-0 mt-0.5"
                      strokeWidth={1.75}
                    />
                    <div>
                      <h3 className="text-base font-medium text-gold">{location.city}</h3>
                      <p className="text-sm text-gold">{location.region}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gold leading-relaxed font-light">
                    Specializing in {location.specialization}
                  </p>
                </div>
              ))}
            </motion.div>
            <p className="py-5">Maestro Films · Fashion Photography Studio · Since 1982</p>
          </div>
        </div>
      </section>
    </>
  )
}
