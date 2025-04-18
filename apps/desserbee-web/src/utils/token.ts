import type { TokenInfo } from '@repo/entity/src/auth';
import { decodeJWT, isExpiredJWT } from '@repo/utility/src/jwt';
import AuthService from '@repo/usecase/src/authService';
import AuthAPIRepository from '@repo/infrastructures/src/repositories/authAPIRepository';
import { HTTPError } from '@repo/api/src/error';

// 토큰 캐시 저장소
const savedTokens: { [key: string]: TokenInfo } = {};

// 토큰 정보 조회
export async function getTokenInfo(
  accessToken: string | undefined,
  refreshToken: string | undefined,
  deviceId: string | undefined,
): Promise<TokenInfo> {
  if (!accessToken && !refreshToken) {
    return { token: null };
  }

  // 캐시된 유효한 토큰이 있는지 확인
  if (accessToken) {
    const decodedToken = decodeJWT(accessToken);
    if (decodedToken?.sub) {
      const subKey = JSON.stringify(decodedToken.sub);
      const savedToken = savedTokens[subKey]?.token;
      if (savedToken && !isExpiredJWT(savedToken)) {
        return { token: savedToken };
      }
    }
  }

  return await refreshTokenIfNeeded(
    accessToken ?? null,
    refreshToken ?? null,
    deviceId,
  );
}

// 토큰 갱신 처리
async function refreshTokenIfNeeded(
  accessToken: string | null,
  refreshToken: string | null,
  deviceId: string | undefined,
): Promise<TokenInfo> {
  const isAccessTokenExpired = isExpiredJWT(accessToken);
  const isRefreshTokenExpired = refreshToken
    ? isExpiredJWT(refreshToken)
    : true;

  if (isAccessTokenExpired && isRefreshTokenExpired) {
    return { token: null };
  }

  if (isAccessTokenExpired && refreshToken) {
    try {
      const authService = new AuthService({
        authRepository: new AuthAPIRepository(),
      });

      const { accessToken: newToken, expiresIn } =
        await authService.refreshAccessToken(refreshToken, deviceId);

      return {
        token: newToken,
        isExpired: true,
        exp: expiresIn,
      };
    } catch (error) {
      if (error instanceof HTTPError && error.data.status === 401) {
        return { token: null };
      }
      throw error;
    }
  }

  return { token: accessToken };
}

export function calculateTokenMaxAge(expiresIn?: number): number {
  if (!expiresIn) return 0;

  const now = Math.floor(Date.now() / 1000); // 현재 시간을 Unix timestamp(초)로 변환
  return Math.max(0, expiresIn - now); // exp는 이미 Unix timestamp(초)이므로 그대로 사용
}
