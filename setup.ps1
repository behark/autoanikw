# AutoAni Setup Script
# Run this after installing Node.js from https://nodejs.org/

Write-Host "🚀 AutoAni Setup Script" -ForegroundColor Green
Write-Host "======================" -ForegroundColor Green

# Check Node.js installation
Write-Host "`n🔍 Checking Node.js installation..." -ForegroundColor Yellow
if (Get-Command node -ErrorAction SilentlyContinue) {
    $nodeVersion = node --version
    $npmVersion = npm --version
    Write-Host "✅ Node.js: $nodeVersion" -ForegroundColor Green
    Write-Host "✅ npm: $npmVersion" -ForegroundColor Green
} else {
    Write-Host "❌ Node.js not found!" -ForegroundColor Red
    Write-Host "Please install Node.js from: https://nodejs.org/" -ForegroundColor Yellow
    Write-Host "After installation, restart PowerShell and run this script again." -ForegroundColor Yellow
    exit 1
}

# Navigate to project root
Write-Host "`n📁 Navigating to project root..." -ForegroundColor Yellow
Set-Location "C:\Users\HOG-13\New folder (2)\autoanikw"

# Install dependencies
Write-Host "`n📦 Installing dependencies..." -ForegroundColor Yellow
Write-Host "This may take a few minutes..." -ForegroundColor Cyan
npm install

# Check if installation was successful
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Dependencies installed successfully!" -ForegroundColor Green
} else {
    Write-Host "❌ Dependency installation failed!" -ForegroundColor Red
    exit 1
}

# Display next steps
Write-Host "`n🎯 Setup Complete! Next Steps:" -ForegroundColor Green
Write-Host "================================" -ForegroundColor Green
Write-Host "1. Set up MongoDB:" -ForegroundColor Yellow
Write-Host "   - Option A: Install MongoDB locally" -ForegroundColor Cyan
Write-Host "   - Option B: Use MongoDB Atlas (recommended)" -ForegroundColor Cyan
Write-Host "     👉 https://www.mongodb.com/atlas" -ForegroundColor Blue
Write-Host ""
Write-Host "2. Set up Cloudinary (free account):" -ForegroundColor Yellow
Write-Host "   👉 https://cloudinary.com" -ForegroundColor Blue
Write-Host "   - Update CLOUDINARY_* values in apps/backend/.env" -ForegroundColor Cyan
Write-Host ""
Write-Host "3. Start development servers:" -ForegroundColor Yellow
Write-Host "   npm run dev" -ForegroundColor Cyan
Write-Host ""
Write-Host "4. Access your admin dashboard:" -ForegroundColor Yellow
Write-Host "   👉 http://localhost:3000/admin/dashboard" -ForegroundColor Blue
Write-Host ""
Write-Host "🚗 Your AutoAni admin dashboard is ready!" -ForegroundColor Green
