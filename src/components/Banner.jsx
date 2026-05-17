"use client";

import { useEffect, useState } from "react";

const slides = [
  {
    title: "Launch Your Startup Dream",
    desc: "Turn innovative ideas into real-world successful businesses with modern technology and smart solutions.",
  },
  {
    title: "Innovate for the Future",
    desc: "Discover creative startup opportunities that can shape the future of technology and entrepreneurship.",
  },
  {
    title: "Build Something Amazing",
    desc: "Connect with visionary founders, groundbreaking projects, and powerful startup ecosystems.",
  },
];

const Banner = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index) => setCurrent(index);

  return (
    <section className="relative w-full h-[75vh] flex items-center justify-center overflow-hidden text-white">
      <div className="absolute inset-0 bg-gradient-to-br from-[#020617] via-[#0f172a] to-black" />

      <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_20%_20%,#22d3ee,transparent_40%),radial-gradient(circle_at_80%_30%,#a855f7,transparent_45%),radial-gradient(circle_at_50%_80%,#3b82f6,transparent_45%)]" />

      <div className="relative z-10 text-center px-6 max-w-3xl transition-all duration-500">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 transition-all duration-500">
          {slides[current].title}
        </h1>

        <p className="text-gray-300 mb-6 transition-all duration-500">
          {slides[current].desc}
        </p>

        <button className="px-7 py-3 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-blue-500 hover:to-cyan-400 transition rounded-full font-semibold shadow-lg">
          Explore Ideas
        </button>
      </div>

      <div className="absolute bottom-6 flex gap-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              current === index ? "bg-cyan-400 scale-125" : "bg-white/30"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default Banner;
