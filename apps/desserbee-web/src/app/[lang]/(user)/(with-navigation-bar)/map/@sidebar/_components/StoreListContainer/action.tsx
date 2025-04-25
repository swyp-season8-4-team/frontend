'use server';

import AuthNextAppRouteRepository from '@repo/infrastructures/src/repositories/authNextAppRouteRepository';
import StoreAPIRepository from '@repo/infrastructures/src/repositories/storeAPIRepository';
import StoreService from '@repo/usecase/src/storeService';

// 토큰을 가져오는 헬퍼 함수

const storeService = new StoreService({
  storeRepository: new StoreAPIRepository(),
  authRepository: new AuthNextAppRouteRepository(),
});

export async function getParentSavedList({ listId }: { listId: number }) {
  const parentList = await storeService.getParentSavedList({
    listId,
  });

  return parentList;
}

export async function getStoresInSavedList({ listId }: { listId: number }) {
  const storeList = await storeService.getStoresInSavedList({
    listId,
  });

  return storeList;
}

interface DeleteStoreInSavedList {
  listId: number;
  storeUuid: string;
}

export async function deleteStoreInSavedList({
  listId,
  storeUuid,
}: DeleteStoreInSavedList) {
  const response = await storeService.deleteStoreInSavedList({
    listId,
    storeUuid,
  });

  return response;
}

export async function getStoreSummary({ storeUuid }: { storeUuid: string }) {
  const storeSummary = await storeService.getStoreSummary(storeUuid);
  return storeSummary;
}

export async function getOwnerStoreList() {
  const storeLists = await storeService.getOwnerStoreList();
  return storeLists;
}