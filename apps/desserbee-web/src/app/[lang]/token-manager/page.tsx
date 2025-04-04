'use client';

import { useEffect, useState } from 'react';
import { decodeJWT, isExpiredJWT } from '@repo/utility/src/jwt';
import { checkTokenAction, refreshTokenAction } from '@/actions/tokenActions';

interface TokenInfo {
  token: string | null;
  decoded: any | null;
  isExpired: boolean;
  expiresAt: string | null;
  timeRemaining: string | null;
}

export default function TokenManagerPage() {
  const [accessTokenInfo, setAccessTokenInfo] = useState<TokenInfo>({
    token: null,
    decoded: null,
    isExpired: false,
    expiresAt: null,
    timeRemaining: null,
  });

  const [refreshTokenInfo, setRefreshTokenInfo] = useState<TokenInfo>({
    token: null,
    decoded: null,
    isExpired: false,
    expiresAt: null,
    timeRemaining: null,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [refreshStatus, setRefreshStatus] = useState<string | null>(null);
  const [refreshError, setRefreshError] = useState<string | null>(null);

  const fetchTokens = async () => {
    try {
      const tokenData = await checkTokenAction();
      if (tokenData) {
        updateTokenInfo(
          tokenData.accessToken ?? null,
          tokenData.refreshToken ?? null,
        );
      }
    } catch (error) {
      console.error('토큰 정보를 가져오는 중 오류 발생:', error);
    }
  };

  const updateTokenInfo = (
    accessToken: string | null,
    refreshToken: string | null,
  ) => {
    // 액세스 토큰 정보 업데이트
    if (accessToken) {
      const decodedAccess = decodeJWT(accessToken);
      const isAccessExpired = isExpiredJWT(accessToken);

      let expiresAt = null;
      let timeRemaining = null;

      if (decodedAccess && decodedAccess.exp) {
        const expDate = new Date(decodedAccess.exp * 1000);
        expiresAt = expDate.toLocaleString();

        if (!isAccessExpired) {
          const now = new Date();
          const diffMs = expDate.getTime() - now.getTime();
          const diffMins = Math.floor(diffMs / 60000);
          const diffSecs = Math.floor((diffMs % 60000) / 1000);
          timeRemaining = `${diffMins}분 ${diffSecs}초`;
        }
      }

      setAccessTokenInfo({
        token: accessToken,
        decoded: decodedAccess,
        isExpired: isAccessExpired,
        expiresAt,
        timeRemaining,
      });
    }

    // 리프레시 토큰 정보 업데이트
    if (refreshToken) {
      const decodedRefresh = decodeJWT(refreshToken);
      const isRefreshExpired = isExpiredJWT(refreshToken);

      let expiresAt = null;
      let timeRemaining = null;

      if (decodedRefresh && decodedRefresh.exp) {
        const expDate = new Date(decodedRefresh.exp * 1000);
        expiresAt = expDate.toLocaleString();

        if (!isRefreshExpired) {
          const now = new Date();
          const diffMs = expDate.getTime() - now.getTime();
          const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
          const diffHrs = Math.floor(
            (diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
          );
          timeRemaining = `${diffDays}일 ${diffHrs}시간`;
        }
      }

      setRefreshTokenInfo({
        token: refreshToken,
        decoded: decodedRefresh,
        isExpired: isRefreshExpired,
        expiresAt,
        timeRemaining,
      });
    }
  };

  const handleRefreshToken = async () => {
    setIsLoading(true);
    setRefreshStatus('토큰 갱신 중...');
    setRefreshError(null);

    try {
      const result = await refreshTokenAction();
      if (result.success) {
        setRefreshStatus('토큰이 성공적으로 갱신되었습니다.');
        fetchTokens(); // 갱신된 토큰 정보 업데이트
      } else {
        setRefreshError(result.error || '토큰 갱신에 실패했습니다.');
        setRefreshStatus(null);
      }
    } catch (error) {
      setRefreshError('토큰 갱신 중 오류가 발생했습니다.');
      setRefreshStatus(null);
    } finally {
      setIsLoading(false);
    }
  };

  // 자동 업데이트
  useEffect(() => {
    fetchTokens();

    const interval = setInterval(() => {
      fetchTokens();
    }, 5000); // 5초마다 업데이트

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mx-auto max-w-4xl p-6">
      <h1 className="mb-6 text-2xl font-bold">토큰 관리자</h1>

      <div className="flex flex-col gap-8">
        {/* 액세스 토큰 섹션 */}
        <div className="rounded-lg border bg-white p-4 shadow">
          <h2 className="mb-2 text-xl font-semibold">액세스 토큰</h2>

          <div className="mb-2 flex items-center">
            <span className="mr-2 font-medium">상태:</span>
            {accessTokenInfo.token ? (
              <span
                className={`rounded px-2 py-1 text-sm ${accessTokenInfo.isExpired ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}
              >
                {accessTokenInfo.isExpired ? '만료됨' : '유효함'}
              </span>
            ) : (
              <span className="rounded bg-gray-100 px-2 py-1 text-sm text-gray-800">
                없음
              </span>
            )}
          </div>

          {accessTokenInfo.expiresAt && (
            <div className="mb-2">
              <span className="font-medium">만료 시간:</span>{' '}
              {accessTokenInfo.expiresAt}
            </div>
          )}

          {accessTokenInfo.timeRemaining && (
            <div className="mb-2">
              <span className="font-medium">남은 시간:</span>{' '}
              {accessTokenInfo.timeRemaining}
            </div>
          )}

          {accessTokenInfo.token && (
            <div className="mt-4">
              <div className="mb-1 font-medium">토큰 정보:</div>
              <div className="max-h-40 overflow-auto rounded bg-gray-50 p-3 font-mono text-xs">
                {JSON.stringify(accessTokenInfo.decoded, null, 2)}
              </div>
            </div>
          )}
        </div>

        {/* 리프레시 토큰 섹션 */}
        <div className="rounded-lg border bg-white p-4 shadow">
          <h2 className="mb-2 text-xl font-semibold">리프레시 토큰</h2>

          <div className="mb-2 flex items-center">
            <span className="mr-2 font-medium">상태:</span>
            {refreshTokenInfo.token ? (
              <span
                className={`rounded px-2 py-1 text-sm ${refreshTokenInfo.isExpired ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}
              >
                {refreshTokenInfo.isExpired ? '만료됨' : '유효함'}
              </span>
            ) : (
              <span className="rounded bg-gray-100 px-2 py-1 text-sm text-gray-800">
                없음
              </span>
            )}
          </div>

          {refreshTokenInfo.expiresAt && (
            <div className="mb-2">
              <span className="font-medium">만료 시간:</span>{' '}
              {refreshTokenInfo.expiresAt}
            </div>
          )}

          {refreshTokenInfo.timeRemaining && (
            <div className="mb-2">
              <span className="font-medium">남은 시간:</span>{' '}
              {refreshTokenInfo.timeRemaining}
            </div>
          )}

          {refreshTokenInfo.token && (
            <div className="mt-4">
              <div className="mb-1 font-medium">토큰 정보:</div>
              <div className="max-h-40 overflow-auto rounded bg-gray-50 p-3 font-mono text-xs">
                {JSON.stringify(refreshTokenInfo.decoded, null, 2)}
              </div>
            </div>
          )}
        </div>

        {/* 토큰 갱신 버튼 */}
        <div className="flex flex-col gap-4">
          <button
            onClick={handleRefreshToken}
            disabled={
              isLoading || !refreshTokenInfo.token || refreshTokenInfo.isExpired
            }
            className={`rounded-lg px-4 py-2 font-medium transition ${
              isLoading || !refreshTokenInfo.token || refreshTokenInfo.isExpired
                ? 'cursor-not-allowed bg-gray-300 text-gray-500'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {isLoading ? '갱신 중...' : '액세스 토큰 수동 갱신'}
          </button>

          {refreshStatus && (
            <div className="rounded bg-blue-50 p-3 text-blue-800">
              {refreshStatus}
            </div>
          )}

          {refreshError && (
            <div className="rounded bg-red-50 p-3 text-red-800">
              {refreshError}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
