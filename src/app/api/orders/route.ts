import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db/mockData';

export async function GET() {
  // Sort orders by newest first
  const sortedOrders = [...db.orders].sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
  return NextResponse.json({ orders: sortedOrders });
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { orderId, status } = body;

    if (!orderId || !status) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const success = db.updateOrderStatus(orderId, status);

    if (success) {
      return NextResponse.json({ success: true, orderId, status });
    } else {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
