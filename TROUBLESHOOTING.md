# 🔧 Troubleshooting Guide

## Common Issues and Solutions

### Issue: "Failed to load trending anime" / API Errors

**Symptoms:**
- Error messages showing "Failed to load trending anime"
- "Failed to load top anime"
- "Failed to load seasonal anime"
- Red error boxes on the homepage

**Causes:**
1. **Jikan API Rate Limiting** - The API has strict limits (3 req/sec, 60 req/min)
2. **Network Issues** - Connection problems
3. **API Downtime** - Jikan API maintenance

**Solutions:**

#### ✅ **Solution 1: Refresh the Page**
The simplest fix - just refresh your browser. The components now have automatic rate limiting with delays.

#### ✅ **Solution 2: Wait and Retry**
If you see the error:
1. Wait 10-15 seconds
2. Click the "Try again" button in the error message
3. Or refresh the page

#### ✅ **Solution 3: Check API Status**
Visit: https://jikan.moe/ to check if the API is online

#### ✅ **Solution 4: Clear Browser Cache**
```
Chrome/Edge: Ctrl + Shift + Delete
Firefox: Ctrl + Shift + Del
```
Then refresh the page.

---

## Rate Limiting Explained

The Jikan API has these limits:
- **3 requests per second**
- **60 requests per minute**

Our fix:
- ✅ Added automatic delays between requests
- ✅ First section loads immediately
- ✅ Second section loads after 1 second delay
- ✅ Third section loads after 2 second delay

This ensures we never hit the rate limit!

---

## Development Mode Issues

### TypeScript Errors (Red Squiggles)

**Before running `npm install`:**
- You'll see TypeScript errors
- This is NORMAL
- They disappear after installing dependencies

**Solution:**
```powershell
npm install
```

### Images Not Loading

**Issue:** Anime images show broken
**Cause:** Next.js image optimization
**Solution:** Restart dev server
```powershell
# Stop server (Ctrl+C)
npm run dev
```

### Ad Placeholders

**Issue:** Gray boxes instead of ads
**Cause:** Development mode
**Expected:** Ads only show in production after AdSense approval

---

## Build Errors

### "Module not found" errors

**Solution:**
```powershell
# Delete node_modules and reinstall
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json
npm install
```

### ".next" Cache Issues

**Solution:**
```powershell
# Clear Next.js cache
Remove-Item -Recurse -Force .next
npm run dev
```

### Build Fails

**Solution:**
```powershell
# Clean build
Remove-Item -Recurse -Force .next
npm run build
```

---

## Deployment Issues

### Vercel Build Fails

**Check:**
1. All environment variables added
2. Node version (18.x or higher)
3. Build command is `npm run build`
4. Output directory is `.next`

**Solution:**
```
In Vercel dashboard:
Settings → General → Node.js Version → 18.x
```

### Images Not Loading on Production

**Check `next.config.js`:**
```javascript
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'cdn.myanimelist.net',
      pathname: '/**',
    },
  ],
},
```

---

## API-Specific Issues

### 429 Too Many Requests

**Error:** "429 Too Many Requests"
**Cause:** Hit rate limit
**Solution:** Wait 60 seconds, then try again

### 503 Service Unavailable

**Error:** API returns 503
**Cause:** Jikan API is down
**Solution:** 
1. Check https://jikan.moe/
2. Wait for service to restore
3. Use mock data temporarily (see below)

### Using Mock Data (Emergency)

If API is down, create mock data:

```typescript
// components/home/TrendingAnime.tsx
const MOCK_DATA = [
  {
    mal_id: 1,
    title: "Attack on Titan",
    images: {
      webp: { large_image_url: "https://cdn.myanimelist.net/images/anime/..." }
    },
    score: 9.0,
    // ... more fields
  }
];

// In useEffect:
setAnime(MOCK_DATA);
```

---

## Browser-Specific Issues

### Chrome/Edge
**Issue:** CORS errors
**Solution:** Use dev mode, not file:// protocol

### Firefox
**Issue:** Slow loading
**Solution:** Disable tracking protection for localhost

### Safari
**Issue:** Fetch errors
**Solution:** Enable cross-origin requests in Develop menu

---

## Performance Issues

### Slow Loading

**Causes:**
1. Too many API calls
2. Large images
3. No caching

**Solutions:**
1. ✅ Rate limiting already implemented
2. ✅ Next.js Image optimization enabled
3. ✅ API responses cached for 1 hour

### Memory Leaks

**Symptom:** Browser becomes slow
**Solution:** Restart browser and dev server

---

## Production Checklist

Before deploying:

- [ ] `npm run build` succeeds
- [ ] All environment variables set
- [ ] Images load correctly
- [ ] No console errors
- [ ] Mobile responsive
- [ ] AdSense script added
- [ ] Privacy policy created
- [ ] Terms of service created

---

## Getting Help

### Check These First:
1. ✅ `npm install` completed successfully
2. ✅ `.env` file exists (copy from `.env.example`)
3. ✅ Dev server running (`npm run dev`)
4. ✅ No TypeScript errors in terminal
5. ✅ Internet connection working

### Still Having Issues?

1. **Check Documentation:**
   - README.md
   - GUIDE.md
   - This file

2. **Check Browser Console:**
   - F12 → Console tab
   - Look for error messages
   - Share error with support

3. **Check Terminal:**
   - Look for error messages
   - Check for warnings

4. **GitHub Issues:**
   - Search existing issues
   - Create new issue with:
     - Error message
     - Steps to reproduce
     - Screenshot
     - Your setup (OS, Node version)

5. **Community Help:**
   - Stack Overflow
   - Next.js Discord
   - Reddit r/nextjs

---

## Quick Fixes Summary

| Issue | Quick Fix |
|-------|-----------|
| API errors | Wait 10s, refresh page |
| TypeScript errors | `npm install` |
| Build fails | Delete `.next`, rebuild |
| Images broken | Restart dev server |
| Slow loading | Check API status |
| Rate limit hit | Wait 60 seconds |
| Ads not showing | Normal in dev mode |

---

## Preventive Measures

### For Development:
1. Don't refresh too quickly (rate limits)
2. Clear cache if things look weird
3. Restart dev server daily
4. Keep dependencies updated

### For Production:
1. Monitor API usage
2. Set up error tracking (Sentry)
3. Use caching aggressively
4. Have error boundaries
5. Monitor uptime

---

## Advanced Debugging

### Enable Debug Mode

Add to `.env`:
```
NEXT_PUBLIC_DEBUG=true
```

### Check Network Requests

Chrome DevTools → Network tab:
1. Filter by "jikan.moe"
2. Check status codes
3. View response times
4. Check response data

### Check Vercel Logs

```powershell
# Install Vercel CLI
npm i -g vercel

# View logs
vercel logs
```

---

## Contact Support

If you're still stuck after trying everything:

**Email:** support@animeverse.com
**Include:**
- Error message (full text)
- Screenshot
- Browser console log
- Steps to reproduce
- Your environment (OS, Node version, Browser)

---

**Most issues resolve with:** `npm install` + page refresh ✅
