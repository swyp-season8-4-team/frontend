import type { RawPlace } from './place';
import type { CommunityDessertReviewCategory } from '@repo/entity/src/community';
export interface RawReviewImage {
  reviewImages: string;
  reviewImageId: string;
}

export interface RawReviewContent {
  type: 'image' | 'text';
  value: string | null;
  imageId: number | null;
  imageIndex: number | null;
  imageUrl: string | null;
}

export interface RawReview {
  reviewUuid: string;
  nickname: string;
  storeId: number;
  userUuid: string;
  title: string;
  contents: RawReviewContent[];
  profileImage: string;
  createdAt: string;
  updatedAt: string;
  reviewCategory: CommunityDessertReviewCategory;
  saved: boolean;
  place: RawPlace;
  gender: 'MALE' | 'FEMALE';
  views: number;
}

export interface RawReviewListResponse {
  reviews: RawReview[];
  last: boolean;
}
