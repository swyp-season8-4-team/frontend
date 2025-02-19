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

  async registerStore({
    authorization,
    data,
  }: BaseRequestData<RegisterStoreRequest>): Promise<RegisterStoreResponse> {
    const url = `${this.endpoint}/stores`;

    const response = await fetch<RegisterStoreRequest, RegisterStoreResponse>({
      ...(authorization && {
        headers: {
          Authorization: authorization,
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
    const { storeUuid } = data || {};

    const url = `${this.endpoint}/stores/${storeUuid}`;

    const response = await fetch<EditStoreRequest, EditStoreResponse>({
      ...(authorization && {
        headers: {
          Authorization: authorization,
        },
      }),
      data,
      method: 'PATCH', // TODO: PUT으로 변경
      url,
    });

    return response;
  }

  async deleteStore({
    authorization,
    data,
  }: BaseRequestData<DeleteStoreRequest>): Promise<void> {
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
    const { userUuid } = data || {};

    const url = `${this.endpoint}/user-store/${userUuid}/lists`;

    const response = await fetch<
      CreateSavedListRequest,
      CreateSavedListResponse
    >({
      ...(authorization && {
        headers: {
          Authorization: authorization,
        },
      }),
      data,
      method: 'POST',
      url,
    });

    return response;
  }

  async editSavedList({
    authorization,
    data,
  }: BaseRequestData<EditSavedListRequest>): Promise<EditSavedListResponse> {
    const { listId } = data || {};

    const url = `${this.endpoint}/user-store/lists/${listId}`;

    const response = await fetch<EditSavedListRequest, EditSavedListResponse>({
      ...(authorization && {
        headers: {
          Authorization: authorization,
        },
      }),
      data,
      method: 'PATCH', // TODO: PUT으로 변경
      url,
    });

    return response;
  }

  async deleteSavedList({
    authorization,
    data,
  }: BaseRequestData<DeleteSavedListRequest>): Promise<void> {
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
    const { listId, storeUuid } = data || {};

    const url = `${this.endpoint}/user-store/lists/${listId}/stores/${storeUuid}`;

    const response = await fetch<
      AddStoreInSavedListRequest,
      AddStoreInSavedListResponse
    >({
      ...(authorization && {
        headers: {
          Authorization: authorization,
        },
      }),
      data,
      method: 'POST',
      url,
    });

    return response;
  }

  async deleteStoreInSavedList({
    authorization,
    data,
  }: BaseRequestData<DeleteStoreInSavedListRequest>): Promise<void> {
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

  async getStoresInSavedList({
    authorization,
    data,
  }: BaseRequestData<StoresInSavedListRequest>): Promise<
    StoresInSavedListData[]
  > {
    const { listId } = data || {};

    const response = await fetch<
      StoresInSavedListRequest,
      StoresInSavedListData[]
    >({
      // ...(authorization && {
      //   headers: {
      //     Authorization: authorization,
      //   },
      // }),
      method: 'GET',
      url: `${this.endpoint}/user-store/lists/${listId}/stores`,
    });

    return response;
  }

  async getSavedListAll({
    authorization,
    data,
  }: BaseRequestData<SavedListRequest>): Promise<SavedListData[]> {
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
  }: BaseRequestData<CreateMenuRequest>): Promise<void> {
    const { storeUuid } = data || {};

    const url = `${this.endpoint}/stores/${storeUuid}/menus`;

    const response = await fetch<CreateMenuRequest, void>({
      ...(authorization && {
        headers: {
          Authorization: authorization,
        },
      }),
      data,
      method: 'POST',
      url,
    });

    return response;
  }

  async editMenu({
    authorization,
    data,
  }: BaseRequestData<EditMenuRequest>): Promise<void> {
    const { storeUuid, menuUuid } = data || {};

    const url = `${this.endpoint}/stores/${storeUuid}/menus/${menuUuid}`;

    const response = await fetch<EditMenuRequest, void>({
      ...(authorization && {
        headers: {
          Authorization: authorization,
        },
      }),
      data,
      method: 'PATCH', // TODO: PUT으로 수정
      url,
    });

    return response;
  }

  async deleteMenu({
    authorization,
    data,
  }: BaseRequestData<DeleteMenuRequest>): Promise<void> {
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
    const { storeUuid } = data || {};

    const response = await fetch<GetMenuListRequest, Menu[]>({
      method: 'GET',
      url: `${this.endpoint}/stores/${storeUuid}/menus`,
    });

    return response;
  }

  // coupon
  async updateCouponCount({ data }: BaseRequestData<void>): Promise<void> {} // TODO: api 아직
}
