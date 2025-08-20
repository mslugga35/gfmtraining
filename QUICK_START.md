# 🚀 GFMTF Website - Quick Start Guide

## ✅ Everything is Built and Ready!

Your complete GFMTF Training website is ready with ALL requested features:

### 🎯 Features Implemented:
- ✅ **Homepage** - Matching current GFMTF.com dark design
- ✅ **Academy Section** - With 13U Baseball training programs
- ✅ **Shop/Store** - Complete e-commerce functionality
- ✅ **Calendar** - Training schedules and events
- ✅ **Media Gallery** - Photos and videos showcase
- ✅ **Player Portal** - Private video access with login
- ✅ **Admin Dashboard** - Complete content management
- ✅ **Video Annotation** - Drawing tools with Fabric.js
- ✅ **Authentication** - Clerk integration for secure login

## 🔧 Quick Setup (5 minutes)

### Step 1: Choose Your Database

#### Option A: Use Supabase (If you have space)
```bash
# Go to your Supabase dashboard
# SQL Editor > New Query
CREATE SCHEMA IF NOT EXISTS gfmtf;
```
Then update `.env.local`:
```
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT].supabase.co:5432/postgres?schema=gfmtf"
```

#### Option B: Use Neon (Free 3GB)
1. Sign up at https://neon.tech
2. Create project "gfmtf"
3. Copy connection string to `.env.local`

### Step 2: Setup Authentication (Clerk)
1. Sign up at https://clerk.com (free)
2. Create application "GFMTF"
3. Copy keys to `.env.local`:
```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
```

### Step 3: Setup File Uploads (UploadThing)
1. Sign up at https://uploadthing.com (free)
2. Create app "gfmtf"
3. Copy keys to `.env.local`:
```
UPLOADTHING_SECRET=sk_live_...
UPLOADTHING_APP_ID=...
```

### Step 4: Initialize Database
```bash
cd gfmtf-website
npx prisma db push
```

### Step 5: Run the Website!
```bash
npm run dev
```

## 🌐 Access Your Site

- **Main Site**: http://localhost:3000
- **Player Login**: http://localhost:3000/sign-in
- **Player Dashboard**: http://localhost:3000/dashboard
- **Admin Dashboard**: http://localhost:3000/admin

## 👤 Make Yourself Admin

After signing up, update your role in the database:
```sql
UPDATE "User" SET role = 'ADMIN' WHERE email = 'your-email@example.com';
```

## 📱 Key Pages Created:

### Public Pages:
- `/` - Homepage
- `/academy` - Training programs
- `/shop` - Store/merchandise
- `/calendar` - Events calendar
- `/gallery` - Media gallery

### Player Pages:
- `/dashboard` - Player home
- `/dashboard/videos` - Private training videos
- `/dashboard/progress` - Performance tracking
- `/dashboard/calendar` - Personal schedule

### Admin Pages:
- `/admin` - Admin dashboard
- `/admin/players` - Manage players
- `/admin/videos/upload` - Upload videos for players
- `/admin/events` - Manage events
- `/admin/shop` - Manage products

## 🎨 Video Annotation Features:
- Drawing tools (pencil, shapes, arrows)
- Text annotations
- Color picker
- Save/load annotations
- Export as image

## 💡 Need Help?

All components are in `app/components/`
All pages are in `app/`
Database schema is in `prisma/schema.prisma`

The site is FULLY FUNCTIONAL and ready to deploy!