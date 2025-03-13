import { type RawPlace } from './../../api/src/desserbee-web/place';
// import type { RawPlace } from '@repo/api/src/desserbee-web/place';
import type { BaseRequestData } from './appMetadata';
import type { CommunityDessertReviewCategory } from './community';
import type { Place } from './place';
import type { Gender } from './user';

export interface ReviewImage {
  id: string;
  url: string;
}

export interface ReviewContent {
  type: 'image' | 'text';
  value?: string;
  imageId?: number;
  imageIndex?: number;
  imageUrl?: string;
}

export interface Review {
  id: string;
  nickname: string;
  storeId: number;
  userId: string;
  title: string;
  contents: ReviewContent[];
  profileImage: string;
  createdAt: string;
  updatedAt: string;
  saved: boolean;
  place: Place;
  gender: Gender;
  viewCount: number;
  category: CommunityDessertReviewCategory;
}

export interface ReviewTag {
  id: number;
  name: string;
}

export interface ReviewUpdateData {
  id: string;
}

export interface ReviewListRequestData {
  from?: number;
  to?: number;
  keyword?: string;
  reviewCategoryId?: CommunityDessertReviewCategory;
}

export interface ReviewListResponse {
  reviews: Review[];
  isLast: boolean;
}

export interface RawReviewWriteRequest {
  userUuid: string;
  title: string;
  contents: ReviewContent[];
  reviewCategoryId: number;
  place: RawPlace;
}

export interface ReviewWriteData {
  userId: string;
  title: string;
  contents: ReviewContent[];
  category: CommunityDessertReviewCategory;
  place: Place;
  imageFiles?: File[];
}

export interface SaveReviewRequest {
  reviewUuid: string;
  // TODO: API 아직 안됨
}

export interface CancelSaveRequest {
  reviewUuid: string;
  // TODO: API 아직 안됨
}

export interface SaveReviewResponse {
  // TODO: API 아직 안됨
}

export interface SavedReviewListRequest {
  // TODO: API 아직 안됨
}

export interface SavedReviewListResponse {
  // TODO: API 아직 안됨
}

export interface ReviewRepository {
  // 내가 쓴 리뷰 조회
  getMine(data: BaseRequestData<unknown>): Promise<unknown>;

  // 상세페이지 조회
  getDetail(data: BaseRequestData<ReviewUpdateData>): Promise<Review>;

  // 리뷰 작성
  write(data: BaseRequestData<ReviewWriteData>): Promise<Review>;

  // 내가 쓴 리뷰 수정
  edit(
    data: BaseRequestData<ReviewWriteData & ReviewUpdateData>,
  ): Promise<unknown>;

  // 내가 쓴 리뷰 삭제
  delete(data: BaseRequestData<ReviewUpdateData>): Promise<unknown>;

  // 모든 리뷰 조회
  getAll(
    data: BaseRequestData<ReviewListRequestData>,
  ): Promise<ReviewListResponse>;

  save(data: BaseRequestData<SaveReviewRequest>): Promise<SaveReviewResponse>;

  cancelSave(data: BaseRequestData<CancelSaveRequest>): Promise<void>;

  getSaved(
    data: BaseRequestData<SavedReviewListRequest>,
  ): Promise<SavedReviewListResponse>;
}
