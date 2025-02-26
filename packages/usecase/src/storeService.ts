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
    try {
      console.log(`매장 요약 정보 조회 시작 - 매장 ID: ${storeUuid}`);

      if (!this.storeRepository) {
        throw new Error('storeRepository is not set');
      }

      const requestData = {
        data: {
          storeUuid,
        },
      };

      const response = await this.storeRepository.getStoreSummary(requestData);
      console.log(`매장 요약 정보 조회 완료 - 매장 ID: ${storeUuid}`);

      return response;
    } catch (error) {
      console.error(
        `매장 요약 정보 조회 중 오류 발생 - 매장 ID: ${storeUuid}:`,
        error,
      );
      throw error;
    }
  }

  async getStoreDetail(storeUuid: string): Promise<StoreDetailInfoData> {
    try {
      console.log(`매장 상세 정보 조회 시작 - 매장 ID: ${storeUuid}`);

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
      console.log(`매장 상세 정보 조회 완료 - 매장 ID: ${storeUuid}`);

      return response;
    } catch (error) {
      console.error(
        `매장 상세 정보 조회 중 오류 발생 - 매장 ID: ${storeUuid}:`,
        error,
      );
      throw error;
    }
  }

  async getUserSavedStores(authorization: string, listId: number) {
    try {
      console.log(`저장된 매장 목록 조회 시작 - 목록 ID: ${listId}`);

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
      console.log(`저장된 매장 목록 조회 완료 - 목록 ID: ${listId}`);

      return result;
    } catch (error) {
      console.error(
        `저장된 매장 목록 조회 중 오류 발생 - 목록 ID: ${listId}:`,
        error,
      );
      throw error;
    }
  }

  async getSavedListAll(authorization: string, userUuid: string) {
    try {
      console.log(`전체 저장 목록 조회 시작 - 사용자 ID: ${userUuid}`);

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
      console.log(`전체 저장 목록 조회 완료 - 사용자 ID: ${userUuid}`);

      return result;
    } catch (error) {
      console.error(
        `전체 저장 목록 조회 중 오류 발생 - 사용자 ID: ${userUuid}:`,
        error,
      );
      throw error;
    }
  }

  async registerStore() {
    try {
      console.log('매장 등록 시작');

      if (!this.storeRepository) {
        throw new Error('storeRepository is not set');
      }

      console.log('매장 등록 완료');
    } catch (error) {
      console.error('매장 등록 중 오류 발생:', error);
      throw error;
    }
  }

  async updateStore() {
    try {
      console.log('매장 정보 업데이트 시작');

      if (!this.storeRepository) {
        throw new Error('storeRepository is not set');
      }

      console.log('매장 정보 업데이트 완료');
    } catch (error) {
      console.error('매장 정보 업데이트 중 오류 발생:', error);
      throw error;
    }
  }

  async deleteStore() {
    try {
      console.log('매장 삭제 시작');

      if (!this.storeRepository) {
        throw new Error('storeRepository is not set');
      }

      console.log('매장 삭제 완료');
    } catch (error) {
      console.error('매장 삭제 중 오류 발생:', error);
      throw error;
    }
  }
}
