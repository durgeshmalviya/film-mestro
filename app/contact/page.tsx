'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

interface FormData {
  name: string
  email: string
  contact: string
  message: string
}

export default function SendEmail() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    contact: '',
    message: '',
  })

  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          contact: formData.contact,
          message: formData.message,
        }),
      })

      const data = await res.json()
      if (res.ok) {
        setMessage('We will get back to you soon.')
        setFormData({ name: '', email: '', contact: '', message: '' })
      } else {
        setMessage(`Error: ${data.error}`)
      }
    } catch (err) {
      setMessage('Failed to send message. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const fadeUp =  {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
  }

  return (
    <section className="bg-[#0A0A0A] text-[#F5F5F0] py-24 md:py-32 px-6">
      <div className="max-w-xl mx-auto">

        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
 
          className="text-center mb-14"
        >
          <p className="text-[11px] tracking-[0.4em] uppercase text-[#8A857C] mb-5 font-medium">
            Contact
          </p>
          <h2 className="text-4xl md:text-5xl font-light tracking-tight">
            Get in Touch
          </h2>
          <p className="mt-5 text-[#A8A29A] text-lg font-light">
            Let’s create something extraordinary together.
          </p>
        </motion.div>

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="bg-[#111] border border-white/10 rounded-2xl p-8 md:p-10 shadow-2xl"
        >
          {message && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mb-8 text-sm tracking-wide ${
                message.includes('Error') || message.includes('Failed')
                  ? 'text-red-400'
                  : 'text-[#A8A29A]'
              }`}
            >
              {message}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label className="block text-xs tracking-[0.2em] uppercase text-[#8A857C] mb-2.5">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full bg-transparent border-b border-white/20 text-[#F5F5F0] py-3 px-0 
                           placeholder:text-white/30 focus:outline-none focus:border-white/60 
                           transition-colors duration-300"
                placeholder="Your full name"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs tracking-[0.2em] uppercase text-[#8A857C] mb-2.5">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-transparent border-b border-white/20 text-[#F5F5F0] py-3 px-0 
                           placeholder:text-white/30 focus:outline-none focus:border-white/60 
                           transition-colors duration-300"
                placeholder="your@email.com"
              />
            </div>

            {/* Contact Number */}
            <div>
              <label className="block text-xs tracking-[0.2em] uppercase text-[#8A857C] mb-2.5">
                Contact Number
              </label>
              <input
                type="text"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                className="w-full bg-transparent border-b border-white/20 text-[#F5F5F0] py-3 px-0 
                           placeholder:text-white/30 focus:outline-none focus:border-white/60 
                           transition-colors duration-300"
                placeholder="+91 00000 00000"
              />
            </div>

            {/* Message */}
            <div>
              <label className="block text-xs tracking-[0.2em] uppercase text-[#8A857C] mb-2.5">
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={4}
                className="w-full bg-transparent border-b border-white/20 text-[#F5F5F0] py-3 px-0 
                           placeholder:text-white/30 focus:outline-none focus:border-white/60 
                           transition-colors duration-300 resize-none"
                placeholder="Tell us about your project..."
              />
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full py-4 overflow-hidden rounded-full border border-white/30 
                           text-sm tracking-[0.25em] uppercase font-medium text-[#F5F5F0]
                           transition-all duration-500 hover:border-white disabled:opacity-50"
              >
                <span className="absolute inset-0 w-full h-full bg-white translate-y-full 
                                 group-hover:translate-y-0 transition-transform duration-500 
                                 ease-[0.22,1,0.36,1]" />
                <span className="relative group-hover:text-[#0A0A0A] transition-colors duration-500">
                  {loading ? 'Sending...' : 'Send Message'}
                </span>
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  )
}