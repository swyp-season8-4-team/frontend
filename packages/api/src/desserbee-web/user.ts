export interface RawUser {
  userUuid: string;
  email: string;
  name?: string;
  nickname: string;
  phoneNumber: string;
  address: string;
  gender: string;
  preferences: number[];
  mbti?: string;
  profileImageUrl?: string;
  createdAt?: string;
  updatedAt?: string;
}
