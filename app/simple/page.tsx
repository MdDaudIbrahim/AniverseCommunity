import Link from 'next/link';

export default function SimplePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      {/* Simple Header */}
      <header className="p-6 border-b border-gray-700">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            AnimeVerse
          </h1>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          Discover Your Next Favorite Anime
        </h1>
        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Welcome to AnimeVerse! Your ultimate destination for anime recommendations.
        </p>
        <div className="flex gap-4 justify-center">
          <button className="px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-full font-semibold transition-colors">
            Browse Anime
          </button>
          <button className="px-8 py-4 bg-purple-600 hover:bg-purple-700 rounded-full font-semibold transition-colors">
            Top Rated
          </button>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-gray-800 p-6 rounded-lg">
            <div className="text-4xl mb-4">🔥</div>
            <h3 className="text-xl font-bold mb-2">Trending Now</h3>
            <p className="text-gray-400">Discover what's hot in the anime world</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg">
            <div className="text-4xl mb-4">⭐</div>
            <h3 className="text-xl font-bold mb-2">Top Rated</h3>
            <p className="text-gray-400">Explore the highest-rated anime of all time</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg">
            <div className="text-4xl mb-4">🎬</div>
            <h3 className="text-xl font-bold mb-2">This Season</h3>
            <p className="text-gray-400">Check out the latest seasonal releases</p>
          </div>
        </div>
      </section>

      {/* Status */}
      <section className="container mx-auto px-4 py-12 text-center">
        <div className="bg-green-900/30 border border-green-700 rounded-lg p-6 max-w-2xl mx-auto">
          <h3 className="text-2xl font-bold text-green-400 mb-2">✅ System Status</h3>
          <p className="text-gray-300">Next.js is running correctly!</p>
          <p className="text-sm text-gray-400 mt-2">
            API integration in progress...
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-700 mt-20 py-8">
        <div className="container mx-auto px-4 text-center text-gray-400">
          <p>© 2025 AnimeVerse. All rights reserved.</p>
          <p className="text-sm mt-2">
            Powered by <Link href="https://jikan.moe" className="text-blue-400 hover:underline">Jikan API</Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
