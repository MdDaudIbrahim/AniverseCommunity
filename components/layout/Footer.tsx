import Link from 'next/link';
import { FiGithub, FiTwitter, FiFacebook, FiInstagram } from 'react-icons/fi';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">AnimeVerse</h3>
            <p className="text-sm">
              Your ultimate destination for anime recommendations, reviews, and the latest updates from the anime world.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-primary transition-colors" aria-label="Twitter">
                <FiTwitter size={20} />
              </a>
              <a href="#" className="hover:text-primary transition-colors" aria-label="Facebook">
                <FiFacebook size={20} />
              </a>
              <a href="#" className="hover:text-primary transition-colors" aria-label="Instagram">
                <FiInstagram size={20} />
              </a>
              <a href="#" className="hover:text-primary transition-colors" aria-label="GitHub">
                <FiGithub size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:text-primary transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/top-anime" className="hover:text-primary transition-colors text-sm">
                  Top Anime
                </Link>
              </li>
              <li>
                <Link href="/seasonal" className="hover:text-primary transition-colors text-sm">
                  Seasonal Anime
                </Link>
              </li>
              <li>
                <Link href="/genres" className="hover:text-primary transition-colors text-sm">
                  Browse by Genre
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Resources</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="hover:text-primary transition-colors text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-primary transition-colors text-sm">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-primary transition-colors text-sm">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary transition-colors text-sm">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Attribution */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Legal</h4>
            <p className="text-sm mb-4">
              All anime data is provided by{' '}
              <a
                href="https://jikan.moe"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Jikan API
              </a>
              {' '}and{' '}
              <a
                href="https://myanimelist.net"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                MyAnimeList
              </a>
              .
            </p>
            <p className="text-xs text-gray-400">
              We do not host any copyrighted content. All images and data are property of their respective owners.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
          <p>
            &copy; {currentYear} AnimeVerse. All rights reserved. | Built with ❤️ for anime fans
          </p>
        </div>
      </div>
    </footer>
  );
}
