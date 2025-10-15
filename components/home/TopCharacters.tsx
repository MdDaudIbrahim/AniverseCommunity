'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiChevronLeft, FiChevronRight, FiHeart } from 'react-icons/fi';

interface Character {
  mal_id: number;
  name: string;
  images: {
    jpg: {
      image_url: string;
    };
  };
  favorites: number;
}

export default function TopCharacters() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    // Add a larger delay to avoid rate limiting (after TopTrending)
    const timer = setTimeout(() => {
      fetchCharacters();
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const fetchCharacters = async (retryCount = 0) => {
    try {
      const response = await fetch('https://api.jikan.moe/v4/top/characters?limit=15');
      
      if (!response.ok) {
        // If rate limited (429) or server error (5xx), retry
        if ((response.status === 429 || response.status >= 500) && retryCount < 2) {
          console.log(`Retrying characters fetch... (${retryCount + 1}/2)`);
          await new Promise(resolve => setTimeout(resolve, 2000 * (retryCount + 1)));
          return fetchCharacters(retryCount + 1);
        }
        throw new Error('API request failed');
      }
      
      const data = await response.json();
      
      if (data.data && data.data.length > 0) {
        setCharacters(data.data);
        setError(false);
      } else {
        setError(true);
      }
    } catch (err) {
      console.error('Error fetching characters:', err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    const container = document.getElementById('characters-scroll');
    if (container) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const formatFavorites = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(0) + 'K';
    }
    return num.toString();
  };

  return (
    <div className="relative">
      {/* Title */}
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-[#10b981] mb-2">TOP CHARACTERS</h2>
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

        {/* Characters Grid */}
        <div
          id="characters-scroll"
          className="flex gap-3 md:gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-4 px-1"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {loading ? (
            // Loading skeletons
            [...Array(10)].map((_, i) => (
              <div
                key={i}
                className="flex-shrink-0 w-[140px] sm:w-[160px] md:w-[180px] h-[220px] sm:h-[250px] md:h-[280px] bg-[#1a1a1a] rounded-lg animate-pulse"
              />
            ))
          ) : error || characters.length === 0 ? (
            <div className="flex items-center justify-center w-full py-12">
              <div className="text-center">
                <p className="text-gray-400 mb-2">Unable to load characters</p>
                <button
                  onClick={() => {
                    setLoading(true);
                    setError(false);
                    fetchCharacters();
                  }}
                  className="px-4 py-2 bg-[#10b981] text-white rounded-lg hover:bg-[#059669] transition-colors"
                >
                  Retry
                </button>
              </div>
            </div>
          ) : (
            characters.map((character, index) => (
              <Link
                key={character.mal_id}
                href={`/character/${character.mal_id}`}
                className="flex-shrink-0 w-[140px] sm:w-[160px] md:w-[180px] group/card relative"
              >
                <div className="relative aspect-[3/4] rounded-lg overflow-hidden border border-[#262626] hover:border-[#10b981] transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#10b981]/30">
                  <Image
                    src={character.images.jpg.image_url}
                    alt={character.name}
                    fill
                    className="object-cover"
                    sizes="180px"
                    loading="lazy"
                    quality={75}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                  
                  {/* Rank Badge */}
                  <div className="absolute top-2 left-2 bg-[#10b981] text-white text-sm font-bold px-2.5 py-1 rounded-lg">
                    #{index + 1}
                  </div>

                  {/* Character Info */}
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <h3 className="text-white font-bold text-sm line-clamp-2 mb-1">
                      {character.name}
                    </h3>
                    <div className="flex items-center gap-1 text-xs text-gray-300">
                      <FiHeart className="text-red-500" size={12} />
                      <span>{formatFavorites(character.favorites)} favorites</span>
                    </div>
                  </div>
                </div>
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
