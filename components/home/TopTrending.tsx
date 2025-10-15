'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

interface TrendingAnime {
  mal_id: number;
  title: string;
  images: {
    jpg: {
      large_image_url: string;
    };
  };
}

export default function TopTrending() {
  const [trending, setTrending] = useState<TrendingAnime[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    // Add a small delay to not block initial render
    const timer = setTimeout(() => {
      fetchTrending();
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const fetchTrending = async (retryCount = 0) => {
    try {
      const response = await fetch('https://api.jikan.moe/v4/top/anime?filter=airing&limit=15');
      
      if (!response.ok) {
        // If rate limited (429) or server error (5xx), retry
        if ((response.status === 429 || response.status >= 500) && retryCount < 2) {
          console.log(`Retrying trending fetch... (${retryCount + 1}/2)`);
          await new Promise(resolve => setTimeout(resolve, 2000 * (retryCount + 1)));
          return fetchTrending(retryCount + 1);
        }
        throw new Error('API request failed');
      }
      
      const data = await response.json();
      
      if (data.data && data.data.length > 0) {
        setTrending(data.data);
        setError(false);
      } else {
        setError(true);
      }
    } catch (err) {
      console.error('Error fetching trending:', err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    const container = document.getElementById('trending-scroll');
    if (container) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative">
      {/* Title */}
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-[#10b981] mb-2">TOP TRENDING</h2>
        <div className="h-1 w-16 md:w-20 bg-gradient-to-r from-[#10b981] to-transparent rounded-full"></div>
      </div>

      {/* Scroll Container */}
      <div className="relative group">
        {/* Left Arrow */}
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/70 hover:bg-black/90 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 border border-[#262626] hover:border-[#10b981] opacity-0 group-hover:opacity-100"
          aria-label="Scroll left"
        >
          <FiChevronLeft size={24} />
        </button>

        {/* Trending Grid */}
        <div
          id="trending-scroll"
          className="flex gap-3 md:gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-4 px-1"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {loading ? (
            // Loading skeletons
            [...Array(10)].map((_, i) => (
              <div
                key={i}
                className="flex-shrink-0 w-[140px] sm:w-[160px] md:w-[180px] h-[210px] sm:h-[240px] md:h-[260px] bg-[#1a1a1a] rounded-lg animate-pulse"
              />
            ))
          ) : error || trending.length === 0 ? (
            <div className="flex items-center justify-center w-full py-12">
              <div className="text-center">
                <p className="text-gray-400 mb-2">Unable to load trending anime</p>
                <button
                  onClick={() => {
                    setLoading(true);
                    setError(false);
                    fetchTrending();
                  }}
                  className="px-4 py-2 bg-[#10b981] text-white rounded-lg hover:bg-[#059669] transition-colors"
                >
                  Retry
                </button>
              </div>
            </div>
          ) : (
            trending.map((anime, index) => (
              <Link
                key={anime.mal_id}
                href={`/anime/${anime.mal_id}`}
                className="flex-shrink-0 w-[140px] sm:w-[160px] md:w-[180px] group/card relative"
              >
                <div className="relative aspect-[3/4] rounded-lg overflow-hidden border border-[#262626] hover:border-[#10b981] transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#10b981]/30">
                  <Image
                    src={anime.images.jpg.large_image_url}
                    alt={anime.title}
                    fill
                    className="object-cover"
                    sizes="180px"
                    loading="lazy"
                    quality={75}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Rank Badge */}
                  <div className="absolute top-2 left-2 bg-[#10b981] text-white text-xs font-bold px-2 py-1 rounded">
                    #{index + 1}
                  </div>
                </div>
                <h3 className="mt-2 text-sm font-semibold text-white line-clamp-2 group-hover/card:text-[#10b981] transition-colors">
                  {anime.title}
                </h3>
              </Link>
            ))
          )}
        </div>

        {/* Right Arrow */}
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/70 hover:bg-black/90 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 border border-[#262626] hover:border-[#10b981] opacity-0 group-hover:opacity-100"
          aria-label="Scroll right"
        >
          <FiChevronRight size={24} />
        </button>
      </div>
    </div>
  );
}
