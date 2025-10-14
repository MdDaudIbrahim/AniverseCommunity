# Quick Netlify Deploy Script
# Run this to deploy your latest changes to Netlify

Write-Host "🚀 Starting Netlify Deployment..." -ForegroundColor Cyan

# Step 1: Kill any running Node processes
Write-Host "`n1️⃣ Cleaning up Node processes..." -ForegroundColor Yellow
taskkill /F /IM node.exe /T 2>$null
Start-Sleep -Seconds 1

# Step 2: Remove old build artifacts
Write-Host "`n2️⃣ Removing old build cache..." -ForegroundColor Yellow
Remove-Item -Recurse -Force .next -ErrorAction SilentlyContinue
Write-Host "✓ Cache cleared" -ForegroundColor Green

# Step 3: Check if Netlify CLI is installed
Write-Host "`n3️⃣ Checking Netlify CLI..." -ForegroundColor Yellow
$netlifyInstalled = Get-Command netlify -ErrorAction SilentlyContinue
if (-not $netlifyInstalled) {
    Write-Host "Installing Netlify CLI globally..." -ForegroundColor Cyan
    npm install -g netlify-cli
} else {
    Write-Host "✓ Netlify CLI already installed" -ForegroundColor Green
}

# Step 4: Login (will open browser if not logged in)
Write-Host "`n4️⃣ Checking Netlify authentication..." -ForegroundColor Yellow
netlify status 2>$null
if ($LASTEXITCODE -ne 0) {
    Write-Host "Please login to Netlify (browser will open)..." -ForegroundColor Cyan
    netlify login
}

# Step 5: Link to site (if not already linked)
Write-Host "`n5️⃣ Linking to Netlify site..." -ForegroundColor Yellow
if (-not (Test-Path ".netlify")) {
    Write-Host "Linking to your Netlify site..." -ForegroundColor Cyan
    netlify link
} else {
    Write-Host "✓ Already linked to Netlify site" -ForegroundColor Green
}

# Step 6: Deploy with build
Write-Host "`n6️⃣ Building and deploying to production..." -ForegroundColor Yellow
Write-Host "This will take 1-2 minutes..." -ForegroundColor Cyan
netlify deploy --build --prod

# Step 7: Done
Write-Host "`n✅ Deployment complete!" -ForegroundColor Green
Write-Host "🌐 Visit your site: https://aniversecommunity.netlify.app" -ForegroundColor Cyan
Write-Host "`n💡 Tip: Hard refresh (Ctrl+F5) or use incognito to bypass browser cache" -ForegroundColor Yellow
