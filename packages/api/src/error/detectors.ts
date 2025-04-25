import { HTTPError } from './index';
// 공통인 에러만 일단 추가, 추후 따로 감지 해야 할 필요가 있는 에러가 생기는 경우 더 추가 가능

/**
 * 로그아웃된 디바이스입니다. (A016)
 */
export function isLoggedOutDeviceError(e: unknown): e is HTTPError {
  return (
    e instanceof HTTPError && (e.data.code === 'A016' || e.data.code === 'A006')
  );
}

/**
 * 디바이스 ID가 제공되지 않았습니다. (A012)
 */
export function isDeviceIdNotProvidedError(e: unknown): e is HTTPError {
  return e instanceof HTTPError && e.data.code === 'A012';
}

/**
 * 유효하지 않은 인증 토큰입니다. (A003)
 */
export function isInvalidAuthTokenError(e: unknown): e is HTTPError {
  return e instanceof HTTPError && e.data.code === 'A003';
}

/**
 * 만료된 인증 토큰입니다. (A004)
 */
export function isExpiredAuthTokenError(e: unknown): e is HTTPError {
  return e instanceof HTTPError && e.data.code === 'A004';
}

/**
 * 만료된 JWT 토큰입니다. (J002)
 */
export function isExpiredJwtTokenError(e: unknown): e is HTTPError {
  return e instanceof HTTPError && e.data.code === 'J002';
}

/**
 * 사용자를 찾을 수 없습니다. (U001)
 */
export function isUserNotFoundError(e: unknown): e is HTTPError {
  return e instanceof HTTPError && e.data.code === 'U001';
}

/**
 * 잘못된 입력값입니다. (C001)
 */
export function isBadRequestError(e: unknown): e is HTTPError {
  return e instanceof HTTPError && e.data.code === 'C001';
}

/**
 * 서버 에러가 발생했습니다. (C002)
 */
export function isInternalServerError(e: unknown): e is HTTPError {
  return e instanceof HTTPError && e.data.code === 'C002';
}
