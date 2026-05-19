"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Avatar, Button } from "@heroui/react";
import { MdDarkMode } from "react-icons/md";
import { IoIosSunny } from "react-icons/io";

const Navbar = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const pathname = usePathname();

  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    setMounted(true);

    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.classList.toggle("dark", savedTheme === "dark");
  }, []);

  if (!mounted) return null;

  const navLink = (path) =>
    pathname === path
      ? "text-cyan-300 border-b-2 border-cyan-300 pb-1"
      : "text-gray-200 hover:text-cyan-300 transition";

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);

    document.documentElement.classList.toggle("dark", newTheme === "dark");

    localStorage.setItem("theme", newTheme);
  };

  const handleSignOut = async () => {
    await authClient.signOut();
  };

  return (
    <div className="flex justify-between items-center px-8 py-5 bg-gradient-to-r from-[#0f172a] via-[#1e293b] to-[#0f766e] shadow-lg border-b border-cyan-700/40">
      <div className="flex gap-2 text-white font-bold items-center text-2xl">
        <Image src="/assets/idea.png" width={70} height={60} alt="logo" />
        <p className="bg-gradient-to-r from-cyan-300 to-emerald-300 bg-clip-text text-transparent">
          IdeaVault
        </p>
      </div>

      <div className="flex gap-6 font-bold items-center text-xl">
        <Link href="/" className={navLink("/")}>
          Home
        </Link>
        <Link href="/ideas" className={navLink("/ideas")}>
          Ideas
        </Link>
        {user && (
          <div className="flex  gap-3">
            <Link href="/my-ideas" className={navLink("/my-ideas")}>
              My Ideas
            </Link>
            <Link
              href="/my-interactions"
              className={navLink("/my-interactions")}
            >
              Interactions
            </Link>
            <Link href="/add-idea" className={navLink("/add-idea")}>
              Add Idea
            </Link>
          </div>
        )}
      </div>

      <div className="flex gap-4 items-center text-xl font-bold">
        <button
          onClick={toggleTheme}
          className="px-3 py-1 rounded-xl bg-gray-200 dark:bg-gray-700 text-black dark:text-white transition"
        >
          {theme === "light" ? <MdDarkMode /> : <IoIosSunny />}
        </button>

        <Link href="/profile" className={navLink("/profile")}>
          Profile
        </Link>

        {!user ? (
          <>
            <Link href="/signin" className={navLink("/signin")}>
              LogIn
            </Link>
            <Link href="/signup" className={navLink("/signup")}>
              Register
            </Link>
          </>
        ) : (
          <div className="flex items-center gap-3">
            <Avatar size="lg">
              <Avatar.Image
                referrerPolicy="no-referrer"
                src={user?.image}
                alt={user?.name}
              />
              <Avatar.Fallback>{user?.name?.charAt(0)}</Avatar.Fallback>
            </Avatar>

            <Button variant="danger" onClick={handleSignOut} size="lg">
              SignOut
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
