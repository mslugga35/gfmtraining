# 🔔 Coach Larry Booking Notifications

## How It Works Now:

### When a Customer Books:
1. **Customer submits booking** → Saved to database as "PENDING"
2. **Automatic WhatsApp message** → Sent to Coach Larry with all details
3. **Coach Larry confirms** → Changes status to "CONFIRMED" 
4. **Customer gets confirmation** → Via email/WhatsApp

## 3 Ways Coach Larry Gets Notified:

### 1. **WhatsApp Alert** (Automatic!)
Every new booking triggers a WhatsApp message to 407-519-0984 with:
- Service requested
- Date & time
- Customer details
- Quick confirm link

### 2. **Admin Dashboard**
Access at: https://gfmtf.com/admin/bookings
- See all pending bookings
- One-click confirm/cancel buttons
- View customer details
- Track completed sessions

### 3. **Email Notifications** (Optional Setup)
If you want email alerts too:
1. Sign up for free at https://resend.com
2. Get API key
3. Add to .env.local:
```
RESEND_API_KEY=your_key
TRAINER_EMAIL=Larrygrayson@gfmtf.com
```

## Quick Admin Access:

### On Phone:
1. Save this link: https://gfmtf.com/admin/bookings
2. Check daily for new bookings
3. Tap ✅ to confirm or ❌ to cancel

### On WhatsApp:
1. Receive instant notification
2. Click link in message to view
3. Or reply "CONFIRMED" to approve

## Booking Status Flow:

```
Customer Books → PENDING (yellow)
     ↓
Coach Confirms → CONFIRMED (green)
     ↓
After Session → COMPLETED (blue)

Or: PENDING → CANCELLED (red) if rejected
```

## Testing the Notification:
1. Submit a test booking
2. Check WhatsApp immediately
3. You'll see the notification with all details
4. Click the admin link to manage

## Mobile-Friendly Admin:
The admin page works perfectly on phone:
- Large tap targets
- Clear status colors
- Quick action buttons
- No typing needed

## Daily Workflow:
1. **Morning**: Check admin page for overnight bookings
2. **Throughout day**: WhatsApp alerts for new bookings
3. **Confirm quickly**: Keep customers happy with fast response
4. **Mark complete**: After each session for records

---
**Note**: Currently using WhatsApp as primary notification since it's instant and Coach Larry always has his phone!