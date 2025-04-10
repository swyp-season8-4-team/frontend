'use server';

import type { Preference } from '@repo/entity/src/preference';
import AuthNextAppRouteRepository from '@repo/infrastructures/src/repositories/authNextAppRouteRepository';
import StoreAPIRepository from '@repo/infrastructures/src/repositories/storeAPIRepository';
import StoreService from '@repo/usecase/src/storeService';

// 토큰을 가져오는 헬퍼 함수

const storeService = new StoreService({
  storeRepository: new StoreAPIRepository(),
  authRepository: new AuthNextAppRouteRepository(),
});

export async function getNearbyStores({
  latitude,
  longitude,
  radius,
  preferenceTagNames,
  searchKeyword,
}: {
  latitude: number;
  longitude: number;
  radius: number;
  preferenceTagNames?: Preference[];
  searchKeyword?: string;
}) {
  const nearByStores = storeService.getNearbyStores({
    latitude: latitude,
    longitude: longitude,
    radius: radius,
    preferenceTagNames,
    searchKeyword,
  });

  return nearByStores;
}

export async function getStoresLocationInSavedList({
  listId,
}: {
  listId: number;
}) {
  const result = await storeService.getStoresLocationInSavedList({
    listId,
  });

  console.log(result);

  return result;
}
