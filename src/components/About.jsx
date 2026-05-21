import React from "react";
import { Lightbulb, Rocket, TrendingUp } from "lucide-react";

const AboutSection = () => {
  return (
    <section className="relative overflow-hidden py-20 px-4 bg-gradient-to-br from-slate-100 via-cyan-50 to-purple-100">

      <div className="absolute top-0 left-0 w-72 h-72 bg-cyan-300/20 blur-3xl rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-300/20 blur-3xl rounded-full"></div>

      <div className="max-w-6xl mx-auto relative z-10">

        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1 rounded-full bg-cyan-100 text-cyan-700 text-sm font-medium border border-cyan-200">
            Innovation Platform
          </span>

          <h2 className="mt-5 text-4xl md:text-5xl font-extrabold text-gray-900">
            About{" "}
            <span className="bg-gradient-to-r from-cyan-600 to-purple-600 bg-clip-text text-transparent">
              IdeaVault
            </span>
          </h2>

          <p className="mt-4 text-gray-600 max-w-2xl mx-auto leading-8 text-lg">
            IdeaVault is a modern platform where developers, students,
            and entrepreneurs can save, manage, and transform creative
            ideas into impactful real-world projects.
          </p>
        </div>

        <div className="relative rounded-[32px] border border-white/40 bg-white/70 backdrop-blur-xl shadow-2xl p-8 md:p-12 overflow-hidden">

          <div className="absolute -top-10 -right-10 w-40 h-40 bg-cyan-400/20 blur-3xl rounded-full"></div>
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-400/20 blur-3xl rounded-full"></div>

          <div className="text-center max-w-3xl mx-auto">
            <p className="text-gray-700 text-lg leading-8">
              From brainstorming startup concepts to building innovative
              applications, IdeaVault helps users organize their vision,
              collaborate creatively, and stay inspired every day.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-7 mt-14">

            <FeatureCard
              icon={<Lightbulb className="w-7 h-7 text-cyan-600" />}
              title="Store Ideas"
              desc="Save and organize your creative thoughts securely in one place."
            />

            <FeatureCard
              icon={<TrendingUp className="w-7 h-7 text-purple-600" />}
              title="Explore Trends"
              desc="Discover trending startup ideas and popular innovations."
            />

            <FeatureCard
              icon={<Rocket className="w-7 h-7 text-pink-600" />}
              title="Build Projects"
              desc="Transform your concepts into powerful real-world applications."
            />

          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-14">

            <StatCard number="10K+" label="Ideas Shared" />
            <StatCard number="5K+" label="Users Active" />
            <StatCard number="1K+" label="Projects Built" />
            <StatCard number="24/7" label="Support" />

          </div>

          <div className="mt-14 text-center">
            <p className="text-sm uppercase tracking-widest text-gray-500 mb-5">
              Built With
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Badge text="Next.js" />
              <Badge text="Tailwind CSS" />
              <Badge text="MongoDB" />
              <Badge text="Express.js" />
              <Badge text="Node.js" />
              <Badge text="JWT Auth" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;


const FeatureCard = ({ icon, title, desc }) => {
  return (
    <div className="group relative p-7 rounded-3xl border border-gray-200 bg-white/80 shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden">

      <div className="absolute inset-0 bg-gradient-to-br from-cyan-50 to-purple-50 opacity-0 group-hover:opacity-100 transition duration-500"></div>

      <div className="relative z-10">

        <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-gray-100 mb-5">
          {icon}
        </div>

        <h3 className="text-xl font-bold text-gray-800">
          {title}
        </h3>

        <p className="mt-3 text-gray-500 leading-7 text-sm">
          {desc}
        </p>

      </div>
    </div>
  );
};


const Badge = ({ text }) => {
  return (
    <span className="px-5 py-2 rounded-full border border-gray-200 bg-white shadow-sm text-sm font-medium text-gray-700 hover:shadow-md hover:scale-105 transition duration-300 cursor-pointer">
      {text}
    </span>
  );
};


const StatCard = ({ number, label }) => {
  return (
    <div className="text-center p-5 rounded-2xl bg-white/70 border border-gray-200 shadow-sm hover:shadow-lg transition duration-300">

      <h3 className="text-3xl font-extrabold bg-gradient-to-r from-cyan-600 to-purple-600 bg-clip-text text-transparent">
        {number}
      </h3>

      <p className="mt-2 text-sm text-gray-500">
        {label}
      </p>

    </div>
  );
};