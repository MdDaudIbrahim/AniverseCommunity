import AnimeCarousel from "@/components/home/AnimeCarousel";
import TrendingAnime from "@/components/home/TrendingAnime";
import TopAnime from "@/components/home/TopAnime";
import SeasonalAnime from "@/components/home/SeasonalAnime";
import AdBanner from "@/components/ads/AdBanner";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Automatic Anime Carousel */}
      <AnimeCarousel />
      
      {/* Ad Banner after hero */}
      <div className="container mx-auto px-4 py-4">
        <AdBanner 
          slot="1234567890" 
          format="horizontal"
          className="mb-8"
        />
      </div>

      {/* Trending Anime Section */}
      <section className="container mx-auto px-4 py-8">
        <TrendingAnime />
      </section>

      {/* Ad Banner between sections */}
      <div className="container mx-auto px-4 py-4">
        <AdBanner 
          slot="2345678901" 
          format="horizontal"
          className="my-8"
        />
      </div>

      {/* Top Rated Anime Section */}
      <section className="container mx-auto px-4 py-8">
        <TopAnime />
      </section>

      {/* Seasonal Anime Section */}
      <section className="container mx-auto px-4 py-8">
        <SeasonalAnime />
      </section>

      {/* Bottom Ad Banner */}
      <div className="container mx-auto px-4 py-4">
        <AdBanner 
          slot="3456789012" 
          format="horizontal"
          className="mt-8 mb-4"
        />
      </div>
    </div>
  );
}
