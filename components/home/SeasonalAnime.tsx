'use client';

import { useState, useEffect } from 'react';
import AnimeCard from '@/components/anime/AnimeCard';
import LoadingGrid from '@/components/ui/LoadingGrid';
import { FEATURED_SEASONAL } from '@/lib/data/fallbackData';

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

export default function SeasonalAnime() {
  // Start with fallback data for instant display
  const [anime, setAnime] = useState<Anime[]>(FEATURED_SEASONAL as Anime[]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [usingFallback, setUsingFallback] = useState(true);

  useEffect(() => {
    async function fetchSeasonal() {
      try {
        // Try to fetch fresh data in the background
        console.log('Fetching seasonal anime in background...');
        
        const response = await fetch('https://api.jikan.moe/v4/seasons/now?limit=6&sfw=true', {
          headers: {
            'Accept': 'application/json',
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          if (data.data && data.data.length > 0) {
            console.log('✅ Fresh seasonal anime received:', data.data.length, 'anime');
            setAnime(data.data);
            setUsingFallback(false);
            setError(null);
          }
        } else {
          console.log('⚠️ API returned error, using fallback data');
        }
      } catch (err) {
        console.log('⚠️ API unavailable, using fallback data');
      }
    }

    // Fetch in background after a delay to avoid rate limiting
    const timer = setTimeout(() => {
      fetchSeasonal();
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold text-white">This Season's Favorites</h2>
          {usingFallback && (
            <p className="text-sm text-gray-400 mt-1">
              ⚡ Loaded instantly with cached data
            </p>
          )}
        </div>
        <a href="/seasonal" className="text-[#3B82F6] hover:text-[#60A5FA] transition-colors">
          View All →
        </a>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg text-sm text-yellow-800 dark:text-yellow-200">
          <strong>Note:</strong> Showing cached anime. Live data temporarily unavailable.
        </div>
      )}

      {loading ? (
        <LoadingGrid count={6} />
      ) : anime.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No anime found</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {anime.map((item) => (
            <AnimeCard key={item.mal_id} anime={item as any} />
          ))}
        </div>
      )}
    </div>
  );
}
