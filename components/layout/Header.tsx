'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { FiSearch, FiMenu, FiX, FiLoader } from 'react-icons/fi';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface SearchResult {
  mal_id: number;
  title: string;
  title_english?: string;
  images: {
    jpg: {
      small_image_url: string;
    };
  };
  score?: number;
  type?: string;
  year?: number;
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Debounced search
  useEffect(() => {
    const delayTimer = setTimeout(() => {
      if (searchQuery.trim().length >= 2) {
        performSearch(searchQuery);
      } else {
        setSearchResults([]);
        setShowDropdown(false);
      }
    }, 500); // Wait 500ms after user stops typing

    return () => clearTimeout(delayTimer);
  }, [searchQuery]);

  const performSearch = async (query: string) => {
    try {
      setIsSearching(true);
      const response = await fetch(
        `https://api.jikan.moe/v4/anime?q=${encodeURIComponent(query)}&limit=8&order_by=popularity`
      );
      
      if (response.ok) {
        const data = await response.json();
        setSearchResults(data.data || []);
        setShowDropdown(true);
      }
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      setShowDropdown(false);
    }
  };

  const handleResultClick = (animeId: number) => {
    router.push(`/anime/${animeId}`);
    setSearchQuery('');
    setShowDropdown(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-md">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              AnimeVerse
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <Link href="/top-anime" className="hover:text-primary transition-colors">
              Top 100 Anime
            </Link>
            <Link href="/seasonal" className="hover:text-primary transition-colors">
              Seasonal
            </Link>
            <Link href="/genres" className="hover:text-primary transition-colors">
              Genres
            </Link>
            <Link href="/recommendations" className="hover:text-primary transition-colors">
              Recommendations
            </Link>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:block relative" ref={searchRef}>
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search anime..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => searchResults.length > 0 && setShowDropdown(true)}
                className="w-80 pl-10 pr-10 py-2 rounded-full border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-800"
              />
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              {isSearching && (
                <FiLoader className="absolute right-3 top-1/2 transform -translate-y-1/2 text-primary animate-spin" />
              )}
            </form>

            {/* Search Dropdown */}
            {showDropdown && searchResults.length > 0 && (
              <div className="absolute top-full mt-2 w-full bg-white dark:bg-gray-800 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50 max-h-[500px] overflow-y-auto">
                {searchResults.map((anime) => (
                  <button
                    key={anime.mal_id}
                    onClick={() => handleResultClick(anime.mal_id)}
                    className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors border-b border-gray-100 dark:border-gray-700 last:border-b-0"
                  >
                    <div className="relative w-12 h-16 flex-shrink-0 rounded overflow-hidden">
                      <Image
                        src={anime.images.jpg.small_image_url}
                        alt={anime.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 text-left">
                      <h4 className="font-semibold text-sm line-clamp-1">
                        {anime.title_english || anime.title}
                      </h4>
                      <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {anime.type && <span>{anime.type}</span>}
                        {anime.year && <span>• {anime.year}</span>}
                        {anime.score && (
                          <span className="flex items-center gap-1">
                            • ⭐ {anime.score.toFixed(1)}
                          </span>
                        )}
                      </div>
                    </div>
                  </button>
                ))}
                
                {/* View All Results */}
                <button
                  onClick={handleSearch}
                  className="w-full p-3 text-center text-primary font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  View All Results for &quot;{searchQuery}&quot;
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 space-y-4">
            <div className="mb-4">
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  placeholder="Search anime..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => searchResults.length > 0 && setShowDropdown(true)}
                  className="w-full pl-10 pr-10 py-2 rounded-full border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-800"
                />
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                {isSearching && (
                  <FiLoader className="absolute right-3 top-1/2 transform -translate-y-1/2 text-primary animate-spin" />
                )}
              </form>

              {/* Mobile Search Dropdown */}
              {showDropdown && searchResults.length > 0 && (
                <div className="mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden max-h-96 overflow-y-auto">
                  {searchResults.map((anime) => (
                    <button
                      key={anime.mal_id}
                      onClick={() => {
                        handleResultClick(anime.mal_id);
                        setIsMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors border-b border-gray-100 dark:border-gray-700 last:border-b-0"
                    >
                      <div className="relative w-12 h-16 flex-shrink-0 rounded overflow-hidden">
                        <Image
                          src={anime.images.jpg.small_image_url}
                          alt={anime.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 text-left">
                        <h4 className="font-semibold text-sm line-clamp-1">
                          {anime.title_english || anime.title}
                        </h4>
                        <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mt-1">
                          {anime.type && <span>{anime.type}</span>}
                          {anime.year && <span>• {anime.year}</span>}
                          {anime.score && (
                            <span className="flex items-center gap-1">
                              • ⭐ {anime.score.toFixed(1)}
                            </span>
                          )}
                        </div>
                      </div>
                    </button>
                  ))}
                  
                  <button
                    onClick={() => {
                      handleSearch(new Event('submit') as any);
                      setIsMenuOpen(false);
                    }}
                    className="w-full p-3 text-center text-primary font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    View All Results
                  </button>
                </div>
              )}
            </div>
            <Link
              href="/"
              className="block hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/top-anime"
              className="block hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Top 100 Anime
            </Link>
            <Link
              href="/seasonal"
              className="block hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Seasonal
            </Link>
            <Link
              href="/genres"
              className="block hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Genres
            </Link>
            <Link
              href="/recommendations"
              className="block hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Recommendations
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
