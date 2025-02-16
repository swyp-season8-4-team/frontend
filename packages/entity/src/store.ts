import type { BaseRequestData } from './appMetadata';
import type { StoreReview } from './review';

export interface Store {
  id: number;
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
  operatingHours: string;
  closingDays: string;
  averageRating: number;
  status: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface Menu {
  id: number;
  storeId: number;
  name: string;
  isPopular: boolean; // 인기 메뉴여부
  price: number;
  description: string;
  images: string[];
  createdAt?: string;
  updatedAt?: string;
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

// 유저가 저장한 가게들
export interface UserSavedStore {
  id: number;
  userId: number;
  storeId: number;
  createdAt?: string;
}

export interface StoreDetail {
  id: number;
  storeId: number;
  views: number;
  saved: number;
  reviews: number;
  createDate: Date;
  createdAt?: string;
}

export interface StoreCoupon {
  title: string;
  description: string;
  expiryDate: string;
}

// export type StoreTag = '베이커리' | '루프탑 있음' | '애완동물 동반 가능'; // TODO: 전체 카테고리 정리하기

export type StoreMapData = Pick<
  Store,
  'id' | 'name' | 'address' | 'latitude' | 'longitude'
>;

export interface StoreSummaryData
  extends Pick<
    Store,
    | 'id'
    | 'name'
    | 'phone'
    | 'address'
    | 'storeLink'
    | 'averageRating'
    | 'operatingHours'
    | 'closingDays'
    | 'animalYn'
    | 'tumblerYn'
    | 'parkingYn'
  > {
  tags: string[];
  storeImages: string[];
}

export interface StoreDetailData
  extends Pick<
    Store,
    | 'id'
    | 'name'
    | 'address'
    | 'operatingHours'
    | 'closingDays'
    | 'phone'
    | 'storeLink'
    | 'animalYn'
    | 'tumblerYn'
    | 'parkingYn'
    | 'averageRating'
  > {
  events: Pick<
    StoreEvent,
    'id' | 'title' | 'description' | 'startDate' | 'endDate' | 'images'
  >[];
  menus: Pick<
    Menu,
    'id' | 'name' | 'price' | 'isPopular' | 'description' | 'images'
  >[];
  coupons: StoreCoupon[];
  storeImages: string[];
  storeReviews: Pick<
    StoreReview,
    'id' | 'storeId' | 'content' | 'rating' | 'createdAt' | 'images'
  >[];
  tags: string[];
}

export interface StoreSavedByUserData
  extends Pick<Store, 'address' | 'storeLink'> {
  id: number;
  storeId: Store['id'];
  storeName: Store['name'];
  savedAt: string; // 유저 저장 일시
}

export interface SavedListItem {
  id: number;
  colorId: number;
  title: string;
  count: number;
}

// TODO: api 명세서에 아직 덜 나옴
export interface StoreRegisterData
  extends Pick<
    Store,
    | 'id'
    | 'name'
    | 'phone'
    | 'address'
    | 'storeLink'
    | 'latitude'
    | 'longitude'
    | 'description'
    | 'animalYn'
    | 'tumblerYn'
    | 'parkingYn'
    | 'operatingHours'
    | 'closingDays'
  > {
  ownerId: number;
  tagIds: number[];
}

export interface StoreRepository {
  getNearbyStores(
    data: BaseRequestData<{
      latitude: number;
      longitude: number;
      radius: number;
    }>,
  ): Promise<StoreMapData[]>;

  getStoreSummary(
    data: BaseRequestData<{
      storeId: number;
    }>,
  ): Promise<StoreSummaryData>;

  getStoreDetail(
    data: BaseRequestData<{
      storeId: number;
    }>,
  ): Promise<StoreDetailData>;

  getSavedList({
    authorization,
    data,
  }: BaseRequestData<{
    userId: number;
  }>): Promise<SavedListItem[]>;

  getUserSavedStore({
    authorization,
    data,
  }: BaseRequestData<{
    userId: number;
  }>): Promise<StoreSavedByUserData[]>;
}
