# 🚀 Deploy to SiteGround

## Important Note
SiteGround doesn't support Node.js apps directly, so we'll export your site as static HTML files.

## Step 1: Build Static Files
```bash
cd C:\Users\mpmmo\gfmtf\gfmtf-website
npm run build
```

This creates an `out` folder with all your static files.

## Step 2: Prepare for Upload

The `out` folder contains:
- HTML files for each page
- CSS/JavaScript files
- Images and assets

## Step 3: Upload to SiteGround

### Option A: Using SiteGround File Manager
1. Login to SiteGround Site Tools
2. Go to Site > File Manager
3. Navigate to `public_html`
4. Upload all contents from the `out` folder
5. Make sure `index.html` is in the root

### Option B: Using FTP (Faster)
1. Get FTP credentials from SiteGround
2. Use FileZilla or similar
3. Connect to your server
4. Upload `out` folder contents to `public_html`

## Step 4: Database Connection

⚠️ **IMPORTANT**: Static sites can't directly connect to databases!

For the booking system to work, we need to create a separate API:

### Quick Solution: Use Netlify for API only
1. Deploy just the API routes to Netlify (free)
2. Update booking form to point to Netlify API
3. Keep the main site on SiteGround

### Alternative: PHP Backend
Convert the booking API to PHP (works on SiteGround)

## What Works on SiteGround:
✅ All static pages (Home, About, Services, Gallery)
✅ Contact information display
✅ Image galleries
✅ Static content

## What Needs Special Setup:
❌ Booking form submission (needs API)
❌ Admin dashboard (needs backend)
❌ Database operations

## Recommended Approach:

1. **Main Site**: Deploy to SiteGround (for speed/reliability)
2. **Booking API**: Deploy to free service like:
   - Netlify Functions
   - Vercel Functions
   - Supabase Edge Functions

Would you like me to:
1. Build the static files now?
2. Create a PHP version of the booking system?
3. Set up a separate API on a free service?