import type { RawUser } from "@repo/api/src/desserbee-web/user";
import type { User } from "@repo/entity/src/user";
import PreferenceConverter from "./preferenceConverter";

export default class UserConverter {
  private readonly preferenceConverter = new PreferenceConverter();
  
  convertRawToUser(raw: RawUser): User {
    return {
      id: raw.userUuid,
      email: raw.email,
      name: raw.name,
      nickname: raw.nickname,
      phoneNumber: raw.phoneNumber,
      address: raw.address,
      gender: raw.gender,
      preferences: this.preferenceConverter.convertRawToPreference(raw.preferences.sort((a, b) => a - b)),
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
      preferences: this.preferenceConverter.convertPreferenceToRaw(user.preferences),
      mbti: user.mbti,
      profileImageUrl: user.profileImageUrl,
    };
  }
}