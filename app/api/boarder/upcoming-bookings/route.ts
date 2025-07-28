import { NextResponse } from 'next/server';
import connectDB from '@/app/lib/mongodb';
import { Booking } from '@/app/models/Booking';

export async function GET(request: Request) {
  try {
    await connectDB();
    
    // Get the boarder ID from the session (you'll need to implement authentication)
    const boarderId = 'BOARDER_ID'; // This should come from the authenticated session

    // Get upcoming bookings (including pending and confirmed)
    const bookings = await Booking.find({
      boarderId,
      endDate: { $gte: new Date() },
      status: { $in: ['pending', 'confirmed'] }
    })
    .sort({ startDate: 1 })
    .limit(10);

    return NextResponse.json({
      success: true,
      bookings
    });
  } catch (error) {
    console.error('Error fetching upcoming bookings:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch upcoming bookings'
    }, { status: 500 });
  }
} 