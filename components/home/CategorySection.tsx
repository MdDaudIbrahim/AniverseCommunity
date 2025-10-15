'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

interface Anime {
  mal_id: number;
  title: string;
  title_english?: string;
  images: {
    jpg: {
      large_image_url: string;
      image_url: string;
    };
  };
  score?: number;
  type?: string;
  status?: string;
  episodes?: number;
}

interface CategorySectionProps {
  title: string;
  endpoint: string;
  params?: Record<string, string | number>;
}

export default function CategorySection({ title, endpoint, params = {} }: CategorySectionProps) {
  const [anime, setAnime] = useState<Anime[]>([]);
  const [loading, setLoading] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchAnime();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endpoint]);

  const fetchAnime = async () => {
    try {
      const queryParams = new URLSearchParams(
        Object.entries(params).map(([key, value]) => [key, String(value)])
      );
      const url = `https://api.jikan.moe/v4/${endpoint}?${queryParams}`;
      console.log(`Fetching ${title} from:`, url);
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log(`${title} data:`, data.data?.length || 0, 'items');
      setAnime(data.data || []);
    } catch (error) {
      console.error(`Error fetching ${title}:`, error);
      setAnime([]);
    } finally {
      setLoading(false);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="h-8 w-48 bg-gray-800 rounded animate-pulse"></div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="aspect-[2/3] bg-gray-800 rounded-lg animate-pulse"></div>
              <div className="h-4 bg-gray-800 rounded animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
          <span className="text-primary">&lt;</span>
          {title}
          <span className="text-primary">/&gt;</span>
        </h2>
        
        {/* Navigation Buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => scroll('left')}
            className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-full flex items-center justify-center text-white transition-all"
            aria-label="Scroll left"
          >
            <FiChevronLeft size={20} />
          </button>
          <button
            onClick={() => scroll('right')}
            className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-full flex items-center justify-center text-white transition-all"
            aria-label="Scroll right"
          >
            <FiChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Anime Cards Scrollable Container */}
      <div
        ref={scrollContainerRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {anime.map((item) => (
          <Link
            key={item.mal_id}
            href={`/anime/${item.mal_id}`}
            className="flex-shrink-0 w-[180px] group"
          >
            {/* Anime Poster */}
            <div className="relative aspect-[2/3] rounded-lg overflow-hidden mb-3 bg-gray-800">
              <Image
                src={item.images.jpg.large_image_url || item.images.jpg.image_url}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
                sizes="180px"
              />
              
              {/* Score Badge */}
              {item.score && (
                <div className="absolute top-2 left-2 bg-black/80 backdrop-blur-sm px-2 py-1 rounded flex items-center gap-1 text-xs">
                  <span className="text-yellow-400">⭐</span>
                  <span className="text-white font-semibold">{item.score.toFixed(1)}</span>
                </div>
              )}

              {/* Type Badge */}
              {item.type && (
                <div className="absolute top-2 right-2 bg-primary/90 backdrop-blur-sm px-2 py-1 rounded text-white text-xs font-semibold">
                  {item.type}
                </div>
              )}

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                <p className="text-white text-xs">
                  {item.status}
                  {item.episodes && ` • ${item.episodes} eps`}
                </p>
              </div>
            </div>

            {/* Anime Title */}
            <h3 className="text-white font-medium text-sm line-clamp-2 group-hover:text-primary transition-colors">
              {item.title_english || item.title}
            </h3>
          </Link>
        ))}
      </div>
    </div>
  );
}
