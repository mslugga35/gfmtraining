import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET /api/videos/[id] - Get specific video details
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    const video = await prisma.playerVideo.findUnique({
      where: { id: params.id },
      include: {
        player: {
          select: {
            id: true,
            fullName: true,
            team: true,
            position: true
          }
        },
        uploadedBy: {
          select: {
            id: true,
            fullName: true,
            role: true
          }
        }
      }
    });

    if (!video) {
      return NextResponse.json({ error: 'Video not found' }, { status: 404 });
    }

    // Check access permissions
    const hasAccess = user.role === 'ADMIN' || 
                     video.playerId === user.id || 
                     video.uploadedById === user.id;

    if (!hasAccess) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Format the response
    const formattedVideo = {
      id: video.id,
      title: video.title,
      description: video.description || '',
      videoUrl: video.videoUrl,
      thumbnailUrl: video.thumbnailUrl || '',
      playerId: video.playerId,
      playerName: video.player.fullName || 'Unknown Player',
      uploadDate: video.uploadDate.toISOString(),
      annotations: video.annotations || [],
      coachNotes: video.annotations ? JSON.stringify(video.annotations) : '',
      views: video.views,
      isPrivate: video.isPrivate
    };

    return NextResponse.json({ video: formattedVideo });
  } catch (error) {
    console.error('Error fetching video:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// DELETE /api/videos/[id] - Delete a video
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    const video = await prisma.playerVideo.findUnique({
      where: { id: params.id }
    });

    if (!video) {
      return NextResponse.json({ error: 'Video not found' }, { status: 404 });
    }

    // Only admin or uploader can delete
    if (user.role !== 'ADMIN' && video.uploadedById !== user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    await prisma.playerVideo.delete({
      where: { id: params.id }
    });

    return NextResponse.json({ message: 'Video deleted successfully' });
  } catch (error) {
    console.error('Error deleting video:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}