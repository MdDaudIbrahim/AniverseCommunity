'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiCalendar, FiClock, FiArrowRight } from 'react-icons/fi';
interface NewsArticle {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  image: string;
  source: string;
  readTime?: string;
}

export default function NewsPage() {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  // Fallback news data
  const fallbackNews: NewsArticle[] = [
    {
      id: 1,
      title: "Attack on Titan Final Season Part 3 Announced",
      excerpt: "The epic saga continues with the announcement of Attack on Titan Final Season Part 3, set to premiere in 2024.",
      date: "2024-01-15",
      category: "Announcements",
      image: "https://cdn.myanimelist.net/images/anime/1948/120625.jpg",
      source: "Official Website",
      readTime: "3 min read"
    },
    {
      id: 2,
      title: "Demon Slayer Movie Breaks Box Office Records",
      excerpt: "The latest Demon Slayer movie has shattered box office records worldwide, becoming the highest-grossing anime film.",
      date: "2024-01-14",
      category: "Box Office",
      image: "https://cdn.myanimelist.net/images/anime/1286/99889.jpg",
      source: "Anime News Network",
      readTime: "5 min read"
    },
    {
      id: 3,
      title: "My Hero Academia Season 7 Release Date Revealed",
      excerpt: "Fans rejoice as the official release date for My Hero Academia Season 7 has been announced for Spring 2024.",
      date: "2024-01-13",
      category: "Releases",
      image: "https://cdn.myanimelist.net/images/anime/1965/111417.jpg",
      source: "Crunchyroll",
      readTime: "4 min read"
    },
    {
      id: 4,
      title: "Jujutsu Kaisen Announces New Movie Project",
      excerpt: "MAPPA studio confirms a new Jujutsu Kaisen movie is in production, featuring an original story by Gege Akutami.",
      date: "2024-01-12",
      category: "Announcements",
      image: "https://cdn.myanimelist.net/images/anime/1171/109222.jpg",
      source: "Official Twitter",
      readTime: "3 min read"
    },
    {
      id: 5,
      title: "Chainsaw Man Season 2 in Development",
      excerpt: "MAPPA confirms that Chainsaw Man Season 2 is officially in production, with more details to be revealed soon.",
      date: "2024-01-11",
      category: "Production",
      image: "https://cdn.myanimelist.net/images/anime/1806/126216.jpg",
      source: "Anime Expo",
      readTime: "4 min read"
    },
    {
      id: 6,
      title: "Spy x Family Code: White Movie Premieres Globally",
      excerpt: "The highly anticipated Spy x Family movie premieres worldwide, featuring the Forger family in a new adventure.",
      date: "2024-01-10",
      category: "Releases",
      image: "https://cdn.myanimelist.net/images/anime/1111/127508.jpg",
      source: "Official Site",
      readTime: "5 min read"
    },
    {
      id: 7,
      title: "One Piece Reaches Episode 1100 Milestone",
      excerpt: "One Piece anime reaches a historic milestone with episode 1100, celebrating over two decades of adventure.",
      date: "2024-01-09",
      category: "Milestones",
      image: "https://cdn.myanimelist.net/images/anime/6/73245.jpg",
      source: "Toei Animation",
      readTime: "3 min read"
    },
    {
      id: 8,
      title: "Tokyo Revengers Final Season Trailer Released",
      excerpt: "The final season of Tokyo Revengers gets an epic trailer showcasing the climactic battle.",
      date: "2024-01-08",
      category: "Trailers",
      image: "https://cdn.myanimelist.net/images/anime/1839/122012.jpg",
      source: "YouTube",
      readTime: "2 min read"
    },
    {
      id: 9,
      title: "Vinland Saga Season 3 Confirmed for 2025",
      excerpt: "MAPPA announces Vinland Saga Season 3 is confirmed for 2025, continuing Thorfinn's journey.",
      date: "2024-01-07",
      category: "Announcements",
      image: "https://cdn.myanimelist.net/images/anime/1170/124312.jpg",
      source: "Official Press Release",
      readTime: "4 min read"
    },
    {
      id: 10,
      title: "Studio Ghibli Announces New Film Project",
      excerpt: "Studio Ghibli reveals a new original film in development, directed by Hayao Miyazaki's protégé.",
      date: "2024-01-06",
      category: "Production",
      image: "https://cdn.myanimelist.net/images/anime/1439/93004.jpg",
      source: "Ghibli Museum",
      readTime: "5 min read"
    },
    {
      id: 11,
      title: "Bleach: Thousand-Year Blood War Part 3 Details",
      excerpt: "New details emerge about Bleach TYBW Part 3, including premiere date and key visual reveals.",
      date: "2024-01-05",
      category: "Releases",
      image: "https://cdn.myanimelist.net/images/anime/1764/126627.jpg",
      source: "Crunchyroll Expo",
      readTime: "4 min read"
    },
    {
      id: 12,
      title: "Frieren: Beyond Journey's End Wins Anime Awards",
      excerpt: "Frieren dominates this year's anime awards, winning Best Animation and Best Story categories.",
      date: "2024-01-04",
      category: "Awards",
      image: "https://cdn.myanimelist.net/images/anime/1015/138006.jpg",
      source: "Anime Awards",
      readTime: "3 min read"
    }
  ];

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setNews(fallbackNews);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const categories = ['all', 'Announcements', 'Releases', 'Production', 'Box Office', 'Awards', 'Trailers', 'Milestones'];

  const filteredNews = activeCategory === 'all' 
    ? news 
    : news.filter(item => item.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <div className="container mx-auto px-4 py-6">
        {/* Minimal Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-white">
            Anime News
          </h1>
          <p className="text-sm text-gray-400">
            Latest updates from the anime world
          </p>
        </div>

        {/* Ad Banner */}{/* Minimal Category Filter */}
        <div className="mb-6 flex items-center justify-center">
          <div className="inline-flex flex-wrap gap-2 bg-[#1a1a1a] border border-[#262626] rounded-lg p-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                  activeCategory === category
                    ? 'bg-[#10b981] text-white'
                    : 'text-gray-300 hover:bg-[#0f0f0f] hover:text-white'
                }`}
              >
                {category === 'all' ? 'All' : category}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#10b981]"></div>
          </div>
        ) : (
          <>
            {/* Clean News Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {filteredNews.map((article) => (
                <Link
                  key={article.id}
                  href={`/news/${article.id}`}
                  className="group bg-[#1a1a1a] border border-[#262626] hover:border-[#10b981]/50 rounded-lg overflow-hidden shadow-sm hover:shadow-lg hover:shadow-[#10b981]/20 transition-all"
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2 left-2">
                      <span className="px-2 py-1 bg-black/80 backdrop-blur-sm text-white rounded text-xs font-medium">
                        {article.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <div className="flex items-center gap-3 text-xs text-gray-500 mb-2">
                      <div className="flex items-center gap-1">
                        <FiCalendar size={12} />
                        <span>{new Date(article.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                      </div>
                      {article.readTime && (
                        <>
                          <span>•</span>
                          <div className="flex items-center gap-1">
                            <FiClock size={12} />
                            <span>{article.readTime}</span>
                          </div>
                        </>
                      )}
                    </div>

                    <h3 className="text-base font-bold mb-2 line-clamp-2 text-white group-hover:text-[#10b981] transition-colors">
                      {article.title}
                    </h3>

                    <p className="text-sm text-gray-400 line-clamp-2 mb-3">
                      {article.excerpt}
                    </p>

                    <div className="flex items-center text-[#10b981] text-sm font-medium">
                      <span>Read more</span>
                      <FiArrowRight className="ml-1 group-hover:translate-x-1 transition-transform" size={14} />
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {filteredNews.length === 0 && (
              <div className="text-center py-12 bg-[#1a1a1a] border border-[#262626] rounded-lg">
                <p className="text-gray-400 text-sm">No news in this category</p>
              </div>
            )}

            {/* Bottom Ad */}</>
        )}
      </div>
    </div>
  );
}
