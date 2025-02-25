import type { BaseRequestData } from './appMetadata';
import type { OneLineReview } from './review';

export interface Store {
  storeId: number;
  storeUuid: string;
  name: string;
  phone: string;
  address: string;
  storeLink: string;
  latitude: number;
  longitude: number;
  description?: string;
  animalYn: boolean;
  parkingYn: boolean;
  tumblerYn: boolean;
  operatingHours: OperatingHoursItem[];
  holidays: HolidaysItem[];
  averageRating: number;
  notice: string[];
  status?: string;
  createdAt?: string;
  updatedAt?: string;
  tagIds: number[];
  tags: string[];
  topPreferences: string[];
  storeImages?: string[];
  ownerPickImages?: string[];
}

export interface Menu {
  menuUuid?: string;
  name: string;
  price: number;
  isPopular?: boolean;
  description?: string | null;
  imageFileKey?: string | null; // 파일명임. 확장자 포함해야함 ex) menu_cake6.jpeg"
  images?: string[]; // 응답
}

export interface OperatingHoursItem {
  dayOfWeek: string;
  openingTime: string;
  closingTime: string;
  lastOrderTime: string;
  isClosed: boolean;
}
// openingTime: {
//   hour: number;
//   minute: number;
// };
// closingTime: {
//   hour: number;
//   minute: number;
// };
// lastOrderTime: {
//   hour: number;
//   minute: number;
// };

export interface HolidaysItem {
  date: string;
  reason: string;
}

export interface StoreEvent {
  id: number;
  storeId: number;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  images: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface StoreCoupon {
  title: string;
  description: string;
  expiryDate: string;
}

export interface SavedList {
  saved: boolean;
  savedListId: number | null;
}

// export type StoreTag = '베이커리' | '루프탑 있음' | '애완동물 동반 가능'; // TODO: 전체 카테고리 정리하기

// store
export interface NearByStoreRequest {
  latitude: number;
  longitude: number;
  radius: number;
}

export interface NearbyFilteredStoresRequest {
  latitude: number;
  longitude: number;
  radius: number;
  preferenceTagId: number[];
}

export interface NearByStoreSearchRequest {
  latitude: number;
  longitude: number;
  radius: number;
  searchKeyword: string;
}

export type NearByStoreData = Pick<
  Store,
  'storeId' | 'storeUuid' | 'name' | 'address' | 'latitude' | 'longitude'
>;

export interface StoreSummaryInfoRequest {
  storeUuid: string;
}

export interface StoreSummaryInfoData
  extends Pick<
    Store,
    | 'storeId'
    | 'storeUuid'
    | 'name'
    | 'address'
    | 'phone'
    | 'storeLink'
    | 'animalYn'
    | 'tumblerYn'
    | 'parkingYn'
    | 'averageRating'
    | 'description'
    | 'operatingHours'
    | 'tags'
    | 'holidays'
    | 'storeImages'
    | 'ownerPickImages'
    | 'topPreferences'
  > {}

export interface StoreDetailInfoRequest {
  storeUuid: string;
  // user: {
  //   //USER 객체 통채로 보내야함
  //   id: number;
  //   userUuid: string;
  //   email: string;
  //   password: string;
  //   name: string;
  //   nickname: string;
  //   createdAt: string;
  //   updatedAt: string;
  //   deletedAt: string;
  //   phoneNumber: string;
  //   address: string;
  //   gender: string;
  //   userRoles: [
  //     {
  //       id: number;
  //       user: string;
  //       role: {
  //         id: number;
  //         name: string;
  //       };
  //     },
  //   ];
  //   auths: [
  //     {
  //       id: number;
  //       user: string;
  //       provider: string;
  //       providerId: string;
  //       refreshToken: string;
  //       refreshTokenExpiresAt: string;
  //       active: boolean;
  //       createdAt: string;
  //       updatedAt: string;
  //     },
  //   ];
  //   userPreferences: [
  //     {
  //       id: number;
  //       user: string;
  //       preference: {
  //         id: number;
  //         preferenceName: string;
  //         preferenceDesc: string;
  //         userPreferences: string[];
  //       };
  //     },
  //   ];
  //   mbti: {
  //     id: number;
  //     mbtiType: string;
  //     mbtiName: string;
  //     mbtiDesc: string;
  //   };
  // };
}

export interface StoreDetailInfoData
  extends Pick<
    Store,
    | 'storeId'
    | 'storeUuid'
    | 'name'
    | 'address'
    | 'phone'
    | 'storeLink'
    | 'animalYn'
    | 'tumblerYn'
    | 'parkingYn'
    | 'averageRating'
    | 'latitude'
    | 'longitude'
    | 'description'
    | 'operatingHours'
    | 'holidays'
    | 'notice'
    | 'storeImages'
    | 'tags'
    | 'topPreferences'
    | 'ownerPickImages'
    | 'storeImages'
  > {
  userId: number | null; //userId, userUuid는 현재 인증된(로그인한) 사용자의 id (<--왜 주는건지..?)
  userUuid: string | null;
  ownerId: number;
  ownerUuid: string;
  menus: Menu[];
  totalReviewCount: number;
  storeReviews: OneLineReview[];
  mate: {
    mateUuid: string;
    mateCategory: string;
    thumbnail: string;
    title: string;
    content: string;
    nickname: string;
    recruitYn: boolean;
  }[];

  saved: SavedList['saved'];
  savedListId: SavedList['savedListId'];
}

export interface RegisterStoreRequest
  extends Pick<
    Store,
    | 'name'
    | 'phone'
    | 'address'
    | 'storeLink'
    | 'latitude'
    | 'longitude'
    | 'animalYn'
    | 'tumblerYn'
    | 'parkingYn'
    | 'averageRating'
    | 'tagIds'
    | 'status'
    | 'operatingHours'
    | 'holidays'
    | 'description'
    | 'notice'
  > {
  userUuid: string;
  menus: Menu[];
  storeImageFiles?: File[];
  ownerPickImageFiles?: File[];
  menuImageFiles?: File[];
}

export interface RegisterStoreResponse
  extends Pick<
    Store,
    | 'storeId'
    | 'storeUuid'
    | 'name'
    | 'phone'
    | 'address'
    | 'storeLink'
    | 'description'
    | 'latitude'
    | 'longitude'
    | 'animalYn'
    | 'tumblerYn'
    | 'parkingYn'
    | 'averageRating'
    | 'tagIds'
    | 'status'
    | 'operatingHours'
    | 'holidays'
    | 'notice'
    | 'tags'
    | 'topPreferences'
    | 'storeImages'
    | 'ownerPickImages'
  > {
  userId: number;
  userUuid: string | null;
  ownerId: number;
  menus: Menu[];
  totalReviewCount: number;
  storeReviews: OneLineReview[];
  mate: {
    mateUuid: string;
    mateCategory: string;
    thumbnail: string;
    title: string;
    content: string;
    nickname: string;
    recruitYn: boolean;
  }[];
  saved: SavedList['saved'];
  savedListId: SavedList['savedListId'];
}

export interface EditStoreRequest
  extends Pick<
    Store,
    | 'storeId'
    | 'storeUuid'
    | 'name'
    | 'phone'
    | 'address'
    | 'storeLink'
    | 'description'
    | 'animalYn'
    | 'tumblerYn'
    | 'parkingYn'
    | 'averageRating'
    | 'operatingHours'
    | 'holidays'
    | 'notice'
    | 'tags'
    | 'topPreferences'
    | 'storeImages'
    | 'ownerPickImages'
  > {
  menus: Menu[];
  totalReviewCount: number;
  storeReviews: OneLineReview[];
  mate: {
    mateUuid: string;
    mateCategory: string;
    thumbnail: string;
    title: string;
    content: string;
    nickname: string;
    recruitYn: boolean;
  }[];
  menuImageFiles: File[]; // 파일명 확장자까지
  storeImageFiles: File[]; // 파일명 확장자까지
}

export interface EditStoreResponse
  extends Pick<
    Store,
    | 'storeId'
    | 'storeUuid'
    | 'name'
    | 'address'
    | 'phone'
    | 'storeLink'
    | 'animalYn'
    | 'tumblerYn'
    | 'parkingYn'
    | 'description'
    | 'averageRating'
    | 'storeImages'
    | 'ownerPickImages'
    | 'tags'
    | 'notice'
    | 'operatingHours'
    | 'holidays'
    | 'topPreferences'
  > {
  userId: number | null;
  userUuid: string | null;
  ownerId: number;
  ownerUuid: string;
  menus: Menu[];
  totalReviewCount: number;
  storeReviews: OneLineReview[];
  mate: {
    mateUuid: string;
    mateCategory: string;
    thumbnail: string;
    title: string;
    content: string;
    nickname: string;
    recruitYn: boolean;
  }[];
}

export interface DeleteStoreRequest {
  storeUuid: string;
}

// saved list
export interface SavedListRequest {
  userUuid: string;
}

export interface SavedListData {
  listId: number;
  userUuid: string;
  listName: string;
  iconColorId: number;
  storeCount: number;
}

// 상세정보에서 사용
export interface StoreInSavedListRequest {
  listId: number;
}

// export interface StoreInSavedListResponse {
//   listId: number;
//   listName: string;
//   iconColorId: number;
// }

export interface StoreInfoData {
  userUuid: string;
  storeUuid: string;
  listId: number;
  listName: string;
  storeName: string;
  storeAddress: string;
  imageUrls: string[];
  userPreference: string[];
}

export interface StoreInSavedListResponse {
  listId: number;
  userUuid: string;
  listName: string;
  iconColorId: number;
  storeCount: number;
  storeData: StoreInfoData[];
}

export interface StoresInSavedListRequest {
  listId: number;
}

export interface StoresInSavedListData {
  userUuid: string;
  storeUuid: string;
  listName: string;
  storeName: string;
  storeAddress: string;
  imageUrls: string[];
}

export interface CreateSavedListRequest {
  userUuid: string;
  listName: string;
  iconColorId: number;
}

export interface CreateSavedListResponse {
  listId: number;
  userUuid: string;
  listName: string;
  iconColorId: number;
  storeCount: number;
  storeData: [];
}

export interface EditSavedListRequest {
  listId: number;
  newName: string;
  newIconColor: number;
}

export interface EditSavedListResponse {
  listId: number;
  userUuid: string;
  listName: string;
  iconColorId: number;
  storeCount: number;
  storeData: [];
}

export interface AddStoreInSavedListRequest {
  listId: number;
  storeUuid: string;
  userPreferences: string[];
}

export interface AddStoreInSavedListResponse {
  userUuid: string;
  storeUuid: string;
  listId: number;
  listName: string;
  storeName: string;
  storeAddress: string;
  imageUrls: string[];
  userPreferences: string[];
}

export interface DeleteSavedListRequest {
  listId: number;
}

export interface DeleteStoreInSavedListRequest {
  listId: number;
  storeUuid: string;
}

// menu
export interface Id {
  storeUuid: string;
}

export interface CreateMenuRequest
  extends Pick<Menu, 'name' | 'price' | 'isPopular' | 'description'> {}

export type MenuRequests = CreateMenuRequest | CreateMenuRequest[];

export interface CreateMenuRequestFormData {
  storeUuid: string;
  requests: MenuRequests;
  menuImages?: File | File[];
}

export interface EditMenuRequest {
  storeUuid: string;
  menuUuid: string;
  imageFileKey: string;
  file: File; // imageFileKey에  해당 파일 이름 담아 보내야함
}

export interface DeleteMenuRequest {
  storeUuid: string;
  menuUuid: string;
}

export interface GetMenuRequest {
  storeUuid: string;
  menuUuid: string;
}

export interface GetMenuListRequest {
  storeUuid: string;
}

export interface StoreRepository {
  // store
  getNearbyStores(
    data: BaseRequestData<NearByStoreRequest>,
  ): Promise<NearByStoreData[]>;

  getNearbyFilteredStores(
    data: BaseRequestData<NearbyFilteredStoresRequest>,
  ): Promise<NearByStoreData[]>;

  getNearbyPreferStores({
    authorization,
    data,
  }: BaseRequestData<NearByStoreRequest>): Promise<NearByStoreData[]>;

  getNearBySearchStores(
    data: BaseRequestData<NearByStoreSearchRequest>,
  ): Promise<NearByStoreData[]>;

  getStoreSummary(
    data: BaseRequestData<StoreSummaryInfoRequest>,
  ): Promise<StoreSummaryInfoData>;

  getStoreDetail(
    data: BaseRequestData<StoreDetailInfoRequest>,
  ): Promise<StoreDetailInfoData>;

  registerStore({
    authorization,
    data,
  }: BaseRequestData<RegisterStoreRequest>): Promise<RegisterStoreResponse>;

  editStore({
    authorization,
    data,
  }: BaseRequestData<EditStoreRequest>): Promise<EditStoreResponse>;

  deleteStore({
    authorization,
    data,
  }: BaseRequestData<DeleteStoreRequest>): Promise<void>;

  // savedList
  createSavedList({
    authorization,
    data,
  }: BaseRequestData<CreateSavedListRequest>): Promise<CreateSavedListResponse>;

  editSavedList({
    authorization,
    data,
  }: BaseRequestData<EditSavedListRequest>): Promise<EditSavedListResponse>;

  deleteSavedList({
    authorization,
    data,
  }: BaseRequestData<DeleteSavedListRequest>): Promise<void>;

  addStoreInSavedList({
    authorization,
    data,
  }: BaseRequestData<AddStoreInSavedListRequest>): Promise<AddStoreInSavedListResponse>;

  deleteStoreInSavedList({
    authorization,
    data,
  }: BaseRequestData<DeleteStoreInSavedListRequest>): Promise<void>;

  // 상세정보에서 사용
  getStoreInSavedList({
    authorization,
    data,
  }: BaseRequestData<StoreInSavedListRequest>): Promise<StoreInSavedListResponse>;

  getStoresInSavedList({
    authorization,
    data,
  }: BaseRequestData<StoresInSavedListRequest>): Promise<
    StoresInSavedListData[]
  >;

  getSavedListAll({
    authorization,
    data,
  }: BaseRequestData<SavedListRequest>): Promise<SavedListData[]>;

  // menu
  createMenu({
    authorization,
    data,
  }: BaseRequestData<CreateMenuRequestFormData>): Promise<void>;

  editMenu({
    authorization,
    data,
  }: BaseRequestData<EditMenuRequest>): Promise<void>;

  deleteMenu({
    authorization,
    data,
  }: BaseRequestData<DeleteMenuRequest>): Promise<void>;

  getMenu({ data }: BaseRequestData<GetMenuRequest>): Promise<Menu>;

  getMenuList({ data }: BaseRequestData<GetMenuListRequest>): Promise<Menu[]>;

  // coupon count
  updateCouponCount({ data }: BaseRequestData<void>): Promise<void>; // TODO: api 아직
}
