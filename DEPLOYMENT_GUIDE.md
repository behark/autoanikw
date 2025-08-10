# 🚀 AutoAni Deployment Guide

## Step-by-Step Deployment to GitHub & Vercel

### 📋 **Prerequisites**

1. **Install Git** (if not already installed):
   - Download from: https://git-scm.com/
   - Choose "Git for Windows" 
   - During installation, select "Use Git from the Windows Command Prompt"

2. **Create accounts** (if you don't have them):
   - GitHub: https://github.com/
   - Vercel: https://vercel.com/ (sign up with GitHub)
   - MongoDB Atlas: https://www.mongodb.com/atlas (for database)
   - Cloudinary: https://cloudinary.com/ (for media storage)

### 🔧 **Step 1: Push to GitHub**

After installing Git, run these commands in PowerShell:

```powershell
# Navigate to your project
cd "C:\Users\HOG-13\New folder (2)\autoanikw"

# Initialize git repository (if not already done)
git init

# Add all files
git add .

# Commit your changes
git commit -m "Initial commit: Complete AutoAni admin dashboard with media upload"

# Add your GitHub repository as remote
git remote add origin https://github.com/behark/autoanikw.git

# Push to GitHub
git push -u origin main
```

### 🌐 **Step 2: Deploy Frontend to Vercel**

1. **Go to Vercel Dashboard**:
   - Visit: https://vercel.com/dashboard
   - Click "New Project"

2. **Import from GitHub**:
   - Select your `autoanikw` repository
   - Click "Import"

3. **Configure Project Settings**:
   - **Framework Preset**: Next.js
   - **Root Directory**: `apps/frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`

4. **Add Environment Variables**:
   Click "Environment Variables" and add:
   ```
   NEXT_PUBLIC_API_URL = https://your-backend-url.railway.app
   NEXT_PUBLIC_SITE_NAME = AutoAni Car Dealership
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME = your-cloudinary-name
   ```

5. **Deploy**:
   - Click "Deploy"
   - Wait for deployment to complete

### ☁️ **Step 3: Deploy Backend to Railway**

1. **Go to Railway**:
   - Visit: https://railway.app/
   - Sign up with GitHub

2. **Create New Project**:
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your `autoanikw` repository

3. **Configure Backend Service**:
   - **Root Directory**: `apps/backend`
   - **Start Command**: `npm start`
   - **Build Command**: `npm run build`

4. **Add Environment Variables**:
   ```
   MONGODB_URI = mongodb+srv://username:password@cluster.mongodb.net/autoanikw
   JWT_SECRET = autoanikw-super-secret-jwt-key-2025-secure
   CLOUDINARY_CLOUD_NAME = your-cloudinary-name
   CLOUDINARY_API_KEY = your-api-key
   CLOUDINARY_API_SECRET = your-api-secret
   PORT = 5000
   NODE_ENV = production
   FRONTEND_URL = https://your-vercel-app.vercel.app
   ```

5. **Deploy Backend**:
   - Click "Deploy"
   - Copy the generated URL

### 📊 **Step 4: Set Up Database (MongoDB Atlas)**

1. **Create MongoDB Atlas Account**:
   - Go to: https://www.mongodb.com/atlas
   - Create free account

2. **Create Cluster**:
   - Choose "Create a deployment"
   - Select "M0 Sandbox" (free tier)
   - Choose a region close to you

3. **Set Up Database Access**:
   - Go to "Database Access"
   - Click "Add New Database User"
   - Create username/password
   - Set permissions to "Read and write to any database"

4. **Set Up Network Access**:
   - Go to "Network Access"
   - Click "Add IP Address"
   - Select "Allow access from anywhere" (0.0.0.0/0)

5. **Get Connection String**:
   - Go to "Database" → "Connect"
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password

### 🖼️ **Step 5: Set Up Cloudinary**

1. **Create Cloudinary Account**:
   - Go to: https://cloudinary.com/
   - Sign up for free account

2. **Get API Credentials**:
   - Go to Dashboard
   - Copy:
     - Cloud Name
     - API Key
     - API Secret

3. **Update Environment Variables**:
   - Add these to both Vercel and Railway

### 🔄 **Step 6: Update Environment Variables**

**In Vercel (Frontend)**:
```
NEXT_PUBLIC_API_URL = https://your-railway-app.railway.app
NEXT_PUBLIC_SITE_NAME = AutoAni Car Dealership
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME = your-cloudinary-name
```

**In Railway (Backend)**:
```
MONGODB_URI = mongodb+srv://username:password@cluster.mongodb.net/autoanikw
JWT_SECRET = autoanikw-super-secret-jwt-key-2025-secure
CLOUDINARY_CLOUD_NAME = your-cloudinary-name
CLOUDINARY_API_KEY = your-api-key
CLOUDINARY_API_SECRET = your-api-secret
PORT = 5000
NODE_ENV = production
FRONTEND_URL = https://your-vercel-app.vercel.app
```

### ✅ **Step 7: Test Your Deployment**

1. **Access Your Live Site**:
   - Frontend: `https://your-vercel-app.vercel.app`
   - Admin Dashboard: `https://your-vercel-app.vercel.app/admin/dashboard`

2. **Test Admin Features**:
   - Try uploading media files
   - Add a test vehicle listing
   - Check dashboard statistics

### 🔧 **Troubleshooting**

**Build Errors**:
- Check that all environment variables are set
- Ensure Node.js version compatibility (use Node 18+)

**Database Connection Issues**:
- Verify MongoDB Atlas IP whitelist
- Check connection string format
- Ensure database user has correct permissions

**Media Upload Issues**:
- Verify Cloudinary credentials
- Check file size limits
- Ensure CORS is properly configured

### 🚀 **Continuous Deployment**

Once set up, any changes you push to GitHub will automatically:
1. Trigger a new build on Vercel (frontend)
2. Trigger a new deployment on Railway (backend)

### 📱 **Access Your Live Admin Dashboard**

After successful deployment:
- **Public Site**: `https://your-app.vercel.app`
- **Admin Dashboard**: `https://your-app.vercel.app/admin/dashboard`
- **API Endpoint**: `https://your-backend.railway.app`

## 🎉 **You're Live!**

Your AutoAni car dealership with admin dashboard is now live and ready for:
- ✅ Adding/editing vehicle listings
- ✅ Uploading media files from PC
- ✅ Managing dealership content
- ✅ Monitoring analytics and activity

## 📞 **Need Help?**

If you encounter any issues:
1. Check the deployment logs in Vercel/Railway dashboards
2. Verify all environment variables are correctly set
3. Test database and Cloudinary connections
4. Ensure your GitHub repository is properly pushed

Your professional car dealership platform is ready! 🚗✨
