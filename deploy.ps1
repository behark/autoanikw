# 🚀 AutoAni Quick Deploy Script
# Run this script to deploy to GitHub and Vercel

Write-Host "🚀 AutoAni Deployment Script" -ForegroundColor Green
Write-Host "============================" -ForegroundColor Green

# Check if Git is installed
Write-Host "`n🔍 Checking Git installation..." -ForegroundColor Yellow
if (Get-Command git -ErrorAction SilentlyContinue) {
    $gitVersion = git --version
    Write-Host "✅ Git found: $gitVersion" -ForegroundColor Green
} else {
    Write-Host "❌ Git not found!" -ForegroundColor Red
    Write-Host "Please install Git from: https://git-scm.com/" -ForegroundColor Yellow
    Write-Host "After installation, restart PowerShell and run this script again." -ForegroundColor Yellow
    exit 1
}

# Navigate to project root
Write-Host "`n📁 Navigating to project directory..." -ForegroundColor Yellow
Set-Location "C:\Users\HOG-13\New folder (2)\autoanikw"

# Check if this is a git repository
if (-not (Test-Path ".git")) {
    Write-Host "`n🔧 Initializing Git repository..." -ForegroundColor Yellow
    git init
    git branch -M main
}

# Add all files
Write-Host "`n📦 Adding files to Git..." -ForegroundColor Yellow
git add .

# Commit changes
Write-Host "`n💾 Committing changes..." -ForegroundColor Yellow
$commitMessage = "Deploy: Complete AutoAni admin dashboard with media upload - $(Get-Date -Format 'yyyy-MM-dd HH:mm')"
git commit -m $commitMessage

# Check if remote exists
$remoteExists = git remote get-url origin 2>$null
if (-not $remoteExists) {
    Write-Host "`n🔗 Adding GitHub remote..." -ForegroundColor Yellow
    git remote add origin https://github.com/behark/autoanikw.git
}

# Push to GitHub
Write-Host "`n🚀 Pushing to GitHub..." -ForegroundColor Yellow
try {
    git push -u origin main
    Write-Host "✅ Successfully pushed to GitHub!" -ForegroundColor Green
} catch {
    Write-Host "⚠️ Push failed. You may need to authenticate with GitHub." -ForegroundColor Yellow
    Write-Host "Please visit: https://github.com/behark/autoanikw" -ForegroundColor Cyan
}

# Display next steps
Write-Host "`n🎯 Deployment Status:" -ForegroundColor Green
Write-Host "===================" -ForegroundColor Green
Write-Host "✅ Code pushed to GitHub: https://github.com/behark/autoanikw" -ForegroundColor Green
Write-Host ""
Write-Host "🌐 Next: Deploy to Vercel" -ForegroundColor Yellow
Write-Host "=========================" -ForegroundColor Yellow
Write-Host "1. Go to: https://vercel.com/new" -ForegroundColor Cyan
Write-Host "2. Import your 'autoanikw' repository" -ForegroundColor Cyan
Write-Host "3. Configure settings:" -ForegroundColor Cyan
Write-Host "   - Framework: Next.js" -ForegroundColor White
Write-Host "   - Root Directory: apps/frontend" -ForegroundColor White
Write-Host "   - Build Command: npm run build" -ForegroundColor White
Write-Host "4. Add environment variables:" -ForegroundColor Cyan
Write-Host "   - NEXT_PUBLIC_API_URL" -ForegroundColor White
Write-Host "   - NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME" -ForegroundColor White
Write-Host "5. Click Deploy!" -ForegroundColor Cyan
Write-Host ""
Write-Host "📱 Deploy Backend (Railway):" -ForegroundColor Yellow
Write-Host "============================" -ForegroundColor Yellow
Write-Host "1. Go to: https://railway.app/" -ForegroundColor Cyan
Write-Host "2. Create new project from GitHub" -ForegroundColor Cyan
Write-Host "3. Select 'autoanikw' repository" -ForegroundColor Cyan
Write-Host "4. Set Root Directory: apps/backend" -ForegroundColor Cyan
Write-Host "5. Add environment variables for database" -ForegroundColor Cyan
Write-Host ""
Write-Host "📋 Setup Required:" -ForegroundColor Yellow
Write-Host "=================" -ForegroundColor Yellow
Write-Host "🗄️ MongoDB Atlas: https://www.mongodb.com/atlas" -ForegroundColor Blue
Write-Host "📷 Cloudinary: https://cloudinary.com/" -ForegroundColor Blue
Write-Host ""
Write-Host "📖 Full guide: See DEPLOYMENT_GUIDE.md" -ForegroundColor Green
Write-Host ""
Write-Host "🎉 Your AutoAni dealership is ready for deployment!" -ForegroundColor Green
