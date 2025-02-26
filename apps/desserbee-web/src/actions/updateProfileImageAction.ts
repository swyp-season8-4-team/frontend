'use server';

import AuthNextAppRouteRepository from "@repo/infrastructures/src/repositories/authNextAppRouteRepository";
import UserAPIRepository from "@repo/infrastructures/src/repositories/userAPIRepository";
import UserService from "@repo/usecase/src/userService";

const userService = new UserService({
  authRepository: new AuthNextAppRouteRepository(),
  userRepository: new UserAPIRepository(),
});

export default async function updateProfileImageAction(image: File): Promise<void> {
  await userService.uploadProfileImage(image);
} 