"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { formattedTitle } from "@/utils/formatter";
import { getGenreNames } from "@/utils/getGenreNames";

export default function MediaList({ data, genres, mediaType }) {
  const tmdbImageUrl = process.env.NEXT_PUBLIC_TMDB_IMAGE_URL;

  return (
    <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {data.map((item, index) => (
        <Link key={index} href={formattedTitle(mediaType, item.id, item.title || item.name)} className="group">
          <div className="overflow-hidden rounded-md">
            <div className="aspect-[2/3] relative">
              <Image
                src={item.poster_path ? `${tmdbImageUrl}${item.poster_path}` : "/asset/svg/placeholder.svg"}
                alt={`Poster ${item.title || item.name}`}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="absolute bottom-0 left-0 w-full p-3 opacity-0 transition-opacity group-hover:opacity-100">
                <div className="flex items-center gap-2">
                  <Button size="sm" className="h-8 w-8 rounded-full bg-white text-black hover:bg-white/90 p-0">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                    <span className="sr-only">Play</span>
                  </Button>
                  <div className="text-xs font-medium">{item.adult ? "18+" : "PG"}</div>
                  <div className="text-xs">{typeof item.vote_average === "number" ? item.vote_average.toFixed(2) : "-"}</div>
                </div>
              </div>
            </div>
          </div>
          <h3 className="mt-2 text-sm font-medium">{item.title || item.name || "?"}</h3>
          <p className="text-xs text-gray-400">
            {item.release_date || item.first_air_date ? new Date(item.release_date || item.first_air_date).getFullYear() : "-"} • {getGenreNames(item.genre_ids, genres)}
          </p>
        </Link>
      ))}
    </div>
  );
}
