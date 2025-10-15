'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Anime {
  mal_id: number;
  title: string;
  title_english: string | null;
  images: {
    jpg: {
      large_image_url: string;
    };
  };
  episodes: number | null;
  score: number | null;
  type: string;
  genres: Array<{ name: string }>;
}

const ITEMS_PER_PAGE = 10;

// Fallback movie data in case API fails
const FALLBACK_MOVIES: Anime[] = [
  {
    mal_id: 5114,
    title: "Fullmetal Alchemist: Brotherhood",
    title_english: "Fullmetal Alchemist: Brotherhood",
    images: { jpg: { large_image_url: "https://cdn.myanimelist.net/images/anime/1223/96541.jpg" } },
    episodes: 64,
    score: 9.1,
    type: "TV",
    genres: []
  },
  {
    mal_id: 9253,
    title: "Steins;Gate",
    title_english: "Steins;Gate",
    images: { jpg: { large_image_url: "https://cdn.myanimelist.net/images/anime/5/73199.jpg" } },
    episodes: 24,
    score: 9.07,
    type: "TV",
    genres: []
  },
  {
    mal_id: 28977,
    title: "Gintama°",
    title_english: "Gintama Season 4",
    images: { jpg: { large_image_url: "https://cdn.myanimelist.net/images/anime/3/72078.jpg" } },
    episodes: 51,
    score: 9.06,
    type: "TV",
    genres: []
  },
  {
    mal_id: 11061,
    title: "Hunter x Hunter (2011)",
    title_english: "Hunter x Hunter",
    images: { jpg: { large_image_url: "https://cdn.myanimelist.net/images/anime/11/33657.jpg" } },
    episodes: 148,
    score: 9.04,
    type: "TV",
    genres: []
  },
  {
    mal_id: 38524,
    title: "Shingeki no Kyojin Season 3 Part 2",
    title_english: "Attack on Titan Season 3 Part 2",
    images: { jpg: { large_image_url: "https://cdn.myanimelist.net/images/anime/1517/100633.jpg" } },
    episodes: 10,
    score: 9.05,
    type: "TV",
    genres: []
  }
];

export default function AnimeVaultGrid() {
  const [allAnime, setAllAnime] = useState<Anime[]>([]);
  const [topMovies, setTopMovies] = useState<Anime[]>(FALLBACK_MOVIES);
  const [loading, setLoading] = useState(true);
  const [moviesLoading, setMoviesLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All Genres');
  const [selectedType, setSelectedType] = useState('Most popular');

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setMoviesLoading(true);
        
        // Fetch main anime list
        const animeResponse = await fetch('https://api.jikan.moe/v4/top/anime?limit=25&sfw=true');
        if (animeResponse.ok) {
          const animeData = await animeResponse.json();
          console.log('✅ Main anime fetched:', animeData.data?.length || 0);
          setAllAnime(animeData.data || []);
        }
        setLoading(false);

        // Wait a bit to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Fetch top movies for sidebar
        console.log('🎬 Fetching top movies...');
        const moviesResponse = await fetch('https://api.jikan.moe/v4/top/anime?type=movie&limit=5&sfw=true');
        if (moviesResponse.ok) {
          const moviesData = await moviesResponse.json();
          console.log('✅ Top movies fetched:', moviesData.data?.length || 0);
          if (moviesData.data && moviesData.data.length > 0) {
            setTopMovies(moviesData.data);
          }
        } else {
          console.error('❌ Movies fetch failed:', moviesResponse.status);
        }
      } catch (error) {
        console.error('❌ Error fetching data:', error);
      } finally {
        setMoviesLoading(false);
      }
    }

    fetchData();
  }, []);

  // Filter anime based on search
  const filteredAnime = allAnime.filter(anime => {
    const title = (anime.title_english || anime.title).toLowerCase();
    return title.includes(searchTerm.toLowerCase());
  });

  // Pagination
  const totalPages = Math.ceil(filteredAnime.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedAnime = filteredAnime.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReset = () => {
    setSearchTerm('');
    setSelectedGenre('All Genres');
    setSelectedType('Most popular');
    setCurrentPage(1);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8">
      {/* Main Content */}
      <div>
        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div>
              <label className="block text-sm text-gray-400 mb-2">
                <span className="text-[#10b981]">⚡</span> Search
              </label>
              <input
                type="text"
                placeholder="Search anime..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-[#1a1a1a] border border-[#262626] rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:border-[#10b981] focus:outline-none transition-colors"
              />
            </div>

            {/* Genre Filter */}
            <div>
              <label className="block text-sm text-gray-400 mb-2">
                <span className="text-[#10b981]">🎭</span> Genre
              </label>
              <select
                value={selectedGenre}
                onChange={(e) => setSelectedGenre(e.target.value)}
                className="w-full bg-[#1a1a1a] border border-[#262626] rounded-lg px-4 py-2 text-white focus:border-[#10b981] focus:outline-none transition-colors cursor-pointer"
              >
                <option>All Genres</option>
                <option>Action</option>
                <option>Adventure</option>
                <option>Comedy</option>
                <option>Drama</option>
                <option>Fantasy</option>
                <option>Horror</option>
                <option>Romance</option>
                <option>Sci-Fi</option>
              </select>
            </div>

            {/* Type Filter */}
            <div>
              <label className="block text-sm text-gray-400 mb-2">
                <span className="text-[#10b981]">📺</span> Type
              </label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full bg-[#1a1a1a] border border-[#262626] rounded-lg px-4 py-2 text-white focus:border-[#10b981] focus:outline-none transition-colors cursor-pointer"
              >
                <option>Most popular</option>
                <option>Top Airing</option>
                <option>Top Upcoming</option>
                <option>Highest Rated</option>
              </select>
            </div>
          </div>

          {/* Reset Button */}
          <div className="flex justify-end">
            <button
              onClick={handleReset}
              className="px-6 py-2 bg-[#1a1a1a] hover:bg-[#262626] border border-[#262626] hover:border-[#10b981] text-gray-300 hover:text-white rounded-lg transition-all duration-200"
            >
              Reset Filters
            </button>
          </div>
        </div>

        {/* Anime Grid */}
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="bg-[#1a1a1a] rounded-lg h-80 animate-pulse" />
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-8">
              {paginatedAnime.map((anime) => {
                const displayTitle = anime.title_english || anime.title;
                
                return (
                  <Link 
                    key={anime.mal_id} 
                    href={`/anime/${anime.mal_id}`}
                    className="group"
                  >
                    <div className="bg-[#1a1a1a] rounded-lg overflow-hidden border border-[#262626] hover:border-[#10b981]/50 transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-[#10b981]/20">
                      {/* Type Badge on Image */}
                      <div className="relative aspect-[3/4] overflow-hidden">
                        <Image
                          src={anime.images.jpg.large_image_url}
                          alt={displayTitle}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-300"
                          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                        />
                        {anime.type && (
                          <div className="absolute top-2 left-2 bg-black/80 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold text-white">
                            {anime.type}
                          </div>
                        )}
                      </div>

                      {/* Anime Info */}
                      <div className="p-3 space-y-2">
                        <h3 className="text-white font-semibold text-sm line-clamp-2 min-h-[2.5rem]">
                          {displayTitle}
                        </h3>

                        <div className="flex items-center justify-between gap-2">
                          {anime.episodes && (
                            <span className="flex items-center gap-1 text-xs text-gray-400">
                              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                              </svg>
                              {anime.episodes}
                            </span>
                          )}
                          {anime.score && (
                            <span className="flex items-center gap-1 text-xs font-bold text-[#10b981]">
                              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                              {anime.score}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center gap-2 mt-8">
              <button
                onClick={() => handlePageChange(1)}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-[#1a1a1a] border border-[#262626] rounded-lg text-gray-400 hover:text-white hover:border-[#10b981] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                First
              </button>
              
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-[#1a1a1a] border border-[#262626] rounded-lg text-gray-400 hover:text-white hover:border-[#10b981] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                Previous
              </button>

              <div className="flex items-center gap-2">
                {[...Array(Math.min(5, totalPages))].map((_, i) => {
                  const page = i + 1;
                  return (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`px-4 py-2 rounded-lg transition-all ${
                        currentPage === page
                          ? 'bg-[#10b981] text-white font-bold'
                          : 'bg-[#1a1a1a] border border-[#262626] text-gray-400 hover:text-white hover:border-[#10b981]'
                      }`}
                    >
                      {page}
                    </button>
                  );
                })}
              </div>

              <span className="px-4 py-2 text-gray-400">
                Page {currentPage} of {totalPages}
              </span>

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-[#1a1a1a] border border-[#262626] rounded-lg text-gray-400 hover:text-white hover:border-[#10b981] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                Next
              </button>

              <button
                onClick={() => handlePageChange(totalPages)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-[#1a1a1a] border border-[#262626] rounded-lg text-gray-400 hover:text-white hover:border-[#10b981] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                Last
              </button>
            </div>
          </>
        )}

        {/* Character Search Section */}
        <div className="mt-16 pt-16 border-t border-[#262626]">
          <h2 className="text-2xl md:text-3xl font-bold text-[#10b981] mb-6 uppercase tracking-wide">
            Character Search
          </h2>
          <div className="relative">
            <input
              type="text"
              placeholder="Search for anime characters..."
              className="w-full bg-[#1a1a1a] border border-[#262626] rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-[#10b981] focus:outline-none transition-colors"
            />
            <svg 
              className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Sidebar - Top Movies */}
      <div className="lg:sticky lg:top-24 h-fit">
        <div className="bg-[#0f0f0f] border border-[#1a1a1a] rounded-lg p-6 shadow-xl">
          <h2 className="text-xl font-bold text-white mb-6 uppercase tracking-wider">
            TOP MOVIES
          </h2>
          
          {moviesLoading ? (
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex gap-3">
                  <div className="w-20 h-28 bg-[#1a1a1a] rounded animate-pulse" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-[#1a1a1a] rounded animate-pulse" />
                    <div className="h-3 bg-[#1a1a1a] rounded w-2/3 animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          ) : topMovies.length > 0 ? (
            <div className="space-y-4">
              {topMovies.map((movie) => {
                const displayTitle = movie.title_english || movie.title;
                return (
                  <Link 
                    key={movie.mal_id}
                    href={`/anime/${movie.mal_id}`}
                    className="flex gap-3 group hover:bg-[#1a1a1a]/50 p-2 -mx-2 rounded-lg transition-all duration-200"
                  >
                    <div className="relative w-20 h-28 flex-shrink-0 rounded-lg overflow-hidden border border-[#262626] group-hover:border-[#10b981]/50 transition-colors">
                      <Image
                        src={movie.images.jpg.large_image_url}
                        alt={displayTitle}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                        sizes="80px"
                      />
                    </div>
                    <div className="flex-1 min-w-0 flex flex-col justify-center">
                      <h3 className="text-sm font-semibold text-white line-clamp-2 mb-2 group-hover:text-[#10b981] transition-colors leading-tight">
                        {displayTitle}
                      </h3>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-xs">
                          {movie.episodes && (
                            <span className="inline-flex items-center px-2 py-0.5 bg-[#F59E0B]/20 text-[#F59E0B] rounded font-medium">
                              EP {movie.episodes}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          {movie.score && (
                            <span className="flex items-center gap-1 text-xs font-bold text-[#10b981]">
                              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                              {movie.score}
                            </span>
                          )}
                          {movie.type && (
                            <span className="text-xs text-gray-500">
                              {movie.type}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500 text-sm">No movies available</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
