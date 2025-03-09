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
      } else if (!this.authRepository) {
        throw new Error('authRepository is not set');
      }

      const authorization = await this.authRepository.getAuthorization();

      const requestData = {
        data: {
          latitude,
          longitude,
          radius,
          preferenceTagIds,
          searchKeyword,
        },
        ...(authorization && { authorization }),
      };

      const response = await this.storeRepository.getNearbyStores(requestData);

      return response;
    } catch (error) {
      throw error;
    }
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
    } catch (error) {
      throw error;
    }
  }

  async getUserSavedStores(listId: number) {
    try {
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
    } catch (error) {
      throw error;
    }
  }

  async getSavedListAll(userUuid: string) {
    try {
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

      const result = await this.storeRepository.getSavedListAll({
        ...reqestData,
      });

      return result;
    } catch (error) {
      throw error;
    }
  }

  async registerStore(
    params: RegisterStoreRequest,
  ): Promise<RegisterStoreResponse> {
    try {
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

      return response;
    } catch (error) {
      throw error;
    }
  }

  async editStore(params: EditStoreRequest): Promise<EditStoreResponse> {
    try {
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
    } catch (error) {
      throw error;
    }
  }

  async updateStore() {
    try {
      if (!this.storeRepository) {
        throw new Error('storeRepository is not set');
      } else if (!this.authRepository) {
        throw new Error('authRepository is not set');
      }

      //TODO: 구현 필요
    } catch (error) {
      throw error;
    }
  }

  async deleteStore(params: DeleteStoreRequest): Promise<void> {
    try {
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

  // async getNearbyFilteredStores({
  //   latitude,
  //   longitude,
  //   radius,
  //   preferenceTagId,
  // }: {
  //   latitude: number;
  //   longitude: number;
  //   radius: number;
  //   preferenceTagId: number[];
  // }): Promise<NearByStoreData[]> {
  //   try {
  //     if (!this.storeRepository) {
  //       throw new Error('storeRepository is not set');
  //     }

  //     const requestData = {
  //       data: {
  //         latitude,
  //         longitude,
  //         radius,
  //         preferenceTagId,
  //       },
  //     };

  //     const response =
  //       await this.storeRepository.getNearbyFilteredStores(requestData);

  //     return response;
  //   } catch (error) {
  //     throw error;
  //   }
  // }

  // async getNearbyPreferStores({
  //   latitude,
  //   longitude,
  //   radius,
  //   authorization,
  // }: {
  //   latitude: number;
  //   longitude: number;
  //   radius: number;
  //   authorization: string;
  // }): Promise<NearByStoreData[]> {
  //   try {
  //     if (!this.storeRepository) {
  //       throw new Error('storeRepository is not set');
  //     }

  //     const requestData = {
  //       authorization,
  //       data: {
  //         latitude,
  //         longitude,
  //         radius,
  //       },
  //     };

  //     const response =
  //       await this.storeRepository.getNearbyPreferStores(requestData);

  //     return response;
  //   } catch (error) {
  //     throw error;
  //   }
  // }

  // async getNearBySearchStores({
  //   latitude,
  //   longitude,
  //   radius,
  //   searchKeyword,
  // }: {
  //   latitude: number;
  //   longitude: number;
  //   radius: number;
  //   searchKeyword: string;
  // }): Promise<NearByStoreData[]> {
  //   try {
  //     if (!this.storeRepository) {
  //       throw new Error('storeRepository is not set');
  //     }

  //     const requestData = {
  //       data: {
  //         latitude,
  //         longitude,
  //         radius,
  //         searchKeyword,
  //       },
  //     };

  //     const response =
  //       await this.storeRepository.getNearBySearchStores(requestData);

  //     return response;
  //   } catch (error) {
  //     throw error;
  //   }
  // }

  async createMenu(params: CreateMenuRequestFormData): Promise<void> {
    try {
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
    } catch (error) {
      throw error;
    }
  }

  async editMenu(params: EditMenuRequest): Promise<void> {
    try {
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
    } catch (error) {
      throw error;
    }
  }

  async deleteMenu(params: DeleteMenuRequest): Promise<void> {
    try {
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
    } catch (error) {
      throw error;
    }
  }

  async editSavedList(
    params: EditSavedListRequest,
  ): Promise<EditSavedListResponse> {
    try {
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
    } catch (error) {
      throw error;
    }
  }

  async deleteSavedList(params: DeleteSavedListRequest): Promise<void> {
    try {
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
      } else if (!this.authRepository) {
        throw new Error('authRepository is not set');
      }

      const authorization = await this.authRepository.getAuthorization();

      const requestData = {
        data: params,
        authorization,
      };

      await this.storeRepository.deleteStoreInSavedList(requestData);
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
      } else if (!this.authRepository) {
        throw new Error('authRepository is not set');
      }

      const authorization = await this.authRepository.getAuthorization();

      const requestData = {
        data: params,
        authorization,
      };

      const response =
        await this.storeRepository.getParentSavedList(requestData);
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
    } else if (!this.authRepository) {
      throw new Error('authRepository is not set');
    }

    try {
      const authorization = await this.authRepository.getAuthorization();

      const requestData = {
        data: params,
        authorization,
      };

      const result =
        await this.storeRepository.createOnelineReview(requestData);

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
