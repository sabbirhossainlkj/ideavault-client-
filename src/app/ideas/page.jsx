"use client";

import IdeaCard from "@/components/IdeaCard";
import React, { useEffect, useState } from "react";

const IdeaPage = () => {
  const [ideas, setIdeas] = useState([]);
  const [query, setQuery] = useState("");

  const [category, setCategory] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAllIdeas();
  }, []);

  const fetchAllIdeas = async () => {
    setLoading(true);
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/idea`);
    const data = await res.json();
    setIdeas(data);
    setLoading(false);
  };

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!query.trim()) {
      fetchAllIdeas();
      return;
    }

    setLoading(true);

    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/ideas/search?q=${query}`);

    const data = await res.json();
    setIdeas(data);
    setLoading(false);
  };

  const handleFilter = async () => {
    setLoading(true);

    let url = `${process.env.NEXT_PUBLIC_SERVER_URL}/ideas/filter?`;

    if (category) url += `category=${category}&`;
    if (startDate) url += `startDate=${startDate}&`;
    if (endDate) url += `endDate=${endDate}&`;

    const res = await fetch(url);
    const data = await res.json();

    setIdeas(data);
    setLoading(false);
  };

  const handleReset = () => {
    setQuery("");
    setCategory("");
    setStartDate("");
    setEndDate("");
    fetchAllIdeas();
  };

  return (
    <div className="my-6 w-11/12 lg:w-10/12 mx-auto">
      <h2 className="text-3xl font-bold text-center my-6">All Ideas</h2>

      <form
        onSubmit={handleSearch}
        className="flex flex-wrap justify-center gap-3 mb-4"
      >
        <input
          type="text"
          placeholder="Search idea by title..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-1/2 px-4 py-2 border rounded-xl focus:ring-2 focus:ring-cyan-400"
        />

        <button
          type="submit"
          className="bg-cyan-500 text-white px-6 py-2 rounded-xl"
        >
          Search
        </button>
      </form>

      <div className="flex flex-wrap justify-center gap-3 mb-6">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border px-4 py-2 rounded-xl"
        >
          <option value="">All Category</option>
          <option value="Tech">Tech</option>
          <option value="AI">AI</option>
          <option value="Health">Health</option>
          <option value="Education">Education</option>
        </select>

        <button
          onClick={handleFilter}
          className="bg-cyan-500 text-white px-6 py-2 rounded-xl"
        >
          Apply Filter
        </button>
      </div>

      {loading && <p className="text-center text-gray-500 mb-4">Loading...</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ideas.map((idea) => (
          <IdeaCard key={idea._id} idea={idea} />
        ))}
      </div>
    </div>
  );
};

export default IdeaPage;
