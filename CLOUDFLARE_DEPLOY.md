# 🚀 Deploy to Cloudflare Pages

## Step 1: Push Latest Code
```bash
git add .
git commit -m "Configure for Cloudflare Pages deployment"
git push
```

## Step 2: Set up Cloudflare Pages

1. Go to https://dash.cloudflare.com
2. Click "Workers & Pages" in sidebar
3. Click "Create application"
4. Select "Pages" tab
5. Click "Connect to Git"
6. Authorize GitHub if needed
7. Select repository: `gfmtraining`
8. Configure build settings:
   - **Framework preset**: Next.js
   - **Build command**: `npm run build`
   - **Build output directory**: `.next`
   - **Node version**: 18

## Step 3: Environment Variables

Add these in Cloudflare Pages settings:

```
DATABASE_URL=postgresql://neondb_owner:npg_IWwi0p5QXZJA@ep-silent-smoke-aemipo10-pooler.c-2.us-east-2.aws.neon.tech/neondb?sslmode=require
NEXT_PUBLIC_CONTACT_EMAIL=Larrygrayson@gfmtf.com
NEXT_PUBLIC_CONTACT_PHONE=407-519-0984
```

## Step 4: Deploy

Click "Save and Deploy"

## Step 5: Custom Domain

After deployment:
1. Go to your Pages project
2. Click "Custom domains"
3. Add `gfmtraining.com`
4. Cloudflare will auto-configure DNS

## Alternative: Netlify

If Cloudflare Pages doesn't work:

1. Go to https://app.netlify.com
2. Sign up with GitHub
3. Click "Import from Git"
4. Select your repository
5. Build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `.next`
6. Add same environment variables
7. Click "Deploy"

## URLs After Deployment:

- **Cloudflare Pages**: `gfmtraining.pages.dev`
- **Custom Domain**: `gfmtraining.com`
- **Admin**: `gfmtraining.com/admin/bookings`

## Done! 🎉

Your site will be live in 2-3 minutes!