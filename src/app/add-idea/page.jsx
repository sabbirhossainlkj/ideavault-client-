"use client";

import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import toast from "react-hot-toast";

export default function IdeaForm() {
  const { data: session } = authClient.useSession();
  const user = session?.user;

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
    const userData = {
      userId: user?.id,
      userImage: user?.image,
      userName: user?.name,
      userEmail: user?.email,
    };
    console.log(userData);
    const toastId = toast.loading("Submitting idea...");

    try {
      const formData = new FormData(e.currentTarget);
      const idea = Object.fromEntries(formData.entries());
      console.log(idea);
      const { data: tokenData } = await authClient.token();
      console.log(tokenData);
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/idea`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${tokenData?.token}`,
        },
        body: JSON.stringify({
          ...idea,
          ...userData,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success("Idea submitted successfully!", {
          id: toastId,
        });

        console.log("Response Data:", data);

        setForm({
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
      } else {
        toast.error("Failed to submit idea!", {
          id: toastId,
        });
      }
    } catch (error) {
      console.error(error);

      toast.error("Something went wrong!", {
        id: toastId,
      });
    }
  };

  return (
    <div>
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
          className=" bg-cyan-500 text-white px-4 py-2 rounded"
        >
          Submit Idea
        </button>{" "}
      </form>
    </div>
  );
}
