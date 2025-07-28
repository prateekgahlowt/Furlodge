import { NextResponse } from 'next/server';
import connectDB from '@/app/lib/mongodb';
import { Booking } from '@/app/models/Booking';

export async function GET(request: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    
    const query: any = {};

    // Filter by status
    const status = searchParams.get('status');
    if (status) {
      query.status = status;
    }

    // Filter by date range
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    if (startDate || endDate) {
      query.startDate = {};
      if (startDate) {
        query.startDate.$gte = startDate;
      }
      if (endDate) {
        query.startDate.$lte = endDate;
      }
    }

    // Filter by service
    const serviceName = searchParams.get('service');
    if (serviceName) {
      query.serviceName = serviceName;
    }

    // Filter by email (for customer lookup)
    const email = searchParams.get('email');
    if (email) {
      query.email = email;
    }

    const bookings = await Booking.find(query)
      .sort({ createdAt: -1 })
      .limit(parseInt(searchParams.get('limit') || '50'));

    return NextResponse.json({
      success: true,
      bookings,
      count: bookings.length
    });
  } catch (error) {
    console.error('Error searching bookings:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to search bookings'
    }, { status: 500 });
  }
} 