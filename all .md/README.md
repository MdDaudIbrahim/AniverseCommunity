# 🎌 NextAnime - Your Ultimate Anime Recommendation Hub

A modern, fast, and fully **Google AdSense-compliant** anime recommendation website built with **Next.js 14**, **TypeScript**, and the **Jikan API** (MyAnimeList data).

![AnimeVerse](https://img.shields.io/badge/Next.js-14-black) ![TypeScript](https://img.shields.io/badge/TypeScript-5.4-blue) ![License](https://img.shields.io/badge/License-MIT-green)

---

## ✨ Features

### 🎯 Core Features
- **Trending & Seasonal Anime** - Display currently airing and seasonal anime
- **Top Rated Anime** - Browse highest-rated anime of all time
- **Advanced Search** - Search by title, genre, year, rating, and more
- **Detailed Anime Pages** - Complete information including synopsis, cast, staff, and recommendations
- **Genre Filtering** - Browse anime by specific genres
- **Responsive Design** - Optimized for mobile, tablet, and desktop
- **Dark Mode Support** - Automatic theme switching

### 💰 AdSense Monetization
- **Strategic Ad Placement** - Header, sidebar, in-content, and footer ads
- **Multiple Ad Formats** - Banner ads, sidebar ads, and responsive units
- **Ad Placeholders in Dev** - Preview ad locations during development
- **Optimized for Revenue** - Ad placement based on best practices

### ⚡ Performance Optimizations
- **Server-Side Rendering (SSR)** - Fast initial page loads and SEO benefits
- **Image Optimization** - Next.js Image component with lazy loading
- **API Caching** - 1-hour cache for Jikan API responses
- **Rate Limiting** - Respects Jikan API limits (3 req/sec, 60 req/min)
- **Pagination** - Efficient data loading for large lists

### 🔍 SEO Optimized
- **Dynamic Meta Tags** - Unique titles and descriptions for each page
- **Open Graph Tags** - Social media sharing optimization
- **Structured Data** - Schema.org markup (can be added)
- **Sitemap Support** - Easy to implement XML sitemap
- **Mobile-Friendly** - Responsive design for better rankings

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** 18.x or higher
- **npm** or **yarn**
- **Google AdSense account** (for production)

### Installation

1. **Clone the repository**
   \`\`\`powershell
   git clone https://github.com/yourusername/animeverse.git
   cd animeverse
   \`\`\`

2. **Install dependencies**
   \`\`\`powershell
   npm install
   \`\`\`

3. **Set up environment variables**
   \`\`\`powershell
   cp .env.example .env
   \`\`\`

4. **Edit `.env` file**
   \`\`\`env
   NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-XXXXXXXXXXXXXXXX
   NEXT_PUBLIC_SITE_URL=https://yourdomain.com
   NEXT_PUBLIC_SITE_NAME=AnimeVerse Community
   \`\`\`

5. **Run development server**
   \`\`\`powershell
   npm run dev
   \`\`\`

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

---

## 📁 Project Structure

\`\`\`
animeverse/
├── app/                          # Next.js App Router
│   ├── anime/[id]/              # Dynamic anime detail pages
│   │   └── page.tsx
│   ├── top-anime/               # Top anime listing
│   ├── seasonal/                # Seasonal anime
│   ├── search/                  # Search results
│   ├── genres/                  # Genre pages
│   ├── layout.tsx               # Root layout with SEO
│   ├── page.tsx                 # Home page
│   └── globals.css              # Global styles
├── components/
│   ├── ads/                     # AdSense components
│   │   ├── AdSenseScript.tsx   # Script loader
│   │   ├── AdBanner.tsx        # Banner ads
│   │   └── AdSidebar.tsx       # Sidebar ads
│   ├── anime/                   # Anime components
│   │   └── AnimeCard.tsx       # Anime card component
│   ├── home/                    # Home page sections
│   │   ├── HeroSection.tsx
│   │   ├── TrendingAnime.tsx
│   │   ├── TopAnime.tsx
│   │   └── SeasonalAnime.tsx
│   ├── layout/                  # Layout components
│   │   ├── Header.tsx          # Navigation header
│   │   └── Footer.tsx          # Footer with links
│   └── ui/                      # Reusable UI components
│       └── LoadingGrid.tsx
├── lib/
│   ├── api/
│   │   └── jikan.ts            # Jikan API client
│   └── types/
│       └── anime.ts            # TypeScript types
├── public/                      # Static files
├── .env.example                 # Environment variables template
├── next.config.js               # Next.js configuration
├── tailwind.config.ts           # Tailwind CSS config
├── tsconfig.json                # TypeScript config
└── package.json
\`\`\`

---

## 🎨 Page Structure & Layout

### 1. **Home Page** (`/`)
**Layout:**
- Hero section with call-to-action buttons
- Ad banner (728x90 or responsive)
- Currently airing anime grid (12 items)
- Ad banner (horizontal)
- Top rated anime grid (12 items)
- Seasonal anime grid (12 items)
- Footer ad banner

**Components:**
- `HeroSection` - Gradient hero with CTAs
- `TrendingAnime` - Current season anime
- `TopAnime` - Top rated list
- `SeasonalAnime` - This season's releases
- `AdBanner` - Strategically placed ads

---

### 2. **Anime Details Page** (`/anime/[id]`)
**Layout:**
- Hero banner with anime cover (full-width, blurred background)
- Title, score, year, type, duration
- Ad banner
- Main content area (3/4 width):
  - Synopsis
  - Detailed information grid
  - Genres (clickable)
  - Studios
  - Character gallery
  - Recommendations
  - Bottom ad
- Sidebar (1/4 width):
  - Poster image
  - Sidebar ad (300x600 or 160x600)

**SEO Features:**
- Dynamic meta tags
- Open Graph images
- Structured data (recommended)

---

### 3. **Top Anime Page** (`/top-anime`)
**Layout:**
- Page header
- Filter options (by type, filter, rating)
- Ad banner
- Anime grid with pagination
- Sidebar ad
- Bottom ad

---

### 4. **Search Results** (`/search`)
**Layout:**
- Search query display
- Filters (genre, year, type, status, rating)
- Results count
- Ad banner
- Results grid with pagination
- No results message (if empty)

---

### 5. **Genre Pages** (`/genres` & `/genres/[id]`)
**Layout:**
- Genre selector grid (main genres page)
- Or genre-specific anime list
- Ad placement similar to top anime

---

### 6. **Seasonal Anime** (`/seasonal`)
**Layout:**
- Season/year selector
- Ad banner
- Seasonal anime grid
- Pagination

---

## 💡 AdSense Integration Guide

### Setting Up Google AdSense

1. **Apply for AdSense**
   - Go to [Google AdSense](https://www.google.com/adsense)
   - Apply with your domain
   - Wait for approval (usually 1-2 weeks)

2. **Get Your Publisher ID**
   - Format: `ca-pub-XXXXXXXXXXXXXXXX`
   - Add to `.env` file

3. **Create Ad Units**
   - Create multiple ad units in AdSense dashboard
   - Get slot IDs for each unit
   - Update slot IDs in components

### Ad Placement Strategy

#### ✅ **Recommended Placements**

1. **Header Banner** (After Hero)
   - Format: Horizontal/Responsive
   - Size: 728x90 or responsive
   - Component: `<AdBanner slot="XXXXX" />`

2. **Sidebar Ads** (Anime Detail Pages)
   - Format: Vertical
   - Size: 300x600 or 160x600
   - Component: `<AdSidebar slot="XXXXX" />`

3. **In-Content Ads** (Between Sections)
   - Format: Horizontal/Responsive
   - Component: `<AdBanner format="horizontal" />`

4. **Footer Ad** (Bottom of Pages)
   - Format: Horizontal
   - Size: 728x90 or responsive

#### ❌ **Avoid These Mistakes**

- ❌ Too many ads above the fold
- ❌ Ads that look like content
- ❌ Misleading placement
- ❌ Ads near error messages
- ❌ Auto-refreshing ads

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

### Deploy to Vercel (Recommended)

1. **Push to GitHub**
   \`\`\`powershell
   git add .
   git commit -m "Initial commit"
   git push origin main
   \`\`\`

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Add environment variables
   - Deploy!

3. **Custom Domain**
   - Add your domain in Vercel settings
   - Update DNS records
   - Enable HTTPS (automatic)

### Environment Variables in Production

Add these in Vercel dashboard:
- `NEXT_PUBLIC_ADSENSE_CLIENT_ID`
- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_SITE_NAME`

---

## 📊 Analytics Setup

### Google Analytics 4

1. Create GA4 property
2. Add tracking code to `app/layout.tsx`:

\`\`\`typescript
<Script
  src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
  strategy="afterInteractive"
/>
<Script id="google-analytics" strategy="afterInteractive">
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${GA_ID}');
  `}
</Script>
\`\`\`

---

## 🛡️ AdSense Compliance Checklist

✅ **Content Requirements**
- [x] No copyrighted videos or streams
- [x] No pirated content downloads
- [x] Clear attribution to data sources (Jikan/MAL)
- [x] Original content and reviews
- [x] Family-friendly ad placements

✅ **Technical Requirements**
- [x] Fast loading times
- [x] Mobile responsive
- [x] HTTPS enabled (via Vercel)
- [x] Privacy policy page
- [x] Contact page

✅ **Ad Implementation**
- [x] Proper AdSense script integration
- [x] Non-intrusive ad placement
- [x] Clear separation between ads and content
- [x] No excessive ads
- [x] Responsive ad units

---

## 🔮 Future Enhancements

### Phase 1 (MVP) - ✅ Complete
- [x] Home page with trending anime
- [x] Anime detail pages
- [x] Search functionality
- [x] AdSense integration
- [x] Responsive design

### Phase 2 (Coming Soon)
- [ ] User authentication (NextAuth.js)
- [ ] Watchlist/favorites
- [ ] User reviews and ratings
- [ ] Comments system
- [ ] Advanced filters

### Phase 3 (Future)
- [ ] Blog/News section
- [ ] Streaming links (legal sources)
- [ ] Email notifications
- [ ] Mobile app (React Native)
- [ ] API for third-party apps

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

## 📞 Support

- **Email:** support@animeverse.com
- **Discord:** [Join our community](https://discord.gg/animeverse)
- **Twitter:** [@AnimeVerseApp](https://twitter.com/animeverseapp)

---

## ⚖️ Legal Disclaimer

This website uses data from MyAnimeList via the Jikan API. All anime data, images, and trademarks are property of their respective owners. This site does not host or distribute any copyrighted content. All content is used for informational and promotional purposes only under fair use.

---

**Made with ❤️ by the anime community, for the anime community.**

**Star ⭐ this repo if you found it helpful!**
