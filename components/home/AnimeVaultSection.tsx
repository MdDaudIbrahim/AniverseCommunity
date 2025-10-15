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

interface AnimeVaultSectionProps {
  title: string;
  endpoint: string;
  params?: Record<string, any>;
}

export default function AnimeVaultSection({ title, endpoint, params = {} }: AnimeVaultSectionProps) {
  const [anime, setAnime] = useState<Anime[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAnime() {
      try {
        const queryParams = new URLSearchParams({
          sfw: 'true',
          ...params
        });
        
        const url = `https://api.jikan.moe/v4/${endpoint}?${queryParams}`;
        const response = await fetch(url);
        
        if (response.ok) {
          const data = await response.json();
          if (data.data) {
            setAnime(data.data);
          }
        }
      } catch (error) {
        console.error(`Error fetching ${title}:`, error);
      } finally {
        setLoading(false);
      }
    }

    fetchAnime();
  }, [endpoint, title, params]);

  if (loading) {
    return (
      <div>
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-300">
            <span className="text-[#10b981]">&lt;</span>
            {title}
            <span className="text-[#10b981]">/&gt;</span>
          </h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="bg-[#1a1a1a] rounded-lg h-80 animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Code-style Header */}
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-300 font-mono">
          <span className="text-[#10b981]">&lt;</span>
          {title}
          <span className="text-[#10b981]">/&gt;</span>
        </h2>
      </div>

      {/* Anime Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {anime.map((item) => {
          const displayTitle = item.title_english || item.title;
          
          return (
            <Link 
              key={item.mal_id} 
              href={`/anime/${item.mal_id}`}
              className="group"
            >
              <div className="bg-[#1a1a1a] rounded-lg overflow-hidden border border-[#262626] hover:border-[#10b981]/50 transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-[#10b981]/20">
                {/* Anime Image */}
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image
                    src={item.images.jpg.large_image_url}
                    alt={displayTitle}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                  />
                </div>

                {/* Anime Info */}
                <div className="p-3 space-y-2">
                  {/* Title */}
                  <h3 className="text-white font-semibold text-sm line-clamp-2 min-h-[2.5rem]">
                    {displayTitle}
                  </h3>

                  {/* Badges */}
                  <div className="flex items-center gap-2 flex-wrap">
                    {/* Episodes Badge */}
                    {item.episodes && (
                      <span className="inline-flex items-center gap-1 bg-[#F59E0B] text-black text-xs font-bold px-2 py-1 rounded">
                        EP-{item.episodes}
                      </span>
                    )}

                    {/* Score Badge */}
                    {item.score && (
                      <span className="inline-flex items-center gap-1 bg-[#10b981] text-black text-xs font-bold px-2 py-1 rounded">
                        ★{item.score}
                      </span>
                    )}

                    {/* Type Badge */}
                    {item.type && (
                      <span className="inline-flex items-center bg-[#374151] text-gray-300 text-xs font-medium px-2 py-1 rounded">
                        {item.type}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Empty State */}
      {!loading && anime.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No anime found</p>
        </div>
      )}
    </div>
  );
}
