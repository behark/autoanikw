# 🚀 AutoAni Setup Guide - Node.js Installation Required

## ⚠️ **Prerequisites - Install Node.js First**

You need to install Node.js to run your AutoAni admin dashboard. Here's how:

### **1. Download Node.js**
- Go to: https://nodejs.org/
- Download the **LTS version** (Long Term Support)
- Choose the Windows Installer (.msi)

### **2. Install Node.js**
- Run the downloaded installer
- Follow the installation wizard
- ✅ **Important**: Make sure to check "Add to PATH" during installation
- ✅ **Important**: Check "Install npm package manager"

### **3. Verify Installation**
Open a new PowerShell window and run:
```powershell
node --version
npm --version
```

You should see version numbers like:
```
v20.x.x
10.x.x
```

## 🏁 **Quick Start After Node.js Installation**

### **1. Install Project Dependencies**
```powershell
# Navigate to your project
cd "C:\Users\HOG-13\New folder (2)\autoanikw"

# Install all dependencies
npm install
```

### **2. Set Up Environment Variables**
Create these files:

**Backend Environment** (`apps/backend/.env`):
```env
# Database
MONGODB_URI=mongodb://localhost:27017/autoanikw

# JWT Secret
JWT_SECRET=your-super-secret-jwt-key-here

# Cloudinary (sign up at cloudinary.com for free)
CLOUDINARY_CLOUD_NAME=your-cloudinary-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Server
PORT=5000
NODE_ENV=development
```

**Frontend Environment** (`apps/frontend/.env.local`):
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### **3. Start Development Servers**
```powershell
# Start both backend and frontend
npm run dev
```

### **4. Access Your Admin Dashboard**
Open your browser and go to:
- **Frontend**: http://localhost:3000
- **Admin Dashboard**: http://localhost:3000/admin/dashboard
- **Backend API**: http://localhost:5000

## 🔧 **Alternative: Use MongoDB Atlas (Cloud Database)**

If you don't want to install MongoDB locally:

1. Go to: https://www.mongodb.com/atlas
2. Create a free account
3. Create a new cluster
4. Get your connection string
5. Replace `MONGODB_URI` in your `.env` file

## 📁 **What You Get After Setup**

### **Admin Dashboard Features:**
- 🚗 **Vehicle Management**: Add/edit/delete car listings
- 📷 **Media Upload**: Upload images from your PC with drag-and-drop
- 📊 **Dashboard Statistics**: Real-time analytics
- 📝 **Activity Logs**: Track all changes
- ⚙️ **Settings**: Configure your site

### **File Upload Capabilities:**
- **Images**: JPEG, PNG, WebP, GIF (up to 5MB)
- **Documents**: PDF, DOC, DOCX (up to 10MB)
- **Bulk Upload**: Multiple files at once
- **Cloud Storage**: Automatic optimization via Cloudinary

### **Vehicle Management:**
- Comprehensive vehicle forms
- SEO optimization
- Image galleries
- Pricing management
- Categories and filters

## 🆘 **Need Help?**

If you encounter any issues:

1. **Node.js Installation Issues**: Make sure to restart PowerShell after installation
2. **Permission Errors**: Run PowerShell as Administrator
3. **MongoDB Connection**: Use MongoDB Atlas cloud database instead of local
4. **Port Conflicts**: Change PORT in .env file if 5000 is occupied

## 🎯 **Next Steps After Installation**

1. Install Node.js from nodejs.org
2. Run `npm install` in your project folder
3. Set up environment variables
4. Start the development servers
5. Access your admin dashboard at http://localhost:3000/admin/dashboard

Your comprehensive admin dashboard with media upload from PC is ready to use! 🚗✨
