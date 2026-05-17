"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const navLink = (path) =>
    pathname === path
      ? "text-cyan-300 border-b-2 border-cyan-300 pb-1"
      : "text-gray-200 hover:text-cyan-300 transition duration-300";

  return (
    <div
      className="flex justify-between items-center px-8 py-5
      bg-gradient-to-r from-[#0f172a] via-[#1e293b] to-[#0f766e]
      shadow-[0_8px_30px_rgb(0,0,0,0.4)] border-b border-cyan-700/40"
    >
      <div className="flex gap-2 text-white font-bold items-center text-2xl">
        <Image src="/assets/idea.png" width={60} height={50} alt="logo" />

        <p className="bg-gradient-to-r from-cyan-300 to-emerald-300 bg-clip-text text-transparent">
          IdeaVault
        </p>
      </div>

      <ul className="flex gap-6 font-bold items-center text-xl">
        <li>
          <Link href="/" className={navLink("/")}>
            Home
          </Link>
        </li>

        <li>
          <Link href="/ideas" className={navLink("/ideas")}>
            Ideas
          </Link>
        </li>

        <li>
          <Link href="/my-ideas" className={navLink("/my-ideas")}>
            My Ideas
          </Link>
        </li>

        <li>
          <Link href="/my-interactions" className={navLink("/my-interactions")}>
            My Interactions
          </Link>
        </li>

        <li>
          <Link href="/add-idea" className={navLink("/add-idea")}>
            Add Idea
          </Link>
        </li>
      </ul>

      <ul className="flex gap-6 items-center text-xl font-bold">
        <li>
          <Link href="/profile" className={navLink("/profile")}>
            Profile
          </Link>
        </li>

        <li>
          <Link href="/signin">
            <button className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-600 text-white transition duration-300 shadow-lg">
              Sign In
            </button>
          </Link>
        </li>

        <li>
          <Link href="/signup">
            <button className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white transition duration-300 shadow-lg">
              Sign Up
            </button>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
