"use client";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import MenuItems from "@/files/menu.json";
import HeaderDropdown from "@/components/header-dropdown";
import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";

export default function Header() {
  const [activeToggle, setActiveToggle] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const handleToggle = (item) => {
    setActiveDropdown(activeDropdown === item ? null : item);
  };

  return (
    <header className="absolute top-0 z-10 w-full px-4 py-4 md:px-12">
      <div className="flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image src="/asset/png/logo.png" priority alt="Nobarin Logo" width={120} height={32} className="h-14 w-auto" />
        </Link>
        <div className="flex items-center gap-4">
          <div className="md:hidden">
            <Button variant="ghost" size="icon" className="text-white cursor-pointer" onClick={() => setActiveToggle(!activeToggle)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="4" x2="20" y1="12" y2="12" />
                <line x1="4" x2="20" y1="6" y2="6" />
                <line x1="4" x2="20" y1="18" y2="18" />
              </svg>
            </Button>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <HeaderDropdown label="Movies" items={MenuItems[0].movie} />

            <HeaderDropdown label="TV" items={MenuItems[1].tv} />

            <HeaderDropdown label="Anime" items={MenuItems[2].anime} />
          </nav>
          <Button className="bg-violet-600 cursor-pointer  hover:bg-violet-700 text-white font-medium px-4 py-1 text-sm rounded">Sign In</Button>
        </div>
      </div>

      {activeToggle && (
        <div className="md:hidden">
          <div className="bg-black/95 px-4 py-3">
            <nav className="flex flex-col space-y-3">
              <div className="border-b border-gray-800 pb-2">
                <div className="flex items-center justify-between py-2 cursor-pointer" onClick={() => handleToggle("movies")}>
                  <span className="text-sm font-medium">Movies</span>
                  <ChevronDown size={16} className={`transition-transform duration-200 ${activeDropdown === "movies" ? "rotate-180" : ""}`} />
                </div>
                {activeDropdown === "movies" && (
                  <div className="pl-4 pt-1">
                    {MenuItems[0].movie.map((item) => (
                      <Link key={item.url} href={item.url} className="block py-1.5 cursor-pointer text-sm text-gray-300 hover:text-white" onClick={() => setActiveToggle(false)}>
                        {item.label} <ChevronRight size={16} className="float-right" />
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <div className="border-b border-gray-800 pb-2">
                <div className="flex items-center justify-between py-2 cursor-pointer" onClick={() => handleToggle("tv")}>
                  <span className="text-sm font-medium">TV</span>
                  <ChevronDown size={16} className={`transition-transform duration-200 ${activeDropdown === "tv" ? "rotate-180" : ""}`} />
                </div>
                {activeDropdown === "tv" && (
                  <div className="pl-4 pt-1">
                    {MenuItems[1].tv.map((item) => (
                      <Link key={item.url} href={item.url} className="block py-1.5 text-sm text-gray-300 hover:text-white" onClick={() => setActiveToggle(false)}>
                        {item.label} <ChevronRight size={16} className="float-right" />
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <div className="border-b border-gray-800 pb-2">
                <div className="flex items-center justify-between py-2 cursor-pointer" onClick={() => handleToggle("anime")}>
                  <span className="text-sm font-medium">Anime</span>
                  <ChevronDown size={16} className={`transition-transform duration-200 ${activeDropdown === "anime" ? "rotate-180" : ""}`} />
                </div>
                {activeDropdown === "anime" && (
                  <div className="pl-4 pt-1">
                    {MenuItems[2].anime.map((item) => (
                      <Link key={item.url} href={item.url} className="block py-1.5 text-sm text-gray-300 hover:text-white" onClick={() => setActiveToggle(false)}>
                        {item.label} <ChevronRight size={16} className="float-right" />
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
