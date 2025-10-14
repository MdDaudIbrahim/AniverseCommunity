'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiChevronLeft, FiChevronRight, FiStar, FiPlay } from 'react-icons/fi';
import { TRENDING_NOW } from '@/lib/data/fallbackData';

interface Anime {
  mal_id: number;
  images: any;
  title: string;
  title_english: string | null;
  score: number | null;
  synopsis?: string;
  genres: any[];
  year: number | null;
  episodes: number | null;
}

export default function AnimeCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [anime, setAnime] = useState<Anime[]>(TRENDING_NOW as Anime[]);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe) {
      nextSlide();
    }
    if (isRightSwipe) {
      prevSlide();
    }
  };

  // Auto-play carousel
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % anime.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying, anime.length]);

  // Fetch fresh data in background
  useEffect(() => {
    async function fetchLatestAnime() {
      try {
        const response = await fetch('https://api.jikan.moe/v4/seasons/now?limit=6&sfw=true', {
          headers: { 'Accept': 'application/json' }
        });
        
        if (response.ok) {
          const data = await response.json();
          if (data.data && data.data.length > 0) {
            setAnime(data.data);
          }
        }
      } catch (err) {
        console.log('Using cached carousel data');
      }
    }

    const timer = setTimeout(fetchLatestAnime, 1000);
    return () => clearTimeout(timer);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000); // Resume after 10s
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % anime.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + anime.length) % anime.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const currentAnime = anime[currentIndex];
  const imageUrl = currentAnime.images.jpg.large_image_url || currentAnime.images.jpg.image_url;
  const title = currentAnime.title_english || currentAnime.title;

  return (
    <div 
      className="relative w-full h-[500px] md:h-[600px] overflow-hidden bg-gray-900"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover object-center opacity-40 blur-sm scale-110"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative h-full container mx-auto px-4 flex items-center">
        <div className="max-w-2xl z-10">
          {/* Badge */}
          <div className="flex items-center gap-2 mb-4">
            <span className="px-3 py-1 bg-red-600 text-white text-sm font-bold rounded">
              NEW EPISODE
            </span>
            {currentAnime.score && (
              <div className="flex items-center gap-1 px-3 py-1 bg-yellow-500/20 backdrop-blur-sm text-yellow-400 text-sm font-bold rounded">
                <FiStar className="fill-current" />
                {currentAnime.score.toFixed(1)}
              </div>
            )}
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 md:mb-4 drop-shadow-lg line-clamp-2">
            {title}
          </h1>

          {/* Info */}
          <div className="flex flex-wrap items-center gap-2 md:gap-4 text-sm md:text-base text-gray-300 mb-3 md:mb-4">
            {currentAnime.year && (
              <span className="font-semibold">{currentAnime.year}</span>
            )}
            {currentAnime.episodes && (
              <span className="hidden sm:inline">{currentAnime.episodes} Episodes</span>
            )}
            {currentAnime.genres && currentAnime.genres.length > 0 && (
              <span className="line-clamp-1">{currentAnime.genres.slice(0, 2).map(g => g.name).join(' • ')}</span>
            )}
          </div>

          {/* Synopsis */}
          {currentAnime.synopsis && (
            <p className="hidden md:block text-gray-300 text-base lg:text-lg mb-6 line-clamp-3">
              {currentAnime.synopsis}
            </p>
          )}

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
            <Link
              href={`/anime/${currentAnime.mal_id}`}
              className="flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-primary hover:bg-primary-dark text-white text-sm sm:text-base font-bold rounded-full transition-all transform hover:scale-105"
            >
              <FiPlay className="fill-current" size={18} />
              Watch Now
            </Link>
            <Link
              href={`/anime/${currentAnime.mal_id}`}
              className="px-5 sm:px-6 py-2.5 sm:py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white text-sm sm:text-base font-bold rounded-full transition-all text-center"
            >
              More Info
            </Link>
          </div>
        </div>

        {/* Anime Poster */}
        <div className="hidden lg:block absolute right-20 top-1/2 -translate-y-1/2 w-64 h-96 rounded-lg overflow-hidden shadow-2xl border-4 border-white/20">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center bg-black/50 hover:bg-black/70 backdrop-blur-sm text-white rounded-full transition-all"
        aria-label="Previous slide"
      >
        <FiChevronLeft size={24} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center bg-black/50 hover:bg-black/70 backdrop-blur-sm text-white rounded-full transition-all"
        aria-label="Next slide"
      >
        <FiChevronRight size={24} />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {anime.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all ${
              index === currentIndex
                ? 'w-8 h-2 bg-white'
                : 'w-2 h-2 bg-white/50 hover:bg-white/75'
            } rounded-full`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Progress Bar */}
      {isAutoPlaying && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
          <div
            className="h-full bg-primary transition-all"
            style={{
              width: '100%',
              animation: 'progress 5s linear infinite'
            }}
          />
        </div>
      )}

      <style jsx>{`
        @keyframes progress {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
