import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AdSenseScript from "@/components/ads/AdSenseScript";

const inter = Inter({ subsets: ["latin"] });

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#3B82F6' },
    { media: '(prefers-color-scheme: dark)', color: '#1E293B' }
  ],
};

export const metadata: Metadata = {
  title: "AnimeVerse - Your Ultimate Anime Recommendation Hub",
  description: "Discover new and trending anime, get personalized recommendations, and explore detailed information about your favorite shows. Stay updated with the latest anime releases.",
  keywords: "anime, anime recommendations, trending anime, anime reviews, anime database, MyAnimeList, anime genres",
  authors: [{ name: "AnimeVerse Community" }],
  openGraph: {
    title: "AnimeVerse - Your Ultimate Anime Recommendation Hub",
    description: "Discover new and trending anime with personalized recommendations",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "AnimeVerse - Your Ultimate Anime Recommendation Hub",
    description: "Discover new and trending anime with personalized recommendations",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <AdSenseScript />
      </head>
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
