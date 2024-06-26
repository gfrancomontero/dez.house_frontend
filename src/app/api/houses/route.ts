// app/api/houses/route.ts

import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get('page') || '1';
  const perPage = searchParams.get('per_page') || '20';

  try {
    const response = await fetch(`http://localhost:3001/houses?page=${page}&per_page=${perPage}`);
    if (!response.ok) {
      throw new Error('Failed to fetch houses');
    }
    const houses = await response.json();
    return NextResponse.json(houses);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
  }
}
