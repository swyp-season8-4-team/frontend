import type { BaseRequestData } from './appMetadata';
import type { Preference } from './preference';

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

export interface Tag {
  parentTagId?: number;
  parentTagName: string;
  tagName: string;
  tagId: number;
}

export interface Menu {
  menuUuid?: string;
  name: string;
  price: number;
  isPopular?: boolean;
  description?: string;
  imageFileKey?: string[]; // 파일명임. 확장자 포함해야함 ex) menu_cake6.jpeg"
  images?: string[]; // 응답
}

export interface OperatingHoursItem {
  dayOfWeek: string;
  openingTime: string;
  closingTime: string;
  lastOrderTime: string;
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

export interface SavedList {
  saved: boolean;
  savedListId: number | null;
}

// store
export interface NearByStoreRequest {
  latitude: number;
  longitude: number;
  radius: number;
  preferenceTagNames?: Preference[];
  searchKeyword?: string;
}

export interface NearbyFilteredStoresRequest {
  latitude: number;
  longitude: number;
  radius: number;
  preferenceTagNames: Preference[];
}

export interface NearByStoreSearchRequest {
  latitude: number;
  longitude: number;
  radius: number;
  searchKeyword: string;
}

export interface NearByStoreData
  extends Pick<
    Store,
    | 'storeId'
    | 'storeUuid'
    | 'name'
    | 'address'
    | 'latitude'
    | 'longitude'
    | 'operatingHours'
    | 'tags'
  > {
  storeImage: string;
  shortReviewCount: number;
}

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
  userUuid?: string;
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
  userId: number | null;
  userUuid: string | null;
  ownerId: number;
  ownerUuid: string;
  menus: Menu[];
  totalReviewCount: number;
  storeReviews: OneLineReview[];
  communityReviews: {
    reviewUuid: string;
    userUuid: string;
    nickname: string;
    profileImage: string;
    thumbnail: string;
    title: string;
    content: string;
    createdAt: string;
    updatedAt?: string;
  }[];
  mate: {
    mateUuid: string;
    mateCategory: string;
    thumbnail: string;
    title: string;
    content: string;
    nickname: string;
    recruitYn: boolean;
    saved: boolean;
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
  // ImageFileKey?: string[]; // 메뉴 파일명
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

export interface SavedStoresLocationRequest {
  listId: number;
}

export interface SavedStoresLocationData {
  listId: number;
  iconColorId: number;
  storeId: number;
  name: string;
  latitude: number;
  longitude: number;
}

// 상세정보에서 사용
export interface ParentSavedListRequest {
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

export interface ParentSavedListResponse {
  listId: number;
  listName: string;
  iconColorId: number;
}

export interface StoresInSavedListRequest {
  listId: number;
  authorization?: string;
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
  userPreferences: Preference[];
}

export interface AddStoreInSavedListResponse {
  userUuid: string;
  storeUuid: string;
  listId: number;
  listName: string;
  storeName: string;
  storeAddress: string;
  imageUrls: string[];
  userPreferences: number[];
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

export interface PreferenceData {
  id: number;
  preferenceName: Preference;
  preferenceDesc: string;
}

// oneline-review
export interface OneLineReview {
  userUuid: string;
  reviewUuid: string;
  storeId: number;
  nickname: string;
  profileImage: string;
  content: string;
  rating: number;
  createdAt: string;
  images: string[];
}

export interface OnelineReviewRequests {
  userUuid: string;
  content: string;
  rating: number;
}
export interface CreateOnelineReviewRequestFormData {
  storeUuid: string;
  request: OnelineReviewRequests;
  // images?: string[];
  images?: File[];
}

export interface CreateOnelineReviewResponse {
  reviewUuid: string;
  storeId: number;
  content: string;
  rating: number;
  createdAt: string;
  images: string[];
}

export interface StoreOnelineReivewRequest {
  storeUuid: string;
}

export interface StoreOnelineReivewData {
  userUuid: string;
  reviewUuid: string;
  storeId: number;
  nickname: string;
  profileImage: string;
  content: string;
  rating: number;
  createdAt: string;
  images: string[];
}

export interface DeleteOnelineReviewRequest {
  storeUuid: string;
  reviewUuid: string;
}

export interface EditOnelineReviewRequest {
  storeUuid: string;
  reviewUuid: string;
  request: OnelineReviewRequests;
  newImages?: File[];
}

export interface StoreRepository {
  // preference
  getAllPreference(): Promise<PreferenceData[]>;

  // store
  getNearbyStores(
    data: BaseRequestData<NearByStoreRequest>,
  ): Promise<NearByStoreData[]>;

  // getNearbyFilteredStores(
  //   data: BaseRequestData<NearbyFilteredStoresRequest>,
  // ): Promise<NearByStoreData[]>;

  // getNearbyPreferStores({
  //   data,
  // }: BaseRequestData<NearByStoreRequest>): Promise<NearByStoreData[]>;

  // getNearBySearchStores(
  //   data: BaseRequestData<NearByStoreSearchRequest>,
  // ): Promise<NearByStoreData[]>;

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
  getParentSavedList({
    authorization,
    data,
  }: BaseRequestData<ParentSavedListRequest>): Promise<ParentSavedListResponse>;

  getStoresInSavedList({
    authorization,
    data,
  }: BaseRequestData<StoresInSavedListRequest>): Promise<
    StoresInSavedListData[]
  >;

  getStoresLocationInSavedList({
    authorization,
    data,
  }: BaseRequestData<SavedStoresLocationRequest>): Promise<
    SavedStoresLocationData[]
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
  updateCouponCount(): Promise<void>;

  // review
  getStoreOnelineReviews(
    data: BaseRequestData<StoreOnelineReivewRequest>,
  ): Promise<StoreOnelineReivewData[]>;

  createOnelineReview({
    authorization,
    data,
  }: BaseRequestData<CreateOnelineReviewRequestFormData>): Promise<
    CreateOnelineReviewResponse[]
  >;

  deleteOnelineReview({
    authorization,
    data,
  }: BaseRequestData<DeleteOnelineReviewRequest>): Promise<void>;

  editOnelineReview({
    authorization,
    data,
  }: BaseRequestData<EditOnelineReviewRequest>): Promise<OneLineReview>;
}
