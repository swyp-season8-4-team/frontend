import APIRepository from './apiRepository';
import type {
  StoreRepository,
  StoreSummaryInfoData,
  StoreDetailInfoData,
  SavedListItemData,
  SavedStoreData,
  NearByStoreData,
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
  }>): Promise<NearByStoreData[]> {
    const { latitude, longitude, radius } = data || {};

    const response = await fetch<void, NearByStoreData[]>({
      method: 'GET',
      url: `${this.endpoint}/stores?latitude=${latitude}&longitude=${longitude}&radius=${radius}`,
    });

    return response;
  }

  async getStoreSummary({
    data,
  }: BaseRequestData<{
    storeUuid: string;
  }>) {
    const { storeUuid } = data || {};

    const response = await fetch<void, StoreSummaryInfoData>({
      method: 'GET',
      url: `${this.endpoint}/stores/${storeUuid}/summary`,
    });

    return response;
  }

  async getStoreDetail({
    data,
  }: BaseRequestData<{
    storeUuid: string;
  }>) {
    const { storeUuid } = data || {};

    const response = await fetch<void, StoreDetailInfoData>({
      method: 'GET',
      url: `${this.endpoint}/stores/${storeUuid}/details`,
    });

    return response;
  }

  async getSavedList({
    authorization,
    data,
  }: BaseRequestData<{
    userUuid: string;
  }>) {
    const { userUuid } = data || {};

    const response = await fetch<void, SavedListItemData[]>({
      // TODO: 인증 구현 추가하기
      // ...(authorization && {
      //   headers: {
      //     Authorization: authorization,
      //   },
      // }),
      method: 'GET',
      url: `${this.endpoint}/user-store/${userUuid}/lists`,
    });

    return response;
  }

  async getSavedStores({
    authorization,
    data,
  }: BaseRequestData<{
    listId: number;
  }>) {
    const { listId } = data || {};

    const response = await fetch<void, SavedStoreData[]>({
      ...(authorization && {
        headers: {
          Authorization: authorization,
        },
      }),
      method: 'GET',
      url: `${this.endpoint}/user-store/lists/${listId}/stores`,
    });

    return response;
  }

  async registerStore() {}

  async updateStore() {}

  async deleteStore() {}
}
