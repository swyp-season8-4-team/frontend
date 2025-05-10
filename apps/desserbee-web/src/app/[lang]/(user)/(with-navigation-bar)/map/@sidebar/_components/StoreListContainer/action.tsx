'use server';

import { commonErrorHandler } from '@/error/commonErrorHandler';
import type {
  CreateMenuRequestFormData,
  EditMenuRequest,
  EditMenuRequestFormData,
  EditNoticeRequest,
  EditNoticeResponse,
  updateStoreRequestFormData,
  updateStoreResponse,
} from '@repo/entity/src/store';
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

export async function updateStore(
  params: updateStoreRequestFormData,
): Promise<updateStoreResponse> {
  const updatedInfo = await commonErrorHandler(
    storeService.updateStore(params),
  );
  return updatedInfo;
}

export async function getStoreDetail({ storeUuid }: { storeUuid: string }) {
  const storeDetail = await commonErrorHandler(
    storeService.getStoreDetail({ storeUuid }),
  );
  return storeDetail;
}

export async function createNotice({
  storeUuid,
  tag,
  title,
  content,
}: {
  storeUuid: string;
  tag: string;
  title: string;
  content: string;
}) {
  await commonErrorHandler(
    storeService.createNotice({ storeUuid, tag, title, content }),
  );
}

export async function getNoticeList({ storeUuid }: { storeUuid: string }) {
  const noticeList = await commonErrorHandler(
    storeService.getNoticeList({ storeUuid }),
  );
  return noticeList;
}

export async function getNotice({
  storeUuid,
  noticeId,
}: {
  storeUuid: string;
  noticeId: number;
}) {
  const notice = await commonErrorHandler(
    storeService.getNotice({ storeUuid, noticeId }),
  );
  return notice;
}

export async function editNotice(
  params: EditNoticeRequest,
): Promise<EditNoticeResponse> {
  const notice = await commonErrorHandler(storeService.editNotice(params));
  return notice;
}

export async function deleteNotice({
  storeUuid,
  noticeId,
}: {
  storeUuid: string;
  noticeId: number;
}) {
  const deleted = await commonErrorHandler(
    storeService.deleteNotice({ storeUuid, noticeId }),
  );
  return deleted;
}

export async function getMenuList({ storeUuid }: { storeUuid: string }) {
  const menulist = await commonErrorHandler(
    storeService.getMenuList(storeUuid),
  );
  return menulist;
}

export async function createMenu(
  params: CreateMenuRequestFormData,
): Promise<void> {
  const created = await commonErrorHandler(storeService.createMenu(params));
  return created;
}

export async function getMenu({
  storeUuid,
  menuUuid,
}: {
  storeUuid: string;
  menuUuid: string;
}) {
  const menu = await commonErrorHandler(
    storeService.getMenu({ storeUuid, menuUuid }),
  );
  return menu;
}

export async function editMenu(params: EditMenuRequestFormData): Promise<void> {
  const updated = await commonErrorHandler(storeService.editMenu(params));
  return updated;
}

export async function deleteMenu({
  storeUuid,
  menuUuid,
}: {
  storeUuid: string;
  menuUuid: string;
}) {
  const deleted = await commonErrorHandler(
    storeService.deleteMenu({ storeUuid, menuUuid }),
  );
  return deleted;
}
