import APIRepository from './apiRepository';
import type {
  StoreDetailData,
  StoreMapData,
  StoreRepository,
  StoreSavedByUserData,
  StoreSummaryData,
} from '@repo/entity/src/store';
import type { BaseRequestData } from '@repo/entity/src/appMetadata';
import fetch from '@repo/api/src/fetch';

export default class StoreAPIRepository
  extends APIRepository
  implements StoreRepository
{
  async getNearbyStores({
    data,
  }: BaseRequestData<{
    latitude: number;
    longitude: number;
    radius: number;
  }>): Promise<StoreMapData> {
    const { latitude, longitude, radius } = data || {};

    const response = await fetch<void, StoreMapData>({
      method: 'GET',
      url: `${this.endpoint}/stores?latitude=${latitude}&longitude=${longitude}&radius=${radius}`,
    });

    return response;
  }

  async getStoreSummary({
    data,
  }: BaseRequestData<{
    storeId: number;
  }>) {
    const { storeId } = data || {};

    const response = await fetch<void, StoreSummaryData>({
      method: 'GET',
      url: `${this.endpoint}/stores/${storeId}/summary`,
    });

    return response;
  }

  async getStoreDetail({
    data,
  }: BaseRequestData<{
    storeId: number;
  }>) {
    const { storeId } = data || {};

    const response = await fetch<void, StoreDetailData>({
      method: 'GET',
      url: `${this.endpoint}/stores/${storeId}/details`,
    });

    return response;
  }

  async getUserSavedStore({
    authorization,
    data,
  }: BaseRequestData<{
    userId: number;
  }>) {
    const { userId } = data || {};

    const response = await fetch<void, StoreSavedByUserData[]>({
      ...(authorization && {
        headers: {
          Authorization: authorization,
        },
      }),
      method: 'GET',
      url: `${this.endpoint}/users/${userId}/saved-stores`,
    });

    return response;
  }

  async registerStore() {}

  async updateStore() {}

  async deleteStore() {}
}
