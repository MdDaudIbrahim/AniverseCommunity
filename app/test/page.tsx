export default function TestPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="text-center text-white p-8">
        <h1 className="text-6xl font-bold mb-4">✅ It Works!</h1>
        <p className="text-2xl mb-4">AnimeVerse is loading</p>
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-white mx-auto mb-4"></div>
        <p className="text-lg">If you see this, Next.js is running correctly</p>
        <a href="/" className="mt-6 inline-block px-6 py-3 bg-white text-blue-600 rounded-full font-semibold hover:bg-gray-100">
          Go to Home
        </a>
      </div>
    </div>
  );
}
