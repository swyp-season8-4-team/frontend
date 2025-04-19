'use server';

import { HTTPError } from '@repo/api/src/error';
import type { RegisterStoreFromData } from '@repo/entity/src/store';
import AuthNextAppRouteRepository from '@repo/infrastructures/src/repositories/authNextAppRouteRepository';
import StoreAPIRepository from '@repo/infrastructures/src/repositories/storeAPIRepository';
import StoreService from '@repo/usecase/src/storeService';

const storeService = new StoreService({
  storeRepository: new StoreAPIRepository(),
  authRepository: new AuthNextAppRouteRepository(),
});

export const registerStore = async (storeFormData: RegisterStoreFromData) => {
  try {
    return await storeService.registerStore(storeFormData);
  } catch (error) {
    if (error instanceof HTTPError) {
      console.error('HTTP 에러 발생:', error.data);
      throw error;
    }
    throw error;
  }
};
