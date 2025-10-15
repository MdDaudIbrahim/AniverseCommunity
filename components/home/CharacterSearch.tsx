'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiSearch, FiHeart } from 'react-icons/fi';

interface Character {
  mal_id: number;
  name: string;
  images: {
    jpg: {
      image_url: string;
    };
    webp: {
      image_url: string;
    };
  };
  favorites: number;
  url: string;
}

export default function CharacterSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  // Debounce search
  useEffect(() => {
    if (!searchQuery.trim()) {
      setCharacters([]);
      setHasSearched(false);
      return;
    }

    const timer = setTimeout(() => {
      searchCharacters(searchQuery);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const searchCharacters = async (query: string) => {
    if (!query.trim()) return;

    setLoading(true);
    setHasSearched(true);
    
    try {
      const response = await fetch(
        `https://api.jikan.moe/v4/characters?q=${encodeURIComponent(query)}&limit=12`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch characters');
      }

      const data = await response.json();
      setCharacters(data.data || []);
    } catch (error) {
      console.error('Error searching characters:', error);
      setCharacters([]);
    } finally {
      setLoading(false);
    }
  };

  const formatFavorites = (favorites: number) => {
    if (favorites >= 1000000) {
      return `${(favorites / 1000000).toFixed(1)}M`;
    } else if (favorites >= 1000) {
      return `${(favorites / 1000).toFixed(1)}K`;
    }
    return favorites.toString();
  };

  return (
    <div className="mt-16 pt-16 border-t border-[#262626]">
      <h2 className="text-2xl md:text-3xl font-bold text-[#10b981] mb-6 uppercase tracking-wide">
        Character Search
      </h2>
      
      {/* Search Input */}
      <div className="relative mb-8">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for anime characters..."
          className="w-full bg-[#1a1a1a] border border-[#262626] rounded-lg px-4 py-3 pr-12 text-white placeholder-gray-500 focus:border-[#10b981] focus:outline-none transition-colors"
        />
        <FiSearch className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
      </div>

      {/* Loading State */}
      {loading && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="relative aspect-[2/3] bg-[#1a1a1a] rounded-lg mb-2" />
              <div className="h-4 bg-[#1a1a1a] rounded mb-1" />
              <div className="h-3 bg-[#1a1a1a] rounded w-2/3" />
            </div>
          ))}
        </div>
      )}

      {/* Results */}
      {!loading && hasSearched && (
        <>
          {characters.length > 0 ? (
            <>
              <p className="text-gray-400 text-sm mb-4">
                Found {characters.length} character{characters.length !== 1 ? 's' : ''}
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {characters.map((character) => (
                  <a
                    key={character.mal_id}
                    href={character.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group"
                  >
                    <div className="relative aspect-[2/3] rounded-lg overflow-hidden border border-[#262626] hover:border-[#10b981] transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#10b981]/30">
                      <Image
                        src={character.images.webp.image_url || character.images.jpg.image_url}
                        alt={character.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 16vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                      
                      {/* Character Info */}
                      <div className="absolute bottom-0 left-0 right-0 p-3">
                        <h3 className="text-white font-bold text-xs line-clamp-2 mb-1">
                          {character.name}
                        </h3>
                        <div className="flex items-center gap-1 text-xs text-gray-300">
                          <FiHeart className="text-red-500" size={10} />
                          <span>{formatFavorites(character.favorites)}</span>
                        </div>
                      </div>
                    </div>
                    <h4 className="mt-2 text-sm text-white font-medium line-clamp-2 group-hover:text-[#10b981] transition-colors">
                      {character.name}
                    </h4>
                  </a>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg mb-2">No characters found</p>
              <p className="text-gray-500 text-sm">
                Try a different search term
              </p>
            </div>
          )}
        </>
      )}

      {/* Empty State - Only show when no search query */}
      {!loading && !searchQuery.trim() && (
        <div className="text-center py-12 bg-[#1a1a1a] rounded-lg border border-[#262626]">
          <FiSearch className="w-12 h-12 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400 text-lg mb-2">Search for your favorite characters</p>
          <p className="text-gray-500 text-sm">
            Enter a character name to start searching
          </p>
        </div>
      )}
    </div>
  );
}
