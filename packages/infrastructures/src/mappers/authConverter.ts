import type { OAuthSignInResponse, RawOAuthSignInResponse } from "@repo/entity/src/auth";

export default class AuthConverter {
  convertRawOAuthSignInResponse(raw: RawOAuthSignInResponse): OAuthSignInResponse {
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