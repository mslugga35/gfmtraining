# 🏆 GFM Training Academy - Complete Project Guide

## 📅 Last Updated: January 19, 2025

---

## 🚀 CURRENT STATUS

### ✅ What's Complete:
- **Full website built** with Next.js/TypeScript
- **Professional design** with red/black theme matching logo
- **Custom booking calendar** interface
- **WhatsApp integration** for quick bookings
- **Dual logo watermarks** on backgrounds
- **All 9 training services** with pricing
- **Player/Admin dashboards** (ready for activation)
- **Video annotation system** built in

### 🌐 Access Your Site:
```
http://localhost:3003
```

---

## 📧 EMAIL SITUATION

### ⚠️ Important Note About Email:
- Current email: **Larrygrayson@gfmtf.com**
- This may be tied to current website hosting
- **Switching websites might affect email access**

### 📋 Email Options:
1. **Keep Current Email** - Check with current host if email is separate
2. **Gmail for Business** - $6/month per user
3. **Microsoft 365** - $6/month includes email + Office
4. **Zoho Mail** - Free for 1 domain, 5 users
5. **Use personal email** temporarily during transition

---

## 📅 CUSTOM BOOKING SYSTEM

### Current Implementation:
We've built a **complete custom booking system** that includes:
- Clean calendar interface
- Service selection
- Time slot picker
- Contact form integration
- WhatsApp quick booking

### What's Needed to Go Live:

#### 1. **Database Setup** (Required)
Choose one (all have free tiers):
```
Option A: Neon.tech (Recommended)
- 3GB free storage
- Sign up: https://neon.tech
- Setup time: 5 minutes

Option B: Supabase
- 500MB free storage
- May already have account
- Sign up: https://supabase.com

Option C: MongoDB Atlas
- 512MB free storage
- Sign up: https://mongodb.com/atlas
```

#### 2. **Email Notifications** (Optional but recommended)
Choose one:
```
Option A: Resend.com (Recommended)
- 100 emails/day free
- Easiest setup
- Sign up: https://resend.com

Option B: Just use WhatsApp
- No email needed
- Customers message directly
```

#### 3. **Schedule Configuration**
Based on current site:
- **Hours:** Mon-Sat 9:00 AM - 6:00 PM (verify with Coach Larry)
- **Services & Pricing:** (Already in system)
  - 1 Hour Hitting Lesson - $85
  - 90 Min Hitting & Bat Speed - $120
  - 1 Hour Fielding - $85
  - 1 Hour Throwing - $85
  - 1 Hour Base Running - $85
  - 1 Hour Strength Training - $85
  - 1 Hour Agility - $85
  - Virtual Training - $85

---

## 🔧 SETUP INSTRUCTIONS

### Step 1: Database Setup (5 minutes)
```bash
1. Go to https://neon.tech
2. Sign up (free, no credit card)
3. Create database "gfmtf"
4. Copy connection string
5. Add to .env.local:
   DATABASE_URL="your-connection-string"
6. Run: npx prisma db push
```

### Step 2: Email Setup (Optional, 3 minutes)
```bash
1. Go to https://resend.com
2. Sign up free
3. Get API key
4. Add to .env.local:
   RESEND_API_KEY="your-api-key"
```

### Step 3: Deploy Options
```
Option A: Vercel (Recommended, Free)
- Connect GitHub
- Import project
- Deploy

Option B: Netlify (Free)
- Drag & drop build folder

Option C: Traditional Hosting
- Build: npm run build
- Upload .next folder
```

---

## 📁 PROJECT STRUCTURE

```
C:\Users\mpmmo\gfmtf\gfmtf-website\
├── app/                    # All pages and components
│   ├── page.tsx           # Homepage
│   ├── academy/           # Academy section
│   ├── services/          # Services with booking
│   ├── booking/           # Booking system
│   ├── calendar/          # Calendar page
│   ├── gallery/           # Media gallery
│   ├── dashboard/         # Player portal (needs auth)
│   ├── admin/             # Admin panel (needs auth)
│   └── components/        # All React components
├── public/                # Images and assets
│   ├── gfm_logo.webp     # Logo
│   ├── hero-main.jpg     # Hero image
│   └── 1-10.webp         # Gallery images
├── prisma/                # Database schema
├── .env.local            # Environment variables
└── package.json          # Dependencies
```

---

## 🎨 DESIGN SPECIFICATIONS

### Colors:
- **Primary Black:** #000000
- **Accent Red:** #DC2626 (matches logo)
- **Background:** #e5e5e5 (light gray)
- **Text:** Black on light, White on dark

### Typography:
- **Headings:** Montserrat (modern, bold)
- **Body:** Inter (clean, readable)

### Key Features:
- Dual logo watermarks (subtle background)
- Red accent buttons
- Compact, professional spacing
- Mobile responsive

---

## 📞 CONTACT INFORMATION

### Current (from website):
- **Phone 1:** 407-519-0984
- **Phone 2:** 407-419-2087
- **Email:** Larrygrayson@gfmtf.com
- **WhatsApp:** Both numbers
- **Instagram:** @gfm_training_academy
- **YouTube:** @CoachLarryGrayson11

### Business Info:
- **Hours:** Mon-Sat 9:00 AM - 6:00 PM
- **Location:** Central Florida / South Atlanta, GA
- **Owner/Coach:** Larry Grayson

---

## 🚨 IMPORTANT DECISIONS NEEDED

### Before Going Live:

1. **Email Service:**
   - Will current email transfer?
   - Need backup email plan?

2. **Booking System:**
   - Use custom (ready now)?
   - Add Cal.com later?
   - Just WhatsApp for now?

3. **Domain:**
   - Who controls gfmtf.com?
   - How to transfer?
   - DNS settings?

4. **Hosting:**
   - Current host details?
   - Move to Vercel (free)?
   - Keep current host?

---

## 🎯 RECOMMENDED NEXT STEPS

### Immediate (This Week):
1. ✅ Test website locally
2. ✅ Verify all content/pricing with Coach Larry
3. ✅ Check email situation with current host
4. ✅ Decide on booking system approach

### Soon (Next Week):
1. ⏳ Set up database (Neon)
2. ⏳ Configure email notifications
3. ⏳ Deploy to staging site
4. ⏳ Test booking system

### Later (When Ready):
1. ⏳ Transfer domain
2. ⏳ Go live
3. ⏳ Add analytics
4. ⏳ SEO optimization

---

## 💻 TECHNICAL COMMANDS

### Run Website:
```bash
cd C:\Users\mpmmo\gfmtf\gfmtf-website
npm run dev
```

### Build for Production:
```bash
npm run build
npm start
```

### Database Setup:
```bash
npx prisma db push    # Create tables
npx prisma studio      # View data
```

---

## 📱 FEATURES READY TO USE

### Public Features (Working Now):
- ✅ Homepage with hero
- ✅ Academy information
- ✅ Services with pricing
- ✅ Gallery with images
- ✅ Calendar view
- ✅ Contact forms
- ✅ WhatsApp integration
- ✅ Mobile responsive

### Features Needing Setup:
- ⏳ Player login (needs auth)
- ⏳ Admin dashboard (needs auth)
- ⏳ Video uploads (needs storage)
- ⏳ Email confirmations (needs email service)
- ⏳ Database storage (needs database)

---

## 🆘 TROUBLESHOOTING

### Website Won't Start:
```bash
# Kill all Node processes
taskkill /F /IM node.exe

# Clear cache and restart
rm -rf .next node_modules/.cache
npm run dev
```

### Port Already in Use:
```bash
# Website will auto-select new port
# Check terminal for: http://localhost:3003
```

### Database Issues:
```bash
# Reset database
npx prisma db push --force-reset
```

---

## 📝 NOTES

### What Makes This Better Than Original:
1. **Modern design** - Clean, professional look
2. **Booking system** - Built-in scheduling
3. **Player portal** - Private video access
4. **Admin dashboard** - Easy management
5. **Mobile optimized** - Works on all devices
6. **Fast loading** - Next.js optimization
7. **Video tools** - Annotation for training

### Email Concern:
The email Larrygrayson@gfmtf.com might be:
- Hosted with current website provider
- Part of a hosting package
- Separate email service

**Action:** Check with current provider before switching

### Booking System Strategy:
1. **Phase 1:** Use WhatsApp + Contact form (working now)
2. **Phase 2:** Activate custom booking (after database setup)
3. **Phase 3:** Add Cal.com if needed (future option)

---

## 📞 SUPPORT

### For Website Issues:
- Check this guide first
- Run troubleshooting commands
- All code is in: C:\Users\mpmmo\gfmtf\gfmtf-website

### Key Files to Backup:
- `.env.local` (your settings)
- `prisma/schema.prisma` (database structure)
- `public/` folder (all images)

---

**Created by:** Claude Code Assistant
**Date:** January 19, 2025
**Version:** 2.0 - Custom Booking System Ready