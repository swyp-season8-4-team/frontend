import type { BaseRequestData } from "./appMetadata";

export enum UserType {}

export interface User {
  id: string;
  email: string;
  nickname: string;
  phoneNumber: string;
  address: string;
  gender: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface TargetUser {
  userUuid: string;
  mbti: string | null;
  gender: string | null;
  nickname: string | null;
  imageId: string | null;
  preferences: number[];
}

export function isTargetUser(data: unknown): data is TargetUser {
  return (
    typeof data === 'object' &&
    data !== null &&
    'userUuid' in data
  );
}

export interface NicknameValidationRequestData {
  nickname: string;
  purpose: 'SIGNUP' | 'PROFILE_UPDATE';
}

export interface NicknameValidationResponse {
  message: string;
  available: boolean;
  timestamp: string;
}

export interface UserRepository {
  addInfo(data: BaseRequestData<User>): Promise<User>;
  delete(data: BaseRequestData<void>): Promise<void>;
  getMe(data: BaseRequestData<void>): Promise<User>;
  getTarget(data: BaseRequestData<{ id: string }>): Promise<TargetUser>;
  update(data: BaseRequestData<User>): Promise<void>;
  validateNickname(data: BaseRequestData<NicknameValidationRequestData>): Promise<NicknameValidationResponse>;
  uploadProfileImage(data: BaseRequestData<{ image: File }>): Promise<void>;
}
