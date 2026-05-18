import React from "react";

const IdeaStats = ({ ideas = [] }) => {
  const totalIdeas = ideas.length;

  const categories = ideas.reduce((acc, idea) => {
    const cat = idea.category || "Unknown";
    acc[cat] = (acc[cat] || 0) + 1;
    return acc;
  }, {});

  const topCategory =
    Object.keys(categories).length > 0
      ? Object.keys(categories).reduce((a, b) =>
          categories[a] > categories[b] ? a : b
        )
      : "No Data";

  const budgets = ideas
    .map((i) => Number(i.estimatedBudget))
    .filter((b) => !isNaN(b) && b > 0);

  const avgBudget =
    budgets.length > 0
      ? (budgets.reduce((a, b) => a + b, 0) / budgets.length).toFixed(2)
      : "0.00";

  return (
    <div className="bg-gradient-to-br from-gray-100 via-cyan-50 to-purple-100 py-6 px-4">

      <div className="max-w-6xl mx-auto">

        <h2 className="text-3xl text-center font-bold mb-8 text-gray-800">
           Idea Insights Dashboard
        </h2>

        <div className="grid md:grid-cols-3 gap-6">

          <Card title="Total Ideas" value={totalIdeas} color="cyan" />

          <Card title="Top Category" value={topCategory} color="purple" />

          <Card title="Avg Budget" value={`$${avgBudget}`} color="green" />

        </div>

      </div>
    </div>
  );
};

export default IdeaStats;

const Card = ({ title, value, icon, color }) => {
  const colors = {
    cyan: "text-cyan-600",
    purple: "text-purple-600",
    green: "text-green-600",
  };

  return (
    <div className="bg-white/80 backdrop-blur-lg border border-gray-200 rounded-2xl shadow-lg p-6 text-center hover:shadow-2xl hover:-translate-y-1 transition duration-300">

      <div className="text-2xl">{icon}</div>

      <h3 className="text-gray-500 text-sm mt-2">{title}</h3>

      <p className={`text-3xl font-bold mt-2 ${colors[color]}`}>
        {value}
      </p>

    </div>
  );
};