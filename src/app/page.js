import Header from "@/components/home/header";
import Hero from "@/components/home/hero";
import Faq from "@/components/home/faq";
import Footer from "@/components/home/footer";
import HomeContent from "@/components/home/home-content";

export default function Home() {
  return (
    <div className="min-h-screen text-white">
      <Header />
      <main>
        <Hero />
        <HomeContent />
        <Faq />
      </main>
      <Footer />
    </div>
  );
}
