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
  description: string;
  animalYn: boolean;
  parkingYn: boolean;
  tumblerYn: boolean;
  operatingHours: OperatingHoursItem[];
  holidays: HolidaysItem[];
  averageRating: number;
  notice: string[];
  status: boolean;
  createdAt?: string;
  updatedAt?: string;
  tags: string[];
}

export interface Menu {
  menuUuid: string;
  name: string;
  price: number;
  isPopular: boolean;
  description: string;
  images?: string[];
}

export interface OperatingHoursItem {
  dayOfWeek: string;
  openingTime: {
    hour: number;
    minute: number;
    second: number;
    nano: number;
  };
  closingTime: {
    hour: number;
    minute: number;
    second: number;
    nano: number;
  };
  lastOrderTime: {
    hour: number;
    minute: number;
    second: number;
    nano: number;
  };
  isClosed: boolean;
}

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

// export type StoreTag = '베이커리' | '루프탑 있음' | '애완동물 동반 가능'; // TODO: 전체 카테고리 정리하기

// store
export interface NearByStoreRequest {
  latitude: number;
  longitude: number;
  radius: number;
}

export type NearByStoreData = Pick<
  Store,
  'storeId' | 'storeUuid' | 'name' | 'address' | 'latitude' | 'longitude'
>;

export interface StoreSummaryInfoRequest {
  // TODO: api 아직
  storeUuid: string;
}

export interface StoreSummaryInfoData // TODO: api 아직
  extends Pick<
    Store,
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
  > {
  // userId: number;
  // userUuid: string;
  storeImages?: string[];
  ownerPickImages?: string[];
}

export interface StoreDetailInfoRequest {
  // TODO: api 아직
  storeUuid: string;
}

export interface StoreDetailInfoData // TODO: api 아직
  extends Pick<
    Store,
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
    | 'tags'
  > {
  storeImages: string[];
  ownerPickImages: string[];
}

export interface RegisterStoreRequest // TODO: api 아직
  extends Pick<
    Store,
    | 'storeId'
    | 'storeUuid'
    | 'name'
    | 'phone'
    | 'storeLink'
    | 'animalYn'
    | 'tumblerYn'
    | 'parkingYn'
    | 'averageRating'
    | 'tags'
    | 'operatingHours'
    | 'holidays'
  > {
  userId: number;
  userUuid: string;
  menus: Menu[];
  storeImages?: string[];
  ownerPickImages?: string[];
  storeReviews: OneLineReview[];
}

export interface RegisterStoreResponse {} // TODO: api 아직

export interface EditStoreRequest {
  storeUuid: string;
} // TODO: api 아직

export interface EditStoreResponse {} // TODO: api 아직

export interface DeleteStoreRequest {
  storeUuid: string;
} // TODO: api 아직

// saved list
export interface SavedListRequest {
  userUuid: string;
}

export interface SavedListData {
  listId: number;
  listName: string;
  iconColorId: number;
  storeCount: number;
  userUuid: string;
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
  userUuid: string;
  listName: string;
  iconColorId: number;
  storeCount: number;
}

export interface EditSavedListRequest {
  listId: number;
  newName: string;
  newIconColor: number;
}

export interface EditSavedListResponse {
  userUuid: string;
  listName: string;
  iconColorId: number;
  storeCount: number;
}

export interface AddStoreInSavedListRequest {
  listId: number;
  storeUuid: string;
}

export interface AddStoreInSavedListResponse {
  userUuid: string;
  storeUuid: string;
  listName: string;
  storeName: string;
  storeAddress: string;
  imageUrls: string[];
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
export interface CreateMenuRequest extends Omit<Menu, 'menuUuid'> {
  storeUuid: string;
}

export interface EditMenuRequest {
  storeUuid: string;
  menuUuid: string;
  file: string;
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
  }: BaseRequestData<CreateMenuRequest>): Promise<void>;

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
