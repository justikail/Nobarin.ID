import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";

export default function Pagination({ direction, handleScroll }) {
  return (
    <button
      onClick={() => handleScroll(`${direction}`)}
      className={`absolute ${direction}-0 top-1/2 h-full group z-10 -translate-y-1/2 bg-white/20 rounded-tr-sm rounded-br-sm p-2 text-white cursor-pointer hidden md:block`}
      aria-label={`Scroll ${direction}`}
    >
      {direction === "left" ? <ChevronLeft size={24} className="group-hover:scale-110 transition-all" /> : <ChevronRight size={24} className="group-hover:scale-110 transition-all" />}
    </button>
  );
}
