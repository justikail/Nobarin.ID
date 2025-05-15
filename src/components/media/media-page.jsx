"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { ChevronLeft, Search, SlidersHorizontal } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/ui/loader";
import MediaList from "@/components/media/media-list";
import CategoryText from "@/files/category.json";
import { formattedDate } from "@/utils/formatter";

export default function MediaPage({ mediaType, categoryType, searchParams }) {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState(false);
  const [genres, setGenres] = useState([]);
  const [rangeDate, setRangeDate] = useState(null);
  const router = useRouter();
  const pathname = usePathname();
  const queryPage = parseInt(searchParams?.page || "1", 10);
  const [page, setPage] = useState(queryPage);

  const fetchGenres = async () => {
    try {
      const response = await fetch(`/api/${mediaType}/genres`);
      const data = await response.json();
      setGenres(data.results);
    } catch (error) {
      console.error("Error fetching genres:", error.message);
    }
  };

  const fetchData = async (currentPage = 1) => {
    try {
      setIsLoading(true);
      setError(false);
      const response = await fetch(`/api/${mediaType}/${categoryType}?page=${currentPage}`);
      if (!response.ok) setError(true);
      const data = await response.json();
      if (data.dates) setRangeDate(data.dates);
      setTotalPages(data.total_pages);
      setData(data.results);
    } catch (error) {
      console.error("Error fetching data:", error.message);
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchGenres();
  }, []);

  useEffect(() => {
    fetchData(queryPage);
    setPage(queryPage);
  }, [queryPage]);

  const updatePage = (newPage) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage.toString());
    router.push(`${pathname}?${params.toString()}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const filteredShows =
    data &&
    data.filter((item) => {
      const matchesSearch = (item.title || item.name).toLowerCase().includes(searchQuery.toLowerCase());
      const matchesGenre = selectedGenre ? item.genre_ids.includes(selectedGenre) : true;
      return matchesSearch && matchesGenre;
    });

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="sticky top-0 z-10 bg-black/90 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Link href="/" className="mr-2">
                <Button variant="ghost" size="icon" className="cursor-pointer rounded-full">
                  <ChevronLeft size={24} />
                </Button>
              </Link>
              <h1 className="text-xl font-bold">
                {mediaType === "movie" ? "Film" : "TV"} {CategoryText[categoryType]}{" "}
              </h1>
            </div>
            <Button variant="ghost" size="icon" className="rounded-full cursor-pointer" onClick={() => setShowFilters(!showFilters)}>
              <SlidersHorizontal size={20} />
            </Button>
          </div>

          <div className="mt-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Cari judul film"
                className="w-full rounded-full bg-zinc-800 py-2 pl-10 pr-4 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-600"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {showFilters && (
              <div className="mt-4 rounded-lg bg-zinc-900 p-4">
                {rangeDate && (
                  <h3 className="mb-2 text-sm font-medium text-gray-300">
                    Rentang Waktu : {formattedDate(rangeDate.minimum)} - {formattedDate(rangeDate.maximum)}
                  </h3>
                )}
                <h3 className="mb-2 text-sm font-medium text-gray-300">Filter by Genre : </h3>
                <div className="flex flex-wrap gap-2">
                  <button className={`cursor-pointer rounded-full px-3 py-1 text-xs ${selectedGenre === null ? "bg-violet-600 text-white" : "bg-zinc-800 text-gray-300 hover:bg-zinc-700"}`} onClick={() => setSelectedGenre(null)}>
                    All
                  </button>
                  {genres.map((genre) => (
                    <button
                      key={genre.id}
                      className={`cursor-pointer rounded-full px-3 py-1 text-xs ${selectedGenre === genre.id ? "bg-violet-600 text-white" : "bg-zinc-800 text-gray-300 hover:bg-zinc-700"}`}
                      onClick={() => setSelectedGenre(genre.id)}
                    >
                      {genre.name}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        {isLoading ? (
          <Loader />
        ) : error ? (
          <div className="flex h-40 flex-col items-center justify-center rounded-lg bg-red-800/30 p-6 text-center text-red-200">
            <p className="text-lg font-semibold">Gagal memuat data</p>
            <p className="mt-1 text-sm">Silakan periksa koneksi Anda atau coba lagi nanti.</p>
          </div>
        ) : filteredShows.length === 0 ? (
          <div className="flex h-40 flex-col items-center justify-center rounded-lg bg-zinc-900 p-6 text-center">
            <p className="text-lg font-medium">No results found</p>
            <p className="mt-1 text-sm text-gray-400">Tidak ada hasil yang cocok dengan spesifikasi yang anda inginkan.</p>
          </div>
        ) : (
          <>
            <MediaList data={filteredShows} genres={genres} mediaType={mediaType} />
            <div className="mt-10 flex justify-center items-center gap-4">
              <Button className="cursor-pointer hover:bg-violet-600 transition-colors" variant="outline" disabled={page <= 1} onClick={() => updatePage(page - 1)}>
                Prev
              </Button>
              <span className="text-sm text-gray-300">
                Page {page} of {(categoryType === "trending" && "1") || Math.min(totalPages, 500)}
              </span>
              <Button className="cursor-pointer hover:bg-violet-600 transition-colors" variant="outline" disabled={page >= Math.min(totalPages, 500) || categoryType === "trending"} onClick={() => updatePage(page + 1)}>
                Next
              </Button>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
