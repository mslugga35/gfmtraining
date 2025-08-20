import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET /api/players - Fetch players (admin only or current user info)
export async function GET(request: NextRequest) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const searchParams = request.nextUrl.searchParams;
    const playerId = searchParams.get('playerId');
    const includeStats = searchParams.get('includeStats') === 'true';

    // Get current user to check permissions
    const currentUser = await prisma.user.findUnique({
      where: { clerkId: userId }
    });

    if (!currentUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    if (playerId) {
      // Get specific player
      if (currentUser.role !== 'ADMIN' && currentUser.id !== playerId) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
      }

      const player = await prisma.user.findUnique({
        where: { id: playerId },
        include: includeStats ? {
          videos: {
            select: {
              id: true,
              title: true,
              uploadDate: true,
              views: true
            },
            orderBy: {
              uploadDate: 'desc'
            }
          },
          progress: {
            select: {
              id: true,
              date: true,
              metrics: true,
              notes: true
            },
            orderBy: {
              date: 'desc'
            },
            take: 10
          },
          eventRegistrations: {
            include: {
              event: {
                select: {
                  id: true,
                  title: true,
                  startTime: true,
                  eventType: true,
                  location: true
                }
              }
            },
            where: {
              event: {
                startTime: {
                  gte: new Date()
                }
              }
            },
            orderBy: {
              event: {
                startTime: 'asc'
              }
            }
          }
        } : undefined
      });

      if (!player) {
        return NextResponse.json({ error: 'Player not found' }, { status: 404 });
      }

      return NextResponse.json({ player }, { status: 200 });
    } else {
      // Get all players (admin only)
      if (currentUser.role !== 'ADMIN') {
        return NextResponse.json({ error: 'Forbidden - Admin access required' }, { status: 403 });
      }

      const players = await prisma.user.findMany({
        where: {
          role: {
            in: ['PLAYER', 'PARENT']
          }
        },
        include: includeStats ? {
          videos: {
            select: {
              id: true,
              views: true
            }
          },
          progress: {
            select: {
              id: true,
              date: true,
              metrics: true
            },
            orderBy: {
              date: 'desc'
            },
            take: 1
          }
        } : undefined,
        orderBy: {
          createdAt: 'desc'
        }
      });

      // Calculate stats if requested
      const playersWithStats = includeStats ? players.map(player => {
        const totalVideos = player.videos?.length || 0;
        const totalViews = player.videos?.reduce((sum, video) => sum + video.views, 0) || 0;
        const latestProgress = player.progress?.[0];
        
        return {
          ...player,
          stats: {
            totalVideos,
            totalViews,
            latestProgress: latestProgress?.metrics,
            lastProgressDate: latestProgress?.date
          },
          videos: undefined, // Remove detailed video data
          progress: undefined // Remove detailed progress data
        };
      }) : players;

      return NextResponse.json({ players: playersWithStats }, { status: 200 });
    }
  } catch (error) {
    console.error('Error fetching players:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST /api/players - Create a new player (admin only)
export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const currentUser = await prisma.user.findUnique({
      where: { clerkId: userId }
    });

    if (!currentUser || currentUser.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden - Admin access required' }, { status: 403 });
    }

    const body = await request.json();
    const { 
      email, 
      fullName, 
      phone, 
      dateOfBirth, 
      position, 
      team, 
      role = 'PLAYER' 
    } = body;

    if (!email || !fullName) {
      return NextResponse.json({ 
        error: 'Missing required fields: email, fullName' 
      }, { status: 400 });
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return NextResponse.json({ error: 'User with this email already exists' }, { status: 400 });
    }

    const player = await prisma.user.create({
      data: {
        email,
        fullName,
        phone,
        dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
        position,
        team,
        role: role as any
      }
    });

    return NextResponse.json({ player }, { status: 201 });
  } catch (error) {
    console.error('Error creating player:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// PUT /api/players - Update player information
export async function PUT(request: NextRequest) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const currentUser = await prisma.user.findUnique({
      where: { clerkId: userId }
    });

    if (!currentUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const body = await request.json();
    const { 
      playerId, 
      fullName, 
      phone, 
      dateOfBirth, 
      position, 
      team, 
      role 
    } = body;

    if (!playerId) {
      return NextResponse.json({ error: 'Player ID is required' }, { status: 400 });
    }

    // Check permissions - admin can edit anyone, users can edit themselves
    if (currentUser.role !== 'ADMIN' && currentUser.id !== playerId) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Get existing player
    const existingPlayer = await prisma.user.findUnique({
      where: { id: playerId }
    });

    if (!existingPlayer) {
      return NextResponse.json({ error: 'Player not found' }, { status: 404 });
    }

    const updateData: any = {};
    if (fullName !== undefined) updateData.fullName = fullName;
    if (phone !== undefined) updateData.phone = phone;
    if (dateOfBirth !== undefined) updateData.dateOfBirth = dateOfBirth ? new Date(dateOfBirth) : null;
    if (position !== undefined) updateData.position = position;
    if (team !== undefined) updateData.team = team;
    
    // Only admins can change roles
    if (role !== undefined && currentUser.role === 'ADMIN') {
      updateData.role = role;
    }

    const updatedPlayer = await prisma.user.update({
      where: { id: playerId },
      data: updateData
    });

    return NextResponse.json({ player: updatedPlayer }, { status: 200 });
  } catch (error) {
    console.error('Error updating player:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// DELETE /api/players - Delete a player (admin only)
export async function DELETE(request: NextRequest) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const currentUser = await prisma.user.findUnique({
      where: { clerkId: userId }
    });

    if (!currentUser || currentUser.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden - Admin access required' }, { status: 403 });
    }

    const searchParams = request.nextUrl.searchParams;
    const playerId = searchParams.get('playerId');

    if (!playerId) {
      return NextResponse.json({ error: 'Player ID is required' }, { status: 400 });
    }

    // Check if player exists
    const existingPlayer = await prisma.user.findUnique({
      where: { id: playerId }
    });

    if (!existingPlayer) {
      return NextResponse.json({ error: 'Player not found' }, { status: 404 });
    }

    // Delete player and all related data (CASCADE)
    await prisma.user.delete({
      where: { id: playerId }
    });

    return NextResponse.json({ message: 'Player deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting player:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}