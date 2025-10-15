# Debugging Weekly Schedule

## How to Check if It's Working

### 1. Open Browser Developer Tools
- Press `F12` or right-click and select "Inspect"
- Go to the **Console** tab

### 2. Look for These Log Messages

#### Success Messages:
```
✅ Final fetch method: schedules endpoint
✅ Total anime fetched: 150
📅 Raw anime data sample: [Array with 3 anime objects]
📅 Grouped schedule: Monday: 4, Tuesday: 4, Wednesday: 4, ...
```

#### If Strategy 1 Fails:
```
❌ Schedules endpoint returned: 404
📅 Trying individual day endpoints...
✅ Monday: 15 anime
✅ Tuesday: 12 anime
...
```

#### If Strategy 2 Fails:
```
📅 Trying seasons/now fallback with multiple pages...
📅 Fetched from seasons/now: 50 anime
```

### 3. What Each Strategy Does

**Strategy 1** (Fastest - ~1 second)
- Fetches all schedules in one request
- Best case scenario

**Strategy 2** (Medium - ~2.5 seconds)
- Fetches each day individually
- Takes about 350ms × 7 days = 2.5 seconds
- More reliable but slower

**Strategy 3** (Fallback - ~1 second)
- Fetches current season anime
- Filters by broadcast day
- Should always work

### 4. Expected UI

You should see:
- ✅ Green day tabs at the top
- ✅ Anime count badges on each day tab (e.g., "Monday (4)")
- ✅ Anime cards with:
  - Poster image
  - Title
  - Broadcast time (🕐)
  - Score (⭐)
  - Type badge (TV/OVA/etc)
- ✅ Monday tab highlighted in green by default
- ✅ Clicking other days highlights them

### 5. If Still Not Working

Check browser console for:
- Network errors (CORS, 403, 429 rate limit)
- API response format issues
- Broadcast day field missing/null

### 6. Manual API Test

Open a new browser tab and test these URLs directly:
1. `https://api.jikan.moe/v4/schedules`
2. `https://api.jikan.moe/v4/schedules?filter=monday`
3. `https://api.jikan.moe/v4/seasons/now?page=1`

Look for the `broadcast` field in the response:
```json
{
  "data": [
    {
      "mal_id": 12345,
      "title": "Some Anime",
      "broadcast": {
        "day": "Mondays",
        "time": "23:00",
        "timezone": "Asia/Tokyo"
      }
    }
  ]
}
```

**Note**: The day might be "Mondays" (plural) or "Monday" (singular) - our code normalizes both!

---

## Common Issues & Solutions

### Issue: All days show "No anime scheduled"
**Cause**: API returned data but `broadcast.day` field is missing/null
**Solution**: Check console logs for "Raw anime data sample" - if broadcast is null, the API might be having issues

### Issue: Loading spinner never stops
**Cause**: All three strategies failed
**Solution**: Check browser console for error messages, might be a CORS or network issue

### Issue: Some days work, others don't
**Cause**: Individual day endpoints returned different amounts of data
**Solution**: This is normal - not all days have the same number of airing anime

### Issue: Rate limit error (429)
**Cause**: Too many API requests
**Solution**: The code already includes 350ms delays, but if you refresh multiple times quickly, you might hit rate limits. Wait 60 seconds and try again.

---

## Quick Fix Commands

If you need to restart the dev server:
```powershell
# Stop current server (Ctrl+C in terminal)
# Then restart:
npm run dev
```

If you need to clear Next.js cache:
```powershell
Remove-Item -Recurse -Force .next
npm run dev
```

---

*Last updated: October 15, 2025*
