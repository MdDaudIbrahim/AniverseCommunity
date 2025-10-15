# 🎌 NextAnime - Your Ultimate Anime Discovery Platform

A modern, blazing-fast anime recommendation and discovery website built with **Next.js 14**, **TypeScript**, **Tailwind CSS**, and the **Jikan API v4** (MyAnimeList data). Features a stunning dark theme, mobile-first design, and intelligent content loading.

![Next.js](https://img.shields.io/badge/Next.js-14-black) ![TypeScript](https://img.shields.io/badge/TypeScript-5.4-blue) ![Tailwind](https://img.shields.io/badge/Tailwind-3.4-38bdf8) ![License](https://img.shields.io/badge/License-MIT-green)

**Live Demo:** [nextanime.vercel.app](https://nextanime.vercel.app) (Replace with your URL)

---

## ✨ Features

### 🎯 Core Features
- **🎬 Featured Hero Carousel** - Dynamic slideshow of currently airing anime with auto-play
- **📺 Weekly Schedule** - Smart day-by-day anime airing schedule with auto-selection
- **🍂 Seasonal Anime** - Browse current season's anime with auto-reload every 5 minutes
- **🔥 Top Trending** - Currently airing popular anime in horizontal scroll
- **⭐ Top Characters** - Most popular anime characters with favorites count
- **🔍 Advanced Search** - Real-time character and anime search with debouncing
- **📰 Latest Anime News** - Stay updated with the latest anime news articles
- **🎭 Detailed Anime Pages** - Comprehensive information with 6-tab navigation (Overview, Characters, Episodes, Reviews, Related, Stats)
- **🎨 Genre Exploration** - Browse and discover anime by genres
- **📱 Mobile-First Design** - Fully responsive with touch-optimized controls
- **🌙 Dark Theme** - Beautiful dark UI with green accent colors (#10b981)

### ⚡ Performance & UX
- **Smart Data Loading** - Staggered API calls to prevent rate limiting (100ms, 1500ms, 2000ms delays)
- **Auto-Retry System** - Automatic retry with exponential backoff for failed API requests
- **Lazy Loading** - Dynamic imports for below-the-fold components
- **Image Optimization** - Next.js Image with AVIF/WebP support, quality 75-85
- **Responsive Caching** - Smart cache strategy for API responses
- **Rate Limit Friendly** - Respects Jikan API limits (3 req/sec, 60 req/min)
- **Auto-Reload** - Seasonal anime auto-refreshes every 5 minutes with countdown timer
- **Smart Day Selection** - Weekly schedule automatically shows days with data
- **Mobile Overflow Protection** - Strict containment prevents horizontal scrolling
- **Touch-Friendly** - 44px minimum tap targets, active states for all interactive elements

### 🔍 SEO & Metadata
- **Dynamic Meta Tags** - Unique titles and descriptions for each page
- **Open Graph Tags** - Social media sharing optimization with images
- **Twitter Cards** - Enhanced Twitter sharing with large image previews
- **Viewport Configuration** - Proper mobile viewport settings
- **Theme Colors** - Dynamic theme color based on system preference
- **PWA Ready** - Manifest.json for progressive web app support
- **Robots.txt** - Search engine crawling optimization
- **Mobile-Friendly** - Google Mobile-Friendly test optimized

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** 18.x or higher
- **npm** or **yarn**
- **Google AdSense account** (for production)

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone https://github.com/MdDaudIbrahim/AniverseCommunity.git
   cd AniverseCommunity
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   # or
   yarn install
   \`\`\`

3. **Run development server**
   \`\`\`bash
   npm run dev
   # or
   yarn dev
   \`\`\`

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)
   
   > **Note:** If port 3000 is in use, Next.js will automatically try ports 3001, 3002, 3003, etc.

5. **Build for production**
   \`\`\`bash
   npm run build
   npm start
   \`\`\`

---

## 📁 Project Structure

\`\`\`
AniverseCommunity/
├── app/                              # Next.js 14 App Router
│   ├── anime/[id]/                  # Dynamic anime detail pages (6 tabs)
│   │   └── page.tsx                # Overview, Characters, Episodes, Reviews, Related, Stats
│   ├── genre/[id]/                  # Genre-specific pages
│   │   └── page.tsx
│   ├── genres/                      # All genres listing
│   │   └── page.tsx
│   ├── news/                        # News listing and detail
│   │   ├── page.tsx
│   │   └── [id]/page.tsx
│   ├── recommendations/             # Anime recommendations
│   │   └── page.tsx
│   ├── search/                      # Search results page
│   │   └── page.tsx
│   ├── seasonal/                    # Seasonal anime page
│   │   └── page.tsx
│   ├── top-anime/                   # Top 100 anime
│   │   └── page.tsx
│   ├── layout.tsx                   # Root layout with metadata
│   ├── page.tsx                     # Home page (main entry)
│   └── globals.css                  # Global styles & animations
├── components/
│   ├── ads/                         # Ad components (placeholder)
│   │   ├── AdSenseScript.tsx
│   │   ├── AdBanner.tsx
│   │   └── AdSidebar.tsx
│   ├── anime/
│   │   └── AnimeCard.tsx           # Reusable anime card
│   ├── home/                        # Homepage sections
│   │   ├── FeaturedAnimeHero.tsx   # Hero carousel with auto-play
│   │   ├── AnimeVaultGrid.tsx      # Main anime grid
│   │   ├── AnimeVaultSection.tsx   # Anime vault wrapper
│   │   ├── WeeklySchedule.tsx      # Smart weekly schedule
│   │   ├── SeasonalAnimeSection.tsx # Seasonal with auto-reload
│   │   ├── LatestAnimeNews.tsx     # News section
│   │   ├── TopTrending.tsx         # Trending horizontal scroll
│   │   ├── TopCharacters.tsx       # Characters horizontal scroll
│   │   ├── CharacterSearch.tsx     # Real-time character search
│   │   └── BigThreeSlider.tsx      # Featured anime slider
│   ├── layout/
│   │   ├── Header.tsx              # Navigation with search
│   │   └── Footer.tsx              # Footer with links
│   └── ui/
│       └── LoadingGrid.tsx         # Loading skeletons
├── lib/
│   ├── api/
│   │   └── jikan.ts                # Jikan API v4 client
│   ├── data/
│   │   ├── fallbackData.ts         # Fallback anime data
│   │   └── top100Anime.ts          # Top 100 cache
│   └── types/
│       └── anime.ts                # TypeScript interfaces
├── public/
│   ├── manifest.json               # PWA manifest
│   └── _redirects                  # Netlify redirects
├── all .md/                        # Documentation folder
│   ├── DEPLOYMENT-GUIDE.md
│   ├── PROJECT_SUMMARY.md
│   ├── ROADMAP.md
│   └── ...
├── next.config.js                  # Next.js config
├── tailwind.config.ts              # Tailwind CSS config
├── tsconfig.json                   # TypeScript config
├── package.json                    # Dependencies
└── README.md                       # This file
\`\`\`

---

## 🎨 Key Features & Components

### 1. **Featured Hero Carousel** (`FeaturedAnimeHero.tsx`)
- Auto-playing carousel with 8 currently airing anime
- Smooth transitions with pause on hover
- Responsive heights: 600px (mobile) → 650px (desktop)
- Strong gradient overlays for text readability
- Mobile-optimized: hidden synopsis on small screens, stacked buttons
- Navigation arrows and pagination dots
- Auto-retry on API failure

### 2. **Smart Weekly Schedule** (`WeeklySchedule.tsx`)
- **Auto-Day Selection**: Automatically shows first day with data
- Visual indicators (green dots) for days with anime
- Disabled state for empty days
- Comprehensive fallback strategy:
  1. `/schedules` endpoint
  2. `/seasons/now` fallback
  3. Per-day endpoints with rate-limiting delays
- 3x3 grid layout with anime cards
- Broadcast time, type, and score display

### 3. **Seasonal Anime with Auto-Reload** (`SeasonalAnimeSection.tsx`)
- **Auto-refresh every 5 minutes** with live countdown
- Toggle button to enable/disable auto-reload
- Year and season selectors (2021-2026)
- Manual refresh button
- Shows "Auto-reload active • Next update in 4:32"
- Last updated timestamp when auto-reload is off
- 6-column responsive grid (2 on mobile → 6 on desktop)

### 4. **Top Trending & Characters** (Horizontal Scrolls)
- Staggered loading (100ms for trending, 1500ms for characters)
- Smooth horizontal scroll with hidden scrollbar
- Favorites count formatting (1.2K, 5.3M)
- Retry logic with exponential backoff
- Touch-friendly scroll on mobile

---

### 5. **Anime Details Page** (`/anime/[id]/page.tsx`)
**6-Tab Navigation System:**
1. **Overview** - Synopsis, information grid, trailer
2. **Characters** - Character cards with VA info, searchable
3. **Episodes** - Episode list with titles and airing dates
4. **Reviews** - User reviews with scores and voting
5. **Related** - Related anime (sequels, prequels, adaptations)
6. **Stats** - Scores, rankings, popularity stats

**Features:**
- Hero banner with blurred background image
- Sticky tab navigation
- Responsive grid layouts
- Character search within page
- Lazy loading for heavy content
- Dynamic metadata for SEO

**Layout:**
- Full-width hero banner
- Sticky information sidebar on desktop
- Mobile-optimized stacked layout
- Smooth tab transitions

### 6. **Character Search** (`CharacterSearch.tsx`)
- Real-time search with 500ms debounce
- Jikan API `/characters` endpoint
- 2-6 column responsive grid
- Empty state only when no query entered
- Character favorites count
- Direct links to character pages

### 7. **Latest Anime News** (`LatestAnimeNews.tsx`)
- 2-second delay before fetch (prevent rate limiting)
- Horizontal scroll layout
- Retry logic with exponential backoff
- News article cards with images
- External links to full articles
- Published date display

### 8. **Mobile Optimizations**
- Strict overflow-x prevention (html, body, all containers)
- `max-width: 100vw` on all major containers
- Responsive padding: `px-4 sm:px-6`
- Touch-friendly buttons (min 44px height)
- Active states instead of hover-only
- Smaller text on mobile with progressive sizing
- Hidden elements on xs screens (synopsis, etc.)
- Flex-col to flex-row responsive layouts

---

## 🎯 Smart Data Loading Strategy

### API Call Timing (Preventing Rate Limits)

The application uses **staggered loading** to prevent hitting Jikan API rate limits:

\`\`\`
Hero Carousel:      Immediate load
Top Trending:       +100ms delay
Top Characters:     +1500ms delay
Latest News:        +2000ms delay
Weekly Schedule:    Independent with fallback chain
Seasonal Anime:     Independent with manual/auto-refresh
\`\`\`

### Retry Logic

All API calls implement **exponential backoff retry**:

\`\`\`typescript
async function fetchWithRetry(retryCount = 0) {
  try {
    const response = await fetch(url);
    if (!response.ok && retryCount < 2) {
      await new Promise(resolve => 
        setTimeout(resolve, 2000 * (retryCount + 1))
      );
      return fetchWithRetry(retryCount + 1);
    }
    return response;
  } catch (error) {
    // Handle error
  }
}
\`\`\`

**Retry Pattern:**
- 1st attempt: Immediate
- 2nd attempt: +2 seconds
- 3rd attempt: +4 seconds
- After 3 attempts: Show error state

### Weekly Schedule Fallback Strategy

The Weekly Schedule uses a **3-tier fallback system**:

1. **Primary**: `/schedules` endpoint (all days at once)
2. **Fallback 1**: `/seasons/now` endpoint (current season)
3. **Fallback 2**: Per-day endpoints (`/schedules?filter=monday`, etc.)
   - 350ms delay between each day
   - Prevents rate limiting
   - Guarantees data if other endpoints fail

---

## 🔌 API Integration

### Jikan API (MyAnimeList)

**Base URL:** `https://api.jikan.moe/v4`

**Rate Limits:**
- 3 requests per second
- 60 requests per minute

**Key Endpoints Used:**

| Endpoint | Purpose | Cache |
|----------|---------|-------|
| `/top/anime` | Top rated anime | 1 hour |
| `/seasons/now` | Currently airing | 1 hour |
| `/seasons/{year}/{season}` | Seasonal anime | 1 hour |
| `/anime/{id}/full` | Full anime details | 1 hour |
| `/anime` (with params) | Search anime | 1 hour |
| `/anime/{id}/characters` | Character list | 1 hour |
| `/anime/{id}/recommendations` | Recommendations | 1 hour |

**Example Usage:**

\`\`\`typescript
import { getTopAnime, searchAnime } from '@/lib/api/jikan';

// Get top anime
const { data } = await getTopAnime(1, 25);

// Search anime
const results = await searchAnime('Naruto', 1, {
  type: 'tv',
  score: 7,
  status: 'complete'
});
\`\`\`

### Alternative: AniList API

If you prefer GraphQL, you can use [AniList API](https://anilist.gitbook.io/anilist-apiv2-docs/):
- More flexible queries
- No rate limits (within reason)
- Different data structure

---

## 🎯 Features That Boost Engagement

### 1. **Personalized Recommendations**
- Based on viewed anime
- Genre-based suggestions
- "More like this" sections

### 2. **User Features** (Future Implementation)
- Watchlist/favorites (localStorage)
- Recently viewed history
- User ratings
- Comments (with moderation)

### 3. **Content Strategy**
- Weekly anime reviews
- Season previews
- Top 10 lists
- News articles

### 4. **Social Features**
- Share buttons
- Social media integration
- Newsletter signup
- Discord community

### 5. **Gamification**
- Achievement badges
- Watch streaks
- Completion tracking

---

## 📈 SEO & Traffic Growth Tips

### On-Page SEO

1. **Optimize Titles & Meta Descriptions**
   \`\`\`typescript
   export const metadata = {
     title: 'Top 10 Action Anime of 2024 | AnimeVerse',
     description: 'Discover the best action anime of 2024 with ratings, reviews, and where to watch.',
   };
   \`\`\`

2. **Use Structured Data**
   ```json
   {
     "@context": "https://schema.org",
     "@type": "TVSeries",
     "name": "Attack on Titan",
     "aggregateRating": {
       "@type": "AggregateRating",
       "ratingValue": "8.9",
       "bestRating": "10"
     }
   }
   ```

3. **Image Optimization**
   - Use Next.js Image component (already implemented)
   - Add descriptive alt text
   - Compress images

4. **Internal Linking**
   - Link related anime
   - Genre pages
   - Breadcrumbs

### Content Strategy

1. **Regular Content Updates**
   - Weekly blog posts
   - Season reviews
   - News updates

2. **Long-Form Content**
   - Detailed anime guides
   - Genre analysis
   - Character deep-dives

3. **Keywords to Target**
   - "best anime [year]"
   - "[genre] anime recommendations"
   - "anime like [popular show]"
   - "top anime to watch"

### Off-Page SEO

1. **Social Media**
   - Share on Twitter, Facebook, Reddit
   - Engage with anime communities
   - Use relevant hashtags

2. **Backlinks**
   - Guest posts on anime blogs
   - Forum participation
   - Resource page mentions

3. **Community Building**
   - Discord server
   - Reddit community
   - Email newsletter

### Technical SEO

1. **Site Speed**
   - Already optimized with Next.js
   - Use Vercel for hosting (edge network)
   - Compress images

2. **Mobile Optimization**
   - Responsive design (already implemented)
   - Touch-friendly buttons
   - Fast mobile loading

3. **Sitemap & Robots.txt**
   ```xml
   <!-- public/sitemap.xml -->
   <?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <url>
       <loc>https://yourdomain.com/</loc>
       <changefreq>daily</changefreq>
       <priority>1.0</priority>
     </url>
   </urlset>
   ```

---

## 🚀 Deployment

### Deploy to Netlify (Current)

1. **Build Configuration**
   \`\`\`toml
   # netlify.toml
   [build]
     command = "npm run build"
     publish = ".next"
   
   [[redirects]]
     from = "/*"
     to = "/index.html"
     status = 200
   \`\`\`

2. **Deploy via Git**
   \`\`\`bash
   git push origin main
   # Auto-deploys on push
   \`\`\`

3. **Manual Deploy**
   \`\`\`bash
   npm run build
   netlify deploy --prod
   \`\`\`

### Deploy to Vercel (Alternative)

1. **Quick Deploy**
   \`\`\`bash
   npm install -g vercel
   vercel
   \`\`\`

2. **Or via Dashboard**
   - Go to [vercel.com](https://vercel.com)
   - Import GitHub repository
   - Configure build settings
   - Deploy automatically on push

3. **Custom Domain**
   - Add domain in Vercel/Netlify settings
   - Update DNS records (CNAME or A record)
   - HTTPS enabled automatically

### Build Scripts

\`\`\`bash
# Development
npm run dev              # Start dev server

# Production
npm run build           # Build for production
npm start              # Start production server

# Deployment (PowerShell scripts)
.\build-for-manual-deploy.ps1    # Build script
.\deploy-netlify.ps1             # Netlify deploy script
.\deploy-to-netlify.ps1          # Alternative deploy
\`\`\`

---



## � Performance Metrics

### Lighthouse Scores (Target)
- **Performance**: 90+ 
- **Accessibility**: 95+
- **Best Practices**: 95+
- **SEO**: 100

### Optimization Features
- ✅ Server-side rendering (SSR) for initial load
- ✅ Image optimization with Next.js Image
- ✅ Lazy loading for below-fold content
- ✅ Dynamic imports for code splitting
- ✅ CSS optimization with Tailwind purge
- ✅ Minimal JavaScript bundle size
- ✅ Edge caching on CDN (Netlify/Vercel)
- ✅ Prefetching for navigation links
- ✅ Responsive images with srcset

## 🔒 Legal & Compliance

### Data Attribution
- ✅ All anime data sourced from **MyAnimeList** via **Jikan API v4**
- ✅ Proper attribution in footer and about pages
- ✅ No direct scraping of copyrighted content
- ✅ Links to official MyAnimeList pages

### Content Policy
- ✅ **No pirated content** - Only information and recommendations
- ✅ **No unauthorized streams** - Links to legal platforms only
- ✅ **Family-friendly** - Content suitable for general audiences
- ✅ **User-generated content moderation** (when implemented)
- ✅ **DMCA compliance** - Takedown process in place

### Privacy & Security
- ✅ HTTPS enabled via Netlify/Vercel
- ✅ No tracking without consent
- ✅ Privacy policy (to be added)
- ✅ Cookie consent (when needed)
- ✅ Secure headers configuration

---

## �️ Technical Stack

| Category | Technology |
|----------|-----------|
| **Framework** | Next.js 14 (App Router) |
| **Language** | TypeScript 5.4 |
| **Styling** | Tailwind CSS 3.4 |
| **UI Components** | Custom components with Tailwind |
| **Icons** | React Icons (Feather Icons) |
| **API** | Jikan API v4 (MyAnimeList) |
| **Image Optimization** | Next.js Image (AVIF/WebP) |
| **Deployment** | Netlify / Vercel |
| **Version Control** | Git + GitHub |

## �🔮 Roadmap & Future Enhancements

### ✅ Phase 1 - Core Features (COMPLETED)
- [x] Homepage with featured hero carousel
- [x] Anime detail pages with 6-tab navigation
- [x] Weekly schedule with smart day selection
- [x] Seasonal anime with auto-reload system
- [x] Top trending and characters sections
- [x] Character and anime search functionality
- [x] Latest anime news section
- [x] Genre exploration pages
- [x] Mobile-first responsive design
- [x] Dark theme with green accents
- [x] Smart API retry logic
- [x] Staggered loading for rate limit prevention
- [x] Mobile overflow fixes
- [x] Touch-optimized UI elements

### 🚧 Phase 2 - Enhanced UX (In Progress)
- [ ] User authentication (NextAuth.js with OAuth)
- [ ] Personal watchlist and favorites
- [ ] Watch history tracking
- [ ] User ratings and reviews system
- [ ] Comments system with moderation
- [ ] Advanced filtering (multi-genre, year range, score range)
- [ ] Sort options (popularity, score, recent)
- [ ] Infinite scroll for anime grids
- [ ] Skeleton loading states improvement
- [ ] PWA offline support
- [ ] Push notifications for new episodes

### 🔮 Phase 3 - Community Features (Planned)
- [ ] User profiles with stats
- [ ] Social features (follow users, activity feed)
- [ ] Discussion forums
- [ ] Blog/News section with CMS
- [ ] Achievement badges and gamification
- [ ] Watch party rooms
- [ ] Anime recommendation algorithm
- [ ] Export watchlist (JSON, CSV)
- [ ] Email notifications
- [ ] Discord/Telegram bot integration

### 🎯 Phase 4 - Advanced Features (Future)
- [ ] Streaming links aggregator (legal sources only)
- [ ] Episode release calendar
- [ ] Custom lists and collections
- [ ] Anime comparison tool
- [ ] Voice actor database
- [ ] Studio pages
- [ ] Anime statistics and trends
- [ ] API for third-party developers
- [ ] Mobile apps (React Native)
- [ ] Browser extensions
- [ ] Multi-language support (i18n)

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Jikan API** - Free MyAnimeList API
- **MyAnimeList** - Anime database
- **Next.js** - React framework
- **Tailwind CSS** - Styling
- **Vercel** - Hosting platform

---

## � Known Issues & Troubleshooting

### Port Already in Use
**Issue**: `Port 3000 is already in use`  
**Solution**: Next.js automatically tries ports 3001, 3002, 3003, etc. Or manually kill the process:
\`\`\`powershell
# Windows PowerShell
netstat -ano | findstr :3000
taskkill /PID <PID> /F
\`\`\`

### Jikan API Rate Limiting
**Issue**: `429 Too Many Requests`  
**Solution**: The app already implements:
- Staggered loading (100ms, 1500ms, 2000ms delays)
- Automatic retry with exponential backoff
- Per-day fallback for weekly schedule

### Image Loading Errors
**Issue**: `403 Forbidden` from MyAnimeList CDN  
**Solution**: This is normal for some images. The app handles it gracefully with fallbacks.

### Build Errors
**Issue**: Module not found or TypeScript errors  
**Solution**:
\`\`\`bash
# Clear cache and reinstall
rm -rf .next node_modules package-lock.json
npm install
npm run build
\`\`\`

## 🤝 Contributing

We welcome contributions! Here's how to get started:

### Development Workflow

1. **Fork and Clone**
   \`\`\`bash
   git clone https://github.com/YOUR_USERNAME/AniverseCommunity.git
   cd AniverseCommunity
   \`\`\`

2. **Create Feature Branch**
   \`\`\`bash
   git checkout -b feature/amazing-feature
   \`\`\`

3. **Make Changes**
   - Follow existing code style
   - Use TypeScript for type safety
   - Add comments for complex logic
   - Test on mobile and desktop

4. **Commit with Conventional Commits**
   \`\`\`bash
   git commit -m "feat: add amazing feature"
   git commit -m "fix: resolve mobile overflow issue"
   git commit -m "docs: update README"
   \`\`\`

5. **Push and Create PR**
   \`\`\`bash
   git push origin feature/amazing-feature
   # Create Pull Request on GitHub
   \`\`\`

### Code Style Guidelines

- **TypeScript**: Use interfaces for props and types
- **Components**: Functional components with hooks
- **Naming**: PascalCase for components, camelCase for functions
- **CSS**: Tailwind utility classes, avoid custom CSS
- **Comments**: Document complex logic and API calls

### Areas Needing Help

- 🎨 UI/UX improvements
- 🐛 Bug fixes and testing
- 📱 Mobile optimization
- 🌐 Internationalization (i18n)
- 📝 Documentation
- ♿ Accessibility enhancements

## 📞 Contact & Support

- **GitHub**: [MdDaudIbrahim](https://github.com/MdDaudIbrahim)
- **Repository**: [AniverseCommunity](https://github.com/MdDaudIbrahim/AniverseCommunity)
- **Issues**: [Report a bug](https://github.com/MdDaudIbrahim/AniverseCommunity/issues)
- **Discussions**: [GitHub Discussions](https://github.com/MdDaudIbrahim/AniverseCommunity/discussions)

---

## ⚖️ Legal Disclaimer

This website uses data from **MyAnimeList** via the **Jikan API v4**. All anime data, images, names, and trademarks are property of their respective owners and copyright holders. 

**This site:**
- ❌ Does NOT host or distribute copyrighted content
- ❌ Does NOT provide illegal streaming or downloads
- ✅ Provides information and recommendations only
- ✅ Links to legal sources when available
- ✅ Properly attributes all data sources

All content is used for **informational and promotional purposes** under fair use guidelines.

---

## 📜 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

**You are free to:**
- ✅ Use commercially
- ✅ Modify
- ✅ Distribute
- ✅ Private use

**Conditions:**
- 📝 Include license and copyright notice
- 📝 State changes made to the code

---

## 🙏 Acknowledgments

- **[Jikan API](https://jikan.moe/)** - Free MyAnimeList API (Thank you!)
- **[MyAnimeList](https://myanimelist.net/)** - Comprehensive anime database
- **[Next.js](https://nextjs.org/)** - Amazing React framework
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Vercel](https://vercel.com/)** - Excellent hosting platform
- **[React Icons](https://react-icons.github.io/react-icons/)** - Beautiful icon library

---

## 📈 Project Stats

![GitHub stars](https://img.shields.io/github/stars/MdDaudIbrahim/AniverseCommunity?style=social)
![GitHub forks](https://img.shields.io/github/forks/MdDaudIbrahim/AniverseCommunity?style=social)
![GitHub issues](https://img.shields.io/github/issues/MdDaudIbrahim/AniverseCommunity)
![GitHub pull requests](https://img.shields.io/github/issues-pr/MdDaudIbrahim/AniverseCommunity)
![GitHub last commit](https://img.shields.io/github/last-commit/MdDaudIbrahim/AniverseCommunity)

---

<div align="center">

### **Made with ❤️ by the anime community, for the anime community**

**⭐ Star this repo if you found it helpful!**

**🔗 [View Live Demo](https://your-domain.netlify.app)** • **📖 [Documentation](./all%20.md/)** • **🐛 [Report Bug](https://github.com/MdDaudIbrahim/AniverseCommunity/issues)**

</div>
