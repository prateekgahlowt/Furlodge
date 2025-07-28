import { NextResponse } from 'next/server';
import connectDB from '@/app/lib/mongodb';
import { Booking } from '@/app/models/Booking';

// Get a single booking by ID
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const booking = await Booking.findById(params.id);
    
    if (!booking) {
      return NextResponse.json({
        success: false,
        error: 'Booking not found'
      }, { status: 404 });
    }

    return NextResponse.json({ success: true, booking });
  } catch (error) {
    console.error('Error fetching booking:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch booking'
    }, { status: 500 });
  }
}

// Update a booking
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const body = await request.json();

    const booking = await Booking.findById(params.id);
    if (!booking) {
      return NextResponse.json({
        success: false,
        error: 'Booking not found'
      }, { status: 404 });
    }

    // Update only allowed fields
    const allowedUpdates = [
      'status',
      'startDate',
      'endDate',
      'specialNotes',
      'totalPrice',
      'numberOfDays'
    ];

    const updates = Object.keys(body)
      .filter(key => allowedUpdates.includes(key))
      .reduce((obj, key) => {
        obj[key] = body[key];
        return obj;
      }, {} as Record<string, any>);

    const updatedBooking = await Booking.findByIdAndUpdate(
      params.id,
      { $set: updates },
      { new: true, runValidators: true }
    );

    return NextResponse.json({
      success: true,
      booking: updatedBooking
    });
  } catch (error) {
    console.error('Error updating booking:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to update booking'
    }, { status: 500 });
  }
}

// Delete a booking
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const booking = await Booking.findById(params.id);
    
    if (!booking) {
      return NextResponse.json({
        success: false,
        error: 'Booking not found'
      }, { status: 404 });
    }

    await Booking.findByIdAndDelete(params.id);

    return NextResponse.json({
      success: true,
      message: 'Booking deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting booking:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to delete booking'
    }, { status: 500 });
  }
} 