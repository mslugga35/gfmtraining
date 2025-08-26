import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { createContactFormEmail } from '../../../lib/email-templates';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const { firstName, lastName, email, phone, program, message } = body;
    
    if (!firstName || !lastName || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Send email notifications (if Resend is configured)
    let emailSent = false;
    if (process.env.RESEND_API_KEY) {
      try {
        // Email to Coach Larry
        const contactEmail = createContactFormEmail({
          firstName,
          lastName,
          email,
          phone: phone || 'Not provided',
          program: program || 'General Inquiry',
          message
        });
        
        await resend.emails.send({
          from: 'contact@gfmtraining.com',
          to: ['Larrygrayson@gfmtf.com'],
          subject: contactEmail.subject,
          html: contactEmail.html,
          replyTo: email // Allow direct reply to customer
        });
        
        emailSent = true;
        console.log('Contact form email sent successfully');
      } catch (emailError) {
        console.error('Error sending contact email:', emailError);
        // Don't fail the contact form if email fails
      }
    }
    
    // Send WhatsApp notification to Coach Larry
    const coachMessage = `💬 NEW CONTACT FORM SUBMISSION 💬

👤 NAME: ${firstName} ${lastName}
📧 EMAIL: ${email}
📞 PHONE: ${phone || 'Not provided'}
🎯 INTERESTED PROGRAM: ${program || 'General Inquiry'}

💬 MESSAGE:
${message}

${emailSent ? '📧 Email notification sent!' : '⚠️ Email not configured'}

Please respond to this inquiry promptly!`;
    
    // Production: Coach Larry's WhatsApp number
    const coachPhoneNumber = '14075190984';
    const whatsappUrl = `https://wa.me/${coachPhoneNumber}?text=${encodeURIComponent(coachMessage)}`;
    
    return NextResponse.json({ 
      success: true, 
      message: 'Contact form submitted successfully',
      whatsappUrl 
    });
  } catch (error) {
    console.error('Error processing contact form:', error);
    return NextResponse.json(
      { error: 'Failed to submit contact form' },
      { status: 500 }
    );
  }
}