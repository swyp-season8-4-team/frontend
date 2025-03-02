'use server';

import { isProd } from '@/utils/env';
import AuthService from "@repo/usecase/src/authService";
import AuthAPIRepository from "@repo/infrastructures/src/repositories/authAPIRepository";
import { cookies, headers } from "next/headers";

const authService = new AuthService({
  authRepository: new AuthAPIRepository(),
});

export default async function signOutAction() {
  const headerList = await headers();
  const authorization = headerList.get('authorization');
  // 서버에 로그아웃 요청 시도 (토큰이 없어도 쿠키는 삭제해야 함)
  if (!!authorization) {
    try {
      await authService.signOut(authorization);
    } catch (error) {
      console.error('Error during sign out:', error);
      // 서버 로그아웃 실패해도 계속 진행 (쿠키는 삭제해야 함)
    } finally {
        const domain =
          process.env.NEXT_PUBLIC_APP_ENV !== 'local'
            ? process.env.NEXT_PUBLIC_APP_COOKIE_DOMAIN
            : '';
        
        const cookieList = await cookies();
      
        // 백업 방법: 빈 값과 과거 만료일로 덮어쓰기
        cookieList.set('accessToken', '', {
          httpOnly: true,
          secure: isProd,
          sameSite: 'lax',
          domain,
          maxAge: 0,
        });
        
        cookieList.set('refreshToken', '', {
          httpOnly: true,
          secure: isProd,
          sameSite: 'strict',
          domain,
          maxAge: 0,
        });
    }
  }

  

  
}
