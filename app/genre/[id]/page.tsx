'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import AnimeCard from '@/components/anime/AnimeCard';
import LoadingGrid from '@/components/ui/LoadingGrid';
import { FiArrowLeft } from 'react-icons/fi';

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

const genreNames: { [key: string]: string } = {
  '1': 'Action',
  '2': 'Adventure',
  '4': 'Comedy',
  '8': 'Drama',
  '10': 'Fantasy',
  '14': 'Horror',
  '22': 'Romance',
  '24': 'Sci-Fi',
  '36': 'Slice of Life',
  '37': 'Supernatural',
  '30': 'Sports',
  '7': 'Mystery',
};

export default function GenrePage() {
  const params = useParams();
  const genreId = params.id as string;
  const genreName = genreNames[genreId] || 'Unknown Genre';
  
  const [anime, setAnime] = useState<Anime[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function fetchGenreAnime() {
      try {
        setLoading(true);
        
        // Add delay for rate limiting
        await new Promise(resolve => setTimeout(resolve, 350));
        
        const response = await fetch(
          `https://api.jikan.moe/v4/anime?genres=${genreId}&page=${page}&limit=24&order_by=score&sort=desc&sfw=true`,
          {
            headers: {
              'Accept': 'application/json',
            }
          }
        );
        
        if (response.ok) {
          const data = await response.json();
          if (data.data && data.data.length > 0) {
            setAnime(data.data);
            setError(null);
          } else {
            setError('No anime found for this genre');
          }
        } else {
          setError('Failed to load anime. Please try again later.');
        }
      } catch (err) {
        console.error('Error fetching genre anime:', err);
        setError('Failed to load anime. Please check your connection.');
      } finally {
        setLoading(false);
      }
    }

    fetchGenreAnime();
  }, [genreId, page]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/genres"
            className="inline-flex items-center gap-2 text-primary hover:text-primary-dark mb-4 transition-colors"
          >
            <FiArrowLeft />
            Back to All Genres
          </Link>
          
          <h1 className="text-4xl font-bold mb-2">{genreName} Anime</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Discover the best {genreName.toLowerCase()} anime, sorted by rating
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
            <p className="text-yellow-800 dark:text-yellow-200">
              {error}
            </p>
          </div>
        )}

        {/* Anime Grid */}
        {loading ? (
          <LoadingGrid count={24} />
        ) : anime.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg">
            <p className="text-gray-500 dark:text-gray-400">No anime found for this genre</p>
            <Link
              href="/genres"
              className="mt-4 inline-block px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
            >
              Browse Other Genres
            </Link>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {anime.map((item) => (
                <AnimeCard key={item.mal_id} anime={item as any} />
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-8 flex justify-center gap-4">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-6 py-2 bg-white dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Previous
              </button>
              <span className="px-6 py-2 bg-primary text-white rounded-lg">
                Page {page}
              </span>
              <button
                onClick={() => setPage(p => p + 1)}
                disabled={anime.length < 24}
                className="px-6 py-2 bg-white dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
