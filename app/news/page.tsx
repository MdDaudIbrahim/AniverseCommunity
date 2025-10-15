'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { FiCalendar, FiArrowRight } from 'react-icons/fi';

interface NewsArticle {
  mal_id: number;
  url: string;
  title: string;
  date: string;
  author_username: string;
  author_url: string;
  forum_url: string;
  images: {
    jpg: {
      image_url: string;
    };
  };
  comments: number;
  excerpt: string;
  category?: string;
}

export default function NewsPage() {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [page, setPage] = useState(1);

  const categories = [
    'All',
    'Announcements',
    'Releases',
    'Production',
    'Box Office',
    'Awards',
    'Trailers',
    'Milestones'
  ];

  // Determine category from title keywords
  const getCategoryFromTitle = (title: string): string => {
    const lowerTitle = title.toLowerCase();
    if (lowerTitle.includes('announce') || lowerTitle.includes('reveal') || lowerTitle.includes('confirm')) return 'Announcements';
    if (lowerTitle.includes('release') || lowerTitle.includes('premiere') || lowerTitle.includes('date')) return 'Releases';
    if (lowerTitle.includes('production') || lowerTitle.includes('studio') || lowerTitle.includes('adapt')) return 'Production';
    if (lowerTitle.includes('box office') || lowerTitle.includes('record') || lowerTitle.includes('gross')) return 'Box Office';
    if (lowerTitle.includes('award') || lowerTitle.includes('win') || lowerTitle.includes('honor')) return 'Awards';
    if (lowerTitle.includes('trailer') || lowerTitle.includes('pv') || lowerTitle.includes('teaser')) return 'Trailers';
    if (lowerTitle.includes('milestone') || lowerTitle.includes('episode') || lowerTitle.includes('chapter')) return 'Milestones';
    return 'Announcements';
  };

  const getCategoryBadge = (category: string) => {
    const colors: { [key: string]: string } = {
      'Announcements': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      'Releases': 'bg-green-500/20 text-green-400 border-green-500/30',
      'Production': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
      'Box Office': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      'Awards': 'bg-pink-500/20 text-pink-400 border-pink-500/30',
      'Trailers': 'bg-red-500/20 text-red-400 border-red-500/30',
      'Milestones': 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30'
    };
    return colors[category] || colors['Announcements'];
  };

  // Fetch real news from Jikan API
  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        const response = await fetch('https://api.jikan.moe/v4/anime/1/news');
        const data = await response.json();
        
        if (data.data) {
          const newsWithCategories = data.data.map((item: any) => ({
            ...item,
            category: getCategoryFromTitle(item.title)
          }));
          setNews(newsWithCategories);
        }
      } catch (error) {
        console.error('Failed to fetch news:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const filteredNews = activeCategory === 'All' 
    ? news 
    : news.filter(item => item.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Latest Anime News
          </h1>
          <p className="text-gray-400 text-lg">
            Stay updated with the latest news from the anime world
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2.5 rounded-lg font-medium transition-all ${
                  activeCategory === category
                    ? 'bg-[#10b981] text-white shadow-lg shadow-[#10b981]/20'
                    : 'bg-[#1a1a1a] text-gray-400 hover:bg-[#262626] border border-[#262626]'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* News Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="bg-[#1a1a1a] rounded-xl overflow-hidden animate-pulse">
                <div className="w-full h-48 bg-[#262626]" />
                <div className="p-6 space-y-3">
                  <div className="h-4 bg-[#262626] rounded w-3/4" />
                  <div className="h-4 bg-[#262626] rounded w-full" />
                  <div className="h-4 bg-[#262626] rounded w-5/6" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            {filteredNews.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-gray-400 text-lg">No news articles found for this category.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredNews.map((article) => (
                  <article
                    key={article.mal_id}
                    className="bg-[#1a1a1a] border border-[#262626] rounded-xl overflow-hidden hover:border-[#10b981] transition-all hover:shadow-lg hover:shadow-[#10b981]/10 group"
                  >
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={article.images.jpg.image_url}
                        alt={article.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      {article.category && (
                        <div className="absolute top-3 left-3">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getCategoryBadge(article.category)}`}>
                            {article.category}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h2 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-[#10b981] transition-colors">
                        {article.title}
                      </h2>

                      <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                        {article.excerpt}
                      </p>

                      {/* Meta Info */}
                      <div className="flex items-center gap-4 text-xs text-gray-500 mb-4 flex-wrap">
                        <div className="flex items-center gap-1">
                          <FiCalendar className="w-3.5 h-3.5" />
                          <span>{new Date(article.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                        </div>
                        {article.author_username && (
                          <div className="flex items-center gap-1">
                            <span className="text-gray-600">by</span>
                            <span className="text-gray-400">{article.author_username}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-1">
                          <span className="text-gray-600">💬</span>
                          <span>{article.comments}</span>
                        </div>
                      </div>

                      {/* Read More Button */}
                      <a
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-[#10b981] hover:text-[#0d9668] font-medium text-sm transition-colors"
                      >
                        Read More
                        <FiArrowRight className="w-4 h-4" />
                      </a>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
