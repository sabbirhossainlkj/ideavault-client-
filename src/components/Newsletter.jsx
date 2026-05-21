"use client";

import React from "react";
import { Mail, SendHorizonal } from "lucide-react";

const NewsletterSection = () => {
  return (
    <section className="relative overflow-hidden py-20 px-4 bg-gradient-to-br from-slate-100 via-cyan-50 to-purple-100">

      <div className="absolute top-0 left-0 w-72 h-72 bg-cyan-300/20 blur-3xl rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-300/20 blur-3xl rounded-full"></div>

      <div className="max-w-5xl mx-auto relative z-10">

        <div className="relative overflow-hidden rounded-[32px] border border-white/40 bg-white/70 backdrop-blur-xl shadow-2xl p-8 md:p-14 text-center">

          <div className="absolute -top-10 -right-10 w-40 h-40 bg-cyan-400/20 blur-3xl rounded-full"></div>
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-400/20 blur-3xl rounded-full"></div>

          <div className="relative z-10 mx-auto w-20 h-20 rounded-3xl bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center shadow-xl">
            <Mail className="text-white w-10 h-10" />
          </div>

          <h2 className="relative z-10 mt-8 text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
            Subscribe To Our{" "}
            <span className="bg-gradient-to-r from-cyan-600 to-purple-600 bg-clip-text text-transparent">
              Newsletter
            </span>
          </h2>

          <p className="relative z-10 mt-5 text-gray-600 max-w-2xl mx-auto leading-8 text-lg">
            Get the latest startup ideas, trending innovations,
            and exclusive updates directly in your inbox.
          </p>

          <form className="relative z-10 mt-10 flex flex-col md:flex-row gap-4 max-w-3xl mx-auto">

            <div className="relative flex-1">

              <input
                type="email"
                placeholder="Enter your email address"
                className="w-full h-14 rounded-2xl border border-gray-200 bg-white/80 backdrop-blur-lg px-5 pr-14 outline-none focus:ring-2 focus:ring-cyan-400 text-gray-700 shadow-sm"
              />

              <Mail className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />

            </div>

            <button
              type="submit"
              className="group h-14 px-8 rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
            >
              Subscribe

              <SendHorizonal className="w-5 h-5 group-hover:translate-x-1 transition duration-300" />
            </button>

          </form>

          <p className="relative z-10 mt-5 text-sm text-gray-500">
            No spam. Only valuable startup ideas & updates 
          </p>

        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;