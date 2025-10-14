'use client';

import { useState, useEffect } from 'react';
import AnimeCard from '@/components/anime/AnimeCard';
import LoadingGrid from '@/components/ui/LoadingGrid';
import { TRENDING_NOW } from '@/lib/data/fallbackData';

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

export default function TrendingAnime() {
  // Start with fallback data for instant display
  const [anime, setAnime] = useState<Anime[]>(TRENDING_NOW as Anime[]);
  const [loading, setLoading] = useState(false); // No loading since we have fallback
  const [error, setError] = useState<string | null>(null);
  const [usingFallback, setUsingFallback] = useState(true);

  useEffect(() => {
    async function fetchTrending() {
      try {
        // Try to fetch fresh data in the background
        console.log('Fetching fresh anime data in background...');
        
        const response = await fetch('https://api.jikan.moe/v4/seasons/now?limit=6&sfw=true', {
          headers: {
            'Accept': 'application/json',
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          if (data.data && data.data.length > 0) {
            console.log('✅ Fresh data received:', data.data.length, 'anime');
            setAnime(data.data);
            setUsingFallback(false);
            setError(null);
          }
        } else {
          console.log('⚠️ API returned error, using fallback data');
        }
      } catch (err) {
        console.log('⚠️ API unavailable, using fallback data');
        // Keep using fallback data, no need to show error
      }
    }

    // Fetch in background after a short delay
    const timer = setTimeout(() => {
      fetchTrending();
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if (error) {
    return (
      <div className="text-center py-12 bg-red-50 dark:bg-red-900/20 rounded-lg">
        <p className="text-red-600 dark:text-red-400 mb-2">{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="text-sm text-primary hover:underline"
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold">Currently Trending</h2>
          {usingFallback && (
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              ⚡ Loaded instantly with cached data
            </p>
          )}
        </div>
        <a href="/seasonal" className="text-primary hover:underline">
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
        <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <p className="text-gray-500 dark:text-gray-400">No anime data available</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-6 py-2 bg-primary text-white rounded-full hover:bg-primary-dark transition-colors"
          >
            Reload Page
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {anime.map((item) => (
            <AnimeCard key={item.mal_id} anime={item as any} />
          ))}
        </div>
      )}
    </div>
  );
}
