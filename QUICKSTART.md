# ⚡ Quick Start Guide

Get your anime website running in 5 minutes!

## 🎯 Quick Setup

### 1. Install Dependencies (2 minutes)

Open PowerShell in this directory and run:

\`\`\`powershell
npm install
\`\`\`

### 2. Configure Environment (1 minute)

Copy the example environment file:

\`\`\`powershell
Copy-Item .env.example .env
\`\`\`

Optional: Edit `.env` to add your Google AdSense ID (you can do this later)

### 3. Run Development Server (30 seconds)

\`\`\`powershell
npm run dev
\`\`\`

### 4. Open in Browser (30 seconds)

Visit: **http://localhost:3000** 🎉

---

## ✅ What You Should See

### Home Page
- ✨ Beautiful gradient hero section
- 📺 Currently airing anime
- ⭐ Top rated anime
- 🎬 Seasonal anime
- 📱 Fully responsive design

### Features Working
- [x] Browse anime with images and ratings
- [x] Click any anime → View detailed information
- [x] Search functionality (in header)
- [x] AdSense ad placeholders (gray boxes in dev mode)
- [x] Fast loading with Next.js
- [x] Dark mode support

---

## 🚀 Next Steps

### For Development

1. **Explore the Code**
   - Check out `app/page.tsx` for the home page
   - Look at `components/` for reusable components
   - Review `lib/api/jikan.ts` for API integration

2. **Customize Colors**
   - Edit `tailwind.config.ts`
   - Change primary/secondary colors

3. **Add More Features**
   - See `ROADMAP.md` for planned features
   - Check `GUIDE.md` for detailed instructions

### For Production

1. **Read the Full Documentation**
   - `README.md` - Complete overview
   - `GUIDE.md` - Step-by-step deployment
   - `ROADMAP.md` - Future features

2. **Apply for Google AdSense**
   - You need a live domain
   - Create content pages (privacy, terms, about)
   - Wait for approval (1-2 weeks)

3. **Deploy to Vercel**
   - Push code to GitHub
   - Connect to Vercel
   - Add custom domain
   - Deploy! (takes 2 minutes)

---

## 📚 File Structure

\`\`\`
Key Files:
├── app/
│   ├── page.tsx              ← Home page (START HERE)
│   ├── layout.tsx            ← Main layout with header/footer
│   └── anime/[id]/page.tsx   ← Anime detail pages
├── components/
│   ├── home/                 ← Home page sections
│   ├── ads/                  ← AdSense components
│   └── anime/                ← Anime card component
├── lib/
│   ├── api/jikan.ts          ← API integration
│   └── types/anime.ts        ← TypeScript types
└── README.md                 ← Full documentation
\`\`\`

---

## 🎨 Customization Quick Tips

### Change Site Name

Edit `app/layout.tsx`:
\`\`\`typescript
title: "Your Site Name - Anime Recommendations"
\`\`\`

Edit `components/layout/Header.tsx`:
\`\`\`typescript
<span>Your Site Name</span>
\`\`\`

### Change Theme Colors

Edit `tailwind.config.ts`:
\`\`\`typescript
primary: '#3B82F6',  // Your color here
secondary: '#8B5CF6',  // Your color here
\`\`\`

### Add Google AdSense

1. Get approved by Google AdSense
2. Add your Publisher ID to `.env`:
   \`\`\`
   NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-XXXXXXXXXXXXXXXX
   \`\`\`
3. Update ad slot IDs in components

---

## ❓ Troubleshooting

### Issue: TypeScript Errors

**Normal!** They disappear after running \`npm install\`

### Issue: API Not Working

Check your internet connection. The Jikan API needs to be accessible.

### Issue: Images Not Loading

This is normal on first load. Images are fetched from MyAnimeList CDN.

### Issue: Ads Not Showing

Ads only appear in production after AdSense approval. In development, you'll see gray placeholder boxes.

---

## 🆘 Get Help

1. **Check Documentation**
   - README.md - Overview
   - GUIDE.md - Detailed guide
   - ROADMAP.md - Future plans

2. **Common Questions**
   - How to deploy? → See GUIDE.md "Deployment Guide"
   - How to get AdSense? → See GUIDE.md "AdSense Setup"
   - How to add features? → See ROADMAP.md

3. **Still Stuck?**
   - Open an issue on GitHub
   - Check Next.js documentation
   - Google the error message

---

## 🎉 You're All Set!

Your anime recommendation website is ready. Now:

1. ✅ Explore the website at http://localhost:3000
2. ✅ Read through the code to understand it
3. ✅ Customize colors and content
4. ✅ Deploy to Vercel when ready
5. ✅ Apply for Google AdSense
6. ✅ Start making money! 💰

---

## 📖 Important Documents

| File | Purpose |
|------|---------|
| `README.md` | Complete project overview |
| `GUIDE.md` | Step-by-step deployment & SEO |
| `ROADMAP.md` | Future features roadmap |
| `QUICKSTART.md` | This file - get started fast |
| `LICENSE` | MIT License |

---

**Happy coding! 🚀**

If this project helps you, please star ⭐ it on GitHub!
