"use client";

import { authClient } from "@/lib/auth-client";
import { Button } from "@heroui/react";
import { toast } from "react-hot-toast";

const PostComment = ({ ideas }) => {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const handleComment = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error("Please login first");
      return;
    }

    const form = e.target;
    const comment = form.review.value;

    const commentData = {
      ideaId: ideas._id,
      userId: user?.id,
      userName: user?.name,
      userImage: user?.image,
      comment,
      createdAt: new Date(),
    };

    try {
      const res = await fetch("http://localhost:5000/comment", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(commentData),
      });

      const data = await res.json();

      if (data.insertedId || data.success) {
        toast.success("Comment posted successfully 💬");

        form.reset();
      } else {
        toast.error("Failed to post comment");
      }
    } catch (error) {
      console.log(error);

      toast.error("Something went wrong");
    }
  };

  return (
    <div className="max-w-2xl mx-auto rounded-3xl border border-white/20 bg-white/60 backdrop-blur-xl shadow-xl p-8 transition-all duration-300 hover:shadow-2xl">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Comment
      </h2>

      <form onSubmit={handleComment} className="space-y-5">
        <textarea
          name="review"
          placeholder="Write your thoughts..."
          rows={5}
          className="w-full px-5 py-4 rounded-2xl border border-gray-200 bg-white/80 text-gray-700 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:border-transparent transition-all resize-none"
          required
        />

        <div className="flex justify-center">
          <Button
            variant="primary"
            type="submit"
            className="px-8 py-3 rounded-2xl text-white font-semibold text-sm tracking-wide shadow-md hover:scale-105 hover:shadow-lg transition-all duration-300"
          >
            Post Comment
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PostComment;