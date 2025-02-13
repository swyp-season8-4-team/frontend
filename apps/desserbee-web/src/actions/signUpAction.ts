'use server';

import type { SignUpData } from "@repo/entity/src/auth";
import AuthAPIRespository from "@repo/infrastructures/src/repositories/authAPIRespository";
import AuthService from "@repo/usecase/src/authService";
import { cookies } from "next/headers";

const authService = new AuthService({
  authRepository: new AuthAPIRespository(),
}); 

export default async function signUpAction(data: SignUpData) {
  const cookieList = await cookies();
  const verificationToken = cookieList.get('verificationToken')?.value;

  const response = await authService.signUp(data, verificationToken);
}