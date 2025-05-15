"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

export default function HeaderDropdown({ label, items }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative z-100" onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
      <button className="cursor-pointer flex items-center gap-1 text-sm font-medium text-gray-200 transition-colors hover:text-white focus:outline-none" onClick={() => setIsOpen(!isOpen)}>
        {label}
        <ChevronDown size={16} className={`text-gray-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute left-0 top-full z-50 mt-1 w-48 rounded border border-zinc-800 bg-black/95 p-1 text-white backdrop-blur-sm" onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
          {items.map((item) => (
            <Link key={item.url} href={item.url} className="cursor-pointer block w-full rounded px-3 py-2 text-sm text-gray-200 hover:bg-zinc-800 hover:text-white" onClick={() => setIsOpen(false)}>
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
