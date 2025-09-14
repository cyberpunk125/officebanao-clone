#!/bin/bash

# OfficeBanao Clone - Vercel Deployment Script
echo "🚀 Deploying OfficeBanao Clone to Vercel..."

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Installing..."
    npm install -g vercel
fi

# Check if user is logged in
if ! vercel whoami &> /dev/null; then
    echo "🔐 Please log in to Vercel..."
    vercel login
fi

# Build the frontend
echo "📦 Building frontend..."
npm run build

# Deploy to Vercel
echo "🚀 Deploying to Vercel..."
vercel --prod

# Get the deployment URL
DEPLOYMENT_URL=$(vercel ls | grep -o 'https://[^[:space:]]*' | head -1)
echo "✅ Deployment complete!"
echo "🌐 Frontend: $DEPLOYMENT_URL"
echo "🔗 API: $DEPLOYMENT_URL/api"
echo ""
echo "📝 Don't forget to set environment variables in Vercel dashboard:"
echo "   REACT_APP_API_URL = $DEPLOYMENT_URL/api"
echo ""
echo "🧪 Test your API:"
echo "   curl $DEPLOYMENT_URL/api/partners"
