'use server';

import AuthNextAppRouteRepository from '@repo/infrastructures/src/repositories/authNextAppRouteRepository';
import StoreAPIRepository from '@repo/infrastructures/src/repositories/storeAPIRepository';
import StoreService from '@repo/usecase/src/storeService';

const storeService = new StoreService({
  storeRepository: new StoreAPIRepository(),
  authRepository: new AuthNextAppRouteRepository(),
});

interface CreateSavedListProps {
  userUuid: string;
  listName: string;
  iconColorId: number;
}

export async function createSavedList({
  userUuid,
  listName,
  iconColorId,
}: CreateSavedListProps) {
  const response = await storeService.createSavedList({
    userUuid,
    listName,
    iconColorId,
  });

  return response;
}

interface DeleteSavedList {
  listId: number;
}

export async function deleteSavedList({ listId }: DeleteSavedList) {
  const response = await storeService.deleteSavedList({
    listId,
  });

  return response;
}

interface GetSavedListAll {
  userUuid: string;
}

export async function getSavedListAll({ userUuid }: GetSavedListAll) {
  const response = await storeService.getSavedListAll(userUuid);

  return response;
}

interface AddStoreInSavedList {
  listId: number;
  storeUuid: string;
  userPreferences: number[];
}

export async function addStoreInSavedList({
  listId,
  storeUuid,
  userPreferences,
}: AddStoreInSavedList) {
  const response = await storeService.addStoreInSavedList({
    listId,
    storeUuid,
    userPreferences,
  });

  return response;
}
