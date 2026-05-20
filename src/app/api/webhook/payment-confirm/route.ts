import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db/mockData';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { table_id, items, payment_ref } = body;

    // Validate mock HMAC signature header (simulation)
    const signature = request.headers.get('x-mock-signature');
    if (signature !== 'valid-signature') {
      return NextResponse.json({ error: 'Unauthorized webhook' }, { status: 401 });
    }

    if (!table_id || !items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
    }

    // Create order in in-memory DB
    const newOrder = db.createOrder(table_id, items, payment_ref || 'mock_ref_123');

    return NextResponse.json({ success: true, order_id: newOrder.id });
  } catch {
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}
