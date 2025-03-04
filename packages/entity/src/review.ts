import type { BaseRequestData } from './appMetadata';

export interface OneLineReview {
  reviewUuid: string;
  storeId: number;
  nickname: string;
  profileImage: string;
  content: string;
  rating: number;
  createdAt: string;
  images: string[];
}

export interface ReviewTag {
  id: number;
  name: string;
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
  reviewUuid: string;
  storeId: number;
  nickname: string;
  profileImage: string;
  content: string;
  rating: number;
  createdAt: string;
  images: string[];
}

export interface ReviewUpdateData {
  id: string;
}

export interface ReviewRepository {
  getStoreOnelineReviews(
    data: BaseRequestData<StoreOnelineReivewRequest>,
  ): Promise<StoreOnelineReivewData[]>;

  createOnelineReview({
    data,
  }: BaseRequestData<CreateOnelineReviewRequestFormData>): Promise<
    CreateOnelineReviewResponse[]
  >;

  // 내가 쓴 리뷰 조회
  getMine(data: BaseRequestData<unknown>): Promise<unknown>;

  // 내가 쓴 리뷰 수정
  edit(data: BaseRequestData<ReviewUpdateData>): Promise<unknown>;

  // 내가 쓴 리뷰 삭제
  delete(data: BaseRequestData<ReviewUpdateData>): Promise<unknown>;

  // 모든 리뷰 조회
  getAll(data: BaseRequestData<unknown>): Promise<unknown>;
}
