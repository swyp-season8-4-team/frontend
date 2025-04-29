// app/auth/apple/redirect/route.ts

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { NavigationPathname } from '@repo/entity/src/navigation';
import socialLoginAction from '@/actions/socialLoginAction';

export async function POST(request: NextRequest) {
  const formData = await request.formData();

  const code = formData.get('code');
  const idToken = formData.get('id_token');
  const state = formData.get('state');

  if (
    typeof code !== 'string' ||
    typeof id_token !== 'string' ||
    typeof state !== 'string'
  ) {
    return new NextResponse('Invalid form data', { status: 400 });
  }

  await commonErrorHandler(
    socialLoginAction({ code, idToken, provider: 'apple' }),
  );

  // ✅ 로그인 성공 후 프론트 페이지로 리다이렉트
  return NextResponse.redirect(NavigationPathname.Map);
}
