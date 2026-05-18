import Image from "next/image";
import React from "react";

const IdeaDetailsPage = async ({ params }) => {
  const { id } = await params;
  const res = await fetch(`http://localhost:5000/idea/${id}`);
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
    <div className="max-w-2xl my-4 w-full mx-auto bg-white rounded-2xl shadow-lg border overflow-hidden">
      {imageUrl && (
        <div className="relative w-full h-56">
          <Image src={imageUrl} alt={title} fill className="object-cover" />
        </div>
      )}

      <div className="p-6 space-y-4">
        <h1 className="text-2xl font-bold text-gray-800">{title}</h1>

        <div className="flex flex-wrap gap-3">
          <span className="bg-cyan-100 text-cyan-700 px-3 py-1 rounded-full text-xs">
            {category}
          </span>

          {estimatedBudget && (
            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs">
               {estimatedBudget}
            </span>
          )}
        </div>

        <p className="text-gray-600">{shortDescription}</p>

        <div>
          <h3 className="font-semibold text-gray-800"> Details</h3>
          <p className="text-gray-600 text-sm mt-1">{detailedDescription}</p>
        </div>

        <div>
          <h3 className="font-semibold text-red-600"> Problem</h3>
          <p className="text-gray-600 text-sm mt-1">{problemStatement}</p>
        </div>

        <div>
          <h3 className="font-semibold text-green-600"> Solution</h3>
          <p className="text-gray-600 text-sm mt-1">{proposedSolution}</p>
        </div>

        <div>
          <h3 className="font-semibold text-gray-800"> Target Audience</h3>
          <p className="text-gray-600 text-sm mt-1">{targetAudience}</p>
        </div>

        {Array.isArray(tags) && tags.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-2">
            {tags.map((tag, i) => (
              <span
                key={i}
                className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default IdeaDetailsPage;
