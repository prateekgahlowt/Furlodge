import { NextResponse } from 'next/server';
import connectDB from '@/app/lib/mongodb';
import { Booking } from '@/app/models/Booking';
import { User } from '@/app/models/User';

export async function GET(request: Request) {
  try {
    await connectDB();
    
    // Get the boarder ID from the session (you'll need to implement authentication)
    const boarderId = 'BOARDER_ID'; // This should come from the authenticated session

    // Get boarder's total bookings
    const totalBookings = await Booking.countDocuments({ boarderId });
    
    // Get active bookings (bookings that haven't ended yet)
    const activeBookings = await Booking.countDocuments({
      boarderId,
      endDate: { $gte: new Date() },
      status: 'confirmed'
    });

    // Get boarder's rating
    const boarder = await User.findById(boarderId);
    const rating = boarder?.rating || 0;

    // Calculate total earnings
    const bookings = await Booking.find({ boarderId, status: 'completed' });
    const earnings = bookings.reduce((total, booking) => total + (booking.totalPrice || 0), 0);

    return NextResponse.json({
      success: true,
      stats: {
        totalBookings,
        activeBookings,
        rating,
        earnings
      }
    });
  } catch (error) {
    console.error('Error fetching boarder stats:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch boarder statistics'
    }, { status: 500 });
  }
} 