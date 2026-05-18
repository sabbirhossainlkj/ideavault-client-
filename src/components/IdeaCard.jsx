import Image from "next/image";
import Link from "next/link";
import React from "react";
import { ArrowRight, Lightbulb, Layers3 } from "lucide-react";

const IdeaCard = ({ idea }) => {
  const {
    _id,
    title,
    shortDescription,
    category,
    imageUrl,
  } = idea;

  return (
    <div className="group relative overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
      
      <div className="relative h-56 overflow-hidden">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        <div className="absolute top-4 left-4 flex items-center gap-2 rounded-full bg-white/90 px-4 py-1 text-sm font-semibold text-gray-800 shadow">
          <Layers3 size={16} />
          {category}
        </div>
      </div>

      <div className="space-y-4 p-5">
        
        <div className="flex items-start gap-3">
          <div className="rounded-xl bg-blue-100 p-2 text-blue-600">
            <Lightbulb size={20} />
          </div>

          <h2 className="line-clamp-2 text-xl font-bold text-gray-900">
            {title}
          </h2>
        </div>

        <p className="line-clamp-3 text-sm leading-relaxed text-gray-600">
          {shortDescription}
        </p>

        <Link href={`/ideas/${_id}`}>
          <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-black px-5 py-3 font-medium text-white transition-all duration-300 hover:bg-blue-600">
            View Details
            <ArrowRight size={18} />
          </button>
        </Link>
      </div>

      <div className="absolute -bottom-16 -right-16 h-40 w-40 rounded-full bg-blue-500/10 blur-3xl" />
    </div>
  );
};

export default IdeaCard;