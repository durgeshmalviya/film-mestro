"use client";

import { motion } from "framer-motion";
 
 

const jm = ["https://www.youtube.com/embed/gN7zBqnPOOA?autoplay=1&mute=1&controls=0&rel=0"]
const videos = [
  "https://www.youtube.com/embed/4CvHGLQRib0?autoplay=1&mute=1&controls=0&rel=0&enablejsapi=1",
  "https://www.youtube.com/embed/ERZT5w0DydY?autoplay=1&mute=1&controls=0&rel=0&enablejsapi=1",
  "https://www.youtube.com/embed/Z7gdxTu6kb0?autoplay=1&mute=1&controls=0&rel=0&enablejsapi=1",
];

const brands = [
  { logo: "https://i.ibb.co/dwTb4sCt/Illyas.jpg", name: "LLYSAS’S" },
  { logo: "https://i.ibb.co/67RfHSnN/Untitled-300-x-300-px-e1740134537181.jpg", name: "" },
  { logo: "https://i.ibb.co/6RymwLKy/Ecoholics-horiz-white.png", name: "" },
  { logo: "https://i.ibb.co/C3dvmzQ8/Eventra-logo-1-01-removebg-preview.png", name: "" },
  { logo: "  https://i.ibb.co/nMTJKKjx/hpcllogo.jpg", name: "" },


];


export default function MaestroEvents() {

  return (
    <>    <section className="relative grid grid-cols-1 md:grid-cols-2 items-center gap-6 p-6">

        <motion.h1
          className="z-10 text-4xl sm:text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-gray-400 via-gray-500 to-red-500 bg-clip-text text-transparent drop-shadow-lg tracking-wide text-center md:text-left"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          Looking to make your brand unforgettable?
        </motion.h1>


        <div className="relative w-full h-[250px] sm:h-[350px] md:h-[450px] overflow-hidden rounded-2xl">
          <video
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src="/videos/woman.mp4" type="video/mp4" />
          </video>

        </div>
        <div className="md:pl-5">
          <p className="text-lg md:text-xl font-medium bg-gradient-to-r from-gray-400 via-gray-500 to-red-500 bg-clip-text text-transparent max-w-3xl mx-auto leading-relaxed">
            From <span className="font-semibold ">Advertisements</span> that inspire,
            to <span className="font-semibold ">Documentaries</span> that uncover truth,
            <span className="font-semibold ">Podcasts</span> that spark conversations,
            <span className="font-semibold ">Commercials</span> that sell dreams,
            <span className="font-semibold">Songs</span> that echo emotions,
            and <span className="font-semibold">Events</span> that last forever —
            we capture it all, the <span className="italic font-bold">Maestro way</span>.
          </p>

        </div>

      </section>

      <div className="md:mt-10 p-2 m-2">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {videos.map((url, index) => (
            <motion.div
              key={index}
              className="w-full aspect-video overflow-hidden shadow-lg rounded-2xl relative group"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <a
                href={url.replace("/embed/", "/watch?v=")}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0 z-10"
              />
              <iframe

                src={url}
                title={`Video ${index + 1}`}
                allow="autoplay; encrypted-media"
                allowFullScreen
                className="w-full h-full pointer-events-none"
              />
            </motion.div>
          ))}
        </div>
      </div>


      <div className="relative w-full overflow-hidden py-8 bg-black">
        <motion.div
          className="flex gap-12"
          animate={{ x: ["0%", "-100%"] }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            duration: 20,
            ease: "linear",
          }}
        >
          {/* Repeat list for infinite scroll */}
          {[...brands, ...brands].map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-3 min-w-max"
            >
              <img
                src={item.logo}
                alt={item.name}
                className="h-12 w-auto object-contain transition"
              />
              <span className="text-white text-lg font-semibold whitespace-nowrap">
                {item.name}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
 
    </>
  );
}