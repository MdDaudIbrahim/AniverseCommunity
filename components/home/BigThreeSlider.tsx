'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiChevronLeft, FiChevronRight, FiStar, FiCalendar, FiEye } from 'react-icons/fi';

interface BigThreeAnime {
  mal_id: number;
  title: string;
  description: string;
  image: string;
  coverImage: string;
  rating: number;
  episodes: number;
  year: number;
  genres: string[];
}

const BIG_THREE: BigThreeAnime[] = [
  {
    mal_id: 21,
    title: "ONE PIECE",
    description: "Follow Monkey D. Luffy and his Straw Hat Pirates as they search for the ultimate treasure, the One Piece, to become the Pirate King.",
    image: "https://cdn.myanimelist.net/images/anime/6/73245.jpg",
    coverImage: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=1200&q=80",
    rating: 8.7,
    episodes: 1000,
    year: 1999,
    genres: ["Action", "Adventure", "Fantasy"]
  },
  {
    mal_id: 20,
    title: "NARUTO",
    description: "The story of Naruto Uzumaki, a young ninja who seeks recognition from his peers and dreams of becoming the Hokage.",
    image: "https://cdn.myanimelist.net/images/anime/13/17405.jpg",
    coverImage: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=1200&q=80",
    rating: 8.7,
    episodes: 720,
    year: 2002,
    genres: ["Action", "Adventure", "Fantasy"]
  },
  {
    mal_id: 269,
    title: "BLEACH",
    description: "Follow Ichigo Kurosaki as he obtains the powers of a Soul Reaper and must defend humans from evil spirits and guide departed souls to the afterlife.",
    image: "https://cdn.myanimelist.net/images/anime/1764/126627.jpg",
    coverImage: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=1200&q=80",
    rating: 8.2,
    episodes: 366,
    year: 2004,
    genres: ["Action", "Adventure", "Supernatural"]
  }
];

export default function BigThreeSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % BIG_THREE.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToPrevious = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + BIG_THREE.length) % BIG_THREE.length);
  };

  const goToNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % BIG_THREE.length);
  };

  const goToSlide = (index: number) => {
    setIsAutoPlaying(false);
    setCurrentIndex(index);
  };

  const currentAnime = BIG_THREE[currentIndex];

  return (
    <div className="relative w-full overflow-hidden">
      {/* Title */}
      <div className="text-center mb-8">
        <h2 className="text-4xl md:text-5xl font-bold mb-2">
          THE <span className="text-[#10b981]">BIG</span> THREE
        </h2>
        <p className="text-gray-400">Legendary anime that defined a generation</p>
      </div>

      {/* Main Slider */}
      <div className="relative bg-gradient-to-br from-[#0f0f0f] to-[#1a1a1a] rounded-2xl overflow-hidden border border-[#262626] shadow-2xl">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-transparent to-[#0a0a0a] z-10"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent z-10"></div>
          <Image
            src={currentAnime.image}
            alt={currentAnime.title}
            fill
            className="object-cover blur-xl scale-110"
            priority
            quality={50}
            sizes="100vw"
          />
        </div>

        {/* Content */}
        <div className="relative z-20 grid grid-cols-1 lg:grid-cols-2 gap-8 p-8 md:p-12 min-h-[500px]">
          {/* Left Side - Info */}
          <div className="flex flex-col justify-center space-y-6">
            {/* Title */}
            <div className="space-y-2">
              <div className="inline-block px-3 py-1 bg-[#10b981]/20 border border-[#10b981]/30 rounded-full text-[#10b981] text-sm font-semibold mb-4">
                THE BIG THREE
              </div>
              <h3 className="text-5xl md:text-6xl font-black text-white tracking-tight">
                {currentAnime.title}
              </h3>
              <p className="text-gray-400 text-sm">by Masashi Kishimoto</p>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-2">
                <FiStar className="text-yellow-500" size={20} />
                <span className="text-white font-bold text-lg">{currentAnime.rating}</span>
                <span className="text-gray-400">Rating</span>
              </div>
              <div className="flex items-center gap-2">
                <FiEye className="text-blue-500" size={20} />
                <span className="text-white font-bold text-lg">{currentAnime.episodes}</span>
                <span className="text-gray-400">Episodes</span>
              </div>
              <div className="flex items-center gap-2">
                <FiCalendar className="text-[#10b981]" size={20} />
                <span className="text-white font-bold text-lg">{currentAnime.year}</span>
                <span className="text-gray-400">Year</span>
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-300 text-base leading-relaxed">
              {currentAnime.description}
            </p>

            {/* Genres */}
            <div className="flex flex-wrap gap-2">
              {currentAnime.genres.map((genre) => (
                <span
                  key={genre}
                  className="px-3 py-1 bg-[#1a1a1a] border border-[#262626] rounded-lg text-gray-300 text-sm"
                >
                  {genre}
                </span>
              ))}
            </div>

            {/* Button */}
            <Link
              href={`/anime/${currentAnime.mal_id}`}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#10b981] hover:bg-[#059669] text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-[#10b981]/50 w-fit"
            >
              <FiEye size={20} />
              View Details
            </Link>
          </div>

          {/* Right Side - Image */}
          <div className="relative flex items-center justify-center">
            <div className="relative w-full max-w-md aspect-[3/4] rounded-2xl overflow-hidden border-4 border-[#262626] shadow-2xl transform hover:scale-105 transition-transform duration-300">
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent z-10"></div>
              <Image
                src={currentAnime.image}
                alt={currentAnime.title}
                fill
                className="object-cover"
                priority
                quality={85}
                sizes="(max-width: 768px) 100vw, 450px"
              />
              {/* Rank Badge */}
              <div className="absolute top-4 left-4 z-20 bg-[#10b981] text-white px-4 py-2 rounded-lg font-bold text-xl shadow-lg">
                #{currentIndex + 1}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={goToPrevious}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-black/50 hover:bg-black/70 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 border border-[#262626] hover:border-[#10b981]"
          aria-label="Previous anime"
        >
          <FiChevronLeft size={24} />
        </button>
        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-black/50 hover:bg-black/70 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 border border-[#262626] hover:border-[#10b981]"
          aria-label="Next anime"
        >
          <FiChevronRight size={24} />
        </button>

        {/* Dots Indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-3">
          {BIG_THREE.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-300 rounded-full ${
                index === currentIndex
                  ? 'w-12 h-3 bg-[#10b981]'
                  : 'w-3 h-3 bg-gray-600 hover:bg-gray-400'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
