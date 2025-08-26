interface BookingDetails {
  name: string;
  email: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  notes?: string;
  bookingId: string;
}

interface ContactDetails {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  program: string;
  message: string;
}

export const createBookingNotificationEmail = (booking: BookingDetails) => {
  const subject = `🏆 New Training Booking - ${booking.service}`;
  
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>New Booking Notification</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #DC2626; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; }
        .booking-details { background: white; padding: 15px; border-radius: 6px; margin: 10px 0; }
        .detail-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #eee; }
        .detail-label { font-weight: bold; color: #666; }
        .detail-value { color: #333; }
        .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
        .action-buttons { text-align: center; margin: 20px 0; }
        .btn { display: inline-block; padding: 12px 24px; background: #DC2626; color: white; text-decoration: none; border-radius: 6px; margin: 0 10px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🏆 New Training Booking</h1>
          <p>GFM Training Academy</p>
        </div>
        
        <div class="content">
          <h2>Booking Details</h2>
          <div class="booking-details">
            <div class="detail-row">
              <span class="detail-label">Service:</span>
              <span class="detail-value">${booking.service}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Date:</span>
              <span class="detail-value">${new Date(booking.date).toLocaleDateString()}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Time:</span>
              <span class="detail-value">${booking.time}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Customer:</span>
              <span class="detail-value">${booking.name}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Email:</span>
              <span class="detail-value">${booking.email}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Phone:</span>
              <span class="detail-value">${booking.phone}</span>
            </div>
            ${booking.notes ? `
            <div class="detail-row">
              <span class="detail-label">Notes:</span>
              <span class="detail-value">${booking.notes}</span>
            </div>
            ` : ''}
            <div class="detail-row">
              <span class="detail-label">Booking ID:</span>
              <span class="detail-value">${booking.bookingId}</span>
            </div>
          </div>
          
          <div class="action-buttons">
            <a href="https://www.gfmtraining.com/admin/bookings" class="btn">View in Admin Dashboard</a>
          </div>
          
          <p><strong>Next Steps:</strong></p>
          <ol>
            <li>Review the booking details above</li>
            <li>Contact the customer to confirm availability</li>
            <li>Update the booking status in the admin dashboard</li>
          </ol>
        </div>
        
        <div class="footer">
          <p>This email was sent from GFM Training Academy booking system.</p>
          <p>Admin Dashboard: <a href="https://www.gfmtraining.com/admin/bookings">www.gfmtraining.com/admin/bookings</a></p>
        </div>
      </div>
    </body>
    </html>
  `;
  
  return { subject, html };
};

export const createContactFormEmail = (contact: ContactDetails) => {
  const subject = `💬 New Contact Form Submission - ${contact.program}`;
  
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>New Contact Form Submission</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #DC2626; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; }
        .contact-details { background: white; padding: 15px; border-radius: 6px; margin: 10px 0; }
        .detail-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #eee; }
        .detail-label { font-weight: bold; color: #666; }
        .detail-value { color: #333; }
        .message-box { background: white; padding: 15px; border-radius: 6px; margin: 15px 0; }
        .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>💬 New Contact Form Submission</h1>
          <p>GFM Training Academy</p>
        </div>
        
        <div class="content">
          <h2>Contact Details</h2>
          <div class="contact-details">
            <div class="detail-row">
              <span class="detail-label">Name:</span>
              <span class="detail-value">${contact.firstName} ${contact.lastName}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Email:</span>
              <span class="detail-value">${contact.email}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Phone:</span>
              <span class="detail-value">${contact.phone}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Interested Program:</span>
              <span class="detail-value">${contact.program}</span>
            </div>
          </div>
          
          <h3>Message:</h3>
          <div class="message-box">
            <p>${contact.message.replace(/\n/g, '<br>')}</p>
          </div>
          
          <p><strong>Next Steps:</strong></p>
          <ol>
            <li>Respond to the customer within 24 hours</li>
            <li>Schedule a free assessment if requested</li>
            <li>Provide program information and pricing</li>
          </ol>
        </div>
        
        <div class="footer">
          <p>This email was sent from GFM Training Academy contact form.</p>
          <p>Website: <a href="https://www.gfmtraining.com">www.gfmtraining.com</a></p>
        </div>
      </div>
    </body>
    </html>
  `;
  
  return { subject, html };
};

export const createCustomerConfirmationEmail = (booking: BookingDetails) => {
  const subject = `✅ Booking Confirmed - ${booking.service} at GFM Training Academy`;
  
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Booking Confirmation</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #DC2626; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; }
        .booking-details { background: white; padding: 15px; border-radius: 6px; margin: 10px 0; }
        .detail-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #eee; }
        .detail-label { font-weight: bold; color: #666; }
        .detail-value { color: #333; }
        .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
        .contact-info { background: #e8f5e8; padding: 15px; border-radius: 6px; margin: 15px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>✅ Booking Request Received</h1>
          <p>GFM Training Academy</p>
        </div>
        
        <div class="content">
          <p>Thank you for booking with GFM Training Academy! We've received your training session request and will contact you within 24 hours to confirm your appointment.</p>
          
          <h2>Your Booking Details</h2>
          <div class="booking-details">
            <div class="detail-row">
              <span class="detail-label">Service:</span>
              <span class="detail-value">${booking.service}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Requested Date:</span>
              <span class="detail-value">${new Date(booking.date).toLocaleDateString()}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Requested Time:</span>
              <span class="detail-value">${booking.time}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Booking Reference:</span>
              <span class="detail-value">${booking.bookingId}</span>
            </div>
          </div>
          
          <div class="contact-info">
            <h3>Contact Information</h3>
            <p><strong>Phone:</strong> (407) 519-0984</p>
            <p><strong>Email:</strong> Larrygrayson@gfmtf.com</p>
            <p><strong>Location:</strong> Central Florida / South Atlanta, Georgia</p>
          </div>
          
          <p><strong>What's Next?</strong></p>
          <ol>
            <li>Coach Larry will review your request</li>
            <li>You'll receive confirmation within 24 hours</li>
            <li>Final session details will be provided</li>
          </ol>
        </div>
        
        <div class="footer">
          <p>GFM Training Academy - Where Champions are Forged</p>
          <p>Website: <a href="https://www.gfmtraining.com">www.gfmtraining.com</a></p>
        </div>
      </div>
    </body>
    </html>
  `;
  
  return { subject, html };
};