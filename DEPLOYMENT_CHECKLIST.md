# ✅ AutoAni Deployment Checklist

## 🎯 **Complete Deployment Checklist**

### **Phase 1: Prerequisites** ⚡
- [ ] **Install Git**: Download from https://git-scm.com/
- [ ] **GitHub Account**: Ensure you have access to https://github.com/behark/autoanikw
- [ ] **Vercel Account**: Sign up at https://vercel.com/ (use GitHub login)
- [ ] **Railway Account**: Sign up at https://railway.app/ (use GitHub login)

### **Phase 2: External Services Setup** 🔧
- [ ] **MongoDB Atlas** (Database):
  - [ ] Create account at https://www.mongodb.com/atlas
  - [ ] Create free M0 cluster
  - [ ] Set up database user with read/write permissions
  - [ ] Configure network access (allow all IPs: 0.0.0.0/0)
  - [ ] Copy connection string

- [ ] **Cloudinary** (Media Storage):
  - [ ] Create account at https://cloudinary.com/
  - [ ] Get Cloud Name, API Key, and API Secret from dashboard
  - [ ] Configure upload presets (optional)

### **Phase 3: Push to GitHub** 📤
Run in PowerShell:
```powershell
# Navigate to project
cd "C:\Users\HOG-13\New folder (2)\autoanikw"

# Run deployment script
.\deploy.ps1
```

Or manually:
```powershell
git init
git add .
git commit -m "Deploy: Complete AutoAni admin dashboard"
git remote add origin https://github.com/behark/autoanikw.git
git push -u origin main
```

### **Phase 4: Deploy Frontend (Vercel)** 🌐
- [ ] Go to https://vercel.com/new
- [ ] Select "Import Git Repository"
- [ ] Choose `autoanikw` repository
- [ ] Configure project:
  - [ ] **Framework Preset**: Next.js
  - [ ] **Root Directory**: `apps/frontend`
  - [ ] **Build Command**: `npm run build`
  - [ ] **Output Directory**: `.next`
- [ ] Add Environment Variables:
  ```
  NEXT_PUBLIC_API_URL = https://your-backend.railway.app
  NEXT_PUBLIC_SITE_NAME = AutoAni Car Dealership
  NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME = your-cloudinary-name
  ```
- [ ] Click "Deploy"
- [ ] Copy your Vercel URL (e.g., `https://autoanikw.vercel.app`)

### **Phase 5: Deploy Backend (Railway)** 🚂
- [ ] Go to https://railway.app/dashboard
- [ ] Click "New Project" → "Deploy from GitHub repo"
- [ ] Select `autoanikw` repository
- [ ] Configure service:
  - [ ] **Root Directory**: `apps/backend`
  - [ ] **Start Command**: `npm start`
  - [ ] **Build Command**: `npm run build`
- [ ] Add Environment Variables:
  ```
  MONGODB_URI = mongodb+srv://username:password@cluster.mongodb.net/autoanikw
  JWT_SECRET = autoanikw-super-secret-jwt-key-2025-secure
  CLOUDINARY_CLOUD_NAME = your-cloudinary-name
  CLOUDINARY_API_KEY = your-api-key
  CLOUDINARY_API_SECRET = your-api-secret
  PORT = 5000
  NODE_ENV = production
  FRONTEND_URL = https://autoanikw.vercel.app
  CORS_ORIGIN = https://autoanikw.vercel.app
  ```
- [ ] Deploy and copy Railway URL (e.g., `https://autoanikw.railway.app`)

### **Phase 6: Update Frontend with Backend URL** 🔄
- [ ] Go back to Vercel dashboard
- [ ] Update environment variable:
  ```
  NEXT_PUBLIC_API_URL = https://your-backend.railway.app
  ```
- [ ] Redeploy frontend

### **Phase 7: Test Deployment** 🧪
- [ ] **Frontend Access**: Visit `https://autoanikw.vercel.app`
- [ ] **Admin Dashboard**: Visit `https://autoanikw.vercel.app/admin/dashboard`
- [ ] **API Health**: Visit `https://your-backend.railway.app/health`
- [ ] **Test Features**:
  - [ ] Vehicle listing display
  - [ ] Admin login/authentication
  - [ ] Media upload functionality
  - [ ] Vehicle management (add/edit/delete)
  - [ ] Dashboard statistics

### **Phase 8: Domain & DNS (Optional)** 🌍
- [ ] Purchase custom domain (optional)
- [ ] Configure DNS in Vercel
- [ ] Update CORS settings in backend
- [ ] Update environment variables with new domain

## 🎯 **Your Live URLs**

After successful deployment:

- **🏠 Homepage**: `https://autoanikw.vercel.app`
- **🔧 Admin Dashboard**: `https://autoanikw.vercel.app/admin/dashboard`
- **⚙️ Backend API**: `https://autoanikw.railway.app`
- **📊 Admin Features**:
  - Vehicle Management: Add, edit, delete car listings
  - Media Upload: Drag-and-drop files from PC
  - Dashboard Analytics: Real-time statistics
  - Activity Monitoring: Track all admin actions

## 🔐 **Environment Variables Summary**

### **Vercel (Frontend)**
```
NEXT_PUBLIC_API_URL = https://autoanikw.railway.app
NEXT_PUBLIC_SITE_NAME = AutoAni Car Dealership
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME = your-cloudinary-name
```

### **Railway (Backend)**
```
MONGODB_URI = mongodb+srv://username:password@cluster.mongodb.net/autoanikw
JWT_SECRET = autoanikw-super-secret-jwt-key-2025-secure
CLOUDINARY_CLOUD_NAME = your-cloudinary-name
CLOUDINARY_API_KEY = your-api-key
CLOUDINARY_API_SECRET = your-api-secret
PORT = 5000
NODE_ENV = production
FRONTEND_URL = https://autoanikw.vercel.app
CORS_ORIGIN = https://autoanikw.vercel.app
```

## 🚨 **Troubleshooting**

### **Common Issues:**
- **Build Errors**: Check Node.js version (needs 18+)
- **Database Connection**: Verify MongoDB Atlas IP whitelist
- **CORS Errors**: Ensure FRONTEND_URL matches your Vercel domain
- **Media Upload Issues**: Verify Cloudinary credentials
- **404 Errors**: Check root directory settings in deployment platforms

### **Support:**
- **Vercel Docs**: https://vercel.com/docs
- **Railway Docs**: https://docs.railway.app/
- **MongoDB Atlas**: https://docs.atlas.mongodb.com/
- **Cloudinary**: https://cloudinary.com/documentation

## 🎉 **Success!**

Once all checkboxes are ✅, your AutoAni car dealership is live with:
- Professional admin dashboard
- Media upload from PC
- Vehicle management system
- Real-time analytics
- Mobile-responsive design
- Production-ready deployment

**Your modern car dealership platform is now live and ready for business!** 🚗✨
