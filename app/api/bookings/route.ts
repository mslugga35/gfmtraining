import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { Resend } from 'resend';
import { createBookingNotificationEmail, createCustomerConfirmationEmail } from '../../../lib/email-templates';

const prisma = new PrismaClient();
const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET(request: NextRequest) {
  try {
    const bookings = await prisma.booking.findMany({
      orderBy: { createdAt: 'desc' }
    });
    
    return NextResponse.json({ bookings });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch bookings' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const { name, email, phone, service, date, time, message } = body;
    
    if (!name || !email || !phone || !service || !date || !time) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Create booking in database
    const booking = await prisma.booking.create({
      data: {
        name,
        email,
        phone,
        service,
        date: new Date(date),
        time,
        notes: message || '',
        status: 'PENDING'
      }
    });
    
    const bookingId = booking.id.slice(-6);
    
    // Send email notifications (if Resend is configured)
    let emailSent = false;
    if (process.env.RESEND_API_KEY) {
      try {
        // Email to Coach Larry
        const coachEmail = createBookingNotificationEmail({
          name,
          email,
          phone,
          service,
          date,
          time,
          notes: message,
          bookingId
        });
        
        await resend.emails.send({
          from: 'bookings@gfmtraining.com',
          to: ['Larrygrayson@gfmtf.com'],
          subject: coachEmail.subject,
          html: coachEmail.html
        });
        
        // Confirmation email to customer
        const customerEmail = createCustomerConfirmationEmail({
          name,
          email,
          phone,
          service,
          date,
          time,
          notes: message,
          bookingId
        });
        
        await resend.emails.send({
          from: 'bookings@gfmtraining.com',
          to: [email],
          subject: customerEmail.subject,
          html: customerEmail.html
        });
        
        emailSent = true;
        console.log('Booking emails sent successfully');
      } catch (emailError) {
        console.error('Error sending booking emails:', emailError);
        // Don't fail the booking if email fails
      }
    }
    
    // Send WhatsApp notification to Coach Larry
    const coachMessage = `🏆 NEW BOOKING ALERT! 🏆

📋 SERVICE: ${service}
📅 DATE: ${date}
⏰ TIME: ${time}

👤 CUSTOMER: ${name}
📞 PHONE: ${phone}
📧 EMAIL: ${email}

📝 NOTES: ${message || 'None'}
${emailSent ? '📧 Email notifications sent!' : '⚠️ Email not configured'}

To CONFIRM this booking:
1. Go to: https://gfmtraining.com/admin/bookings
2. Or reply "CONFIRMED" to this message

Booking ID: ${bookingId}`;
    
    // Production: Coach Larry's WhatsApp number
    const coachPhoneNumber = '14075190984'; // Coach Larry's number
    const whatsappUrl = `https://wa.me/${coachPhoneNumber}?text=${encodeURIComponent(coachMessage)}`;
    
    return NextResponse.json({ 
      success: true, 
      booking,
      whatsappUrl 
    });
  } catch (error) {
    console.error('Error creating booking:', error);
    return NextResponse.json(
      { error: 'Failed to create booking' },
      { status: 500 }
    );
  }
}