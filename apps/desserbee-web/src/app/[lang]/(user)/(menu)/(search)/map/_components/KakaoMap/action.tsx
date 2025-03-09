'use server';

import AuthNextAppRouteRepository from '@repo/infrastructures/src/repositories/authNextAppRouteRepository';
import StoreAPIRepository from '@repo/infrastructures/src/repositories/storeAPIRepository';
import StoreService from '@repo/usecase/src/storeService';

// 토큰을 가져오는 헬퍼 함수

export async function getNearbyStores({
  latitude,
  longitude,
  radius,
  preferenceTagIds,
  searchKeyword,
}: {
  latitude: number;
  longitude: number;
  radius: number;
  preferenceTagIds?: number[];
  searchKeyword?: string;
}) {
  const storeService = new StoreService({
    storeRepository: new StoreAPIRepository(),
    authRepository: new AuthNextAppRouteRepository(),
  });

  const nearByStores = storeService.getNearbyStores({
    latitude: latitude,
    longitude: longitude,
    radius: radius,
    preferenceTagIds,
    searchKeyword,
  });

  return nearByStores;
}
