'use server';
import { commonErrorHandler } from '@/error/commonErrorHandler';
import AuthNextAppRouteRepository from '@repo/infrastructures/src/repositories/authNextAppRouteRepository';
import UserAPIRepository from '@repo/infrastructures/src/repositories/userAPIRepository';
import UserService from '@repo/usecase/src/userService';

const userService = new UserService({
  userRepository: new UserAPIRepository(),
  authRepository: new AuthNextAppRouteRepository(),
});

interface uploadProfileImageProps {
  file: File;
}
export const uploadProfileImage = async ({ file }: uploadProfileImageProps) => {
  return await commonErrorHandler(userService.uploadProfileImage(file));
};
