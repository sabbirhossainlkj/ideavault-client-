"use client";

import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";

const MyInteractions = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [comments, setComments] = useState([]);

  useEffect(() => {
    if (user?.id) {
      fetchInteractions();
    }
  }, [user]);

  const fetchInteractions = async () => {
    const { data: tokenData } = await authClient.token();
    console.log(tokenData);
    const res = await fetch(
      `http://localhost:5000/my-interactions?userId=${user.id}`,
      {
        headers: {
          authorization: `Bearer ${tokenData?.token}`,
        },
      },
    );

    const data = await res.json();

    setComments(data);
  };

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <h2 className="text-4xl font-bold text-center mb-3">My Interactions</h2>

      <div className="flex justify-center mb-8">
        <div className="px-6 py-2 rounded-full bg-black text-white font-semibold shadow-md">
          Total Comments: {comments.length}
        </div>
      </div>

      <div className="space-y-5">
        {comments.length === 0 ? (
          <p className="text-center text-gray-500">No interactions found </p>
        ) : (
          comments.map((comment) => (
            <div
              key={comment._id}
              className="p-6 rounded-3xl border bg-white shadow-lg hover:shadow-xl transition"
            >
              <h3 className="text-xl font-bold text-gray-800">
                {comment.ideaTitle}
              </h3>

              <p className="mt-3 text-gray-600">{comment.comment}</p>

              <p className="text-sm text-gray-400 mt-2">
                {new Date(comment.createdAt).toLocaleString()}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyInteractions;
