import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="relative pt-16 flex min-h-[85vh] items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-center bg-no-repeat bg-cover"
        style={{
          backgroundImage: "url('/asset/jpg/background.jpg')",
          backgroundSize: "cover",
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black via-black/60 to-transparent" />
      </div>

      <div className="relative mx-auto max-w-3xl px-4 py-16 pt-24 text-center text-white">
        <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">Film, TV Series, Anime, dan banyak lagi</h1>
        <p className="mb-2 text-lg md:text-xl">Tonton di mana pun, dan kapanpun.</p>
        <p className="mb-6 text-lg md:text-xl">Siap menonton? Masukkan email untuk membuat atau memulai keanggotaanmu.</p>

        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <input type="email" placeholder="Email address" className="w-full max-w-md rounded border border-gray-600 bg-black/50 px-4 py-3 text-white placeholder-gray-400 focus:border-gray-500 focus:outline-none sm:w-96" />
          <Button className="flex items-center gap-2 bg-violet-600 px-6 py-6 cursor-pointer text-lg font-semibold hover:bg-violet-700">
            Mulai
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8.5 5L15.5 12L8.5 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Button>
        </div>
      </div>
    </section>
  );
}
