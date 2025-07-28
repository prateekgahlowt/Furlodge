import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST() {
  const cookieStore = cookies();
  
  // Clear the session cookie
  cookieStore.delete('session');
  
  return NextResponse.json({ message: 'Logged out successfully' });
} 