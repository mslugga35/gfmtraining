# 🚀 Neon Database Setup - Quick Guide

## Step 1: Create Free Neon Account (2 minutes)

1. Go to: **https://neon.tech**
2. Click "Start Free"
3. Sign up with Google or email
4. No credit card required!

## Step 2: Create Database (1 minute)

After signing in:
1. Click "Create a project"
2. Project name: **gfmtf**
3. Database name: **gfmtf** (or leave default)
4. Region: Choose closest to you (US East recommended)
5. Click "Create project"

## Step 3: Get Your Connection String

1. After project creation, you'll see a connection string like:
```
postgresql://username:password@host/neondb?sslmode=require
```

2. Copy the ENTIRE connection string

## Step 4: Add to Your Project

1. Open: `C:\Users\mpmmo\gfmtf\gfmtf-website\.env.local`
2. Replace the DATABASE_URL line with:
```
DATABASE_URL="your-connection-string-here"
```

Example:
```
DATABASE_URL="postgresql://alex:AbC123@ep-cool-darkness-123456.us-east-2.aws.neon.tech/neondb?sslmode=require"
```

## Step 5: That's it! I'll handle the rest.

Just paste your connection string below and I'll set up the database!