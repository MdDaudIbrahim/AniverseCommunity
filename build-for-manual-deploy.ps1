# Manual Deployment Build Script
# Prepares your site for drag & drop deployment

Write-Host ""
Write-Host "============================================" -ForegroundColor Cyan
Write-Host "  📦 MANUAL DEPLOYMENT BUILD SCRIPT" -ForegroundColor Green
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""

# Step 1: Enable Static Export
Write-Host "📝 Step 1: Configuring for static export..." -ForegroundColor Yellow

$configPath = "next.config.js"
$config = Get-Content $configPath -Raw

# Check if already enabled
if ($config -match 'output:\s*[''"]export[''"]') {
    Write-Host "✅ Static export already enabled!" -ForegroundColor Green
} else {
    Write-Host "⚠️  Static export not enabled in next.config.js" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Would you like to enable it now? (Y/N)" -ForegroundColor Yellow
    $enable = Read-Host
    
    if ($enable -eq "Y" -or $enable -eq "y") {
        # Uncomment static export lines
        $config = $config -replace '//\s*output:\s*[''"]export[''"]', "output: 'export'"
        $config = $config -replace '//\s*unoptimized:\s*true', 'unoptimized: true'
        Set-Content $configPath -Value $config
        Write-Host "✅ Static export enabled!" -ForegroundColor Green
    } else {
        Write-Host "⏭️  Skipping static export configuration" -ForegroundColor Yellow
        Write-Host "⚠️  Note: Regular build will be used (.next folder)" -ForegroundColor Yellow
    }
}

Write-Host ""

# Step 2: Build
Write-Host "🔨 Step 2: Building your site..." -ForegroundColor Yellow
Write-Host ""

npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host ""
    Write-Host "❌ Build failed!" -ForegroundColor Red
    Write-Host "Please fix the errors above and try again." -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "✅ Build successful!" -ForegroundColor Green
Write-Host ""

# Step 3: Check Output
Write-Host "📂 Step 3: Checking build output..." -ForegroundColor Yellow

$hasOut = Test-Path "out"
$hasNext = Test-Path ".next"

if ($hasOut) {
    Write-Host "✅ Static export created: 'out' folder" -ForegroundColor Green
    $outSize = (Get-ChildItem -Path out -Recurse | Measure-Object -Property Length -Sum).Sum / 1MB
    Write-Host "   Size: $([math]::Round($outSize, 2)) MB" -ForegroundColor Gray
    $deployFolder = "out"
} elseif ($hasNext) {
    Write-Host "✅ Build created: '.next' folder" -ForegroundColor Green
    Write-Host "   ⚠️  Note: For best results, enable static export" -ForegroundColor Yellow
    $deployFolder = ".next"
} else {
    Write-Host "❌ No build output found!" -ForegroundColor Red
    exit 1
}

Write-Host ""

# Step 4: Create ZIP (Optional)
Write-Host "📦 Step 4: Create ZIP file? (Y/N)" -ForegroundColor Yellow
$createZip = Read-Host

if ($createZip -eq "Y" -or $createZip -eq "y") {
    $zipName = "anime-website-$(Get-Date -Format 'yyyy-MM-dd-HHmm').zip"
    Write-Host "   Creating $zipName..." -ForegroundColor Gray
    
    if (Test-Path $zipName) {
        Remove-Item $zipName -Force
    }
    
    Compress-Archive -Path "$deployFolder\*" -DestinationPath $zipName
    Write-Host "✅ ZIP created: $zipName" -ForegroundColor Green
    Write-Host "   You can upload this ZIP file to hosting providers" -ForegroundColor Gray
}

Write-Host ""
Write-Host "============================================" -ForegroundColor Cyan
Write-Host "  ✅ YOUR SITE IS READY TO DEPLOY!" -ForegroundColor Green
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""

# Step 5: Instructions
Write-Host "🚀 DEPLOYMENT OPTIONS:" -ForegroundColor Yellow
Write-Host ""

Write-Host "Option 1: Netlify Drop (Easiest)" -ForegroundColor Cyan
Write-Host "  1. Go to: https://app.netlify.com/drop" -ForegroundColor White
Write-Host "  2. Drag the $deployFolder folder to the drop zone" -ForegroundColor White
Write-Host "  3. Wait 30 seconds - Your site is LIVE!" -ForegroundColor White
Write-Host ""

Write-Host "Option 2: Netlify Dashboard" -ForegroundColor Cyan
Write-Host "  1. Go to: https://app.netlify.com" -ForegroundColor White
Write-Host "  2. Click 'Add new site' -> 'Deploy manually'" -ForegroundColor White
Write-Host "  3. Drag the $deployFolder folder" -ForegroundColor White
Write-Host ""

Write-Host "Option 3: Any Web Host" -ForegroundColor Cyan
Write-Host "  1. Upload contents of $deployFolder via FTP" -ForegroundColor White
Write-Host "  2. Point your domain to the folder" -ForegroundColor White
Write-Host ""

if ($createZip -eq "Y" -or $createZip -eq "y") {
    Write-Host "Option 4: Upload ZIP" -ForegroundColor Cyan
    Write-Host "  1. Upload $zipName to your hosting" -ForegroundColor White
    Write-Host "  2. Extract on the server" -ForegroundColor White
    Write-Host ""
}

Write-Host "📂 Deploy this folder: " -NoNewline -ForegroundColor Yellow
Write-Host "$deployFolder" -ForegroundColor Cyan
Write-Host ""

Write-Host "💡 TIP: Open Netlify Drop now?" -ForegroundColor Yellow
$openNetlify = Read-Host "Open in browser? (Y/N)"

if ($openNetlify -eq "Y" -or $openNetlify -eq "y") {
    Start-Process "https://app.netlify.com/drop"
    Write-Host "✅ Opening Netlify Drop in your browser..." -ForegroundColor Green
    Write-Host "   Drag the $deployFolder folder to deploy!" -ForegroundColor Gray
}

Write-Host ""
Write-Host "📚 Need help? Check: DEPLOY-MANUAL.md" -ForegroundColor Cyan
Write-Host ""
Write-Host "✨ Happy deploying! 🚀" -ForegroundColor Green
Write-Host ""
