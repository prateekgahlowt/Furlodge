import mongoose from 'mongoose';

export interface IBooking {
  petName: string;
  breed: string;
  ownerName: string;
  email: string;
  phone: string;
  startDate: string;
  endDate: string;
  specialNotes: string;
  serviceName: string;
  totalPrice: number;
  numberOfDays: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: Date;
}

const bookingSchema = new mongoose.Schema<IBooking>({
  petName: { type: String, required: true },
  breed: { type: String, required: true },
  ownerName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  startDate: { type: String, required: true },
  endDate: { type: String, required: true },
  specialNotes: { type: String, default: '' },
  serviceName: { type: String, required: true },
  totalPrice: { type: Number, required: true },
  numberOfDays: { type: Number, required: true },
  status: { 
    type: String, 
    enum: ['pending', 'confirmed', 'cancelled'], 
    default: 'pending' 
  },
  createdAt: { type: Date, default: Date.now }
});

// Add indexes for common queries
bookingSchema.index({ email: 1 });
bookingSchema.index({ status: 1 });
bookingSchema.index({ startDate: 1, endDate: 1 });

export const Booking = mongoose.models.Booking || mongoose.model<IBooking>('Booking', bookingSchema); 