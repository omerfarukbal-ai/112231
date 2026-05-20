import { NextResponse } from 'next/server';
import { db } from '@/lib/db/mockData';

export async function GET() {
  return NextResponse.json({
    restaurant: db.restaurant,
    categories: db.categories,
    products: db.products,
  });
}
