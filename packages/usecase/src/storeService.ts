import type { AuthRepository } from '@repo/entity/src/auth';
import type {
  StoreDetailInfoData,
  NearByStoreData,
  StoreRepository,
  StoreSummaryInfoData,
} from '@repo/entity/src/store';
export default class StoreService {
  private readonly storeRepository: StoreRepository | null;

  constructor({ storeRepository }: { storeRepository: StoreRepository }) {
    this.storeRepository = storeRepository ?? null;
  }

  async getNearbyStores({
    latitude,
    longitude,
    radius,
  }: {
    latitude: number;
    longitude: number;
    radius: number;
  }): Promise<NearByStoreData[]> {
    if (!this.storeRepository) {
      throw new Error('storeRepository is not set');
    }

    const requestData = {
      data: {
        latitude,
        longitude,
        radius,
      },
    };

    const response = await this.storeRepository.getNearbyStores(requestData);

    return response;
  }

  async getStoreSummary(storeUuid: string): Promise<StoreSummaryInfoData> {
    if (!this.storeRepository) {
      throw new Error('storeRepository is not set');
    }

    const requestData = {
      data: {
        storeUuid,
      },
    };

    const response = await this.storeRepository.getStoreSummary(requestData);

    return response;
  }

  async getStoreDetail(storeUuid: string): Promise<StoreDetailInfoData> {
    if (!this.storeRepository) {
      throw new Error('storeRepository is not set');
    }

    const requestData = {
      data: {
        storeUuid,
        user: null,
      },
    };

    const response = await this.storeRepository.getStoreDetail(requestData);

    return response;
  }

  async getUserSavedStores(authorization: string, listId: number) {
    if (!this.storeRepository) {
      throw new Error('storeRepository is not set');
    }

    const reqestData = {
      data: {
        listId,
      },
    };

    const result = await this.storeRepository.getStoresInSavedList({
      authorization,
      ...reqestData,
    });

    return result;
  }

  async getSavedListAll(authorization: string, userUuid: string) {
    if (!this.storeRepository) {
      throw new Error('storeRepository is not set');
    }

    const reqestData = {
      data: {
        userUuid,
      },
    };

    const result = await this.storeRepository.getSavedListAll({
      authorization,
      ...reqestData,
    });

    return result;
  }

  async registerStore() {
    if (!this.storeRepository) {
      throw new Error('storeRepository is not set');
    }
  }

  async updateStore() {
    if (!this.storeRepository) {
      throw new Error('storeRepository is not set');
    }
  }

  async deleteStore() {
    if (!this.storeRepository) {
      throw new Error('storeRepository is not set');
    }
  }
}
