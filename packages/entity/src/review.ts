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

export function isReview(data: unknown): data is Review {
  if (typeof data !== 'object' || data === null) {
    return false;
  }

  const review = data as Partial<Review>;

  // 필수 속성 확인
  if (
    typeof review.id !== 'string' ||
    typeof review.nickname !== 'string' ||
    typeof review.title !== 'string' ||
    typeof review.createdAt !== 'string' ||
    typeof review.updatedAt !== 'string' ||
    typeof review.viewCount !== 'number' ||
    typeof review.userId !== 'string' ||
    typeof review.storeId !== 'number' ||
    typeof review.saved !== 'boolean' ||
    !Array.isArray(review.contents)
  ) {
    return false;
  }

  // contents 배열의 각 항목이 ReviewContent 형식인지 확인
  if (!review.contents.every(content => 
    typeof content === 'object' && 
    content !== null && 
    (content.type === 'image' || content.type === 'text')
  )) {
    return false;
  }

  // place 객체가 존재하는지 확인 (상세 검증은 생략)
  if (!review.place || typeof review.place !== 'object') {
    return false;
  }

  // 선택적으로 gender와 category 확인
  if (review.gender !== undefined && typeof review.gender !== 'string') {
    return false;
  }

  if (review.category !== undefined && typeof review.category !== 'string') {
    return false;
  }

  return true;
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

export interface ReviewRepository {
  // 내가 쓴 리뷰 조회
  getMine(data: BaseRequestData<unknown>): Promise<unknown>;

  // 상세페이지 조회
  getDetail(data: BaseRequestData<ReviewUpdateData>): Promise<Review>;

  // 내가 쓴 리뷰 수정
  edit(data: BaseRequestData<ReviewUpdateData>): Promise<unknown>;

  // 내가 쓴 리뷰 삭제
  delete(data: BaseRequestData<ReviewUpdateData>): Promise<unknown>;

  // 모든 리뷰 조회
  getAll(data: BaseRequestData<ReviewListRequestData>): Promise<ReviewListResponse>;
}
