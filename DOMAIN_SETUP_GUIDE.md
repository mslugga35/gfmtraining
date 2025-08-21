# 🌐 Custom Domain Setup Guide - gfmtraining.com

## Step 1: Add Domain in Vercel (5 minutes)

1. **Login to Vercel**
   - Go to: https://vercel.com
   - Login with your account

2. **Navigate to Project Settings**
   - Click on your project: **gfmtraining**
   - Go to **Settings** tab
   - Click **Domains** in the left sidebar

3. **Add Your Domain**
   - Click **Add** button
   - Enter: `gfmtraining.com`
   - Click **Add** to confirm
   - Also add: `www.gfmtraining.com`

4. **Copy DNS Records**
   - Vercel will show you the required DNS records
   - Keep this page open for reference

## Step 2: Configure Cloudflare DNS (10 minutes)

1. **Login to Cloudflare**
   - Go to: https://dash.cloudflare.com
   - Select your domain: **gfmtraining.com**

2. **Add DNS Records**
   - Go to **DNS** → **Records**
   - Delete any existing A or CNAME records for @ and www

3. **Add Root Domain Record**
   ```
   Type: A
   Name: @ (or gfmtraining.com)
   IPv4 address: 76.76.21.21
   Proxy status: DNS only (gray cloud)
   TTL: Auto
   ```
   Click **Save**

4. **Add WWW Record**
   ```
   Type: CNAME
   Name: www
   Target: cname.vercel-dns.com
   Proxy status: DNS only (gray cloud)
   TTL: Auto
   ```
   Click **Save**

## Step 3: Configure SSL Settings (2 minutes)

1. **In Cloudflare**
   - Go to **SSL/TLS** → **Overview**
   - Set encryption mode to: **Full**
   - This is CRITICAL - must be "Full" not "Flexible"

2. **Turn OFF Proxy Initially**
   - In DNS settings, make sure both records show gray cloud (DNS only)
   - This helps with initial verification

## Step 4: Verify in Vercel (5-10 minutes)

1. **Return to Vercel**
   - Go back to your Domains page
   - You should see verification in progress

2. **Wait for Verification**
   - Vercel will verify domain ownership
   - This can take 5-10 minutes
   - You'll see green checkmarks when complete

3. **SSL Certificate**
   - Vercel will automatically provision SSL certificate
   - This happens after verification

## Step 5: Test Your Domain (After verification)

1. **Test URLs**
   - Visit: https://gfmtraining.com
   - Visit: https://www.gfmtraining.com
   - Both should load your site with SSL

2. **Check Redirects**
   - HTTP should redirect to HTTPS automatically
   - www should work alongside non-www

## Step 6: Enable Cloudflare Proxy (Optional - After testing)

Once everything works:
1. Go back to Cloudflare DNS
2. Click the gray clouds to turn them orange (Proxied)
3. This enables Cloudflare's CDN and protection

## ⏱️ Timeline

- **Immediate**: DNS records visible
- **5-10 minutes**: Domain verification in Vercel
- **10-30 minutes**: SSL certificate issued
- **Up to 48 hours**: Full global DNS propagation (usually much faster)

## 🚨 Troubleshooting

### "Invalid Configuration" in Vercel
- Check DNS records match exactly
- Ensure SSL/TLS is set to "Full" in Cloudflare
- Turn off Cloudflare proxy temporarily

### Site Not Loading
- Clear browser cache
- Try incognito/private browsing
- Check DNS propagation: https://dnschecker.org

### SSL Certificate Error
- Wait 30 minutes for auto-provisioning
- Ensure Cloudflare SSL is "Full" not "Flexible"
- Check domain verification completed in Vercel

## 📞 Quick Actions

**Check Current Status:**
```bash
# Check DNS records (Windows)
nslookup gfmtraining.com

# Check if site responds
curl -I https://gfmtraining.com
```

**Force DNS Refresh:**
- Windows: `ipconfig /flushdns`
- Mac: `sudo dscachutil -flushcache`

## ✅ Success Indicators

You'll know it's working when:
1. ✅ Vercel shows green checkmarks for both domains
2. ✅ https://gfmtraining.com loads your site
3. ✅ Browser shows secure padlock icon
4. ✅ Both www and non-www versions work

## 📝 Important Notes

- **DO NOT** change nameservers - keep Cloudflare as your DNS provider
- **DO NOT** use "Flexible" SSL - must be "Full"
- **DO NOT** delete DNS records once working
- **SAVE** this guide for future reference

## 🎯 Next Steps After Domain Works

1. Update all marketing materials with new domain
2. Set up email forwarding for @gfmtraining.com
3. Add domain to Google Search Console
4. Update social media profiles with new website

---

**Created**: August 20, 2025
**Domain**: gfmtraining.com
**Current Status**: Ready for configuration

## Need Help?

If you get stuck at any step:
1. Take a screenshot of the error
2. Check the troubleshooting section above
3. The most common issue is SSL set to "Flexible" instead of "Full"