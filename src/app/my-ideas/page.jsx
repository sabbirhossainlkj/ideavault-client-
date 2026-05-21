"use client";

import React, { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { ArrowRight, Layers3, Lightbulb } from "lucide-react";
import Image from "next/image";
import { UpdateMyIdea } from "@/components/UpdateMyIdea";
import { DeleteMyIdea } from "@/components/DeleteMyIdea";

const MyIdeasPage = () => {
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(false);

  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  useEffect(() => {
    if (user?.id) fetchIdeas();
  }, [user]);

  const fetchIdeas = async () => {
    setLoading(true);

    try {
      const { data: tokenData } = await authClient.token();

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/my-ideas?userId=${user.id}`,
        {
          headers: {
            authorization: `Bearer ${tokenData?.token}`,
          },
        }
      );

      const data = await res.json();
      setIdeas(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setIdeas([]);
    } finally {
      setLoading(false);
    }
  };

  if (isPending) {
    return (
      <p className="text-center py-10 text-lg">
        Loading session...
      </p>
    );
  }

  return (
    <section className="w-11/12 lg:w-10/12 mx-auto my-10">
      
      <h1 className="text-3xl font-bold text-center mb-10">
        My Ideas
      </h1>

      {loading && (
        <p className="text-center text-gray-500 mb-6">
          Loading ideas...
        </p>
      )}

      {!loading && ideas.length === 0 && (
        <div className="text-center py-12 border rounded-2xl bg-gray-50">
          <h3 className="text-xl font-semibold text-gray-600">
            No Ideas Found
          </h3>
          <p className="text-gray-400 mt-2">
            You haven't added any ideas yet.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ideas.map((idea) => (
          <div
            key={idea._id}
            className="group relative overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
          >
            <div className="relative h-56 overflow-hidden">
              <Image
                src={idea.imageUrl}
                alt={idea.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

              <div className="absolute top-4 left-4 flex items-center gap-2 rounded-full bg-white/90 px-4 py-1 text-xs font-semibold text-gray-800 shadow">
                <Layers3 size={14} />
                {idea.category}
              </div>

              <div className="absolute top-4 right-4 flex gap-2 z-20">
                <UpdateMyIdea idea={idea} />
                <DeleteMyIdea idea={idea} />
              </div>

              <div className="absolute bottom-4 left-4 right-4">
                <h2 className="text-lg font-bold text-white line-clamp-2">
                  {idea.title}
                </h2>
              </div>
            </div>

            <div className="p-5 space-y-4">
              
              <div className="flex gap-3 items-start">
                <div className="rounded-xl bg-cyan-100 p-2 text-cyan-600">
                  <Lightbulb size={18} />
                </div>

                <p className="text-sm text-gray-600 line-clamp-3">
                  {idea.shortDescription}
                </p>
              </div>

              <Link href={`/ideas/${idea._id}`}>
                <button className="w-full flex items-center justify-center gap-2 rounded-xl bg-black px-5 py-3 font-medium text-white transition hover:bg-cyan-500">
                  View Details
                  <ArrowRight size={16} />
                </button>
              </Link>
            </div>

            <div className="absolute -bottom-16 -right-16 h-40 w-40 rounded-full bg-cyan-500/10 blur-3xl" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default MyIdeasPage;