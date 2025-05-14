import Header from "@/components/header";
import Hero from "@/components/home/hero";
import Carousel from "@/components/home/carousel";
import Faq from "@/components/home/faq";
import Footer from "@/components/footer";
import AnimeCarousel from "@/components/home/anime-carousel";

export default function Home() {
  return (
    <div className="min-h-screen text-white">
      <Header />
      <main>
        <Hero />
        <Carousel type="movie" title="Popular Movies" url="popular" />
        <Carousel type="tv" title="Popular TV" url="popular" />
        <AnimeCarousel type="anime" title="Popular Anime" url="popular" />
        <Faq />
      </main>
      <Footer />
    </div>
  );
}
