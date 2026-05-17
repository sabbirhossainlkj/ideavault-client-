"use client";

import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

import { FaFacebook, FaTwitter, FaLinkedin, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="relative overflow-hidden bg-[#020617] text-gray-300 mt-24">
      <div className="h-[2px] w-full bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500" />

      <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_20%_20%,#22d3ee,transparent_40%),radial-gradient(circle_at_80%_30%,#a855f7,transparent_45%),radial-gradient(circle_at_50%_80%,#3b82f6,transparent_45%)]" />

      <div className="relative max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-12">
        <div>
          <h2 className="text-white text-xl font-bold mb-5">IdeaVault</h2>

          <ul className="space-y-3 text-sm">
            {["Ideas", "Categories", "Startups", "Trending"].map((item) => (
              <li key={item}>
                <Link
                  href="#"
                  className="hover:text-cyan-400 transition hover:translate-x-1 inline-block"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-white text-xl font-bold mb-5">Contact</h2>

          <div className="space-y-4 text-sm">
            <p className="flex items-center gap-3 hover:text-cyan-400 transition">
              <Mail size={16} /> support@startuphub.com
            </p>

            <p className="flex items-center gap-3 hover:text-cyan-400 transition">
              <Phone size={16} /> +880 1234-567890
            </p>

            <p className="flex items-center gap-3 hover:text-cyan-400 transition">
              <MapPin size={16} /> Dhaka, Bangladesh
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-white text-xl font-bold mb-5">Follow Us</h2>

          <div className="space-y-3">
            <a className="flex items-center gap-3 hover:text-blue-400 transition hover:translate-x-2">
              <FaFacebook /> Facebook
            </a>

            <a className="flex items-center gap-3 hover:text-sky-400 transition hover:translate-x-2">
              <FaTwitter /> Twitter
            </a>

            <a className="flex items-center gap-3 hover:text-blue-500 transition hover:translate-x-2">
              <FaLinkedin /> LinkedIn
            </a>

            <a className="flex items-center gap-3 hover:text-red-400 transition hover:translate-x-2">
              <FaYoutube /> YouTube
            </a>
          </div>
        </div>
      </div>

      <div className="relative border-t border-white/10 py-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Startup Hub. Built with for innovators.
      </div>
    </footer>
  );
};
export default Footer;
