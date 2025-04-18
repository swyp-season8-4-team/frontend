'use client';

import { UserContext } from '@/contexts/UserContext';
import { useContext, useEffect, useState } from 'react';
import { OwnerIntro } from '../OwnerIntro';
import SocialLoginUserExtraInfoForm from '../SocialLoginUserExtraInfoForm';
import { AppRegisterUserExtraInfoForm } from '../AppRegisterUserExtraInfoForm';
import type { User } from '@repo/entity/src/user';

export function UserCheckContainer() {
  const { user } = useContext(UserContext);

  // 로그인 x 유저는 navigationService로 따로 처리하므로 여기선 x

  // 이 기준은 프로젝트 진행해감에 따라 달라질 수 있음 현재는 이런 상태.
  // 소셜 로그인: 성별 못 받음, 성별 x, 이름 x, 전화번호x 일 경우 -> SocialLoginUserExtraInfoForm (닉네임(카카오에 등록된 걸로), 이름, 전화번호, 성별, 프로필이미지)
  // 앱가입자: (성별은 있음(필수) 이름, 전화번호 없음) -> AppRegisterUserExtraInfoForm (이름, 전화번호 폼)
  // 둘 다 아님(웹 일반 가입자) or 추가정보 이미 있음 -> OwnerIntro

  return (
    <div className="h-full flex-1">
      {!user?.gender ? (
        <SocialLoginUserExtraInfoForm user={user as User} />
      ) : user?.gender && !user?.name && !user?.phoneNumber ? (
        <AppRegisterUserExtraInfoForm />
      ) : (
        <OwnerIntro />
      )}
    </div>
  );
}
