# Deployment Guide for OfficeBanao Clone

## 🚀 Deploy Both Frontend & Backend on Vercel (Monorepo)

This guide shows how to deploy both your React frontend and Node.js backend on Vercel using a single repository.

## Prerequisites

- Vercel account (free tier available)
- GitHub repository connected to Vercel
- Node.js 18+ (Vercel supports up to Node.js 22)

## Quick Deployment Steps

### 1. Prepare Your Repository

The repository is already configured with the necessary files:
- ✅ `vercel.json` - Main Vercel configuration
- ✅ `backend/vercel.json` - Backend-specific configuration
- ✅ CORS properly configured for Vercel domains
- ✅ Environment variable setup in frontend

### 2. Deploy to Vercel

#### Option A: Deploy via Vercel Dashboard (Recommended)

1. **Go to [vercel.com](https://vercel.com) and sign in**
2. **Click "New Project"**
3. **Import your GitHub repository**
4. **Configure the project:**
   - **Framework Preset**: Create React App
   - **Root Directory**: `./` (root of your repo)
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`
   - **Install Command**: `npm install`

5. **Set Environment Variables:**
   - Go to Project Settings → Environment Variables
   - Add: `REACT_APP_API_URL` = `https://your-project-name.vercel.app/api`
   - Add: `NODE_ENV` = `production`

6. **Deploy!**

#### Option B: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy from your project root
vercel

# Set environment variables
vercel env add REACT_APP_API_URL
# Enter: https://your-project-name.vercel.app/api

# Deploy to production
vercel --prod
```

### 3. Verify Deployment

After deployment, your app will be available at:
- **Frontend**: `https://your-project-name.vercel.app`
- **Backend API**: `https://your-project-name.vercel.app/api`

Test the API endpoints:
- `GET https://your-project-name.vercel.app/api/partners`
- `POST https://your-project-name.vercel.app/api/partners`

## 📁 Project Structure

```
officebanao-clone/
├── vercel.json              # Main Vercel config
├── package.json             # Frontend dependencies
├── src/                     # React frontend
├── backend/
│   ├── vercel.json         # Backend Vercel config
│   ├── package.json        # Backend dependencies
│   ├── server.js           # Express server
│   └── routes/             # API routes
└── build/                  # Frontend build output
```

## 🔧 Configuration Details

### Frontend Configuration
- **Build Command**: `npm run build`
- **Output Directory**: `build`
- **Environment Variables**: `REACT_APP_API_URL`

### Backend Configuration
- **Runtime**: Node.js
- **Entry Point**: `backend/server.js`
- **API Routes**: `/api/*` → `backend/server.js`

### CORS Configuration
The backend is configured to allow:
- `https://your-project-name.vercel.app` (production)
- `http://localhost:3000` (development)
- Any localhost port for development

## 🛠️ Environment Variables

Set these in Vercel Dashboard → Project Settings → Environment Variables:

| Variable | Value | Description |
|----------|-------|-------------|
| `REACT_APP_API_URL` | `https://your-project-name.vercel.app/api` | Frontend API base URL |
| `NODE_ENV` | `production` | Node environment |

## 🔍 Troubleshooting

### Common Issues:

1. **API Routes Not Working**
   - Check `vercel.json` routes configuration
   - Ensure backend `vercel.json` exists
   - Verify API endpoints start with `/api/`

2. **CORS Errors**
   - Backend CORS is pre-configured for Vercel
   - Check browser console for specific CORS errors
   - Verify `REACT_APP_API_URL` is set correctly

3. **Build Failures**
   - Check Node.js version (use 18.x or 20.x)
   - Verify all dependencies are in `package.json`
   - Check build logs in Vercel dashboard

4. **Database Issues**
   - SQLite database is included in the backend
   - Database file persists between deployments
   - For production, consider upgrading to PostgreSQL

### Debug Commands:

```bash
# Test CORS locally
node test-cors.js

# Test API endpoints
curl https://your-project-name.vercel.app/api/partners

# Check environment variables
echo $REACT_APP_API_URL
```

## 🚀 Production Optimizations

1. **Database**: Consider upgrading to PostgreSQL for production
2. **Caching**: Add Redis for session management
3. **Monitoring**: Set up Vercel Analytics
4. **Security**: Add rate limiting and input validation
5. **Performance**: Enable Vercel Edge Functions for better performance

## 📊 Monitoring

- **Vercel Dashboard**: Monitor deployments and performance
- **Function Logs**: Check backend logs in Vercel dashboard
- **Analytics**: Enable Vercel Analytics for frontend metrics

## 🔄 Updates and Redeployments

- **Automatic**: Push to main branch triggers automatic deployment
- **Manual**: Use Vercel dashboard or `vercel --prod`
- **Environment Variables**: Update in dashboard and redeploy

## ✅ Success Checklist

- [ ] Repository connected to Vercel
- [ ] Environment variables set
- [ ] Frontend builds successfully
- [ ] Backend API responds correctly
- [ ] CORS errors resolved
- [ ] Forms submit successfully
- [ ] Database operations work
- [ ] All routes accessible

Your OfficeBanao Clone is now fully deployed on Vercel! 🎉
