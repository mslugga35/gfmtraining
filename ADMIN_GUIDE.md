# 📋 ADMIN GUIDE - GFM Training Website

## 🔗 IMPORTANT LINKS

### Live Website
- **Main Site**: https://gfmtraining.vercel.app
- **Admin Dashboard**: https://gfmtraining.vercel.app/admin/bookings

### Management Portals
- **Vercel (Hosting)**: https://vercel.com/mslugga35s-projects/gfmtraining
- **GitHub (Code)**: https://github.com/mslugga35/gfmtraining
- **Neon (Database)**: https://console.neon.tech

## 👨‍💼 HOW TO MANAGE BOOKINGS

### View All Bookings:
1. Go to: https://gfmtraining.vercel.app/admin/bookings
2. You'll see a table with all bookings
3. Each booking shows:
   - Customer name
   - Service requested
   - Date & time
   - Contact info
   - Current status

### Change Booking Status:
- Click **"Confirm"** to confirm a booking
- Click **"Cancel"** to cancel a booking
- Click **"Complete"** after session is done
- Click **"Delete"** to remove completely

### Contact Customer:
- Phone number and email are shown in table
- Click to copy and paste into your phone/email

## 📱 WHATSAPP NOTIFICATIONS

When someone books:
1. You'll get a WhatsApp message automatically
2. Message includes all booking details
3. Reply "CONFIRMED" to confirm
4. Or go to admin dashboard to manage

## 🔄 HOW TO UPDATE CONTENT

### To Change Prices:
1. Contact developer to update prices in:
   - `app/services/page.tsx`
   - `app/page.tsx` (homepage)

### To Add/Remove Services:
1. Contact developer to modify service list
2. Located in `app/booking/page.tsx`

### To Update Contact Info:
1. Update in `.env.local`:
   ```
   NEXT_PUBLIC_CONTACT_EMAIL=new_email@domain.com
   NEXT_PUBLIC_CONTACT_PHONE=xxx-xxx-xxxx
   ```
2. Redeploy site

## 📊 VIEW BOOKINGS IN DATABASE

1. Go to: https://console.neon.tech
2. Click "SQL Editor"
3. Run these queries:

### See All Bookings:
```sql
SELECT * FROM "Booking" 
ORDER BY "createdAt" DESC;
```

### See Today's Bookings:
```sql
SELECT * FROM "Booking" 
WHERE DATE(date) = CURRENT_DATE
ORDER BY time;
```

### See Pending Bookings:
```sql
SELECT * FROM "Booking" 
WHERE status = 'PENDING'
ORDER BY date, time;
```

## 🚨 TROUBLESHOOTING

### "Can't access admin page"
- Make sure URL is exactly: /admin/bookings
- Try clearing browser cache
- Check internet connection

### "Not receiving WhatsApp notifications"
- Check phone number in settings
- Make sure WhatsApp is installed
- Contact developer to verify configuration

### "Booking form not working"
1. Check if database is running (Neon dashboard)
2. Try refreshing the page
3. Contact developer if issue persists

## 📅 DAILY TASKS

### Morning (Before 8 AM):
1. Check admin dashboard for new bookings
2. Confirm today's appointments
3. Send reminders if needed

### Evening (After sessions):
1. Mark completed sessions as "COMPLETED"
2. Review tomorrow's schedule
3. Follow up with no-shows

## 💡 TIPS

1. **Bookmark the admin page** for quick access
2. **Check dashboard on mobile** - it works on phones!
3. **Export booking data** monthly for records
4. **Save customer contacts** in your phone
5. **Set up calendar reminders** for confirmed bookings

## 🔐 SECURITY NOTES

- Admin page is currently **not password protected**
- Don't share admin URL publicly
- To add password protection, contact developer

## 📞 NEED HELP?

### For Website Issues:
- Check Vercel dashboard for site status
- Contact developer for technical support

### For Booking Issues:
- Check database at Neon console
- Verify WhatsApp number is correct

### Emergency Contacts:
- Save this guide offline
- Keep developer contact handy
- Backup booking data regularly

## 🎯 QUICK REFERENCE

### Status Meanings:
- **PENDING**: New booking, needs confirmation
- **CONFIRMED**: You've confirmed the appointment
- **CANCELLED**: Customer or you cancelled
- **COMPLETED**: Session finished

### Time Slots Available:
- 8:00 AM - 7:00 PM
- 1-hour intervals
- Can be customized per request

### Services Offered:
1. 1 Hour Hitting Lesson
2. 90 Min Hitting & Bat Speed
3. 1 Hour Infield Fielding
4. 1 Hour Outfield Defense
5. 1 Hour Throwing Lesson
6. 1 Hour Base Running
7. 1 Hour Strength Training
8. 1 Hour Foot Speed & Agility
9. Virtual Training

---

**Remember**: This system is designed to make your life easier. The more you use it, the more familiar it becomes!

**Pro Tip**: Add the admin page to your phone's home screen for instant access!