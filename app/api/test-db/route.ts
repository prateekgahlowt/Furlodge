import { NextResponse } from 'next/server';
import connectDB from '@/app/lib/mongodb';
import mongoose from 'mongoose';

export async function GET() {
  try {
    await connectDB();
    
    // Check if we're connected
    const readyState = mongoose.connection.readyState;
    
    const stateMap = {
      0: 'disconnected',
      1: 'connected',
      2: 'connecting',
      3: 'disconnecting',
    };

    const connectionStatus = {
      success: true,
      status: stateMap[readyState as keyof typeof stateMap],
      message: readyState === 1 ? 'Successfully connected to MongoDB!' : 'Not connected to MongoDB'
    };

    // Only add database name if we're connected
    if (readyState === 1 && mongoose.connection.db) {
      return NextResponse.json({
        ...connectionStatus,
        database: mongoose.connection.db.databaseName
      });
    }

    return NextResponse.json(connectionStatus);
  } catch (error) {
    console.error('Database connection error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to connect to database'
    }, { status: 500 });
  }
} 