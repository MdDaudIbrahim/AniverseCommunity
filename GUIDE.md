# 🎯 AnimeVerse - Complete Project Guide

## 📋 Table of Contents
1. [Getting Started](#getting-started)
2. [AdSense Setup](#adsense-setup)
3. [Deployment Guide](#deployment-guide)
4. [SEO Optimization](#seo-optimization)
5. [Content Strategy](#content-strategy)
6. [Troubleshooting](#troubleshooting)

---

## 🚀 Getting Started

### Step 1: Install Dependencies

Open PowerShell in the project directory and run:

\`\`\`powershell
npm install
\`\`\`

This will install all required packages:
- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **React Icons** - Icon library
- **SWR** - Data fetching

### Step 2: Configure Environment

1. Copy the example environment file:
   \`\`\`powershell
   cp .env.example .env
   \`\`\`

2. Edit `.env` and add your details:
   \`\`\`
   NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-XXXXXXXXXXXXXXXX
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   NEXT_PUBLIC_SITE_NAME=AnimeVerse Community
   \`\`\`

### Step 3: Run Development Server

\`\`\`powershell
npm run dev
\`\`\`

Visit: **http://localhost:3000**

### Step 4: Test the Website

- ✅ Home page loads with anime
- ✅ Click on an anime card → detail page
- ✅ Search bar works
- ✅ Navigation links work
- ✅ Responsive on mobile (use DevTools)
- ✅ Ad placeholders visible

---

## 💰 AdSense Setup

### Prerequisites
- Website must be deployed and live
- Original content (reviews, articles)
- Privacy Policy page
- Contact page
- At least 20-30 pages of content

### Step 1: Apply for AdSense

1. Go to [Google AdSense](https://www.google.com/adsense/start/)
2. Click "Get Started"
3. Enter your website URL: `https://yourdomain.com`
4. Select your account type (Individual/Business)
5. Accept terms and conditions

### Step 2: Add AdSense Code

1. Copy the AdSense code from your dashboard
2. It looks like:
   \`\`\`html
   <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
        crossorigin="anonymous"></script>
   \`\`\`

3. Add your Publisher ID to `.env`:
   \`\`\`
   NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-XXXXXXXXXXXXXXXX
   \`\`\`

### Step 3: Create Ad Units

1. In AdSense dashboard, go to **Ads** → **By site** → **New ad unit**

2. Create these ad units:

   **Header Banner**
   - Type: Display ads
   - Size: Responsive
   - Name: "Header Banner"

   **Sidebar Ad**
   - Type: Display ads
   - Size: Fixed (300x600 or 160x600)
   - Name: "Sidebar Ad"

   **In-Content Ad**
   - Type: In-article
   - Size: Responsive
   - Name: "In-Content"

3. Copy each **Ad Unit ID** (data-ad-slot value)

### Step 4: Update Ad Slots in Code

Find all `<AdBanner>` and `<AdSidebar>` components and update the `slot` prop:

**Example in `app/page.tsx`:**
\`\`\`typescript
<AdBanner 
  slot="1234567890"  // Replace with your actual slot ID
  format="horizontal"
/>
\`\`\`

### Step 5: Wait for Approval

- AdSense reviews your site (1-2 weeks)
- Ensure you have:
  - ✅ Privacy Policy
  - ✅ Original content
  - ✅ Clean navigation
  - ✅ No copyrighted material
  - ✅ HTTPS enabled

---

## 🌐 Deployment Guide

### Deploy to Vercel (Recommended)

#### Step 1: Create GitHub Repository

\`\`\`powershell
# Initialize git
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit"

# Create repo on GitHub, then:
git remote add origin https://github.com/yourusername/animeverse.git
git branch -M main
git push -u origin main
\`\`\`

#### Step 2: Deploy to Vercel

1. Go to [Vercel](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Configure:
   - **Framework Preset:** Next.js
   - **Root Directory:** ./
   - **Build Command:** `npm run build`
   - **Output Directory:** `.next`

5. Add Environment Variables:
   - `NEXT_PUBLIC_ADSENSE_CLIENT_ID`
   - `NEXT_PUBLIC_SITE_URL`
   - `NEXT_PUBLIC_SITE_NAME`

6. Click "Deploy"

#### Step 3: Add Custom Domain

1. In Vercel project settings → **Domains**
2. Add your domain: `yourdomain.com`
3. Update DNS records (Vercel provides instructions)
4. Wait for DNS propagation (5-30 minutes)

---

## 🔍 SEO Optimization

### Must-Have Pages

Create these pages for better SEO and AdSense approval:

#### 1. Privacy Policy (`/privacy`)

\`\`\`typescript
// app/privacy/page.tsx
export default function Privacy() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
      <div className="prose dark:prose-invert">
        <p>Last updated: {new Date().toLocaleDateString()}</p>
        
        <h2>Information We Collect</h2>
        <p>We collect information you provide directly to us...</p>
        
        <h2>Google AdSense</h2>
        <p>We use Google AdSense to display ads. Google may use cookies...</p>
        
        {/* Add full privacy policy content */}
      </div>
    </div>
  );
}
\`\`\`

#### 2. Terms of Service (`/terms`)

#### 3. About Page (`/about`)

#### 4. Contact Page (`/contact`)

### SEO Checklist

- [x] Dynamic meta tags (already implemented)
- [ ] XML sitemap
- [ ] robots.txt
- [ ] Structured data (Schema.org)
- [ ] Alt text for all images
- [ ] Internal linking
- [ ] Fast page speed (<3s load time)
- [ ] Mobile-friendly
- [ ] HTTPS enabled

### Create Sitemap

\`\`\`typescript
// app/sitemap.ts
import { MetadataRoute } from 'next'
import { getTopAnime } from '@/lib/api/jikan'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com'
  
  // Get top anime for sitemap
  const { data: anime } = await getTopAnime(1, 100)
  
  const animeUrls = anime.map((item) => ({
    url: \`\${baseUrl}/anime/\${item.mal_id}\`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: \`\${baseUrl}/top-anime\`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: \`\${baseUrl}/seasonal\`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...animeUrls,
  ]
}
\`\`\`

### Robots.txt

\`\`\`typescript
// app/robots.ts
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com'
  
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/api/',
    },
    sitemap: \`\${baseUrl}/sitemap.xml\`,
  }
}
\`\`\`

---

## 📝 Content Strategy

### Week 1-2: Foundation Content

Create 20-30 initial pages:

1. **10 Genre Pages**
   - Action anime recommendations
   - Romance anime recommendations
   - Comedy anime recommendations
   - etc.

2. **10 List Articles**
   - Top 10 Action Anime of All Time
   - Best Anime for Beginners
   - Underrated Anime You Should Watch
   - etc.

3. **5 Guide Articles**
   - What is Anime? A Beginner's Guide
   - How to Choose Your Next Anime
   - Anime Genres Explained
   - etc.

### Ongoing Content

**Daily:**
- Share new anime on social media
- Update seasonal anime list

**Weekly:**
- 1-2 blog posts (800-1500 words)
- 1 top 10 list
- 1 anime review

**Monthly:**
- Season preview
- Month in review
- Trending anime report

### Content Ideas

1. **Seasonal Content**
   - "Top 10 Anime of Winter 2025"
   - "Must-Watch Shows This Season"
   - "Hidden Gems of Fall 2024"

2. **Comparison Articles**
   - "Attack on Titan vs. Demon Slayer"
   - "Sub vs. Dub: Which is Better?"
   - "Manga vs. Anime: Key Differences"

3. **Educational Content**
   - "Understanding Japanese Honorifics"
   - "Anime Genres Explained"
   - "History of Anime"

4. **Listicles** (SEO Gold)
   - "50 Best Anime of All Time"
   - "Top 20 Anime Movies"
   - "15 Anime Like Naruto"

---

## 🐛 Troubleshooting

### Common Issues

#### 1. "Module not found" errors

\`\`\`powershell
# Delete node_modules and reinstall
rm -r node_modules
rm package-lock.json
npm install
\`\`\`

#### 2. Images not loading

Check `next.config.js`:
- Ensure image domains are listed
- Verify image URLs are correct

#### 3. API rate limit errors

The Jikan API has strict limits:
- 3 requests per second
- 60 requests per minute

Solution: Implemented automatic rate limiting in `lib/api/jikan.ts`

#### 4. Ads not showing

- ✅ Check if `NEXT_PUBLIC_ADSENSE_CLIENT_ID` is set
- ✅ Ads only show in production mode
- ✅ AdSense account must be approved
- ✅ Site must be deployed (not localhost)

#### 5. Build errors

\`\`\`powershell
# Clear Next.js cache
rm -r .next

# Rebuild
npm run build
\`\`\`

#### 6. TypeScript errors

The compile errors you see are expected before running `npm install`. They'll disappear once dependencies are installed.

---

## 📊 Analytics Setup

### Google Analytics 4

1. Create GA4 property at [analytics.google.com](https://analytics.google.com)

2. Add to `app/layout.tsx`:

\`\`\`typescript
import Script from 'next/script'

// In <head>
<Script
  src={\`https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX\`}
  strategy="afterInteractive"
/>
<Script id="google-analytics" strategy="afterInteractive">
  {\`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX');
  \`}
</Script>
\`\`\`

---

## 🎨 Customization

### Change Colors

Edit `tailwind.config.ts`:

\`\`\`typescript
colors: {
  primary: {
    DEFAULT: '#3B82F6',  // Change this
    dark: '#1E40AF',
    light: '#60A5FA',
  },
  // ... other colors
}
\`\`\`

### Change Fonts

Edit `app/layout.tsx`:

\`\`\`typescript
import { Poppins } from "next/font/google";

const poppins = Poppins({ 
  subsets: ["latin"],
  weight: ['400', '600', '700']
});
\`\`\`

---

## 📈 Growth Strategies

### Month 1: Launch
- Deploy website
- Create 30 initial pages
- Apply for AdSense
- Submit to Google Search Console
- Share on social media

### Month 2: Content
- 10+ blog posts
- Start email newsletter
- Engage on Reddit (r/anime)
- Guest post on anime blogs

### Month 3: Optimization
- Analyze GA4 data
- Optimize top pages
- A/B test ad placements
- Improve loading speed

### Month 4+: Scale
- User features (watchlist)
- Community building
- Partnerships
- Influencer outreach

---

## 🤝 Need Help?

- **Documentation:** See README.md and ROADMAP.md
- **Issues:** Open a GitHub issue
- **Email:** support@animeverse.com
- **Discord:** Join our community server

---

**Good luck with your anime website! 🎌🚀**
