'use server';

import { commonErrorHandler } from '@/error/commonErrorHandler';
import type {
  CreateOnelineReviewRequestFormData,
  EditOnelineReviewRequest,
} from '@repo/entity/src/store';
import AuthNextAppRouteRepository from '@repo/infrastructures/src/repositories/authNextAppRouteRepository';
import StoreAPIRepository from '@repo/infrastructures/src/repositories/storeAPIRepository';
import StoreService from '@repo/usecase/src/storeService';
import { cookies } from 'next/headers';

export async function saveReviewPageData(storeInfo: {
  storeUuid: string;
  totalReviewCount: number;
  averageRating: number;
  storeReviews: Array<{
    userUuid: string;
    reviewUuid: string;
    content: string;
    createdAt: string;
    images: string[];
    nickname: string;
    profileImage: string;
    rating: number;
  }>;
}) {
  const cookieStore = await cookies();
  cookieStore.set('reviewPageData', JSON.stringify(storeInfo));
}

const storeService = new StoreService({
  storeRepository: new StoreAPIRepository(),
  authRepository: new AuthNextAppRouteRepository(),
});

export async function editOnelineReview(data: EditOnelineReviewRequest) {
  await commonErrorHandler(storeService.editOnelineReview(data));
}

interface DeleteOnelineReviewProps {
  storeUuid: string;
  reviewUuid: string;
}
export async function deleteOnelineReview({
  storeUuid,
  reviewUuid,
}: DeleteOnelineReviewProps) {
  await commonErrorHandler(
    storeService.deleteOnelineReview({ storeUuid, reviewUuid }),
  );
}

export async function createStoreOnlineReviews(
  data: CreateOnelineReviewRequestFormData,
) {
  await commonErrorHandler(storeService.createStoreOnlineReviews(data));
}
