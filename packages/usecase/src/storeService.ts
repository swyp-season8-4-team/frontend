import type { AuthRepository } from '@repo/entity/src/auth';
import type {
  StoreDetailInfoData,
  NearByStoreData,
  StoreRepository,
  StoreSummaryInfoData,
  Menu,
  CreateSavedListResponse,
  EditSavedListResponse,
  AddStoreInSavedListResponse,
  StoresInSavedListData,
  RegisterStoreRequest,
  RegisterStoreResponse,
  EditStoreRequest,
  EditStoreResponse,
  DeleteStoreRequest,
  CreateMenuRequestFormData,
  EditMenuRequest,
  DeleteMenuRequest,
  CreateSavedListRequest,
  EditSavedListRequest,
  DeleteSavedListRequest,
  AddStoreInSavedListRequest,
  DeleteStoreInSavedListRequest,
  StoresInSavedListRequest,
  ParentSavedListRequest,
  ParentSavedListResponse,
} from '@repo/entity/src/store';
export default class StoreService {
  private readonly storeRepository: StoreRepository | null;

  constructor({ storeRepository }: { storeRepository: StoreRepository }) {
    this.storeRepository = storeRepository ?? null;
  }

  async getAllPreference() {
    try {
      if (!this.storeRepository) {
        throw new Error('storeRepository is not set');
      }

      const result = await this.storeRepository.getAllPreference();
      console.log(`선호도 전체 저장 목록 조회 완료 `);

      return result;
    } catch (error) {
      console.error(`전체 저장 목록 오류 발생 `, error);
      throw error;
    }
  }

  async getNearbyStores({
    latitude,
    longitude,
    radius,
    preferenceTagIds,
    searchKeyword,
  }: {
    latitude: number;
    longitude: number;
    radius: number;
    preferenceTagIds?: number[];
    searchKeyword?: string;
  }): Promise<NearByStoreData[]> {
    try {
      if (!this.storeRepository) {
        throw new Error('storeRepository is not set');
      }

      console.log(
        `주변 매장 검색 시작 - 위도: ${latitude}, 경도: ${longitude}, 반경: ${radius}m`,
      );

      if (preferenceTagIds) {
        console.log(`필터: ${preferenceTagIds}`);
      }

      if (searchKeyword) {
        console.log(`키워드: ${searchKeyword}`);
      }
      const requestData = {
        data: {
          latitude,
          longitude,
          radius,
          preferenceTagIds,
          searchKeyword,
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

  async getMyPreferNearByStores({
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

      const response =
        await this.storeRepository.getNearbyPreferStores(requestData);
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

  async getSavedListAll(userUuid: string) {
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

  async registerStore(
    params: RegisterStoreRequest & { authorization: string },
  ): Promise<RegisterStoreResponse> {
    try {
      console.log(`매장 등록 시작 - 매장명: ${params.name}`);

      if (!this.storeRepository) {
        throw new Error('storeRepository is not set');
      }

      const { authorization, ...rest } = params;

      const response = await this.storeRepository.registerStore({
        authorization,
        data: rest,
      });
      console.log(`매장 등록 완료 - 매장명: ${params.name}`);

      return response;
    } catch (error) {
      console.error(`매장 등록 중 오류 발생 - 매장명: ${params.name}:`, error);
      throw error;
    }
  }

  async editStore(
    params: EditStoreRequest & { authorization: string },
  ): Promise<EditStoreResponse> {
    try {
      console.log(`매장 정보 수정 시작 - 매장 ID: ${params.storeUuid}`);

      if (!this.storeRepository) {
        throw new Error('storeRepository is not set');
      }
      const { authorization, ...rest } = params;
      const response = await this.storeRepository.editStore({
        authorization,
        data: rest,
      });
      console.log(`매장 정보 수정 완료 - 매장 ID: ${params.storeUuid}`);

      return response;
    } catch (error) {
      console.error(
        `매장 정보 수정 중 오류 발생 - 매장 ID: ${params.storeUuid}:`,
        error,
      );
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

  async deleteStore(
    params: DeleteStoreRequest & { authorization: string },
  ): Promise<void> {
    try {
      console.log(`매장 삭제 시작 - 매장 ID: ${params.storeUuid}`);

      if (!this.storeRepository) {
        throw new Error('storeRepository is not set');
      }
      const { authorization, ...rest } = params;
      await this.storeRepository.deleteStore({
        authorization,
        data: rest,
      });
      console.log(`매장 삭제 완료 - 매장 ID: ${params.storeUuid}`);
    } catch (error) {
      console.error(
        `매장 삭제 중 오류 발생 - 매장 ID: ${params.storeUuid}:`,
        error,
      );
      throw error;
    }
  }

  async updateCouponCount() {
    try {
      if (!this.storeRepository) {
        throw new Error('storeRepository is not set');
      }
      const result = await this.storeRepository.updateCouponCount();

      console.log(result);

      return result;
    } catch (error) {
      console.error('쿠폰 카운팅 중 오류 발생:', error);
      throw error;
    }
  }

  async getNearbyFilteredStores({
    latitude,
    longitude,
    radius,
    preferenceTagId,
  }: {
    latitude: number;
    longitude: number;
    radius: number;
    preferenceTagId: number[];
  }): Promise<NearByStoreData[]> {
    try {
      console.log(
        `필터된 주변 매장 검색 시작 - 위도: ${latitude}, 경도: ${longitude}, 반경: ${radius}m, 선호 태그: ${preferenceTagId}`,
      );

      if (!this.storeRepository) {
        throw new Error('storeRepository is not set');
      }

      const requestData = {
        data: {
          latitude,
          longitude,
          radius,
          preferenceTagId,
        },
      };

      const response =
        await this.storeRepository.getNearbyFilteredStores(requestData);
      console.log(
        `필터된 주변 매장 ${response.length}개를 성공적으로 조회했습니다.`,
      );

      return response;
    } catch (error) {
      console.error('필터된 주변 매장 검색 중 오류가 발생했습니다:', error);
      throw error;
    }
  }

  async getNearbyPreferStores({
    latitude,
    longitude,
    radius,
    authorization,
  }: {
    latitude: number;
    longitude: number;
    radius: number;
    authorization: string;
  }): Promise<NearByStoreData[]> {
    try {
      console.log(
        `선호 주변 매장 검색 시작 - 위도: ${latitude}, 경도: ${longitude}, 반경: ${radius}m`,
      );

      if (!this.storeRepository) {
        throw new Error('storeRepository is not set');
      }

      const requestData = {
        authorization,
        data: {
          latitude,
          longitude,
          radius,
        },
      };

      const response =
        await this.storeRepository.getNearbyPreferStores(requestData);
      console.log(
        `선호 주변 매장 ${response.length}개를 성공적으로 조회했습니다.`,
      );

      return response;
    } catch (error) {
      console.error('선호 주변 매장 검색 중 오류가 발생했습니다:', error);
      throw error;
    }
  }

  async getNearBySearchStores({
    latitude,
    longitude,
    radius,
    searchKeyword,
  }: {
    latitude: number;
    longitude: number;
    radius: number;
    searchKeyword: string;
  }): Promise<NearByStoreData[]> {
    try {
      console.log(
        `주변 매장 검색 시작 - 위도: ${latitude}, 경도: ${longitude}, 반경: ${radius}m, 검색어: ${searchKeyword}`,
      );

      if (!this.storeRepository) {
        throw new Error('storeRepository is not set');
      }

      const requestData = {
        data: {
          latitude,
          longitude,
          radius,
          searchKeyword,
        },
      };

      const response =
        await this.storeRepository.getNearBySearchStores(requestData);
      console.log(
        `검색된 주변 매장 ${response.length}개를 성공적으로 조회했습니다.`,
      );

      return response;
    } catch (error) {
      console.error('주변 매장 검색 중 오류가 발생했습니다:', error);
      throw error;
    }
  }

  async createMenu(
    params: CreateMenuRequestFormData & { authorization: string },
  ): Promise<void> {
    try {
      console.log(`메뉴 생성 시작 - 매장 ID: ${params.storeUuid}`);

      if (!this.storeRepository) {
        throw new Error('storeRepository is not set');
      }

      const { authorization, ...rest } = params;
      await this.storeRepository.createMenu({
        authorization,
        data: rest,
      });
      console.log(`메뉴 생성 완료 - 매장 ID: ${params.storeUuid}`);
    } catch (error) {
      console.error(
        `메뉴 생성 중 오류 발생 - 매장 ID: ${params.storeUuid}:`,
        error,
      );
      throw error;
    }
  }

  async editMenu(
    params: EditMenuRequest & { authorization: string },
  ): Promise<void> {
    try {
      console.log(
        `메뉴 수정 시작 - 매장 ID: ${params.storeUuid}, 메뉴 ID: ${params.menuUuid}`,
      );

      if (!this.storeRepository) {
        throw new Error('storeRepository is not set');
      }
      const { authorization, ...rest } = params;
      await this.storeRepository.editMenu({
        authorization,
        data: rest,
      });
      console.log(
        `메뉴 수정 완료 - 매장 ID: ${params.storeUuid}, 메뉴 ID: ${params.menuUuid}`,
      );
    } catch (error) {
      console.error(
        `메뉴 수정 중 오류 발생 - 매장 ID: ${params.storeUuid}, 메뉴 ID: ${params.menuUuid}:`,
        error,
      );
      throw error;
    }
  }

  async deleteMenu(
    params: DeleteMenuRequest & { authorization: string },
  ): Promise<void> {
    try {
      console.log(
        `메뉴 삭제 시작 - 매장 ID: ${params.storeUuid}, 메뉴 ID: ${params.menuUuid}`,
      );

      if (!this.storeRepository) {
        throw new Error('storeRepository is not set');
      }

      const { authorization, ...rest } = params;
      await this.storeRepository.deleteMenu({
        authorization,
        data: rest,
      });
      console.log(
        `메뉴 삭제 완료 - 매장 ID: ${params.storeUuid}, 메뉴 ID: ${params.menuUuid}`,
      );
    } catch (error) {
      console.error(
        `메뉴 삭제 중 오류 발생 - 매장 ID: ${params.storeUuid}, 메뉴 ID: ${params.menuUuid}:`,
        error,
      );
      throw error;
    }
  }

  async getMenu({
    storeUuid,
    menuUuid,
  }: {
    storeUuid: string;
    menuUuid: string;
  }): Promise<Menu> {
    try {
      console.log(
        `메뉴 조회 시작 - 매장 ID: ${storeUuid}, 메뉴 ID: ${menuUuid}`,
      );

      if (!this.storeRepository) {
        throw new Error('storeRepository is not set');
      }

      const requestData = {
        data: {
          storeUuid,
          menuUuid,
        },
      };

      const response = await this.storeRepository.getMenu(requestData);
      console.log(
        `메뉴 조회 완료 - 매장 ID: ${storeUuid}, 메뉴 ID: ${menuUuid}`,
      );

      return response;
    } catch (error) {
      console.error(
        `메뉴 조회 중 오류 발생 - 매장 ID: ${storeUuid}, 메뉴 ID: ${menuUuid}:`,
        error,
      );
      throw error;
    }
  }

  async getMenuList(storeUuid: string): Promise<Menu[]> {
    try {
      console.log(`메뉴 목록 조회 시작 - 매장 ID: ${storeUuid}`);

      if (!this.storeRepository) {
        throw new Error('storeRepository is not set');
      }

      const requestData = {
        data: {
          storeUuid,
        },
      };

      const response = await this.storeRepository.getMenuList(requestData);
      console.log(`메뉴 목록 조회 완료 - 매장 ID: ${storeUuid}`);

      return response;
    } catch (error) {
      console.error(
        `메뉴 목록 조회 중 오류 발생 - 매장 ID: ${storeUuid}:`,
        error,
      );
      throw error;
    }
  }

  async createSavedList(
    params: CreateSavedListRequest,
  ): Promise<CreateSavedListResponse> {
    try {
      console.log(`저장 목록 생성 시작 - 사용자 ID: ${params.userUuid}`);
      console.log('Params:', params);

      if (!this.storeRepository) {
        throw new Error('storeRepository is not set');
      }

      const response = await this.storeRepository.createSavedList({
        data: params,
      });
      console.log(`저장 목록 생성 완료 - 사용자 ID: ${params.userUuid}`);

      return response;
    } catch (error) {
      console.error(
        `저장 목록 생성 중 오류 발생 - 사용자 ID: ${params.userUuid}:`,
        error,
      );
      throw error;
    }
  }

  async editSavedList(
    params: EditSavedListRequest & { authorization: string },
  ): Promise<EditSavedListResponse> {
    try {
      console.log(`저장 목록 수정 시작 - 목록 ID: ${params.listId}`);

      if (!this.storeRepository) {
        throw new Error('storeRepository is not set');
      }
      const { authorization, ...rest } = params;
      const response = await this.storeRepository.editSavedList({
        authorization,
        data: rest,
      });
      console.log(`저장 목록 수정 완료 - 목록 ID: ${params.listId}`);

      return response;
    } catch (error) {
      console.error(
        `저장 목록 수정 중 오류 발생 - 목록 ID: ${params.listId}:`,
        error,
      );
      throw error;
    }
  }

  async deleteSavedList(
    params: DeleteSavedListRequest & { authorization: string },
  ): Promise<void> {
    try {
      console.log(`저장 목록 삭제 시작 - 목록 ID: ${params.listId}`);

      if (!this.storeRepository) {
        throw new Error('storeRepository is not set');
      }
      const { authorization, ...rest } = params;
      await this.storeRepository.deleteSavedList({
        authorization,
        data: rest,
      });
      console.log(`저장 목록 삭제 완료 - 목록 ID: ${params.listId}`);
    } catch (error) {
      console.error(
        `저장 목록 삭제 중 오류 발생 - 목록 ID: ${params.listId}:`,
        error,
      );
      throw error;
    }
  }

  async addStoreInSavedList(
    params: AddStoreInSavedListRequest,
  ): Promise<AddStoreInSavedListResponse> {
    try {
      console.log(
        `저장 목록에 매장 추가 시작 - 목록 ID: ${params.listId}, 매장 ID: ${params.storeUuid}`,
      );

      if (!this.storeRepository) {
        throw new Error('storeRepository is not set');
      }
      const { ...rest } = params;
      const response = await this.storeRepository.addStoreInSavedList({
        data: rest,
      });
      console.log(
        `저장 목록에 매장 추가 완료 - 목록 ID: ${params.listId}, 매장 ID: ${params.storeUuid}`,
      );

      return response;
    } catch (error) {
      console.error(
        `저장 목록에 매장 추가 중 오류 발생 - 목록 ID: ${params.listId}, 매장 ID: ${params.storeUuid}:`,
        error,
      );
      throw error;
    }
  }

  async deleteStoreInSavedList(
    params: DeleteStoreInSavedListRequest & { authorization: string },
  ): Promise<void> {
    try {
      console.log(
        `저장 목록에서 매장 삭제 시작 - 목록 ID: ${params.listId}, 매장 ID: ${params.storeUuid}`,
      );

      if (!this.storeRepository) {
        throw new Error('storeRepository is not set');
      }
      const { authorization, ...rest } = params;
      await this.storeRepository.deleteStoreInSavedList({
        authorization,
        data: rest,
      });
      console.log(
        `저장 목록에서 매장 삭제 완료 - 목록 ID: ${params.listId}, 매장 ID: ${params.storeUuid}`,
      );
    } catch (error) {
      console.error(
        `저장 목록에서 매장 삭제 중 오류 발생 - 목록 ID: ${params.listId}, 매장 ID: ${params.storeUuid}:`,
        error,
      );
      throw error;
    }
  }

  async getParentSavedList(
    params: ParentSavedListRequest,
  ): Promise<ParentSavedListResponse> {
    try {
      console.log(`저장 목록의 매장 조회 시작 - 목록 ID: ${params.listId}`);

      if (!this.storeRepository) {
        throw new Error('storeRepository is not set');
      }
      const { ...rest } = params;
      const response = await this.storeRepository.getParentSavedList({
        data: rest,
      });
      console.log(`저장 목록의 매장 조회 완료 - 목록 ID: ${params.listId}`);

      return response;
    } catch (error) {
      console.error(
        `저장 목록의 매장 조회 중 오류 발생 - 목록 ID: ${params.listId}:`,
        error,
      );
      throw error;
    }
  }

  async getStoresInSavedList(
    params: StoresInSavedListRequest,
  ): Promise<StoresInSavedListData[]> {
    try {
      console.log(`저장 목록의 매장들 조회 시작 - 목록 ID: ${params.listId}`);

      if (!this.storeRepository) {
        throw new Error('storeRepository is not set');
      }
      const { ...rest } = params;
      const response = await this.storeRepository.getStoresInSavedList({
        data: rest,
      });
      console.log(`저장 목록의 매장들 조회 완료 - 목록 ID: ${params.listId}`);

      return response;
    } catch (error) {
      console.error(
        `저장 목록의 매장들 조회 중 오류 발생 - 목록 ID: ${params.listId}:`,
        error,
      );
      throw error;
    }
  }
}
