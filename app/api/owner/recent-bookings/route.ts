import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Mock data for now
    const recentBookings = [
      {
        id: '1',
        petName: 'Max',
        ownerName: 'John Doe',
        startDate: '2024-03-20',
        endDate: '2024-03-25',
        status: 'active'
      },
      {
        id: '2',
        petName: 'Bella',
        ownerName: 'Jane Smith',
        startDate: '2024-03-15',
        endDate: '2024-03-18',
        status: 'completed'
      }
    ];

    return NextResponse.json(recentBookings);
  } catch (error) {
    console.error('Error fetching recent bookings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch recent bookings' },
      { status: 500 }
    );
  }
} 