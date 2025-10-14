# Quick Deployment Script for Netlify
# Run this script to prepare and deploy your site

Write-Host "🚀 Anime Website - Netlify Deployment Script" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""

# Step 1: Test Build
Write-Host "📦 Step 1: Testing build..." -ForegroundColor Yellow
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Build failed! Please fix errors before deploying." -ForegroundColor Red
    exit 1
}
Write-Host "✅ Build successful!" -ForegroundColor Green
Write-Host ""

# Step 2: Git Status
Write-Host "📋 Step 2: Checking Git status..." -ForegroundColor Yellow
git status
Write-Host ""

# Step 3: Add and Commit
Write-Host "💾 Step 3: Do you want to commit changes? (Y/N)" -ForegroundColor Yellow
$commit = Read-Host
if ($commit -eq "Y" -or $commit -eq "y") {
    $message = Read-Host "Enter commit message"
    git add .
    git commit -m "$message"
    Write-Host "✅ Changes committed!" -ForegroundColor Green
}
Write-Host ""

# Step 4: Push to GitHub
Write-Host "🔄 Step 4: Do you want to push to GitHub? (Y/N)" -ForegroundColor Yellow
$push = Read-Host
if ($push -eq "Y" -or $push -eq "y") {
    git push
    Write-Host "✅ Pushed to GitHub! Netlify will auto-deploy." -ForegroundColor Green
    Write-Host ""
    Write-Host "🌐 Your site will be live in 2-3 minutes!" -ForegroundColor Cyan
    Write-Host "Check deployment status at: https://app.netlify.com" -ForegroundColor Cyan
} else {
    Write-Host "⏭️  Skipped push. Run 'git push' manually when ready." -ForegroundColor Yellow
}

Write-Host ""
Write-Host "✨ Deployment process complete!" -ForegroundColor Green
Write-Host ""
Write-Host "📚 Need help? Check DEPLOY-NETLIFY.md for detailed guide" -ForegroundColor Cyan
