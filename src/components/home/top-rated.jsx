"use client";
import Link from "next/link";
import Image from "next/image";
import { Star, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { HomeTopRatedSkeleton } from "../ui/skeleton";
import { formattedTitle } from "@/utils/formatter";

export default function TopRatedList() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const tmdbImageUrl = process.env.NEXT_PUBLIC_TMDB_IMAGE_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/movie/top-rated`);
        const data = await response.json();
        setData(data.results);
      } catch (error) {
        console.error("Error fetching data:", error.message);
        // setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-zinc-900/50 rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-white">Top Rated</h2>
        <Button variant="link" size="sm" asChild className="text-sm text-gray-400 hover:text-white p-0">
          <Link href="/movie/top-rated" className="flex items-center">
            View All
            <ChevronRight size={16} className="ml-1" />
          </Link>
        </Button>
      </div>

      <div className="space-y-3 max-h-[calc(100vh-180px)] overflow-y-auto pr-1 scrollbar-thin">
        {isLoading
          ? Array.from({ length: 5 }).map((_, index) => <HomeTopRatedSkeleton key={index} />)
          : data &&
            data.length > 0 &&
            data.slice(0, 5).map((movie, index) => (
              <Link href={formattedTitle("movie", movie.id, movie.title)} key={`${index}${movie.id}`} className="group">
                <div className="flex gap-3 rounded-lg p-2 transition-colors hover:bg-zinc-800/50">
                  <div className="relative h-16 w-12 flex-shrink-0 rounded">
                    <div className="absolute -left-2 -top-1 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-violet-500 text-xs font-bold">{index + 1}</div>
                    <Image src={movie.poster_path ? `${tmdbImageUrl}${movie.poster_path}` : "/asset/svg/placeholder.svg"} alt={movie.title} fill className="object-cover transition-transform duration-300 group-hover:scale-110" />
                  </div>
                  <div className="flex flex-1 flex-col justify-center overflow-hidden">
                    <h3 className="truncate text-sm font-medium leading-tight group-hover:text-violet-500">{movie.title}</h3>
                    <div className="mt-1 flex items-center text-xs text-gray-400">
                      <span>{new Date(movie.release_date).getFullYear()}</span>
                      <span className="mx-1.5">•</span>
                      <div className="flex items-center">
                        <Star size={10} className="mr-1 fill-yellow-500 text-yellow-500" />
                        <span>{movie.vote_average.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
      </div>
    </div>
  );
}
