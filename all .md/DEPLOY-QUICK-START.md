# 🚀 Quick Start: Deploy to Netlify in 3 Steps

## Method 1: Via Netlify Website (Easiest - No CLI Required)

### Step 1: Create GitHub Repository
1. Go to https://github.com/new
2. Repository name: `anime-website`
3. Make it **Public**
4. Click **"Create repository"**

### Step 2: Push Your Code
```powershell
# In your project folder (where you are now)
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/anime-website.git
git branch -M main
git push -u origin main
```

### Step 3: Deploy on Netlify
1. Go to https://www.netlify.com
2. Click **"Sign up with GitHub"**
3. Click **"Add new site"** → **"Import an existing project"**
4. Choose **GitHub** and select your `anime-website` repository
5. Settings (should auto-fill):
   - Build command: `npm run build`
   - Publish directory: `.next`
6. Click **"Deploy site"**

✅ **DONE!** Your site is live in 2-3 minutes at `yoursite.netlify.app`

---

## Method 2: Use PowerShell Script (Even Easier!)

We created a deployment script for you. Just run:

```powershell
.\deploy-netlify.ps1
```

This will:
- ✅ Test your build
- ✅ Show git status
- ✅ Help you commit changes
- ✅ Push to GitHub
- ✅ Trigger Netlify deployment

---

## Important Files Created

1. **`netlify.toml`** - Netlify configuration (already in your project)
2. **`DEPLOY-NETLIFY.md`** - Full deployment guide with troubleshooting
3. **`deploy-netlify.ps1`** - Automated deployment script
4. **`.gitignore`** - Already configured to exclude unnecessary files

---

## Quick Commands Reference

```powershell
# Test build locally (do this first!)
npm run build

# Initialize Git and push to GitHub
git init
git add .
git commit -m "Ready for deployment"
git remote add origin YOUR_GITHUB_URL
git push -u origin main

# Future updates (after initial setup)
git add .
git commit -m "Updated carousel"
git push
# Netlify automatically deploys!
```

---

## After Deployment

### Change Site Name
1. Go to Site settings → Site details
2. Click "Change site name"
3. Enter: `youranimename`
4. Result: `https://youranimename.netlify.app`

### Add AdSense (Optional)
1. Site settings → Environment variables
2. Add: `NEXT_PUBLIC_ADSENSE_ID` = `ca-pub-YOUR-ID`
3. Redeploy

---

## ⚡ Super Quick Start (5 Minutes)

```powershell
# 1. Build test
npm run build

# 2. GitHub setup
git init
git add .
git commit -m "Initial commit"

# 3. Create repo on GitHub.com, then:
git remote add origin YOUR_GITHUB_URL
git push -u origin main

# 4. Go to Netlify.com
# - Sign up with GitHub
# - Import your repository
# - Deploy!
```

✅ **Your anime website will be live worldwide in 3 minutes!**

---

## Need More Help?

- 📖 **Full Guide**: Open `DEPLOY-NETLIFY.md`
- 🤖 **Auto Script**: Run `.\deploy-netlify.ps1`
- 💬 **Netlify Help**: https://www.netlify.com/support/

---

## ✨ What You Get

- 🌐 Live website with custom URL
- 🔒 Free HTTPS/SSL certificate
- 🚀 Auto-deploys on every push
- 📊 CDN for fast worldwide access
- 💰 100% FREE (Free tier is enough!)

**Your anime website will be production-ready and accessible worldwide!** 🎉
