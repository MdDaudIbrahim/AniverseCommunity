import Link from 'next/link';
import Image from 'next/image';
import { Anime } from '@/lib/types/anime';
import { FiStar } from 'react-icons/fi';

interface AnimeCardProps {
  anime: Anime;
}

export default function AnimeCard({ anime }: AnimeCardProps) {
  // Prefer JPG as it's more reliable on MyAnimeList CDN
  const imageUrl = anime.images.jpg.image_url || anime.images.jpg.large_image_url || anime.images.webp.image_url;
  const title = anime.title_english || anime.title;

  return (
    <Link 
      href={`/anime/${anime.mal_id}`}
      className="group relative block overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
    >
      <div className="relative aspect-[2/3] bg-gray-200 dark:bg-gray-700">
        <Image
          src={imageUrl}
          alt={title}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 16vw"
          className="object-cover"
          loading="lazy"
        />
        
        {/* Score Badge */}
        {anime.score && (
          <div className="absolute top-2 right-2 bg-black/80 text-white px-2 py-1 rounded-full text-sm font-bold flex items-center gap-1">
            <FiStar className="text-yellow-400" size={14} />
            {anime.score.toFixed(1)}
          </div>
        )}

        {/* Airing Badge */}
        {anime.airing && (
          <div className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold">
            AIRING
          </div>
        )}

        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
          <div className="text-white text-xs space-y-1">
            <p className="font-semibold">{anime.type}</p>
            {anime.episodes && <p>{anime.episodes} episodes</p>}
            {anime.year && <p>{anime.year}</p>}
          </div>
        </div>
      </div>

      {/* Title */}
      <div className="p-3 bg-white dark:bg-gray-800">
        <h3 className="font-semibold text-sm line-clamp-2 group-hover:text-primary transition-colors">
          {title}
        </h3>
        {anime.genres && anime.genres.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {anime.genres.slice(0, 2).map((genre) => (
              <span
                key={genre.mal_id}
                className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded"
              >
                {genre.name}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
