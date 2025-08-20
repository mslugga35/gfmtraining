import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET /api/videos - Fetch videos for a player or all videos (admin only)
export async function GET(request: NextRequest) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const searchParams = request.nextUrl.searchParams;
    const playerId = searchParams.get('playerId');
    const isAdmin = searchParams.get('admin') === 'true';

    // Get user from database to check role
    const user = await prisma.user.findUnique({
      where: { clerkId: userId }
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    let videos;

    if (isAdmin && user.role === 'ADMIN') {
      // Admin can see all videos
      videos = await prisma.playerVideo.findMany({
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
        },
        orderBy: {
          uploadDate: 'desc'
        }
      });
    } else if (playerId) {
      // Fetch videos for specific player (admin or the player themselves)
      if (user.role !== 'ADMIN' && user.id !== playerId) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
      }

      videos = await prisma.playerVideo.findMany({
        where: {
          playerId: playerId
        },
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
        },
        orderBy: {
          uploadDate: 'desc'
        }
      });
    } else {
      // Fetch videos for the current user
      videos = await prisma.playerVideo.findMany({
        where: {
          playerId: user.id
        },
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
        },
        orderBy: {
          uploadDate: 'desc'
        }
      });
    }

    return NextResponse.json({ videos }, { status: 200 });
  } catch (error) {
    console.error('Error fetching videos:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST /api/videos - Create a new video entry
export async function POST(request: NextRequest) {
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

    // Only admins can upload videos for players
    if (user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden - Admin access required' }, { status: 403 });
    }

    const body = await request.json();
    const { playerId, title, description, videoUrl, thumbnailUrl, isPrivate = true } = body;

    if (!playerId || !title || !videoUrl) {
      return NextResponse.json({ 
        error: 'Missing required fields: playerId, title, videoUrl' 
      }, { status: 400 });
    }

    // Verify that the player exists
    const player = await prisma.user.findUnique({
      where: { id: playerId }
    });

    if (!player) {
      return NextResponse.json({ error: 'Player not found' }, { status: 404 });
    }

    const video = await prisma.playerVideo.create({
      data: {
        playerId,
        title,
        description,
        videoUrl,
        thumbnailUrl,
        isPrivate,
        uploadedById: user.id,
        annotations: []
      },
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

    return NextResponse.json({ video }, { status: 201 });
  } catch (error) {
    console.error('Error creating video:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// PUT /api/videos - Update video metadata or annotations
export async function PUT(request: NextRequest) {
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

    const body = await request.json();
    const { videoId, title, description, annotations, isPrivate } = body;

    if (!videoId) {
      return NextResponse.json({ error: 'Video ID is required' }, { status: 400 });
    }

    // Get the video to check permissions
    const existingVideo = await prisma.playerVideo.findUnique({
      where: { id: videoId }
    });

    if (!existingVideo) {
      return NextResponse.json({ error: 'Video not found' }, { status: 404 });
    }

    // Check if user can edit this video
    const canEdit = user.role === 'ADMIN' || 
                   existingVideo.uploadedById === user.id || 
                   existingVideo.playerId === user.id;

    if (!canEdit) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const updateData: any = {};
    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (annotations !== undefined) updateData.annotations = annotations;
    if (isPrivate !== undefined && user.role === 'ADMIN') updateData.isPrivate = isPrivate;

    const updatedVideo = await prisma.playerVideo.update({
      where: { id: videoId },
      data: updateData,
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

    return NextResponse.json({ video: updatedVideo }, { status: 200 });
  } catch (error) {
    console.error('Error updating video:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// DELETE /api/videos - Delete a video
export async function DELETE(request: NextRequest) {
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

    const searchParams = request.nextUrl.searchParams;
    const videoId = searchParams.get('videoId');

    if (!videoId) {
      return NextResponse.json({ error: 'Video ID is required' }, { status: 400 });
    }

    // Get the video to check permissions
    const existingVideo = await prisma.playerVideo.findUnique({
      where: { id: videoId }
    });

    if (!existingVideo) {
      return NextResponse.json({ error: 'Video not found' }, { status: 404 });
    }

    // Only admins or the uploader can delete videos
    if (user.role !== 'ADMIN' && existingVideo.uploadedById !== user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    await prisma.playerVideo.delete({
      where: { id: videoId }
    });

    return NextResponse.json({ message: 'Video deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting video:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}