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
    try {
      if (!this.storeRepository) {
        throw new Error('storeRepository is not set');
      }

      console.log(
        `주변 매장 검색 시작 - 위도: ${latitude}, 경도: ${longitude}, 반경: ${radius}m`,
      );

      const requestData = {
        data: {
          latitude,
          longitude,
          radius,
        },
      };

      const response = await this.storeRepository.getNearbyStores(requestData);
      console.log(`주변 매장 ${response.length}개를 성공적으로 조회했습니다.`);

      return response;
    } catch (error) {
      console.error('주변 매장 검색 중 오류가 발생했습니다:', error);
      throw error;
    }
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
