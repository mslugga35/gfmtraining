# 🚀 Deployment Guide for gfmtraining.com

## Step 1: Push to GitHub

```bash
# Initialize git if not already done
git init
git add .
git commit -m "Initial GFMTF website"

# Create repository on GitHub.com first, then:
git remote add origin https://github.com/YOUR_USERNAME/gfmtraining
git push -u origin main
```

## Step 2: Deploy to Vercel

1. Go to https://vercel.com
2. Sign up/login with GitHub
3. Click "New Project"
4. Import your `gfmtraining` repository
5. Configure:
   - Framework: Next.js (auto-detected)
   - Root Directory: ./ (leave as is)
   - Environment Variables (IMPORTANT!):

```
DATABASE_URL=postgresql://neondb_owner:npg_IWwi0p5QXZJA@ep-silent-smoke-aemipo10-pooler.c-2.us-east-2.aws.neon.tech/neondb?sslmode=require
NEXT_PUBLIC_CONTACT_EMAIL=Larrygrayson@gfmtf.com
NEXT_PUBLIC_CONTACT_PHONE=407-519-0984
```

6. Click "Deploy"

## Step 3: Connect Cloudflare Domain

### In Vercel:
1. Go to your project settings
2. Click "Domains"
3. Add `gfmtraining.com` and `www.gfmtraining.com`
4. Vercel will show you DNS records to add

### In Cloudflare:
1. Go to DNS settings for gfmtraining.com
2. Add these records:

```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

3. Set Cloudflare SSL/TLS to "Full"
4. Turn OFF Cloudflare proxy (orange cloud) initially

## Step 4: SSL Certificate
- Vercel handles SSL automatically
- Takes 10-30 minutes to activate
- Your site will have HTTPS!

## Step 5: Test Everything

### URLs to Test:
- https://gfmtraining.com
- https://www.gfmtraining.com
- https://gfmtraining.com/booking
- https://gfmtraining.com/admin/bookings

### Update WhatsApp Number:
Change back to Coach Larry's number in:
`app/api/bookings/route.ts` line 70:
```javascript
const testPhoneNumber = '14075190984'; // Coach Larry's number
```

## 🎯 Post-Deployment Checklist:

- [ ] Domain working (gfmtraining.com)
- [ ] SSL certificate active (https://)
- [ ] Booking form submits to database
- [ ] Admin dashboard accessible
- [ ] WhatsApp notifications working
- [ ] All images loading
- [ ] Mobile responsive
- [ ] Contact info correct

## 📱 Share with Coach Larry:

**Admin Dashboard:**
https://gfmtraining.com/admin/bookings

**Main Website:**
https://gfmtraining.com

## 🔧 Maintenance:

### View Database:
1. Go to https://console.neon.tech
2. SQL Editor
3. Run: `SELECT * FROM "Booking" ORDER BY "createdAt" DESC;`

### Update Content:
1. Make changes in GitHub
2. Vercel auto-deploys on push
3. Changes live in ~45 seconds

## 💰 Costs:
- Domain: ~$10/year (Cloudflare)
- Hosting: FREE (Vercel)
- Database: FREE (Neon - 3GB)
- Total: ~$10/year

## 🚨 Important Notes:
1. Keep Neon database credentials secret
2. Regular backups recommended
3. Monitor usage to stay in free tiers
4. Add Google Analytics later

---
Ready to go live! 🎉