'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Anime {
  mal_id: number;
  title: string;
  title_english: string | null;
  images: {
    jpg: {
      large_image_url: string;
    };
  };
  episodes: number | null;
  score: number | null;
  type: string;
  genres: Array<{ name: string }>;
}

export default function SeasonalAnimeSection() {
  const [anime, setAnime] = useState<Anime[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedYear, setSelectedYear] = useState('2025');
  const [selectedSeason, setSelectedSeason] = useState('Fall');

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => currentYear - i + 1);
  const seasons = ['Winter', 'Spring', 'Summer', 'Fall'];

  useEffect(() => {
    async function fetchSeasonalAnime() {
      try {
        setLoading(true);
        const season = selectedSeason.toLowerCase();
        const response = await fetch(`https://api.jikan.moe/v4/seasons/${selectedYear}/${season}?sfw=true`);
        
        if (response.ok) {
          const data = await response.json();
          console.log('🍂 Seasonal anime fetched:', data.data?.length || 0);
          setAnime(data.data?.slice(0, 12) || []);
        }
      } catch (error) {
        console.error('Error fetching seasonal anime:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchSeasonalAnime();
  }, [selectedYear, selectedSeason]);

  return (
    <div>
      {/* Header with Selectors */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 bg-[#10b981] rounded-sm"></div>
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            <span className="text-[#10b981]">&lt;</span>
            Seasonal Anime
            <span className="text-[#10b981]">/&gt;</span>
          </h2>
        </div>

        {/* Year and Season Selectors */}
        <div className="flex items-center gap-3">
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="px-4 py-2 bg-[#1a1a1a] border border-[#262626] rounded-lg text-white focus:border-[#10b981] focus:outline-none transition-colors cursor-pointer"
          >
            {years.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>

          <select
            value={selectedSeason}
            onChange={(e) => setSelectedSeason(e.target.value)}
            className="px-4 py-2 bg-[#1a1a1a] border border-[#262626] rounded-lg text-white focus:border-[#10b981] focus:outline-none transition-colors cursor-pointer"
          >
            {seasons.map(season => (
              <option key={season} value={season}>{season}</option>
            ))}
          </select>

          <button className="px-4 py-2 bg-[#1a1a1a] hover:bg-[#10b981] hover:text-black border border-[#262626] hover:border-[#10b981] rounded-lg transition-all flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Refresh
          </button>
        </div>
      </div>

      {/* Subtitle */}
      <p className="text-gray-400 text-sm mb-6">
        Discover anime from the {selectedSeason} {selectedYear} season
      </p>

      {/* Anime Grid */}
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="bg-[#1a1a1a] rounded-lg h-80 animate-pulse" />
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {anime.map((item) => {
              const displayTitle = item.title_english || item.title;
              
              return (
                <Link
                  key={item.mal_id}
                  href={`/anime/${item.mal_id}`}
                  className="group"
                >
                  <div className="bg-[#1a1a1a] rounded-lg overflow-hidden border border-[#262626] hover:border-[#10b981]/50 transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-[#10b981]/20">
                    {/* Image */}
                    <div className="relative aspect-[3/4] overflow-hidden">
                      <Image
                        src={item.images.jpg.large_image_url}
                        alt={displayTitle}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                      />
                      {/* Episode Count Badge */}
                      {item.episodes && (
                        <div className="absolute top-2 right-2 bg-black/80 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold text-white">
                          {item.episodes} EP
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="p-3 space-y-2">
                      <h3 className="text-white font-semibold text-sm line-clamp-2 min-h-[2.5rem]">
                        {displayTitle}
                      </h3>

                      <div className="flex items-center justify-between gap-2">
                        {item.type && (
                          <span className="text-xs px-2 py-0.5 bg-[#374151] text-gray-300 rounded">
                            {item.type}
                          </span>
                        )}
                        {item.score && (
                          <span className="flex items-center gap-1 text-xs font-bold text-[#10b981]">
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            {item.score}
                          </span>
                        )}
                      </div>

                      {/* Genres */}
                      {item.genres.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {item.genres.slice(0, 2).map((genre) => (
                            <span
                              key={genre.name}
                              className="text-xs px-2 py-0.5 bg-[#10b981]/10 text-[#10b981] rounded"
                            >
                              {genre.name}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* View More Link */}
          <div className="text-center mt-8">
            <Link
              href="/seasonal"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#10b981] hover:bg-[#059669] text-black font-semibold rounded-lg transition-all transform hover:scale-105"
            >
              View All Seasonal Anime
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>

          {/* Footer Text */}
          <p className="text-center text-gray-500 text-sm mt-6">
            Showing 12 anime from {selectedSeason} {selectedYear}
          </p>
        </>
      )}
    </div>
  );
}
