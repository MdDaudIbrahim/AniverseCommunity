'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  FiZap, FiHeart, FiTrendingUp, FiStar, FiUsers, 
  FiBook, FiSun, FiMoon, FiTarget, FiAward 
} from 'react-icons/fi';

const genres = [
  { id: 1, name: 'Action', icon: FiZap, color: 'from-red-500 to-orange-500', bgColor: 'bg-red-50 dark:bg-red-900/10', description: 'High-energy fights and adventures' },
  { id: 2, name: 'Adventure', icon: FiTarget, color: 'from-green-500 to-teal-500', bgColor: 'bg-green-50 dark:bg-green-900/10', description: 'Epic journeys and exploration' },
  { id: 4, name: 'Comedy', icon: FiSun, color: 'from-yellow-500 to-orange-500', bgColor: 'bg-yellow-50 dark:bg-yellow-900/10', description: 'Laugh-out-loud funny moments' },
  { id: 8, name: 'Drama', icon: FiHeart, color: 'from-pink-500 to-purple-500', bgColor: 'bg-pink-50 dark:bg-pink-900/10', description: 'Emotional and compelling stories' },
  { id: 10, name: 'Fantasy', icon: FiStar, color: 'from-purple-500 to-indigo-500', bgColor: 'bg-purple-50 dark:bg-purple-900/10', description: 'Magical worlds and creatures' },
  { id: 14, name: 'Horror', icon: FiMoon, color: 'from-gray-700 to-gray-900', bgColor: 'bg-gray-50 dark:bg-gray-900/10', description: 'Spine-chilling thrills' },
  { id: 22, name: 'Romance', icon: FiHeart, color: 'from-pink-400 to-rose-500', bgColor: 'bg-rose-50 dark:bg-rose-900/10', description: 'Love stories that touch hearts' },
  { id: 24, name: 'Sci-Fi', icon: FiTrendingUp, color: 'from-blue-500 to-cyan-500', bgColor: 'bg-blue-50 dark:bg-blue-900/10', description: 'Futuristic technology and space' },
  { id: 36, name: 'Slice of Life', icon: FiUsers, color: 'from-emerald-500 to-green-500', bgColor: 'bg-emerald-50 dark:bg-emerald-900/10', description: 'Everyday life and relationships' },
  { id: 37, name: 'Supernatural', icon: FiStar, color: 'from-violet-500 to-purple-600', bgColor: 'bg-violet-50 dark:bg-violet-900/10', description: 'Mysterious powers and beings' },
  { id: 30, name: 'Sports', icon: FiAward, color: 'from-orange-500 to-red-500', bgColor: 'bg-orange-50 dark:bg-orange-900/10', description: 'Athletic competition and teamwork' },
  { id: 7, name: 'Mystery', icon: FiBook, color: 'from-indigo-500 to-blue-600', bgColor: 'bg-indigo-50 dark:bg-indigo-900/10', description: 'Puzzles and thrilling investigations' },
];

export default function GenresPage() {
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Browse by Genre
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Discover thousands of anime across different genres and find your next favorite show
          </p>
          <div className="mt-6 flex justify-center gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              12 Genres
            </span>
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 bg-secondary rounded-full"></div>
              1000+ Anime
            </span>
          </div>
        </div>

        {/* Genre Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {genres.map((genre) => {
            const Icon = genre.icon;
            return (
              <Link
                key={genre.id}
                href={`/genre/${genre.id}`}
                className="group relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105"
                onMouseEnter={() => setSelectedGenre(genre.id)}
                onMouseLeave={() => setSelectedGenre(null)}
              >
                {/* Animated Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${genre.color} opacity-0 group-hover:opacity-20 transition-all duration-500`} />
                
                {/* Subtle Pattern Overlay */}
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute inset-0" style={{
                    backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)',
                    backgroundSize: '16px 16px'
                  }} />
                </div>
                
                {/* Content */}
                <div className="relative p-6 sm:p-8">
                  {/* Icon with Glow */}
                  <div className={`w-14 h-14 sm:w-16 sm:h-16 mb-4 bg-gradient-to-br ${genre.color} rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-2xl group-hover:scale-110 transition-all duration-300`}>
                    <Icon className="text-white" size={28} />
                  </div>
                  
                  {/* Genre Name */}
                  <h3 className="text-xl sm:text-2xl font-bold mb-2 group-hover:text-primary transition-colors duration-300">
                    {genre.name}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
                    {genre.description}
                  </p>
                  
                  {/* Explore Button */}
                  <div className="mt-4 flex items-center gap-2 text-primary opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <span className="text-sm font-semibold">Explore</span>
                    <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                  
                  {/* Corner Badge */}
                  <div className="absolute top-4 right-4 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                    <svg className="w-4 h-4 text-primary group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Info Section */}
        <div className="mt-16 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 rounded-3xl blur-3xl"></div>
          <div className="relative bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 md:p-12 overflow-hidden">
            {/* Decorative pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-0 right-0 w-96 h-96 bg-primary rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary rounded-full blur-3xl"></div>
            </div>
            
            <div className="relative">
              <h3 className="text-2xl md:text-3xl font-bold mb-4 text-center bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Explore Endless Possibilities
              </h3>
              <p className="text-gray-400 text-center max-w-3xl mx-auto mb-8 leading-relaxed">
                Anime genres help you discover shows that match your interests. Each genre represents a unique style, 
                theme, or storytelling approach. From heart-pounding action to tear-jerking romance, discover stories that resonate with you.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="group text-center p-6 bg-slate-800/50 rounded-xl border border-slate-700 hover:border-primary transition-all duration-300 hover:shadow-lg hover:shadow-primary/20">
                  <div className="text-4xl mb-3">🎯</div>
                  <h4 className="font-bold mb-2 text-lg group-hover:text-primary transition-colors">Popular Genres</h4>
                  <p className="text-sm text-gray-400">
                    Action, Romance, and Comedy are the most watched genres with millions of fans
                  </p>
                </div>
                <div className="group text-center p-6 bg-slate-800/50 rounded-xl border border-slate-700 hover:border-secondary transition-all duration-300 hover:shadow-lg hover:shadow-secondary/20">
                  <div className="text-4xl mb-3">🌟</div>
                  <h4 className="font-bold mb-2 text-lg group-hover:text-secondary transition-colors">Mix & Match</h4>
                  <p className="text-sm text-gray-400">
                    Many anime combine multiple genres creating unique and unforgettable experiences
                  </p>
                </div>
                <div className="group text-center p-6 bg-slate-800/50 rounded-xl border border-slate-700 hover:border-accent transition-all duration-300 hover:shadow-lg hover:shadow-accent/20">
                  <div className="text-4xl mb-3">📚</div>
                  <h4 className="font-bold mb-2 text-lg group-hover:text-accent transition-colors">Explore More</h4>
                  <p className="text-sm text-gray-400">
                    Try different genres to discover hidden gems and your new favorite anime series
                  </p>
                </div>
              </div>
              
              <div className="mt-10 pt-8 border-t border-slate-700">
                <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-400">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                    <span>Updated Daily</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-secondary rounded-full animate-pulse"></div>
                    <span>High-Quality Content</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
                    <span>Curated Collections</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
