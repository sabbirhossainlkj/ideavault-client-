'use client'
import { UpdateProfile } from "@/components/UpdateProfile";
import { authClient } from "@/lib/auth-client";
import { Avatar } from "@heroui/react";
import React from "react";

const ProfilePage = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  console.log(user)
  return (
    <div className="justify-center w-4/12 mx-auto py-3 border rounded-2xl shadow-2xl items-center text-center space-y-2 my-6">
      <Avatar className="w-20 h-20  mx-auto">
        <Avatar.Image alt="John Doe" src={user?.image} />
        <Avatar.Fallback>{user?.name[0]}</Avatar.Fallback>
      </Avatar>
      <h2 className="text-xl font-bold">{user?.name}</h2>
      <p className="text-xl  font-bold">{user?.email}</p>
      <UpdateProfile></UpdateProfile>
    </div>
  );
};

export default ProfilePage;
