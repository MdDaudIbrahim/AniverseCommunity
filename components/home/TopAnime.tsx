'use client';

import { useState, useEffect } from 'react';
import AnimeCard from '@/components/anime/AnimeCard';
import LoadingGrid from '@/components/ui/LoadingGrid';
import { FALLBACK_ANIME } from '@/lib/data/fallbackData';

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

export default function TopAnime() {
  // Start with fallback data for instant display
  const [anime, setAnime] = useState<Anime[]>(FALLBACK_ANIME as Anime[]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [usingFallback, setUsingFallback] = useState(true);

  useEffect(() => {
    async function fetchTop() {
      try {
        // Try to fetch fresh data in the background
        console.log('Fetching top anime in background...');
        
        const response = await fetch('https://api.jikan.moe/v4/top/anime?limit=6&sfw=true', {
          headers: {
            'Accept': 'application/json',
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          if (data.data && data.data.length > 0) {
            console.log('✅ Fresh top anime received:', data.data.length, 'anime');
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
      fetchTop();
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold">Top Rated Anime</h2>
          {usingFallback && (
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              ⚡ Loaded instantly with cached data
            </p>
          )}
        </div>
        <a href="/top-anime" className="text-primary hover:underline">
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
