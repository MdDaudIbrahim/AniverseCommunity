'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { FiSearch, FiMenu, FiX, FiLoader } from 'react-icons/fi';
import { useRouter, usePathname } from 'next/navigation';
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
  const pathname = usePathname();

  // Navigation items
  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/top-anime', label: 'Top 100 Anime' },
    { href: '/seasonal', label: 'Seasonal' },
    { href: '/genres', label: 'Genres' },
    { href: '/news', label: 'News' },
    { href: '/recommendations', label: 'Recommendations' },
  ];

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname?.startsWith(href);
  };

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
    <header className="sticky top-0 z-50 bg-[#0a0a0a]/95 border-b border-[#262626] shadow-2xl backdrop-blur-xl">
      <nav className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="relative">
              <span className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#10b981] via-[#059669] to-[#10b981] bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
                NextAnime
              </span>
              <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#10b981] to-[#059669] group-hover:w-full transition-all duration-300"></div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`relative px-4 py-2 rounded-lg font-medium transition-all duration-300 group ${
                  isActive(item.href)
                    ? 'text-white bg-[#10b981]/10'
                    : 'text-gray-400 hover:text-white hover:bg-[#1a1a1a]'
                }`}
              >
                <span className="relative z-10">{item.label}</span>
                {isActive(item.href) && (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-r from-[#10b981]/20 to-[#059669]/20 rounded-lg"></div>
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-gradient-to-r from-transparent via-[#10b981] to-transparent"></div>
                  </>
                )}
                {!isActive(item.href) && (
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-transparent via-[#10b981] to-transparent group-hover:w-1/2 transition-all duration-300"></div>
                )}
              </Link>
            ))}
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden lg:block relative" ref={searchRef}>
            <form onSubmit={handleSearch} className="relative group">
              <input
                type="text"
                placeholder="Search anime..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => searchResults.length > 0 && setShowDropdown(true)}
                className="w-64 xl:w-80 pl-10 pr-10 py-2.5 rounded-full border border-[#262626] bg-[#1a1a1a] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#10b981] focus:border-[#10b981] transition-all"
              />
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-[#10b981] transition-colors" />
              {isSearching && (
                <FiLoader className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#10b981] animate-spin" />
              )}
            </form>

            {/* Search Dropdown */}
            {showDropdown && searchResults.length > 0 && (
              <div className="absolute top-full mt-2 w-full bg-[#1a1a1a] rounded-lg shadow-2xl border border-gray-700 overflow-hidden z-50 max-h-[500px] overflow-y-auto">
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
            className="lg:hidden p-2 rounded-lg hover:bg-[#1a1a1a] transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <FiX size={24} className="text-[#10b981]" />
            ) : (
              <FiMenu size={24} className="text-gray-300" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 space-y-3 pb-4 animate-fadeIn">
            <div className="mb-4">
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  placeholder="Search anime..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => searchResults.length > 0 && setShowDropdown(true)}
                  className="w-full pl-10 pr-10 py-2.5 rounded-full border border-[#262626] bg-[#1a1a1a] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#10b981]"
                />
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                {isSearching && (
                  <FiLoader className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#10b981] animate-spin" />
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
                      className="w-full flex items-center gap-3 p-3 hover:bg-[#1a1a1a] transition-colors border-b border-[#262626] last:border-b-0"
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
                        <h4 className="font-semibold text-sm line-clamp-1 text-white">
                          {anime.title_english || anime.title}
                        </h4>
                        <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
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
                    className="w-full p-3 text-center text-[#10b981] font-semibold hover:bg-[#1a1a1a] transition-colors"
                  >
                    View All Results
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Navigation Links */}
            <div className="space-y-1 pt-2 border-t border-[#262626]">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block px-4 py-3 rounded-lg font-medium transition-all ${
                    isActive(item.href)
                      ? 'bg-[#10b981]/10 text-white border-l-4 border-[#10b981]'
                      : 'text-gray-400 hover:text-white hover:bg-[#1a1a1a]'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="flex items-center justify-between">
                    {item.label}
                    {isActive(item.href) && (
                      <span className="w-2 h-2 bg-[#10b981] rounded-full animate-pulse"></span>
                    )}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
