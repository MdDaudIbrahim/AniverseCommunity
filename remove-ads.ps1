# Remove all AdBanner and AdSidebar components from the codebase

$files = @(
    "app\recommendations\page.tsx",
    "app\search\page.tsx",
    "app\news\page.tsx",
    "app\news\[id]\page.tsx"
)

foreach ($file in $files) {
    if (Test-Path $file) {
        $content = Get-Content $file -Raw
        
        # Remove AdBanner imports
        $content = $content -replace '(?m)^import\s+(?:AdBanner|AdSidebar)\s+from\s+[''"]@/components/ads/(?:AdBanner|AdSidebar)[''"];\s*\r?\n', ''
        
        # Remove AdBanner/AdSidebar JSX blocks with their wrapper divs
        $content = $content -replace '(?s)\s*<div[^>]*>\s*<AdBanner[^>]*/>\s*</div>\s*', ''
        $content = $content -replace '(?s)\s*<div[^>]*>\s*<AdSidebar[^>]*/>\s*</div>\s*', ''
        
        # Remove standalone AdBanner/AdSidebar tags
        $content = $content -replace '\s*<AdBanner[^>]*/>\s*', ''
        $content = $content -replace '\s*<AdSidebar[^>]*/>\s*', ''
        
        # Remove comments about ads
        $content = $content -replace '(?m)^\s*\{/\*\s*(?:Ad Banner|Bottom Ad|Sidebar Ad|Top Ad)\s*\*/\}\s*\r?\n', ''
        
        Set-Content $file -Value $content -NoNewline
        Write-Host "Processed: $file" -ForegroundColor Green
    }
}

Write-Host "`nAll ad components removed!" -ForegroundColor Cyan
