"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import MuxPlayer from "@mux/mux-player-react";
import type { Variants } from "framer-motion";
import {
  BsArrowUpRight,
  BsCamera,
  BsInstagram,
  BsMegaphone,
} from "react-icons/bs";
import { GiClapperboard } from "react-icons/gi";
import { HiSparkles } from "react-icons/hi";
import { ArrowUpRight, Target, BarChart3, Layers } from "lucide-react";
import Navbar from "@/app/components/Nav";

const fadeUp: Variants = {
  initial: { opacity: 0, y: 28 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.85,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

const stagger: Variants = {
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15,
    },
  },
};

const services = [
  {
    icon: BsCamera,
    title: "Fashion Photography",
    desc: "High-end editorial, portfolio, and campaign imagery crafted for models, designers, and luxury brands.",
  },
  {
    icon: GiClapperboard,
    title: "Production Shoots",
    desc: "Full studio and location production — lighting, direction, styling coordination, and refined delivery.",
  },
  {
    icon: BsInstagram,
    title: "Social Media Handling",
    desc: "Curated visual content systems for Instagram, Reels, and brand presence that stay consistent and elevated.",
  },
  {
    icon: BsMegaphone,
    title: "Premium Ads & Campaigns",
    desc: "Scroll-stopping ad creatives and fashion films designed for paid media, lookbooks, and brand launches.",
  },
];

const pillars = [
  {
    label: "01",
    title: "Editorial Precision",
    text: "Clean direction, intentional framing, and color science that feels timeless on screen and in print.",
  },
  {
    label: "02",
    title: "Model & Talent Focus",
    text: "Portfolio development and on-set direction that helps talent look confident, current, and bookable.",
  },
  {
    label: "03",
    title: "Brand Storytelling",
    text: "Visual systems that carry a brand’s identity across campaigns, socials, and premium advertising.",
  },
];

const adCapabilities = [
  {
    icon: Target,
    title: "Meta Ads (Facebook & Instagram)",
    desc: "Full-funnel campaign setup, creative testing, audience building, and ongoing optimization for fashion and lifestyle brands.",
  },
  {
    icon: BarChart3,
    title: "Google Ads & Performance",
    desc: "Search, Performance Max, and YouTube campaigns structured for awareness, traffic, and conversion with clean creative alignment.",
  },
  {
    icon: Layers,
    title: "Creative + Account Handling",
    desc: "Ad creatives, copy variants, landing consistency, pixel/events hygiene, and monthly reporting — handled end to end.",
  },
];

export default function AdvancedWorkPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (<>
    <Navbar />
    <motion.div
      variants={stagger}
      initial="initial"
      animate="animate"
      className="min-h-screen bg-[#f5f1ed] text-[#1a1a1a] font-body selection:bg-[#c9a86c]/25 selection:text-[#1a1a1a]"
    >
      {/* ════════════════════════════════════════
          HERO
      ════════════════════════════════════════ */}
      <section className="relative min-h-[88vh] flex items-end overflow-hidden bg-[#0a0a0a]">
        <div className="absolute inset-0">
          <MuxPlayer
            playbackId="6hpqD8p47Yod00qbLsLRryTCFcop02wueUgbhhCDUVMAM"
            streamType="on-demand"
            autoPlay
            muted
            loop
            playsInline
            maxResolution="2160p"
            preferPlayback="mse"
            style={{
              "--controls": "none",
              "--media-object-fit": "cover",
              "--media-object-position": "center",
            }}
            className="absolute inset-0 w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/25" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_80%,rgba(201,168,108,0.12),transparent_55%)]" />
        </div>

        <div className="relative z-10 max-w-[1400px] mx-auto w-full px-5 md:px-10 pb-16 md:pb-24 pt-32">
          <motion.div variants={fadeUp}>
            <div className="flex items-center gap-3 mb-5">
              <span className="h-px w-8 bg-[#c9a86c]/70" />
              <p className="text-[11px] tracking-[0.32em] uppercase text-[#c9a86c] font-light">
                Maestro Films · Advanced Work
              </p>
            </div>

            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-[#f5f1ed] leading-[0.95] mb-6 max-w-4xl">
              Fashion photography
              <span className="block italic text-[#c9a86c] mt-2">
                beyond the frame
              </span>
            </h1>

            <p className="max-w-xl text-[#e8e2d9]/90 text-base md:text-lg leading-relaxed font-light mb-10">
              High-end editorial shoots, social media systems, premium ad
              creatives, and full production — designed for models, agencies, and
              luxury brands.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/#contact"
                className="inline-flex items-center justify-center gap-3 bg-[#c9a86c] text-[#0a0a0a] px-8 py-4 text-[12px] tracking-[0.2em] uppercase font-medium transition-all duration-500 hover:bg-[#e0c48a] hover:shadow-[0_0_40px_rgba(201,168,108,0.35)]"
              >
                Book a Session
                <BsArrowUpRight className="w-4 h-4" />
              </Link>
              <Link
                href="/work-studio"
                className="inline-flex items-center justify-center border border-white/25 text-[#c9a86c] px-8 py-4 text-[12px] tracking-[0.2em] uppercase backdrop-blur-sm hover:bg-white/10 hover:border-[#c9a86c]/50 transition-all duration-400"
              >
                View Studio Work
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          INTRO
      ════════════════════════════════════════ */}
      <section className="py-20 md:py-28 px-5 md:px-10 bg-[#f5f1ed]">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          <motion.div variants={fadeUp} className="lg:col-span-5">
            <p className="text-[11px] tracking-[0.32em] uppercase text-[#c9a86c] mb-4 font-light">
              The Studio Approach
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-[2.6rem] font-light text-[#1a1a1a] leading-[1.15] mb-6">
              Built for fashion.
              <br />
              <span className="italic text-[#a68b6a]">Directed for impact.</span>
            </h2>
            <p className="text-[#3a3a3a] text-[15px] md:text-base leading-relaxed font-light max-w-md mb-6">
              From first concept to final delivery, every shoot is treated like an
              editorial commission — precise lighting, considered posing, and
              imagery that holds attention across campaigns and social platforms.
            </p>
            <p className="text-[#3a3a3a] text-[15px] md:text-base leading-relaxed font-light max-w-md">
              We work with models, stylists, and brands who want visuals that feel
              Paris-level refined and commercially ready.
            </p>
          </motion.div>

          <motion.div variants={fadeUp} className="lg:col-span-7">
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              <div className="relative aspect-[3/4] overflow-hidden rounded-sm group">
                <img
                  src="https://ik.imagekit.io/maestrofilms/Img13.jpg?updatedAt=1789046971947&ik-s=3b0b80bf526acf38330852c4e1699cdf8933d3f9"
                  alt="Fashion editorial photography"
                  className="w-full h-full object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>
              <div className="relative aspect-[3/4] overflow-hidden rounded-sm group mt-8 md:mt-12">
                <img
                  src="https://ik.imagekit.io/maestrofilms/Copy%20of%2019.jpg?updatedAt=1788964496268&ik-s=338b83511363071962b3580b846623b01c20cf37"
                  alt="Model portfolio shoot"
                  className="w-full h-full object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          SERVICES
      ════════════════════════════════════════ */}
      <section className="py-6 md:py-8 px-5 md:px-10 bg-[#f0ebe4]">
        <div className="max-w-[1400px] mx-auto">
          <motion.div variants={fadeUp} className="mb-14 md:mb-16 max-w-2xl">
            <p className="text-[11px] tracking-[0.32em] uppercase text-[#c9a86c] mb-4 font-light">
              Core Capabilities
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-[2.5rem] font-light text-[#1a1a1a] leading-tight">
              Photography. Production.
              <span className="block italic text-[#a68b6a]">
                Social. Premium ads.
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
            {services.map((item) => (
              <motion.div
                key={item.title}
                variants={fadeUp}
                className="group relative p-6 md:p-7 border border-[#e0d6c8] rounded-sm bg-[#f5f1ed] hover:border-[#c9a86c]/45 hover:shadow-[0_12px_40px_rgba(201,168,108,0.08)] transition-all duration-500"
              >
                <item.icon className="w-5 h-5 text-[#c9a86c] mb-5 opacity-90" />
                <h3 className="text-[15px] md:text-base font-medium text-[#1a1a1a] tracking-wide mb-3">
                  {item.title}
                </h3>
                <p className="text-[13px] md:text-[14px] text-[#5a5a5a] leading-relaxed font-light">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          SOCIAL + MOTION
      ════════════════════════════════════════ */}
      <section className="py-10 md:py-5 px-5 md:px-10 bg-[#f5f1ed]">
        <div className="max-w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div variants={fadeUp} className="order-2 lg:order-1">
            <div className="relative aspect-video overflow-hidden rounded-sm">
              <MuxPlayer
                playbackId="UpqANwpzG98MxXyKFn6fOLHgXl4RCKrIWxL9wLm9cME"
                streamType="on-demand"
                muted
                loop
                autoPlay
                playsInline
                className="absolute inset-0 w-full h-full transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                style={{
                  '--controls': 'none',
                  '--media-object-fill': 'cover',
                  '--media-object-position': 'top center',
                  transform: 'translateZ(0)',
                  willChange: 'transform',
                  backfaceVisibility: 'hidden',
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6">
                <p className="text-[10px] tracking-[0.28em] uppercase text-white/70 mb-1">
                  Motion Content
                </p>
                <p className="text-white text-lg font-light">
                  Reels · Ads · Campaign Films
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="order-1 lg:order-2">
            <p className="text-[11px] tracking-[0.32em] uppercase text-[#c9a86c] mb-4 font-light">
              Social Media Handling
            </p>
            <h2 className="text-3xl md:text-4xl font-light text-[#1a1a1a] leading-[1.15] mb-6">
              Content that performs
              <span className="block italic text-[#a68b6a]">
                and still looks editorial.
              </span>
            </h2>
            <p className="text-[#3a3a3a] text-[15px] leading-relaxed font-light mb-5 max-w-md">
              We build fashion-first social systems for organic growth and paid
              amplification — consistent in tone, sharp in execution, ready for
              Meta and Google.
            </p>
            <ul className="space-y-3 mb-10">
              {[
                "Instagram & Reels visual systems",
                "Model and brand content calendars",
                "Launch and campaign ad creatives",
                "Vertical + horizontal delivery formats",
              ].map((line) => (
                <li
                  key={line}
                  className="flex items-center gap-3 text-[14px] text-[#3a3a3a] font-light"
                >
                  <HiSparkles className="w-3.5 h-3.5 text-[#c9a86c] shrink-0" />
                  {line}
                </li>
              ))}
            </ul>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 text-[12px] tracking-[0.2em] uppercase text-[#a68b6a] border-b border-[#c9a86c]/40 pb-1 hover:border-[#c9a86c] hover:text-[#1a1a1a] transition-all duration-400"
            >
              Discuss a campaign
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          PREMIUM ADS — META + GOOGLE
      ════════════════════════════════════════ */}
      <section className="py-20 md:py-28 px-5 md:px-10 bg-[#f0ebe4]">
        <div className="max-w-[1400px] mx-auto">
          <motion.div variants={fadeUp} className="mb-14 md:mb-16 max-w-2xl">
            <p className="text-[11px] tracking-[0.32em] uppercase text-[#c9a86c] mb-4 font-light">
              Paid Media & Ads Handling
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-[2.5rem] font-light text-[#1a1a1a] leading-tight">
              Meta. Google.
              <span className="block italic text-[#a68b6a]">
                Premium campaign management.
              </span>
            </h2>
            <p className="mt-5 text-[#3a3a3a] text-[15px] leading-relaxed font-light max-w-xl">
              From creative production to account handling — we run fashion and
              lifestyle campaigns that look elevated and perform with clarity.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 mb-14">
            {adCapabilities.map((item) => (
              <motion.div
                key={item.title}
                variants={fadeUp}
                className="p-6 md:p-8 border border-[#e0d6c8] rounded-sm bg-[#f5f1ed] hover:border-[#c9a86c]/40 transition-all duration-500"
              >
                <item.icon
                  className="w-5 h-5 text-[#c9a86c] mb-5"
                  strokeWidth={1.5}
                />
                <h3 className="text-[15px] md:text-base font-medium text-[#1a1a1a] tracking-wide mb-3">
                  {item.title}
                </h3>
                <p className="text-[13px] md:text-[14px] text-[#5a5a5a] leading-relaxed font-light">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Soft feature strip */}
          <motion.div
            variants={fadeUp}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5"
          >
            {[
              { label: "Creative Testing", text: "Static · Carousel · Reels · UGC-style" },
              { label: "Audience Systems", text: "Lookalikes · Retargeting · Interest stacks" },
              { label: "Tracking Hygiene", text: "Pixels · Events · Conversion clarity" },
              { label: "Reporting", text: "Clear monthly insights & next actions" },
            ].map((item) => (
              <div
                key={item.label}
                className="px-5 py-4 border border-[#e0d6c8]/80 rounded-sm bg-[#f5f1ed]/80"
              >
                <p className="text-[11px] tracking-[0.2em] uppercase text-[#c9a86c] mb-1.5">
                  {item.label}
                </p>
                <p className="text-[13px] text-[#3a3a3a] font-light leading-snug">
                  {item.text}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          PILLARS
      ════════════════════════════════════════ */}
      <section className="py-16 md:py-24 px-5 md:px-10 bg-[#f5f1ed]">
        <div className="max-w-[1400px] mx-auto">
          <motion.div variants={fadeUp} className="text-center mb-14 md:mb-16">
            <p className="text-[11px] tracking-[0.32em] uppercase text-[#c9a86c] mb-4 font-light">
              How we work
            </p>
            <h2 className="text-3xl md:text-4xl font-light text-[#1a1a1a]">
              Three principles. One standard.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            {pillars.map((p) => (
              <motion.div
                key={p.label}
                variants={fadeUp}
                className="text-center md:text-left"
              >
                <p className="text-[12px] tracking-[0.25em] text-[#c9a86c] mb-4 font-light">
                  {p.label}
                </p>
                <h3 className="text-xl md:text-2xl font-light text-[#1a1a1a] mb-4">
                  {p.title}
                </h3>
                <p className="text-[14px] md:text-[15px] text-[#5a5a5a] leading-relaxed font-light max-w-sm md:max-w-none mx-auto md:mx-0">
                  {p.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          IMAGE STRIP
      ════════════════════════════════════════ */}
      <section className="py-12 md:py-16 px-5 md:px-10 bg-[#f0ebe4]">
        <div className="max-w-[1400px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {[
            "https://ik.imagekit.io/maestrofilms/Copy%20of%20MF_08701.jpg?updatedAt=1788964504510&ik-s=9574c59a15a39f35dc5ad7df4e4e130bd0b83602",
            "https://ik.imagekit.io/maestrofilms/03.jpg?updatedAt=1788964500502&ik-s=d64ab9f4817245cc0ad11748f83156bc760603cb",
            "https://ik.imagekit.io/maestrofilms/Copy%20of%20MF_08033.jpg?updatedAt=1788964896019&ik-s=608ec747c1e7a2c59f1efedfbb4661b66df0480c",
            "https://ik.imagekit.io/maestrofilms/MF_07917%20AA.jpg?updatedAt=1788964894343&ik-s=606657fc1ccaa37524ce9c9d250389b7faf28560",
          ].map((src, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="relative aspect-[3/4] overflow-hidden rounded-sm group"
            >
              <img
                src={src}
                alt="Maestro Films fashion work"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
            </motion.div>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════
          CTA
      ════════════════════════════════════════ */}
      <section className="relative py-24 md:py-32 px-5 md:px-10 overflow-hidden">
        <div className="absolute inset-0">
          <MuxPlayer
            playbackId="yCqRdIERZFqOgcxh5gk00FtSrwWoDOGeJlXzyS7YsPVA"
            streamType="on-demand"
            autoPlay="muted"
            muted
            loop
            playsInline
            maxResolution="2160p"
            style={{
              "--controls": "none",
              "--media-object-fit": "cover",
            }}
            className="absolute inset-0 w-full h-full"
          />
          <div className="absolute inset-0 bg-black/55" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.55)_70%)]" />
        </div>

        <div className="relative z-10 max-w-[1400px] mx-auto text-center">
          <motion.div variants={fadeUp}>
            <p className="text-[11px] tracking-[0.32em] uppercase text-[#c9a86c]/90 mb-5 font-light">
              Next Step
            </p>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-light text-white mb-6 leading-tight">
              Ready to elevate
              <span className="block italic text-[#c9a86c] mt-2">
                your visual identity?
              </span>
            </h2>
            <p className="text-[#e8e2d9]/90 mb-12 max-w-lg mx-auto text-base font-light">
              Fashion shoots, social systems, Meta & Google ads, and full
              production — tell us the brief.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/#contact"
                className="inline-flex items-center justify-center gap-3 bg-[#c9a86c] text-[#0a0a0a] px-10 py-4 text-[12px] tracking-[0.2em] uppercase font-medium transition-all duration-500 hover:bg-[#e0c48a] hover:shadow-[0_0_50px_rgba(201,168,108,0.35)]"
              >
                Start a Project
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <Link
                href="/reels"
                className="inline-flex items-center justify-center border border-white/25 text-[#c9a86c] px-10 py-4 text-[12px] tracking-[0.2em] uppercase hover:bg-white/10 hover:border-[#c9a86c]/50 transition-all duration-400"
              >
                Watch Reels
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  </>);
}