import type { TokenInfo } from '@repo/entity/src/auth';
import { decodeJWT, isExpiredJWT } from '@repo/utility/src/jwt';
import AuthService from '@repo/usecase/src/authService';
import AuthAPIRepository from '@repo/infrastructures/src/repositories/authAPIRepository';
import { HTTPError } from '@repo/api/src/error';

// 토큰 캐시 저장소
const savedTokens: { [key: string]: TokenInfo } = {};

// 진행 중인 refresh 요청을 추적하는 저장소
const pendingRefreshRequests: { [key: string]: Promise<TokenInfo> } = {};

// 토큰 정보 조회
export async function getTokenInfo(
  accessToken: string | undefined,
  refreshToken: string | undefined,
  deviceId: string | undefined,
): Promise<TokenInfo> {
  // refreshToken이 없는 경우에만 토큰 없음 처리
  if (!refreshToken) {
    return { token: null };
  }

  // accessToken이 있는 경우 캐시 확인
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

  // refreshToken을 키로 사용하여 중복 요청 방지
  const refreshKey = `${refreshToken}_${deviceId ?? 'no-device'}`;

  // 이미 진행 중인 refresh 요청이 있으면 재사용
  if (pendingRefreshRequests[refreshKey]) {
    return pendingRefreshRequests[refreshKey];
  }

  // 새로운 refresh 요청 시작
  const refreshPromise = refreshTokenIfNeeded(
    accessToken ?? null,
    refreshToken,
    deviceId,
  ).finally(() => {
    // 완료되면 pending 목록에서 제거
    delete pendingRefreshRequests[refreshKey];
  });

  // pending 목록에 추가
  pendingRefreshRequests[refreshKey] = refreshPromise;

  return refreshPromise;
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
