'use server';

import { HTTPError } from '@repo/api/src/error';
import UserAPIRepository from '@repo/infrastructures/src/repositories/userAPIRepository';
import AuthAPIRepository from '@repo/infrastructures/src/repositories/authAPIRepository';
import UserService from '@repo/usecase/src/userService';
import type { User } from '@repo/entity/src/user';

const userService = new UserService({
  userRepository: new UserAPIRepository(),
  authRepository: new AuthAPIRepository(),
});

export async function validateNickname(nickname: string) {
  try {
    const response = await userService.validateNickname({
      nickname,
      purpose: 'SIGNUP',
    });
    console.log(response.available);
    if (response.available === true) {
      return { success: true, message: '사용 가능한 닉네임입니다.' };
    } else {
      return { success: false, message: '이미 사용중인 닉네임입니다.' };
    }
  } catch (error) {
    if (error instanceof HTTPError) {
      return {
        success: false,
        message: error.data.message ?? '닉네임 검증 중 오류가 발생했습니다.',
      };
    }

    return {
      success: false,
      message: '닉네임 검증 중 오류가 발생했습니다.',
    };
  }
}

interface changeUserInfoProps {
  user: User;
  nickname?: string; // 이미 있을 경우 안 보냄
  name: string;
  phoneNumber: string;
  gender: 'MALE' | 'FEMALE';
  profileImage?: File;
}

export const changeUserInfo = async ({
  user,
  nickname,
  name,
  phoneNumber,
  gender,
  profileImage,
}: changeUserInfoProps) => {
  await userService.updateMe({
    ...user,
    ...(nickname && { nickname }),
    name,
    phoneNumber,
    gender,
    roles: ['ROLE_OWNER', 'ROLE_USER'],
  });

  if (profileImage) {
    await userService.uploadProfileImage(profileImage);
  }
};
