import { NextResponse } from 'next/server';
import connectDB from '@/app/lib/mongodb';
import { Booking } from '@/app/models/Booking';
import { sendBookingConfirmationEmail } from '@/app/lib/email';

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    
    const newBooking = await Booking.create({
      ...body,
      createdAt: new Date(),
    });

    // Send booking confirmation email
    await sendBookingConfirmationEmail(newBooking.email, {
      serviceName: newBooking.serviceName,
      startDate: newBooking.startDate,
      endDate: newBooking.endDate,
      totalPrice: newBooking.totalPrice
    });

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

 