'use server';
import { commonErrorHandler } from '@/error/commonErrorHandler';
import type { User } from '@repo/entity/src/user';
import AuthNextAppRouteRepository from '@repo/infrastructures/src/repositories/authNextAppRouteRepository';
import UserAPIRepository from '@repo/infrastructures/src/repositories/userAPIRepository';
import UserService from '@repo/usecase/src/userService';

const userService = new UserService({
  userRepository: new UserAPIRepository(),
  authRepository: new AuthNextAppRouteRepository(),
});

export const updateMe = async (user: User, profileData: Partial<User>) => {
  return await commonErrorHandler(
    userService.updateMe({ ...user, ...profileData }),
  );
};
