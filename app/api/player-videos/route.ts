import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { PrismaClient } from '@prisma/client';
import { Resend } from 'resend';

const prisma = new PrismaClient();
const resend = new Resend(process.env.RESEND_API_KEY);

// POST /api/player-videos - Player uploads a video
export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const category = formData.get('category') as string;
    const requestFeedback = formData.get('requestFeedback') === 'true';
    const urgency = formData.get('urgency') as string;
    const specificQuestions = formData.get('specificQuestions') as string;
    const playerName = formData.get('playerName') as string;

    // Get or create user in database
    let user = await prisma.user.findUnique({
      where: { clerkId: userId }
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          clerkId: userId,
          email: formData.get('email') as string || '',
          fullName: playerName,
          role: 'PLAYER'
        }
      });
    }

    // Create video entry in database
    const video = await prisma.playerVideo.create({
      data: {
        playerId: user.id,
        title,
        description: `${description}\n\nCategory: ${category}\nQuestions: ${specificQuestions}`,
        videoUrl: 'pending_upload', // Will be updated after UploadThing completes
        uploadedById: user.id,
        isPrivate: true,
        annotations: []
      }
    });

    // Send notification to Coach Larry if feedback requested
    if (requestFeedback && process.env.RESEND_API_KEY) {
      try {
        // Email notification to Coach Larry
        const emailHtml = `
          <!DOCTYPE html>
          <html>
            <head>
              <style>
                body { font-family: Arial, sans-serif; background-color: #f5f5f5; }
                .container { max-width: 600px; margin: 0 auto; background-color: white; padding: 20px; border-radius: 10px; }
                .header { background-color: #dc2626; color: white; padding: 20px; border-radius: 10px 10px 0 0; text-align: center; }
                .urgency-high { background-color: #ef4444; color: white; padding: 5px 10px; border-radius: 5px; display: inline-block; }
                .urgency-normal { background-color: #f59e0b; color: white; padding: 5px 10px; border-radius: 5px; display: inline-block; }
                .urgency-low { background-color: #10b981; color: white; padding: 5px 10px; border-radius: 5px; display: inline-block; }
                .content { padding: 20px; }
                .info-box { background-color: #f3f4f6; padding: 15px; border-radius: 5px; margin: 15px 0; }
                .button { background-color: #dc2626; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block; margin-top: 10px; }
                .footer { text-align: center; color: #6b7280; margin-top: 20px; font-size: 12px; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h1>🎥 New Video Review Request</h1>
                </div>
                <div class="content">
                  <p>Hi Coach Larry,</p>
                  
                  <p><strong>${playerName}</strong> has uploaded a new training video and requested your professional analysis.</p>
                  
                  <div class="info-box">
                    <h3>📋 Video Details</h3>
                    <p><strong>Title:</strong> ${title}</p>
                    <p><strong>Category:</strong> ${category}</p>
                    <p><strong>Urgency:</strong> <span class="urgency-${urgency}">${urgency.toUpperCase()}</span></p>
                    ${description ? `<p><strong>Description:</strong><br>${description}</p>` : ''}
                    ${specificQuestions ? `<p><strong>Specific Questions:</strong><br>${specificQuestions}</p>` : ''}
                  </div>
                  
                  <div class="info-box" style="background-color: #fef3c7;">
                    <h3>📊 What the player needs:</h3>
                    <ul>
                      <li>Video analysis with visual annotations</li>
                      <li>Technique corrections and improvements</li>
                      <li>Timestamped feedback at key moments</li>
                      <li>Actionable training recommendations</li>
                    </ul>
                  </div>
                  
                  <center>
                    <a href="https://gfmtraining.com/admin/videos/analyze/${video.id}" class="button">
                      Review Video & Add Feedback
                    </a>
                  </center>
                  
                  <p style="margin-top: 20px;">The player is waiting for your expert feedback. Your analysis will help them improve their technique and performance.</p>
                  
                  <p>Best regards,<br>GFM Training Academy System</p>
                </div>
                <div class="footer">
                  <p>This is an automated notification from the GFM Training Academy video review system.</p>
                </div>
              </div>
            </body>
          </html>
        `;

        await resend.emails.send({
          from: 'videos@gfmtraining.com',
          to: ['Larrygrayson@gfmtf.com'],
          subject: `🎥 ${urgency === 'high' ? 'URGENT: ' : ''}New Video Review Request - ${playerName}`,
          html: emailHtml,
          replyTo: user.email || undefined
        });

        console.log('Coach notification sent successfully');
      } catch (emailError) {
        console.error('Error sending coach notification:', emailError);
        // Don't fail the upload if email fails
      }

      // Also send WhatsApp notification
      const whatsappMessage = `🎥 NEW VIDEO REVIEW REQUEST!

👤 PLAYER: ${playerName}
📹 TITLE: ${title}
🏷️ CATEGORY: ${category}
⚡ URGENCY: ${urgency.toUpperCase()}

${specificQuestions ? `❓ QUESTIONS:\n${specificQuestions}\n` : ''}

📱 Review now at:
https://gfmtraining.com/admin/videos/analyze/${video.id}

The player is waiting for your feedback!`;

      const coachPhoneNumber = '14075190984';
      const whatsappUrl = `https://wa.me/${coachPhoneNumber}?text=${encodeURIComponent(whatsappMessage)}`;

      // Return success with WhatsApp URL
      return NextResponse.json({ 
        success: true, 
        videoId: video.id,
        whatsappUrl,
        message: 'Video uploaded successfully. Coach Larry has been notified.'
      });
    }

    return NextResponse.json({ 
      success: true, 
      videoId: video.id,
      message: 'Video uploaded successfully.'
    });
  } catch (error) {
    console.error('Error uploading video:', error);
    return NextResponse.json({ error: 'Failed to upload video' }, { status: 500 });
  }
}

// GET /api/player-videos - Get player's uploaded videos
export async function GET(request: NextRequest) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { clerkId: userId }
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const videos = await prisma.playerVideo.findMany({
      where: {
        playerId: user.id
      },
      orderBy: {
        uploadDate: 'desc'
      }
    });

    return NextResponse.json({ videos });
  } catch (error) {
    console.error('Error fetching videos:', error);
    return NextResponse.json({ error: 'Failed to fetch videos' }, { status: 500 });
  }
}