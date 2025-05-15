"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Pagination from "@/components/home/pagination";
import Link from "next/link";
import { formattedTitle } from "@/utils/formatter";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { HomeCardSkeleton } from "@/components/ui/skeleton";

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
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">{title}</h2>
        <Button variant="link" size="sm" asChild className="text-sm text-gray-400 hover:text-white p-0">
          <Link href={`/${type}/${url}`} className="flex items-center">
            View All
            <ChevronRight size={16} className="ml-1" />
          </Link>
        </Button>
      </div>

      <div className="relative">
        {error ? (
          <p className="text-red-400">Terjadi kesalahan saat memuat data.</p>
        ) : (
          <>
            {scrollPosition > 0 && !isLoading && <Pagination direction="left" handleScroll={handleScroll} />}

            <div ref={carouselRef} className="flex gap-4 overflow-x-auto scrollbar-hide pb-4" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
              {isLoading && Array.from({ length: 7 }).map((_, index) => <HomeCardSkeleton key={index} />)}

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
