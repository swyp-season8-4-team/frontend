'use server';

import type { User } from "@repo/entity/src/user";
import PreferenceConverter from "@repo/infrastructures/src/mappers/preferenceConverter";
import AuthNextAppRouteRepository from "@repo/infrastructures/src/repositories/authNextAppRouteRepository";
import UserAPIRepository from "@repo/infrastructures/src/repositories/userAPIRepository";
import UserService from "@repo/usecase/src/userService";

const preferenceConverter = new PreferenceConverter();

const userService = new UserService({
  authRepository: new AuthNextAppRouteRepository(),
  userRepository: new UserAPIRepository(),
});

interface ActionData {
  user: User;
  preferences: number[];
}

export default async function submitPreferencesAction({ user, preferences }: ActionData): Promise<void> {
  
  // FIXME: 원래 이렇게 하면 안됨 Preferences 타입으로 프론트에서 사용하도록 리팩토링 필요
  const convertedPreferences = preferenceConverter.convertRawToPreference(preferences);
  
  await userService.updateMe({
    ...user,
    preferences: convertedPreferences,
  });
}