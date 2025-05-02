'use server';

import { commonErrorHandler } from '@/error/commonErrorHandler';
import type { updateStoreRequest, updateStoreRequestFormData, updateStoreResponse } from '@repo/entity/src/store';
import AuthNextAppRouteRepository from '@repo/infrastructures/src/repositories/authNextAppRouteRepository';
import StoreAPIRepository from '@repo/infrastructures/src/repositories/storeAPIRepository';
import StoreService from '@repo/usecase/src/storeService';

// 토큰을 가져오는 헬퍼 함수

const storeService = new StoreService({
  storeRepository: new StoreAPIRepository(),
  authRepository: new AuthNextAppRouteRepository(),
});

export async function getParentSavedList({ listId }: { listId: number }) {
  const parentList = await commonErrorHandler(
    storeService.getParentSavedList({
      listId,
    }),
  );

  return parentList;
}

export async function getStoresInSavedList({ listId }: { listId: number }) {
  const storeList = await commonErrorHandler(
    storeService.getStoresInSavedList({
      listId,
    }),
  );

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
  const response = await commonErrorHandler(
    storeService.deleteStoreInSavedList({
      listId,
      storeUuid,
    }),
  );

  return response;
}

export async function getStoreSummary({ storeUuid }: { storeUuid: string }) {
  const storeSummary = await commonErrorHandler(
    storeService.getStoreSummary(storeUuid),
  );
  return storeSummary;
}

export async function getOwnerStoreList() {
  const storeLists = await commonErrorHandler(storeService.getOwnerStoreList());
  return storeLists;
}

export async function updateStore(params: updateStoreRequestFormData): Promise<updateStoreResponse> {
  const updatedInfo = await commonErrorHandler(storeService.updateStore(params));
  return updatedInfo;
}

export async function getStoreDetail({ storeUuid }: { storeUuid: string }) {
  const storeDetail = await commonErrorHandler(
    storeService.getStoreDetail({storeUuid})
  );
  return storeDetail;
}

export async function createNotice({ storeUuid, tag, title, content }: { storeUuid: string; tag: string; title: string; content: string }) {
  await commonErrorHandler(storeService.createNotice({ storeUuid, tag, title, content }));
}

export async function getNoticeList({ storeUuid }: { storeUuid: string }) {
  const noticeList = await commonErrorHandler(
    storeService.getNoticeList({storeUuid})
  );
  return noticeList;
}
