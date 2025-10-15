'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Anime {
  mal_id: number;
  title: string;
  title_english: string | null;
  synopsis: string;
  images: {
    jpg: {
      large_image_url: string;
      image_url: string;
    };
  };
  genres: Array<{ name: string }>;
  episodes: number | null;
  score: number | null;
  favorites: number;
  members: number;
  aired: {
    from: string;
  };
  type: string;
  status?: string;
}

export default function FeaturedAnimeHero() {
  const [featuredList, setFeaturedList] = useState<Anime[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    async function fetchFeatured() {
      try {
        const response = await fetch('https://api.jikan.moe/v4/seasons/now?limit=8&sfw=true');
        if (response.ok) {
          const data = await response.json();
          if (data.data && data.data.length > 0) {
            // Filter for high-scored anime with good images
            const filtered = data.data
              .filter((anime: Anime) => anime.score && anime.score >= 6.5)
              .slice(0, 6);
            setFeaturedList(filtered.length > 0 ? filtered : data.data.slice(0, 6));
          }
        }
      } catch (error) {
        console.error('Error fetching featured anime:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchFeatured();
  }, []);

  // Auto-play functionality
  useEffect(() => {
    if (isPaused || featuredList.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredList.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [isPaused, featuredList.length]);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + featuredList.length) % featuredList.length);
  }, [featuredList.length]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % featuredList.length);
  }, [featuredList.length]);

  if (loading || featuredList.length === 0) {
    return (
      <div className="w-full h-[500px] md:h-[600px] bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] animate-pulse" />
    );
  }

  const currentAnime = featuredList[currentIndex];
  const displayTitle = currentAnime.title_english || currentAnime.title;
  const year = currentAnime.aired?.from ? new Date(currentAnime.aired.from).getFullYear() : '';

  return (
    <div 
      className="relative w-full h-[500px] md:h-[650px] overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <Image
          src={currentAnime.images.jpg.large_image_url}
          alt={displayTitle}
          fill
          className="object-cover object-center"
          priority
        />
        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
      </div>

      {/* Content Container */}
      <div className="relative h-full container mx-auto px-4 md:px-8 flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center w-full">
          {/* Left Side - Text Content */}
          <div className="space-y-4 md:space-y-6 z-10">
            {/* Badge */}
            {currentAnime.status === 'Currently Airing' && (
              <div className="inline-flex items-center gap-2 bg-red-600 px-3 py-1 rounded">
                <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                <span className="text-white text-xs font-bold uppercase">New Episode</span>
              </div>
            )}
            
            {/* Score Badge */}
            {currentAnime.score && (
              <div className="inline-flex items-center gap-2 ml-3">
                <div className="flex items-center gap-1 bg-yellow-500 px-3 py-1 rounded">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="text-white text-sm font-bold">{currentAnime.score.toFixed(1)}</span>
                </div>
              </div>
            )}

            {/* Title */}
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              {displayTitle}
            </h1>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-3 text-sm md:text-base">
              <span className="text-white font-medium">{year}</span>
              {currentAnime.type && (
                <>
                  <span className="text-gray-400">•</span>
                  <span className="text-white">{currentAnime.type}</span>
                </>
              )}
              {currentAnime.genres && currentAnime.genres.length > 0 && (
                <>
                  <span className="text-gray-400">•</span>
                  <span className="text-white">{currentAnime.genres.map(g => g.name).slice(0, 2).join(', ')}</span>
                </>
              )}
            </div>

            {/* Synopsis */}
            <p className="text-gray-300 text-sm md:text-base leading-relaxed line-clamp-3 max-w-2xl">
              {currentAnime.synopsis || 'Third season of One Punch Man.'}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 md:gap-4 pt-2">
              <Link 
                href={`/anime/${currentAnime.mal_id}`}
                className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 md:px-8 py-2.5 md:py-3 rounded-lg font-semibold transition-all duration-200"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
                </svg>
                Watch Now
              </Link>
              <Link 
                href={`/anime/${currentAnime.mal_id}`}
                className="inline-flex items-center justify-center gap-2 bg-gray-800/80 hover:bg-gray-700 text-white px-6 md:px-8 py-2.5 md:py-3 rounded-lg font-semibold transition-all duration-200 border border-gray-700"
              >
                More Info
              </Link>
            </div>
          </div>

          {/* Right Side - Featured Poster (visible on larger screens) */}
          <div className="hidden lg:flex justify-end items-center">
            <div className="relative w-64 xl:w-80 h-96 xl:h-[480px] rounded-xl overflow-hidden shadow-2xl border-4 border-white/10 transform hover:scale-105 transition-transform duration-300">
              <Image
                src={currentAnime.images.jpg.large_image_url}
                alt={displayTitle}
                fill
                className="object-cover"
                sizes="320px"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/80 text-white p-3 rounded-full transition-all duration-200 backdrop-blur-sm"
        aria-label="Previous slide"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/80 text-white p-3 rounded-full transition-all duration-200 backdrop-blur-sm"
        aria-label="Next slide"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Pagination Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {featuredList.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 ${
              index === currentIndex
                ? 'w-8 h-2 bg-white'
                : 'w-2 h-2 bg-white/50 hover:bg-white/80'
            } rounded-full`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
