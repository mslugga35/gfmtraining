# 🔐 Clerk Authentication Setup Guide

## Step 1: Create Your Clerk Account (2 minutes)

1. **Open Clerk Dashboard**: https://dashboard.clerk.com/sign-up
2. **Sign up** with your email or Google account
3. **Create an Application** named "GFM Training"
4. **Choose Settings**:
   - Select "Email" and optionally "Google" for sign-in methods
   - Keep other defaults

## Step 2: Get Your API Keys

After creating your application, you'll see:
```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
```

## Step 3: Add Keys to Your Project

1. Create/update `.env.local` file in your project:
```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_publishable_key_here
CLERK_SECRET_KEY=your_secret_key_here

# Add these for the sign-in/up pages
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/admin/bookings
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/admin/bookings
```

## Step 4: Quick Test

After adding your keys, the authentication will automatically:
- Protect `/admin/*` routes
- Redirect to sign-in when accessing admin pages
- Show user button in the admin area

## What's Protected Now:
✅ `/admin/bookings` - Booking management
✅ `/dashboard/*` - All dashboard pages
✅ Any future `/admin/*` pages

## Default Test Account
You can create a test account with:
- Email: admin@gfmtraining.com
- Password: (your choice)

## Customization Options
- Change sign-in appearance in Clerk Dashboard → Customization
- Modify protected routes in `middleware.ts`
- Add user roles if needed

---

**Need your API keys?**
Go to: https://dashboard.clerk.com