'use server';

import { HTTPError } from '@repo/api/src/error';
import UserAPIRepository from '@repo/infrastructures/src/repositories/userAPIRepository';
import UserService from '@repo/usecase/src/userService';
import type { User } from '@repo/entity/src/user';
import AuthNextAppRouteRepository from '@repo/infrastructures/src/repositories/authNextAppRouteRepository';

const userService = new UserService({
  userRepository: new UserAPIRepository(),
  authRepository: new AuthNextAppRouteRepository(),
});

interface updateUserInfoProps {
  user: User;
  name: string;
  phoneNumber: string;
}

export const updateUserInfo = async ({
  user,
  name,
  phoneNumber,
}: updateUserInfoProps) => {
  try {
    const result = await userService.updateMe({
      ...user,
      name,
      phoneNumber,
      roles: ['ROLE_OWNER', 'ROLE_USER'],
    });

    return { success: true, data: result };
  } catch (error) {
    if (error instanceof HTTPError) {
      console.log(error.data);
      throw error;
    }
    throw error;
  }
};
