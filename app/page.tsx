import FeaturedAnimeHero from "@/components/home/FeaturedAnimeHero";
import AnimeVaultGrid from "@/components/home/AnimeVaultGrid";
import LatestAnimeNews from "@/components/home/LatestAnimeNews";
import WeeklySchedule from "@/components/home/WeeklySchedule";
import SeasonalAnimeSection from "@/components/home/SeasonalAnimeSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Hero Section */}
      <section className="relative">
        <FeaturedAnimeHero />
      </section>

      {/* Main Content with Sidebar */}
      <section className="container mx-auto px-4 py-12">
        <AnimeVaultGrid />
      </section>

      {/* Latest Anime News */}
      <section className="container mx-auto px-4 py-12">
        <LatestAnimeNews />
      </section>

      {/* Weekly Schedule */}
      <section className="container mx-auto px-4 py-12">
        <WeeklySchedule />
      </section>

      {/* Seasonal Anime */}
      <section className="container mx-auto px-4 py-12 pb-16">
        <SeasonalAnimeSection />
      </section>
    </div>
  );
}
