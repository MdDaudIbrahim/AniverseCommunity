'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { FiStar, FiCalendar, FiTv, FiClock, FiLoader } from 'react-icons/fi';
import AdBanner from '@/components/ads/AdBanner';
import AdSidebar from '@/components/ads/AdSidebar';
import AnimeCard from '@/components/anime/AnimeCard';
import { Anime } from '@/lib/types/anime';

export default function AnimePage() {
  const params = useParams();
  const animeId = parseInt(params.id as string);
  
  const [anime, setAnime] = useState<Anime | null>(null);
  const [characters, setCharacters] = useState<any[]>([]);
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAnimeData() {
      try {
        setLoading(true);
        setError(null);

        // Fetch main anime data
        const animeResponse = await fetch(`https://api.jikan.moe/v4/anime/${animeId}/full`);
        
        if (!animeResponse.ok) {
          if (animeResponse.status === 404) {
            throw new Error('Anime not found');
          }
          throw new Error('Failed to fetch anime data');
        }

        const animeData = await animeResponse.json();
        setAnime(animeData.data);

        // Small delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 350));

        // Fetch characters and recommendations
        try {
          const [charResponse, recResponse] = await Promise.all([
            fetch(`https://api.jikan.moe/v4/anime/${animeId}/characters`),
            fetch(`https://api.jikan.moe/v4/anime/${animeId}/recommendations`),
          ]);

          if (charResponse.ok) {
            const charData = await charResponse.json();
            setCharacters(charData.data.slice(0, 12));
          }

          if (recResponse.ok) {
            const recData = await recResponse.json();
            setRecommendations(recData.data.slice(0, 12));
          }
        } catch (err) {
          console.error('Error fetching additional data:', err);
          // Continue without characters/recommendations
        }

      } catch (err: any) {
        console.error('Error loading anime:', err);
        setError(err.message || 'Failed to load anime');
      } finally {
        setLoading(false);
      }
    }

    if (animeId) {
      fetchAnimeData();
    }
  }, [animeId]);

  if (loading) {
    return (
      <div className="min-h-screen container mx-auto px-4 py-16 flex items-center justify-center">
        <div className="text-center">
          <FiLoader className="w-12 h-12 text-primary animate-spin mx-auto mb-4" />
          <p className="text-xl text-gray-600 dark:text-gray-400">Loading anime details...</p>
        </div>
      </div>
    );
  }

  if (error || !anime) {
    return (
      <div className="min-h-screen container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-8">
            <h1 className="text-3xl font-bold mb-4 text-red-600 dark:text-red-400">
              Unable to Load Anime
            </h1>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              {error || 'We couldn\'t load this anime.'}
            </p>
            <ul className="text-left list-disc list-inside mb-6 text-gray-600 dark:text-gray-400">
              <li>The anime might not exist</li>
              <li>There might be a network issue</li>
              <li>Try refreshing the page</li>
            </ul>
            <div className="flex gap-4 justify-center">
              <Link
                href="/"
                className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
              >
                Go Home
              </Link>
              <Link
                href="/top-anime"
                className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                Browse Top Anime
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const title = anime.title_english || anime.title;
  const imageUrl = anime.images.webp.large_image_url || anime.images.jpg.large_image_url;

    return (
      <div className="min-h-screen">
        {/* Hero Banner */}
        <div className="relative h-96 bg-gradient-to-b from-black/80 to-transparent">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover opacity-30"
            priority
          />
          <div className="absolute inset-0 container mx-auto px-4 flex items-end pb-8">
            <div className="text-white">
              <h1 className="text-5xl font-bold mb-4">{title}</h1>
              {anime.title_japanese && (
                <p className="text-xl opacity-90 mb-2">{anime.title_japanese}</p>
              )}
              <div className="flex items-center gap-6 text-sm">
                {anime.score && (
                  <div className="flex items-center gap-2">
                    <FiStar className="text-yellow-400" />
                    <span className="font-bold">{anime.score.toFixed(1)}</span>
                  </div>
                )}
                {anime.year && (
                  <div className="flex items-center gap-2">
                    <FiCalendar />
                    <span>{anime.year}</span>
                  </div>
                )}
                {anime.type && (
                  <div className="flex items-center gap-2">
                    <FiTv />
                    <span>{anime.type}</span>
                  </div>
                )}
                {anime.duration && (
                  <div className="flex items-center gap-2">
                    <FiClock />
                    <span>{anime.duration}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Ad Banner */}
        <div className="container mx-auto px-4 py-4">
          <AdBanner slot="4567890123" format="horizontal" />
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3 space-y-8">
              {/* Synopsis */}
              <section className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
                <h2 className="text-2xl font-bold mb-4">Synopsis</h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {anime.synopsis || 'No synopsis available.'}
                </p>
              </section>

              {/* Info Grid */}
              <section className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
                <h2 className="text-2xl font-bold mb-4">Information</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <InfoItem label="Type" value={anime.type} />
                  <InfoItem label="Episodes" value={anime.episodes || 'Unknown'} />
                  <InfoItem label="Status" value={anime.status} />
                  <InfoItem label="Aired" value={anime.aired.string} />
                  <InfoItem label="Season" value={anime.season ? `${anime.season} ${anime.year}` : 'N/A'} />
                  <InfoItem label="Source" value={anime.source} />
                  <InfoItem label="Rating" value={anime.rating} />
                  <InfoItem label="Score" value={anime.score ? anime.score.toFixed(2) : 'N/A'} />
                  <InfoItem label="Ranked" value={anime.rank ? `#${anime.rank}` : 'N/A'} />
                  <InfoItem label="Popularity" value={`#${anime.popularity}`} />
                  <InfoItem label="Members" value={anime.members.toLocaleString()} />
                  <InfoItem label="Favorites" value={anime.favorites.toLocaleString()} />
                </div>
              </section>

              {/* Genres */}
              {anime.genres.length > 0 && (
                <section className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
                  <h2 className="text-2xl font-bold mb-4">Genres</h2>
                  <div className="flex flex-wrap gap-2">
                    {anime.genres.map((genre) => (
                      <Link
                        key={genre.mal_id}
                        href="/genres"
                        className="px-4 py-2 bg-primary text-white rounded-full hover:bg-primary-dark transition-colors"
                      >
                        {genre.name}
                      </Link>
                    ))}
                  </div>
                </section>
              )}

              {/* Studios */}
              {anime.studios.length > 0 && (
                <section className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
                  <h2 className="text-2xl font-bold mb-4">Studios</h2>
                  <div className="flex flex-wrap gap-2">
                    {anime.studios.map((studio) => (
                      <span
                        key={studio.mal_id}
                        className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-full"
                      >
                        {studio.name}
                      </span>
                    ))}
                  </div>
                </section>
              )}

              {/* Characters */}
              {characters.length > 0 && (
                <section className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
                  <h2 className="text-2xl font-bold mb-4">Characters</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {characters.map((char: any) => (
                      <div key={char.character.mal_id} className="text-center">
                        <div className="relative aspect-square mb-2 rounded-lg overflow-hidden">
                          <Image
                            src={char.character.images.webp.image_url}
                            alt={char.character.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <p className="font-semibold text-sm">{char.character.name}</p>
                        <p className="text-xs text-gray-500">{char.role}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Recommendations */}
              {recommendations.length > 0 && (
                <section className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
                  <h2 className="text-2xl font-bold mb-4">Recommendations</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {recommendations.map((rec: any) => {
                      // The API returns rec.entry as the recommended anime object
                      const recAnime = rec.entry;
                      if (!recAnime || recAnime.mal_id === animeId) return null;
                      
                      return (
                        <AnimeCard key={recAnime.mal_id} anime={recAnime as any} />
                      );
                    })}
                  </div>
                </section>
              )}

              {/* Bottom Ad */}
              <AdBanner slot="5678901234" format="horizontal" />
            </div>

            {/* Sidebar */}
            <aside className="space-y-4">
              {/* Poster */}
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-lg">
                <div className="relative aspect-[2/3] rounded-lg overflow-hidden">
                  <Image
                    src={imageUrl}
                    alt={title}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Sidebar Ad */}
              <AdSidebar slot="6789012345" />
            </aside>
          </div>
        </div>
      </div>
    );
}

function InfoItem({ label, value }: { label: string; value: any }) {
  return (
    <div>
      <dt className="text-sm text-gray-500 dark:text-gray-400">{label}</dt>
      <dd className="font-semibold">{value}</dd>
    </div>
  );
}
