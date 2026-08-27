"use client";

import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import toast from "react-hot-toast";

import {
  FaLightbulb,
  FaTags,
  FaImage,
  FaUsers,
  FaMoneyBillWave,
  FaExclamationTriangle,
  FaCheckCircle,
  FaArrowRight,
} from "react-icons/fa";

export default function IdeaForm() {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [isLoading, setIsLoading] = useState(false);

  const initialForm = {
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
  };

  const [form, setForm] = useState(initialForm);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error("Please sign in first!");
      return;
    }

    const userData = {
      userId: user?.id,
      userImage: user?.image,
      userName: user?.name,
      userEmail: user?.email,
    };

    const toastId = toast.loading("Submitting your idea...");
    setIsLoading(true);

    try {
      const formData = new FormData(e.currentTarget);

      const idea = Object.fromEntries(formData.entries());

      const { data: tokenData } = await authClient.token();

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/idea`,
        {
          method: "POST",

          headers: {
            "content-type": "application/json",
            authorization: `Bearer ${tokenData?.token}`,
          },

          body: JSON.stringify({
            ...idea,
            ...userData,
          }),
        },
      );

      const data = await res.json();

      if (res.ok) {
        toast.success("Idea submitted successfully!", {
          id: toastId,
        });

        console.log("Response Data:", data);

        setForm(initialForm);
      } else {
        toast.error(
          data?.message || "Failed to submit idea!",
          {
            id: toastId,
          },
        );
      }
    } catch (error) {
      console.error(error);

      toast.error("Something went wrong!", {
        id: toastId,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-blue-100 py-10 px-4">

      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10">

          <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg">

            <FaLightbulb className="text-white text-3xl" />

          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
            Submit Your Idea
          </h1>

          <p className="text-gray-500 mt-3 max-w-xl mx-auto">
            Share your innovative idea with us. Tell us about
            the problem, your solution, and who it can help.
          </p>

        </div>

        {/* Form Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">

          {/* Card Top */}
          <div className="bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-5">

            <h2 className="text-xl font-bold text-white">
              Idea Information
            </h2>

            <p className="text-cyan-50 text-sm mt-1">
              Fill in the details below to submit your idea.
            </p>

          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="p-6 md:p-10 space-y-8"
          >

            {/* Basic Information */}
            <div>

              <h3 className="text-lg font-bold text-gray-800 mb-5">
                Basic Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                {/* Idea Title */}
                <div className="md:col-span-2">

                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Idea Title
                  </label>

                  <input
                    name="title"
                    required
                    placeholder="Enter your idea title"
                    value={form.title}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition"
                  />

                </div>

                {/* Short Description */}
                <div className="md:col-span-2">

                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Short Description
                  </label>

                  <input
                    name="shortDescription"
                    required
                    placeholder="Briefly describe your idea"
                    value={form.shortDescription}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition"
                  />

                </div>

                {/* Category */}
                <div>

                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Category
                  </label>

                  <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-cyan-400 bg-white transition"
                  >
                    <option value="Tech">Technology</option>
                    <option value="Health">Health</option>
                    <option value="AI">Artificial Intelligence</option>
                    <option value="Education">Education</option>
                  </select>

                </div>

                {/* Budget */}
                <div>

                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                    <FaMoneyBillWave className="text-cyan-500" />
                    Estimated Budget
                  </label>

                  <input
                    name="estimatedBudget"
                    type="text"
                    placeholder="e.g. $5,000"
                    value={form.estimatedBudget}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition"
                  />

                </div>

              </div>

            </div>

            {/* Details */}
            <div className="border-t border-gray-100 pt-8">

              <h3 className="text-lg font-bold text-gray-800 mb-5">
                Idea Details
              </h3>

              <div className="space-y-5">

                {/* Detailed Description */}
                <div>

                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Detailed Description
                  </label>

                  <textarea
                    name="detailedDescription"
                    required
                    rows={5}
                    placeholder="Explain your idea in detail..."
                    value={form.detailedDescription}
                    onChange={handleChange}
                    className="w-full resize-none border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition"
                  />

                </div>

                {/* Problem */}
                <div>

                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">

                    <FaExclamationTriangle className="text-orange-400" />

                    Problem Statement

                  </label>

                  <textarea
                    name="problemStatement"
                    required
                    rows={4}
                    placeholder="What problem does your idea solve?"
                    value={form.problemStatement}
                    onChange={handleChange}
                    className="w-full resize-none border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition"
                  />

                </div>

                {/* Solution */}
                <div>

                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">

                    <FaCheckCircle className="text-green-500" />

                    Proposed Solution

                  </label>

                  <textarea
                    name="proposedSolution"
                    required
                    rows={4}
                    placeholder="Describe your proposed solution..."
                    value={form.proposedSolution}
                    onChange={handleChange}
                    className="w-full resize-none border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition"
                  />

                </div>

              </div>

            </div>

            {/* Additional Information */}
            <div className="border-t border-gray-100 pt-8">

              <h3 className="text-lg font-bold text-gray-800 mb-5">
                Additional Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                {/* Tags */}
                <div>

                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">

                    <FaTags className="text-cyan-500" />

                    Tags

                  </label>

                  <input
                    name="tags"
                    placeholder="AI, Startup, Healthcare"
                    value={form.tags}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition"
                  />

                </div>

                {/* Target Audience */}
                <div>

                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">

                    <FaUsers className="text-cyan-500" />

                    Target Audience

                  </label>

                  <input
                    name="targetAudience"
                    placeholder="e.g. Students, Businesses"
                    value={form.targetAudience}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition"
                  />

                </div>

                {/* Image URL */}
                <div className="md:col-span-2">

                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">

                    <FaImage className="text-cyan-500" />

                    Idea Image URL

                  </label>

                  <input
                    name="imageUrl"
                    type="url"
                    placeholder="https://example.com/your-image.jpg"
                    value={form.imageUrl}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition"
                  />

                </div>

              </div>

            </div>

            {/* Submit Button */}
            <div className="pt-4">

              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold py-4 rounded-xl shadow-lg hover:opacity-90 hover:shadow-xl transition disabled:opacity-60 disabled:cursor-not-allowed"
              >

                {isLoading ? (
                  <>
                    <span className="animate-pulse">
                      Submitting Idea...
                    </span>
                  </>
                ) : (
                  <>
                    Submit Your Idea

                    <FaArrowRight />
                  </>
                )}

              </button>

            </div>

          </form>

        </div>

      </div>

    </div>
  );
}