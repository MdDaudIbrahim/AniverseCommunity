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
    <div className="min-h-screen bg-[#0a0a0a] w-full overflow-x-hidden">
      {/* Hero Section - Load immediately */}
      <section className="relative w-full overflow-hidden">
        <FeaturedAnimeHero />
      </section>

      {/* Main Content with Sidebar - Load immediately */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 overflow-hidden">
        <AnimeVaultGrid />
      </section>

      {/* Latest Anime News - Lazy loaded */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 overflow-hidden">
        <LatestAnimeNews />
      </section>

      {/* Weekly Schedule - Lazy loaded */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 overflow-hidden">
        <WeeklySchedule />
      </section>

      {/* Seasonal Anime - Lazy loaded */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 overflow-hidden">
        <SeasonalAnimeSection />
      </section>

      {/* The Big Three - Lazy loaded */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 overflow-hidden">
        <BigThreeSlider />
      </section>

      {/* Top Trending - Lazy loaded */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 overflow-hidden">
        <TopTrending />
      </section>

      {/* Top Characters - Lazy loaded */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 pb-16 overflow-hidden">
        <TopCharacters />
      </section>
    </div>
  );
}
