'use client';

import { useState, useEffect } from 'react';
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
    };
  };
  synopsis?: string;
  score?: number;
  genres?: Array<{ name: string }>;
}

export default function FeaturedCarousel() {
  const [featuredAnime, setFeaturedAnime] = useState<Anime[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    fetchFeaturedAnime();
  }, []);

  // Auto-advance carousel
  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(timer);
  }, [currentIndex, featuredAnime.length]);

  const fetchFeaturedAnime = async () => {
    try {
      const response = await fetch(
        `https://api.jikan.moe/v4/top/anime?filter=airing&limit=10`
      );
      const data = await response.json();
      setFeaturedAnime(data.data || []);
    } catch (error) {
      console.error('Error fetching featured anime:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePrevious = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev === 0 ? featuredAnime.length - 1 : prev - 1));
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const handleNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev === featuredAnime.length - 1 ? 0 : prev + 1));
    setTimeout(() => setIsTransitioning(false), 500);
  };

  if (loading || featuredAnime.length === 0) {
    return (
      <div className="relative w-full h-[600px] bg-[#1a1a1a] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  const currentAnime = featuredAnime[currentIndex];

  return (
    <div className="relative w-full h-[600px] bg-[#0f0f0f] overflow-hidden group">
      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0">
        <Image
          src={currentAnime.images.jpg.large_image_url}
          alt={currentAnime.title}
          fill
          className="object-cover opacity-40 transition-all duration-500"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-[#0f0f0f]/80 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0f0f0f] via-[#0f0f0f]/50 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative h-full container mx-auto px-4 flex items-center">
        <div className="max-w-2xl space-y-6">
          {/* Title */}
          <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight transition-all duration-500">
            {currentAnime.title_english || currentAnime.title}
          </h1>

          {/* Meta Info */}
          <div className="flex items-center gap-4 text-sm">
            {currentAnime.score && (
              <div className="flex items-center gap-2 bg-primary/20 backdrop-blur-sm px-4 py-2 rounded-full">
                <span className="text-yellow-400">⭐</span>
                <span className="text-white font-semibold">{currentAnime.score.toFixed(1)}</span>
              </div>
            )}
            {currentAnime.genres && currentAnime.genres.slice(0, 3).map((genre, idx) => (
              <span key={idx} className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-white text-xs">
                {genre.name}
              </span>
            ))}
          </div>

          {/* Synopsis */}
          {currentAnime.synopsis && (
            <p className="text-gray-300 text-lg line-clamp-3 leading-relaxed">
              {currentAnime.synopsis}
            </p>
          )}

          {/* CTA Buttons */}
          <div className="flex gap-4">
            <Link
              href={`/anime/${currentAnime.mal_id}`}
              className="px-8 py-3 bg-primary hover:bg-primary-dark text-white font-semibold rounded-lg transition-all transform hover:scale-105 shadow-lg"
            >
              View Details
            </Link>
            <button className="px-8 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-semibold rounded-lg transition-all">
              Add to Watchlist
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={handlePrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/70 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all opacity-0 group-hover:opacity-100"
        aria-label="Previous"
      >
        <FiChevronLeft size={24} />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/70 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all opacity-0 group-hover:opacity-100"
        aria-label="Next"
      >
        <FiChevronRight size={24} />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {featuredAnime.slice(0, 10).map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              if (!isTransitioning) {
                setIsTransitioning(true);
                setCurrentIndex(idx);
                setTimeout(() => setIsTransitioning(false), 500);
              }
            }}
            className={`h-1 rounded-full transition-all ${
              idx === currentIndex ? 'w-12 bg-white' : 'w-6 bg-white/40'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
