'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { FiHeart, FiArrowLeft, FiUser, FiFilm } from 'react-icons/fi';

interface CharacterAnime {
  role: string;
  anime: {
    mal_id: number;
    title: string;
    images: {
      jpg: {
        image_url: string;
      };
    };
  };
}

interface VoiceActor {
  language: string;
  person: {
    mal_id: number;
    name: string;
    images: {
      jpg: {
        image_url: string;
      };
    };
  };
}

interface CharacterDetails {
  mal_id: number;
  name: string;
  name_kanji?: string;
  nicknames: string[];
  images: {
    jpg: {
      image_url: string;
    };
    webp: {
      image_url: string;
      small_image_url: string;
    };
  };
  favorites: number;
  about: string;
}

export default function CharacterPage() {
  const params = useParams();
  const characterId = parseInt(params.id as string);

  const [character, setCharacter] = useState<CharacterDetails | null>(null);
  const [animeography, setAnimeography] = useState<CharacterAnime[]>([]);
  const [voiceActors, setVoiceActors] = useState<VoiceActor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCharacterData() {
      try {
        setLoading(true);
        setError(null);

        // Fetch character full data
        const response = await fetch(`https://api.jikan.moe/v4/characters/${characterId}/full`);
        
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Character not found');
          }
          throw new Error('Failed to fetch character data');
        }

        const data = await response.json();
        setCharacter(data.data);
        
        // Extract animeography and voice actors from full data
        if (data.data.anime) {
          setAnimeography(data.data.anime.slice(0, 12));
        }
        
        if (data.data.voices) {
          setVoiceActors(data.data.voices.slice(0, 8));
        }

      } catch (err: any) {
        console.error('Error loading character:', err);
        setError(err.message || 'Failed to load character');
      } finally {
        setLoading(false);
      }
    }

    if (characterId) {
      fetchCharacterData();
    }
  }, [characterId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#10b981] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl text-gray-400">Loading character details...</p>
        </div>
      </div>
    );
  }

  if (error || !character) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-[#1a1a1a] rounded-lg p-8 border border-[#262626]">
          <h1 className="text-2xl font-bold text-red-500 mb-4">Character Not Found</h1>
          <p className="text-gray-400 mb-6">{error || 'Unable to load character details'}</p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#10b981] text-white rounded-lg hover:bg-[#059669] transition-all"
          >
            <FiArrowLeft />
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const formatFavorites = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toLocaleString();
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Back Button */}
      <div className="container mx-auto px-4 py-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-[#10b981] transition-colors"
        >
          <FiArrowLeft size={20} />
          <span>Back to Home</span>
        </Link>
      </div>

      {/* Hero Section */}
      <div className="relative bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] border-b border-[#262626]">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            {/* Character Image */}
            <div className="md:col-span-1">
              <div className="relative aspect-[3/4] rounded-xl overflow-hidden border-4 border-[#10b981] shadow-2xl shadow-[#10b981]/30 mx-auto max-w-md">
                <Image
                  src={character.images.webp.image_url || character.images.jpg.image_url}
                  alt={character.name}
                  fill
                  className="object-cover"
                  priority
                  quality={90}
                />
              </div>
              
              {/* Favorites */}
              <div className="mt-6 bg-[#1a1a1a] rounded-lg p-6 border border-[#262626] text-center max-w-md mx-auto">
                <div className="flex items-center justify-center gap-3 mb-2">
                  <FiHeart className="text-red-500" size={24} />
                  <span className="text-3xl font-bold text-white">{formatFavorites(character.favorites)}</span>
                </div>
                <p className="text-gray-400 text-sm">Member Favorites</p>
              </div>
            </div>

            {/* Character Info */}
            <div className="md:col-span-2 space-y-6">
              {/* Name */}
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
                  {character.name}
                </h1>
                {character.name_kanji && (
                  <p className="text-xl text-gray-400">{character.name_kanji}</p>
                )}
                
                {/* Nicknames */}
                {character.nicknames && character.nicknames.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {character.nicknames.map((nickname, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-[#10b981]/10 text-[#10b981] rounded-full text-sm border border-[#10b981]/30"
                      >
                        {nickname}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Biography/About */}
              <div className="bg-[#1a1a1a] rounded-lg p-6 border border-[#262626]">
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                  <FiUser className="text-[#10b981]" />
                  Biography
                </h2>
                {character.about ? (
                  <div className="space-y-4">
                    {character.about.split('\n\n').map((paragraph, index) => (
                      <p key={index} className="text-gray-300 leading-relaxed">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 italic">No biography available for this character.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Voice Actors Section */}
      {voiceActors.length > 0 && (
        <section className="container mx-auto px-4 py-12">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
            <div className="w-1 h-8 bg-[#10b981] rounded-full"></div>
            Voice Actors
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {voiceActors.map((va, index) => (
              <div
                key={index}
                className="bg-[#1a1a1a] rounded-lg p-4 border border-[#262626] hover:border-[#10b981] transition-all hover:shadow-lg hover:shadow-[#10b981]/20"
              >
                <div className="relative aspect-[3/4] rounded-lg overflow-hidden mb-4">
                  <Image
                    src={va.person.images.jpg.image_url}
                    alt={va.person.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                </div>
                <h3 className="font-bold text-white text-sm mb-1">{va.person.name}</h3>
                <p className="text-xs text-[#10b981]">{va.language}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Animeography Section */}
      {animeography.length > 0 && (
        <section className="container mx-auto px-4 py-12">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
            <div className="w-1 h-8 bg-[#10b981] rounded-full"></div>
            Appears In
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {animeography.map((item, index) => (
              <Link
                key={index}
                href={`/anime/${item.anime.mal_id}`}
                className="group"
              >
                <div className="relative aspect-[3/4] rounded-lg overflow-hidden border border-[#262626] group-hover:border-[#10b981] transition-all">
                  <Image
                    src={item.anime.images.jpg.image_url}
                    alt={item.anime.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                  
                  {/* Role Badge */}
                  <div className={`absolute top-2 right-2 text-xs font-bold px-2 py-1 rounded ${
                    item.role === 'Main' 
                      ? 'bg-[#10b981] text-black' 
                      : 'bg-gray-700 text-white'
                  }`}>
                    {item.role}
                  </div>
                </div>
                <h3 className="mt-2 text-sm text-white font-medium line-clamp-2 group-hover:text-[#10b981] transition-colors">
                  {item.anime.title}
                </h3>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
