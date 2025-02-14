'use server';

import { cookies } from "next/headers";

export async function getVerifyTokenAction() {

  const cookieList = await cookies();

  const token = cookieList.get('verificationToken')?.value;

  return token;
}