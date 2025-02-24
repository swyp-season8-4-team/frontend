import APIRepository from './apiRepository';
import type {
  StoreRepository,
  StoreSummaryInfoData,
  StoreDetailInfoData,
  SavedListData,
  StoresInSavedListData,
  NearByStoreData,
  RegisterStoreResponse,
  RegisterStoreRequest,
  EditStoreRequest,
  EditStoreResponse,
  DeleteStoreRequest,
  CreateSavedListRequest,
  CreateSavedListResponse,
  EditSavedListRequest,
  EditSavedListResponse,
  DeleteSavedListRequest,
  AddStoreInSavedListRequest,
  AddStoreInSavedListResponse,
  DeleteStoreInSavedListRequest,
  Menu,
  EditMenuRequest,
  DeleteMenuRequest,
  GetMenuRequest,
  GetMenuListRequest,
  SavedListRequest,
  StoresInSavedListRequest,
  CreateMenuRequest,
  CreateMenuRequestFormData,
  StoreInSavedListRequest,
  StoreInSavedListResponse,
  NearByStoreRequest,
  NearByStoreSearchRequest,
  NearbyFilteredStoresRequest,
  MenuRequests,
} from '@repo/entity/src/store';
import type { BaseRequestData } from '@repo/entity/src/appMetadata';
import fetch from '@repo/api/src/fetch';

export default class StoreAPIRepository
  extends APIRepository
  implements StoreRepository
{
  // store
  async getNearbyStores({
    data,
  }: BaseRequestData<NearByStoreRequest>): Promise<NearByStoreData[]> {
    if (!data) {
      throw Error('data required');
    }

    const { latitude, longitude, radius } = data || {};

    const response = await fetch<void, NearByStoreData[]>({
      method: 'GET',
      url: `${this.endpoint}/stores/map?latitude=${latitude}&longitude=${longitude}&radius=${radius}`,
    });

    return response;
  }

  async getNearbyPreferStores({
    authorization,
    data,
  }: BaseRequestData<NearByStoreRequest>): Promise<NearByStoreData[]> {
    if (!data) {
      throw Error('data required');
    }

    const { latitude, longitude, radius } = data || {};

    const response = await fetch<void, NearByStoreData[]>({
      ...(authorization && {
        headers: {
          Authorization: authorization,
        },
      }),
      method: 'GET',
      url: `${this.endpoint}/stores/map/my-preferences?latitude=${latitude}&longitude=${longitude}&radius=${radius}`,
    });

    return response;
  }

  async getNearbyFilteredStores({
    data,
  }: BaseRequestData<NearbyFilteredStoresRequest>): Promise<NearByStoreData[]> {
    if (!data) {
      throw Error('data required');
    }

    const { latitude, longitude, radius, preferenceTagId } = data || {};

    const response = await fetch<void, NearByStoreData[]>({
      method: 'GET',
      url: `${this.endpoint}/stores/map?latitude=${latitude}&longitude=${longitude}&radius=${radius}&preference=${preferenceTagId}`,
    });

    return response;
  }

  async getNearBySearchStores({
    data,
  }: BaseRequestData<NearByStoreSearchRequest>): Promise<NearByStoreData[]> {
    if (!data) {
      throw Error('data required');
    }

    const { latitude, longitude, radius, searchKeyword } = data || {};

    const response = await fetch<void, NearByStoreData[]>({
      method: 'GET',
      url: `${this.endpoint}/stores/map?latitude=${latitude}&longitude=${longitude}&radius=${radius}&searchKeyword=${searchKeyword}`,
    });

    return response;
  }

  async getStoreSummary({
    data,
  }: BaseRequestData<{
    storeUuid: string;
  }>) {
    if (!data) {
      throw Error('data required');
    }

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
    if (!data) {
      throw Error('data required');
    }

    const { storeUuid } = data || {};

    const response = await fetch<void, StoreDetailInfoData>({
      method: 'GET',
      url: `${this.endpoint}/stores/${storeUuid}/details`,
    });

    return response;
  }

  async registerStore({
    authorization,
    data,
  }: BaseRequestData<RegisterStoreRequest>): Promise<RegisterStoreResponse> {
    if (!data) {
      throw Error('data required');
    }
    const url = `${this.endpoint}/stores`;

    const response = await fetch<RegisterStoreRequest, RegisterStoreResponse>({
      ...(authorization && {
        headers: {
          Authorization: authorization,
          'Content-Type': 'multipart/form-data',
        },
      }),
      data,
      method: 'POST',
      url,
    });

    return response;
  }

  async editStore({
    authorization,
    data,
  }: BaseRequestData<EditStoreRequest>): Promise<EditStoreResponse> {
    if (!data) {
      throw Error('data required');
    }

    const { storeUuid, ...rest } = data || {};

    const url = `${this.endpoint}/stores/${storeUuid}`;

    const response = await fetch<
      Omit<EditStoreRequest, 'storeUuid'>,
      EditStoreResponse
    >({
      ...(authorization && {
        headers: {
          Authorization: authorization,
        },
      }),
      data: { ...rest },
      method: 'PATCH',
      url,
    });

    return response;
  }

  async deleteStore({
    authorization,
    data,
  }: BaseRequestData<DeleteStoreRequest>): Promise<void> {
    if (!data) {
      throw Error('data required');
    }

    const { storeUuid } = data || {};

    const url = `${this.endpoint}/stores/${storeUuid}`;

    const response = await fetch<DeleteStoreRequest, Promise<void>>({
      ...(authorization && {
        headers: {
          Authorization: authorization,
        },
      }),
      method: 'DELETE',
      url,
    });

    return response;
  }

  // saved list
  async createSavedList({
    authorization,
    data,
  }: BaseRequestData<CreateSavedListRequest>): Promise<CreateSavedListResponse> {
    if (!data) {
      throw Error('data required');
    }

    const { userUuid, listName, iconColorId } = data || {};

    const url = `${this.endpoint}/user-store/${userUuid}/lists`;

    const response = await fetch<
      { listName: string; iconColorId: number },
      CreateSavedListResponse
    >({
      ...(authorization && {
        headers: {
          Authorization: authorization,
        },
      }),
      data: { listName, iconColorId },
      method: 'POST',
      url,
    });

    return response;
  }

  async editSavedList({
    authorization,
    data,
  }: BaseRequestData<EditSavedListRequest>): Promise<EditSavedListResponse> {
    if (!data) {
      throw Error('data required');
    }

    const { listId, newName, newIconColor } = data || {};

    const url = `${this.endpoint}/user-store/lists/${listId}`;

    const response = await fetch<
      { newName: string; newIconColor: number },
      EditSavedListResponse
    >({
      ...(authorization && {
        headers: {
          Authorization: authorization,
        },
      }),
      data: { newName, newIconColor },
      method: 'PATCH', // TODO: PATCH으로 변경
      url,
    });

    return response;
  }

  async deleteSavedList({
    authorization,
    data,
  }: BaseRequestData<DeleteSavedListRequest>): Promise<void> {
    if (!data) {
      throw Error('data required');
    }

    const { listId } = data || {};

    const url = `${this.endpoint}/user-store/lists/${listId}`;

    const response = await fetch<DeleteSavedListRequest, Promise<void>>({
      ...(authorization && {
        headers: {
          Authorization: authorization,
        },
      }),
      method: 'DELETE',
      url,
    });

    return response;
  }

  async addStoreInSavedList({
    authorization,
    data,
  }: BaseRequestData<AddStoreInSavedListRequest>): Promise<AddStoreInSavedListResponse> {
    if (!data) {
      throw Error('data required');
    }

    const { listId, storeUuid, userPreferences } = data || {};

    const url = `${this.endpoint}/user-store/lists/${listId}/stores/${storeUuid}`;

    const response = await fetch<
      typeof userPreferences,
      AddStoreInSavedListResponse
    >({
      ...(authorization && {
        headers: {
          Authorization: authorization,
          'Content-Type': 'application/json',
        },
      }),
      data: userPreferences,
      method: 'POST',
      url,
    });

    return response;
  }

  async deleteStoreInSavedList({
    authorization,
    data,
  }: BaseRequestData<DeleteStoreInSavedListRequest>): Promise<void> {
    if (!data) {
      throw Error('data required');
    }

    const { listId, storeUuid } = data || {};

    const url = `${this.endpoint}/user-store/lists/${listId}/stores/${storeUuid}`;

    const response = await fetch<DeleteStoreInSavedListRequest, Promise<void>>({
      ...(authorization && {
        headers: {
          Authorization: authorization,
        },
      }),
      method: 'DELETE',
      url,
    });

    return response;
  }

  async getStoreInSavedList({
    authorization,
    data,
  }: BaseRequestData<StoreInSavedListRequest>): Promise<StoreInSavedListResponse> {
    if (!data) {
      throw Error('data required');
    }

    const { listId } = data || {};

    const response = await fetch<
      StoreInSavedListRequest,
      StoreInSavedListResponse
    >({
      ...(authorization && {
        headers: {
          Authorization: authorization,
        },
      }),
      method: 'GET',
      url: `${this.endpoint}/user-store/lists/${listId}`,
    });

    return response;
  }

  async getStoresInSavedList({
    authorization,
    data,
  }: BaseRequestData<StoresInSavedListRequest>): Promise<
    StoresInSavedListData[]
  > {
    if (!data) {
      throw Error('data required');
    }

    const { listId } = data || {};

    const response = await fetch<
      StoresInSavedListRequest,
      StoresInSavedListData[]
    >({
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

  async getSavedListAll({
    authorization,
    data,
  }: BaseRequestData<SavedListRequest>): Promise<SavedListData[]> {
    if (!data) {
      throw Error('data required');
    }

    const { userUuid } = data || {};

    const response = await fetch<SavedListRequest, SavedListData[]>({
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

  // menu
  async createMenu({
    authorization,
    data,
  }: BaseRequestData<CreateMenuRequestFormData>): Promise<void> {
    if (!data) {
      throw Error('data required');
    }
    const { storeUuid, requests, menuImages } = data || {};

    const url = `${this.endpoint}/stores/${storeUuid}/menus`;

    const response = await fetch<
      { requests: MenuRequests; menuImages?: File | File[] },
      void
    >({
      ...(authorization && {
        headers: {
          Authorization: authorization,
          'Content-Type': 'multipart/form-data',
        },
      }),
      data: { requests, menuImages },
      method: 'POST',
      url,
    });

    return response;
  }

  async editMenu({
    authorization,
    data,
  }: BaseRequestData<EditMenuRequest>): Promise<void> {
    if (!data) {
      throw Error('data required');
    }

    const { storeUuid, menuUuid, file } = data || {};

    const url = `${this.endpoint}/stores/${storeUuid}/menus/${menuUuid}`;

    const response = await fetch<{ file: File }, void>({
      ...(authorization && {
        headers: {
          Authorization: authorization,
          'Content-Type': 'multipart/form-data', //TODO: content-type 테스트 해보기
        },
      }),
      data: { file },
      method: 'PATCH',
      url,
    });

    return response;
  }

  async deleteMenu({
    authorization,
    data,
  }: BaseRequestData<DeleteMenuRequest>): Promise<void> {
    if (!data) {
      throw Error('data required');
    }

    const { storeUuid, menuUuid } = data || {};

    const url = `${this.endpoint}/stores/${storeUuid}/menus/${menuUuid}`;

    const response = await fetch<DeleteMenuRequest, void>({
      ...(authorization && {
        headers: {
          Authorization: authorization,
        },
      }),
      method: 'DELETE',
      url,
    });

    return response;
  }

  async getMenu({ data }: BaseRequestData<GetMenuRequest>): Promise<Menu> {
    const { storeUuid, menuUuid } = data || {};

    const response = await fetch<GetMenuRequest, Menu>({
      method: 'GET',
      url: `${this.endpoint}/stores/${storeUuid}/menus/${menuUuid}`,
    });

    return response;
  }

  async getMenuList({
    data,
  }: BaseRequestData<GetMenuListRequest>): Promise<Menu[]> {
    if (!data) {
      throw Error('data required');
    }

    const { storeUuid } = data || {};

    const response = await fetch<GetMenuListRequest, Menu[]>({
      method: 'GET',
      url: `${this.endpoint}/stores/${storeUuid}/menus`,
    });

    return response;
  }

  // coupon
  async updateCouponCount(): Promise<void> {
    const url = `${this.endpoint}/banners/click`;

    const response = await fetch<void, void>({
      method: 'POST',
      url,
    });

    return response;
  }
}
