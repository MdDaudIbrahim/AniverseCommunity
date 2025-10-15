'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { FiStar, FiCalendar, FiTv, FiClock, FiLoader, FiHeart, FiBookmark, FiShare2, FiPlay } from 'react-icons/fi';
import AnimeCard from '@/components/anime/AnimeCard';
import { Anime } from '@/lib/types/anime';

type TabType = 'overview' | 'characters' | 'episodes' | 'reviews' | 'related' | 'stats';

export default function AnimePage() {
  const params = useParams();
  const animeId = parseInt(params.id as string);
  
  const [anime, setAnime] = useState<Anime | null>(null);
  const [characters, setCharacters] = useState<any[]>([]);
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [episodes, setEpisodes] = useState<any[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>('overview');

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

        // Fetch all additional data
        try {
          const [charResponse, recResponse, statsResponse] = await Promise.all([
            fetch(`https://api.jikan.moe/v4/anime/${animeId}/characters`),
            fetch(`https://api.jikan.moe/v4/anime/${animeId}/recommendations`),
            fetch(`https://api.jikan.moe/v4/anime/${animeId}/statistics`),
          ]);

          if (charResponse.ok) {
            const charData = await charResponse.json();
            setCharacters(charData.data);
          }

          if (recResponse.ok) {
            const recData = await recResponse.json();
            setRecommendations(recData.data);
          }

          if (statsResponse.ok) {
            const statsData = await statsResponse.json();
            setStats(statsData.data);
          }

          // Fetch episodes and reviews with delay
          await new Promise(resolve => setTimeout(resolve, 350));
          
          const [episodesResponse, reviewsResponse] = await Promise.all([
            fetch(`https://api.jikan.moe/v4/anime/${animeId}/episodes`),
            fetch(`https://api.jikan.moe/v4/anime/${animeId}/reviews`),
          ]);

          if (episodesResponse.ok) {
            const episodesData = await episodesResponse.json();
            setEpisodes(episodesData.data);
          }

          if (reviewsResponse.ok) {
            const reviewsData = await reviewsResponse.json();
            setReviews(reviewsData.data);
          }
        } catch (err) {
          console.error('Error fetching additional data:', err);
          // Continue without additional data
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
  const bannerUrl = imageUrl;

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'characters', label: 'Characters' },
    { id: 'episodes', label: 'Episodes' },
    { id: 'reviews', label: 'Reviews' },
    { id: 'related', label: 'Related' },
    { id: 'stats', label: 'Statistics' },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Hero Banner with Overlay */}
      <div className="relative h-[400px] md:h-[500px] w-full overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={bannerUrl}
            alt={title}
            fill
            className="object-cover"
            priority
            quality={85}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-transparent to-[#0a0a0a]/50"></div>
        </div>

        {/* Content */}
        <div className="absolute inset-0 container mx-auto px-4 flex items-end pb-6 md:pb-12">
          <div className="flex gap-4 md:gap-8 items-end w-full">
            {/* Poster */}
            <div className="hidden md:block flex-shrink-0">
              <div className="relative w-[220px] h-[310px] rounded-lg overflow-hidden border-2 border-[#10b981] shadow-2xl shadow-[#10b981]/30">
                <Image
                  src={imageUrl}
                  alt={title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            {/* Info */}
            <div className="flex-1 text-white space-y-3 md:space-y-4">
              <div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-1 md:mb-2 line-clamp-2">{title}</h1>
                {anime.title_japanese && (
                  <p className="text-sm md:text-lg text-gray-300 truncate">{anime.title_japanese}</p>
                )}
              </div>

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-2 md:gap-4 text-xs md:text-sm">
                {anime.score && (
                  <div className="flex items-center gap-1.5 bg-[#10b981] px-2 md:px-3 py-1 md:py-1.5 rounded-lg">
                    <FiStar className="text-white" size={14} />
                    <span className="font-bold text-white">{anime.score.toFixed(1)}</span>
                  </div>
                )}
                {anime.year && (
                  <span className="bg-[#262626] px-2 md:px-3 py-1 md:py-1.5 rounded-lg">{anime.year}</span>
                )}
                {anime.type && (
                  <span className="bg-[#262626] px-2 md:px-3 py-1 md:py-1.5 rounded-lg">{anime.type}</span>
                )}
                {anime.episodes && (
                  <span className="bg-[#262626] px-2 md:px-3 py-1 md:py-1.5 rounded-lg">{anime.episodes} Ep</span>
                )}
                {anime.status && (
                  <span className="hidden sm:inline bg-[#262626] px-2 md:px-3 py-1 md:py-1.5 rounded-lg">{anime.status}</span>
                )}
              </div>

              {/* Genres */}
              <div className="flex flex-wrap gap-1.5 md:gap-2">
                {anime.genres.slice(0, 5).map((genre) => (
                  <Link
                    key={genre.mal_id}
                    href="/genres"
                    className="text-xs px-2 md:px-3 py-0.5 md:py-1 border border-[#10b981] text-[#10b981] rounded-full hover:bg-[#10b981] hover:text-white transition-all"
                  >
                    {genre.name}
                  </Link>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-2 md:gap-3 pt-2">
                <button className="flex items-center gap-2 bg-[#10b981] text-white px-4 md:px-6 py-2 md:py-2.5 rounded-lg hover:bg-[#059669] transition-all font-semibold text-sm md:text-base">
                  <FiPlay size={16} />
                  <span className="hidden sm:inline">Watch Now</span>
                  <span className="sm:hidden">Watch</span>
                </button>
                <button className="flex items-center gap-2 bg-[#262626] text-white px-3 md:px-4 py-2 md:py-2.5 rounded-lg hover:bg-[#333] transition-all">
                  <FiHeart size={16} />
                </button>
                <button className="flex items-center gap-2 bg-[#262626] text-white px-3 md:px-4 py-2 md:py-2.5 rounded-lg hover:bg-[#333] transition-all">
                  <FiBookmark size={16} />
                </button>
                <button className="hidden sm:flex items-center gap-2 bg-[#262626] text-white px-3 md:px-4 py-2 md:py-2.5 rounded-lg hover:bg-[#333] transition-all">
                  <FiShare2 size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="sticky top-0 z-40 bg-[#0a0a0a]/95 backdrop-blur-lg border-b border-[#262626]">
        <div className="container mx-auto px-4">
          <div className="flex gap-0.5 md:gap-1 overflow-x-auto scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`px-3 md:px-6 py-3 md:py-4 font-medium transition-all whitespace-nowrap text-sm md:text-base ${
                  activeTab === tab.id
                    ? 'text-[#10b981] border-b-2 border-[#10b981]'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <>
                {/* Synopsis */}
                <section className="bg-[#1a1a1a] rounded-lg p-6 border border-[#262626]">
                  <h2 className="text-2xl font-bold mb-4 text-white">Synopsis</h2>
                  <p className="text-gray-300 leading-relaxed">
                    {anime.synopsis || 'No synopsis available.'}
                  </p>
                </section>

                {/* Trailer */}
                {anime.trailer?.embed_url && (
                  <section className="bg-[#1a1a1a] rounded-lg p-6 border border-[#262626]">
                    <h2 className="text-2xl font-bold mb-4 text-white">Trailer</h2>
                    <div className="relative aspect-video rounded-lg overflow-hidden">
                      <iframe
                        src={anime.trailer.embed_url}
                        title={`${title} Trailer`}
                        className="w-full h-full"
                        allowFullScreen
                      />
                    </div>
                  </section>
                )}
                {/* Statistics */}
                <section className="bg-[#1a1a1a] rounded-lg p-6 border border-[#262626]">
                  <h2 className="text-2xl font-bold mb-6 text-white">Statistics</h2>
                  {stats ? (
                    <div className="space-y-6">
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <StatCard label="Watching" value={stats.watching?.toLocaleString() || '0'} color="text-blue-400" />
                        <StatCard label="Completed" value={stats.completed?.toLocaleString() || '0'} color="text-green-400" />
                        <StatCard label="On Hold" value={stats.on_hold?.toLocaleString() || '0'} color="text-yellow-400" />
                        <StatCard label="Dropped" value={stats.dropped?.toLocaleString() || '0'} color="text-red-400" />
                        <StatCard label="Plan to Watch" value={stats.plan_to_watch?.toLocaleString() || '0'} color="text-purple-400" />
                        <StatCard label="Total" value={stats.total?.toLocaleString() || '0'} color="text-[#10b981]" />
                      </div>

                      {/* Score Distribution */}
                      {stats.scores && stats.scores.length > 0 && (
                        <div className="mt-8">
                          <h3 className="text-xl font-bold mb-4 text-white">Score Distribution</h3>
                          <div className="space-y-2">
                            {stats.scores.slice().reverse().map((score: any) => (
                              <div key={score.score} className="flex items-center gap-3">
                                <span className="text-white w-8">{score.score}</span>
                                <div className="flex-1 bg-[#262626] rounded-full h-6 overflow-hidden">
                                  <div
                                    className="bg-[#10b981] h-full rounded-full flex items-center justify-end pr-2"
                                    style={{ width: `${(score.votes / stats.total) * 100}%` }}
                                  >
                                    <span className="text-xs text-white font-medium">
                                      {score.votes.toLocaleString()}
                                    </span>
                                  </div>
                                </div>
                                <span className="text-gray-400 w-16 text-sm">
                                  {((score.votes / stats.total) * 100).toFixed(1)}%
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <p className="text-gray-400 text-center py-8">No statistics available</p>
                  )}
                </section>

                {/* Related/Recommendations */}
                <section className="bg-[#1a1a1a] rounded-lg p-6 border border-[#262626]">
                  <h2 className="text-2xl font-bold mb-6 text-white">Related Anime</h2>
                  {recommendations.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                      {recommendations.slice(0, 12).map((rec: any) => {
                        const recAnime = rec.entry;
                        if (!recAnime || recAnime.mal_id === animeId) return null;
                        
                        return (
                          <Link
                            key={recAnime.mal_id}
                            href={`/anime/${recAnime.mal_id}`}
                            className="group"
                          >
                            <div className="relative aspect-[2/3] rounded-lg overflow-hidden border border-[#262626] group-hover:border-[#10b981] transition-all">
                              <Image
                                src={recAnime.images.webp.image_url}
                                alt={recAnime.title}
                                fill
                                className="object-cover group-hover:scale-110 transition-transform"
                              />
                            </div>
                            <h3 className="mt-2 text-sm text-white font-medium line-clamp-2 group-hover:text-[#10b981] transition-colors">
                              {recAnime.title}
                            </h3>
                          </Link>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="text-gray-400 text-center py-8">No recommendations available</p>
                  )}
                </section>
              </>
            )}

            {/* Characters Tab */}
            {activeTab === 'characters' && (
              <section className="bg-[#1a1a1a] rounded-lg p-6 border border-[#262626]">
                <h2 className="text-2xl font-bold mb-6 text-white">Characters & Voice Actors</h2>
                {characters.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {characters.slice(0, 20).map((char: any) => (
                      <div key={char.character.mal_id} className="flex gap-4 bg-[#262626] rounded-lg p-4 hover:bg-[#333] transition-all">
                        <div className="relative w-16 h-20 rounded overflow-hidden flex-shrink-0">
                          <Image
                            src={char.character.images.webp.image_url}
                            alt={char.character.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-white truncate">{char.character.name}</h3>
                          <p className="text-sm text-[#10b981]">{char.role}</p>
                          {char.voice_actors?.[0] && (
                            <p className="text-xs text-gray-400 truncate mt-1">
                              {char.voice_actors[0].person.name}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-400 text-center py-8">No character data available</p>
                )}
              </section>
            )}

            {/* Episodes Tab */}
            {activeTab === 'episodes' && (
              <section className="bg-[#1a1a1a] rounded-lg p-6 border border-[#262626]">
                <h2 className="text-2xl font-bold mb-6 text-white">Episodes</h2>
                {episodes.length > 0 ? (
                  <div className="space-y-3">
                    {episodes.slice(0, 25).map((episode: any) => (
                      <div key={episode.mal_id} className="flex gap-4 bg-[#262626] rounded-lg p-4 hover:bg-[#333] transition-all cursor-pointer">
                        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#10b981] flex items-center justify-center text-white font-bold">
                          {episode.mal_id}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-white truncate">{episode.title}</h3>
                          {episode.aired && (
                            <p className="text-sm text-gray-400">{new Date(episode.aired).toLocaleDateString()}</p>
                          )}
                        </div>
                      </div>
                    ))}
                    {episodes.length > 25 && (
                      <p className="text-center text-gray-400 py-4">
                        Showing 25 of {episodes.length} episodes
                      </p>
                    )}
                  </div>
                ) : (
                  <p className="text-gray-400 text-center py-8">
                    {anime.episodes ? `This anime has ${anime.episodes} episodes` : 'No episode data available'}
                  </p>
                )}
              </section>
            )}

            {/* Reviews Tab */}
            {activeTab === 'reviews' && (
              <section className="bg-[#1a1a1a] rounded-lg p-6 border border-[#262626]">
                <h2 className="text-2xl font-bold mb-6 text-white">Reviews</h2>
                {reviews.length > 0 ? (
                  <div className="space-y-6">
                    {reviews.slice(0, 10).map((review: any) => (
                      <div key={review.mal_id} className="bg-[#262626] rounded-lg p-6 space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-[#10b981] flex items-center justify-center text-white font-bold">
                              {review.user.username[0].toUpperCase()}
                            </div>
                            <div>
                              <p className="font-semibold text-white">{review.user.username}</p>
                              <p className="text-xs text-gray-400">
                                {new Date(review.date).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <FiStar className="text-yellow-400" />
                            <span className="text-white font-bold">{review.score}</span>
                          </div>
                        </div>
                        <p className="text-gray-300 line-clamp-4">{review.review}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-400">
                          <span>👍 {review.reactions.overall}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-400 text-center py-8">No reviews available</p>
                )}
              </section>
            )}

            {/* Related Tab */}
            {activeTab === 'related' && (
              <section className="bg-[#1a1a1a] rounded-lg p-6 border border-[#262626]">
                <h2 className="text-2xl font-bold mb-6 text-white">Recommendations</h2>
                {recommendations.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {recommendations.slice(0, 12).map((rec: any) => {
                      const recAnime = rec.entry;
                      if (!recAnime || recAnime.mal_id === animeId) return null;
                      
                      return (
                        <Link
                          key={recAnime.mal_id}
                          href={`/anime/${recAnime.mal_id}`}
                          className="group"
                        >
                          <div className="relative aspect-[2/3] rounded-lg overflow-hidden border border-[#262626] group-hover:border-[#10b981] transition-all">
                            <Image
                              src={recAnime.images.webp.image_url}
                              alt={recAnime.title}
                              fill
                              className="object-cover group-hover:scale-110 transition-transform"
                            />
                          </div>
                          <h3 className="mt-2 text-sm text-white font-medium line-clamp-2 group-hover:text-[#10b981] transition-colors">
                            {recAnime.title}
                          </h3>
                        </Link>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-gray-400 text-center py-8">No recommendations available</p>
                )}
              </section>
            )}

            {/* Statistics Tab */}
            {activeTab === 'stats' && (
              <section className="bg-[#1a1a1a] rounded-lg p-6 border border-[#262626]">
                <h2 className="text-2xl font-bold mb-6 text-white">Statistics</h2>
                {stats ? (
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <StatCard label="Watching" value={stats.watching?.toLocaleString() || '0'} color="text-blue-400" />
                      <StatCard label="Completed" value={stats.completed?.toLocaleString() || '0'} color="text-green-400" />
                      <StatCard label="On Hold" value={stats.on_hold?.toLocaleString() || '0'} color="text-yellow-400" />
                      <StatCard label="Dropped" value={stats.dropped?.toLocaleString() || '0'} color="text-red-400" />
                      <StatCard label="Plan to Watch" value={stats.plan_to_watch?.toLocaleString() || '0'} color="text-purple-400" />
                      <StatCard label="Total" value={stats.total?.toLocaleString() || '0'} color="text-[#10b981]" />
                    </div>

                    {/* Score Distribution */}
                    {stats.scores && stats.scores.length > 0 && (
                      <div className="mt-8">
                        <h3 className="text-xl font-bold mb-4 text-white">Score Distribution</h3>
                        <div className="space-y-2">
                          {stats.scores.slice().reverse().map((score: any) => (
                            <div key={score.score} className="flex items-center gap-3">
                              <span className="text-white w-8">{score.score}</span>
                              <div className="flex-1 bg-[#262626] rounded-full h-6 overflow-hidden">
                                <div
                                  className="bg-[#10b981] h-full rounded-full flex items-center justify-end pr-2"
                                  style={{ width: `${(score.votes / stats.total) * 100}%` }}
                                >
                                  <span className="text-xs text-white font-medium">
                                    {score.votes.toLocaleString()}
                                  </span>
                                </div>
                              </div>
                              <span className="text-gray-400 w-16 text-sm">
                                {((score.votes / stats.total) * 100).toFixed(1)}%
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <p className="text-gray-400 text-center py-8">No statistics available</p>
                )}
              </section>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* Information Card */}
            <div className="bg-[#1a1a1a] rounded-lg p-6 border border-[#262626] sticky top-24">
              <h3 className="text-xl font-bold mb-4 text-white">Information</h3>
              <div className="space-y-3">
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

              {/* Studios */}
              {anime.studios.length > 0 && (
                <div className="mt-6 pt-6 border-t border-[#262626]">
                  <h4 className="text-sm font-bold mb-2 text-white">Studios</h4>
                  <div className="flex flex-wrap gap-2">
                    {anime.studios.map((studio) => (
                      <span
                        key={studio.mal_id}
                        className="text-xs px-3 py-1 bg-[#262626] text-gray-300 rounded-full"
                      >
                        {studio.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Producers */}
              {anime.producers.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-sm font-bold mb-2 text-white">Producers</h4>
                  <div className="flex flex-wrap gap-2">
                    {anime.producers.slice(0, 3).map((producer) => (
                      <span
                        key={producer.mal_id}
                        className="text-xs px-3 py-1 bg-[#262626] text-gray-300 rounded-full"
                      >
                        {producer.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="bg-[#262626] rounded-lg p-4 text-center">
      <p className="text-sm text-gray-400 mb-1">{label}</p>
      <p className={`text-2xl font-bold ${color}`}>{value}</p>
    </div>
  );
}

function InfoItem({ label, value }: { label: string; value: any }) {
  return (
    <div className="flex justify-between items-center py-2 border-b border-[#262626]">
      <span className="text-sm text-gray-400">{label}</span>
      <span className="font-semibold text-white text-sm">{value}</span>
    </div>
  );
}
