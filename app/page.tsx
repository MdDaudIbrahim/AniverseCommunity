import dynamic from 'next/dynamic';
import FeaturedAnimeHero from "@/components/home/FeaturedAnimeHero";
import AnimeVaultGrid from "@/components/home/AnimeVaultGrid";

// Lazy load components that are below the fold
const LatestAnimeNews = dynamic(() => import("@/components/home/LatestAnimeNews"), {
  loading: () => <div className="h-96 bg-[#1a1a1a] animate-pulse rounded-lg"></div>
});

const WeeklySchedule = dynamic(() => import("@/components/home/WeeklySchedule"), {
  loading: () => <div className="h-96 bg-[#1a1a1a] animate-pulse rounded-lg"></div>
});

const SeasonalAnimeSection = dynamic(() => import("@/components/home/SeasonalAnimeSection"), {
  loading: () => <div className="h-96 bg-[#1a1a1a] animate-pulse rounded-lg"></div>
});

const BigThreeSlider = dynamic(() => import("@/components/home/BigThreeSlider"), {
  loading: () => <div className="h-[500px] bg-[#1a1a1a] animate-pulse rounded-lg"></div>
});

const TopTrending = dynamic(() => import("@/components/home/TopTrending"), {
  loading: () => <div className="h-80 bg-[#1a1a1a] animate-pulse rounded-lg"></div>
});

const TopCharacters = dynamic(() => import("@/components/home/TopCharacters"), {
  loading: () => <div className="h-80 bg-[#1a1a1a] animate-pulse rounded-lg"></div>
});

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Hero Section - Load immediately */}
      <section className="relative">
        <FeaturedAnimeHero />
      </section>

      {/* Main Content with Sidebar - Load immediately */}
      <section className="container mx-auto px-4 py-12">
        <AnimeVaultGrid />
      </section>

      {/* Latest Anime News - Lazy loaded */}
      <section className="container mx-auto px-4 py-12">
        <LatestAnimeNews />
      </section>

      {/* Weekly Schedule - Lazy loaded */}
      <section className="container mx-auto px-4 py-12">
        <WeeklySchedule />
      </section>

      {/* Seasonal Anime - Lazy loaded */}
      <section className="container mx-auto px-4 py-12">
        <SeasonalAnimeSection />
      </section>

      {/* The Big Three - Lazy loaded */}
      <section className="container mx-auto px-4 py-12">
        <BigThreeSlider />
      </section>

      {/* Top Trending - Lazy loaded */}
      <section className="container mx-auto px-4 py-12">
        <TopTrending />
      </section>

      {/* Top Characters - Lazy loaded */}
      <section className="container mx-auto px-4 py-12 pb-16">
        <TopCharacters />
      </section>
    </div>
  );
}
