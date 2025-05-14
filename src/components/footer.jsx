import Link from "next/link";
import Image from "next/image";
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative bg-violet-500 px-4 py-16 md:px-12">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-700 via-violet-600 to-violet-700"></div>

      <div className="absolute top-4 right-2 hidden md:block">
        <Image src={"/asset/webp/maskot.webp"} alt="Maskot Nobarin" width={180} height={48} style={{ backgroundSize: "cover" }} />
      </div>
      <div className="absolute top-4 scale-x-[-1] left-2 hidden md:block">
        <Image src={"/asset/webp/maskot.webp"} alt="Maskot Nobarin" width={180} height={48} style={{ backgroundSize: "cover" }} />
      </div>
      <div className="relative mx-auto max-w-6xl">
        <Link href="/" className="mb-4 flex justify-center">
          <Image priority src="/asset/webp/logo.webp" alt="Nobarin Logo" width={64} height={48} style={{ backgroundSize: "cover" }} />
        </Link>

        <div className="mb-10 text-center">
          <p className="text-base text-black mb-2">Pertanyaan? Kita siap sedia.</p>
          <Link href="tel:+6285692202285" className="inline-flex items-center gap-2 text-lg font-medium text-gray-800 hover:text-black transition-colors">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="animate-pulse">
              <path
                d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            +62 856-9220-2285
          </Link>
        </div>

        <div className="flex flex-row justify-center">
          <div className="flex space-x-6 mb-8 md:mb-0 justify-center md:justify-start">
            <Link href="#" className="text-gray-800 hover:text-black transition-colors">
              <Facebook size={20} />
              <span className="sr-only">Facebook</span>
            </Link>
            <Link href="#" className="text-gray-800 hover:text-black transition-colors">
              <Twitter size={20} />
              <span className="sr-only">Twitter</span>
            </Link>
            <Link href="#" className="text-gray-800 hover:text-black transition-colors">
              <Instagram size={20} />
              <span className="sr-only">Instagram</span>
            </Link>
            <Link href="#" className="text-gray-800 hover:text-black transition-colors">
              <Youtube size={20} />
              <span className="sr-only">YouTube</span>
            </Link>
          </div>
        </div>

        <div className="mt-10 text-center md:text-left">
          <a href="https://nobarin.id/" className="underline hover:no-underline text-xs text-gray-900 font-medium">
            Nobarin.ID
          </a>
          <p className="mt-2 text-xs text-gray-800">© 2025 Nobarin. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
