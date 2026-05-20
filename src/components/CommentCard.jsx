import React from "react";
import Image from "next/image";
import { MessageCircle, Clock3 } from "lucide-react";
import { Button } from "@heroui/react";
import { DeleteComment } from "./DeleteComment";
import { UpdateComment } from "./UpdateComment";
import { CommentSlash } from "@gravity-ui/icons";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const CommentCard = async () => {
  const { token } = await auth.api.getToken({
    headers: await headers(),
  });
  const res = await fetch("http://localhost:5000/comment", {
    cache: "no-store",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  const comments = await res.json();

  return (
    <section className="my-16 max-w-4xl mx-auto px-4">
      <div className="mb-10 text-center">
        <h2 className="mt-5 text-4xl md:text-5xl font-black tracking-tight text-gray-900">
          Total Comments
        </h2>
      </div>

      {comments.length === 0 && (
        <div className="rounded-3xl border border-dashed border-gray-300 bg-white p-10 text-center shadow-sm">
          <h3 className="text-2xl font-bold text-gray-700">No comments yet</h3>

          <p className="mt-2 text-gray-500">
            Be the first person to share your thoughts.
          </p>
        </div>
      )}

      <div className="space-y-6">
        {comments.map((coment) => (
          <div
            key={coment._id}
            className="group relative overflow-hidden rounded-[28px] border border-white/20 bg-white/70 backdrop-blur-xl p-6 shadow-lg transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl"
          >
            <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
              <div className="absolute -top-16 -right-16 h-40 w-40 rounded-full bg-pink-400/20 blur-3xl" />
              <div className="absolute -bottom-20 -left-10 h-40 w-40 rounded-full bg-cyan-400/20 blur-3xl" />
            </div>

            <div className="relative flex gap-4">
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border-4 border-white shadow-lg ring-2 ring-pink-300">
                <Image
                  src={
                    coment.userImage || "https://i.ibb.co/4pDNDk1/avatar.png"
                  }
                  alt={coment.userName}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex-1">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">
                      {coment.userName}
                    </h3>

                    <div className="mt-1 flex items-center gap-1 text-xs text-gray-400">
                      <Clock3 size={13} />
                      {new Date(coment.createdAt).toLocaleString()}
                    </div>
                  </div>
                </div>
                <div className="absolute top-5 right-5 z-20 flex items-center gap-3">
                  <UpdateComment coment={coment} />
                  <DeleteComment coment={coment} />
                </div>

                <div className="mt-4 rounded-2xl bg-gray-50/80 p-4 border border-gray-100">
                  <p className="leading-relaxed text-gray-700 text-sm md:text-base">
                    {coment.comment}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CommentCard;
