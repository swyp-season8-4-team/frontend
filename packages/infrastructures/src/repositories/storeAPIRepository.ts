import APIRepository from './apiRepository';
import PreferenceConverter from '../mappers/preferenceConverter';
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
  CreateMenuRequestFormData,
  NearByStoreRequest,
  NearByStoreSearchRequest,
  NearbyFilteredStoresRequest,
  MenuRequests,
  ParentSavedListResponse,
  ParentSavedListRequest,
  PreferenceData,
  CreateOnelineReviewRequestFormData,
  CreateOnelineReviewResponse,
  StoreOnelineReivewRequest,
  StoreOnelineReivewData,
  DeleteOnelineReviewRequest,
  EditOnelineReviewRequest,
  OneLineReview,
  StoreDetailInfoRequest,
  SavedStoresLocationData,
  SavedStoresLocationRequest,
  RegisterStoreFromData,
  getOwnerStoreListResponse,
  RegisterNoticeRequest,
  NoticeListRequest,
  NoticeListResponse,
  updateStoreRequest,
  updateStoreResponse,
  updateStoreRequestFormData,
  NoticeRequest,
  NoticeResponse,
  EditNoticeRequest,
  EditNoticeResponse,
  DeleteNoticeRequest,

} from '@repo/entity/src/store';
import type { BaseRequestData } from '@repo/entity/src/appMetadata';
import fetch from '@repo/api/src/fetch';

export default class StoreAPIRepository
  extends APIRepository
  implements StoreRepository
{
  private readonly preferenceConverter = new PreferenceConverter();

  //preference
  async getAllPreference(): Promise<PreferenceData[]> {
    const response = await fetch<void, PreferenceData[]>({
      method: 'GET',
      url: `${this.endpoint}/preferences`,
    });

    return response;
  }
  // store
  async getNearbyStores({
    data,
    authorization,
  }: BaseRequestData<NearByStoreRequest>): Promise<NearByStoreData[]> {
    if (!data) {
      throw Error('data required');
    }

    const { latitude, longitude, radius, preferenceTagNames, searchKeyword } =
      data || {};

    let url = `${this.endpoint}/stores/map?latitude=${latitude}&longitude=${longitude}&radius=${radius}`;

    if (preferenceTagNames && preferenceTagNames.length > 0) {
      const preferenceTagIds =
        this.preferenceConverter.convertPreferenceToRaw(preferenceTagNames);

      url += `&preferenceTagIds=${preferenceTagIds.join(',')}`;
    }

    if (searchKeyword) {
      url += `&searchKeyword=${searchKeyword}`;
    }

    const response = await fetch<void, NearByStoreData[]>({
      ...(authorization && {
        headers: {
          Authorization: authorization,
        },
      }),
      method: 'GET',
      url,
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
          'Content-Type': 'multipart/form-data',
        },
      }),
      method: 'GET',
      url: `${this.endpoint}/stores/map/my-preferences?latitude=${latitude}&longitude=${longitude}&radius=${radius}`,
    });

    return response;
  }

  async getNearbyFilteredStores({
    data,
    authorization,
  }: BaseRequestData<NearbyFilteredStoresRequest>): Promise<NearByStoreData[]> {
    if (!data) {
      throw Error('data required');
    }

    const { latitude, longitude, radius, preferenceTagNames } = data || {};

    const preferenceTagIds =
      this.preferenceConverter.convertPreferenceToRaw(preferenceTagNames);

    const response = await fetch<void, NearByStoreData[]>({
      ...(authorization && {
        headers: {
          Authorization: authorization,
          'Content-Type': 'multipart/form-data',
        },
      }),
      method: 'GET',
      url: `${this.endpoint}/stores/map?latitude=${latitude}&longitude=${longitude}&radius=${radius}&preference=${preferenceTagIds}`,
    });

    return response;
  }

  async getNearBySearchStores({
    data,
    authorization,
  }: BaseRequestData<NearByStoreSearchRequest>): Promise<NearByStoreData[]> {
    if (!data) {
      throw Error('data required');
    }

    const { latitude, longitude, radius, searchKeyword } = data || {};

    const response = await fetch<void, NearByStoreData[]>({
      ...(authorization && {
        headers: {
          Authorization: authorization,
          'Content-Type': 'multipart/form-data',
        },
      }),
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
    authorization,
  }: BaseRequestData<StoreDetailInfoRequest>) {
    if (!data) {
      throw Error('data required');
    }

    const { storeUuid, userUuid } = data || {};

    const response = await fetch<void, StoreDetailInfoData>({
      ...(authorization && {
        headers: {
          Authorization: authorization,
        },
      }),
      method: 'GET',
      // url: `${this.endpoint}/stores/${storeUuid}/details${userUuid ? `?userUuid=${userUuid}` : ''}`,
      url: `${this.endpoint}/stores/${storeUuid}/details`,
    });

    return response;
  }

  async registerStore({
    authorization,
    data,
  }: BaseRequestData<RegisterStoreFromData>): Promise<void> {
    if (!data) {
      throw Error('data required');
    }
    const { request, storeImageFiles, ownerPickImageFiles, menuImageFiles } =
      data || {};

    const url = `${this.endpoint}/stores`;

    const formData = new FormData();
    formData.append(
      'request',
      new Blob([JSON.stringify(request)], { type: 'application/json' }),
    );
    if (storeImageFiles.length !== 0) {
      if (Array.isArray(storeImageFiles)) {
        storeImageFiles.forEach((image, index) => {
          formData.append('storeImageFiles', image);
        });
      } else {
        formData.append('storeImageFiles', storeImageFiles);
      }
    }

    if (ownerPickImageFiles && ownerPickImageFiles?.length !== 0) {
      if (Array.isArray(ownerPickImageFiles)) {
        ownerPickImageFiles.forEach((image, index) => {
          formData.append('ownerPickImageFiles', image);
        });
      }
    }

    if (menuImageFiles && menuImageFiles.length !== 0) {
      if (Array.isArray(menuImageFiles)) {
        menuImageFiles.forEach((image, index) => {
          formData.append('menuImageFiles', image);
        });
      }
    }
    const response = await fetch<RegisterStoreFromData, void>({
      ...(authorization && {
        headers: {
          Authorization: authorization,
        },
      }),
      method: 'POST',
      url: url,
      formData,
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
    data,
    authorization,
  }: BaseRequestData<CreateSavedListRequest>): Promise<CreateSavedListResponse> {
    if (!data) {
      throw Error('data required');
    }

    const { userUuid, listName, iconColorId } = data || {};

    const url = `${this.endpoint}/user-store/${userUuid}/lists?userUuid=${userUuid}&listName=${listName}&iconColorId=${iconColorId}`;

    const response = await fetch<void, CreateSavedListResponse>({
      ...(authorization && {
        headers: {
          Authorization: authorization,
        },
      }),
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
    data,
    authorization,
  }: BaseRequestData<DeleteSavedListRequest>) {
    if (!data) {
      throw Error('data required');
    }

    const { listId } = data || {};

    const url = `${this.endpoint}/user-store/lists/${listId}`;

    const response = await fetch<DeleteSavedListRequest, void>({
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

    const preferenceTagIds =
      this.preferenceConverter.convertPreferenceToRaw(userPreferences);

    const url = `${this.endpoint}/user-store/lists/${listId}/stores/${storeUuid}`;

    const response = await fetch<number[], AddStoreInSavedListResponse>({
      ...(authorization && {
        headers: {
          Authorization: authorization,
        },
      }),
      data: preferenceTagIds,
      method: 'POST',
      url,
    });

    return response;
  }

  async deleteStoreInSavedList({
    data,
    authorization,
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

  async getParentSavedList({
    data,
    authorization,
  }: BaseRequestData<ParentSavedListRequest>): Promise<ParentSavedListResponse> {
    if (!data) {
      throw Error('data required');
    }

    const { listId } = data || {};

    const response = await fetch<
      ParentSavedListRequest,
      ParentSavedListResponse
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

  async getStoresLocationInSavedList({
    authorization,
    data,
  }: BaseRequestData<SavedStoresLocationRequest>): Promise<
    SavedStoresLocationData[]
  > {
    if (!data) {
      throw Error('data required');
    }

    const { listId } = data || {};

    const response = await fetch<
      SavedStoresLocationRequest,
      SavedStoresLocationData[]
    >({
      ...(authorization && {
        headers: {
          Authorization: authorization,
        },
      }),
      method: 'GET',
      url: `${this.endpoint}/user-store/lists/${listId}/stores/locations`,
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
      ...(authorization && {
        headers: {
          Authorization: authorization,
        },
      }),
      method: 'GET',
      url: `${this.endpoint}/user-store/${userUuid}/lists`,
    });

    return response;
  }

  async getStoresPositionInSavedList({
    authorization,
    data,
  }: BaseRequestData<SavedStoresLocationRequest>): Promise<
    SavedStoresLocationData[]
  > {
    if (!data) {
      throw Error('data required');
    }

    const { listId } = data || {};

    const url = `${this.endpoint}/user-store/lists/${listId}/stores/locations`;

    const response = await fetch<
      SavedStoresLocationRequest,
      SavedStoresLocationData[]
    >({
      ...(authorization && {
        headers: {
          Authorization: authorization,
        },
      }),
      method: 'GET',
      url,
    });

    return response;
  }

  // owner 가게 목록 조회
  async getOwnerStoreList({
    authorization,
  }: BaseRequestData<void>): Promise<getOwnerStoreListResponse[]> {
    const url = `${this.endpoint}/stores/owner`;

    const response = await fetch<
      BaseRequestData<void>,
      getOwnerStoreListResponse[]
    >({
      ...(authorization && {
        headers: {
          Authorization: authorization,
        },
      }),
      method: 'GET',
      url,
    });

    return response;
  }

  async updateStore({
    authorization,
    data,
  }: BaseRequestData<updateStoreRequestFormData>): Promise<updateStoreResponse> {
    if (!data) {
      throw Error('data required');
    }

    const { storeUuid, requests, storeImageFiles, ownerPickImageFiles } =
      data || {};
    const url = `${this.endpoint}/stores/${storeUuid}`;

    const formData = new FormData();
    formData.append(
      'request',
      new Blob([JSON.stringify(requests)], { type: 'application/json' }),
    );

    if (
      requests.storeImageDeleteIds &&
      Array.isArray(requests.storeImageDeleteIds)
    ) {
      requests.storeImageDeleteIds.forEach((id) => {
        formData.append('storeImageDeleteIds[]', id.toString());
      });
    }
    if (
      requests.ownerPickImageDeleteIds &&
      Array.isArray(requests.ownerPickImageDeleteIds)
    ) {
      requests.ownerPickImageDeleteIds.forEach((id) => {
        formData.append('ownerPickImageDeleteIds[]', id.toString());
      });
    }

    const isFile = (item: any): item is File => item instanceof File;

    if (storeImageFiles && storeImageFiles.length > 0) {
      storeImageFiles.forEach((image) => {
        if (isFile(image)) {
          formData.append('storeImageFiles', image);
        }
      });
    }

    if (ownerPickImageFiles && ownerPickImageFiles.length > 0) {
      ownerPickImageFiles.forEach((image) => {
        if (isFile(image)) {
          formData.append('ownerPickImageFiles', image);
        }
      });
    }

    const response = await fetch<
      updateStoreRequestFormData,
      updateStoreResponse
    >({
      ...(authorization && {
        headers: {
          Authorization: authorization,
        },
      }),
      method: 'PATCH',
      url,
      formData,
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

  // review
  async getStoreOnelineReviews({
    data,
  }: BaseRequestData<StoreOnelineReivewRequest>): Promise<
    StoreOnelineReivewData[]
  > {
    const { storeUuid } = data || {};

    const url = `${this.endpoint}/stores/${storeUuid}/reviews`;

    const response = await fetch<void, StoreOnelineReivewData[]>({
      method: 'GET',
      url: url,
    });

    return response;
  }

  async createOnelineReview({
    data,
    authorization,
  }: BaseRequestData<CreateOnelineReviewRequestFormData>): Promise<
    CreateOnelineReviewResponse[]
  > {
    if (!data) {
      throw Error('data required');
    }
    const { storeUuid, request, images } = data || {};

    const url = `${this.endpoint}/stores/${storeUuid}/reviews`;

    const formData = new FormData();
    formData.append(
      'request',
      new Blob([JSON.stringify(request)], { type: 'application/json' }),
    );
    if (images) {
      if (Array.isArray(images)) {
        images.forEach((image, index) => {
          formData.append('images', image);
        });
      } else {
        formData.append('images', images);
      }
    }
    const response = await fetch<void, CreateOnelineReviewResponse[]>({
      ...(authorization && {
        headers: {
          Authorization: authorization,
        },
      }),
      method: 'POST',
      url: url,
      formData,
    });

    return response;
  }

  async deleteOnelineReview({
    data,
    authorization,
  }: BaseRequestData<DeleteOnelineReviewRequest>): Promise<void> {
    if (!data) {
      throw Error('data required');
    }

    const { storeUuid, reviewUuid } = data || {};

    const url = `${this.endpoint}/stores/${storeUuid}/reviews/${reviewUuid}`;

    const response = await fetch<DeleteOnelineReviewRequest, void>({
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

  async editOnelineReview({
    data,
    authorization,
  }: BaseRequestData<EditOnelineReviewRequest>): Promise<OneLineReview> {
    if (!data) {
      throw Error('data required');
    }
    const { storeUuid, reviewUuid, request, newImages } = data || {};

    const url = `${this.endpoint}/stores/${storeUuid}/reviews/${reviewUuid}`;

    const formData = new FormData();
    formData.append(
      'request',
      new Blob([JSON.stringify(request)], { type: 'application/json' }),
    );
    if (newImages) {
      if (Array.isArray(newImages)) {
        newImages.forEach((image) => {
          formData.append('newImages', image);
        });
      } else {
        formData.append('newImages', newImages);
      }
    }
    const response = await fetch<void, OneLineReview>({
      ...(authorization && {
        headers: {
          Authorization: authorization,
        },
      }),
      method: 'PATCH',
      url: url,
      formData,
    });

    return response;
  }

  // owner:notice
  async createNotice({
    authorization,
    data,
  }: BaseRequestData<RegisterNoticeRequest>): Promise<void> {
    if (!data) {
      throw Error('data required');
    }

    const { storeUuid, tag, title, content } = data || {};
    const url = `${this.endpoint}/stores/${storeUuid}/notices`;

    const response = await fetch<
      {
        tag: string;
        title: string;
        content: string;
      },
      void
    >({
      ...(authorization && {
        headers: {
          Authorization: authorization,
        },
      }),
      data: { tag, title, content }, // 추가
      method: 'POST',
      url,
    });

    return response;
  }

  async getNoticeList({
    authorization,
    data,
  }: BaseRequestData<NoticeListRequest>): Promise<NoticeListResponse[]> {
    if (!data) {
      throw Error('data required');
    }

    const { storeUuid } = data || {};

    const response = await fetch<NoticeListRequest, NoticeListResponse[]>({
      ...(authorization && {
        headers: {
          Authorization: authorization,
        },
      }),
      method: 'GET',
      url: `${this.endpoint}/stores/${storeUuid}/notices`,
    });

    return response;
  }

  async getNotice({
    authorization,
    data,
  }: BaseRequestData<NoticeRequest>): Promise<NoticeResponse> {
    if (!data) {
      throw Error('data required');
    }

    const { storeUuid, noticeId } = data || {};

    const response = await fetch<NoticeRequest, NoticeResponse>({
      ...(authorization && {
        headers: {
          Authorization: authorization,
        },
      }),
      method: 'GET',
      url: `${this.endpoint}/stores/${storeUuid}/notices/${noticeId}`,
    });

    return response;
  }

  async editNotice({
    authorization,
    data,
  }: BaseRequestData<EditNoticeRequest>): Promise<EditNoticeResponse> {
    if (!data) {
      throw Error('data required');
    }

    const { storeUuid, noticeId, ...rest } = data || {};

    const url = `${this.endpoint}/stores/${storeUuid}/notices/${noticeId}`;

    const response = await fetch<
      Omit<EditNoticeRequest, 'storeUuid' | 'noticeId'>,
      EditNoticeResponse
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

  async deleteNotice({
    authorization,
    data,
  }: BaseRequestData<DeleteNoticeRequest>): Promise<void> {
    if (!data) {
      throw Error('data required');
    }

    const { storeUuid, noticeId } = data || {};

    const url = `${this.endpoint}/stores/${storeUuid}/notices/${noticeId}`;

    const response = await fetch<DeleteNoticeRequest, void>({
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
}

