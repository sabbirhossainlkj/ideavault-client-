import CommentCard from "@/components/CommentCard";
import PostComment from "@/components/PostComment";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Image from "next/image";
import React from "react";

const IdeaDetailsPage = async ({ params }) => {
  const { id } = await params;

  const { token } = await auth.api.getToken({
    headers: await headers(),
  });

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/idea/${id}`,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  );

  const ideas = await res.json();

  const {
    title,
    shortDescription,
    detailedDescription,
    category,
    tags,
    imageUrl,
    estimatedBudget,
    targetAudience,
    problemStatement,
    proposedSolution,
  } = ideas;

  return (
    <section className="max-w-5xl mx-auto px-4 py-10">
      <div className="bg-white dark:bg-zinc-900 rounded-3xl overflow-hidden shadow-xl border border-gray-100 dark:border-zinc-800">
        
        {imageUrl && (
          <div className="relative w-full h-[300px] md:h-[420px] overflow-hidden">
            <Image
              src={imageUrl}
              alt={title}
              fill
              priority
              className="object-cover hover:scale-105 transition-transform duration-500"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

            <div className="absolute bottom-6 left-6">
              <span className="bg-cyan-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                {category}
              </span>

              <h1 className="text-3xl md:text-5xl font-bold text-white mt-4 max-w-3xl">
                {title}
              </h1>
            </div>
          </div>
        )}

        <div className="p-6 md:p-10 space-y-8">
          
          <div className="flex flex-wrap gap-3">
            {estimatedBudget && (
              <div className="bg-green-100 text-green-700 px-4 py-2 rounded-xl text-sm font-medium">
                 Budget: {estimatedBudget}
              </div>
            )}

            <div className="bg-blue-100 text-blue-700 px-4 py-2 rounded-xl text-sm font-medium">
              Audience: {targetAudience}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-3">
              Overview
            </h2>

            <p className="text-gray-600 dark:text-zinc-300 leading-8">
              {shortDescription}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            
            <div className="bg-gray-50 dark:bg-zinc-800 p-6 rounded-2xl">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">
                 Detailed Description
              </h3>

              <p className="text-gray-600 dark:text-zinc-300 leading-7 text-sm">
                {detailedDescription}
              </p>
            </div>

            <div className="bg-red-50 dark:bg-red-950/20 p-6 rounded-2xl">
              <h3 className="text-xl font-semibold text-red-600 mb-3">
                 Problem Statement
              </h3>

              <p className="text-gray-600 dark:text-zinc-300 leading-7 text-sm">
                {problemStatement}
              </p>
            </div>

            <div className="bg-green-50 dark:bg-green-950/20 p-6 rounded-2xl md:col-span-2">
              <h3 className="text-xl font-semibold text-green-600 mb-3">
                Proposed Solution
              </h3>

              <p className="text-gray-600 dark:text-zinc-300 leading-7">
                {proposedSolution}
              </p>
            </div>
          </div>

          {Array.isArray(tags) && tags.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                 Tags
              </h3>

              <div className="flex flex-wrap gap-3">
                {tags.map((tag, i) => (
                  <span
                    key={i}
                    className="bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-zinc-300 px-4 py-2 rounded-full text-sm hover:bg-cyan-100 hover:text-cyan-700 transition"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mt-10 space-y-8">
        <PostComment ideas={ideas} />

        <CommentCard />
      </div>
    </section>
  );
};

export default IdeaDetailsPage;