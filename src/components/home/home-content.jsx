import Carousel from "@/components/home/carousel";
import TopRatedList from "@/components/home/top-rated";
import AnimeCarousel from "@/components/home/anime-carousel";
import Image from "next/image";

export default function HomeContent() {
  return (
    <div className="py-12 relative">
      <div className="absolute -top-32 right-3 hidden lg:block">
        <Image src={"/asset/webp/maskot2.webp"} alt="Maskot2 Nobarin" width={180} height={48} />
      </div>
      <div className="container mx-auto px-4 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3 space-y-12">
            <Carousel type="movie" title="Film Sedang Tayang" url="now-playing" />
            <Carousel type="tv" title="Tv Populer" url="popular" />
            <AnimeCarousel type="anime" title="Anime Trending" url="popular" />
          </div>

          <div className="hidden lg:block">
            <div className="sticky top-20">
              <TopRatedList />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
