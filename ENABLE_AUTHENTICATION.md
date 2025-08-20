# 🔐 How to Enable Authentication Later

## Current Status
Authentication is temporarily disabled so the website works immediately.
The website is fully functional for viewing without login features.

## When You're Ready to Add Login Features:

### Step 1: Get Free Clerk Account
1. Go to https://clerk.com
2. Sign up (free, no credit card)
3. Create new application called "GFMTF"
4. Get your API keys from the dashboard

### Step 2: Add Keys to .env.local
Replace the placeholder values with your real keys:
```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_YOUR_REAL_KEY_HERE
CLERK_SECRET_KEY=sk_test_YOUR_REAL_SECRET_KEY_HERE
```

### Step 3: Re-enable ClerkProvider
Edit `app/layout.tsx`:
1. Remove the `//` from line 3 to uncomment the import
2. Wrap the html element with `<ClerkProvider>` tags again

Change from:
```tsx
// import { ClerkProvider } from '@clerk/nextjs';  // Temporarily disabled
...
return (
  <html lang="en">
    ...
  </html>
);
```

To:
```tsx
import { ClerkProvider } from '@clerk/nextjs';
...
return (
  <ClerkProvider>
    <html lang="en">
      ...
    </html>
  </ClerkProvider>
);
```

### Step 4: Restart the Server
```bash
# Stop server with Ctrl+C
# Start again
npm run dev
```

## What Works Without Authentication:
✅ Homepage
✅ Academy page  
✅ Shop page
✅ Calendar page
✅ Gallery page
✅ Contact page

## What Needs Authentication:
❌ Player Dashboard (/dashboard)
❌ Admin Dashboard (/admin)
❌ Video uploads
❌ Private video access

## Note:
The website is fully built and styled. Authentication only affects login/private features.