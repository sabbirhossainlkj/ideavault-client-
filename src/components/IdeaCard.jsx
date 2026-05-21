import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  ArrowRight,
  Lightbulb,
  Layers3,
  Sparkles,
} from "lucide-react";

const IdeaCard = ({ idea }) => {
  const {
    _id,
    title,
    shortDescription,
    category,
    imageUrl,
  } = idea;

  return (
    <div className="group relative overflow-hidden rounded-[28px] border border-gray-200/70 bg-white shadow-md transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl dark:border-zinc-800 dark:bg-zinc-900">
      
      <div className="absolute -top-24 -right-24 h-56 w-56 rounded-full bg-cyan-500/10 blur-3xl transition-all duration-500 group-hover:bg-cyan-500/20" />

      <div className="relative h-60 overflow-hidden">
        <Image
          src={imageUrl}
          alt={title}
          fill
          priority
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-xs font-semibold text-gray-800 shadow-lg backdrop-blur-md">
          <Layers3 size={15} />
          {category}
        </div>

        <div className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-cyan-500 px-3 py-1 text-xs font-semibold text-white shadow-lg">
          <Sparkles size={14} />
          Trending
        </div>

        <div className="absolute bottom-5 left-5 right-5">
          <h2 className="line-clamp-2 text-2xl font-bold leading-tight text-white">
            {title}
          </h2>
        </div>
      </div>

      <div className="space-y-6 p-6">
        
        <div className="flex items-start gap-3">
          <div className="rounded-2xl bg-cyan-100 p-3 text-cyan-600 dark:bg-cyan-500/10">
            <Lightbulb size={20} />
          </div>

          <p className="line-clamp-3 text-sm leading-7 text-gray-600 dark:text-zinc-300">
            {shortDescription}
          </p>
        </div>

        <Link href={`/ideas/${_id}`}>
          <button className="flex w-full items-center justify-center gap-2 rounded-2xl bg-black px-5 py-3.5 font-semibold text-white transition-all duration-300 hover:bg-cyan-600 hover:shadow-lg dark:bg-white dark:text-black dark:hover:bg-cyan-500 dark:hover:text-white">
            View Details 
            <ArrowRight
              size={18}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </button>
        </Link>
      </div>

      <div className="absolute -bottom-24 left-1/2 h-44 w-44 -translate-x-1/2 rounded-full bg-blue-500/10 blur-3xl" />
    </div>
  );
};

export default IdeaCard;