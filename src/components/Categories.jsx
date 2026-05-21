"use client";

import React from "react";
import {
  Brain,
  HeartPulse,
  GraduationCap,
  Landmark,
  Tractor,
  Gamepad2,
  ShieldCheck,
  ShoppingBag,
} from "lucide-react";

const categories = [
  {
    id: 1,
    title: "Artificial Intelligence",
    desc: "Innovative AI-powered startup ideas and tools.",
    icon: Brain,
    gradient: "from-cyan-500 to-blue-500",
  },
  {
    id: 2,
    title: "Health & Medical",
    desc: "Smart healthcare and medical technology solutions.",
    icon: HeartPulse,
    gradient: "from-pink-500 to-rose-500",
  },
  {
    id: 3,
    title: "Education",
    desc: "Modern learning platforms and EdTech systems.",
    icon: GraduationCap,
    gradient: "from-violet-500 to-purple-500",
  },
  {
    id: 4,
    title: "FinTech",
    desc: "Digital banking and financial innovation ideas.",
    icon: Landmark,
    gradient: "from-emerald-500 to-green-500",
  },
  {
    id: 5,
    title: "Agriculture",
    desc: "Smart farming and agriculture-based technologies.",
    icon: Tractor,
    gradient: "from-lime-500 to-green-500",
  },
  {
    id: 6,
    title: "Gaming",
    desc: "Creative gaming platforms and entertainment apps.",
    icon: Gamepad2,
    gradient: "from-orange-500 to-red-500",
  },
  {
    id: 7,
    title: "Cyber Security",
    desc: "Advanced digital security and protection systems.",
    icon: ShieldCheck,
    gradient: "from-slate-600 to-gray-800",
  },
  {
    id: 8,
    title: "E-Commerce",
    desc: "Online business and smart shopping solutions.",
    icon: ShoppingBag,
    gradient: "from-yellow-500 to-amber-500",
  },
];

const CategoriesSection = () => {
  return (
    <section className="relative py-20 px-4 overflow-hidden bg-gradient-to-br from-slate-100 via-cyan-50 to-purple-100">

      <div className="absolute top-0 left-0 w-72 h-72 bg-cyan-300/20 blur-3xl rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-300/20 blur-3xl rounded-full"></div>

      <div className="max-w-7xl mx-auto relative z-10">

        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1 rounded-full bg-cyan-100 text-cyan-700 text-sm font-medium border border-cyan-200">
            Startup Categories
          </span>

          <h2 className="mt-5 text-4xl md:text-5xl font-extrabold text-gray-900">
            Explore{" "}
            <span className="bg-gradient-to-r from-cyan-600 to-purple-600 bg-clip-text text-transparent">
              Categories
            </span>
          </h2>

          <p className="mt-4 text-gray-600 max-w-2xl mx-auto leading-8 text-lg">
            Discover innovative startup ideas from different industries
            and technology sectors.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-7">

          {categories.map((category) => {
            const Icon = category.icon;

            return (
              <div
                key={category.id}
                className="group relative overflow-hidden rounded-3xl bg-white/80 backdrop-blur-xl border border-white/40 p-7 shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
              >

                <div
                  className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition duration-500 bg-gradient-to-br ${category.gradient}`}
                ></div>

                <div
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center bg-gradient-to-r ${category.gradient} shadow-lg`}
                >
                  <Icon className="text-white w-8 h-8" />
                </div>

                <div className="mt-6">
                  <h3 className="text-xl font-bold text-gray-800">
                    {category.title}
                  </h3>

                  <p className="mt-3 text-sm text-gray-500 leading-7">
                    {category.desc}
                  </p>
                </div>

                <button
                  className={`mt-6 w-full py-3 rounded-xl text-white font-medium bg-gradient-to-r ${category.gradient} hover:scale-105 transition duration-300`}
                >
                  Explore Ideas
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;