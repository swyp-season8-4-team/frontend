'use server';

import { isProd } from '@/utils/env';

import { cookies, headers } from "next/headers";

interface ActionData {
  token: string;
}

export async function verifyTokenAction(data: ActionData) {
  const { token } = data;

  const cookieList = await cookies();
  // const headerList = await headers();

  cookieList.set('verificationToken', token, {
    httpOnly: true,
    secure: isProd,
    sameSite: 'lax',
    maxAge: 60 * 30
  });

  // headerList.set('X-Email-Verification-Token', token);

}