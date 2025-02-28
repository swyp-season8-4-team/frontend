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
  images?: string[];
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

export interface ReviewRepository {
  getStoreOnelineReviews(
    data: BaseRequestData<StoreOnelineReivewRequest>,
  ): Promise<StoreOnelineReivewData[]>;

  createOnelineReview({
    data,
  }: BaseRequestData<CreateOnelineReviewRequestFormData>): Promise<
    CreateOnelineReviewResponse[]
  >;
}
