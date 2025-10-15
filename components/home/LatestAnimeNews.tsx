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
  author_username?: string;
  excerpt?: string;
  comments?: number;
}

export default function LatestAnimeNews() {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedNews, setSelectedNews] = useState<NewsArticle | null>(null);
  const [showModal, setShowModal] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchNews(retryCount = 0) {
      try {
        console.log('📰 Fetching anime news...');
        const response = await fetch('https://api.jikan.moe/v4/anime/1/news');
        
        if (!response.ok) {
          if ((response.status === 429 || response.status >= 500) && retryCount < 2) {
            console.log(`⏳ Retrying news fetch... (${retryCount + 1}/2)`);
            await new Promise(resolve => setTimeout(resolve, 2000 * (retryCount + 1)));
            return fetchNews(retryCount + 1);
          }
          throw new Error(`API request failed with status ${response.status}`);
        }
        
        const data = await response.json();
        console.log('✅ News fetched:', data.data?.length || 0);
        setNews(data.data?.slice(0, 10) || []);
      } catch (error) {
        console.error('❌ Error fetching news:', error);
        setNews([]);
      } finally {
        setLoading(false);
      }
    }

    // Delay news fetch to avoid rate limiting (after seasonal anime)
    const timer = setTimeout(() => {
      fetchNews();
    }, 2000);

    return () => clearTimeout(timer);
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

  const handleNewsClick = (article: NewsArticle, e: React.MouseEvent) => {
    e.preventDefault();
    setSelectedNews(article);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setTimeout(() => setSelectedNews(null), 300);
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
            <div
              key={article.mal_id}
              onClick={(e) => handleNewsClick(article, e)}
              className="flex-shrink-0 w-64 group cursor-pointer"
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
            </div>
          ))}
        </div>
      )}

      {/* News Preview Modal */}
      {showModal && selectedNews && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn"
          onClick={closeModal}
        >
          <div 
            className="relative bg-[#1a1a1a] rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-[#262626] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/70 rounded-full transition-all"
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Modal Content */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Image Section */}
              <div className="relative aspect-[3/4] md:aspect-auto md:min-h-[500px] overflow-hidden rounded-t-xl md:rounded-l-xl md:rounded-tr-none">
                {selectedNews.images?.jpg?.image_url ? (
                  <Image
                    src={selectedNews.images.jpg.image_url}
                    alt={selectedNews.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-[#1a1a1a] to-[#262626] flex items-center justify-center">
                    <svg className="w-24 h-24 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                    </svg>
                  </div>
                )}
              </div>

              {/* Content Section */}
              <div className="p-6 md:p-8 flex flex-col">
                <div className="flex-1">
                  {/* Title */}
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight">
                    {selectedNews.title}
                  </h2>

                  {/* Meta Info */}
                  <div className="flex flex-wrap items-center gap-4 mb-6 text-sm">
                    {selectedNews.author_username && (
                      <div className="flex items-center gap-2">
                        <span className="text-gray-400">Author:</span>
                        <span className="text-[#10b981] font-semibold">{selectedNews.author_username}</span>
                      </div>
                    )}
                    {selectedNews.date && (
                      <div className="flex items-center gap-2">
                        <span className="text-gray-400">Date:</span>
                        <span className="text-white">
                          {new Date(selectedNews.date).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric', 
                            year: 'numeric' 
                          })}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Excerpt/Description */}
                  {selectedNews.excerpt && (
                    <div className="mb-6">
                      <p className="text-gray-300 leading-relaxed">
                        {selectedNews.excerpt}
                      </p>
                    </div>
                  )}

                  {/* Additional Info */}
                  <div className="space-y-2 mb-6 text-sm">
                    {selectedNews.comments !== undefined && (
                      <div className="flex items-center gap-2 text-gray-400">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        <span>{selectedNews.comments} comments</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 mt-6">
                  <a
                    href={selectedNews.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-[#10b981] hover:bg-[#059669] text-white px-6 py-3 rounded-lg font-semibold transition-all"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    Read on MyAnimeList
                  </a>
                  <button
                    onClick={closeModal}
                    className="flex items-center justify-center gap-2 bg-[#262626] hover:bg-[#333] text-white px-6 py-3 rounded-lg font-semibold transition-all"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
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
