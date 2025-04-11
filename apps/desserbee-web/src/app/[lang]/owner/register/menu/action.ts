'use server';

import type { RegisterStoreFromData } from '@repo/entity/src/store';
import AuthNextAppRouteRepository from '@repo/infrastructures/src/repositories/authNextAppRouteRepository';
import StoreAPIRepository from '@repo/infrastructures/src/repositories/storeAPIRepository';
import StoreService from '@repo/usecase/src/storeService';

const storeService = new StoreService({
  storeRepository: new StoreAPIRepository(),
  authRepository: new AuthNextAppRouteRepository(),
});

export const registerStore = async (storeFormData: RegisterStoreFromData) => {
  const response = await storeService.registerStore(storeFormData);

  return response;
};
