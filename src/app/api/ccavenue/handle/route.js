import { NextResponse } from 'next/server';
import CCAvenue from '@/utils/CCAvenue';
import { headers } from 'next/headers';

export async function POST(req) {
  // Get the host from headers
  const headersList = headers();
  const host = headersList.get('host') || 'localhost:3000';
  const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https';
  
  try {
    const formData = await req.formData();
    const encResp = formData.get('encResp');

    if (!encResp) {
      return Response.redirect(`${protocol}://${host}/payment/failed`);
    }

    const decryptedData = CCAvenue.redirectResponseToJson(encResp);
    const redirectPath = decryptedData.order_status === "Success" 
      ? '/payment/success'
      : '/payment/failed';

    return Response.redirect(`${protocol}://${host}${redirectPath}`);
  } catch (error) {
    console.error('Payment handling failed:', error);
    return Response.redirect(`${protocol}://${host}/payment/failed`);
  }
}
