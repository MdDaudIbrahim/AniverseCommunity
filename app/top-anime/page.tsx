'use client';

import { useState, useEffect } from 'react';
import AnimeCard from '@/components/anime/AnimeCard';
import LoadingGrid from '@/components/ui/LoadingGrid';
import { TOP_100_ANIME } from '@/lib/data/top100Anime';

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

export default function TopAnimePage() {
  const [anime, setAnime] = useState<Anime[]>(TOP_100_ANIME as Anime[]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [usingFallback, setUsingFallback] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    async function fetchTopAnime() {
      try {
        console.log('Fetching top 100 anime...');
        const allAnime: Anime[] = [];
        
        // Fetch first 4 pages (25 per page = 100 total)
        for (let page = 1; page <= 4; page++) {
          await new Promise(resolve => setTimeout(resolve, 350)); // Rate limiting
          
          const response = await fetch(`https://api.jikan.moe/v4/top/anime?page=${page}&limit=25&sfw=true`, {
            headers: {
              'Accept': 'application/json',
            }
          });
          
          if (response.ok) {
            const data = await response.json();
            if (data.data && data.data.length > 0) {
              allAnime.push(...data.data);
              console.log(`✅ Loaded page ${page}/4 (${allAnime.length} anime so far)`);
              // Update display after each page loads
              setAnime([...allAnime]);
              setUsingFallback(false);
            }
          } else {
            console.log(`⚠️ API error on page ${page}, stopping`);
            break;
          }
        }
        
        if (allAnime.length > 0) {
          console.log(`✅ Total loaded: ${allAnime.length} anime`);
          setAnime(allAnime);
          setHasMore(false);
        }
      } catch (err) {
        console.log('⚠️ API unavailable, using fallback data');
      }
    }

    const timer = setTimeout(() => {
      fetchTopAnime();
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Top 100 Anime</h1>
          <p className="text-gray-600 dark:text-gray-400">
            The top 100 highest-rated anime of all time according to MyAnimeList
          </p>
          <div className="mt-3 flex items-center gap-3">
            {usingFallback && (
              <div className="inline-flex items-center px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-full text-sm">
                ⚡ Loaded instantly with cached data
              </div>
            )}
            {!usingFallback && anime.length < 100 && (
              <div className="inline-flex items-center px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm">
                📥 Loading... {anime.length}/100
              </div>
            )}
            {anime.length >= 100 && (
              <div className="inline-flex items-center px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 rounded-full text-sm">
                ✅ All 100 anime loaded!
              </div>
            )}
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
            <p className="text-yellow-800 dark:text-yellow-200">
              <strong>Note:</strong> Showing cached anime. Live data temporarily unavailable.
            </p>
          </div>
        )}

        {/* Anime Grid */}
        {loading ? (
          <LoadingGrid count={24} />
        ) : anime.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg">
            <p className="text-gray-500 dark:text-gray-400">No anime found</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {anime.map((item) => (
              <AnimeCard key={item.mal_id} anime={item as any} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
