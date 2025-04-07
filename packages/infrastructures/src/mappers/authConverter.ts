import type { SignInResponse, RawSignInResponse } from '@repo/entity/src/auth';

import type { SignInCodeError } from '@repo/entity/src/signIn';

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
      deviceId: raw.deviceId,
    };
  }

  convertCodeToErrorMessage(code: string): SignInCodeError {
    switch (code) {
      case 'U001':
        return 'INVALID_EMAIL';
      case 'A005':
        return 'INVALID_PASSWORD';
      default:
        return 'INVALID_ALL';
    }
  }
}
