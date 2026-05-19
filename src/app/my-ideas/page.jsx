"use client";

import React, { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { ArrowRight, Layers3, Lightbulb, Pencil } from "lucide-react";
import Image from "next/image";
import { UpdateMyIdea } from "@/components/UpdateMyIdea";
import { DeleteMyIdea } from "@/components/DeleteMyIdea";

const MyIdeasPage = () => {
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(false);

  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  useEffect(() => {
    if (user?.id) {
      fetchMyIdeas();
    }
  }, [user]);

  const fetchMyIdeas = async () => {
    setLoading(true);

    try {
      const res = await fetch(
        `http://localhost:5000/my-ideas?userId=${user.id}`,
      );

      const data = await res.json();
      setIdeas(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (isPending) {
    return <div className="text-center py-10 text-xl">Loading session...</div>;
  }

  return (
    <div className="my-6 w-11/12 lg:w-10/12 mx-auto">
      <h2 className="text-3xl font-bold text-center my-6">My Ideas</h2>

      {loading && (
        <p className="text-center text-gray-500 mb-4">Loading ideas...</p>
      )}

      {!loading && ideas.length === 0 && (
        <div className="text-center py-10 border rounded-xl bg-gray-50">
          <h3 className="text-xl font-semibold text-gray-600">
            No Ideas Found
          </h3>
          <p className="text-gray-400 mt-2">You haven't added any ideas yet.</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ideas.map((idea) => (
          <div key={idea._id} className="relative">
            <div className="group relative overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={idea.imageUrl}
                  alt={idea.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                <div className="absolute top-4 left-4 flex items-center gap-2 rounded-full bg-white/90 px-4 py-1 text-sm font-semibold text-gray-800 shadow">
                  <Layers3 size={16} />
                  {idea.category}
                </div>
                <div className="absolute top-4 right-2 z-30 flex items-center justify-center gap-2 px-4">
                  <UpdateMyIdea idea={idea} />
                  <DeleteMyIdea idea={idea} />
                </div>
              </div>

              <div className="space-y-4 p-5">
                <div className="flex items-start gap-3">
                  <div className="rounded-xl bg-blue-100 p-2 text-blue-600">
                    <Lightbulb size={20} />
                  </div>

                  <h2 className="line-clamp-2 text-xl font-bold text-gray-900">
                    {idea.title}
                  </h2>
                </div>

                <p className="line-clamp-3 text-sm leading-relaxed text-gray-600">
                  {idea.shortDescription}
                </p>

                <Link href={`/ideas/${idea._id}`}>
                  <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-black px-5 py-3 font-medium text-white transition-all duration-300 hover:bg-blue-600">
                    View Details
                    <ArrowRight size={18} />
                  </button>
                </Link>
              </div>

              <div className="absolute -bottom-16 -right-16 h-40 w-40 rounded-full bg-blue-500/10 blur-3xl" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyIdeasPage;
