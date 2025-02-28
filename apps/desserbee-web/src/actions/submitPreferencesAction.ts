'use server';

import type { User } from "@repo/entity/src/user";
import AuthNextAppRouteRepository from "@repo/infrastructures/src/repositories/authNextAppRouteRepository";
import UserAPIRepository from "@repo/infrastructures/src/repositories/userAPIRepository";
import UserService from "@repo/usecase/src/userService";

const userService = new UserService({
  authRepository: new AuthNextAppRouteRepository(),
  userRepository: new UserAPIRepository(),
});

interface ActionData {
  user: User;
  preferences: number[];
}

export default async function submitPreferencesAction({ user, preferences }: ActionData): Promise<void> {
  await userService.updateMe({
    ...user,
    preferences,
  });
}