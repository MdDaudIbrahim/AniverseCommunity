'use client';

import { useState, useEffect } from 'react';
import AnimeCard from '@/components/anime/AnimeCard';
import { FALLBACK_ANIME, FEATURED_SEASONAL, TRENDING_NOW } from '@/lib/data/fallbackData';
import { FiRefreshCw, FiTrendingUp, FiStar, FiZap, FiHeart, FiLoader } from 'react-icons/fi';
import Link from 'next/link';
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

type Category = 'trending' | 'top-rated' | 'popular' | 'mixed';

export default function RecommendationsPage() {
  const allAnime = [...FALLBACK_ANIME, ...FEATURED_SEASONAL, ...TRENDING_NOW];
  
  const [activeCategory, setActiveCategory] = useState<Category>('trending');
  const [recommendations, setRecommendations] = useState<Anime[]>([]);
  const [forYou, setForYou] = useState<Anime[]>([]);
  const [hiddenGems, setHiddenGems] = useState<Anime[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadRecommendations();
  }, [activeCategory]);

  useEffect(() => {
    setForYou(getRandomAnime(allAnime as Anime[], 6));
    setHiddenGems(getRandomAnime(allAnime as Anime[], 6));
  }, []);

  function getRandomAnime(animeList: Anime[], count: number): Anime[] {
    const shuffled = [...animeList].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
  }

  const loadRecommendations = () => {
    setLoading(true);
    setTimeout(() => {
      let selected: Anime[] = [];
      
      switch (activeCategory) {
        case 'trending':
          selected = [...TRENDING_NOW].sort(() => Math.random() - 0.5).slice(0, 18) as Anime[];
          break;
        case 'top-rated':
          selected = [...FALLBACK_ANIME]
            .filter(a => a.score && a.score >= 8.0)
            .sort((a, b) => (b.score || 0) - (a.score || 0))
            .slice(0, 18) as Anime[];
          break;
        case 'popular':
          selected = [...FEATURED_SEASONAL].slice(0, 18) as Anime[];
          break;
        case 'mixed':
          selected = getRandomAnime(allAnime as Anime[], 18);
          break;
      }
      
      setRecommendations(selected);
      setLoading(false);
    }, 500);
  };

  const refreshRecommendations = () => {
    loadRecommendations();
  };

  const refreshSection = (setter: React.Dispatch<React.SetStateAction<Anime[]>>) => {
    setter(getRandomAnime(allAnime as Anime[], 6));
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <div className="container mx-auto px-4 py-8">
        {/* Compact Header */}
        <div className="mb-6">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-white">
            Discover Your Next Favorite Anime
          </h1>
          <p className="text-sm text-gray-400">
            Personalized recommendations based on trending shows, top-rated series, and hidden gems
          </p>
        </div>

        {/* Ad Banner */}{/* Compact Category Selector */}
        <div className="mb-6 bg-[#1a1a1a] border border-[#262626] rounded-xl p-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Category Buttons */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveCategory('trending')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                  activeCategory === 'trending'
                    ? 'bg-[#10b981] text-white shadow-md scale-105'
                    : 'bg-[#0f0f0f] border border-[#262626] text-gray-300 hover:bg-[#1a1a1a] hover:border-[#10b981]/50'
                }`}
              >
                <FiTrendingUp size={14} />
                <span>Trending Now</span>
              </button>
              <button
                onClick={() => setActiveCategory('top-rated')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                  activeCategory === 'top-rated'
                    ? 'bg-[#10b981] text-white shadow-md scale-105'
                    : 'bg-[#0f0f0f] border border-[#262626] text-gray-300 hover:bg-[#1a1a1a] hover:border-[#10b981]/50'
                }`}
              >
                <FiStar size={14} />
                <span>Top Rated</span>
              </button>
              <button
                onClick={() => setActiveCategory('popular')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                  activeCategory === 'popular'
                    ? 'bg-[#10b981] text-white shadow-md scale-105'
                    : 'bg-[#0f0f0f] border border-[#262626] text-gray-300 hover:bg-[#1a1a1a] hover:border-[#10b981]/50'
                }`}
              >
                <FiZap size={14} />
                <span>Most Popular</span>
              </button>
              <button
                onClick={() => setActiveCategory('mixed')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                  activeCategory === 'mixed'
                    ? 'bg-gradient-to-r from-[#10b981] to-[#059669] text-white shadow-md scale-105'
                    : 'bg-[#0f0f0f] border border-[#262626] text-gray-300 hover:bg-[#1a1a1a] hover:border-[#10b981]/50'
                }`}
              >
                <FiHeart size={14} />
                <span>Surprise Me</span>
              </button>
            </div>

            {/* Refresh Button */}
            <button
              onClick={refreshRecommendations}
              disabled={loading}
              className="px-2.5 py-1.5 bg-blue-500 text-white rounded-lg text-xs hover:bg-blue-600 transition-colors disabled:opacity-50"
              title="Refresh"
            >
              <FiRefreshCw className={loading ? 'animate-spin' : ''} size={14} />
            </button>
          </div>
        </div>

        {/* Main Recommendations Grid */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-white">
              {activeCategory === 'trending' && '🔥 Trending Now'}
              {activeCategory === 'top-rated' && '⭐ Top Rated Anime'}
              {activeCategory === 'popular' && '⚡ Most Popular'}
              {activeCategory === 'mixed' && '🎲 Curated For You'}
            </h2>
            <span className="text-xs text-gray-400 bg-[#1a1a1a] border border-[#262626] px-2 py-1 rounded-full">
              {recommendations.length} anime
            </span>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <FiLoader className="w-12 h-12 text-[#10b981] animate-spin" />
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {recommendations.map((anime) => (
                <AnimeCard key={anime.mal_id} anime={anime as any} />
              ))}
            </div>
          )}
        </div>

        {/* Personalized For You Section */}
        <div className="mb-8 bg-gradient-to-br from-[#10b981]/5 to-[#10b981]/5 rounded-xl p-4 border border-[#262626]">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-white">✨ Picked Just For You</h2>
            <button
              onClick={() => refreshSection(setForYou)}
              className="px-2.5 py-1.5 bg-[#1a1a1a] border border-[#262626] rounded-lg hover:bg-[#0f0f0f] hover:border-[#10b981]/50 transition-colors text-xs text-gray-300"
              title="Refresh"
            >
              <FiRefreshCw size={14} />
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {forYou.map((anime) => (
              <AnimeCard key={anime.mal_id} anime={anime as any} />
            ))}
          </div>
        </div>

        {/* Hidden Gems Section */}
        <div className="mb-8 bg-gradient-to-br from-purple-500/5 to-pink-500/5 rounded-xl p-4 border border-[#262626]">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-white">💎 Hidden Gems</h2>
            <button
              onClick={() => refreshSection(setHiddenGems)}
              className="px-2.5 py-1.5 bg-[#1a1a1a] border border-[#262626] rounded-lg hover:bg-[#0f0f0f] hover:border-[#10b981]/50 transition-colors text-xs text-gray-300"
              title="Refresh"
            >
              <FiRefreshCw size={14} />
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {hiddenGems.map((anime) => (
              <AnimeCard key={anime.mal_id} anime={anime as any} />
            ))}
          </div>
        </div>

        {/* Explore by Genre */}
        <div className="mb-6 bg-[#1a1a1a] border border-[#262626] rounded-xl p-4">
          <h2 className="text-lg font-bold mb-3 text-white">🎭 Explore by Genre</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
            {[
              { name: 'Action', icon: '⚔️', id: '1' },
              { name: 'Romance', icon: '💕', id: '22' },
              { name: 'Comedy', icon: '😂', id: '4' },
              { name: 'Fantasy', icon: '🔮', id: '10' },
              { name: 'Drama', icon: '🎭', id: '8' },
              { name: 'Sci-Fi', icon: '🚀', id: '24' },
              { name: 'Slice of Life', icon: '🌸', id: '36' },
              { name: 'Adventure', icon: '🗺️', id: '2' },
              { name: 'Mystery', icon: '🔍', id: '7' },
              { name: 'Horror', icon: '👻', id: '14' },
              { name: 'Sports', icon: '⚽', id: '30' },
              { name: 'Supernatural', icon: '✨', id: '37' },
            ].map((genre) => (
              <Link
                key={genre.name}
                href={`/genre/${genre.id}`}
                className="flex items-center gap-2 p-2 bg-[#0f0f0f] border border-[#262626] hover:bg-[#10b981] hover:text-white hover:border-[#10b981] rounded-lg transition-all text-sm font-semibold text-gray-300"
              >
                <span className="text-lg">{genre.icon}</span>
                <span>{genre.name}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom Ad */}</div>
    </div>
  );
}
