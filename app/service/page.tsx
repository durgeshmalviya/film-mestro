"use client";

import { useEffect } from "react";
  
import { motion } from "framer-motion";
import { FaCheckCircle, FaCamera, FaStar, FaHeart, FaCameraRetro, FaTools } from "react-icons/fa";
import Navbar from "@/app/components/Nav";
import Footer from "@/app/components/Footer";

const services = [
  "Croma Shoot",
  "Croma Shoot with Edit",
  "Croma Shoot Edit with Models",
  "Advertisement Shoot",
  "Reels Edit",
  "Product Shoot",
  "On Location Shoot", 
  "Event Shoot",
  "Music Videos",
  "Documentary Shoot",
];

const infoBlocks = [
  {
    title: "Digital Advertisement",
    delay: 200,
    content: (
      <>
        Digital advertisement refers to promoting products, brands, or services via:
        <span className="font-semibold text-gray-200"> Online Ads, Social Media Ads, Email Marketing, Mobile Ads, Video Ads</span>.
      </>
    ),
  },
  {
    title: "Broadcast Promotional Ads",
    delay: 300,
  },
  {
    title: "Online Broadcasting",
    delay: 400,
    content: (
      <>
        Real-time or on-demand streaming over the internet including
        <span className="font-semibold text-gray-200"> Live streaming, Webcasting, Podcasting, and VOD</span>.
      </>
    ),
  },
  {
    title: "Product or Service Promotion",
    delay: 500,
    content: (
      <>
        Promotion strategies that
        <span className="font-semibold text-gray-200"> drive sales, increase revenue, and build loyalty</span>.
      </>
    ),
  },
  {
    title: "Google In-Stream Ads",
    delay: 600,
    content: (
      <>
        In-stream ads play
        <span className="font-semibold text-gray-200"> before, during, or after</span> video content like YouTube.
      </>
    ),
  },
  {
    title: "Photography Excellence",
    icon: FaCamera,
    delay: 100,
    content: "Top-notch photography to capture your best moments."
  },
  {
    title: "Client Satisfaction",
    icon: FaHeart,
    delay: 200,
    content: "Driven by passion and commitment to client happiness."
  },
  {
    title: "Award-Winning Service",
    icon: FaStar,
    delay: 300,
    content: "Creative, professional wedding storytelling."
  }
];

const cromaDetails = {
  title: "Croma Shoot",
  content: (
    <>
      A Croma Shoot uses a
      <span className="font-semibold text-gray-400"> green or blue screen</span> to digitally replace backgrounds.
    </>
  ),
  steps: [
    "Planning & Concept",
    "Script Preparation",
    "Green/Blue Screen Setup",
    "4K Camera Setup",
    "Lighting: Key, Fill, Backlight"
  ]
};

const equipmentBlock = {
  title: "We Provide & Compare Equipments",
  services: [
    "Traditional Photography",
    "Candid Photography",
    "Cinematic Videography",
    "Drone Videography",
    "Trending Reels",
    "Unique Albums",
    "Traditional Edits",
    "Cinematic Edits",
    "Jimmy Zip (Camera Crane)",
  ],
  details: [
    {
      label: "Traditional Photography",
      text: "captures timeless, posed elegance."
    },
    {
      label: "Candid Style",
      text: "reveals genuine emotions and real moments."
    },
    {
      label: "Cinematic Videography",
      text: "stylish storytelling with emotional depth."
    },
  ]
};

export default function ServicesShowcase() {


  return (
    <>
      <Navbar />
      <div className="mt-20 min-h-screen  text-gray-500 py-16 px-6 md:px-20 font-[Poppins]">
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl md:text-5xl font-bold text-center   mb-12"
        >
          Our Premium Services
        </motion.h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 ">
          {services.map((service, idx) => (
            <div
              key={idx}
              data-aos="fade-up"
              data-aos-delay={idx * 100}
              className="rounded-2xl shadow-lg  text-gary-400 hover:shadow-xl transition-all p-6 flex items-center bg-gray-900 space-x-4"
            >
              <FaCheckCircle className="text-gray-200 text-xl" />
              <span className="text-gray-200 font-medium text-lg ">{service}</span>
            </div>
          ))}
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 mt-20 items-stretch  ">
          {infoBlocks.map((block, idx) => (
            <div
              key={idx}
              data-aos="fade-up"
              data-aos-delay={block.delay}
              className="flex flex-col justify-between h-full min-h-[400px] bg-gray-900  rounded-3xl shadow-2xl px-8 py-10 md:px-14 md:py-12 border border-gray-100"
            >
              {block.icon && (
                <div className="mb-4 w-12 h-12 flex items-center justify-center bg-gray-700 rounded-full">
                  <block.icon className="text-gray-400 text-xl" />
                </div>
              )}

              <motion.h3
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-extrabold mb-4  text-gray-500 bg-clip-text"
              >
                {block.title}
              </motion.h3>

              {block.content && (
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                  viewport={{ once: true }}
                  className="text-gray-100 text-base md:text-lg leading-relaxed mt-auto "
                >
                  {block.content}
                </motion.p>
              )}
            </div>
          ))}
        </div>


        <div className="grid md:grid-cols-2 gap-10 mt-20">
          {/* Croma Section */}
          <div
            data-aos="fade-up"
            className="relative   rounded-3xl shadow-2xl px-8 py-12 md:px-14 border border-white transition-all duration-300 hover:shadow-[0_8px_30px_rgb(255,191,71,0.3)]"
          >
            <div className="absolute -top-6 left-6 bg-gray-600  p-3 rounded-full shadow-md border border-amber-200">
              <FaCameraRetro className="text-gray-300 text-2xl" />
            </div>

            <motion.h3
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-3xl font-extrabold mb-4 b  bg-clip-text  "
            >
              {cromaDetails.title}
            </motion.h3>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="text-gray-400 text-base md:text-lg leading-relaxed mb-6 transition hover:text-blue-300"
            >
              {cromaDetails.content}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h4 className="text-xl font-semibold text-gray-500 mb-3  hover:text-blue-300">Croma Shoot Steps:</h4>
              <ul className="space-y-3">
                {cromaDetails.steps.map((step, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-gray-400 hover:text-blue-600 rounded-lg px-3 py-2 transition cursor-pointer"
                  >
                    <FaCheckCircle className="mt-1 text-gray-300" />
                    <span className="font-medium text-gray-100">{step}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Equipment Section */}
          <div
            data-aos="fade-up"
            className="relative b  rounded-3xl shadow-2xl px-8 py-12 md:px-14 border border-white transition-all duration-300 hover:shadow-[0_8px_30px_rgb(255,191,71,0.3)]"
          >
            <div className="absolute -top-6 left-6  bg-gray-600 p-3 rounded-full shadow-md border border-white">
              <FaTools className="text-gray-300 text-2xl" />
            </div>

            <motion.h3
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-3xl font-extrabold mb-4   bg-clip-text  "
            >
              {equipmentBlock.title}
            </motion.h3>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="text-gray-400 text-base md:text-lg leading-relaxed mb-6 transition hover:text-blue-300"
            >
              We offer a blend of{" "}
              <span className="font-semibold text-gray-400 hover:text-blue-300 transition">traditional, candid, and cinematic photography</span>{" "}
              capturing every special moment.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h4 className="text-xl font-semibold text-gray-400 mb-3">Our Services:</h4>
              <ul className="grid sm:grid-cols-2 gap-x-4 gap-y-2">
                {equipmentBlock.services.map((s, i) => (
                  <li
                    key={i}
                    className="text-gray-300 hover:text-white hover:bg-gray-500 px-3 py-2 rounded-lg transition font-medium cursor-pointer"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              className="mt-8"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h4 className="text-xl font-semibold text-gray-400 mb-3">Service Insights:</h4>
              <ul className="list-disc pl-5 text-gray-800 space-y-3">
                {equipmentBlock.details.map((item, i) => (
                  <li key={i} className="text-gray-500 hover:text-gray-200 transition">
                    <span className="font-medium text-gray-200 hover:text-gray-400">{item.label}</span>: {item.text}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>


      </div>
      <Footer />
    </>
  );
}
