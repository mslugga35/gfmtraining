# GFMTF Website Setup Instructions

## Quick Database Setup Options

### Option 1: Use Existing Supabase (If you have space)
1. Go to your Supabase project
2. Create a new schema called 'gfmtf' to separate from other projects:
   - Go to SQL Editor
   - Run: `CREATE SCHEMA IF NOT EXISTS gfmtf;`
3. Update DATABASE_URL in .env.local with `?schema=gfmtf` at the end

### Option 2: Create New Free Database (Recommended)

#### Neon (3GB Free - Best Option)
1. Sign up at https://neon.tech
2. Create new project "gfmtf-website"
3. Copy connection string to .env.local

#### OR Supabase New Project
1. Create new account with different email at https://supabase.com
2. Create project "gfmtf"
3. Copy connection details to .env.local

## Authentication Setup (Clerk - Free)
1. Sign up at https://clerk.com
2. Create application "GFMTF"
3. Copy API keys to .env.local

## File Upload Setup (UploadThing - Free)
1. Sign up at https://uploadthing.com
2. Create app "gfmtf"
3. Copy keys to .env.local

## Database Migration
```bash
# After setting up your database URL
cd gfmtf-website
npx prisma db push
```

## Run Development Server
```bash
npm run dev
```

## Access Points
- Main Site: http://localhost:3000
- Admin Dashboard: http://localhost:3000/admin
- Player Portal: http://localhost:3000/dashboard

## Default Admin Setup
After first user signs up, manually update their role to 'ADMIN' in database:
```sql
UPDATE "User" SET role = 'ADMIN' WHERE email = 'your-admin-email@example.com';
```