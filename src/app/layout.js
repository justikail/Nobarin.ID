import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL("https://nobarin.id"),
  title: "Nobarin.ID - Nonton Film, Series & Anime Gratis",
  description: "Nobarin.ID adalah platform streaming gratis untuk nonton film, anime, dan serial TV bareng teman. Tersedia koleksi lengkap dengan, kualitas HD, dan update terbaru setiap hari.",
  keywords: ["nonton bareng", "streaming film gratis", "nonton anime sub indo", "drama korea", "tv series", "nonton online", "streaming anime", "nobarin"],
  authors: [{ name: "Nobarin Team", url: "https://nobarin.id" }],
  generator: "Next.js",
  applicationName: "Nobarin.ID",
  robots: "index, follow",
  openGraph: {
    title: "Nobarin.ID - Nonton Film, Anime & Series Sub Indo Gratis",
    description: "Tonton film dan anime favoritmu secara gratis di Nobarin.ID, lengkap dengan kualitas HD dan update tiap hari!",
    url: "https://nobarin.id",
    siteName: "Nobarin.ID",
    images: [
      {
        url: "/asset/png/favicon.png",
        width: 1200,
        height: 630,
        alt: "Nobarin.ID - Streaming Film, Anime dan Series Gratis",
      },
    ],
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
  link: [
    {
      rel: "preload",
      href: "/asset/png/logo.png",
      as: "image",
      type: "image/png",
    },
    {
      rel: "preload",
      href: "/asset/webp/logo.webp",
      as: "image",
      type: "image/webp",
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased relative max-w-7xl mx-auto`}>{children}</body>
    </html>
  );
}
