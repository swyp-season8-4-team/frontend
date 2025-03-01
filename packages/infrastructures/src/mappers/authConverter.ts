import type { SignInResponse, RawSignInResponse } from "@repo/entity/src/auth";

export default class AuthConverter {
  convertRawSignInResponse(raw: RawSignInResponse): SignInResponse {
    return {
      accessToken: raw.accessToken,
      refreshToken: raw.refreshToken,
      tokenType: raw.tokenType,
      expiresIn: raw.expiresIn,
      userId: raw.userUuid,
      isPreferenceSet: raw.preferenceSet,
      email: raw.email,
      nickname: raw.nickname,
      profileImageUrl: raw.profileImageUrl,
    }
  }
}