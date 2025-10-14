'use client';

import { useState, useEffect } from 'react';
import AnimeCard from '@/components/anime/AnimeCard';
import LoadingGrid from '@/components/ui/LoadingGrid';
import { FEATURED_SEASONAL, TRENDING_NOW } from '@/lib/data/fallbackData';
import { FiCalendar, FiRefreshCw, FiTrendingUp } from 'react-icons/fi';
import AdBanner from '@/components/ads/AdBanner';

interface Anime {
  mal_id: number;
  images: any;
  title: string;
  title_english: string | null;
  score: number | null;
  airing: boolean;
  type: string;
  episodes: number | null;
  year: number | null;
  genres: any[];
}

type Season = 'winter' | 'spring' | 'summer' | 'fall';

export default function SeasonalPage() {
  const fallbackData = [...FEATURED_SEASONAL, ...TRENDING_NOW];
  
  // Get current season and year
  const now = new Date();
  const month = now.getMonth() + 1;
  const currentYear = now.getFullYear();
  
  const getCurrentSeason = (): Season => {
    if (month >= 1 && month <= 3) return 'winter';
    if (month >= 4 && month <= 6) return 'spring';
    if (month >= 7 && month <= 9) return 'summer';
    return 'fall';
  };

  const [selectedSeason, setSelectedSeason] = useState<Season>(getCurrentSeason());
  const [selectedYear, setSelectedYear] = useState<number>(currentYear);
  const [anime, setAnime] = useState<Anime[]>(fallbackData as Anime[]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState<number>(0);

  // Generate year options (current year to 3 years back and 1 year forward)
  const generateYears = () => {
    const years = [];
    for (let i = currentYear + 1; i >= currentYear - 3; i--) {
      years.push(i);
    }
    return years;
  };

  const seasons: { value: Season; label: string; icon: string }[] = [
    { value: 'winter', label: 'Winter', icon: '❄️' },
    { value: 'spring', label: 'Spring', icon: '🌸' },
    { value: 'summer', label: 'Summer', icon: '☀️' },
    { value: 'fall', label: 'Fall', icon: '🍂' },
  ];

  useEffect(() => {
    fetchSeasonalAnime();
  }, [selectedSeason, selectedYear]);

  const fetchSeasonalAnime = async () => {
    try {
      setLoading(true);
      setError(null);

      // Add small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 350));

      const response = await fetch(
        `https://api.jikan.moe/v4/seasons/${selectedYear}/${selectedSeason}?sfw=true`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch seasonal anime');
      }

      const data = await response.json();
      setAnime(data.data || []);
      setTotalCount(data.pagination?.items?.total || data.data.length);
    } catch (err: any) {
      console.error('Error fetching seasonal anime:', err);
      setError(err.message);
      setAnime(fallbackData as Anime[]);
    } finally {
      setLoading(false);
    }
  };

  const handleSeasonChange = (season: Season) => {
    setSelectedSeason(season);
  };

  const handleYearChange = (year: number) => {
    setSelectedYear(year);
  };

  const seasonLabel = seasons.find(s => s.value === selectedSeason)?.label || 'Season';
  const seasonIcon = seasons.find(s => s.value === selectedSeason)?.icon || '📅';

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Compact Header */}
        <div className="mb-6">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            {seasonIcon} Seasonal Anime {selectedYear}
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Browse anime by season and year
          </p>
        </div>

        {/* Ad Banner */}
        <AdBanner slot="seasonal-top" format="horizontal" className="mb-6" />

        {/* Compact Season Selector */}
        <div className="mb-6 bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md">
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Season Buttons */}
            <div className="flex flex-wrap gap-2">
              {seasons.map((season) => (
                <button
                  key={season.value}
                  onClick={() => handleSeasonChange(season.value)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                    selectedSeason === season.value
                      ? 'bg-primary text-white shadow-md scale-105'
                      : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  <span>{season.icon}</span>
                  <span>{season.label}</span>
                </button>
              ))}
            </div>

            {/* Year Selector & Actions */}
            <div className="flex items-center gap-2">
              <select
                value={selectedYear}
                onChange={(e) => handleYearChange(parseInt(e.target.value))}
                className="px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 text-sm font-semibold"
              >
                {generateYears().map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
              
              <button
                onClick={() => {
                  setSelectedSeason(getCurrentSeason());
                  setSelectedYear(currentYear);
                }}
                className="px-2.5 py-1.5 bg-green-500 text-white rounded-lg text-xs font-semibold hover:bg-green-600 transition-colors"
                title="Current Season"
              >
                🔥
              </button>
              
              <button
                onClick={() => fetchSeasonalAnime()}
                disabled={loading}
                className="px-2.5 py-1.5 bg-blue-500 text-white rounded-lg text-xs hover:bg-blue-600 transition-colors disabled:opacity-50"
                title="Refresh"
              >
                <FiRefreshCw className={loading ? 'animate-spin' : ''} size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Results Info */}
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">
            {seasonLabel} {selectedYear}
          </h2>
          {totalCount > 0 && (
            <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-full">
              {totalCount} anime
            </span>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
            <p className="text-sm text-yellow-800 dark:text-yellow-200">
              ⚠️ {error}. Showing cached data.
            </p>
          </div>
        )}

        {/* Anime Grid */}
        {loading ? (
          <LoadingGrid count={24} />
        ) : anime.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-lg">
            <p className="text-xl text-gray-500 dark:text-gray-400 mb-2">No anime found</p>
            <p className="text-sm text-gray-400">Try selecting a different season or year</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {anime.map((item) => (
                <AnimeCard key={item.mal_id} anime={item as any} />
              ))}
            </div>

            {/* Bottom Ad */}
            <div className="mt-12">
              <AdBanner slot="seasonal-bottom" format="horizontal" />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
