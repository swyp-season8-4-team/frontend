export interface StoreMapData {
  id: number;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
}

export interface StoreSummaryData {
  id: number;
  name: string;
  averageRating: number;
  tags: string[];
  storeImages: string[];
  address: string;
  operatingHours: string;
  closingDays: string;
  phone: string;
  storeLink: string;
  animalYn: boolean;
  tumblerYn: boolean;
  parkingYn: boolean;
}

export interface StoreEventData {
  id: number;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
}

export interface StoreCouponData {
  title: string;
  description: string;
  expiryDate: string;
}

export type StoreTag = "베이커리" | "루프탑 있음" | "애완동물 동반 가능"; // TODO: 전체 카테고리 정리하기

export interface StoreDetailData {
  id: number;
  name: string;
  address: string;
  operatingHours: string;
  closingDays: string;
  phone: string;
  storeLink: string;
  animalYn: boolean;
  tumblerYn: boolean;
  parkingYn: boolean;
  averageRating: number;
  events: StoreEventData[];
  menus: null; // TODO: 아직 api 명세서에 없음
  coupons: StoreCouponData[];
  storeImages: string[];
  eventImages: string[];
  menuImages: string[];
  storeReviews: string[]; // TODO: 아직 api 명세서에 없음
  tags: StoreTag[];
}

export interface StoreSavedByUserData {
  id: number;
  name: string;
  address: string;
  thumbnail: string;
  savedAt: string;
}
