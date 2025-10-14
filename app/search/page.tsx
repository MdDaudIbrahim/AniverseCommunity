'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import AnimeCard from '@/components/anime/AnimeCard';
import { Anime } from '@/lib/types/anime';
import { FiSearch, FiLoader, FiFilter, FiX } from 'react-icons/fi';
import AdBanner from '@/components/ads/AdBanner';

function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  
  const [anime, setAnime] = useState<Anime[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [totalResults, setTotalResults] = useState(0);
  
  // Filter states
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    type: '',
    status: '',
    rating: '',
    order_by: 'score',
    sort: 'desc'
  });

  useEffect(() => {
    if (query) {
      searchAnime(1, true);
    }
  }, [query, filters]);

  const searchAnime = async (pageNum: number, reset: boolean = false) => {
    try {
      setLoading(true);
      setError(null);

      // Build query parameters
      const params = new URLSearchParams({
        q: query,
        page: pageNum.toString(),
        limit: '24',
        order_by: filters.order_by,
        sort: filters.sort,
      });

      if (filters.type) params.append('type', filters.type);
      if (filters.status) params.append('status', filters.status);
      if (filters.rating) params.append('rating', filters.rating);

      const response = await fetch(`https://api.jikan.moe/v4/anime?${params.toString()}`);
      
      if (!response.ok) {
        throw new Error('Failed to search anime');
      }

      const data = await response.json();
      
      if (reset) {
        setAnime(data.data);
      } else {
        setAnime(prev => [...prev, ...data.data]);
      }
      
      setTotalResults(data.pagination?.items?.total || data.data.length);
      setHasMore(data.pagination?.has_next_page || false);
      setPage(pageNum);
    } catch (err: any) {
      console.error('Search error:', err);
      setError(err.message || 'Failed to search anime');
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => {
    if (!loading && hasMore) {
      searchAnime(page + 1, false);
    }
  };

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      type: '',
      status: '',
      rating: '',
      order_by: 'score',
      sort: 'desc'
    });
  };

  if (!query) {
    return (
      <div className="min-h-screen container mx-auto px-4 py-16">
        <div className="text-center">
          <FiSearch className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h1 className="text-3xl font-bold mb-4">Search for Anime</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Use the search bar above to find your favorite anime
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Search Results for &quot;{query}&quot;
          </h1>
          {totalResults > 0 && (
            <p className="text-gray-600 dark:text-gray-400">
              Found {totalResults} result{totalResults !== 1 ? 's' : ''}
            </p>
          )}
        </div>

        {/* Ad Banner */}
        <AdBanner slot="search-top" format="horizontal" className="mb-8" />

        {/* Filters */}
        <div className="mb-6">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
          >
            <FiFilter />
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </button>

          {showFilters && (
            <div className="mt-4 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">Filters</h3>
                <button
                  onClick={clearFilters}
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary flex items-center gap-1"
                >
                  <FiX size={16} />
                  Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Type Filter */}
                <div>
                  <label className="block text-sm font-semibold mb-2">Type</label>
                  <select
                    value={filters.type}
                    onChange={(e) => handleFilterChange('type', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700"
                  >
                    <option value="">All Types</option>
                    <option value="tv">TV</option>
                    <option value="movie">Movie</option>
                    <option value="ova">OVA</option>
                    <option value="special">Special</option>
                    <option value="ona">ONA</option>
                    <option value="music">Music</option>
                  </select>
                </div>

                {/* Status Filter */}
                <div>
                  <label className="block text-sm font-semibold mb-2">Status</label>
                  <select
                    value={filters.status}
                    onChange={(e) => handleFilterChange('status', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700"
                  >
                    <option value="">All Status</option>
                    <option value="airing">Airing</option>
                    <option value="complete">Completed</option>
                    <option value="upcoming">Upcoming</option>
                  </select>
                </div>

                {/* Rating Filter */}
                <div>
                  <label className="block text-sm font-semibold mb-2">Rating</label>
                  <select
                    value={filters.rating}
                    onChange={(e) => handleFilterChange('rating', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700"
                  >
                    <option value="">All Ratings</option>
                    <option value="g">G - All Ages</option>
                    <option value="pg">PG - Children</option>
                    <option value="pg13">PG-13 - Teens 13+</option>
                    <option value="r17">R - 17+</option>
                    <option value="r">R+ - Mild Nudity</option>
                    <option value="rx">Rx - Hentai</option>
                  </select>
                </div>

                {/* Sort Filter */}
                <div>
                  <label className="block text-sm font-semibold mb-2">Sort By</label>
                  <select
                    value={filters.order_by}
                    onChange={(e) => handleFilterChange('order_by', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700"
                  >
                    <option value="score">Score</option>
                    <option value="title">Title</option>
                    <option value="start_date">Start Date</option>
                    <option value="end_date">End Date</option>
                    <option value="episodes">Episodes</option>
                    <option value="popularity">Popularity</option>
                    <option value="members">Members</option>
                    <option value="favorites">Favorites</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Loading State */}
        {loading && anime.length === 0 && (
          <div className="flex items-center justify-center py-20">
            <FiLoader className="w-12 h-12 text-primary animate-spin" />
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-20">
            <p className="text-red-500 dark:text-red-400 mb-4">{error}</p>
            <button
              onClick={() => searchAnime(1, true)}
              className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
            >
              Try Again
            </button>
          </div>
        )}

        {/* No Results */}
        {!loading && !error && anime.length === 0 && (
          <div className="text-center py-20">
            <FiSearch className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">No Results Found</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              We couldn&apos;t find any anime matching &quot;{query}&quot;
            </p>
            <p className="text-sm text-gray-500">
              Try adjusting your search terms or filters
            </p>
          </div>
        )}

        {/* Results Grid */}
        {anime.length > 0 && (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
              {anime.map((item) => (
                <AnimeCard key={item.mal_id} anime={item} />
              ))}
            </div>

            {/* Load More Button */}
            {hasMore && (
              <div className="mt-12 text-center">
                <button
                  onClick={loadMore}
                  disabled={loading}
                  className="px-8 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 mx-auto"
                >
                  {loading ? (
                    <>
                      <FiLoader className="animate-spin" />
                      Loading...
                    </>
                  ) : (
                    'Load More'
                  )}
                </button>
              </div>
            )}

            {/* Bottom Ad */}
            <div className="mt-12">
              <AdBanner slot="search-bottom" format="horizontal" />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen container mx-auto px-4 py-16 flex items-center justify-center">
        <div className="text-center">
          <FiLoader className="w-12 h-12 text-primary animate-spin mx-auto mb-4" />
          <p className="text-xl text-gray-600 dark:text-gray-400">Loading search...</p>
        </div>
      </div>
    }>
      <SearchContent />
    </Suspense>
  );
}
