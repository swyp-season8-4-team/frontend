import type { AuthRepository } from '@repo/entity/src/auth';
import type {
  StoreMapData,
  StoreRepository,
  StoreSummaryData,
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
  }): Promise<StoreMapData[]> {
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

  async getStoreSummary(storeId: number): Promise<StoreSummaryData> {
    if (!this.storeRepository) {
      throw new Error('storeRepository is not set');
    }

    const requestData = {
      data: {
        storeId,
      },
    };

    const response = await this.storeRepository.getStoreSummary(requestData);

    return response;
  }

  async getStoreDetail(storeId: number) {
    if (!this.storeRepository) {
      throw new Error('storeRepository is not set');
    }

    const requestData = {
      data: {
        storeId,
      },
    };

    const response = await this.storeRepository.getStoreDetail(requestData);

    return response;
  }

  async getUserSavedStores(authorization: string, userId: number) {
    if (!this.storeRepository) {
      throw new Error('storeRepository is not set');
    }

    const reqestData = {
      data: {
        userId,
      },
    };

    const result = await this.storeRepository.getUserSavedStore({
      authorization,
      ...reqestData,
    });

    return result;
  }

  async getSavedList(authorization: string, userId: number) {
    if (!this.storeRepository) {
      throw new Error('storeRepository is not set');
    }

    const reqestData = {
      data: {
        userId,
      },
    };

    const result = await this.storeRepository.getSavedList({
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
