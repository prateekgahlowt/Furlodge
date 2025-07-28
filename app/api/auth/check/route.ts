import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {
  const cookieStore = cookies();
  const session = cookieStore.get('session');

  if (!session) {
    return new NextResponse(null, { status: 401 });
  }

  return new NextResponse(null, { status: 200 });
} 