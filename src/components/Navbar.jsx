"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Avatar } from "@heroui/react";
import { MdDarkMode } from "react-icons/md";
import { IoIosSunny } from "react-icons/io";
import { Settings, LogOut, Menu, X } from "lucide-react";

const Navbar = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const pathname = usePathname();

  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState("light");
  const [open, setOpen] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    setMounted(true);

    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);

    document.documentElement.classList.toggle(
      "dark",
      savedTheme === "dark"
    );
  }, []);

  if (!mounted) return null;

  const navLink = (path) =>
    pathname === path
      ? "text-cyan-300 border-b-2 border-cyan-300 pb-1"
      : "text-gray-200 hover:text-cyan-300 transition";

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";

    setTheme(newTheme);

    document.documentElement.classList.toggle(
      "dark",
      newTheme === "dark"
    );

    localStorage.setItem("theme", newTheme);
  };

  const handleSignOut = async () => {
    await authClient.signOut();
  };

  return (
    <div className="bg-gradient-to-r from-[#0f172a] via-[#1e293b] to-[#0f766e] shadow-lg border-b border-cyan-700/40 sticky top-0 z-50">
      
      {/* Desktop + Mobile Navbar */}
      <div className="flex justify-between items-center px-4 md:px-8 py-4">
        
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/assets/idea.png"
            width={55}
            height={55}
            alt="logo"
            className="w-12 md:w-14"
          />

          <p className="text-xl md:text-2xl font-bold bg-gradient-to-r from-cyan-300 to-emerald-300 bg-clip-text text-transparent">
            IdeaVault
          </p>
        </Link>

        <div className="hidden lg:flex gap-6 font-bold items-center text-lg">
          <Link href="/" className={navLink("/")}>
            Home
          </Link>

          <Link href="/ideas" className={navLink("/ideas")}>
            Ideas
          </Link>

          {user && (
            <>
              <Link
                href="/my-ideas"
                className={navLink("/my-ideas")}
              >
                My Ideas
              </Link>

              <Link
                href="/my-interactions"
                className={navLink("/my-interactions")}
              >
                Interactions
              </Link>

              <Link
                href="/add-idea"
                className={navLink("/add-idea")}
              >
                Add Idea
              </Link>
            </>
          )}
        </div>

        <div className="flex items-center gap-3">
          
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl bg-gray-200 dark:bg-gray-700 text-black dark:text-white transition"
          >
            {theme === "light" ? (
              <MdDarkMode size={20} />
            ) : (
              <IoIosSunny size={20} />
            )}
          </button>

          <div className="hidden lg:flex items-center gap-4 font-bold">
            {!user ? (
              <>
                <Link
                  href="/signin"
                  className={navLink("/signin")}
                >
                  LogIn
                </Link>

                <Link
                  href="/signup"
                  className={navLink("/signup")}
                >
                  Register
                </Link>
              </>
            ) : (
              <div className="relative">
                <div
                  onClick={() => setOpen(!open)}
                  className="cursor-pointer"
                >
                  <Avatar size="lg">
                    <Avatar.Image
                      referrerPolicy="no-referrer"
                      src={user?.image}
                      alt={user?.name}
                    />

                    <Avatar.Fallback>
                      {user?.name?.charAt(0)}
                    </Avatar.Fallback>
                  </Avatar>
                </div>

                {open && (
                  <div className="absolute right-0 mt-3 w-52 rounded-xl bg-white shadow-lg border p-2 z-50">
                    
                    <Link
                      href="/profile"
                      className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100"
                      onClick={() => setOpen(false)}
                    >
                      <Settings size={16} />
                      Profile
                    </Link>

                    <button
                      onClick={handleSignOut}
                      className="flex items-center gap-2 w-full px-3 py-2 text-red-500 rounded-lg hover:bg-gray-100"
                    >
                      <LogOut size={16} />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          <button
            onClick={() => setMobileMenu(!mobileMenu)}
            className="lg:hidden text-white"
          >
            {mobileMenu ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {mobileMenu && (
        <div className="lg:hidden px-4 pb-5 flex flex-col gap-4 font-semibold text-base bg-[#0f172a]/95 backdrop-blur-md">
          
          <Link
            href="/"
            className={navLink("/")}
            onClick={() => setMobileMenu(false)}
          >
            Home
          </Link>

          <Link
            href="/ideas"
            className={navLink("/ideas")}
            onClick={() => setMobileMenu(false)}
          >
            Ideas
          </Link>

          {user && (
            <>
              <Link
                href="/my-ideas"
                className={navLink("/my-ideas")}
                onClick={() => setMobileMenu(false)}
              >
                My Ideas
              </Link>

              <Link
                href="/my-interactions"
                className={navLink("/my-interactions")}
                onClick={() => setMobileMenu(false)}
              >
                Interactions
              </Link>

              <Link
                href="/add-idea"
                className={navLink("/add-idea")}
                onClick={() => setMobileMenu(false)}
              >
                Add Idea
              </Link>

              <Link
                href="/profile"
                className="text-gray-200 hover:text-cyan-300 transition"
                onClick={() => setMobileMenu(false)}
              >
                Profile
              </Link>

              <button
                onClick={handleSignOut}
                className="flex items-center gap-2 text-red-400"
              >
                <LogOut size={18} />
                Sign Out
              </button>
            </>
          )}

          {!user && (
            <>
              <Link
                href="/signin"
                className={navLink("/signin")}
                onClick={() => setMobileMenu(false)}
              >
                LogIn
              </Link>

              <Link
                href="/signup"
                className={navLink("/signup")}
                onClick={() => setMobileMenu(false)}
              >
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;