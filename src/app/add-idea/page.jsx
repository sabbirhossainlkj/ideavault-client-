"use client";

import { useState } from "react";

export default function IdeaForm() {
  const [form, setForm] = useState({
    title: "",
    shortDescription: "",
    detailedDescription: "",
    category: "Tech",
    tags: "",
    imageUrl: "",
    estimatedBudget: "",
    targetAudience: "",
    problemStatement: "",
    proposedSolution: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const ideavault = Object.fromEntries(formData.entries());
    console.log("ideavault Data:", ideavault);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto space-y-4 p-6">
      <input
        name="title"
        placeholder="Idea Title"
        value={form.title}
        onChange={handleChange}
        className="border p-2 w-full"
      />

      <input
        name="shortDescription"
        placeholder="Short Description"
        value={form.shortDescription}
        onChange={handleChange}
        className="border p-2 w-full"
      />

      <textarea
        name="detailedDescription"
        placeholder="Detailed Description"
        value={form.detailedDescription}
        onChange={handleChange}
        className="border p-2 w-full"
      />

      <select
        name="category"
        value={form.category}
        onChange={handleChange}
        className="border p-2 w-full"
      >
        <option value="Tech">Tech</option>
        <option value="Health">Health</option>
        <option value="AI">AI</option>
        <option value="Education">Education</option>
      </select>

      <input
        name="tags"
        placeholder="Tags (comma separated)"
        value={form.tags}
        onChange={handleChange}
        className="border p-2 w-full"
      />

      <input
        name="imageUrl"
        placeholder="Image URL"
        value={form.imageUrl}
        onChange={handleChange}
        className="border p-2 w-full"
      />

      <input
        name="estimatedBudget"
        placeholder="Estimated Budget"
        value={form.estimatedBudget}
        onChange={handleChange}
        className="border p-2 w-full"
      />

      <input
        name="targetAudience"
        placeholder="Target Audience"
        value={form.targetAudience}
        onChange={handleChange}
        className="border p-2 w-full"
      />

      <textarea
        name="problemStatement"
        placeholder="Problem Statement"
        value={form.problemStatement}
        onChange={handleChange}
        className="border p-2 w-full"
      />

      <textarea
        name="proposedSolution"
        placeholder="Proposed Solution"
        value={form.proposedSolution}
        onChange={handleChange}
        className="border p-2 w-full"
      />

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Submit Idea
      </button>
    </form>
  );
}
