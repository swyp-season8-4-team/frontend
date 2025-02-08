import { NextResponse } from 'next/server';
import { httpHandler } from '.';


export async function GET(request: Request) {
  // if (process.env.NEXT_PUBLIC_APP_ENV !== 'local') {
  //   return NextResponse.error();
  // }

  return httpHandler(request);
}

export async function POST(request: Request) {
  // if (process.env.NEXT_PUBLIC_APP_ENV !== 'local') {
  //   return NextResponse.error();
  // }

  return httpHandler(request);
}

export async function PATCH(request: Request) {
  // if (process.env.NEXT_PUBLIC_APP_ENV !== 'local') {
  //   return NextResponse.error();
  // }

  return httpHandler(request);
}
