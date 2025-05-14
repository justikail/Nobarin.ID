"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Minus } from "lucide-react";
import Image from "next/image";
import FaqItems from "@/files/faq.json";

export default function Faq() {
  const [openItem, setOpenItem] = useState(null);

  const toggleItem = (id) => {
    setOpenItem(openItem === id ? null : id);
  };

  return (
    <>
      <section className="py-10 px-4 md:px-12 bg-black">
        <div className="max-w-6xl mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Tonton di mana pun</h2>
            <p className="text-lg md:text-xl">Streaming film, TV Series, dan Anime di ponsel, tablet, laptop, dan komputermu secara gratis di Nobarin.ID.</p>
          </div>
          <div className="flex-1 relative">
            <Image src="/asset/webp/image-1.webp" alt="Image 1" width="500" height="400" className="relative z-10" />
          </div>
        </div>
      </section>
      <section className="py-12 px-4 md:px-12 bg-black">
        <h2 className="text-2xl font-bold mb-8 text-center">Frequently Asked Questions</h2>

        <div className="mx-auto max-w-3xl space-y-3">
          {FaqItems.map((item) => (
            <div key={item.id} className="overflow-hidden rounded bg-zinc-800">
              <button onClick={() => toggleItem(item.id)} className="flex w-full items-center justify-between p-5 text-left text-lg font-medium cursor-pointer">
                {item.question}
                {openItem === item.id ? <Minus className="h-6 w-6 flex-shrink-0" /> : <Plus className="h-6 w-6 flex-shrink-0" />}
              </button>

              {openItem === item.id && (
                <div className="border-t border-zinc-700 p-5">
                  <p>{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="mb-6 text-lg">Siap menonton? Masukkan email untuk membuat atau memulai keanggotaanmu.</p>

          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <input type="email" placeholder="Email address" className="w-full max-w-md rounded border border-gray-600 bg-black bg-opacity-50 px-4 py-3 text-white placeholder-gray-400 focus:border-gray-500 focus:outline-none sm:w-96" />
            <Button className="flex cursor-pointer items-center gap-2 bg-violet-600 px-6 py-6 text-lg font-semibold hover:bg-violet-700">
              Mulai
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.5 5L15.5 12L8.5 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
