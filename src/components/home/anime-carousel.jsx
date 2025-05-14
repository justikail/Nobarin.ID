"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Pagination from "@/components/home/pagination";
import Link from "next/link";
import { formattedTitle } from "@/utils/formatter";

export default function AnimeCarousel({ type, title, url }) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [data, setData] = useState([]);
  const [scrollPosition, setScrollPosition] = useState(0);
  const carouselRef = useRef(null);

  const scrollAmount = 300;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/anime/popular`);
        const data = await response.json();
        setData(data.results);
      } catch (error) {
        console.error("Error fetching popular anime:", error.message);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleScroll = (direction) => {
    if (!carouselRef.current) return;
    const newPosition = direction === "left" ? Math.max(0, scrollPosition - scrollAmount) : scrollPosition + scrollAmount;

    carouselRef.current.scrollTo({ left: newPosition, behavior: "smooth" });
    setScrollPosition(newPosition);
  };

  return (
    <section className="py-12 px-4 md:px-12 bg-black">
      <Link href={`/${type}/${url}`}>
        <h2 className="text-2xl font-bold mb-6 transition-all inline-flex items-center group">
          {title}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="ml-2 h-5 w-5 opacity-100 md:opacity-0 transition-opacity md:group-hover:opacity-100"
          >
            <path d="m9 18 6-6-6-6" />
          </svg>
        </h2>
      </Link>

      <div className="relative">
        {error ? (
          <p className="text-red-400">Terjadi kesalahan saat memuat data.</p>
        ) : (
          <>
            {scrollPosition > 0 && !isLoading && <Pagination direction="left" handleScroll={handleScroll} />}

            <div ref={carouselRef} className="flex gap-4 overflow-x-auto scrollbar-hide pb-4" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
              {isLoading &&
                Array.from({ length: 7 }).map((_, index) => (
                  <div key={`skeleton-${index}`} className="relative flex-shrink-0 animate-pulse">
                    <div className="relative h-[200px] w-[140px] md:h-[250px] md:w-[180px] overflow-hidden rounded bg-zinc-800">
                      <div className="absolute bottom-0 left-0 w-full">
                        <div className="absolute top-[-80px] left-2">
                          <div className="h-16 w-10 rounded-md bg-zinc-700"></div>
                        </div>
                      </div>
                      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-zinc-700/20 to-transparent"></div>
                    </div>
                    <div className="mt-2 h-4 w-3/4 rounded bg-zinc-800"></div>
                  </div>
                ))}

              {!isLoading &&
                data.length > 0 &&
                data.map((item, index) => (
                  <Link href={formattedTitle("anime", null, item.title)} key={index} className="relative flex-shrink-0">
                    <div className="relative h-[200px] w-[140px] md:h-[250px] md:w-[180px] overflow-hidden rounded">
                      <Image
                        src={item.thumbnail_url ? item.thumbnail_url : "/asset/svg/placeholder.svg"}
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = "/asset/svg/placeholder.svg";
                        }}
                        alt={`Poster ${item.title}`}
                        priority={false}
                        width={180}
                        height={250}
                        className="h-full opacity-75 hover:opacity-100 cursor-pointer w-full object-cover duration-300 hover:scale-110 transition-all ease-in-out"
                      />
                      <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black to-transparent p-2">
                        <div className="absolute top-[-50px] left-0 text-6xl font-bold text-white/20">{index + 1}</div>
                      </div>
                    </div>
                    <p className="mt-2 text-sm text-gray-300">{item.title.length > 15 ? item.title.slice(0, 15) + "..." : item.title}</p>
                  </Link>
                ))}

              {!isLoading && data.length === 0 && <p className="text-gray-400">Tidak ada data.</p>}
            </div>

            {!isLoading && data.length > 0 && <Pagination direction="right" handleScroll={handleScroll} />}
          </>
        )}
      </div>
    </section>
  );
}
