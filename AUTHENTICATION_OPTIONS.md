# Authentication Options for GFM Training

## Option 1: Clerk (Recommended - Easiest)
```bash
npm install @clerk/nextjs
```
- Pre-built UI components
- Social logins (Google, Facebook)
- Email/password authentication
- User management dashboard
- Free tier: 10,000 monthly active users

## Option 2: NextAuth.js
```bash
npm install next-auth
```
- Open source
- Multiple providers
- Database or JWT sessions
- More customization required

## Option 3: Supabase Auth
```bash
npm install @supabase/supabase-js
```
- Built-in with your existing Supabase database
- Row-level security
- Magic links
- Social providers

## Option 4: Auth0
```bash
npm install @auth0/nextjs-auth0
```
- Enterprise-grade
- Advanced security features
- More complex setup

## Quick Setup Commands

### For Clerk (Easiest):
```bash
cd C:\Users\mpmmo\gfmtf\gfmtf-website
npm install @clerk/nextjs
npx clerk-setup
```

### For Supabase (Already have database):
```bash
cd C:\Users\mpmmo\gfmtf\gfmtf-website
# Auth is already included with @supabase/supabase-js
```

### For Claude Flow (if you want to use it):
```bash
cd C:\Users\mpmmo\gfmtf\gfmtf-website
npx claude-flow@alpha swarm "add clerk authentication to protect admin pages" --claude
```

## What needs authentication?
1. `/admin/bookings` - View and manage bookings
2. `/admin/dashboard` - Analytics and reports
3. `/admin/settings` - Site configuration

## Recommended: Clerk
Since you want something that works quickly, Clerk is the best option:
- 5-minute setup
- Beautiful pre-built components
- Works perfectly with Next.js
- No complex configuration