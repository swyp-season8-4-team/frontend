'use server';

import AuthNextAppRouteRepository from '@repo/infrastructures/src/repositories/authNextAppRouteRepository';
import StoreAPIRepository from '@repo/infrastructures/src/repositories/storeAPIRepository';
import AuthService from '@repo/usecase/src/authService';
import StoreService from '@repo/usecase/src/storeService';

// 토큰을 가져오는 헬퍼 함수
const authService = new AuthService({
  authRepository: new AuthNextAppRouteRepository(),
});

const storeService = new StoreService({
  storeRepository: new StoreAPIRepository(),
});

export async function getParentSavedList({ listId }: { listId: number }) {
  const authorization = await authService.getAuthorization();

  const parentList = await storeService.getParentSavedList({
    listId,
    ...(authorization && { authorization }),
  });

  return parentList;
}

export async function getStoresInSavedList({ listId }: { listId: number }) {
  const authorization = await authService.getAuthorization();

  const storeList = await storeService.getStoresInSavedList({
    listId,
    ...(authorization && { authorization }),
  });

  return storeList;
}
