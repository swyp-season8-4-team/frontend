'use server';

import ReviewAPIRepository from '@repo/infrastructures/src/repositories/reviewAPIRepository';
import ReviewService from '@repo/usecase/src/reviewService';
import AuthNextAppRouteRepository from '@repo/infrastructures/src/repositories/authNextAppRouteRepository';
import type { ReviewContent } from '@repo/entity/src/review';
import type { CommunityDessertReviewCategory } from '@repo/entity/src/community';

const reviewService = new ReviewService({
  reviewRepository: new ReviewAPIRepository(),
  authRepository: new AuthNextAppRouteRepository(),
});

export async function writeReviewPost(data: {
  userId: string;
  title: string;
  contents: ReviewContent[];
  category: CommunityDessertReviewCategory;
  place: {
    name: string;
  };
  imageFiles: File[];
}) {
  try {
    const response = await reviewService.write(data);
    return { success: true, data: response };
  } catch (error) {
    console.error('Failed to write review:', error);
    return { success: false, error };
  }
}

export async function editReviewPost(params: {
  id: string;
  userId: string;
  title: string;
  contents: ReviewContent[];
  category: CommunityDessertReviewCategory;
  place: {
    name: string;
  };
  imageFiles: File[];
}) {
  try {
    await reviewService.edit(params);
    return { success: true, data: { id: params.id } };
  } catch (error) {
    console.error('Failed to edit review:', error);
    return { success: false, error };
  }
}
