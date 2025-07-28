import mongoose from 'mongoose';

export interface IUser extends mongoose.Document {
  email: string;
  password: string;
  role: 'owner' | 'boarder';
  firstName: string;
  lastName: string;
  phone: string;
  profilePicture?: string;
  bio?: string;
  experience?: string;
  availability?: {
    days: string[];
    startTime: string;
    endTime: string;
  };
  rating?: number;
  totalBookings?: number;
  emailVerified: boolean;
  emailVerificationToken?: string;
  emailVerificationTokenExpires?: Date;
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['owner', 'boarder'],
    required: true
  },
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  profilePicture: {
    type: String
  },
  bio: {
    type: String,
    maxlength: 500
  },
  experience: {
    type: String,
    maxlength: 1000
  },
  availability: {
    days: [{
      type: String,
      enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    }],
    startTime: String,
    endTime: String
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  totalBookings: {
    type: Number,
    default: 0
  },
  emailVerified: {
    type: Boolean,
    default: false
  },
  emailVerificationToken: String,
  emailVerificationTokenExpires: Date,
  resetPasswordToken: String,
  resetPasswordExpires: Date
}, {
  timestamps: true
});

export const User = mongoose.models.User || mongoose.model<IUser>('User', userSchema); 