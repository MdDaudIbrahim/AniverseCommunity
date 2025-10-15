import FeaturedCarousel from "@/components/home/FeaturedCarousel";
import CategorySection from "@/components/home/CategorySection";
import AdBanner from "@/components/ads/AdBanner";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0f0f0f]">
      {/* Featured Anime Carousel */}
      <section className="relative">
        <FeaturedCarousel />
      </section>

      {/* Ad Banner */}
      <div className="container mx-auto px-4 py-6">
        <AdBanner 
          slot="1234567890" 
          format="horizontal"
          className="rounded-lg overflow-hidden"
        />
      </div>

      {/* Top Airing Section */}
      <section className="container mx-auto px-4 py-8">
        <CategorySection 
          title="Top Airing" 
          endpoint="top/anime"
          params={{ filter: "airing", limit: 8 }}
        />
      </section>

      {/* Top Upcoming Section */}
      <section className="container mx-auto px-4 py-8">
        <CategorySection 
          title="Top Upcoming" 
          endpoint="top/anime"
          params={{ filter: "upcoming", limit: 8 }}
        />
      </section>

      {/* Ad Banner */}
      <div className="container mx-auto px-4 py-6">
        <AdBanner 
          slot="2345678901" 
          format="horizontal"
          className="rounded-lg overflow-hidden"
        />
      </div>

      {/* Most Popular Section */}
      <section className="container mx-auto px-4 py-8">
        <CategorySection 
          title="Most Popular" 
          endpoint="top/anime"
          params={{ filter: "bypopularity", limit: 8 }}
        />
      </section>

      {/* Highest Rated Section */}
      <section className="container mx-auto px-4 py-8">
        <CategorySection 
          title="Highest Rated" 
          endpoint="top/anime"
          params={{ filter: "favorite", limit: 8 }}
        />
      </section>

      {/* Bottom Ad Banner */}
      <div className="container mx-auto px-4 py-6 pb-12">
        <AdBanner 
          slot="3456789012" 
          format="horizontal"
          className="rounded-lg overflow-hidden"
        />
      </div>
    </div>
  );
}
