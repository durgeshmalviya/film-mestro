'use client'


export default function AboutUs() {
    
    return (

        <section id="about" className="mt-0 px-4 md:px-6 bg-[#f5f1ed]">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14 items-center">
                    <div className="reveal">
                        <h2 className="font-body p-2 text-4xl md:text-6xl font-light text-[#a68b6a] leading-none mb-1">
                            ABOUT
                        </h2>
                        <h3 className="font-body text-4xl md:text-5xl text-[#a68b6a] mb-3 md:mb-4 -mt-1">
                            Us
                        </h3>
                        <div className="space-y-3 max-w-md">
                            <p className=" text-[#a68b6a] leading-relaxed font-body font-light text-sm md:text-[15px]">
                                <span className="font-body font-semibold text-2xl text-[#a68b6a] mr-1">M</span>
                                aestro Films is an independent film production house focused on
                                commercial and editorial work.
                            </p>
                            <p className=" text-[#a68b6a] leading-relaxed font-body font-light text-sm md:text-[15px]">
                                We collaborate with brands, stylists, and visionaries to craft visual
                                narratives that are emotionally driven and timeless.
                            </p>
                        </div>
                    </div>

                    <div className="reveal">
                        <div className="grid grid-cols-2 gap-2.5 md:gap-3">
                            <div className="col-span-2 relative h-40 md:h-60 overflow-hidden rounded-sm shadow-md hover-lift group">
                                <img
                                    src="https://6a8930a197833836f65581d4.imgix.net/sandbox/onepic.jpeg"
                                    alt="Maestro Films production work"
                                    className="protected-image w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                                    loading="lazy"
                                    decoding="async"
                                    onContextMenu={(e) => e.preventDefault()}
                                    onDragStart={(e) => e.preventDefault()}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-600 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                                <CornerMark />
                            </div>

                            <div className="relative h-36 md:h-44 overflow-hidden rounded-sm shadow-md hover-lift group">
                                <img
                                    src="https://6a8930a197833836f65581d4.imgix.net/sandbox/twpic.jpeg"
                                    alt="Maestro Films production work"
                                    className="protected-image w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                                    loading="lazy"
                                    decoding="async"
                                    onContextMenu={(e) => e.preventDefault()}
                                    onDragStart={(e) => e.preventDefault()}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-600 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                            </div>

                            <div className="relative h-36 md:h-44 overflow-hidden rounded-sm shadow-md hover-lift group">
                                <img
                                    src="https://6a8930a197833836f65581d4.imgix.net/sandbox/thrpic.jpeg"
                                    alt="Maestro Films production work"
                                    className="protected-image w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                                    loading="lazy"
                                    decoding="async"
                                    onContextMenu={(e) => e.preventDefault()}
                                    onDragStart={(e) => e.preventDefault()}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-600 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>


    )

}


function CornerMark() {
    return (
        <div className="pointer-events-none absolute bottom-3 right-3 md:bottom-4 md:right-4 z-10 opacity-0 group-hover:opacity-80 transition-opacity duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
            <span className="font-serif text-white text-lg md:text-lg drop-shadow-[0_1px_6px_rgba(0,0,0,0.55)]">
                Maestro films
            </span>
        </div>
    );
}