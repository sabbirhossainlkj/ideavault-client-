import React from "react";

const AboutSection = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-cyan-50 to-purple-100 py-16 px-4">

      <div className="max-w-6xl mx-auto">

        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-gray-800">
            About <span className="text-cyan-600">IdeaVault</span>
          </h2>
          <p className="text-gray-600 mt-2">
            Your personal hub for storing, exploring & building ideas
          </p>
        </div>

        <div className="relative bg-white/80 backdrop-blur-lg border border-gray-200 rounded-3xl shadow-2xl p-10 overflow-hidden">

          <div className="absolute -top-10 -right-10 w-40 h-40 bg-cyan-300 blur-3xl opacity-30 rounded-full"></div>
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-300 blur-3xl opacity-30 rounded-full"></div>

          <p className="text-gray-700 text-center leading-relaxed max-w-3xl mx-auto">
            IdeaVault is a smart platform where users can create, store, and explore innovative ideas.
            It helps developers, students, and entrepreneurs organize thoughts and transform them
            into real-world projects with ease.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mt-10">

            <FeatureCard
              title=" Store Ideas"
              desc="Save and organize your creative thoughts in one place."
            />

            <FeatureCard
              title=" Explore Trends"
              desc="Discover trending and popular ideas from the community."
            />

            <FeatureCard
              title=" Build Projects"
              desc="Turn your ideas into real-world applications."
            />

          </div>

          <div className="mt-10 text-center">
            <p className="text-sm text-gray-600 mb-3">Built with</p>

            <div className="flex flex-wrap justify-center gap-3">
              <Badge text="Next.js" />
              <Badge text="Tailwind CSS" />
              <Badge text="MongoDB" />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AboutSection;

const FeatureCard = ({ title, desc }) => {
  return (
    <div className="p-6 rounded-2xl border bg-white shadow-sm hover:shadow-xl hover:-translate-y-1 transition duration-300">
      <h3 className="font-semibold text-lg text-gray-800">{title}</h3>
      <p className="text-sm text-gray-500 mt-2">{desc}</p>
    </div>
  );
};

const Badge = ({ text }) => {
  return (
    <span className="px-4 py-1 text-xs rounded-full bg-white/70 border text-gray-700 hover:bg-white transition">
      {text}
    </span>
  );
};