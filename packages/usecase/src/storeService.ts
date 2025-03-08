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
  CreateOnelineReviewRequestFormData,
  CreateOnelineReviewResponse,
  StoreOnelineReivewRequest,
  StoreOnelineReivewData,
  DeleteOnelineReviewRequest,
  EditOnelineReviewRequest,
  OneLineReview,
  StoreDetailInfoRequest,
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
      return result;
    } catch (error) {
      throw error;
    }
  }

  async getNearbyStores({
    latitude,
    longitude,
    radius,
    preferenceTagIds,
    searchKeyword,
    authorization,
  }: {
    latitude: number;
    longitude: number;
    radius: number;
    preferenceTagIds?: number[];
    searchKeyword?: string;
    authorization?: string;
  }): Promise<NearByStoreData[]> {
    try {
      if (!this.storeRepository) {
        throw new Error('storeRepository is not set');
      }
      const requestData = {
        data: {
          latitude,
          longitude,
          radius,
          preferenceTagIds,
          searchKeyword,
        },
        authorization,
      };

      const response = await this.storeRepository.getNearbyStores(requestData);

      return response;
    } catch (error) {
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
      const requestData = {
        data: {
          latitude,
          longitude,
          radius,
        },
      };

      const response =
        await this.storeRepository.getNearbyPreferStores(requestData);

      return response;
    } catch (error) {
      throw error;
    }
  }

  async getStoreSummary(storeUuid: string): Promise<StoreSummaryInfoData> {
    try {
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
    } catch (error) {
      throw error;
    }
  }

  async getStoreDetail(
    params: StoreDetailInfoRequest,
  ): Promise<StoreDetailInfoData> {
    try {
      if (!this.storeRepository) {
        throw new Error('storeRepository is not set');
      }

      const { authorization, ...rest } = params;
      const requestData = {
        data: rest,
        authorization,
      };

      const response = await this.storeRepository.getStoreDetail(requestData);

      return response;
    } catch (error) {
      throw error;
    }
  }

  async getUserSavedStores(authorization: string, listId: number) {
    try {
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
    } catch (error) {
      throw error;
    }
  }

  async getSavedListAll(userUuid: string) {
    try {
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

      return result;
    } catch (error) {
      throw error;
    }
  }

  async registerStore(
    params: RegisterStoreRequest & { authorization: string },
  ): Promise<RegisterStoreResponse> {
    try {
      if (!this.storeRepository) {
        throw new Error('storeRepository is not set');
      }

      const { authorization, ...rest } = params;

      const response = await this.storeRepository.registerStore({
        authorization,
        data: rest,
      });

      return response;
    } catch (error) {
      throw error;
    }
  }

  async editStore(
    params: EditStoreRequest & { authorization: string },
  ): Promise<EditStoreResponse> {
    try {
      if (!this.storeRepository) {
        throw new Error('storeRepository is not set');
      }
      const { authorization, ...rest } = params;
      const response = await this.storeRepository.editStore({
        authorization,
        data: rest,
      });

      return response;
    } catch (error) {
      throw error;
    }
  }

  async updateStore() {
    try {
      if (!this.storeRepository) {
        throw new Error('storeRepository is not set');
      }
    } catch (error) {
      throw error;
    }
  }

  async deleteStore(
    params: DeleteStoreRequest & { authorization: string },
  ): Promise<void> {
    try {
      if (!this.storeRepository) {
        throw new Error('storeRepository is not set');
      }
      const { authorization, ...rest } = params;
      await this.storeRepository.deleteStore({
        authorization,
        data: rest,
      });
    } catch (error) {
      throw error;
    }
  }

  async updateCouponCount() {
    try {
      if (!this.storeRepository) {
        throw new Error('storeRepository is not set');
      }
      const result = await this.storeRepository.updateCouponCount();

      return result;
    } catch (error) {
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

      return response;
    } catch (error) {
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

      return response;
    } catch (error) {
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

      return response;
    } catch (error) {
      throw error;
    }
  }

  async createMenu(
    params: CreateMenuRequestFormData & { authorization: string },
  ): Promise<void> {
    try {
      if (!this.storeRepository) {
        throw new Error('storeRepository is not set');
      }

      const { authorization, ...rest } = params;
      await this.storeRepository.createMenu({
        authorization,
        data: rest,
      });
    } catch (error) {
      throw error;
    }
  }

  async editMenu(
    params: EditMenuRequest & { authorization: string },
  ): Promise<void> {
    try {
      if (!this.storeRepository) {
        throw new Error('storeRepository is not set');
      }
      const { authorization, ...rest } = params;
      await this.storeRepository.editMenu({
        authorization,
        data: rest,
      });
    } catch (error) {
      throw error;
    }
  }

  async deleteMenu(
    params: DeleteMenuRequest & { authorization: string },
  ): Promise<void> {
    try {
      if (!this.storeRepository) {
        throw new Error('storeRepository is not set');
      }

      const { authorization, ...rest } = params;
      await this.storeRepository.deleteMenu({
        authorization,
        data: rest,
      });
    } catch (error) {
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

      return response;
    } catch (error) {
      throw error;
    }
  }

  async getMenuList(storeUuid: string): Promise<Menu[]> {
    try {
      if (!this.storeRepository) {
        throw new Error('storeRepository is not set');
      }

      const requestData = {
        data: {
          storeUuid,
        },
      };

      const response = await this.storeRepository.getMenuList(requestData);

      return response;
    } catch (error) {
      throw error;
    }
  }

  async createSavedList(
    params: CreateSavedListRequest,
  ): Promise<CreateSavedListResponse> {
    try {
      if (!this.storeRepository) {
        throw new Error('storeRepository is not set');
      }

      const response = await this.storeRepository.createSavedList({
        data: params,
      });

      return response;
    } catch (error) {
      throw error;
    }
  }

  async editSavedList(
    params: EditSavedListRequest & { authorization: string },
  ): Promise<EditSavedListResponse> {
    try {
      if (!this.storeRepository) {
        throw new Error('storeRepository is not set');
      }
      const { authorization, ...rest } = params;
      const response = await this.storeRepository.editSavedList({
        authorization,
        data: rest,
      });

      return response;
    } catch (error) {
      throw error;
    }
  }

  async deleteSavedList(params: DeleteSavedListRequest): Promise<void> {
    try {
      if (!this.storeRepository) {
        throw new Error('storeRepository is not set');
      }
      const { ...rest } = params;
      await this.storeRepository.deleteSavedList({
        data: rest,
      });
    } catch (error) {
      throw error;
    }
  }

  async addStoreInSavedList(
    params: AddStoreInSavedListRequest,
  ): Promise<AddStoreInSavedListResponse> {
    try {
      if (!this.storeRepository) {
        throw new Error('storeRepository is not set');
      }
      const { ...rest } = params;
      const response = await this.storeRepository.addStoreInSavedList({
        data: rest,
      });

      return response;
    } catch (error) {
      throw error;
    }
  }

  async deleteStoreInSavedList(
    params: DeleteStoreInSavedListRequest,
  ): Promise<void> {
    try {
      if (!this.storeRepository) {
        throw new Error('storeRepository is not set');
      }
      const { ...rest } = params;
      await this.storeRepository.deleteStoreInSavedList({
        data: rest,
      });
    } catch (error) {
      throw error;
    }
  }

  async getParentSavedList(
    params: ParentSavedListRequest,
  ): Promise<ParentSavedListResponse> {
    try {
      if (!this.storeRepository) {
        throw new Error('storeRepository is not set');
      }
      const { authorization, ...rest } = params;
      const response = await this.storeRepository.getParentSavedList({
        data: rest,
        authorization,
      });
      return response;
    } catch (error) {
      throw error;
    }
  }

  async getStoresInSavedList(
    params: StoresInSavedListRequest,
  ): Promise<StoresInSavedListData[]> {
    try {
      if (!this.storeRepository) {
        throw new Error('storeRepository is not set');
      }
      const { authorization, ...rest } = params;
      const response = await this.storeRepository.getStoresInSavedList({
        data: rest,
        authorization,
      });
      return response;
    } catch (error) {
      throw error;
    }
  }

  // store oneline review
  async getStoreOnlineReviews(
    params: StoreOnelineReivewRequest,
  ): Promise<StoreOnelineReivewData[]> {
    if (!this.storeRepository) {
      throw new Error('storeRepository is not set');
    }

    try {
      const result = await this.storeRepository.getStoreOnelineReviews({
        data: params,
      });
      console.log(`가게 한줄 리뷰 조회 완료 `);

      return result;
    } catch (error) {
      console.error(`가게 한줄 리뷰 조회 오류 발생 `, error);
      throw error;
    }
  }

  async createStoreOnlineReviews(
    params: CreateOnelineReviewRequestFormData,
  ): Promise<CreateOnelineReviewResponse[]> {
    if (!this.storeRepository) {
      throw new Error('storeRepository is not set');
    }

    try {
      const result = await this.storeRepository.createOnelineReview({
        data: params,
      });
      console.log(`가게 한줄 리뷰 생성 완료 `);

      return result;
    } catch (error) {
      console.error(`가게 한줄 리뷰 생성 오류 발생 `, error);
      throw error;
    }
  }

  async deleteOnelineReview(params: DeleteOnelineReviewRequest): Promise<void> {
    try {
      if (!this.storeRepository) {
        throw new Error('storeRepository is not set');
      }

      await this.storeRepository.deleteOnelineReview({
        data: params,
      });
    } catch (error) {
      throw error;
    }
  }

  async editOnelineReview(
    params: EditOnelineReviewRequest,
  ): Promise<OneLineReview> {
    try {
      if (!this.storeRepository) {
        throw new Error('storeRepository is not set');
      }

      const result = await this.storeRepository.editOnelineReview({
        data: params,
      });
      return result;
    } catch (error) {
      throw error;
    }
  }
}
