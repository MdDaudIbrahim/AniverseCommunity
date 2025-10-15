# Weekly Schedule API Test

## Test the Jikan API directly

Open your browser console (F12) and paste this code to test:

```javascript
// Test Schedules API
fetch('https://api.jikan.moe/v4/schedules')
  .then(res => res.json())
  .then(data => {
    console.log('Total anime:', data.data.length);
    console.log('Sample anime with broadcast:', data.data.filter(a => a.broadcast?.day).slice(0, 5));
    
    // Group by day
    const grouped = {};
    data.data.forEach(anime => {
      const day = anime.broadcast?.day;
      if (day) {
        if (!grouped[day]) grouped[day] = [];
        grouped[day].push(anime.title);
      }
    });
    console.log('Grouped by day:', grouped);
  });
```

## What to look for:

1. **Total anime count** - Should be 100-200
2. **Broadcast days** - Should see "Mondays", "Tuesdays", etc. (with 's')
3. **Grouped data** - Should show anime for each day

## Common Issues:

### Issue: API returns data but component shows "No anime"
**Cause**: Our day normalization might not match the API's format
**Fix**: Check if API returns "Mondays" (plural) vs "Monday" (singular)

### Issue: Empty grouped object
**Cause**: All anime might not have `broadcast.day` set
**Fix**: The component will fall back to seasons/now endpoint

---

## Manual Fix if API Test Fails:

If the API test shows anime but the component doesn't, open the browser and check:

1. Go to http://localhost:3001
2. Open Console (F12)
3. Look for these logs:
   - `✅ Schedules API success: X anime found`
   - `📊 Sample: [array of anime]`
   - `🔍 Processing X anime...`
   - `📋 Before filtering: Monday:X | Tuesday:X...`
   - `📊 Final grouped data: Monday:X | Tuesday:X...`

The logs will tell us exactly where the data is being lost!
