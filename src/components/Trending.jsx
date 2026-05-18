import React from "react";
import IdeaCard from "./IdeaCard";

const Trending = async () => {
  const res = await fetch("http://localhost:5000/trending");
  const ideas = await res.json();
  console.log(ideas);
  return (
    <div className="w-10/12 mx-auto my-4">
      <h2 className="text-2xl font-bold my-3 text-center">Trending Ideas Section</h2>
      <div className="grid grid-cols-3 gap-3">
        {
            ideas.map(idea => (
                <IdeaCard key={idea._id} idea={idea}></IdeaCard>
            ) )
        }
      </div>
    </div>
  );
};

export default Trending;
