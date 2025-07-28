import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Mock data for now
    const stats = {
      totalBookings: 25,
      activeBookings: 8,
      completedBookings: 17,
      revenue: 1250
    };

    return NextResponse.json(stats);
  } catch (error) {
    console.error('Error fetching owner stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    );
  }
} 