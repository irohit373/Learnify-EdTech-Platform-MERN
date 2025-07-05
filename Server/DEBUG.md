# Backend Error Debugging Guide

## 🔍 Common Backend Errors Found & Fixed

### 1. ✅ MongoDB Connection Error - FIXED
**Issue**: MongoDB URL had placeholder `<db_password>`
**Fix**: Updated to use actual password in connection string

### 2. 🔧 Other Potential Issues to Check

#### A) Environment Variables
Make sure these are set in your Server/.env file:
```
PORT=4000
MONGODB_URL=mongodb+srv://deshmukhji373:dSaRjjui9iObsC1X@cluster0.xdqzu.mongodb.net/LearnifyDB?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=PEEP
RAZORPAY_KEY=rzp_test_7Iz79Zxgiaoqb1
RAZORPAY_SECRET=Ii99W2Zos9Z0Dn6LBg5C8F1o
MAIL_HOST=smtp.gmail.com
MAIL_USER=potone373@gmail.com
MAIL_PASS=dblrstdwblqaicda
CLOUD_NAME=dmlo3yyoi
API_KEY=772565265479953
API_SECRET=VxU4bgfGRD3l1egL58IvNGvMWlM
FOLDER_NAME=LearnifyDF
```

#### B) Dependencies Check
Run these commands in Server directory:
```bash
npm install
npm audit fix
```

#### C) Test the Server
1. **Basic Test**: `node test-server.js` (I created this for you)
2. **Full Server**: `node Index.js`
3. **Development Mode**: `npm run dev`

#### D) Common Error Messages & Solutions

**Error**: "Cannot connect to MongoDB"
**Solution**: Check MongoDB Atlas connection string and network access

**Error**: "Port 4000 is already in use"
**Solution**: Kill existing process or change port:
```bash
# Windows
netstat -ano | findstr :4000
taskkill /PID <PID> /F

# Change port in .env
PORT=4001
```

**Error**: "Module not found"
**Solution**: Install missing dependencies:
```bash
npm install express mongoose cors dotenv bcrypt jsonwebtoken
```

**Error**: "Cannot read properties of undefined"
**Solution**: Check if all environment variables are loaded

### 3. 🚀 Quick Start Commands

```bash
# Navigate to Server directory
cd Server

# Install dependencies
npm install

# Start in development mode
npm run dev

# Or start normally
npm start
```

### 4. 🔍 Test Backend Manually

1. **Test Database Connection**:
   ```bash
   node -e "require('./Configuration/Database').connect()"
   ```

2. **Test Server Start**:
   ```bash
   node test-server.js
   ```

3. **Check if server is running**:
   Open browser: `http://localhost:4000`

### 5. 📋 Backend Health Check

Once running, visit these URLs:
- Main: `http://localhost:4000/`
- Health: `http://localhost:4000/health` (test server only)
- API Test: `http://localhost:4000/api/v1/auth`

### 6. 🛠️ If Server Still Won't Start

Check these files for syntax errors:
- `Index.js` - Main server file
- `Configuration/Database.js` - Database connection
- `Configuration/Cloudinary.js` - Cloudinary config
- All route files in `Route/` directory

### 7. 📝 Logs to Check

The server should show:
```
✅ DB Connection Success
✅ Cloudinary Connection Success
🎉 App is listening at 4000
```

If you see errors, they'll typically be:
- MongoDB connection errors
- Missing environment variables
- Port conflicts
- Missing dependencies

## 🔧 Next Steps

1. Try running `node test-server.js` first
2. If it works, then try `node Index.js`
3. Check browser at `http://localhost:4000`
4. If successful, your backend is working!
