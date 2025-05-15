"use client";

import { useState } from "react";
import Link from "next/link";
import { X, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SignInSidebar({ isOpen, onClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [showHelp, setShowHelp] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Sign in with:", { email, password, rememberMe });
  };

  return (
    <>
      {isOpen && <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm" onClick={onClose} aria-hidden="true"></div>}

      <div className={`fixed right-0 top-0 z-50 h-full w-full max-w-md transform overflow-y-auto bg-black shadow-xl transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="sticky top-0 z-10 flex items-center justify-between bg-black px-6 py-4 pb-12">
          <h2 className="text-2xl font-bold text-white">Sign In</h2>
          <Button variant="ghost" size="icon" className="cursor-pointer rounded-full text-gray-400 hover:bg-zinc-800 hover:text-white" onClick={onClose}>
            <X size={24} />
            <span className="sr-only">Close sidebar</span>
          </Button>
        </div>

        <div className="px-6 pb-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="peer w-full rounded border border-zinc-700 bg-zinc-800 px-4 py-3 text-white placeholder-transparent focus:border-violet-500 focus:outline-none"
                  placeholder="Email or phone number"
                  required
                />
                <label
                  htmlFor="email"
                  className="absolute left-4 top-1 z-10 -translate-y-6 scale-75 transform text-xs text-gray-400 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-gray-400 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-violet-500"
                >
                  Email or phone number
                </label>
              </div>
            </div>

            <div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="peer w-full rounded border border-zinc-700 bg-zinc-800 px-4 py-3 text-white placeholder-transparent focus:border-violet-500 focus:outline-none"
                  placeholder="Password"
                  required
                />
                <label
                  htmlFor="password"
                  className="absolute left-4 top-1 z-10 -translate-y-6 scale-75 transform text-xs text-gray-400 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-gray-400 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-violet-500"
                >
                  Password
                </label>
                <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOff size={20} className="cursor-pointer" /> : <Eye size={20} className="cursor-pointer" />}
                </button>
              </div>
            </div>

            <Button type="submit" className="cursor-pointer w-full rounded bg-violet-600 py-3 font-medium text-white hover:bg-violet-700">
              Sign In
            </Button>

            <div className="flex items-center justify-between">
              <label className="flex items-center text-sm text-gray-400">
                <input type="checkbox" checked={rememberMe} onChange={() => setRememberMe(!rememberMe)} className="mr-2 h-4 w-4 rounded border-gray-600 bg-zinc-800 text-violet-600 focus:ring-violet-500" />
                Remember me
              </label>
              <div className="relative">
                <button type="button" className="text-sm text-gray-400 hover:underline" onClick={() => setShowHelp(!showHelp)}>
                  Need help?
                </button>
                {showHelp && (
                  <div className="absolute right-0 top-full z-10 mt-2 w-48 rounded border border-zinc-700 bg-black p-2 shadow-lg">
                    <Link href="#" className="block rounded px-3 py-2 text-sm text-gray-300 hover:bg-zinc-800 hover:text-white">
                      Forgot password?
                    </Link>
                    <Link href="#" className="block rounded px-3 py-2 text-sm text-gray-300 hover:bg-zinc-800 hover:text-white">
                      Sign in with a code
                    </Link>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-8 border-t border-zinc-800 pt-6">
              <p className="text-gray-400">
                New to Netflix?{" "}
                <Link href="#" className="text-white hover:underline">
                  Sign up now
                </Link>
              </p>
              <p className="mt-4 text-xs text-gray-500">
                This page is protected by Google reCAPTCHA to ensure you're not a bot.{" "}
                <Link href="#" className="text-blue-500 hover:underline">
                  Learn more
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
