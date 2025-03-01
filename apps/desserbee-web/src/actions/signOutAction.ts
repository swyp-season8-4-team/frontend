'use server';

import AuthService from "@repo/usecase/src/authService";
import AuthAPIRepository from "@repo/infrastructures/src/repositories/authAPIRepository";
import { cookies, headers } from "next/headers";

const authService = new AuthService({
  authRepository: new AuthAPIRepository(),
});

export default async function signOutAction() {
  const headerList = await headers();
  const authorization = headerList.get('authorization');

  if (!authorization) {
    return;
  }

  await authService.signOut(authorization);

  const cookieList = await cookies();

  cookieList.delete('accessToken');
  cookieList.delete('refreshToken');
}
