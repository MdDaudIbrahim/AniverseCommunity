import Link from 'next/link';
import { FiPlay, FiTrendingUp } from 'react-icons/fi';

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-r from-primary to-secondary text-white py-20 px-4">
      <div className="container mx-auto text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Discover Your Next Favorite Anime
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Explore trending anime, get personalized recommendations, and stay updated with the latest releases.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/top-anime"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary font-semibold rounded-full hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg"
            >
              <FiTrendingUp className="mr-2" />
              Browse Top Anime
            </Link>
            <Link
              href="/seasonal"
              className="inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-primary transition-all transform hover:scale-105"
            >
              <FiPlay className="mr-2" />
              Current Season
            </Link>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-white rounded-full"></div>
        <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-white rounded-full"></div>
      </div>
    </section>
  );
}
