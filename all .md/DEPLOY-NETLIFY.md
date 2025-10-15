# 🚀 Deploy to Netlify - Complete Guide

## Quick Start (3 Easy Steps)

### Method 1: Deploy via Netlify Website (Easiest)

#### Step 1: Prepare Your Project
```bash
# Make sure your project builds successfully
npm run build
```

#### Step 2: Create Git Repository (if not already done)
```bash
# Initialize git
git init

# Add all files
git add .

# Commit
git commit -m "Ready for Netlify deployment"

# Create a new repository on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git branch -M main
git push -u origin main
```

#### Step 3: Deploy on Netlify
1. Go to [https://www.netlify.com](https://www.netlify.com)
2. Click **"Sign up"** (use GitHub account for easier setup)
3. Click **"Add new site"** → **"Import an existing project"**
4. Choose **"GitHub"** and authorize Netlify
5. Select your anime website repository
6. Configure build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `.next`
   - **Environment variables**: (optional, add later)
7. Click **"Deploy site"**

✅ **Done!** Your site will be live at `random-name.netlify.app` in 2-3 minutes.

---

## Method 2: Deploy via Netlify CLI (For Advanced Users)

### Step 1: Install Netlify CLI
```bash
npm install -g netlify-cli
```

### Step 2: Login to Netlify
```bash
netlify login
```
This opens a browser window to authorize.

### Step 3: Initialize Site
```bash
netlify init
```
Follow the prompts:
- Create & configure a new site
- Choose your team
- Set site name
- Build command: `npm run build`
- Publish directory: `.next`

### Step 4: Deploy
```bash
# Deploy to draft URL (for testing)
netlify deploy

# Deploy to production
netlify deploy --prod
```

---

## Method 3: Drag & Drop (No Git Required)

### Step 1: Build Your Project
```bash
npm run build
```

### Step 2: Deploy Manually
1. Go to [https://app.netlify.com/drop](https://app.netlify.com/drop)
2. Drag your `.next` folder into the drop zone
3. Wait for deployment (2-3 minutes)

⚠️ **Note**: This method doesn't support automatic updates. Better to use Method 1 with Git.

---

## 📋 Configuration Files Included

### `netlify.toml` (Already Created)
Located at the root of your project. This file tells Netlify how to build and configure your site.

**Key settings:**
- Build command: `npm run build`
- Publish directory: `.next`
- Next.js plugin enabled
- Security headers configured
- Cache optimization

---

## 🔧 Important Configuration

### 1. Environment Variables

After deployment, add these in Netlify Dashboard:

**Go to**: Site settings → Environment variables → Add variable

```
# Optional: Add your AdSense ID
NEXT_PUBLIC_ADSENSE_ID=ca-pub-XXXXXXXXXXXXXXXX

# Optional: Add any API keys if needed
NEXT_PUBLIC_API_URL=https://api.jikan.moe/v4
```

### 2. Custom Domain (Optional)

**Free subdomain:**
- Site settings → Domain management → Options → Edit site name
- Change to: `youranimsite.netlify.app`

**Custom domain:**
- Site settings → Domain management → Add custom domain
- Follow DNS configuration instructions
- Example: `www.youranimedomain.com`

---

## 📦 Pre-Deployment Checklist

### Before deploying, make sure:

- [x] `npm run build` completes without errors
- [x] All pages load correctly on localhost
- [x] Images display properly
- [x] Navigation links work
- [x] Mobile responsive design works
- [x] AdSense placeholders are ready (add real ID later)
- [x] No console errors in browser
- [x] `.gitignore` includes `.next`, `node_modules`, `.env*`

### Required Files:
- [x] `package.json` - Dependencies and scripts
- [x] `next.config.js` - Next.js configuration
- [x] `netlify.toml` - Netlify configuration
- [x] `.gitignore` - Files to exclude from Git

---

## 🐛 Troubleshooting

### Build Fails on Netlify

**Error: "Build exceeded maximum allowed runtime"**
```toml
# Add to netlify.toml
[build]
  command = "npm run build"
  publish = ".next"
  
[build.environment]
  NODE_VERSION = "18"
```

**Error: "Module not found"**
```bash
# Make sure all dependencies are in package.json
npm install

# Commit updated package-lock.json
git add package-lock.json
git commit -m "Update dependencies"
git push
```

**Error: "Image optimization error"**
- This is normal for external images (MyAnimeList CDN)
- Images from external domains work in production
- You can ignore these warnings

### Site Loads But Shows Errors

**Images not loading:**
1. Check `next.config.js` has correct image domains
2. Verify URLs in `fallbackData.ts` are correct
3. Check browser console for CORS errors

**API rate limiting:**
- This is expected with free Jikan API
- Fallback data will display correctly
- Consider upgrading to paid API for production

**CSS not loading:**
1. Clear cache: Site settings → Build & deploy → Clear cache
2. Redeploy site
3. Hard refresh browser (Ctrl+Shift+R)

---

## 🚀 Deployment Steps (Detailed)

### Using GitHub + Netlify (Recommended)

#### 1. Create GitHub Repository

**Option A: Via GitHub Website**
1. Go to [https://github.com/new](https://github.com/new)
2. Repository name: `anime-recommendation-site` (or your choice)
3. Description: "AdSense-ready anime recommendation website"
4. Make it **Public** or **Private**
5. Don't initialize with README (we have one)
6. Click **"Create repository"**

**Option B: Via GitHub CLI**
```bash
gh repo create anime-recommendation-site --public --source=. --push
```

#### 2. Push Your Code to GitHub

```bash
# Initialize git (if not done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Anime recommendation website"

# Add remote (replace with your URL)
git remote add origin https://github.com/YOUR_USERNAME/anime-recommendation-site.git

# Push to GitHub
git branch -M main
git push -u origin main
```

#### 3. Connect to Netlify

1. **Sign up/Login**: [https://app.netlify.com](https://app.netlify.com)
2. Click **"Add new site"** button
3. Choose **"Import an existing project"**
4. Select **"Deploy with GitHub"**
5. Authorize Netlify to access your GitHub
6. Select your repository: `anime-recommendation-site`

#### 4. Configure Build Settings

Netlify should auto-detect Next.js, but verify:

```
Build command: npm run build
Publish directory: .next
Environment: Node 18.x
```

**Advanced settings** (optional):
- Functions directory: `netlify/functions`
- Environment variables: (add after deployment)

#### 5. Deploy!

Click **"Deploy site"** button.

**Deployment process:**
- ⏳ Building site (2-4 minutes)
- 📦 Optimizing assets
- 🚀 Publishing to CDN
- ✅ Site is live!

---

## 🌐 After Deployment

### Your Site is Live! 🎉

**Your URL**: `https://random-name-12345.netlify.app`

### Next Steps:

#### 1. Change Site Name
```
Site settings → General → Site details → Change site name
New name: youranimsite
Result: https://youranimsite.netlify.app
```

#### 2. Enable HTTPS (Automatic)
- Netlify automatically provisions SSL certificate
- Your site is HTTPS by default
- No configuration needed

#### 3. Add AdSense
```
Site settings → Environment variables → Add:
NEXT_PUBLIC_ADSENSE_ID = ca-pub-YOUR-ID-HERE
```
Then redeploy.

#### 4. Test Your Site
- ✅ Homepage loads
- ✅ All navigation pages work
- ✅ Carousel auto-plays
- ✅ Images display
- ✅ Mobile responsive
- ✅ Fast loading times

---

## 📊 Netlify Dashboard Overview

### Key Sections:

**Deploys**
- View all deployments
- See build logs
- Rollback to previous versions

**Site settings**
- Change site name
- Configure custom domain
- Set environment variables
- Manage build settings

**Domain management**
- Add custom domain
- Configure DNS
- Set up redirects

**Build & deploy**
- Configure build settings
- Set deploy notifications
- Manage deploy hooks

**Analytics** (Pro plan)
- Traffic statistics
- Popular pages
- Performance metrics

---

## 🔄 Continuous Deployment

Once connected to GitHub, deployment is automatic:

```bash
# Make changes to your code
# ... edit files ...

# Commit and push
git add .
git commit -m "Update carousel animations"
git push

# Netlify automatically:
# 1. Detects the push
# 2. Runs npm run build
# 3. Deploys new version
# 4. Your site updates in 2-3 minutes!
```

**No manual deployment needed!** Just push to GitHub.

---

## 💰 Pricing

### Free Tier (Perfect for You!)
- ✅ Unlimited personal sites
- ✅ 100 GB bandwidth/month
- ✅ 300 build minutes/month
- ✅ Automatic HTTPS
- ✅ Continuous deployment
- ✅ Custom domain support
- ✅ Form handling
- ✅ Instant rollbacks

### Pro Tier ($19/month)
- Everything in Free +
- Analytics
- Background functions
- Role-based access
- Password protection

**You only need the Free tier for this project!** ✨

---

## 📱 Mobile App (Netlify App)

Download the Netlify mobile app:
- [iOS App Store](https://apps.apple.com/app/netlify/id1440324471)
- [Google Play Store](https://play.google.com/store/apps/details?id=com.netlify.mobile)

**Features:**
- Monitor site status
- View analytics
- Deploy from phone
- Get notifications

---

## 🎯 Performance Optimization

Netlify provides automatic optimizations:

### Asset Optimization
- ✅ Automatic image compression
- ✅ CSS minification
- ✅ JavaScript bundling
- ✅ Brotli compression

### CDN Distribution
- ✅ Global CDN (140+ locations)
- ✅ Automatic caching
- ✅ Fast worldwide access
- ✅ DDoS protection

### Prerendering
- ✅ Static page generation
- ✅ Fast initial load
- ✅ SEO friendly
- ✅ Better performance scores

---

## 🔒 Security

Netlify provides free security features:

- ✅ **HTTPS**: Automatic SSL certificates
- ✅ **DDoS protection**: Built-in
- ✅ **Security headers**: Configured in netlify.toml
- ✅ **Access control**: IP restrictions (Pro)
- ✅ **Form spam filtering**: Included

---

## 📈 Monitor Your Site

### Build Status Badge

Add to your README:
```markdown
[![Netlify Status](https://api.netlify.com/api/v1/badges/YOUR-SITE-ID/deploy-status)](https://app.netlify.com/sites/YOUR-SITE-NAME/deploys)
```

### Uptime Monitoring

Use external services:
- [UptimeRobot](https://uptimerobot.com) (Free)
- [StatusCake](https://www.statuscake.com) (Free tier)

---

## 🎓 Learning Resources

- [Netlify Docs](https://docs.netlify.com)
- [Next.js on Netlify](https://docs.netlify.com/frameworks/next-js/overview/)
- [Netlify Blog](https://www.netlify.com/blog/)
- [Community Forum](https://answers.netlify.com)

---

## ✅ Final Checklist

Before going live:

- [ ] Site builds successfully locally
- [ ] All pages tested and working
- [ ] Images loading correctly
- [ ] Mobile responsive verified
- [ ] AdSense placeholders ready
- [ ] GitHub repository created
- [ ] Code pushed to GitHub
- [ ] Netlify account created
- [ ] Site deployed successfully
- [ ] Custom site name set
- [ ] Environment variables added
- [ ] Site tested on mobile device
- [ ] Site tested on multiple browsers
- [ ] Share site with friends! 🎉

---

## 🚀 Quick Deploy Command Reference

```bash
# First time setup
npm run build                          # Test build
git init                               # Initialize Git
git add .                              # Stage files
git commit -m "Initial commit"         # Commit
git push -u origin main                # Push to GitHub

# Future updates
git add .                              # Stage changes
git commit -m "Update carousel"        # Commit with message
git push                               # Push (auto-deploys!)

# Netlify CLI commands
netlify login                          # Login to Netlify
netlify init                           # Connect site
netlify deploy                         # Deploy to draft
netlify deploy --prod                  # Deploy to production
netlify open                           # Open dashboard
```

---

## 🎉 Congratulations!

Your anime recommendation website is now:
- ✅ **Live on the internet**
- ✅ **Accessible worldwide**
- ✅ **HTTPS secured**
- ✅ **Auto-deploying on updates**
- ✅ **Optimized for performance**
- ✅ **Ready for AdSense approval**

**Your site URL**: `https://yoursite.netlify.app`

Share it with friends and start applying for Google AdSense! 🚀

---

## 💬 Need Help?

- **Netlify Support**: [support.netlify.com](https://support.netlify.com)
- **Community Forum**: [answers.netlify.com](https://answers.netlify.com)
- **Discord**: [Netlify Discord](https://discord.com/invite/netlify)

---

**Happy Deploying! 🌟**
