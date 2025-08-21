# 🚀 GFM TRAINING WEBSITE - COMPLETE DEPLOYMENT INFORMATION

## 🌐 LIVE WEBSITE URLS
- **Vercel URL**: https://gfmtraining.vercel.app
- **Backup URL**: https://gfmtraining-18cbu006o-mslugga35s-projects.vercel.app
- **Custom Domain** (to be configured): https://gfmtraining.com

## 📊 DATABASE CONNECTION
**Neon PostgreSQL Database**
```
DATABASE_URL=postgresql://neondb_owner:npg_IWwi0p5QXZJA@ep-silent-smoke-aemipo10-pooler.c-2.us-east-2.aws.neon.tech/neondb?sslmode=require
```
- **Provider**: Neon (https://console.neon.tech)
- **Database Name**: neondb
- **Region**: US East 2

## 🔧 GITHUB REPOSITORY
- **URL**: https://github.com/mslugga35/gfmtraining
- **Branch**: main
- **Owner**: mslugga35

## 🚀 VERCEL DEPLOYMENT
- **Project Name**: gfmtraining
- **Account**: mslugga35's projects
- **Deploy Hook**: https://api.vercel.com/v1/integrations/deploy/prj_HKH7YkxztqJJhsJwHUIJbKsz5Is9/zrQaNHfCDv

### To Redeploy:
```bash
curl -X POST "https://api.vercel.com/v1/integrations/deploy/prj_HKH7YkxztqJJhsJwHUIJbKsz5Is9/zrQaNHfCDv"
```

## 📱 WHATSAPP NOTIFICATION
- **Coach Larry's Number**: 14075190984
- **Format**: WhatsApp link auto-opens when booking is made
- **Located in**: app/api/bookings/route.ts (line 70)

## 🌍 CUSTOM DOMAIN SETUP (CLOUDFLARE)

### Step 1: In Vercel
1. Go to Settings → Domains
2. Add `gfmtraining.com`
3. Add `www.gfmtraining.com`

### Step 2: In Cloudflare DNS
Add these records:
```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

### Step 3: Cloudflare Settings
- SSL/TLS: Set to "Full"
- Proxy: Initially OFF (gray cloud)

## 🛠️ LOCAL DEVELOPMENT

### Setup:
```bash
cd C:\Users\mpmmo\gfmtf\gfmtf-website
npm install
```

### Run Development Server:
```bash
npm run dev
```
- Opens at: http://localhost:3004

### Build for Production:
```bash
npm run build
```

## 📂 PROJECT STRUCTURE
```
gfmtf-website/
├── app/                    # Next.js app directory
│   ├── admin/             # Admin dashboard pages
│   ├── api/               # API routes (bookings)
│   ├── booking/           # Booking system pages
│   ├── components/        # React components
│   ├── dashboard/         # User dashboard (videos)
│   └── page.tsx           # Homepage
├── prisma/
│   └── schema.prisma      # Database schema
├── public/                # Static assets (images)
├── .env.local            # Environment variables
└── package.json          # Dependencies
```

## 🔑 KEY FEATURES
1. **Booking System**: Full booking form with database storage
2. **Admin Dashboard**: View and manage bookings at /admin/bookings
3. **WhatsApp Integration**: Auto-notifies Coach Larry of new bookings
4. **Gallery**: Photo gallery of training sessions
5. **Services Page**: Lists all training options with pricing
6. **Contact Page**: Contact information and embedded map

## 🐛 TROUBLESHOOTING

### If site is down:
1. Check Vercel dashboard: https://vercel.com/mslugga35s-projects/gfmtraining
2. Trigger redeploy using webhook above

### If database connection fails:
1. Check Neon dashboard: https://console.neon.tech
2. Verify DATABASE_URL in Vercel environment variables

### If bookings aren't working:
1. Check database has Booking table
2. Run locally to test: `npm run dev`
3. Check browser console for errors

## 💰 COSTS
- **Domain**: ~$10/year (Cloudflare)
- **Hosting**: FREE (Vercel - 100GB bandwidth/month)
- **Database**: FREE (Neon - 3GB storage)
- **Total**: ~$10/year

## 🔐 ADMIN ACCESS
- **Admin Dashboard**: https://gfmtraining.com/admin/bookings
- **Note**: Currently no authentication - add Clerk.com for security

## 📈 MONITORING
- **Vercel Analytics**: Built-in, check dashboard
- **Database**: Monitor at https://console.neon.tech
- **Errors**: Check Vercel Functions tab for API logs

## 🚨 IMPORTANT NOTES
1. **Never commit .env.local** to GitHub (contains secrets)
2. **Database credentials** are sensitive - keep secure
3. **WhatsApp number** in code - update if Coach changes number
4. **Prisma migrations** - run `npx prisma db push` after schema changes
5. **Build errors** - Usually fixed by `npx prisma generate`

## 📞 CONTACT INFO
- **Coach Larry Grayson**
  - Phone: 407-519-0984
  - Email: Larrygrayson@gfmtf.com
  - WhatsApp: +1 407-519-0984

## 🎯 QUICK COMMANDS

### Deploy to Production:
```bash
git add .
git commit -m "Your changes"
git push
```

### View Logs:
```bash
vercel logs
```

### Database Queries:
```sql
-- View all bookings
SELECT * FROM "Booking" ORDER BY "createdAt" DESC;

-- Update booking status
UPDATE "Booking" SET status = 'CONFIRMED' WHERE id = 'booking_id';
```

## 🔄 BACKUP STRATEGY
1. **Code**: Backed up on GitHub
2. **Database**: Export from Neon dashboard monthly
3. **Images**: Keep originals in separate folder

---

**Created**: August 20, 2025
**Last Updated**: August 20, 2025
**Developer**: Claude Assistant with human collaboration

## 🎉 DEPLOYMENT SUCCESS!
Site is LIVE at: https://gfmtraining.vercel.app
Ready for custom domain configuration!