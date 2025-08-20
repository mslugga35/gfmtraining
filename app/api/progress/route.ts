import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET /api/progress - Fetch player progress data
export async function GET(request: NextRequest) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const searchParams = request.nextUrl.searchParams;
    const playerId = searchParams.get('playerId');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const limit = parseInt(searchParams.get('limit') || '10');

    const user = await prisma.user.findUnique({
      where: { clerkId: userId }
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Determine which player's progress to fetch
    let targetPlayerId = playerId;
    if (!targetPlayerId) {
      if (user.role === 'PLAYER') {
        targetPlayerId = user.id;
      } else {
        return NextResponse.json({ error: 'Player ID is required for admin users' }, { status: 400 });
      }
    }

    // Check permissions
    if (user.role !== 'ADMIN' && user.id !== targetPlayerId) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const whereClause: any = {
      playerId: targetPlayerId
    };

    // Date filtering
    if (startDate || endDate) {
      whereClause.date = {};
      if (startDate) whereClause.date.gte = new Date(startDate);
      if (endDate) whereClause.date.lte = new Date(endDate);
    }

    const progressData = await prisma.playerProgress.findMany({
      where: whereClause,
      include: {
        player: {
          select: {
            id: true,
            fullName: true,
            team: true,
            position: true
          }
        }
      },
      orderBy: {
        date: 'desc'
      },
      take: limit
    });

    return NextResponse.json({ progress: progressData }, { status: 200 });
  } catch (error) {
    console.error('Error fetching progress:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST /api/progress - Create a new progress entry (admin only)
export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { clerkId: userId }
    });

    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden - Admin access required' }, { status: 403 });
    }

    const body = await request.json();
    const { playerId, date, metrics, notes } = body;

    if (!playerId || !date || !metrics) {
      return NextResponse.json({ 
        error: 'Missing required fields: playerId, date, metrics' 
      }, { status: 400 });
    }

    // Verify player exists
    const player = await prisma.user.findUnique({
      where: { id: playerId }
    });

    if (!player) {
      return NextResponse.json({ error: 'Player not found' }, { status: 404 });
    }

    const progressEntry = await prisma.playerProgress.create({
      data: {
        playerId,
        date: new Date(date),
        metrics,
        notes
      },
      include: {
        player: {
          select: {
            id: true,
            fullName: true,
            team: true,
            position: true
          }
        }
      }
    });

    return NextResponse.json({ progress: progressEntry }, { status: 201 });
  } catch (error) {
    console.error('Error creating progress entry:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// PUT /api/progress - Update a progress entry (admin only)
export async function PUT(request: NextRequest) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { clerkId: userId }
    });

    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden - Admin access required' }, { status: 403 });
    }

    const body = await request.json();
    const { progressId, date, metrics, notes } = body;

    if (!progressId) {
      return NextResponse.json({ error: 'Progress ID is required' }, { status: 400 });
    }

    const existingProgress = await prisma.playerProgress.findUnique({
      where: { id: progressId }
    });

    if (!existingProgress) {
      return NextResponse.json({ error: 'Progress entry not found' }, { status: 404 });
    }

    const updateData: any = {};
    if (date !== undefined) updateData.date = new Date(date);
    if (metrics !== undefined) updateData.metrics = metrics;
    if (notes !== undefined) updateData.notes = notes;

    const updatedProgress = await prisma.playerProgress.update({
      where: { id: progressId },
      data: updateData,
      include: {
        player: {
          select: {
            id: true,
            fullName: true,
            team: true,
            position: true
          }
        }
      }
    });

    return NextResponse.json({ progress: updatedProgress }, { status: 200 });
  } catch (error) {
    console.error('Error updating progress entry:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// DELETE /api/progress - Delete a progress entry (admin only)
export async function DELETE(request: NextRequest) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { clerkId: userId }
    });

    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden - Admin access required' }, { status: 403 });
    }

    const searchParams = request.nextUrl.searchParams;
    const progressId = searchParams.get('progressId');

    if (!progressId) {
      return NextResponse.json({ error: 'Progress ID is required' }, { status: 400 });
    }

    const existingProgress = await prisma.playerProgress.findUnique({
      where: { id: progressId }
    });

    if (!existingProgress) {
      return NextResponse.json({ error: 'Progress entry not found' }, { status: 404 });
    }

    await prisma.playerProgress.delete({
      where: { id: progressId }
    });

    return NextResponse.json({ message: 'Progress entry deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting progress entry:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}