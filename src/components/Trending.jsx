import React from "react";
import IdeaCard from "./IdeaCard";

const Trending = async () => {
  const res = await fetch("http://localhost:5000/trending", {
    cache: "no-store",
  });

  const ideas = await res.json();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-cyan-50 to-purple-100 py-10 px-4">

      <div className="max-w-6xl mx-auto">

        <h2 className="text-3xl font-bold my-6 text-center text-gray-800">
           Trending Ideas Section
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {ideas.map((idea) => (
            <IdeaCard key={idea._id} idea={idea} />
          ))}
        </div>

      </div>
    </div>
  );
};

export default Trending;