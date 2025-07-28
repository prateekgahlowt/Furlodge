import { NextResponse } from 'next/server';
import connectDB from '@/app/lib/mongodb';
import { Booking } from '@/app/models/Booking';

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    
    const newBooking = await Booking.create({
      ...body,
      createdAt: new Date(),
    });

    // Send confirmation email (mock)
    await sendConfirmationEmail(newBooking);

    return NextResponse.json({ 
      success: true, 
      booking: newBooking 
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating booking:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to create booking' 
    }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectDB();
    const bookings = await Booking.find().sort({ createdAt: -1 });

    return NextResponse.json({ 
      success: true, 
      bookings 
    });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to fetch bookings' 
    }, { status: 500 });
  }
}

// Mock email sending function
async function sendConfirmationEmail(booking: any) {
  // In a real application, this would send an actual email
  console.log('Sending confirmation email for booking:', booking._id);
  return Promise.resolve();
} 