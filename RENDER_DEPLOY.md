# 🚀 Deploy to Render.com (FREE & EASY)

## Why Render?
- ✅ Free tier includes 750 hours/month
- ✅ Full Next.js support (API routes work!)
- ✅ Database connections work
- ✅ Custom domains supported
- ✅ Auto-deploys from GitHub

## Step 1: Sign Up
1. Go to https://render.com
2. Sign up with GitHub (easiest)

## Step 2: Create Web Service
1. Click "New +" → "Web Service"
2. Connect your GitHub account
3. Select repository: `gfmtraining`
4. Configure:
   - **Name**: gfmtraining
   - **Region**: Oregon (US West)
   - **Branch**: main
   - **Runtime**: Node
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Instance Type**: FREE

## Step 3: Environment Variables
Click "Environment" and add:

```
DATABASE_URL=postgresql://neondb_owner:npg_IWwi0p5QXZJA@ep-silent-smoke-aemipo10-pooler.c-2.us-east-2.aws.neon.tech/neondb?sslmode=require
NEXT_PUBLIC_CONTACT_EMAIL=Larrygrayson@gfmtf.com
NEXT_PUBLIC_CONTACT_PHONE=407-519-0984
NODE_ENV=production
```

## Step 4: Deploy
Click "Create Web Service" - deployment starts automatically!

## Step 5: Custom Domain (After Deploy)
1. Go to Settings → Custom Domains
2. Add `gfmtraining.com`
3. Update DNS in Cloudflare:
   - Type: CNAME
   - Name: @
   - Target: [your-app].onrender.com

## URLs:
- **Render URL**: `gfmtraining.onrender.com`
- **Custom**: `gfmtraining.com`
- **Admin**: `gfmtraining.com/admin/bookings`

## ⏱️ Timeline:
- First deploy: 5-10 minutes
- Site live: Immediately after
- Custom domain: 10-30 min for DNS

## 💡 Note:
Free tier sleeps after 15 min of inactivity (first request takes ~30 seconds to wake up)

## Alternative: Railway.app
Similar to Render, also free with $5 credit/month:
1. Go to https://railway.app
2. Deploy from GitHub
3. Same environment variables
4. Automatic!