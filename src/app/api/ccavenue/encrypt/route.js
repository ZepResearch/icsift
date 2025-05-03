import { NextResponse } from 'next/server';
import CCAvenue from '@/utils/CCAvenue';

export async function POST(req) {
  try {
    const paymentData = await req.json();
    const encRequest = CCAvenue.getEncryptedOrder(paymentData);
    
    return NextResponse.json({ encRequest });
  } catch (error) {
    console.error('Encryption failed:', error);
    return NextResponse.json(
      { error: 'Failed to encrypt payment data' },
      { status: 500 }
    );
  }
}
