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

interface updateUserInfoProps {
  user: User;
  nickname?: string; // 이미 있을 경우 안 보냄
  name: string;
  phoneNumber: string;
  gender: 'MALE' | 'FEMALE';
}

export const updateUserInfo = async ({
  user,
  nickname,
  name,
  phoneNumber,
  gender,
}: updateUserInfoProps) => {
  try {
    const result = await userService.updateMe({
      ...user,
      ...(nickname !== user.nickname && { nickname }),
      name,
      phoneNumber,
      gender,
      roles: ['ROLE_OWNER', 'ROLE_USER'],
    });

    return { success: true, data: result };
  } catch (error) {
    if (error instanceof HTTPError) {
      console.log(error.data);
    }
    throw error;
  }
};

interface updateUserProfileImageProps {
  profileImage: File;
}

export const updateUserProfileImage = async ({
  profileImage,
}: updateUserProfileImageProps) => {
  try {
    const result = await userService.uploadProfileImage(profileImage);
    return { success: true, data: result };
  } catch (error) {
    if (error instanceof HTTPError) {
      console.log(error.data);
    }
    throw error;
  }
};
