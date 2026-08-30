"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";




const videos = [
    "https://www.youtube.com/embed/4CvHGLQRib0?autoplay=1&mute=1&controls=0&rel=0",
    "https://www.youtube.com/embed/ERZT5w0DydY?autoplay=1&mute=1&controls=0&rel=0",
    "https://www.youtube.com/embed/Z7gdxTu6kb0?autoplay=1&mute=1&controls=0&rel=0",
];

const dm = ["https://www.youtube.com/embed/sUD-Mnc-KsA?autoplay=1&mute=1&controls=0&rel=0",
    "https://www.youtube.com/embed/ssjoCTfaYgE?autoplay=1&mute=1&controls=0&rel=0",


];
const jm = ["https://www.youtube.com/embed/vsiFCjertWs?autoplay=1&mute=1&controls=0&rel=0"]

export default function WomanDay() {
    const words = [
        "Besides being ",
        "beautiful ",
        "graceful ",
        "or reliable, ",
        "women at Ecoholics are also ",
        "ferocious ",
        "open-minded ",
        "ambitious ",
        "enthusiastic ",
        "professional ",
        "accountable ",
        "intelligent ",
        "pragmatic ",
        "and moreover ",
        "efficient — to the ",
        "born leader ",
        "in you, a Happy Women’s Day 🎉",
    ];
    const [rotation, setRotation] = useState(0);
    const fullText = words.join("");
    const [currentText, setCurrentText] = useState("");
    const [index, setIndex] = useState(0);

    const rotateBy = (deg: number) => {
        setRotation((prev) => prev + deg);
    };

    useEffect(() => {
        if (index < fullText.length) {
            const timeout = setTimeout(() => {
                setCurrentText((prev) => prev + fullText.charAt(index));
                setIndex((prev) => prev + 1);
            }, 80);
            return () => clearTimeout(timeout);
        }
    }, [index, fullText]);

    return (<>

        <section className="absolute relative w-full h-screen overflow-hidden mt-15">


      
            <div className="absolute inset-0 bg-black/40" />

        </section>
          <section className="relative w-full h-auto overflow-hidden mt-15 block md:hidden mt-15">
            <motion.h1 className="text-white text-2xl p-3">
                <span className="bg-gradient-to-r  from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
                    Shot By </span>Maestro Films. <span className="animate-pulse bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
                    Happy Women's Day </span> Leaders at Ecoholics</motion.h1>

            <video
                className="inset-0 w-full h-full object-cover pointer-events-none"
                autoPlay
                loop
                muted
                playsInline
            >
                <source src="/videos/woman.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-black/40" />
            <motion.div
                className="bottom-6 right-6 md:bottom-12 md:right-12 text-white pointer-events-none"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}>

                <div className="text-xl font-medium text-left p-1 max-w-3xl mx-auto leading-relaxed">
                    {currentText}
                    <span className="animate-pulse">|</span>
                </div>
            </motion.div>
        </section>
       

        <div className="w-full bg-black space-y-1">
            <div className="w-full bg-black space-y-1">
                <div className="flex flex-col md:flex-row items-center gap-2 max-w-6xl mx-auto p-5 md:-mb-20">
                    {jm.map((url, index) => (

                        <div key={index} className="w-full md:w-1/2 h-[290px] relative overflow-hidden rounded-xl shadow-2xl select-none pointer-events-none">

                            <iframe
                                className="absolute inset-0 w-full h-full"
                                src={url}
                                title="YouTube video"
                                frameBorder="0"
                                allow="autoplay; encrypted-media"
                                allowFullScreen
                            ></iframe>


                        </div>
                    ))}

                    <div className="w-full md:w-1/2 space-y-4 text-left">
                        <h2 className="text-3xl md:text-4xl font-bold text-white">
                            Event Shoot for Eventra exhibitions and trade fairs LLP
                        </h2>
                        <p className="text-xl text-[#f39f6d]">
                            Indian International Shopping Carnival
                        </p>
                    </div>
                </div>
            </div>
        </div>


        <div className="flex flex-col md:flex-row items-center gap-4 max-w-5xl mx-auto md:ml-25">
            <div className="w-full md:w-1/2 h-[290px] relative overflow-hidden rounded-xl shadow-2xl select-none pointer-events-none">

                <iframe
                    className="absolute inset-0 w-full h-full"
                    src={dm[0]}
                    title="YouTube video"
                    frameBorder="0"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                ></iframe>

            </div>

            <div className="w-full md:w-1/2 space-y-4 text-left">
                <h2 className="text-3xl md:text-4xl font-bold text-white">
                    Event Shoot for
                    Eventra exhibitions and trade fairs LLP
                </h2>
                <p className="text-xl text-[#f39f6d]">
                    WDAY
                </p>
            </div>
        </div>
        <div className="flex flex-col md:flex-row items-center gap-4 max-w-5xl mx-auto md:ml-25 m-10 ">
            <div className="w-full md:w-1/2 h-[290px] relative overflow-hidden rounded-xl shadow-2xl select-none pointer-events-none">
                <iframe
                    className="absolute inset-0 w-full h-full"
                    src={dm[1]}
                    title="YouTube video"
                    frameBorder="0"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                ></iframe>
            </div>
    
            <div className="w-full md:w-1/2 space-y-4 text-left">
                <h2 className="text-3xl md:text-4xl font-bold text-white">
                    Event Shoot for
                    Eventra exhibitions and trade fairs LLP
                </h2>
                <p className="text-xl text-[#f39f6d]">
                    WDAY
                </p>
            </div>
        </div>
 
        <div className="flex flex-col md:flex-row items-center gap-4 max-w-6xl mx-auto p-10">
 
            <div className="w-[390px] h-[510px] relative overflow-hidden rounded-xl shadow-2xl">
                <video
                    className="absolute inset-0 w-full h-full object-cover"
                    autoPlay
                    loop
                    muted
                    playsInline
                >
                    <source
                        src="https://pouch.jumpshare.com/preview/N4Xxc0MpVvLTBC5hT6oNNPECigUCBmYuisLOTCFVshAfXRiaq9KK9iMaJXCXEa10XJJhrt8opcxNNt5eexDHFdJIe-xtQhDk-ApzpENjdCaAIWSNAetVzGm6wC_-jNWXyjjepBKevpGP6j8fpffT3m6yjbN-I2pg_cnoHs_AmgI.mp4"
                        type="video/mp4"
                    />
                </video>
            </div>
 
            <div className="w-full md:w-1/2 space-y-4 text-left">
                <h2 className="text-3xl md:text-4xl font-bold text-white">
                    Marketing Shoot for
                </h2>
                <p className="text-2xl text-blue-800">
                    Brint Marketing Solutions
                </p>
            </div>
        </div>

 

    </>);
}
