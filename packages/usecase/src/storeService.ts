import type { AuthRepository } from '@repo/entity/src/auth';
import type { MapPosition } from '@repo/entity/src/map';
import type { Preference } from '@repo/entity/src/preference';
import type { StorageRepository } from '@repo/entity/src/storage';
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
  SavedStoresLocationRequest,
  SavedStoresLocationData,
  RegisterStoreFromData,
} from '@repo/entity/src/store';
export default class StoreService {
  private readonly storeRepository: StoreRepository | null;
  private readonly authRepository: AuthRepository | null;

  constructor({
    storeRepository,
    authRepository,
  }: {
    storeRepository: StoreRepository;
    authRepository?: AuthRepository;
  }) {
    this.storeRepository = storeRepository ?? null;
    this.authRepository = authRepository ?? null;
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
    preferenceTagNames,
    searchKeyword,
  }: {
    latitude: number;
    longitude: number;
    radius: number;
    preferenceTagNames?: Preference[];
    searchKeyword?: string;
  }): Promise<NearByStoreData[]> {
    if (!this.storeRepository) {
      throw new Error('storeRepository is not set');
    } else if (!this.authRepository) {
      throw new Error('authRepository is not set');
    }

    const authorization = await this.authRepository.getAuthorization();

    const requestData = {
      data: {
        latitude,
        longitude,
        radius,
        preferenceTagNames,
        searchKeyword,
      },
      ...(authorization && { authorization }),
    };

    const response = await this.storeRepository.getNearbyStores(requestData);

    return response;
  }

  // async getMyPreferNearByStores({
  //   latitude,
  //   longitude,
  //   radius,
  // }: {
  //   latitude: number;
  //   longitude: number;
  //   radius: number;
  // }): Promise<NearByStoreData[]> {
  //   try {
  //     if (!this.storeRepository) {
  //       throw new Error('storeRepository is not set');
  //     } else if (!this.authRepository) {
  //       throw new Error('authRepository is not set');
  //     }

  //     const authorization = await this.authRepository.getAuthorization();

  //     const requestData = {
  //       data: {
  //         latitude,
  //         longitude,
  //         radius,
  //       },
  //       authorization,
  //     };

  //     const response =
  //       await this.storeRepository.getNearbyPreferStores(requestData);

  //     return response;
  //   } catch (error) {
  //     throw error;
  //   }
  // }

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

  async getStoreDetail(
    params: StoreDetailInfoRequest,
  ): Promise<StoreDetailInfoData> {
    if (!this.storeRepository) {
      throw new Error('storeRepository is not set');
    } else if (!this.authRepository) {
      throw new Error('authRepository is not set');
    }

    const authorization = await this.authRepository.getAuthorization();

    const requestData = {
      data: params,
      ...(authorization && { authorization }),
    };

    const response = await this.storeRepository.getStoreDetail(requestData);

    return response;
  }

  async getUserSavedStores(listId: number) {
    if (!this.storeRepository) {
      throw new Error('storeRepository is not set');
    } else if (!this.authRepository) {
      throw new Error('authRepository is not set');
    }

    const authorization = await this.authRepository.getAuthorization();

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

  async registerStore(params: RegisterStoreFromData): Promise<void> {
    if (!this.storeRepository) {
      throw new Error('storeRepository is not set');
    } else if (!this.authRepository) {
      throw new Error('authRepository is not set');
    }

    const authorization = await this.authRepository.getAuthorization();

    const requestData = {
      data: params,
      authorization,
    };

    const response = await this.storeRepository.registerStore(requestData);
  }

  async editStore(params: EditStoreRequest): Promise<EditStoreResponse> {
    if (!this.storeRepository) {
      throw new Error('storeRepository is not set');
    } else if (!this.authRepository) {
      throw new Error('authRepository is not set');
    }

    const authorization = await this.authRepository.getAuthorization();

    const requestData = {
      data: params,
      authorization,
    };

    const response = await this.storeRepository.editStore(requestData);

    return response;
  }

  async updateStore() {
    if (!this.storeRepository) {
      throw new Error('storeRepository is not set');
    } else if (!this.authRepository) {
      throw new Error('authRepository is not set');
    }

    //TODO: 구현 필요
  }

  async deleteStore(params: DeleteStoreRequest): Promise<void> {
    if (!this.storeRepository) {
      throw new Error('storeRepository is not set');
    } else if (!this.authRepository) {
      throw new Error('authRepository is not set');
    }

    const authorization = await this.authRepository.getAuthorization();

    const requestData = {
      data: params,
      authorization,
    };

    await this.storeRepository.deleteStore(requestData);
  }

  async updateCouponCount() {
    if (!this.storeRepository) {
      throw new Error('storeRepository is not set');
    }
    const result = await this.storeRepository.updateCouponCount();

    return result;
  }

  async createMenu(params: CreateMenuRequestFormData): Promise<void> {
    if (!this.storeRepository) {
      throw new Error('storeRepository is not set');
    } else if (!this.authRepository) {
      throw new Error('authRepository is not set');
    }

    const authorization = await this.authRepository.getAuthorization();

    const requestData = {
      data: params,
      authorization,
    };

    await this.storeRepository.createMenu(requestData);
  }

  async editMenu(params: EditMenuRequest): Promise<void> {
    if (!this.storeRepository) {
      throw new Error('storeRepository is not set');
    } else if (!this.authRepository) {
      throw new Error('authRepository is not set');
    }

    const authorization = await this.authRepository.getAuthorization();

    const requestData = {
      data: params,
      authorization,
    };

    await this.storeRepository.editMenu(requestData);
  }

  async deleteMenu(params: DeleteMenuRequest): Promise<void> {
    if (!this.storeRepository) {
      throw new Error('storeRepository is not set');
    } else if (!this.authRepository) {
      throw new Error('authRepository is not set');
    }

    const authorization = await this.authRepository.getAuthorization();

    const requestData = {
      data: params,
      authorization,
    };

    await this.storeRepository.deleteMenu(requestData);
  }

  async getMenu({
    storeUuid,
    menuUuid,
  }: {
    storeUuid: string;
    menuUuid: string;
  }): Promise<Menu> {
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
  }

  async getMenuList(storeUuid: string): Promise<Menu[]> {
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
  }

  async createSavedList(
    params: CreateSavedListRequest,
  ): Promise<CreateSavedListResponse> {
    if (!this.storeRepository) {
      throw new Error('storeRepository is not set');
    } else if (!this.authRepository) {
      throw new Error('authRepository is not set');
    }

    const authorization = await this.authRepository.getAuthorization();

    const reqestData = {
      data: params,
      authorization,
    };

    const response = await this.storeRepository.createSavedList(reqestData);

    return response;
  }

  async editSavedList(
    params: EditSavedListRequest,
  ): Promise<EditSavedListResponse> {
    if (!this.storeRepository) {
      throw new Error('storeRepository is not set');
    } else if (!this.authRepository) {
      throw new Error('authRepository is not set');
    }

    const authorization = await this.authRepository.getAuthorization();

    const requestData = {
      data: params,
      authorization,
    };

    const response = await this.storeRepository.editSavedList(requestData);

    return response;
  }

  async deleteSavedList(params: DeleteSavedListRequest): Promise<void> {
    if (!this.storeRepository) {
      throw new Error('storeRepository is not set');
    } else if (!this.authRepository) {
      throw new Error('authRepository is not set');
    }
    const authorization = await this.authRepository.getAuthorization();

    const requestData = {
      data: params,
      authorization,
    };

    await this.storeRepository.deleteSavedList(requestData);
  }

  async addStoreInSavedList(
    params: AddStoreInSavedListRequest,
  ): Promise<AddStoreInSavedListResponse> {
    if (!this.storeRepository) {
      throw new Error('storeRepository is not set');
    } else if (!this.authRepository) {
      throw new Error('authRepository is not set');
    }

    const authorization = await this.authRepository.getAuthorization();

    const requestData = {
      data: params,
      authorization,
    };

    const response =
      await this.storeRepository.addStoreInSavedList(requestData);

    return response;
  }

  async deleteStoreInSavedList(
    params: DeleteStoreInSavedListRequest,
  ): Promise<void> {
    if (!this.storeRepository) {
      throw new Error('storeRepository is not set');
    } else if (!this.authRepository) {
      throw new Error('authRepository is not set');
    }

    const authorization = await this.authRepository.getAuthorization();

    const requestData = {
      data: params,
      authorization,
    };

    await this.storeRepository.deleteStoreInSavedList(requestData);
  }

  async getParentSavedList(
    params: ParentSavedListRequest,
  ): Promise<ParentSavedListResponse> {
    if (!this.storeRepository) {
      throw new Error('storeRepository is not set');
    } else if (!this.authRepository) {
      throw new Error('authRepository is not set');
    }

    const authorization = await this.authRepository.getAuthorization();

    const requestData = {
      data: params,
      authorization,
    };

    const response = await this.storeRepository.getParentSavedList(requestData);
    return response;
  }

  async getStoresInSavedList(
    params: StoresInSavedListRequest,
  ): Promise<StoresInSavedListData[]> {
    if (!this.storeRepository) {
      throw new Error('storeRepository is not set');
    } else if (!this.authRepository) {
      throw new Error('authRepository is not set');
    }

    const authorization = await this.authRepository.getAuthorization();

    const requestData = {
      data: params,
      authorization,
    };

    const response =
      await this.storeRepository.getStoresInSavedList(requestData);
    return response;
  }

  async getStoresLocationInSavedList(
    params: SavedStoresLocationRequest,
  ): Promise<SavedStoresLocationData[]> {
    if (!this.storeRepository) {
      throw new Error('storeRepository is not set');
    } else if (!this.authRepository) {
      throw new Error('authRepository is not set');
    }

    const authorization = await this.authRepository.getAuthorization();

    const reqestData = {
      data: params,
    };

    const result = await this.storeRepository.getStoresLocationInSavedList({
      authorization,
      ...reqestData,
    });

    return result;
  }

  async getSavedListAll(userUuid: string) {
    if (!this.storeRepository) {
      throw new Error('storeRepository is not set');
    } else if (!this.authRepository) {
      throw new Error('authRepository is not set');
    }

    const authorization = await this.authRepository.getAuthorization();

    const reqestData = {
      data: {
        userUuid,
      },
      authorization,
    };

    const result = await this.storeRepository.getSavedListAll(reqestData);

    return result;
  }

  // store oneline review
  async getStoreOnlineReviews(
    params: StoreOnelineReivewRequest,
  ): Promise<StoreOnelineReivewData[]> {
    if (!this.storeRepository) {
      throw new Error('storeRepository is not set');
    }

    const result = await this.storeRepository.getStoreOnelineReviews({
      data: params,
    });

    return result;
  }

  async createStoreOnlineReviews(
    params: CreateOnelineReviewRequestFormData,
  ): Promise<CreateOnelineReviewResponse[]> {
    if (!this.storeRepository) {
      throw new Error('storeRepository is not set');
    } else if (!this.authRepository) {
      throw new Error('authRepository is not set');
    }

    const authorization = await this.authRepository.getAuthorization();

    const requestData = {
      data: params,
      authorization,
    };

    const result = await this.storeRepository.createOnelineReview(requestData);

    return result;
  }

  async deleteOnelineReview(params: DeleteOnelineReviewRequest): Promise<void> {
    if (!this.storeRepository) {
      throw new Error('storeRepository is not set');
    } else if (!this.authRepository) {
      throw new Error('authRepository is not set');
    }

    const authorization = await this.authRepository.getAuthorization();

    const requestData = {
      data: params,
      authorization,
    };

    await this.storeRepository.deleteOnelineReview(requestData);
  }

  async editOnelineReview(
    params: EditOnelineReviewRequest,
  ): Promise<OneLineReview> {
    if (!this.storeRepository) {
      throw new Error('storeRepository is not set');
    } else if (!this.authRepository) {
      throw new Error('authRepository is not set');
    }

    const authorization = await this.authRepository.getAuthorization();

    const requestData = {
      data: params,
      authorization,
    };

    const result = await this.storeRepository.editOnelineReview(requestData);
    return result;
  }
}
