import type { RawUser } from "@repo/api/src/desserbee-web/user";
import type { User } from "@repo/entity/src/user";

export default class UserConverter {
  convertRawToUser(raw: RawUser): User {
    return {
      id: raw.userUuid,
      email: raw.email,
      name: raw.name,
      nickname: raw.nickname,
      phoneNumber: raw.phoneNumber,
      address: raw.address,
      gender: raw.gender,
      preferences: raw.preferences,
      mbti: raw.mbti,
      profileImageUrl: raw.profileImageUrl,
    };
  }

  convertUserToRaw(user: User): RawUser {
    return {
      userUuid: user.id,
      email: user.email,
      name: user.name,
      nickname: user.nickname,
      phoneNumber: user.phoneNumber,
      address: user.address,
      gender: user.gender,
      preferences: user.preferences,
      mbti: user.mbti,
      profileImageUrl: user.profileImageUrl,
    };
  }
}