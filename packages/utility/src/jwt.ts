import type { JWTPayload } from '@repo/entity/src/auth';

export function decodeJWT(token: string): JWTPayload {
  const [, payload] = token.split('.');
  
  return JSON.parse(
    Buffer.from(payload, 'base64').toString('utf8')
  ) as JWTPayload;
}

/**
 * JWT의 payload를 복호화하여 만료 시간(exp)을 확인
 * @param token 토큰
 * @returns 만료 여부
 */
export function isExpiredJWT(token: string): boolean {
  const { exp } = decodeJWT(token);

  if (!exp) {
    return true;
  }

  return exp * 1000 < Date.now(); // TODO: 만료기간 바뀔수 있음
}
