import type { BaseRequestData } from './appMetadata';
import type { Review } from './review';

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

// GET
export type NearByStoreData = Pick<
  Store,
  'storeId' | 'storeUuid' | 'name' | 'address' | 'latitude' | 'longitude'
>;

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
    | 'latitude'
    | 'longitude'
    | 'description'
    | 'operatingHours'
    | 'tags'
  > {
  userId: number;
  userUuid: string;
  storeImages: string[];
  ownerPickImages: string[];
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
    | 'tags'
  > {
  userId: number;
  userUuid: string;
  storeImages: string[];
  ownerPickImages: string[];
}

export interface SavedListItemData {
  userUuid: string;
  listName: string;
  iconColorId: number;
  storeCount: number;
}

export interface SavedStoreData {
  userUuid: string;
  storeUuid: string;
  listName: string;
  storeName: string;
  storeAddress: string;
  imageUrls: string[];
}

// POST, PUT
export interface StoreSaveRequest {
  // 유저 저장
  userUuid: string;
  storeUuid: string;
  listName: string;
  storeName: string;
  storeAddress: string;
  imageUrls: string[];
}

export interface ListSaveRequest {
  listName: string;
  iconColorId: number;
}

export interface ListEditRequest {
  newName: string;
  newIconColor: number;
}

export interface StoreRepository {
  getNearbyStores(
    data: BaseRequestData<{
      latitude: number;
      longitude: number;
      radius: number;
    }>,
  ): Promise<NearByStoreData[]>;

  getStoreSummary(
    data: BaseRequestData<{
      storeUuid: string;
    }>,
  ): Promise<StoreSummaryInfoData>;

  getStoreDetail(
    data: BaseRequestData<{
      storeUuid: string;
    }>,
  ): Promise<StoreDetailInfoData>;

  getSavedList({
    authorization,
    data,
  }: BaseRequestData<{
    userUuid: string;
  }>): Promise<SavedListItemData[]>;

  getSavedStores({
    authorization,
    data,
  }: BaseRequestData<{
    listId: number;
  }>): Promise<SavedStoreData[]>;
}
