'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface NewsArticle {
  mal_id: number;
  title: string;
  url: string;
  images: {
    jpg: {
      image_url: string;
    };
  };
  date: string;
  forum_url: string;
}

export default function LatestAnimeNews() {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchNews() {
      try {
        const response = await fetch('https://api.jikan.moe/v4/anime/1/news');
        if (response.ok) {
          const data = await response.json();
          console.log('📰 News fetched:', data.data?.length || 0);
          setNews(data.data?.slice(0, 10) || []);
        }
      } catch (error) {
        console.error('Error fetching news:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchNews();
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 400;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-[#10b981] uppercase tracking-wide">
            Latest Anime News
          </h2>
          <p className="text-sm text-gray-400 mt-1">Page 1 of 2</p>
        </div>
        
        {/* Navigation Arrows */}
        <div className="flex gap-2">
          <button
            onClick={() => scroll('left')}
            className="p-2 bg-[#1a1a1a] hover:bg-[#262626] border border-[#262626] hover:border-[#10b981] rounded-lg transition-all"
            aria-label="Scroll left"
          >
            <svg className="w-5 h-5 text-gray-400 hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => scroll('right')}
            className="p-2 bg-[#1a1a1a] hover:bg-[#262626] border border-[#262626] hover:border-[#10b981] rounded-lg transition-all"
            aria-label="Scroll right"
          >
            <svg className="w-5 h-5 text-gray-400 hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* News Carousel */}
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="bg-[#1a1a1a] rounded-lg h-80 animate-pulse" />
          ))}
        </div>
      ) : (
        <div 
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {news.map((article) => (
            <a
              key={article.mal_id}
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 w-64 group"
            >
              <div className="bg-[#1a1a1a] rounded-lg overflow-hidden border border-[#262626] hover:border-[#10b981]/50 transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-[#10b981]/20">
                {/* Image with Badge */}
                <div className="relative aspect-[3/4] overflow-hidden">
                  {article.images?.jpg?.image_url ? (
                    <Image
                      src={article.images.jpg.image_url}
                      alt={article.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                      sizes="256px"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[#1a1a1a] to-[#262626] flex items-center justify-center">
                      <svg className="w-16 h-16 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                      </svg>
                    </div>
                  )}
                  <div className="absolute top-2 left-2 bg-[#10b981] text-black text-xs font-bold px-2 py-1 rounded">
                    News
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="text-white font-semibold text-sm line-clamp-3 min-h-[3.75rem] group-hover:text-[#10b981] transition-colors">
                    {article.title}
                  </h3>
                  {article.date && (
                    <p className="text-xs text-gray-500 mt-2">
                      {new Date(article.date).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric', 
                        year: 'numeric' 
                      })}
                    </p>
                  )}
                </div>
              </div>
            </a>
          ))}
        </div>
      )}

      {/* Pagination Dots */}
      <div className="flex justify-center gap-2 mt-6">
        <button className="w-8 h-8 rounded-full bg-[#10b981] text-black font-bold text-sm">
          1
        </button>
        <button className="w-8 h-8 rounded-full bg-[#1a1a1a] hover:bg-[#262626] text-gray-400 hover:text-white font-bold text-sm transition-all">
          2
        </button>
        <button className="w-8 h-8 rounded-full bg-[#1a1a1a] hover:bg-[#262626] text-gray-400 hover:text-white font-bold text-sm transition-all">
          3
        </button>
      </div>
    </div>
  );
}
