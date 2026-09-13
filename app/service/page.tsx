"use client";
import { motion, type Variants } from "framer-motion";
 
import Link from "next/link";
import {
  FaCheckCircle,
  FaCamera,
  FaStar,
  FaHeart,
  FaCameraRetro,
  FaTools,
} from "react-icons/fa";
import { ArrowUpRight } from "lucide-react";
import Navbar from "@/app/components/Nav";
import Footer from "@/app/components/Footer";

const services = [
  "Fashion Photography",
  "Editorial Shoots",
  "Lookbook & Campaign",
  "Studio Production",
  "On-Location Shoots",
  "Product Photography",
  "Fashion Films & Reels",
  "Social Media Content",
  "Meta & Google Ads Creatives",
  "Brand Films",
];

const focusBlocks = [
  {
    title: "Fashion Photography",
    content:
      "High-end editorial, portfolio, and campaign imagery for models, designers, and luxury brands — precise lighting, considered direction, and delivery that holds across print and digital.",
  },
  {
    title: "Studio & Production",
    content:
      "Full studio and location production: lighting design, talent direction, styling coordination, and refined final delivery for fashion and commercial work.",
  },
  {
    title: "Social Media Handling",
    content:
      "Curated visual systems for Instagram, Reels, and brand presence — consistent in tone, elevated in craft, ready for organic growth and paid amplification.",
  },
  {
    title: "Premium Ads & Campaigns",
    content:
      "Scroll-stopping creatives for Meta and Google — fashion-first assets for launches, lookbooks, and performance campaigns that still look editorial.",
  },
  {
    title: "Fashion Films",
    content:
      "Motion content for campaigns, social, and brand storytelling — from short-form Reels to polished campaign films with cinematic finish.",
  },
  {
    title: "Client-Led Process",
    content:
      "Clear briefs, intentional shoots, and reliable delivery. Built for models, agencies, and brands who want work that feels refined and commercially ready.",
  },
];

const processSteps = [
  "Brief & creative direction",
  "Mood, styling & location plan",
  "Studio or on-location shoot",
  "Selects & refined edit",
  "Final delivery for campaign & social",
];

const offerings = [
  "Editorial & portfolio photography",
  "Lookbook and e-commerce imagery",
  "Campaign and ad stills",
  "Fashion films and Reels",
  "Product and still-life",
  "Social content systems",
  "Meta & Google ad creatives",
  "Multi-location / travel shoots",
];

const insights = [
  {
    label: "Editorial",
    text: "Clean framing, intentional color, and imagery built to last beyond a single season.",
  },
  {
    label: "Commercial",
    text: "Campaign-ready assets that sell the product and the story in one frame.",
  },
  {
    label: "Motion",
    text: "Fashion films and short-form content that feel premium on every screen.",
  },
];
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.06,
    },
  },
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.65,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};
export default function ServicesShowcase() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#f5f1ed] text-[#1a1a1a] font-body selection:bg-[#c9a86c]/25">
        {/* Header */}
        <section className="pt-28 md:pt-32 pb-12 md:pb-16 px-5 md:px-10">
          <div className="max-w-[1400px] mx-auto text-center">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-md tracking-[0.32em] uppercase text-[#c9a86c] mb-2 font-light"
            >
              Maestro Films
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-4xl md:text-5xl lg:text-6xl font-light text-[#c9a86c] mb-5"
            >
              Our Services
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-gold text-base md:text-lg font-light max-w-2xl mx-auto leading-relaxed"
            >
              Fashion photography, studio production, social systems, and premium
              ads — built for models, brands, and campaigns that demand a higher
              standard.
            </motion.p>
          </div>
        </section>

        {/* Service chips */}
        <section className="px-5 md:px-10 pb-16 md:pb-20">
          <div className="max-w-[1400px] mx-auto grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {services.map((service, idx) => (
              <motion.div
              
                key={service}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.04 }}
                className="rounded-sm border border-[#e0d6c8] bg-[#f0ebe4] px-4 py-3.5 flex items-center gap-3 hover:border-[#c9a86c]/50 transition-all duration-400"
              >
                <FaCheckCircle className="text-[#c9a86c] text-sm shrink-0" />
                <span className="text-gold text-sm font-medium tracking-wide">
                  {service}
                </span>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Focus blocks */}
        <section className="px-5 md:px-10 py-16 md:py-20 bg-[#f0ebe4]">
          <div className="max-w-[1400px] mx-auto">
            <div className="mb-12 md:mb-14 max-w-xl">
              <p className="text-[11px] tracking-[0.32em] uppercase text-[#c9a86c] mb-3 font-light">
                What we deliver
              </p>
              <h2 className="text-3xl md:text-4xl font-light text-[#a68b6a]">
                Built around fashion.
                <span className="block italic text-[#a68b6a] mt-1">
                  Directed for impact.
                </span>
              </h2>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {focusBlocks.map((block, idx) => (
                <motion.div
                  key={block.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.06 }}
                  className="flex flex-col h-full min-h-[220px] bg-[#f5f1ed] rounded-sm border border-[#e0d6c8] px-6 py-7 md:px-8 md:py-8 hover:border-[#c9a86c]/40 transition-all duration-500"
                >
                  <h3 className="text-lg md:text-xl font-medium text-gold mb-3 tracking-wide">
                    {block.title}
                  </h3>
                  <p className="text-gold text-sm md:text-[15px] leading-relaxed font-base mt-auto">
                    {block.content}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Process + Offerings */}
        <section className="px-5 md:px-10 py-16 md:py-24">
          <div className="max-w-[1400px] mx-auto grid md:grid-cols-2 gap-8 md:gap-10">
            {/* Process */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative bg-[#f0ebe4] rounded-sm border border-[#e0d6c8] px-7 py-10 md:px-10 md:py-12"
            >
              <div className="absolute -top-5 left-6 bg-[#c9a86c] p-3 rounded-full shadow-md">
                <FaCameraRetro className="text-[#f5f1ed] text-xl" />
              </div>

              <h3 className="text-2xl md:text-3xl font-light text-gold mb-4 mt-2">
                How a shoot runs
              </h3>
              <p className="text-gold text-sm md:text-base leading-relaxed font-light mb-6">
                From first brief to final files — a clear, fashion-led process
                designed for editorial quality and commercial use.
              </p>

              <h4 className="text-sm tracking-[0.15em] uppercase text-[#c9a86c] mb-3 font-medium">
                Process
              </h4>
              <ul className="space-y-2.5">
                {processSteps.map((step) => (
                  <li
                    key={step}
                    className="flex items-start gap-2.5 text-gold text-sm md:text-[15px]"
                  >
                    <FaCheckCircle className="mt-1 text-[#c9a86c] shrink-0 text-sm" />
                    <span className="font-light">{step}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Offerings */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="relative bg-[#f0ebe4] rounded-sm border border-[#e0d6c8] px-7 py-10 md:px-10 md:py-12"
            >
              <div className="absolute -top-5 left-6 bg-[#c9a86c] p-3 rounded-full shadow-md">
                <FaTools className="text-[#f5f1ed] text-xl" />
              </div>

              <h3 className="text-2xl md:text-3xl font-light text-gold mb-4 mt-2">
                What we offer
              </h3>
              <p className="text-gold text-sm md:text-base leading-relaxed font-light mb-6">
                A focused set of services for fashion brands, talent, and
                campaigns — stills, motion, social, and paid media creatives.
              </p>

              <h4 className="text-sm tracking-[0.15em] uppercase text-[#c9a86c] mb-3 font-medium">
                Capabilities
              </h4>
              <ul className="grid sm:grid-cols-2 gap-x-4 gap-y-2 mb-8">
                {offerings.map((s) => (
                  <li
                    key={s}
                    className="text-gold text-sm font-light py-1"
                  >
                    {s}
                  </li>
                ))}
              </ul>

              <h4 className="text-sm tracking-[0.15em] uppercase text-[#c9a86c] mb-3 font-medium">
                Focus
              </h4>
              <ul className="space-y-3">
                {insights.map((item) => (
                  <li key={item.label} className="text-sm text-gold font-light">
                    <span className="font-medium text-gold">{item.label}</span>
                    {" — "}
                    {item.text}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </section>

        {/* Trust row */}
        <section className="px-15 -mt-20  md:px-15  md:py-5 bg-[#f0ebe4] border-y border-[#e0d6c8]">
          <div className="max-w-[1400px] mx-auto grid sm:grid-cols-3 gap-8 text-center md:text-left">
            {[
              {
                icon: FaCamera,
                title: "Fashion-first",
                text: "Editorial precision for portfolios, lookbooks, and campaigns.",
              },
              {
                icon: FaHeart,
                title: "Client-led",
                text: "Clear communication, reliable delivery, long-term relationships.",
              },
              {
                icon: FaStar,
                title: "Campaign-ready",
                text: "Stills and motion prepared for social, print, and paid media.",
              },
            ].map((item) => (
              <div key={item.title} className="flex flex-col sm:flex-row gap-3 items-center sm:items-start">
                <item.icon className="text-[#c9a86c] text-lg shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-base font-medium text-[#1a1a1a] mb-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#5a5a5a] font-light leading-relaxed">
                    {item.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="px-5 md:px-10 py-10 md:py-10">
          <div className="max-w-[1400px] mx-auto text-center">
            <p className="text-[11px] tracking-[0.32em] uppercase text-[#c9a86c] mb-4 font-light">
              Next step
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-gold mb-5">
              Ready to start
              <span className="block italic text-gold mt-1">
                your next project?
              </span>
            </h2>
            <p className="text-gold text-base font-light max-w-lg mx-auto mb-10 leading-relaxed">
              Fashion shoots, studio production, social content, or paid
              campaigns — tell us the brief.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center border shadow-md scale-100 border-red-200 justify-center gap-2 bg-[#c9a86c] text-gold px-10 py-4 text-[12px] tracking-[0.2em] uppercase font-medium transition-all duration-500 hover:bg-[#e0c48a] hover:shadow-[0_0_40px_rgba(201,168,108,0.3)]"
            >
              Inquire
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}